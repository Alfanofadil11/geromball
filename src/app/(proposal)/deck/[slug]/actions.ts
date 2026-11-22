"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDeck } from "@/lib/decks";
import { ACCESS_DAYS, accessCookie, codeMatches, makeAccess } from "@/lib/proposals/access";

export async function unlockDeck(slug: string, _: string | null, form: FormData): Promise<string | null> {
  const d = getDeck(slug);
  if (!d) return "Deck tidak ditemukan.";
  if (!codeMatches(d, String(form.get("code") ?? ""))) return "Kode akses salah. Cek lagi kode yang kami kirim terpisah.";
  (await cookies()).set(accessCookie(slug), makeAccess(slug), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: `/deck/${slug}`,
    maxAge: ACCESS_DAYS * 86400,
  });
  redirect(`/deck/${slug}`);
}
