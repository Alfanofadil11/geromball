import Link from "next/link";
import { requireSession } from "@/lib/dashboard/auth";
import { db } from "@/lib/dashboard/db";
import { fmt } from "@/lib/dashboard/metrics";
import { logout, syncNow } from "../actions";
import SubmitButton from "./SubmitButton";

export default async function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  await requireSession();
  const { data: lastRun } = await db()
    .from("yt_sync_runs")
    .select("finished_at,ok,error")
    .not("finished_at", "is", null)
    .order("id", { ascending: false })
    .limit(1)
    .maybeSingle();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-card-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
          <Link href="/dashboard" className="font-[family-name:var(--font-display)] text-2xl tracking-wide">
            Geromball <span className="text-muted">Analytics</span>
          </Link>
          <nav className="flex gap-4 text-sm">
            <Link href="/dashboard" className="hover:text-white text-white/70">Ringkasan</Link>
            <Link href="/dashboard/tagging" className="hover:text-white text-white/70">Tagging</Link>
            <Link href="/dashboard/kelola" className="hover:text-white text-white/70">Kelola IP &amp; talent</Link>
          </nav>
          <div className="ml-auto flex items-center gap-3 text-xs text-muted">
            <span title={lastRun?.error ?? undefined}>
              {lastRun ? (lastRun.ok ? `Sync terakhir ${fmt.d(lastRun.finished_at)}` : "Sync terakhir gagal") : "Belum pernah sync"}
            </span>
            <form action={syncNow}>
              <SubmitButton pendingText="Menarik data…" className="rounded-md border border-card-border px-2 py-1 text-white/80 hover:bg-white/5">
                Sync sekarang
              </SubmitButton>
            </form>
            <form action={logout}>
              <button className="hover:text-white">Keluar</button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
    </div>
  );
}
