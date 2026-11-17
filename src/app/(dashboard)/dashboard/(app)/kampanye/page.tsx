import type { Metadata } from "next";
import Link from "next/link";
import { requireSession } from "@/lib/dashboard/auth";
import { allProgress, campaigns, split } from "@/lib/dashboard/campaigns";
import { fmt } from "@/lib/dashboard/metrics";
import { createCampaign } from "../../actions";
import SubmitButton from "../SubmitButton";
import { Card, ProgressBar, btnPrimary, input, pct } from "../ui";

export const metadata: Metadata = { title: "Kampanye" };
export const dynamic = "force-dynamic";

export default async function Campaigns() {
  await requireSession();
  const [list, progress] = await Promise.all([campaigns(), allProgress()]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Kampanye brand</h1>
        <p className="mt-2 max-w-3xl text-ink-soft">Tracker SOW: berapa konten yang sudah tayang dan berapa views yang sudah terkumpul dibanding KPI ke brand.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 [&>*]:min-w-0">
        {list.map((c) => {
          const p = progress.get(c.id) ?? { deliverables: [], items: [] };
          const s = split(p.deliverables, p.items);
          return (
            <Link key={c.id} href={`/dashboard/kampanye/${c.id}`} className="group rounded-[28px] bg-surface p-6 transition-shadow hover:shadow-[0_0_0_1px_var(--d-line)]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm text-ink-soft">{c.brand}</div>
                  <div className="text-xl font-semibold tracking-tight group-hover:underline">{c.name}</div>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${c.active ? "bg-good-soft text-good" : "bg-subtle text-faint"}`}>{c.active ? "Berjalan" : "Selesai"}</span>
              </div>
              <div className="mt-5 flex items-end justify-between">
                <div className="text-3xl font-semibold tracking-tight tabular-nums">{fmt.n(s.total.views)}</div>
                <div className="text-sm text-faint">dari {fmt.n(s.total.viewsTarget)} views · {pct(s.total.views, s.total.viewsTarget)}</div>
              </div>
              <ProgressBar value={s.total.views} target={s.total.viewsTarget} className="mt-2 h-3" />
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <Mini label="Long form" p={s.long} />
                <Mini label="Short form" p={s.short} />
              </div>
            </Link>
          );
        })}

        <Card title="Kampanye baru" subtitle="Target per konten ditambahkan di halaman kampanyenya.">
          <form action={createCampaign} className="space-y-3">
            <input name="brand" required placeholder="Brand, mis. Rexona" aria-label="Brand" className={`${input} w-full`} />
            <input name="name" placeholder="Nama kampanye (opsional)" aria-label="Nama kampanye" className={`${input} w-full`} />
            <div className="grid grid-cols-2 gap-3">
              <label className="text-xs text-faint">Mulai<input type="date" name="start_date" className={`${input} mt-1 w-full`} /></label>
              <label className="text-xs text-faint">Selesai<input type="date" name="end_date" className={`${input} mt-1 w-full`} /></label>
            </div>
            <input name="keywords" placeholder="Kata kunci di judul/deskripsi, pisahkan koma" aria-label="Kata kunci" className={`${input} w-full`} />
            <SubmitButton className={`${btnPrimary} w-full`}>Buat kampanye</SubmitButton>
          </form>
        </Card>
      </div>
    </div>
  );
}

function Mini({ label, p }: { label: string; p: { units: number; unitsTarget: number; views: number; viewsTarget: number } }) {
  return (
    <div className="rounded-2xl bg-subtle p-3">
      <div className="text-xs text-faint">{label}</div>
      <div className="mt-1 font-semibold tabular-nums">{fmt.n(p.views)} <span className="text-xs font-normal text-faint">/ {fmt.n(p.viewsTarget)}</span></div>
      <div className="text-xs text-ink-soft tabular-nums">{p.units} / {p.unitsTarget} konten</div>
    </div>
  );
}
