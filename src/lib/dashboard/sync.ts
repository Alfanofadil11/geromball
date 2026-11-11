import "server-only";
import { db, lookups } from "./db";
import { suggest } from "./tagging";

// Pulls every Geromball upload from the YouTube Data API v3 (free, 10,000 units a day;
// a full sync costs roughly 2 units per 50 videos) and stores today's numbers.
const CHANNEL_ID = "UCrpz3DaqrtI7rnGyZH-OykQ";
const API = "https://www.googleapis.com/youtube/v3";
const SHORT_MAX_S = 190;

function key(): string {
  const k = process.env.YOUTUBE_API_KEY;
  if (!k) throw new Error("YOUTUBE_API_KEY is not set");
  return k;
}

async function yt<T>(path: string, params: Record<string, string>): Promise<T> {
  const qs = new URLSearchParams({ ...params, key: key() });
  const res = await fetch(`${API}/${path}?${qs}`, { cache: "no-store" });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`YouTube ${path} ${res.status}: ${body.slice(0, 300)}`);
  }
  return res.json() as Promise<T>;
}

interface PlaylistItems {
  nextPageToken?: string;
  items: { contentDetails: { videoId: string } }[];
}

async function playlistVideoIds(playlistId: string): Promise<string[]> {
  const ids: string[] = [];
  let pageToken: string | undefined;
  do {
    const page = await yt<PlaylistItems>("playlistItems", {
      part: "contentDetails",
      playlistId,
      maxResults: "50",
      ...(pageToken ? { pageToken } : {}),
    });
    ids.push(...page.items.map((i) => i.contentDetails.videoId));
    pageToken = page.nextPageToken;
  } while (pageToken);
  return ids;
}

interface ApiVideo {
  id: string;
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: Record<string, { url: string }>;
    liveBroadcastContent: string;
  };
  contentDetails: { duration: string };
  statistics: { viewCount?: string; likeCount?: string; commentCount?: string };
  liveStreamingDetails?: object;
}

function isoSeconds(d: string): number {
  const m = d.match(/P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return 0;
  const [, days, h, min, s] = m.map((x) => Number(x ?? 0));
  return days * 86400 + h * 3600 + min * 60 + s;
}

/** youtube.com/shorts/<id> answers 200 for a Short and redirects for a normal video. */
async function isShort(id: string): Promise<boolean> {
  try {
    const res = await fetch(`https://www.youtube.com/shorts/${id}`, { method: "HEAD", redirect: "manual", cache: "no-store" });
    return res.status === 200;
  } catch {
    return false;
  }
}

async function pool<T, R>(items: T[], size: number, fn: (t: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(size, items.length) }, async () => {
      while (next < items.length) {
        const i = next++;
        out[i] = await fn(items[i]);
      }
    }),
  );
  return out;
}

function jakartaDate(d = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jakarta" }).format(d);
}

export async function runSync(): Promise<{ videos: number; added: number; tagged: number }> {
  const run = await db().from("yt_sync_runs").insert({}).select("id").single();
  const runId = run.data?.id;
  try {
    const result = await sync();
    await db().from("yt_sync_runs").update({ finished_at: new Date().toISOString(), ok: true, videos_seen: result.videos }).eq("id", runId);
    return result;
  } catch (e) {
    await db().from("yt_sync_runs").update({ finished_at: new Date().toISOString(), ok: false, error: String(e).slice(0, 1000) }).eq("id", runId);
    throw e;
  }
}

async function sync() {
  const { ips, talents, formats } = await lookups();

  const channel = await yt<{ items: { contentDetails: { relatedPlaylists: { uploads: string } } }[] }>("channels", {
    part: "contentDetails",
    id: CHANNEL_ID,
  });
  const uploads = channel.items[0]?.contentDetails.relatedPlaylists.uploads;
  if (!uploads) throw new Error("Could not find the channel's uploads playlist");
  const ids = await playlistVideoIds(uploads);

  // which IP playlists each video sits in
  const membership = new Map<string, string[]>();
  for (const ip of ips) {
    if (!ip.playlist_id) continue;
    for (const vid of await playlistVideoIds(ip.playlist_id)) {
      membership.set(vid, [...(membership.get(vid) ?? []), ip.playlist_id]);
    }
  }

  const videos: ApiVideo[] = [];
  for (let i = 0; i < ids.length; i += 50) {
    const page = await yt<{ items: ApiVideo[] }>("videos", {
      part: "snippet,contentDetails,statistics,liveStreamingDetails",
      id: ids.slice(i, i + 50).join(","),
    });
    videos.push(...page.items);
  }

  const existing = new Map<string, { is_short: boolean; tag_status: string; format_id: number | null }>();
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db().from("yt_videos").select("id,is_short,tag_status,format_id").order("id").range(from, from + 999);
    if (error) throw error;
    for (const r of data ?? []) existing.set(r.id, r);
    if (!data || data.length < 1000) break;
  }

  // Shorts can run up to 3 minutes, so length alone cannot tell; ask YouTube once per new video.
  // The API reports some 3:00 Shorts as 181 s, hence the margin above 180.
  const fresh = videos.filter((v) => !existing.has(v.id));
  const shortFlags = await pool(fresh, 8, (v) =>
    isoSeconds(v.contentDetails.duration) <= SHORT_MAX_S && !v.liveStreamingDetails ? isShort(v.id) : Promise.resolve(false),
  );
  const shortById = new Map(fresh.map((v, i) => [v.id, shortFlags[i]]));

  const now = new Date().toISOString();
  const rows = videos
    .filter((v) => v.snippet.liveBroadcastContent === "none") // skip upcoming/ongoing streams
    .map((v) => {
      const thumbs = v.snippet.thumbnails;
      return {
        id: v.id,
        title: v.snippet.title,
        description: v.snippet.description,
        published_at: v.snippet.publishedAt,
        duration_s: isoSeconds(v.contentDetails.duration),
        is_short: existing.has(v.id) ? existing.get(v.id)!.is_short : (shortById.get(v.id) ?? false),
        is_live: Boolean(v.liveStreamingDetails),
        thumbnail: (thumbs.medium ?? thumbs.high ?? thumbs.default)?.url ?? null,
        playlist_ids: membership.get(v.id) ?? [],
        views: Number(v.statistics.viewCount ?? 0),
        likes: Number(v.statistics.likeCount ?? 0),
        comments: Number(v.statistics.commentCount ?? 0),
        stats_updated_at: now,
      };
    });

  for (let i = 0; i < rows.length; i += 500) {
    const { error: e } = await db().from("yt_videos").upsert(rows.slice(i, i + 500), { onConflict: "id" });
    if (e) throw e;
  }

  const today = jakartaDate();
  const snaps = rows.map((r) => ({ video_id: r.id, captured_on: today, views: r.views, likes: r.likes, comments: r.comments }));
  for (let i = 0; i < snaps.length; i += 500) {
    const { error: e } = await db().from("yt_video_snapshots").upsert(snaps.slice(i, i + 500), { onConflict: "video_id,captured_on" });
    if (e) throw e;
  }

  // First guess for anything nobody has tagged yet. Suggested rows only get a missing format
  // filled in; confirmed rows are never touched.
  let tagged = 0;
  const talentLinks: { video_id: string; talent_id: number }[] = [];
  const groups = new Map<string, { ipId: number | null; source: string | null; formatId: number | null; ids: string[] }>();
  const formatOnly = new Map<number, string[]>();
  for (const r of rows) {
    const prev = existing.get(r.id);
    const status = prev?.tag_status ?? "untagged";
    if (status === "confirmed") continue;
    const s = suggest(r, ips, talents, formats);
    if (status === "suggested") {
      if (!prev?.format_id && s.formatId) formatOnly.set(s.formatId, [...(formatOnly.get(s.formatId) ?? []), r.id]);
      continue;
    }
    if (!s.ipId && !s.formatId && s.talentIds.length === 0) continue;
    const k = `${s.ipId}|${s.source}|${s.formatId}`;
    const g = groups.get(k) ?? { ipId: s.ipId, source: s.source, formatId: s.formatId, ids: [] };
    g.ids.push(r.id);
    groups.set(k, g);
    talentLinks.push(...s.talentIds.map((t) => ({ video_id: r.id, talent_id: t })));
    tagged++;
  }
  for (const g of groups.values()) {
    for (let i = 0; i < g.ids.length; i += 200) {
      const { error: e } = await db()
        .from("yt_videos")
        .update({ ip_id: g.ipId, tag_source: g.source, format_id: g.formatId, tag_status: "suggested" })
        .in("id", g.ids.slice(i, i + 200))
        .eq("tag_status", "untagged");
      if (e) throw e;
    }
  }
  for (const [formatId, ids] of formatOnly) {
    for (let i = 0; i < ids.length; i += 200) {
      const { error: e } = await db()
        .from("yt_videos")
        .update({ format_id: formatId })
        .in("id", ids.slice(i, i + 200))
        .eq("tag_status", "suggested")
        .is("format_id", null);
      if (e) throw e;
    }
  }
  if (talentLinks.length) {
    const { error: e } = await db().from("yt_video_talents").upsert(talentLinks, { onConflict: "video_id,talent_id", ignoreDuplicates: true });
    if (e) throw e;
  }

  return { videos: rows.length, added: fresh.length, tagged };
}
