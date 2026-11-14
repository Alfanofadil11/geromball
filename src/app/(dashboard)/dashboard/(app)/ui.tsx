import Link from "next/link";
import { KIND_LABEL, VERDICT_LABEL, type Kind, type Verdict } from "@/lib/dashboard/metrics";
import { IconArrowDown, IconArrowUp } from "./icons";

const VERDICT_STYLE: Record<Verdict, string> = {
  tambah: "bg-good-soft text-good",
  pertahankan: "bg-subtle text-ink-soft",
  evaluasi: "bg-bad-soft text-bad",
  "data-kurang": "bg-subtle text-faint",
};
const VERDICT_DOT: Record<Verdict, string> = {
  tambah: "bg-good",
  pertahankan: "bg-ink-soft",
  evaluasi: "bg-bad",
  "data-kurang": "bg-faint",
};

export function VerdictBadge({ verdict }: { verdict: Verdict }) {
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${VERDICT_STYLE[verdict]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${VERDICT_DOT[verdict]}`} />
      {VERDICT_LABEL[verdict]}
    </span>
  );
}

export function OutlierText({ value, mature = true }: { value: number | null; mature?: boolean }) {
  if (value === null) return <span className="text-faint">–</span>;
  const color = !mature ? "text-faint" : value >= 2 ? "text-good font-semibold" : value >= 1.2 ? "text-good" : value < 0.8 ? "text-bad" : "text-ink";
  return (
    <span className={color} title={mature ? undefined : "Video < 7 hari, angkanya masih bergerak"}>
      {value.toFixed(1)}×{!mature && "*"}
    </span>
  );
}

/** "↑ 7%" pill like the reference cards; `invert` for use on the black card. */
export function Delta({ value, invert = false }: { value: number | null; invert?: boolean }) {
  if (value === null || !Number.isFinite(value)) return null;
  const up = value >= 0;
  const tone = invert ? "bg-on-invert/15 text-on-invert" : up ? "bg-good-soft text-good" : "bg-bad-soft text-bad";
  return (
    <span className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium tabular-nums ${tone}`}>
      {up ? <IconArrowUp /> : <IconArrowDown />}
      {Math.abs(Math.round(value * 100))}%
    </span>
  );
}

export function Stat({ label, value, hint }: { label: string; value: React.ReactNode; hint?: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-surface p-5">
      <div className="text-sm text-ink-soft">{label}</div>
      <div className="mt-2 text-3xl font-semibold tracking-tight tabular-nums">{value}</div>
      {hint && <div className="mt-2 text-xs text-faint">{hint}</div>}
    </div>
  );
}

export function KindTabs({ current, base }: { current: Kind; base: string }) {
  return (
    <div className="inline-flex rounded-full bg-surface p-1 text-sm">
      {(Object.keys(KIND_LABEL) as Kind[]).map((k) => (
        <Link
          key={k}
          href={`${base}?jenis=${k}`}
          className={`whitespace-nowrap rounded-full px-4 py-1.5 transition-colors ${k === current ? "bg-invert text-on-invert" : "text-ink-soft hover:text-ink"}`}
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

export function Card({
  title,
  subtitle,
  children,
  action,
  className = "",
}: {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-[28px] bg-surface p-5 md:p-6 ${className}`}>
      {(title || action) && (
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            {title && <h2 className="text-lg font-semibold tracking-tight">{title}</h2>}
            {subtitle && <p className="mt-0.5 text-sm text-faint">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

/** Table frame like the reference: rounded border, tinted header row. */
export function TableFrame({ children, minWidth = 720 }: { children: React.ReactNode; minWidth?: number }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line">
      <table className="w-full text-sm" style={{ minWidth }}>
        {children}
      </table>
    </div>
  );
}
export const th = "px-3 py-3 text-left text-xs font-medium text-faint first:pl-5 last:pr-5";
export const thR = `${th} text-right`;
export const td = "px-3 py-3 first:pl-5 last:pr-5";
export const tdR = `${td} text-right tabular-nums`;
export const tr = "border-t border-line transition-colors hover:bg-subtle/60";
export const theadRow = "bg-subtle";

export const input = "rounded-full border border-line bg-surface px-4 py-2 text-sm outline-none placeholder:text-faint focus:border-ink/40";
export const btnPrimary = "rounded-full bg-invert px-5 py-2 text-sm font-medium text-on-invert transition-opacity hover:opacity-90";
export const btnGhost = "rounded-full border border-line bg-surface px-4 py-2 text-sm text-ink transition-colors hover:bg-subtle";
