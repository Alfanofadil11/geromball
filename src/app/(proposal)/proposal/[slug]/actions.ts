"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ACCESS_DAYS, accessCookie, codeMatches, getProposal, makeAccess } from "@/lib/proposals/access";

export async function unlock(slug: string, _: string | null, form: FormData): Promise<string | null> {
  const p = getProposal(slug);
  if (!p) return "Proposal tidak ditemukan.";
  if (!codeMatches(p, String(form.get("code") ?? ""))) return "Kode akses salah. Cek lagi kode yang kami kirim terpisah.";
  (await cookies()).set(accessCookie(slug), makeAccess(slug), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: `/proposal/${slug}`,
    maxAge: ACCESS_DAYS * 86400,
  });
  redirect(`/proposal/${slug}`);
}

export async function lock(slug: string) {
  (await cookies()).delete({ name: accessCookie(slug), path: `/proposal/${slug}` });
  redirect(`/proposal/${slug}`);
}
