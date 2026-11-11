import Link from "next/link";
import { KIND_LABEL, VERDICT_LABEL, type Kind, type Verdict } from "@/lib/dashboard/metrics";

const VERDICT_STYLE: Record<Verdict, string> = {
  tambah: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  pertahankan: "bg-sky-500/10 text-sky-300 border-sky-500/30",
  evaluasi: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  "data-kurang": "bg-white/5 text-white/50 border-white/10",
};

export function VerdictBadge({ verdict }: { verdict: Verdict }) {
  return (
    <span className={`inline-block whitespace-nowrap rounded-full border px-2 py-0.5 text-xs ${VERDICT_STYLE[verdict]}`}>
      {VERDICT_LABEL[verdict]}
    </span>
  );
}

export function OutlierText({ value, mature = true }: { value: number | null; mature?: boolean }) {
  if (value === null) return <span className="text-muted">–</span>;
  const color = !mature ? "text-white/40" : value >= 2 ? "text-emerald-300 font-semibold" : value >= 1.2 ? "text-emerald-200" : value < 0.6 ? "text-rose-300" : value < 0.8 ? "text-rose-200" : "text-white/80";
  return (
    <span className={color} title={mature ? undefined : "Video < 7 hari, angkanya masih bergerak"}>
      {value.toFixed(1)}×{!mature && "*"}
    </span>
  );
}

export function Stat({ label, value, hint }: { label: string; value: React.ReactNode; hint?: string }) {
  return (
    <div className="rounded-xl border border-card-border bg-card p-4">
      <div className="text-xs uppercase tracking-wider text-muted">{label}</div>
      <div className="mt-1 text-2xl font-semibold tabular-nums">{value}</div>
      {hint && <div className="mt-1 text-xs text-muted">{hint}</div>}
    </div>
  );
}

export function KindTabs({ current, base }: { current: Kind; base: string }) {
  return (
    <div className="inline-flex rounded-lg border border-card-border p-0.5 text-sm">
      {(Object.keys(KIND_LABEL) as Kind[]).map((k) => (
        <Link
          key={k}
          href={`${base}?jenis=${k}`}
          className={`rounded-md px-3 py-1 ${k === current ? "bg-white text-black" : "text-white/70 hover:text-white"}`}
        >
          {KIND_LABEL[k]}
        </Link>
      ))}
    </div>
  );
}

export function parseKind(v: string | string[] | undefined): Kind {
  return v === "short" || v === "live" ? v : "long";
}

export function Card({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-card-border bg-card">
      <div className="flex items-center justify-between gap-3 border-b border-card-border px-4 py-3">
        <h2 className="text-sm font-semibold">{title}</h2>
        {action}
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
}
