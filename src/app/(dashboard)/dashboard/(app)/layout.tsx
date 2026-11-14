import Link from "next/link";
import { requireSession } from "@/lib/dashboard/auth";
import { db } from "@/lib/dashboard/db";
import { logout, syncNow } from "../actions";
import { IconLogout, IconRefresh, IconTag } from "./icons";
import { SideNav, ThemeToggle, TopNav } from "./Nav";
import SubmitButton from "./SubmitButton";

function syncedAt(iso: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  }).format(new Date(iso));
}

const circle = "grid h-10 w-10 place-items-center rounded-full text-ink-soft transition-colors hover:bg-subtle hover:text-ink";

export default async function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  await requireSession();
  const [{ data: lastRun }, { count: pending }] = await Promise.all([
    db()
      .from("yt_sync_runs")
      .select("finished_at,ok,error")
      .not("finished_at", "is", null)
      .order("id", { ascending: false })
      .limit(1)
      .maybeSingle(),
    db().from("yt_videos").select("id", { count: "exact", head: true }).neq("tag_status", "confirmed"),
  ]);

  return (
    <div className="min-h-screen md:p-5">
      <div className="mx-auto max-w-[1480px] bg-frame p-4 md:rounded-[36px] md:p-6">
        <header className="flex flex-wrap items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-2.5 rounded-full bg-surface py-1.5 pl-1.5 pr-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon.png" alt="" className="h-9 w-9 rounded-full bg-white object-contain p-0.5" />
            <span className="font-semibold tracking-tight">Geromball</span>
          </Link>

          <div className="order-last w-full md:order-none md:ml-auto md:mr-auto md:w-auto">
            <TopNav />
          </div>

          <div className="ml-auto flex items-center gap-3 md:ml-0">
            <div className="flex items-center gap-1 rounded-full bg-surface p-1.5">
              <form action={syncNow}>
                <SubmitButton title="Sync sekarang" className={circle} pendingText={<IconRefresh className="h-5 w-5 animate-spin" />}>
                  <IconRefresh />
                </SubmitButton>
              </form>
              <Link href="/dashboard/tagging" title={`${pending ?? 0} video perlu dicek`} aria-label="Video perlu dicek" className={`${circle} relative`}>
                <IconTag />
                {(pending ?? 0) > 0 && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-bad ring-2 ring-surface" />}
              </Link>
              <form action={logout} className="md:hidden">
                <button title="Keluar" aria-label="Keluar" className={circle}><IconLogout /></button>
              </form>
            </div>
            <div className="hidden items-center gap-3 rounded-full bg-surface py-1.5 pl-1.5 pr-5 sm:flex" title={lastRun?.error ?? undefined}>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-invert text-xs font-bold text-on-invert">GA</span>
              <div className="leading-tight">
                <div className="text-sm font-medium">Geromball Analytics</div>
                <div className="flex items-center gap-1.5 text-xs text-faint">
                  <span className={`h-1.5 w-1.5 rounded-full ${!lastRun ? "bg-faint" : lastRun.ok ? "bg-good" : "bg-bad"}`} />
                  {lastRun ? (lastRun.ok ? `Sync ${syncedAt(lastRun.finished_at)}` : "Sync terakhir gagal") : "Belum pernah sync"}
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="mt-6 flex gap-6">
          <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] max-h-[860px] flex-none flex-col items-center justify-between md:flex">
            <ThemeToggle />
            <SideNav />
            <form action={logout} className="rounded-full bg-surface p-1.5">
              <button title="Keluar" aria-label="Keluar" className={circle}><IconLogout /></button>
            </form>
          </aside>
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
