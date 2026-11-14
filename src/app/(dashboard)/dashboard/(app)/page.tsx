import Link from "next/link";
import { requireSession } from "@/lib/dashboard/auth";
import { allVideos, lookups, velocity } from "@/lib/dashboard/db";
import {
  EVERGREEN_AGE_DAYS,
  EVERGREEN_MIN_PER_DAY,
  KIND_LABEL,
  MIN_EPISODES,
  fmt,
  ipCard,
  median,
  score,
  type Kind,
  type Scored,
} from "@/lib/dashboard/metrics";
import { syncNow } from "../actions";
import { IconBolt, IconEye, IconFilm, IconLeaf, IconLive, IconPhone, IconPlus, IconSearch, IconTrophy, IconUpload } from "./icons";
import SubmitButton from "./SubmitButton";
import { Card, Delta, KindTabs, OutlierText, TableFrame, VerdictBadge, btnGhost, btnPrimary, input, parseKind, td, tdR, th, thR, theadRow, tr } from "./ui";

export const dynamic = "force-dynamic";

const SHORT_LABEL: Record<Kind, string> = { long: "Panjang", short: "Shorts", live: "Live" };
const KIND_ICON: Record<Kind, typeof IconFilm> = { long: IconFilm, short: IconPhone, live: IconLive };

/** Greeting by the time the page is opened, on Jakarta time. */
function greeting(now = new Date()): string {
  const h = Number(new Intl.DateTimeFormat("en-GB", { hour: "numeric", hourCycle: "h23", timeZone: "Asia/Jakarta" }).format(now));
  if (h >= 4 && h < 12) return "Good morning";
  if (h >= 12 && h < 17) return "Good afternoon";
  return "Good evening";
}

/** The last n calendar months (Jakarta), oldest first, as YYYY-MM. */
function lastMonths(n: number, now = new Date()): string[] {
  const [y, m] = monthKey(now.toISOString()).split("-").map(Number);
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(Date.UTC(y, m - 1 - (n - 1 - i), 1));
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
  });
}
function monthKey(iso: string): string {
  return new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "2-digit", timeZone: "Asia/Jakarta" }).format(new Date(iso));
}
function monthLabel(key: string): string {
  const [y, m] = key.split("-").map(Number);
  return new Intl.DateTimeFormat("id-ID", { month: "short", timeZone: "UTC" }).format(new Date(Date.UTC(y, m - 1, 15)));
}

const change = (a: number | null, b: number | null) => (a !== null && b ? a / b - 1 : null);
const outliers = (xs: Scored[]) => xs.map((v) => v.outlier).filter((x): x is number => x !== null);

export default async function Overview({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await requireSession();
  const sp = await searchParams;
  const kind = parseKind(sp.jenis);
  const q = typeof sp.q === "string" ? sp.q.trim() : "";
  const [videos, { ips }, vel] = await Promise.all([allVideos(), lookups(), velocity()]);

  if (!videos.length) {
    return (
      <Card title="Belum ada data">
        <p className="text-sm text-ink-soft">Klik ikon sync di kanan atas untuk menarik semua video Geromball dari YouTube.</p>
      </Card>
    );
  }

  const all = score(videos, vel.perDay);
  const scored = all.filter((v) => v.kind === kind);
  const ipName = new Map(ips.map((i) => [i.id, i.name]));

  // channel totals (every kind)
  const totalViews = all.reduce((a, v) => a + v.views, 0);
  const perDayAll = vel.days ? all.reduce((a, v) => a + (v.perDay ?? 0), 0) : null;
  const kinds = (Object.keys(KIND_LABEL) as Kind[]).map((k) => {
    const list = all.filter((v) => v.kind === k);
    return {
      kind: k,
      views: list.reduce((a, v) => a + v.views, 0),
      count: list.length,
      last30: list.filter((v) => v.ageDays < 30).length,
    };
  });

  // this kind: last 30 days vs the 30 before. Outlier and views use videos at least 7 days old,
  // so both windows are compared on videos that had their first week.
  const up30 = scored.filter((v) => v.ageDays < 30).length;
  const upPrev = scored.filter((v) => v.ageDays >= 30 && v.ageDays < 60).length;
  const cur = scored.filter((v) => v.ageDays >= 7 && v.ageDays < 37);
  const prev = scored.filter((v) => v.ageDays >= 37 && v.ageDays < 67);
  const outCur = median(outliers(cur));
  const outPrev = median(outliers(prev));
  const viewsCur = median(cur.map((v) => v.views));
  const viewsPrev = median(prev.map((v) => v.views));
  const evergreen = scored.filter((v) => v.evergreen).sort((a, b) => b.perDay! - a.perDay!);
  const archivePerDay = vel.days ? scored.filter((v) => v.ageDays >= EVERGREEN_AGE_DAYS).reduce((a, v) => a + (v.perDay ?? 0), 0) : null;

  // uploads per month, split by whether they beat the channel's normal
  const months = lastMonths(8).map((m) => ({ key: m, above: 0, below: 0 }));
  const byMonth = new Map(months.map((m) => [m.key, m]));
  for (const v of scored) {
    if (!v.mature || v.outlier === null) continue;
    const m = byMonth.get(monthKey(v.published_at));
    if (m) m[v.outlier >= 1 ? "above" : "below"]++;
  }

  const confirmed = videos.filter((v) => v.tag_status === "confirmed").length;

  const cards = ips
    .map((ip) => ({ ip, card: ipCard(ip.id, scored.filter((v) => v.ip_id === ip.id)) }))
    .filter(({ card }) => card.episodes > 0)
    .sort((a, b) => (b.card.medianOutlier ?? -1) - (a.card.medianOutlier ?? -1));
  const topIps = cards.filter(({ card }) => card.verdict !== "data-kurang").slice(0, 4);

  const recent = (q ? scored.filter((v) => v.title.toLowerCase().includes(q.toLowerCase())) : scored).slice(0, q ? 12 : 6);
  const window60 = scored.filter((v) => v.mature && v.outlier !== null && v.ageDays <= 60);
  const top = [...window60].sort((a, b) => b.outlier! - a.outlier!).slice(0, 5);
  const bottom = [...window60].sort((a, b) => a.outlier! - b.outlier!).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{greeting()}, Geromball!</h1>
          <p className="mt-2 text-ink-soft">Pantau performa konten, pilih IP yang perlu ditambah, dan cek apa yang jalan minggu ini.</p>
        </div>
        <KindTabs current={kind} base="/dashboard" />
      </div>

      {/* row 1: channel · four numbers · monthly chart */}
      <div className="grid gap-6 xl:grid-cols-[1fr_1fr_1.15fr] [&>*]:min-w-0">
        <Card className="flex flex-col">
          <div className="text-sm text-ink-soft">Total views channel</div>
          <div className="mt-1 text-4xl font-semibold tracking-tight tabular-nums">{totalViews.toLocaleString("id-ID")}</div>
          <div className="mt-2 flex items-center gap-2 text-xs text-faint">
            {perDayAll !== null && <span className="rounded-full bg-good-soft px-2 py-0.5 font-medium text-good">+{fmt.n(perDayAll)}/hari</span>}
            {perDayAll !== null ? `rata-rata ${vel.days} hari terakhir` : "menunggu data harian"}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <form action={syncNow}>
              <SubmitButton pendingText="Menarik data…" className={`${btnPrimary} w-full py-3`}>Sync sekarang</SubmitButton>
            </form>
            <Link href="/dashboard/tagging" className={`${btnGhost} py-3 text-center`}>Tagging</Link>
          </div>
          <div className="mt-5 flex-1 rounded-2xl bg-subtle p-3">
            <div className="mb-2 text-xs text-ink-soft">Per jenis <span className="text-faint">| {videos.length.toLocaleString("id-ID")} video</span></div>
            <div className="grid grid-cols-3 gap-2">
              {kinds.map((k) => {
                const Icon = KIND_ICON[k.kind];
                return (
                  <Link key={k.kind} href={`/dashboard?jenis=${k.kind}`} className={`rounded-xl bg-surface p-2.5 ring-ink/70 transition-shadow hover:ring-1 ${k.kind === kind ? "ring-1" : ""}`}>
                    <div className="flex items-center gap-1.5 text-xs font-medium"><Icon className="h-4 w-4" />{SHORT_LABEL[k.kind]}</div>
                    <div className="mt-2 text-sm font-semibold tabular-nums">{fmt.n(k.views)}</div>
                    <div className="text-[10px] text-faint">{k.count} video</div>
                    <div className={`mt-1 text-[10px] ${k.last30 ? "text-good" : "text-bad"}`}>{k.last30 ? `${k.last30} baru · 30 hr` : "Tidak aktif"}</div>
                  </Link>
                );
              })}
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <BigNumber dark icon={<IconTrophy className="h-4 w-4" />} label="Outlier median" value={fmt.x(outCur)} delta={change(outCur, outPrev)} note="30 hari" title="Video umur 7–37 hari dibanding 37–67 hari" />
          <BigNumber icon={<IconEye className="h-4 w-4" />} label="Median views" value={fmt.n(viewsCur)} delta={change(viewsCur, viewsPrev)} note="30 hari" title="Video umur 7–37 hari dibanding 37–67 hari" />
          <BigNumber icon={<IconUpload className="h-4 w-4" />} label="Video terbit" value={String(up30)} delta={change(up30, upPrev)} note="30 hari" title="Dibanding 30 hari sebelumnya" />
          <BigNumber
            icon={<IconLeaf className="h-4 w-4" />}
            label="Evergreen"
            value={String(evergreen.length)}
            note={archivePerDay !== null ? `+${fmt.n(archivePerDay)} views/hari` : "menunggu data"}
            title={`Video umur ${EVERGREEN_AGE_DAYS}+ hari yang masih dapat ≥ ${EVERGREEN_MIN_PER_DAY} views/hari`}
          />
        </div>

        <Card title="Hasil video per bulan" subtitle={`${KIND_LABEL[kind]} yang terbit tiap bulan: berapa yang ramai, berapa yang sepi`}>
          <MonthChart months={months} />
          <p className="mt-3 text-xs text-faint">&ldquo;Biasanya&rdquo; = views normal channel, dari 30 video sebelumnya. Video yang belum seminggu belum dihitung.</p>
        </Card>
      </div>

      {/* row 2: tagging progress + top IPs · latest videos */}
      <div className="grid gap-6 xl:grid-cols-[1fr_1.9fr] [&>*]:min-w-0">
        <div className="space-y-6">
          <Card title="Progres tagging">
            <div className="flex h-4 overflow-hidden rounded-full">
              <div className="rounded-full bg-invert" style={{ width: `${(confirmed / videos.length) * 100}%` }} />
              <div className="hatch flex-1" />
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span><b className="tabular-nums">{confirmed.toLocaleString("id-ID")}</b> <span className="text-xs text-faint">sudah dikonfirmasi</span></span>
              <span className="tabular-nums text-ink-soft">{videos.length.toLocaleString("id-ID")}</span>
            </div>
          </Card>

          <Card
            title="IP teratas"
            action={<Link href="/dashboard/kelola" className={`${btnGhost} inline-flex items-center gap-1 py-1.5`}><IconPlus /> Tambah IP</Link>}
          >
            {topIps.length === 0 ? <p className="text-sm text-faint">Belum ada IP dengan cukup episode.</p> : (
              <div className="-mr-5 flex snap-x gap-3 overflow-x-auto pb-1 pr-5 md:-mr-6 md:pr-6">
                {topIps.map(({ ip, card }, i) => (
                  <Link
                    key={ip.id}
                    href={`/dashboard/ip/${ip.id}?jenis=${kind}`}
                    className={`relative flex h-44 w-60 flex-none snap-start flex-col justify-between overflow-hidden rounded-2xl p-4 ${i === 0 ? "bg-invert text-on-invert" : "bg-subtle"}`}
                  >
                    {i !== 0 && <div className="hatch pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-60" />}
                    <div className="relative flex items-center justify-between">
                      <IconBolt className="h-5 w-5" />
                      <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${i === 0 ? "bg-on-invert text-invert" : "bg-surface"}`}>
                        {card.verdict === "tambah" ? "Tambah" : card.verdict === "evaluasi" ? "Evaluasi" : "Pertahankan"}
                      </span>
                    </div>
                    <div className="relative">
                      <div className="text-lg font-semibold leading-tight">{ip.name}</div>
                      <div className="mt-3 flex items-end justify-between text-[11px] opacity-70">
                        <div>Outlier<div className="text-base font-semibold opacity-100 tabular-nums">{fmt.x(card.medianOutlier)}</div></div>
                        <div>Episode<div className="text-base font-semibold tabular-nums">{card.episodes}</div></div>
                        <div>Evergreen<div className="text-base font-semibold tabular-nums">{card.oldEpisodes ? `${card.evergreenEpisodes}/${card.oldEpisodes}` : "–"}</div></div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </Card>
        </div>

        <Card
          title="Video terbaru"
          action={
            <form action="/dashboard" className="relative">
              <input type="hidden" name="jenis" value={kind} />
              <IconSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
              <input name="q" defaultValue={q} placeholder="Cari judul" aria-label="Cari judul video" className={`${input} w-56 pl-10`} />
            </form>
          }
        >
          <TableFrame minWidth={680}>
            <thead>
              <tr className={theadRow}>
                <th className={th}>Video</th>
                <th className={th}>IP</th>
                <th className={thR}>Views</th>
                <th className={thR}>Outlier</th>
                <th className={th}>Status</th>
                <th className={thR}>Terbit</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((v) => (
                <tr key={v.id} className={tr}>
                  <td className={td}>
                    <a href={`https://youtu.be/${v.id}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:underline">
                      {v.thumbnail && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={v.thumbnail} alt="" className="h-9 w-16 flex-none rounded-lg object-cover" />
                      )}
                      <span className="line-clamp-2 max-w-[320px]">{v.title}</span>
                    </a>
                  </td>
                  <td className={`${td} whitespace-nowrap text-ink-soft`}>{v.ip_id ? ipName.get(v.ip_id) : "–"}</td>
                  <td className={tdR}>{fmt.n(v.views)}</td>
                  <td className={tdR}><OutlierText value={v.outlier} mature={v.mature} /></td>
                  <td className={`${td} whitespace-nowrap`}><Status v={v} /></td>
                  <td className={`${tdR} whitespace-nowrap text-ink-soft`}>{fmt.d(v.published_at)}</td>
                </tr>
              ))}
              {recent.length === 0 && (
                <tr className={tr}><td colSpan={6} className={`${td} text-faint`}>Tidak ada video yang cocok dengan &ldquo;{q}&rdquo;.</td></tr>
              )}
            </tbody>
          </TableFrame>
        </Card>
      </div>

      {/* row 3: the IP scorecard */}
      <Card title={`Scorecard IP · ${KIND_LABEL[kind]}`} subtitle="IP mana yang ditambah, dipertahankan, atau dievaluasi, dibanding performa channel sendiri.">
        {cards.length === 0 ? (
          <p className="text-sm text-faint">Belum ada {KIND_LABEL[kind].toLowerCase()} yang masuk IP. Tag dulu di halaman Tagging.</p>
        ) : (
          <TableFrame minWidth={980}>
            <thead>
              <tr className={theadRow}>
                <th className={th}>IP</th>
                <th className={thR}>Episode</th>
                <th className={thR} title="Median dari (views ÷ median 30 video sebelumnya). 1× = rata-rata channel.">Outlier median</th>
                <th className={thR} title="Outlier median 4 episode terakhir">4 terakhir</th>
                <th className={thR} title="Outlier 4 episode terakhir dibanding 4 sebelumnya">Tren</th>
                <th className={thR}>Median views</th>
                <th className={thR}>Rata² komentar</th>
                <th className={thR} title="Komentar per 1.000 views">Komentar/1rb</th>
                <th className={thR} title={`Episode umur ${EVERGREEN_AGE_DAYS}+ hari yang masih dapat ≥ ${EVERGREEN_MIN_PER_DAY} views/hari`}>Evergreen</th>
                <th className={thR} title={`Total views per hari yang masih masuk dari episode umur ${EVERGREEN_AGE_DAYS}+ hari`}>Views/hari arsip</th>
                <th className={thR}>Terakhir</th>
                <th className={th}>Sinyal</th>
              </tr>
            </thead>
            <tbody>
              {cards.map(({ ip, card }) => (
                <tr key={ip.id} className={tr}>
                  <td className={td}>
                    <Link href={`/dashboard/ip/${ip.id}?jenis=${kind}`} className="font-medium hover:underline">{ip.name}</Link>
                  </td>
                  <td className={tdR}>{card.episodes}</td>
                  <td className={tdR}><OutlierText value={card.medianOutlier} /></td>
                  <td className={tdR}><OutlierText value={card.recent} /></td>
                  <td className={tdR}>{card.trend === null ? <span className="text-faint">–</span> : <Delta value={card.trend} />}</td>
                  <td className={tdR}>{fmt.n(card.medianViews)}</td>
                  <td className={tdR}>{fmt.n(card.avgComments)}</td>
                  <td className={tdR}>{fmt.dec(card.commentsPer1k)}</td>
                  <td className={`${tdR} whitespace-nowrap`}>
                    {card.oldEpisodes === 0 || card.archivePerDay === null ? <span className="text-faint">–</span> : (
                      <span className={card.evergreenEpisodes / card.oldEpisodes >= 0.25 ? "font-medium text-good" : card.evergreenEpisodes ? "" : "text-faint"}>
                        {card.evergreenEpisodes}<span className="text-faint"> / {card.oldEpisodes}</span>
                      </span>
                    )}
                  </td>
                  <td className={tdR}>{fmt.n(card.archivePerDay)}</td>
                  <td className={`${tdR} whitespace-nowrap text-ink-soft`}>{fmt.d(card.lastPublished)}</td>
                  <td className={td}><VerdictBadge verdict={card.verdict} /></td>
                </tr>
              ))}
            </tbody>
          </TableFrame>
        )}
        <p className="mt-4 text-xs leading-relaxed text-faint">
          Outlier = views ÷ median views 30 {KIND_LABEL[kind].toLowerCase()} sebelumnya, jadi 2× artinya dua kali performa normal channel saat itu.
          Video &lt; 7 hari belum dihitung. Evergreen: episode umur {EVERGREEN_AGE_DAYS}+ hari yang masih dapat ≥ {EVERGREEN_MIN_PER_DAY} views/hari
          ({vel.days ? `dihitung dari ${vel.days} hari data harian` : "menunggu data harian"}). Sinyal butuh minimal {MIN_EPISODES} episode.
          Tambah: outlier median ≥ 1.2× dan 4 episode terakhir ≥ 1×. Evaluasi: outlier median atau 4 episode terakhir &lt; 0.8×.
        </p>
      </Card>

      {/* row 4: what popped, what flopped, what keeps going */}
      <div className="grid gap-6 lg:grid-cols-3 [&>*]:min-w-0">
        <Card title="Paling meledak" subtitle="60 hari terakhir"><VideoList items={top} ipName={ipName} metric="outlier" /></Card>
        <Card title="Paling jeblok" subtitle="60 hari terakhir"><VideoList items={bottom} ipName={ipName} metric="outlier" /></Card>
        <Card title="Evergreen" subtitle={`Video ${EVERGREEN_AGE_DAYS}+ hari yang masih terus ditonton (${evergreen.length})`}>
          <VideoList items={evergreen.slice(0, 5)} ipName={ipName} metric="perDay" />
          {vel.days > 0 && vel.days < 7 && <p className="mt-3 text-xs text-faint">Baru {vel.days} hari data harian; makin akurat setelah seminggu.</p>}
        </Card>
      </div>
    </div>
  );
}

function BigNumber({ dark = false, icon, label, value, delta = null, note, title }: {
  dark?: boolean;
  icon: React.ReactNode;
  label: string;
  value: string;
  delta?: number | null;
  note: string;
  title?: string;
}) {
  return (
    <div title={title} className={`flex min-h-[150px] flex-col justify-between rounded-3xl p-4 md:p-5 ${dark ? "bg-invert text-on-invert" : "bg-surface"}`}>
      <div className="flex items-start justify-between gap-2">
        <span className={`text-sm ${dark ? "opacity-80" : "text-ink-soft"}`}>{label}</span>
        <span className={`grid h-8 w-8 flex-none place-items-center rounded-full ${dark ? "bg-on-invert/15" : "bg-subtle"}`}>{icon}</span>
      </div>
      <div>
        <div className="text-3xl font-semibold tracking-tight tabular-nums md:text-4xl">{value}</div>
        <div className={`mt-2 flex flex-wrap items-center gap-1.5 text-xs ${dark ? "opacity-80" : "text-faint"}`}>
          <Delta value={delta} invert={dark} />
          {note}
        </div>
      </div>
    </div>
  );
}

function MonthChart({ months }: { months: { key: string; above: number; below: number }[] }) {
  const max = Math.max(4, ...months.map((m) => m.above + m.below));
  const step = Math.max(1, Math.ceil(max / 4));
  const top = step * 4;
  const ticks = [4, 3, 2, 1, 0].map((i) => i * step);
  const H = 200;
  return (
    <div className="rounded-2xl border border-line p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="font-medium">Jumlah video</span>
        <span className="flex flex-wrap gap-x-4 gap-y-1 text-ink-soft">
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-invert" />Ramai: views di atas biasanya</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-bar-muted" />Sepi: views di bawah biasanya</span>
        </span>
      </div>
      <div className="relative flex gap-2" style={{ height: H }}>
        <div className="flex flex-col justify-between pb-5 text-[10px] tabular-nums text-faint">
          {ticks.map((t) => <span key={t} className="leading-none">{t}</span>)}
        </div>
        <div className="relative flex-1">
          <div className="absolute inset-x-0 bottom-5 top-0 flex flex-col justify-between">
            {ticks.map((t) => <div key={t} className="border-t border-dashed border-line" />)}
          </div>
          <div className="absolute inset-x-0 bottom-0 top-0 flex items-end justify-around gap-1.5">
            {months.map((m) => (
              <div key={m.key} className="flex h-full flex-1 flex-col items-center justify-end">
                <div
                  className="flex w-full max-w-7 flex-col justify-end gap-1"
                  style={{ height: `calc((100% - 1.25rem) * ${(m.above + m.below) / top})` }}
                  title={`${monthLabel(m.key)}: ${m.above} video ramai, ${m.below} video sepi`}
                >
                  {m.below > 0 && <div className="rounded-md bg-bar-muted" style={{ flexGrow: m.below }} />}
                  {m.above > 0 && <div className="rounded-md bg-invert" style={{ flexGrow: m.above }} />}
                </div>
                <div className="mt-1.5 h-3.5 text-[10px] leading-none text-faint">{monthLabel(m.key)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Status({ v }: { v: Scored }) {
  const [dot, label] = !v.mature || v.outlier === null
    ? ["bg-warn", "Masih baru"]
    : v.outlier >= 1.2
      ? ["bg-good", "Di atas normal"]
      : v.outlier < 0.8
        ? ["bg-bad", "Di bawah normal"]
        : ["bg-ink-soft", "Normal"];
  return (
    <span className="inline-flex items-center gap-1.5 text-ink-soft">
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}

function VideoList({ items, ipName, metric }: { items: Scored[]; ipName: Map<number, string>; metric: "outlier" | "perDay" }) {
  if (items.length === 0) return <p className="text-sm text-faint">Belum cukup data.</p>;
  return (
    <ul className="space-y-3">
      {items.map((v) => (
        <li key={v.id} className="flex items-center gap-3">
          {v.thumbnail && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={v.thumbnail} alt="" className="h-12 w-20 flex-none rounded-xl object-cover" />
          )}
          <div className="min-w-0 flex-1">
            <a href={`https://youtu.be/${v.id}`} target="_blank" rel="noreferrer" className="line-clamp-2 text-sm leading-snug hover:underline">{v.title}</a>
            <div className="mt-0.5 truncate text-xs text-faint">
              {v.ip_id ? ipName.get(v.ip_id) : "Tanpa IP"} · {fmt.d(v.published_at)} · {fmt.n(v.views)}
            </div>
          </div>
          <div className="flex-none text-right text-sm tabular-nums">
            {metric === "perDay" ? (
              <span className="whitespace-nowrap rounded-full bg-good-soft px-2 py-0.5 text-xs font-medium text-good">+{fmt.n(v.perDay)}/hr</span>
            ) : <OutlierText value={v.outlier} />}
          </div>
        </li>
      ))}
    </ul>
  );
}
