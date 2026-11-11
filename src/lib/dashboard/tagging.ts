import type { Ip, Named } from "./db";

function norm(s: string): string {
  return s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");
}

/** Keyword must start at a word boundary, so "review:" does not match inside "preview:". */
function has(text: string, keyword: string): boolean {
  const k = norm(keyword).trim();
  if (!k) return false;
  let from = 0;
  for (;;) {
    const i = text.indexOf(k, from);
    if (i < 0) return false;
    if (i === 0 || !/[\p{L}\p{N}]/u.test(text[i - 1])) return true;
    from = i + 1;
  }
}

export interface Suggestion {
  ipId: number | null;
  source: "playlist" | "keyword" | null;
  talentIds: number[];
  formatId: number | null;
}

/**
 * Rule-based first guess, which Bobbie then confirms or corrects:
 * 1. the video sits in an IP's playlist, 2. the title contains one of an IP's keywords.
 * Talents are matched on their name or keywords in the title and description.
 * Formats are matched on title keywords; `formats` must come in priority order (first match wins).
 */
export function suggest(
  video: { title: string; description?: string | null; playlist_ids: string[] },
  ips: Ip[],
  talents: Named[],
  formats: Named[] = [],
): Suggestion {
  const active = ips.filter((ip) => ip.active);
  const title = norm(video.title);
  const text = `${title} ${norm(video.description ?? "")}`;

  let ipId: number | null = null;
  let source: Suggestion["source"] = null;
  const byPlaylist = active.find((ip) => ip.playlist_id && video.playlist_ids.includes(ip.playlist_id));
  if (byPlaylist) {
    ipId = byPlaylist.id;
    source = "playlist";
  } else {
    const byKeyword = active.find((ip) => ip.title_keywords.some((k) => has(title, k)));
    if (byKeyword) {
      ipId = byKeyword.id;
      source = "keyword";
    }
  }

  const talentIds = talents
    .filter((t) => [t.name, ...(t.title_keywords ?? [])].some((k) => has(text, k)))
    .map((t) => t.id);

  const format = formats.find((f) => (f.title_keywords ?? []).some((k) => has(title, k)));

  return { ipId, source, talentIds, formatId: format?.id ?? null };
}
