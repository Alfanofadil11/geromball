import type { Metadata } from "next";
import Link from "next/link";
import { requireSession } from "@/lib/dashboard/auth";
import { allVideos, lookups, videoTalents } from "@/lib/dashboard/db";
import { KIND_LABEL, fmt, kindOf } from "@/lib/dashboard/metrics";
import { confirmPlaylistSuggestions, saveTag } from "../../actions";
import SubmitButton from "../SubmitButton";
import { IconSearch } from "../icons";
import { Card, btnPrimary, input } from "../ui";

export const metadata: Metadata = { title: "Tagging" };
export const dynamic = "force-dynamic";

const FILTERS = {
  perlu: "Perlu dicek",
  saran: "Ada saran",
  kosong: "Tanpa saran",
  semua: "Semua",
} as const;
type Filter = keyof typeof FILTERS;
const PAGE = 30;

export default async function Tagging({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await requireSession();
  const sp = await searchParams;
  const filter: Filter = (Object.keys(FILTERS) as Filter[]).includes(sp.filter as Filter) ? (sp.filter as Filter) : "perlu";
  const q = typeof sp.q === "string" ? sp.q.trim().toLowerCase() : "";
  const page = Math.max(1, Number(sp.hal ?? 1) || 1);

  const [videos, { ips, formats, talents }, vt] = await Promise.all([allVideos(), lookups(), videoTalents()]);
  const ipName = new Map(ips.map((i) => [i.id, i.name]));

  let list = videos;
  if (filter === "perlu") list = list.filter((v) => v.tag_status !== "confirmed");
  if (filter === "saran") list = list.filter((v) => v.tag_status === "suggested");
  if (filter === "kosong") list = list.filter((v) => v.tag_status === "untagged");
  if (q) list = list.filter((v) => v.title.toLowerCase().includes(q));
  const pages = Math.max(1, Math.ceil(list.length / PAGE));
  const shown = list.slice((page - 1) * PAGE, page * PAGE);
  const playlistSuggestions = videos.filter((v) => v.tag_status === "suggested" && v.tag_source === "playlist").length;

  const href = (o: Partial<{ filter: string; q: string; hal: number }>) => {
    const p = new URLSearchParams({ filter, ...(q ? { q } : {}), ...Object.fromEntries(Object.entries(o).map(([k, v]) => [k, String(v)])) });
    return `/dashboard/tagging?${p}`;
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Tagging</h1>
        <p className="mt-2 max-w-3xl text-ink-soft">
          Sistem sudah menebak IP dari playlist dan judul. Cek, koreksi kalau perlu, lalu simpan. Video yang sudah disimpan dihitung di scorecard sebagai &ldquo;terkonfirmasi&rdquo;.
          Video dengan saran juga sudah dihitung di scorecard.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex flex-wrap rounded-full bg-surface p-1 text-sm">
          {(Object.keys(FILTERS) as Filter[]).map((f) => (
            <Link key={f} href={`/dashboard/tagging?filter=${f}`} className={`rounded-full px-4 py-1.5 ${f === filter ? "bg-invert text-on-invert" : "text-ink-soft hover:text-ink"}`}>
              {FILTERS[f]}
            </Link>
          ))}
        </div>
        <form className="relative" action="/dashboard/tagging">
          <IconSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
          <input type="hidden" name="filter" value={filter} />
          <input name="q" defaultValue={q} placeholder="Cari judul" aria-label="Cari judul" className={`${input} w-64 pl-10`} />
        </form>
        {playlistSuggestions > 0 && (
          <form action={confirmPlaylistSuggestions} className="ml-auto">
            <SubmitButton className="rounded-full bg-good-soft px-4 py-2 text-sm font-medium text-good hover:opacity-90">
              Konfirmasi {playlistSuggestions} saran dari playlist
            </SubmitButton>
          </form>
        )}
      </div>

      <p className="text-xs text-faint">{list.length} video</p>

      <div className="space-y-3">
        {shown.map((v) => {
          const mine = new Set(vt.get(v.id) ?? []);
          return (
            <form key={v.id} action={saveTag} className="rounded-3xl bg-surface p-4">
              <input type="hidden" name="video_id" value={v.id} />
              <div className="flex flex-col gap-3 md:flex-row">
                {v.thumbnail && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={v.thumbnail} alt="" className="h-20 w-36 flex-none rounded-xl object-cover" />
                )}
                <div className="min-w-0 flex-1 space-y-2">
                  <div>
                    <a href={`https://youtu.be/${v.id}`} target="_blank" rel="noreferrer" className="font-medium hover:underline">{v.title}</a>
                    <div className="mt-1 flex flex-wrap gap-x-2 text-xs text-faint">
                      <span>{fmt.d(v.published_at)}</span>
                      <span>{KIND_LABEL[kindOf(v)]}</span>
                      <span>{fmt.n(v.views)} views</span>
                      <StatusPill status={v.tag_status} source={v.tag_source} ipName={v.ip_id ? ipName.get(v.ip_id) : undefined} />
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <select name="ip" defaultValue={v.ip_id ?? ""} className="rounded-full border border-line bg-surface px-3 py-2">
                      <option value="">— IP —</option>
                      {ips.filter((i) => i.active || i.id === v.ip_id).map((i) => <option key={i.id} value={i.id}>{i.name}</option>)}
                    </select>
                    <select name="format" defaultValue={v.format_id ?? ""} className="rounded-full border border-line bg-surface px-3 py-2">
                      <option value="">— Format —</option>
                      {formats.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
                    </select>
                    <input name="note" defaultValue={v.note ?? ""} placeholder="Catatan (opsional)" className={`${input} min-w-0 flex-1`} />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {talents.map((t) => (
                      <label key={t.id} className="cursor-pointer">
                        <input type="checkbox" name="talent" value={t.id} aria-label={t.name} defaultChecked={mine.has(t.id)} className="peer sr-only" />
                        <span className="inline-block rounded-full border border-line px-3 py-1 text-xs text-ink-soft peer-checked:border-invert peer-checked:bg-invert peer-checked:text-on-invert peer-focus-visible:ring-2 peer-focus-visible:ring-ink/40">
                          {t.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex md:items-start">
                  <SubmitButton className={btnPrimary}>Simpan</SubmitButton>
                </div>
              </div>
            </form>
          );
        })}
        {shown.length === 0 && (
          <Card title="Beres">
            <p className="text-sm text-ink-soft">Nggak ada video di filter ini.</p>
          </Card>
        )}
      </div>

      {pages > 1 && (
        <div className="flex items-center justify-center gap-3 text-sm">
          {page > 1 && <Link href={href({ hal: page - 1 })} className="rounded-full bg-surface px-4 py-2 text-ink-soft hover:text-ink">← Sebelumnya</Link>}
          <span className="text-faint">Halaman {page} / {pages}</span>
          {page < pages && <Link href={href({ hal: page + 1 })} className="rounded-full bg-surface px-4 py-2 text-ink-soft hover:text-ink">Berikutnya →</Link>}
        </div>
      )}
    </div>
  );
}

function StatusPill({ status, source, ipName }: { status: string; source: string | null; ipName?: string }) {
  if (status === "confirmed") return <span className="font-medium text-good">✓ Terkonfirmasi</span>;
  if (status === "suggested")
    return <span className="text-warn">Saran{ipName ? `: ${ipName}` : ""} ({source === "playlist" ? "dari playlist" : "dari judul"})</span>;
  return <span className="text-bad">Belum ada tag</span>;
}
