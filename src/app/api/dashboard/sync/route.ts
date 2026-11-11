import { timingSafeEqual } from "node:crypto";
import { runSync } from "@/lib/dashboard/sync";

// Called daily by Vercel Cron (vercel.json), which sends `Authorization: Bearer $CRON_SECRET`.
export const maxDuration = 300;
export const dynamic = "force-dynamic";

function authorized(header: string | null): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret || !header) return false;
  const a = Buffer.from(header);
  const b = Buffer.from(`Bearer ${secret}`);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function GET(request: Request) {
  if (!authorized(request.headers.get("authorization"))) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    return Response.json(await runSync());
  } catch (e) {
    console.error("dashboard sync failed", e);
    return Response.json({ error: "sync failed" }, { status: 500 });
  }
}
