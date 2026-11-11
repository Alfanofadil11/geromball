import Link from "next/link";
import { notFound } from "next/navigation";
import { requireSession } from "@/lib/dashboard/auth";
import { allVideos, lookups, videoTalents } from "@/lib/dashboard/db";
import { KIND_LABEL, fmt, ipCard, median, score, type Scored } from "@/lib/dashboard/metrics";
import { Card, KindTabs, OutlierText, Stat, VerdictBadge, parseKind } from "../../ui";

export const dynamic = "force-dynamic";

export default async function IpPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireSession();
  const ipId = Number((await params).id);
  const kind = parseKind((await searchParams).jenis);
  const [videos, { ips, talents, formats }, vt] = await Promise.all([allVideos(), lookups(), videoTalents()]);
  const ip = ips.find((i) => i.id === ipId);
  if (!ip) notFound();

  const eps = score(videos).filter((v) => v.kind === kind && v.ip_id === ipId);
  const card = ipCard(ipId, eps);
  const talentName = new Map(talents.map((t) => [t.id, t.name]));
  const formatName = new Map(formats.map((f) => [f.id, f.name]));

  // which talents show up in this IP's stronger episodes
  const byTalent = new Map<number, number[]>();
  for (const e of eps) {
    if (!e.mature || e.outlier === null) continue;
    for (const t of vt.get(e.id) ?? []) byTalent.set(t, [...(byTalent.get(t) ?? []), e.outlier]);
  }
  const talentRows = [...byTalent.entries()]
    .map(([t, xs]) => ({ name: talentName.get(t) ?? "?", n: xs.length, med: median(xs) }))
    .sort((a, b) => (b.med ?? 0) - (a.med ?? 0));

  // which segments (formats) carry this IP, e.g. Ranked vs Review inside Pojok Debat
  const byFormat = new Map<number | null, number[]>();
  for (const e of eps) {
    if (!e.mature || e.outlier === null) continue;
    byFormat.set(e.format_id, [...(byFormat.get(e.format_id) ?? []), e.outlier]);
  }
  const formatRows = [...byFormat.entries()]
    .map(([f, xs]) => ({ name: f === null ? "Tanpa format" : (formatName.get(f) ?? "?"), n: xs.length, med: median(xs) }))
    .sort((a, b) => (b.med ?? 0) - (a.med ?? 0));

  const chart = [...eps].filter((e) => e.outlier !== null).reverse().slice(-40);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Link href={`/dashboard?jenis=${kind}`} className="text-sm text-muted hover:text-white">← Ringkasan</Link>
          <h1 className="mt-1 flex items-center gap-3 text-2xl font-semibold">{ip.name} <VerdictBadge verdict={card.verdict} /></h1>
        </div>
        <KindTabs current={kind} base={`/dashboard/ip/${ipId}`} />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Episode" value={card.episodes} hint={KIND_LABEL[kind]} />
        <Stat label="Outlier median" value={<OutlierText value={card.medianOutlier} />} hint="1× = performa normal channel" />
        <Stat label="Median views" value={fmt.n(card.medianViews)} />
        <Stat label="Rata² komentar" value={fmt.n(card.avgComments)} hint={`${fmt.dec(card.commentsPer1k)} per 1rb views`} />
      </div>

      {chart.length > 1 && (
        <Card title="Outlier per episode (urut waktu)">
          <OutlierChart items={chart} />
        </Card>
      )}

      {formatRows.length > 1 && (
        <Card title="Format / segmen di IP ini">
          <BreakdownTable label="Format" rows={formatRows} />
          <p className="mt-2 text-xs text-muted">Format diisi otomatis dari judul (bisa dikoreksi di Tagging). Format dengan sedikit episode: baca sebagai petunjuk.</p>
        </Card>
      )}

      {talentRows.length > 0 && (
        <Card title="Talent di IP ini">
          <BreakdownTable label="Talent" rows={talentRows} />
          <p className="mt-2 text-xs text-muted">Sampel kecil: baca sebagai petunjuk, bukan kesimpulan.</p>
        </Card>
      )}

      <Card title="Semua episode">
        <div className="-mx-4 overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-2 font-medium">Video</th>
                <th className="px-2 py-2 font-medium text-right">Terbit</th>
                <th className="px-2 py-2 font-medium text-right">Views</th>
                <th className="px-2 py-2 font-medium text-right">Outlier</th>
                <th className="px-2 py-2 font-medium text-right">Komentar</th>
                <th className="px-4 py-2 font-medium">Talent · format</th>
              </tr>
            </thead>
            <tbody>
              {eps.map((e) => (
                <tr key={e.id} className="border-t border-card-border align-top">
                  <td className="px-4 py-2">
                    <a href={`https://youtu.be/${e.id}`} target="_blank" rel="noreferrer" className="hover:underline">{e.title}</a>
                    {e.note && <div className="mt-0.5 text-xs text-amber-200/80">📝 {e.note}</div>}
                  </td>
                  <td className="px-2 py-2 text-right whitespace-nowrap text-white/60">{fmt.d(e.published_at)}</td>
                  <td className="px-2 py-2 text-right tabular-nums">{fmt.n(e.views)}</td>
                  <td className="px-2 py-2 text-right tabular-nums"><OutlierText value={e.outlier} mature={e.mature} /></td>
                  <td className="px-2 py-2 text-right tabular-nums">{fmt.n(e.comments)}</td>
                  <td className="px-4 py-2 text-xs text-white/60">
                    {[(vt.get(e.id) ?? []).map((t) => talentName.get(t)).join(", "), e.format_id ? formatName.get(e.format_id) : ""].filter(Boolean).join(" · ") || "–"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-muted">* video &lt; 7 hari, angkanya masih bergerak.</p>
      </Card>
    </div>
  );
}

function OutlierChart({ items }: { items: Scored[] }) {
  const w = 720, h = 180, pad = 24;
  const max = Math.max(2, ...items.map((i) => i.outlier!));
  const bw = (w - pad) / items.length;
  const y = (v: number) => h - pad - (v / max) * (h - pad * 1.5);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label="Outlier per episode">
      <line x1={pad} x2={w} y1={y(1)} y2={y(1)} stroke="currentColor" className="text-white/30" strokeDasharray="4 4" />
      <text x={0} y={y(1) + 4} className="fill-white/50 text-[10px]">1×</text>
      {items.map((e, i) => {
        const v = e.outlier!;
        const fill = !e.mature ? "#ffffff33" : v >= 1.2 ? "#6ee7b7" : v < 0.8 ? "#fda4af" : "#cbd5e1";
        return (
          <rect key={e.id} x={pad + i * bw + 1} width={Math.max(1, bw - 2)} y={y(v)} height={h - pad - y(v)} fill={fill} rx={1.5}>
            <title>{`${e.title} · ${v.toFixed(1)}× · ${fmt.d(e.published_at)}`}</title>
          </rect>
        );
      })}
    </svg>
  );
}

function BreakdownTable({ label, rows }: { label: string; rows: { name: string; n: number; med: number | null }[] }) {
  return (
    <table className="w-full text-sm">
      <thead className="text-left text-xs uppercase tracking-wider text-muted">
        <tr><th className="py-1 font-medium">{label}</th><th className="py-1 text-right font-medium">Episode</th><th className="py-1 text-right font-medium">Outlier median</th></tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.name} className="border-t border-card-border">
            <td className="py-1.5">{r.name}</td>
            <td className="py-1.5 text-right tabular-nums">{r.n}</td>
            <td className="py-1.5 text-right tabular-nums"><OutlierText value={r.med} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
