import type { Video } from "./db";

export type Kind = "long" | "short" | "live";
export const KIND_LABEL: Record<Kind, string> = { long: "Video panjang", short: "Shorts", live: "Live" };

export function kindOf(v: Pick<Video, "is_short" | "is_live">): Kind {
  return v.is_live ? "live" : v.is_short ? "short" : "long";
}

export function median(xs: number[]): number | null {
  if (!xs.length) return null;
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

export function mean(xs: number[]): number | null {
  return xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null;
}

export const DAY = 86_400_000;
/** Videos younger than this are still collecting views; their outlier score is shown but not counted. */
export const MATURE_DAYS = 7;
/** How many earlier uploads of the same kind form a video's baseline. */
const BASELINE_N = 30;
/** Evergreen: a video at least this old that still gains EVERGREEN_MIN_PER_DAY views a day. */
export const EVERGREEN_AGE_DAYS = 90;
export const EVERGREEN_MIN_PER_DAY = 50;

export interface Scored extends Video {
  kind: Kind;
  ageDays: number;
  mature: boolean;
  /** views ÷ median views of the 30 previous uploads of the same kind (the outlier idea 1of10 uses). */
  outlier: number | null;
  commentsPer1k: number | null;
  /** views gained per day over the snapshot window; null until two snapshots exist */
  perDay: number | null;
  /** old (90+ days) and still pulling views, i.e. it never stopped growing */
  evergreen: boolean;
}

/** Adds kind, age and the outlier score. Input order does not matter. */
export function score(videos: Video[], perDay: Map<string, number> = new Map(), now = Date.now()): Scored[] {
  const byKind = new Map<Kind, Video[]>();
  for (const v of videos) {
    const k = kindOf(v);
    byKind.set(k, [...(byKind.get(k) ?? []), v]);
  }
  const out: Scored[] = [];
  for (const [kind, list] of byKind) {
    const asc = [...list].sort((a, b) => a.published_at.localeCompare(b.published_at));
    asc.forEach((v, i) => {
      const prior = asc.slice(Math.max(0, i - BASELINE_N), i).map((p) => p.views);
      const base = prior.length >= 5 ? median(prior) : null;
      const ageDays = (now - Date.parse(v.published_at)) / DAY;
      const pd = perDay.get(v.id) ?? null;
      out.push({
        ...v,
        kind,
        ageDays,
        mature: ageDays >= MATURE_DAYS,
        outlier: base ? v.views / base : null,
        commentsPer1k: v.views ? (v.comments / v.views) * 1000 : null,
        perDay: pd,
        evergreen: ageDays >= EVERGREEN_AGE_DAYS && pd !== null && pd >= EVERGREEN_MIN_PER_DAY,
      });
    });
  }
  return out.sort((a, b) => b.published_at.localeCompare(a.published_at));
}

export type Verdict = "tambah" | "pertahankan" | "evaluasi" | "data-kurang";
export const VERDICT_LABEL: Record<Verdict, string> = {
  tambah: "Tambah frekuensi",
  pertahankan: "Pertahankan",
  evaluasi: "Evaluasi",
  "data-kurang": "Data kurang",
};

export interface IpCard {
  ipId: number;
  episodes: number;
  medianViews: number | null;
  medianOutlier: number | null;
  avgComments: number | null;
  commentsPer1k: number | null;
  /** median outlier of the latest 4 mature episodes */
  recent: number | null;
  /** recent ÷ the 4 episodes before them, minus 1 (e.g. -0.14 = 14% lower) */
  trend: number | null;
  verdict: Verdict;
  lastPublished: string | null;
  /** episodes 90+ days old, and how many of them are evergreen */
  oldEpisodes: number;
  evergreenEpisodes: number;
  /** views a day the 90+ day old episodes still bring in, together */
  archivePerDay: number | null;
}

export const MIN_EPISODES = 3;

export function ipCard(ipId: number, eps: Scored[]): IpCard {
  const mature = eps.filter((e) => e.mature).sort((a, b) => b.published_at.localeCompare(a.published_at));
  const outliers = mature.map((e) => e.outlier).filter((x): x is number => x !== null);
  const mo = median(outliers);
  const recent = median(mature.slice(0, 4).map((e) => e.outlier).filter((x): x is number => x !== null));
  const before = median(mature.slice(4, 8).map((e) => e.outlier).filter((x): x is number => x !== null));
  const trend = recent !== null && before && mature.length >= 8 ? recent / before - 1 : null;
  const latest = mature.length >= 4 ? recent : null;
  const old = eps.filter((e) => e.ageDays >= EVERGREEN_AGE_DAYS);

  // Judge on level, not on raw change: an IP at 5× that slips to 4× is still far above the channel.
  let verdict: Verdict = "pertahankan";
  if (mature.length < MIN_EPISODES || mo === null) verdict = "data-kurang";
  else if (mo < 0.8 || (latest !== null && latest < 0.8)) verdict = "evaluasi";
  else if (mo >= 1.2 && (latest === null || latest >= 1.0)) verdict = "tambah";

  return {
    ipId,
    episodes: eps.length,
    medianViews: median(mature.map((e) => e.views)),
    medianOutlier: mo,
    avgComments: mean(mature.map((e) => e.comments)),
    commentsPer1k: median(mature.map((e) => e.commentsPer1k).filter((x): x is number => x !== null)),
    recent: latest,
    trend,
    verdict,
    lastPublished: eps[0]?.published_at ?? null,
    oldEpisodes: old.length,
    evergreenEpisodes: old.filter((e) => e.evergreen).length,
    archivePerDay: old.some((e) => e.perDay !== null) ? old.reduce((a, e) => a + (e.perDay ?? 0), 0) : null,
  };
}

export const fmt = {
  n(x: number | null | undefined): string {
    if (x === null || x === undefined) return "–";
    if (x >= 1_000_000) return `${(x / 1_000_000).toFixed(1).replace(/\.0$/, "")}jt`;
    if (x >= 1_000) return `${(x / 1_000).toFixed(1).replace(/\.0$/, "")}rb`;
    return Math.round(x).toString();
  },
  x(x: number | null | undefined): string {
    return x === null || x === undefined ? "–" : `${x.toFixed(1)}×`;
  },
  d(iso: string | null | undefined): string {
    if (!iso) return "–";
    return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "2-digit", timeZone: "Asia/Jakarta" }).format(new Date(iso));
  },
  dec(x: number | null | undefined, digits = 1): string {
    return x === null || x === undefined ? "–" : x.toFixed(digits);
  },
};

export function publishedWithin<T extends { published_at: string }>(xs: T[], days: number, now = Date.now()): T[] {
  return xs.filter((v) => now - Date.parse(v.published_at) <= days * DAY);
}
