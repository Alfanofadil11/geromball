import type { Metadata } from "next";
import Link from "next/link";
import { requireSession } from "@/lib/dashboard/auth";
import { allVideos, lookups, videoTalents } from "@/lib/dashboard/db";
import { KIND_LABEL, fmt, kindOf } from "@/lib/dashboard/metrics";
import { confirmPlaylistSuggestions, saveTag } from "../../actions";
import SubmitButton from "../SubmitButton";
import { Card } from "../ui";

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
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Tagging</h1>
        <p className="text-sm text-muted">
          Sistem sudah menebak IP dari playlist dan judul. Cek, koreksi kalau perlu, lalu simpan. Video yang sudah disimpan dihitung di scorecard sebagai &ldquo;terkonfirmasi&rdquo;.
          Video dengan saran juga sudah dihitung di scorecard.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-lg border border-card-border p-0.5 text-sm">
          {(Object.keys(FILTERS) as Filter[]).map((f) => (
            <Link key={f} href={`/dashboard/tagging?filter=${f}`} className={`rounded-md px-3 py-1 ${f === filter ? "bg-white text-black" : "text-white/70 hover:text-white"}`}>
              {FILTERS[f]}
            </Link>
          ))}
        </div>
        <form className="flex gap-2" action="/dashboard/tagging">
          <input type="hidden" name="filter" value={filter} />
          <input name="q" defaultValue={q} placeholder="Cari judul…" className="rounded-md border border-card-border bg-background px-3 py-1.5 text-sm" />
        </form>
        {playlistSuggestions > 0 && (
          <form action={confirmPlaylistSuggestions} className="ml-auto">
            <SubmitButton className="rounded-md border border-emerald-500/40 px-3 py-1.5 text-sm text-emerald-300 hover:bg-emerald-500/10">
              Konfirmasi {playlistSuggestions} saran dari playlist
            </SubmitButton>
          </form>
        )}
      </div>

      <p className="text-xs text-muted">{list.length} video</p>

      <div className="space-y-3">
        {shown.map((v) => {
          const mine = new Set(vt.get(v.id) ?? []);
          return (
            <form key={v.id} action={saveTag} className="rounded-xl border border-card-border bg-card p-3">
              <input type="hidden" name="video_id" value={v.id} />
              <div className="flex flex-col gap-3 md:flex-row">
                {v.thumbnail && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={v.thumbnail} alt="" className="h-20 w-36 flex-none rounded object-cover" />
                )}
                <div className="min-w-0 flex-1 space-y-2">
                  <div>
                    <a href={`https://youtu.be/${v.id}`} target="_blank" rel="noreferrer" className="font-medium hover:underline">{v.title}</a>
                    <div className="mt-0.5 flex flex-wrap gap-x-2 text-xs text-muted">
                      <span>{fmt.d(v.published_at)}</span>
                      <span>{KIND_LABEL[kindOf(v)]}</span>
                      <span>{fmt.n(v.views)} views</span>
                      <StatusPill status={v.tag_status} source={v.tag_source} ipName={v.ip_id ? ipName.get(v.ip_id) : undefined} />
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <select name="ip" defaultValue={v.ip_id ?? ""} className="rounded-md border border-card-border bg-background px-2 py-1.5">
                      <option value="">— IP —</option>
                      {ips.filter((i) => i.active || i.id === v.ip_id).map((i) => <option key={i.id} value={i.id}>{i.name}</option>)}
                    </select>
                    <select name="format" defaultValue={v.format_id ?? ""} className="rounded-md border border-card-border bg-background px-2 py-1.5">
                      <option value="">— Format —</option>
                      {formats.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
                    </select>
                    <input name="note" defaultValue={v.note ?? ""} placeholder="Catatan (opsional)" className="min-w-0 flex-1 rounded-md border border-card-border bg-background px-2 py-1.5" />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {talents.map((t) => (
                      <label key={t.id} className="cursor-pointer">
                        <input type="checkbox" name="talent" value={t.id} aria-label={t.name} defaultChecked={mine.has(t.id)} className="peer sr-only" />
                        <span className="inline-block rounded-full border border-card-border px-2.5 py-0.5 text-xs text-white/60 peer-checked:border-white peer-checked:bg-white peer-checked:text-black peer-focus-visible:ring-2 peer-focus-visible:ring-white/50">
                          {t.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex md:items-start">
                  <SubmitButton className="rounded-md bg-white px-4 py-1.5 text-sm font-medium text-black">Simpan</SubmitButton>
                </div>
              </div>
            </form>
          );
        })}
        {shown.length === 0 && (
          <Card title="Beres">
            <p className="text-sm text-white/70">Nggak ada video di filter ini.</p>
          </Card>
        )}
      </div>

      {pages > 1 && (
        <div className="flex items-center justify-center gap-3 text-sm">
          {page > 1 && <Link href={href({ hal: page - 1 })} className="text-white/70 hover:text-white">← Sebelumnya</Link>}
          <span className="text-muted">Halaman {page} / {pages}</span>
          {page < pages && <Link href={href({ hal: page + 1 })} className="text-white/70 hover:text-white">Berikutnya →</Link>}
        </div>
      )}
    </div>
  );
}

function StatusPill({ status, source, ipName }: { status: string; source: string | null; ipName?: string }) {
  if (status === "confirmed") return <span className="text-emerald-300">✓ Terkonfirmasi</span>;
  if (status === "suggested")
    return <span className="text-amber-200">Saran{ipName ? `: ${ipName}` : ""} ({source === "playlist" ? "dari playlist" : source === "keyword" ? "dari judul" : "talent"})</span>;
  return <span className="text-rose-200">Belum ada tag</span>;
}
