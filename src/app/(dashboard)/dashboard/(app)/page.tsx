import Link from "next/link";
import { requireSession } from "@/lib/dashboard/auth";
import { allVideos, lookups } from "@/lib/dashboard/db";
import { KIND_LABEL, MIN_EPISODES, fmt, ipCard, publishedWithin, score } from "@/lib/dashboard/metrics";
import { Card, KindTabs, OutlierText, Stat, VerdictBadge, parseKind } from "./ui";

export const dynamic = "force-dynamic";

export default async function Overview({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await requireSession();
  const kind = parseKind((await searchParams).jenis);
  const [videos, { ips }] = await Promise.all([allVideos(), lookups()]);
  const scored = score(videos).filter((v) => v.kind === kind);

  const untagged = videos.filter((v) => v.tag_status !== "confirmed").length;
  const cards = ips
    .map((ip) => ({ ip, card: ipCard(ip.id, scored.filter((v) => v.ip_id === ip.id)) }))
    .filter(({ card }) => card.episodes > 0)
    .sort((a, b) => (b.card.medianOutlier ?? -1) - (a.card.medianOutlier ?? -1));
  const noIp = scored.filter((v) => v.ip_id === null).length;

  const last30 = publishedWithin(scored, 30);
  const recentMature = publishedWithin(scored, 60).filter((v) => v.mature && v.outlier !== null);
  const top = [...recentMature].sort((a, b) => b.outlier! - a.outlier!).slice(0, 5);
  const bottom = [...recentMature].sort((a, b) => a.outlier! - b.outlier!).slice(0, 5);
  const ipName = new Map(ips.map((i) => [i.id, i.name]));

  if (!videos.length) {
    return (
      <Card title="Belum ada data">
        <p className="text-sm text-white/70">Klik <b>Sync sekarang</b> di kanan atas untuk menarik semua video Geromball dari YouTube.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Keputusan konten</h1>
          <p className="text-sm text-muted">IP mana yang ditambah, dipertahankan, atau dievaluasi, dibandingkan dengan performa channel sendiri.</p>
        </div>
        <KindTabs current={kind} base="/dashboard" />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label={`${KIND_LABEL[kind]} · 30 hari`} value={last30.length} hint="video terbit" />
        <Stat label="Median views · 30 hari" value={fmt.n(last30.length ? [...last30].sort((a, b) => a.views - b.views)[Math.floor(last30.length / 2)].views : null)} />
        <Stat label="Belum dikonfirmasi" value={<Link href="/dashboard/tagging" className="underline decoration-white/30">{untagged}</Link>} hint="video perlu dicek Bobbie" />
        <Stat label="Tanpa IP" value={noIp} hint={`${KIND_LABEL[kind].toLowerCase()} belum masuk IP mana pun`} />
      </div>

      <Card title={`Scorecard IP · ${KIND_LABEL[kind]}`}>
        {cards.length === 0 ? (
          <p className="text-sm text-white/60">Belum ada {KIND_LABEL[kind].toLowerCase()} yang masuk IP. Tag dulu di halaman Tagging.</p>
        ) : (
          <div className="-mx-4 overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-4 py-2 font-medium">IP</th>
                  <th className="px-2 py-2 font-medium text-right">Episode</th>
                  <th className="px-2 py-2 font-medium text-right" title="Median dari (views ÷ median 30 video sebelumnya). 1× = rata-rata channel.">Outlier median</th>
                  <th className="px-2 py-2 font-medium text-right" title="Outlier median 4 episode terakhir">4 terakhir</th>
                  <th className="px-2 py-2 font-medium text-right" title="Outlier 4 episode terakhir dibanding 4 sebelumnya">Tren</th>
                  <th className="px-2 py-2 font-medium text-right">Median views</th>
                  <th className="px-2 py-2 font-medium text-right">Rata² komentar</th>
                  <th className="px-2 py-2 font-medium text-right" title="Komentar per 1.000 views">Komentar/1rb</th>
                  <th className="px-2 py-2 font-medium text-right">Terakhir</th>
                  <th className="px-4 py-2 font-medium">Sinyal</th>
                </tr>
              </thead>
              <tbody>
                {cards.map(({ ip, card }) => (
                  <tr key={ip.id} className="border-t border-card-border">
                    <td className="px-4 py-2">
                      <Link href={`/dashboard/ip/${ip.id}?jenis=${kind}`} className="font-medium hover:underline">{ip.name}</Link>
                    </td>
                    <td className="px-2 py-2 text-right tabular-nums">{card.episodes}</td>
                    <td className="px-2 py-2 text-right tabular-nums"><OutlierText value={card.medianOutlier} /></td>
                    <td className="px-2 py-2 text-right tabular-nums"><OutlierText value={card.recent} /></td>
                    <td className="px-2 py-2 text-right tabular-nums">
                      {card.trend === null ? <span className="text-muted">–</span> : (
                        <span className={`whitespace-nowrap ${card.trend > 0.1 ? "text-emerald-300" : card.trend < -0.1 ? "text-rose-300" : "text-white/60"}`}>
                          {card.trend > 0.1 ? "▲" : card.trend < -0.1 ? "▼" : "•"} {Math.round(Math.abs(card.trend) * 100)}%
                        </span>
                      )}
                    </td>
                    <td className="px-2 py-2 text-right tabular-nums">{fmt.n(card.medianViews)}</td>
                    <td className="px-2 py-2 text-right tabular-nums">{fmt.n(card.avgComments)}</td>
                    <td className="px-2 py-2 text-right tabular-nums">{fmt.dec(card.commentsPer1k)}</td>
                    <td className="px-2 py-2 text-right whitespace-nowrap text-white/60">{fmt.d(card.lastPublished)}</td>
                    <td className="px-4 py-2"><VerdictBadge verdict={card.verdict} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="mt-3 text-xs text-muted">
          Outlier = views ÷ median views 30 {KIND_LABEL[kind].toLowerCase()} sebelumnya, jadi 2× artinya dua kali performa normal channel saat itu.
          Video &lt; 7 hari belum dihitung. Sinyal butuh minimal {MIN_EPISODES} episode. Tambah: outlier median ≥ 1.2× dan 4 episode terakhir ≥ 1×. Evaluasi: outlier median atau 4 episode terakhir &lt; 0.8×.
        </p>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <OutlierList title="Paling meledak · 60 hari" items={top} ipName={ipName} />
        <OutlierList title="Paling jeblok · 60 hari" items={bottom} ipName={ipName} />
      </div>
    </div>
  );
}

function OutlierList({ title, items, ipName }: { title: string; items: ReturnType<typeof score>; ipName: Map<number, string> }) {
  return (
    <Card title={title}>
      {items.length === 0 ? <p className="text-sm text-white/60">Belum cukup data.</p> : (
        <ul className="space-y-3">
          {items.map((v) => (
            <li key={v.id} className="flex gap-3">
              {v.thumbnail && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={v.thumbnail} alt="" className="h-12 w-20 flex-none rounded object-cover" />
              )}
              <div className="min-w-0 flex-1">
                <a href={`https://youtu.be/${v.id}`} target="_blank" rel="noreferrer" className="line-clamp-2 text-sm hover:underline">{v.title}</a>
                <div className="mt-0.5 text-xs text-muted">
                  {v.ip_id ? ipName.get(v.ip_id) : "Tanpa IP"} · {fmt.d(v.published_at)} · {fmt.n(v.views)} views
                </div>
              </div>
              <div className="text-right text-sm tabular-nums"><OutlierText value={v.outlier} /></div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
