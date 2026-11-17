import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireSession } from "@/lib/dashboard/auth";
import {
  SECTIONS,
  campaignDetail,
  daysSince,
  itemViews,
  keywordMatches,
  progressOf,
  split,
  type Campaign,
  type Deliverable,
  type Item,
  type Section,
} from "@/lib/dashboard/campaigns";
import { allVideos, type Video } from "@/lib/dashboard/db";
import { fmt } from "@/lib/dashboard/metrics";
import { addDeliverable, addItem, deleteDeliverable, removeItem, updateCampaign, updateDeliverable, updateItem } from "../../../actions";
import { IconCheck, IconChevronLeft, IconPlus, IconTrash } from "../../icons";
import SubmitButton from "../../SubmitButton";
import { Card, ProgressBar, btnGhost, btnPrimary, input, pct } from "../../ui";

export const metadata: Metadata = { title: "Kampanye" };
export const dynamic = "force-dynamic";

const SECTION_TITLE: Record<Section, { title: string; subtitle: string }> = {
  guaranteed: { title: "Guarantee views · Long form", subtitle: "Views yang dijanjikan ke brand. Dihitung dari views YouTube." },
  expected: { title: "Expected views · Short form", subtitle: "Perkiraan views, termasuk mirroring ke IG Reels dan TikTok (diisi manual)." },
  bonus: { title: "Bonus", subtitle: "Di luar janji, tetap dihitung ke total views." },
};

const small = "rounded-full border border-line bg-surface px-3 py-1.5 text-sm outline-none placeholder:text-faint focus:border-ink/40";

function dateRange(c: Campaign): string {
  const d = (s: string) => new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric" }).format(new Date(s));
  if (c.start_date && c.end_date) return `${d(c.start_date)} – ${d(c.end_date)}`;
  if (c.start_date) return `Mulai ${d(c.start_date)}`;
  return "Periode belum diisi";
}

export default async function CampaignPage({ params }: { params: Promise<{ id: string }> }) {
  await requireSession();
  const cid = Number((await params).id);
  const detail = await campaignDetail(cid);
  if (!detail) notFound();
  const { campaign, deliverables, items } = detail;
  const [videos, mentions] = await Promise.all([allVideos(), keywordMatches(campaign.keywords)]);

  const s = split(deliverables, items);
  const linked = new Set(items.map((i) => i.video_id).filter(Boolean));
  const recent = videos.filter((v) => daysSince(v.published_at) <= 180);
  // only videos from around the campaign window, so an older deal with the same brand does not show up
  const since = campaign.start_date ? daysSince(campaign.start_date) + 14 : 90;
  const suggestions = videos.filter((v) => mentions.has(v.id) && !linked.has(v.id) && daysSince(v.published_at) <= since).slice(0, 10);
  const started = campaign.start_date ? daysSince(campaign.start_date) + 1 : null;
  const length = campaign.start_date && campaign.end_date ? daysSince(campaign.start_date, Date.parse(campaign.end_date)) + 1 : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Link href="/dashboard/kampanye" className="inline-flex items-center gap-1 text-sm text-ink-soft hover:text-ink"><IconChevronLeft /> Semua kampanye</Link>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{campaign.name}</h1>
          <p className="mt-2 text-ink-soft">{dateRange(campaign)}{campaign.notes ? ` · ${campaign.notes}` : ""}</p>
        </div>
        <span className={`rounded-full px-3 py-1.5 text-sm font-medium ${campaign.active ? "bg-good-soft text-good" : "bg-surface text-faint"}`}>
          {campaign.active ? "Berjalan" : "Selesai"}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Big dark label="Total views" value={s.total.views} target={s.total.viewsTarget} note={`${pct(s.total.views, s.total.viewsTarget)} dari KPI`} />
        <Big label="Long form (guarantee)" value={s.long.views} target={s.long.viewsTarget} note={`${s.long.units} / ${s.long.unitsTarget} konten tayang`} />
        <Big label="Short form (expected)" value={s.short.views} target={s.short.viewsTarget} note={`${s.short.units} / ${s.short.unitsTarget} konten & klip`} />
        <div className="flex flex-col justify-between rounded-3xl bg-surface p-5">
          <div className="text-sm text-ink-soft">Periode</div>
          <div>
            <div className="text-3xl font-semibold tracking-tight tabular-nums">
              {started !== null && started > 0 ? <>Hari ke-{started}{length ? <span className="text-base font-normal text-faint"> / {length}</span> : null}</> : "–"}
            </div>
            {length && started !== null && <ProgressBar value={Math.max(0, started)} target={length} className="mt-3 h-2" />}
            <div className="mt-2 text-xs text-faint">{started === null ? "Isi tanggal di Pengaturan di bawah" : dateRange(campaign)}</div>
          </div>
        </div>
      </div>

      {suggestions.length > 0 && (
        <Card title="Video yang menyebut brand ini" subtitle={`Judul atau deskripsinya memuat: ${campaign.keywords.join(", ")}. Masukkan ke target yang sesuai.`}>
          <ul className="divide-y divide-line">
            {suggestions.map((v) => (
              <li key={v.id} className="flex flex-wrap items-center gap-3 py-3">
                <Thumb v={v} />
                <div className="min-w-0 flex-1">
                  <a href={`https://youtu.be/${v.id}`} target="_blank" rel="noreferrer" className="line-clamp-1 text-sm hover:underline">{v.title}</a>
                  <div className="text-xs text-faint">{fmt.d(v.published_at)} · {fmt.n(v.views)} views</div>
                </div>
                <form action={addItem} className="flex gap-2">
                  <input type="hidden" name="video" value={v.id} />
                  <select name="deliverable_id" aria-label="Masukkan ke" className={small}>
                    {deliverables.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                  <SubmitButton className={btnPrimary}>Masukkan</SubmitButton>
                </form>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {SECTIONS.map((section) => {
        const ds = deliverables.filter((d) => d.section === section);
        if (!ds.length) return null;
        return (
          <Card key={section} title={SECTION_TITLE[section].title} subtitle={SECTION_TITLE[section].subtitle}>
            <div className="space-y-4">
              {ds.map((d) => (
                <DeliverableBlock key={d.id} d={d} items={items.filter((i) => i.deliverable_id === d.id)} recent={recent} />
              ))}
            </div>
          </Card>
        );
      })}

      <Card title="Pengaturan kampanye">
        <details className="group">
          <summary className="cursor-pointer text-sm text-ink-soft hover:text-ink">Ubah nama, periode, kata kunci, dan target</summary>
          <div className="mt-5 space-y-8">
            <form action={updateCampaign} className="grid gap-3 md:grid-cols-2">
              <input type="hidden" name="id" value={campaign.id} />
              <label className="text-xs text-faint">Brand<input name="brand" defaultValue={campaign.brand} required className={`${input} mt-1 w-full`} /></label>
              <label className="text-xs text-faint">Nama kampanye<input name="name" defaultValue={campaign.name} required className={`${input} mt-1 w-full`} /></label>
              <label className="text-xs text-faint">Mulai<input type="date" name="start_date" defaultValue={campaign.start_date ?? ""} className={`${input} mt-1 w-full`} /></label>
              <label className="text-xs text-faint">Selesai<input type="date" name="end_date" defaultValue={campaign.end_date ?? ""} className={`${input} mt-1 w-full`} /></label>
              <label className="text-xs text-faint">Kata kunci (pisahkan koma)<input name="keywords" defaultValue={campaign.keywords.join(", ")} className={`${input} mt-1 w-full`} /></label>
              <label className="text-xs text-faint">Catatan<input name="notes" defaultValue={campaign.notes ?? ""} className={`${input} mt-1 w-full`} /></label>
              <label className="flex items-center gap-2 text-sm text-ink-soft"><input type="checkbox" name="active" defaultChecked={campaign.active} /> Masih berjalan</label>
              <div className="md:text-right"><SubmitButton className={btnPrimary}>Simpan kampanye</SubmitButton></div>
            </form>

            <div>
              <h3 className="mb-3 text-sm font-semibold">Target per konten</h3>
              <div className="space-y-2">
                {deliverables.map((d) => (
                  <div key={d.id} className="flex flex-wrap items-center gap-2">
                    <form action={updateDeliverable} className="flex flex-1 flex-wrap items-center gap-2">
                      <input type="hidden" name="id" value={d.id} />
                      <input name="name" defaultValue={d.name} aria-label="Nama" className={`${small} w-44`} />
                      <input name="units_target" defaultValue={d.units_target} aria-label="Jumlah" className={`${small} w-20`} />
                      <span className="text-xs text-faint">{d.unit_label} ×</span>
                      <input name="views_per_unit" defaultValue={d.views_per_unit ?? ""} placeholder="views/unit" aria-label="Views per unit" className={`${small} w-28`} />
                      <span className="text-xs text-faint">=</span>
                      <input name="views_target" defaultValue={d.views_target} aria-label="Total target views" className={`${small} w-32`} />
                      <SubmitButton className={`${btnGhost} py-1.5`}>Simpan</SubmitButton>
                    </form>
                    <form action={deleteDeliverable}>
                      <input type="hidden" name="id" value={d.id} />
                      <SubmitButton title={`Hapus ${d.name}`} className="grid h-8 w-8 place-items-center rounded-full text-faint hover:bg-bad-soft hover:text-bad"><IconTrash /></SubmitButton>
                    </form>
                  </div>
                ))}
              </div>
              <form action={addDeliverable} className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-4">
                <input type="hidden" name="campaign_id" value={campaign.id} />
                <select name="section" aria-label="Jenis KPI" className={small}>
                  <option value="guaranteed">Guarantee</option>
                  <option value="expected">Expected</option>
                  <option value="bonus">Bonus</option>
                </select>
                <input name="name" required placeholder="Nama konten" aria-label="Nama konten" className={`${small} w-40`} />
                <input name="group_name" placeholder="Grup (opsional)" aria-label="Grup" className={`${small} w-36`} />
                <input name="units_target" placeholder="Jumlah" aria-label="Jumlah" className={`${small} w-20`} />
                <input name="unit_label" placeholder="eps" aria-label="Satuan" className={`${small} w-16`} />
                <input name="views_per_unit" placeholder="Views/unit" aria-label="Views per unit" className={`${small} w-28`} />
                <input name="views_target" placeholder="Total (opsional)" aria-label="Total target views" className={`${small} w-32`} />
                <label className="flex items-center gap-1.5 text-xs text-ink-soft"><input type="checkbox" name="mirrored" /> + IG/TikTok</label>
                <SubmitButton className={`${btnPrimary} py-1.5`}>Tambah target</SubmitButton>
              </form>
            </div>
          </div>
        </details>
      </Card>
    </div>
  );
}

function Big({ dark = false, label, value, target, note }: { dark?: boolean; label: string; value: number; target: number; note: string }) {
  return (
    <div className={`flex flex-col justify-between rounded-3xl p-5 ${dark ? "bg-invert text-on-invert" : "bg-surface"}`}>
      <div className={`text-sm ${dark ? "opacity-80" : "text-ink-soft"}`}>{label}</div>
      <div className="mt-4">
        <div className="text-3xl font-semibold tracking-tight tabular-nums">
          {fmt.n(value)} <span className={`text-base font-normal ${dark ? "opacity-60" : "text-faint"}`}>/ {fmt.n(target)}</span>
        </div>
        <ProgressBar value={value} target={target} invert={dark} className="mt-3 h-2" />
        <div className={`mt-2 text-xs ${dark ? "opacity-80" : "text-faint"}`}>{note}</div>
      </div>
    </div>
  );
}

function Thumb({ v }: { v: { thumbnail: string | null } | null }) {
  return v?.thumbnail ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={v.thumbnail} alt="" className="h-11 w-20 flex-none rounded-lg object-cover" />
  ) : (
    <div className="hatch h-11 w-20 flex-none rounded-lg" />
  );
}

function DeliverableBlock({ d, items, recent }: { d: Deliverable; items: Item[]; recent: Video[] }) {
  const p = progressOf(d, items);
  const isClip = d.views_per_unit === null;
  const remaining = Math.max(0, d.units_target - p.units);
  const mine = new Set(items.map((i) => i.video_id));
  const likely = d.mirrored ? "short" : /live/i.test(`${d.group_name} ${d.name}`) ? "live" : "long";
  const groups: { label: string; kind: string }[] = [
    { label: "Shorts", kind: "short" },
    { label: "Live", kind: "live" },
    { label: "Video panjang", kind: "long" },
  ].sort((a, b) => Number(b.kind === likely) - Number(a.kind === likely));
  const kindOf = (v: Video) => (v.is_live ? "live" : v.is_short ? "short" : "long");

  return (
    <div className="rounded-2xl border border-line p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="font-semibold">
            {d.name}
            {d.group_name !== d.name && <span className="ml-2 text-xs font-normal text-faint">{d.group_name}</span>}
          </div>
          <div className="mt-0.5 text-xs text-faint">
            {d.units_target} {d.unit_label}
            {d.views_per_unit ? ` × ${fmt.n(d.views_per_unit)} views` : ""} = {fmt.n(d.views_target)} views
            {d.mirrored ? " · YouTube + IG + TikTok" : ""}
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold tabular-nums">
            {fmt.n(p.views)} <span className="font-normal text-faint">/ {fmt.n(p.viewsTarget)}</span>
          </div>
          <div className="text-xs text-ink-soft tabular-nums">{p.units} / {p.unitsTarget} {d.unit_label} tayang</div>
        </div>
      </div>
      <ProgressBar value={p.views} target={p.viewsTarget} className="mt-3 h-2" />

      {items.length > 0 && (
        <ul className="mt-3 divide-y divide-line">
          {items.map((i) => <ItemRow key={i.id} d={d} i={i} />)}
        </ul>
      )}

      {!isClip && remaining > 0 && remaining <= 12 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {Array.from({ length: remaining }, (_, k) => (
            <span key={k} className="rounded-full border border-dashed border-line px-3 py-1 text-xs text-faint">{d.unit_label} {p.units + k + 1} belum tayang</span>
          ))}
        </div>
      )}

      <details className="mt-3">
        <summary className="inline-flex cursor-pointer items-center gap-1 rounded-full bg-subtle px-3 py-1.5 text-sm text-ink-soft hover:text-ink">
          <IconPlus /> {isClip ? "Catat klip" : "Tambah konten"}
        </summary>
        <form action={addItem} className="mt-3 flex flex-wrap items-center gap-2">
          <input type="hidden" name="deliverable_id" value={d.id} />
          {isClip ? (
            <>
              <input name="title" required placeholder="Periode / batch, mis. Minggu 1" aria-label="Nama batch" className={`${small} w-48`} />
              <input name="units" placeholder="Jumlah klip" aria-label="Jumlah klip" className={`${small} w-28`} />
              <input name="other_views" placeholder="Total views" aria-label="Total views" className={`${small} w-32`} />
              <input name="link" placeholder="Link laporan (opsional)" aria-label="Link" className={`${small} min-w-0 flex-1`} />
            </>
          ) : (
            <>
              <select name="video" aria-label="Pilih video YouTube" className={`${small} min-w-0 max-w-full flex-1`}>
                <option value="">Pilih video YouTube…</option>
                {groups.map((g) => (
                  <optgroup key={g.kind} label={g.label}>
                    {recent
                      .filter((v) => kindOf(v) === g.kind && !mine.has(v.id))
                      .map((v) => <option key={v.id} value={v.id}>{fmt.d(v.published_at)} · {v.title.slice(0, 80)}</option>)}
                  </optgroup>
                ))}
              </select>
              <input name="link" placeholder="atau tempel link" aria-label="Link video" className={`${small} w-52`} />
              {d.mirrored && (
                <>
                  <input name="ig_views" placeholder="Views IG" aria-label="Views IG" className={`${small} w-28`} />
                  <input name="tiktok_views" placeholder="Views TikTok" aria-label="Views TikTok" className={`${small} w-32`} />
                </>
              )}
            </>
          )}
          <SubmitButton className={`${btnPrimary} py-1.5`}>Simpan</SubmitButton>
        </form>
      </details>
    </div>
  );
}

function ItemRow({ d, i }: { d: Deliverable; i: Item }) {
  const total = itemViews(i);
  const target = d.views_per_unit ? d.views_per_unit * i.units : null;
  const age = i.video ? daysSince(i.video.published_at) : null;
  const title = i.video?.title ?? i.title ?? i.url ?? "Konten";
  const href = i.video ? `https://youtu.be/${i.video.id}` : i.url;
  const isClip = d.views_per_unit === null;

  return (
    <li className="flex flex-wrap items-center gap-3 py-3">
      <Thumb v={i.video} />
      <div className="min-w-0 flex-1 basis-56">
        {href ? <a href={href} target="_blank" rel="noreferrer" className="line-clamp-1 text-sm hover:underline">{title}</a> : <span className="line-clamp-1 text-sm">{title}</span>}
        <div className="mt-0.5 flex flex-wrap gap-x-2 text-xs text-faint">
          {i.video && <span>{fmt.d(i.video.published_at)} · {age} hari lalu</span>}
          {isClip && <span>{i.units} klip</span>}
          {i.video && <span>YouTube {fmt.n(i.video.views)}</span>}
          {i.ig_views > 0 && <span>IG {fmt.n(i.ig_views)}</span>}
          {i.tiktok_views > 0 && <span>TikTok {fmt.n(i.tiktok_views)}</span>}
          {i.other_views > 0 && !isClip && <span>Lainnya {fmt.n(i.other_views)}</span>}
          {i.note && <span className="text-warn">{i.note}</span>}
        </div>
      </div>
      <div className="w-24 text-right text-sm font-semibold tabular-nums">{fmt.n(total)}</div>
      <div className="w-32 text-right">
        {target === null ? null : total >= target ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-good-soft px-2.5 py-1 text-xs font-medium text-good"><IconCheck /> Tercapai</span>
        ) : (
          <span className="inline-flex rounded-full bg-subtle px-2.5 py-1 text-xs text-ink-soft" title={`Target ${fmt.n(target)} views`}>Kurang {fmt.n(target - total)}</span>
        )}
      </div>
      <details className="relative">
        <summary className="cursor-pointer list-none rounded-full px-2 py-1 text-xs text-faint hover:bg-subtle hover:text-ink">Ubah</summary>
        <div className="absolute right-0 z-10 mt-2 w-72 space-y-2 rounded-2xl border border-line bg-surface p-3 shadow-lg">
          <form action={updateItem} className="space-y-2">
            <input type="hidden" name="id" value={i.id} />
            {isClip && <label className="block text-xs text-faint">Jumlah klip<input name="units" defaultValue={i.units} className={`${small} mt-1 w-full`} /></label>}
            {d.mirrored && !isClip && (
              <div className="grid grid-cols-2 gap-2">
                <label className="text-xs text-faint">Views IG<input name="ig_views" defaultValue={i.ig_views || ""} className={`${small} mt-1 w-full`} /></label>
                <label className="text-xs text-faint">Views TikTok<input name="tiktok_views" defaultValue={i.tiktok_views || ""} className={`${small} mt-1 w-full`} /></label>
              </div>
            )}
            <label className="block text-xs text-faint">{isClip ? "Total views" : "Views lain (opsional)"}<input name="other_views" defaultValue={i.other_views || ""} className={`${small} mt-1 w-full`} /></label>
            <label className="block text-xs text-faint">Catatan<input name="note" defaultValue={i.note ?? ""} className={`${small} mt-1 w-full`} /></label>
            {!isClip && <input type="hidden" name="units" value={i.units} />}
            {!d.mirrored && !isClip && (
              <>
                <input type="hidden" name="ig_views" value={i.ig_views} />
                <input type="hidden" name="tiktok_views" value={i.tiktok_views} />
              </>
            )}
            <SubmitButton className={`${btnPrimary} w-full py-1.5`}>Simpan</SubmitButton>
          </form>
          <form action={removeItem}>
            <input type="hidden" name="id" value={i.id} />
            <SubmitButton className="w-full rounded-full px-3 py-1.5 text-sm text-bad hover:bg-bad-soft">Keluarkan dari kampanye</SubmitButton>
          </form>
        </div>
      </details>
    </li>
  );
}
