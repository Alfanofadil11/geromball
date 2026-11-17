import "server-only";
import { db } from "./db";

export type Section = "guaranteed" | "expected" | "bonus";
export const SECTION_LABEL: Record<Section, string> = {
  guaranteed: "Guarantee views",
  expected: "Expected views",
  bonus: "Bonus",
};
export const SECTIONS: Section[] = ["guaranteed", "expected", "bonus"];

export interface Campaign {
  id: number;
  brand: string;
  name: string;
  start_date: string | null;
  end_date: string | null;
  keywords: string[];
  notes: string | null;
  active: boolean;
}

export interface Deliverable {
  id: number;
  campaign_id: number;
  section: Section;
  group_name: string;
  name: string;
  units_target: number;
  unit_label: string;
  views_per_unit: number | null;
  views_target: number;
  mirrored: boolean;
  sort: number;
}

export interface ItemVideo {
  id: string;
  title: string;
  published_at: string;
  thumbnail: string | null;
  views: number;
  is_short: boolean;
  is_live: boolean;
}

export interface Item {
  id: number;
  deliverable_id: number;
  video_id: string | null;
  title: string | null;
  url: string | null;
  units: number;
  ig_views: number;
  tiktok_views: number;
  other_views: number;
  note: string | null;
  created_at: string;
  video: ItemVideo | null;
}

/** YouTube views plus whatever the producer typed in for the mirrors. */
export function itemViews(i: Item): number {
  return (i.video?.views ?? 0) + Number(i.ig_views) + Number(i.tiktok_views) + Number(i.other_views);
}

export interface Progress {
  units: number;
  unitsTarget: number;
  views: number;
  viewsTarget: number;
}

export function progressOf(d: Deliverable, items: Item[]): Progress {
  return {
    units: items.reduce((a, i) => a + i.units, 0),
    unitsTarget: d.units_target,
    views: items.reduce((a, i) => a + itemViews(i), 0),
    viewsTarget: Number(d.views_target),
  };
}

export function sum(ps: Progress[]): Progress {
  return ps.reduce(
    (a, p) => ({ units: a.units + p.units, unitsTarget: a.unitsTarget + p.unitsTarget, views: a.views + p.views, viewsTarget: a.viewsTarget + p.viewsTarget }),
    { units: 0, unitsTarget: 0, views: 0, viewsTarget: 0 },
  );
}

export async function campaigns(): Promise<Campaign[]> {
  const { data, error } = await db().from("yt_campaigns").select("*").order("active", { ascending: false }).order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Campaign[];
}

/** One campaign with its deliverables and their items (each item with its YouTube video, if any). */
export async function campaignDetail(id: number) {
  const [c, d] = await Promise.all([
    db().from("yt_campaigns").select("*").eq("id", id).maybeSingle(),
    db().from("yt_campaign_deliverables").select("*").eq("campaign_id", id).order("sort").order("id"),
  ]);
  if (c.error) throw c.error;
  if (d.error) throw d.error;
  if (!c.data) return null;
  const deliverables = (d.data ?? []) as Deliverable[];
  const items = await itemsFor(deliverables.map((x) => x.id));
  return { campaign: c.data as Campaign, deliverables, items };
}

/** Deliverables and items of many campaigns at once, for the list page. */
export async function allProgress(): Promise<Map<number, { deliverables: Deliverable[]; items: Item[] }>> {
  const { data, error } = await db().from("yt_campaign_deliverables").select("*").order("sort");
  if (error) throw error;
  const deliverables = (data ?? []) as Deliverable[];
  const items = await itemsFor(deliverables.map((x) => x.id));
  const out = new Map<number, { deliverables: Deliverable[]; items: Item[] }>();
  for (const d of deliverables) {
    const e = out.get(d.campaign_id) ?? { deliverables: [], items: [] };
    e.deliverables.push(d);
    e.items.push(...items.filter((i) => i.deliverable_id === d.id));
    out.set(d.campaign_id, e);
  }
  return out;
}

async function itemsFor(deliverableIds: number[]): Promise<Item[]> {
  if (!deliverableIds.length) return [];
  const { data, error } = await db()
    .from("yt_campaign_items")
    .select("*, video:yt_videos(id,title,published_at,thumbnail,views,is_short,is_live)")
    .in("deliverable_id", deliverableIds)
    .order("created_at");
  if (error) throw error;
  return (data ?? []) as Item[];
}

/** Pulls an 11-character YouTube id out of a URL or a bare id. */
export function youtubeId(input: string): string | null {
  const s = input.trim();
  if (/^[\w-]{11}$/.test(s)) return s;
  const m = s.match(/(?:v=|youtu\.be\/|shorts\/|live\/|embed\/)([\w-]{11})/);
  return m ? m[1] : null;
}

export function daysSince(iso: string, now = Date.now()): number {
  return Math.floor((now - Date.parse(iso)) / 86_400_000);
}

/** Long form = guaranteed; short form = expected + bonus (clippers), as the SOWs are written. */
export function split(deliverables: Deliverable[], items: Item[]) {
  const of = (ds: Deliverable[]) => sum(ds.map((d) => progressOf(d, items.filter((i) => i.deliverable_id === d.id))));
  return {
    total: of(deliverables),
    long: of(deliverables.filter((d) => d.section === "guaranteed")),
    short: of(deliverables.filter((d) => d.section !== "guaranteed")),
  };
}

/** Ids of videos whose title or description mentions any of the keywords (e.g. the brand name). */
export async function keywordMatches(keywords: string[]): Promise<Set<string>> {
  const safe = keywords.map((k) => k.replace(/[%,()*\\]/g, "").trim()).filter(Boolean);
  if (!safe.length) return new Set();
  const or = safe.flatMap((k) => [`title.ilike.*${k}*`, `description.ilike.*${k}*`]).join(",");
  const { data, error } = await db().from("yt_videos").select("id").or(or).limit(200);
  if (error) throw error;
  return new Set((data ?? []).map((r) => r.id as string));
}
