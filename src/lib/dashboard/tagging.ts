import type { Ip, Named } from "./db";

function norm(s: string): string {
  return s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");
}

export interface Suggestion {
  ipId: number | null;
  source: "playlist" | "keyword" | null;
  talentIds: number[];
}

/**
 * Rule-based first guess, which Bobbie then confirms or corrects:
 * 1. the video sits in an IP's playlist, 2. the title contains one of an IP's keywords.
 * Talents are matched on their name or keywords in the title and description.
 */
export function suggest(
  video: { title: string; description?: string | null; playlist_ids: string[] },
  ips: Ip[],
  talents: Named[],
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
    const byKeyword = active.find((ip) => ip.title_keywords.some((k) => k && title.includes(norm(k))));
    if (byKeyword) {
      ipId = byKeyword.id;
      source = "keyword";
    }
  }

  const talentIds = talents
    .filter((t) => [t.name, ...(t.title_keywords ?? [])].some((k) => k && text.includes(norm(k))))
    .map((t) => t.id);

  return { ipId, source, talentIds };
}
