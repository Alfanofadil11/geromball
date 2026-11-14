import Link from "next/link";
import { notFound } from "next/navigation";
import { requireSession } from "@/lib/dashboard/auth";
import { allVideos, lookups, velocity, videoTalents } from "@/lib/dashboard/db";
import { EVERGREEN_AGE_DAYS, EVERGREEN_MIN_PER_DAY, KIND_LABEL, fmt, ipCard, median, score, type Scored } from "@/lib/dashboard/metrics";
import { IconChevronLeft } from "../../icons";
import { Card, KindTabs, OutlierText, Stat, TableFrame, VerdictBadge, parseKind, td, tdR, th, thR, theadRow, tr } from "../../ui";

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
  const [videos, { ips, talents, formats }, vt, vel] = await Promise.all([allVideos(), lookups(), videoTalents(), velocity()]);
  const ip = ips.find((i) => i.id === ipId);
  if (!ip) notFound();

  const eps = score(videos, vel.perDay).filter((v) => v.kind === kind && v.ip_id === ipId);
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
          <Link href={`/dashboard?jenis=${kind}`} className="inline-flex items-center gap-1 text-sm text-ink-soft hover:text-ink"><IconChevronLeft /> Ringkasan</Link>
          <h1 className="mt-2 flex flex-wrap items-center gap-3 text-3xl font-semibold tracking-tight md:text-4xl">{ip.name} <VerdictBadge verdict={card.verdict} /></h1>
        </div>
        <KindTabs current={kind} base={`/dashboard/ip/${ipId}`} />
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        <Stat label="Episode" value={card.episodes} hint={KIND_LABEL[kind]} />
        <Stat label="Outlier median" value={<OutlierText value={card.medianOutlier} />} hint="1× = performa normal channel" />
        <Stat label="Median views" value={fmt.n(card.medianViews)} />
        <Stat label="Rata² komentar" value={fmt.n(card.avgComments)} hint={`${fmt.dec(card.commentsPer1k)} per 1rb views`} />
        <Stat
          label="Evergreen"
          value={card.oldEpisodes ? <>{card.evergreenEpisodes}<span className="text-base text-faint"> / {card.oldEpisodes}</span></> : "–"}
          hint={card.archivePerDay === null ? `episode ${EVERGREEN_AGE_DAYS}+ hari, menunggu data harian` : `episode ${EVERGREEN_AGE_DAYS}+ hari masih bawa ${fmt.n(card.archivePerDay)} views/hari`}
        />
      </div>

      {chart.length > 1 && (
        <Card title="Outlier per episode" subtitle="Urut waktu, 40 episode terakhir. Garis putus-putus = performa normal channel (1×).">
          <OutlierChart items={chart} />
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2 [&>*]:min-w-0">
      {formatRows.length > 1 && (
        <Card title="Format / segmen di IP ini">
          <BreakdownTable label="Format" rows={formatRows} />
          <p className="mt-3 text-xs text-faint">Format diisi otomatis dari judul (bisa dikoreksi di Tagging). Format dengan sedikit episode: baca sebagai petunjuk.</p>
        </Card>
      )}

      {talentRows.length > 0 && (
        <Card title="Talent di IP ini">
          <BreakdownTable label="Talent" rows={talentRows} />
          <p className="mt-3 text-xs text-faint">Sampel kecil: baca sebagai petunjuk, bukan kesimpulan.</p>
        </Card>
      )}

      </div>

      <Card title="Semua episode">
          <TableFrame minWidth={820}>
            <thead>
              <tr className={theadRow}>
                <th className={th}>Video</th>
                <th className={thR}>Terbit</th>
                <th className={thR}>Views</th>
                <th className={thR}>Outlier</th>
                <th className={thR} title="Views yang bertambah per hari belakangan ini">Views/hari</th>
                <th className={thR}>Komentar</th>
                <th className={th}>Talent · format</th>
              </tr>
            </thead>
            <tbody>
              {eps.map((e) => (
                <tr key={e.id} className={`${tr} align-top`}>
                  <td className={td}>
                    <a href={`https://youtu.be/${e.id}`} target="_blank" rel="noreferrer" className="hover:underline">{e.title}</a>
                    {e.note && <div className="mt-0.5 text-xs text-warn">📝 {e.note}</div>}
                  </td>
                  <td className={`${tdR} whitespace-nowrap text-ink-soft`}>{fmt.d(e.published_at)}</td>
                  <td className={tdR}>{fmt.n(e.views)}</td>
                  <td className={tdR}><OutlierText value={e.outlier} mature={e.mature} /></td>
                  <td className={`${tdR} whitespace-nowrap`}>
                    {e.perDay === null ? <span className="text-faint">–</span> : (
                      <span className={e.evergreen ? "font-medium text-good" : "text-ink-soft"} title={e.evergreen ? "Evergreen: video lama yang masih terus ditonton" : undefined}>
                        {e.evergreen && "🌱 "}+{fmt.n(e.perDay)}
                      </span>
                    )}
                  </td>
                  <td className={tdR}>{fmt.n(e.comments)}</td>
                  <td className={`${td} text-xs text-ink-soft`}>
                    {[(vt.get(e.id) ?? []).map((t) => talentName.get(t)).join(", "), e.format_id ? formatName.get(e.format_id) : ""].filter(Boolean).join(" · ") || "–"}
                  </td>
                </tr>
              ))}
            </tbody>
          </TableFrame>
        <p className="mt-3 text-xs text-faint">* video &lt; 7 hari, angkanya masih bergerak. 🌱 evergreen: umur {EVERGREEN_AGE_DAYS}+ hari dan masih ≥ {EVERGREEN_MIN_PER_DAY} views/hari.</p>
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
      <line x1={pad} x2={w} y1={y(1)} y2={y(1)} stroke="currentColor" className="text-faint" strokeDasharray="4 4" />
      <text x={0} y={y(1) + 4} className="fill-current text-[10px] text-faint">1×</text>
      {items.map((e, i) => {
        const v = e.outlier!;
        const tone = !e.mature ? "text-line" : v >= 1.2 ? "text-ink" : v < 0.8 ? "text-bad" : "text-faint";
        return (
          <rect key={e.id} x={pad + i * bw + 1} width={Math.max(1, bw - 2)} y={y(v)} height={h - pad - y(v)} fill="currentColor" className={tone} rx={3}>
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
      <thead className="text-left text-xs text-faint">
        <tr><th className="py-2 font-medium">{label}</th><th className="py-2 text-right font-medium">Episode</th><th className="py-2 text-right font-medium">Outlier median</th></tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.name} className="border-t border-line">
            <td className="py-2.5">{r.name}</td>
            <td className="py-2.5 text-right tabular-nums">{r.n}</td>
            <td className="py-2.5 text-right tabular-nums"><OutlierText value={r.med} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
