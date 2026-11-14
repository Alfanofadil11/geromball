import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// The dashboard tables have RLS on and no policies, so only the service role reaches them.
// This module is server-only: the key must never reach the browser.
let client: SupabaseClient | null = null;

export function db(): SupabaseClient {
  if (client) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Dashboard needs NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
  }
  client = createClient(url, key, { auth: { persistSession: false } });
  return client;
}

export interface Ip {
  id: number;
  name: string;
  playlist_id: string | null;
  title_keywords: string[];
  active: boolean;
}

export interface Named {
  id: number;
  name: string;
  title_keywords?: string[];
  priority?: number;
}

export interface Video {
  id: string;
  title: string;
  published_at: string;
  duration_s: number | null;
  is_short: boolean;
  is_live: boolean;
  thumbnail: string | null;
  playlist_ids: string[];
  views: number;
  likes: number;
  comments: number;
  ip_id: number | null;
  format_id: number | null;
  tag_status: "untagged" | "suggested" | "confirmed";
  tag_source: "playlist" | "keyword" | "manual" | null;
  note: string | null;
  avg_view_pct: number | null;
}

const VIDEO_COLUMNS =
  "id,title,published_at,duration_s,is_short,is_live,thumbnail,playlist_ids,views,likes,comments,ip_id,format_id,tag_status,tag_source,note,avg_view_pct";

/** Every video, paging past PostgREST's 1,000-row cap. */
export async function allVideos(): Promise<Video[]> {
  const out: Video[] = [];
  const page = 1000;
  for (let from = 0; ; from += page) {
    const { data, error } = await db()
      .from("yt_videos")
      .select(VIDEO_COLUMNS)
      .order("published_at", { ascending: false })
      .range(from, from + page - 1);
    if (error) throw error;
    out.push(...((data ?? []) as Video[]));
    if (!data || data.length < page) break;
  }
  return out;
}

export async function videoTalents(): Promise<Map<string, number[]>> {
  const map = new Map<string, number[]>();
  const page = 1000;
  for (let from = 0; ; from += page) {
    const { data, error } = await db()
      .from("yt_video_talents")
      .select("video_id,talent_id")
      .range(from, from + page - 1);
    if (error) throw error;
    for (const r of data ?? []) {
      const list = map.get(r.video_id) ?? [];
      list.push(r.talent_id);
      map.set(r.video_id, list);
    }
    if (!data || data.length < page) break;
  }
  return map;
}

export async function lookups() {
  const [ips, formats, talents] = await Promise.all([
    db().from("yt_ips").select("id,name,playlist_id,title_keywords,active").order("name"),
    db().from("yt_formats").select("id,name,title_keywords,priority").order("priority").order("name"),
    db().from("yt_talents").select("id,name,title_keywords").order("name"),
  ]);
  for (const r of [ips, formats, talents]) if (r.error) throw r.error;
  return {
    ips: (ips.data ?? []) as Ip[],
    formats: (formats.data ?? []) as Named[],
    talents: (talents.data ?? []) as Named[],
  };
}

/** Views gained per day over the snapshot window (up to 28 days), keyed by video id. */
export async function velocity(): Promise<{ perDay: Map<string, number>; days: number }> {
  const perDay = new Map<string, number>();
  let days = 0;
  const page = 1000;
  for (let from = 0; ; from += page) {
    const { data, error } = await db()
      .from("yt_video_velocity")
      .select("video_id,days,views_per_day")
      .order("video_id")
      .range(from, from + page - 1);
    if (error) throw error;
    for (const r of data ?? []) {
      if (r.views_per_day === null) continue;
      perDay.set(r.video_id, Number(r.views_per_day));
      days = Math.max(days, r.days);
    }
    if (!data || data.length < page) break;
  }
  return { perDay, days };
}
