"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/dashboard/auth";
import { db } from "@/lib/dashboard/db";
import { runSync } from "@/lib/dashboard/sync";
import { SESSION_COOKIE, SESSION_DAYS, makeSession, passwordMatches } from "@/lib/dashboard/session";

export async function login(_: string | null, form: FormData): Promise<string | null> {
  if (!passwordMatches(String(form.get("password") ?? ""))) return "Password salah.";
  (await cookies()).set(SESSION_COOKIE, makeSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/dashboard",
    maxAge: SESSION_DAYS * 86400,
  });
  redirect("/dashboard");
}

export async function logout() {
  (await cookies()).delete({ name: SESSION_COOKIE, path: "/dashboard" });
  redirect("/dashboard/login");
}

function id(form: FormData, name: string): number | null {
  const v = String(form.get(name) ?? "");
  return v ? Number(v) : null;
}

function keywords(form: FormData): string[] {
  return String(form.get("keywords") ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

/** Bobbie's tag for one video: IP, format, talents and a note. Marks it confirmed. */
export async function saveTag(form: FormData) {
  await requireSession();
  const videoId = String(form.get("video_id"));
  const talentIds = form.getAll("talent").map(Number).filter(Boolean);
  const { error } = await db()
    .from("yt_videos")
    .update({
      ip_id: id(form, "ip"),
      format_id: id(form, "format"),
      note: String(form.get("note") ?? "").trim() || null,
      tag_status: "confirmed",
      tag_source: "manual",
    })
    .eq("id", videoId);
  if (error) throw error;
  await db().from("yt_video_talents").delete().eq("video_id", videoId);
  if (talentIds.length) {
    const { error: e } = await db()
      .from("yt_video_talents")
      .insert(talentIds.map((t) => ({ video_id: videoId, talent_id: t })));
    if (e) throw e;
  }
  revalidatePath("/dashboard", "layout");
}

/** Accept every suggestion that came from an IP playlist: those are almost always right. */
export async function confirmPlaylistSuggestions() {
  await requireSession();
  const { error } = await db()
    .from("yt_videos")
    .update({ tag_status: "confirmed" })
    .eq("tag_status", "suggested")
    .eq("tag_source", "playlist");
  if (error) throw error;
  revalidatePath("/dashboard", "layout");
}

export async function addIp(form: FormData) {
  await requireSession();
  const name = String(form.get("name") ?? "").trim();
  if (!name) return;
  const playlist = String(form.get("playlist_id") ?? "").trim() || null;
  const { error } = await db()
    .from("yt_ips")
    .insert({ name, playlist_id: playlist, title_keywords: keywords(form).length ? keywords(form) : [name.toLowerCase()] });
  if (error) throw error;
  revalidatePath("/dashboard", "layout");
}

export async function updateIp(form: FormData) {
  await requireSession();
  const { error } = await db()
    .from("yt_ips")
    .update({
      playlist_id: String(form.get("playlist_id") ?? "").trim() || null,
      title_keywords: keywords(form),
      active: form.get("active") === "on",
    })
    .eq("id", id(form, "id"));
  if (error) throw error;
  revalidatePath("/dashboard", "layout");
}

export async function addTalent(form: FormData) {
  await requireSession();
  const name = String(form.get("name") ?? "").trim();
  if (!name) return;
  const { error } = await db().from("yt_talents").insert({ name, title_keywords: keywords(form) });
  if (error) throw error;
  revalidatePath("/dashboard", "layout");
}

export async function updateTalent(form: FormData) {
  await requireSession();
  const { error } = await db().from("yt_talents").update({ title_keywords: keywords(form) }).eq("id", id(form, "id"));
  if (error) throw error;
  revalidatePath("/dashboard", "layout");
}

export async function addFormat(form: FormData) {
  await requireSession();
  const name = String(form.get("name") ?? "").trim();
  if (!name) return;
  const { error } = await db().from("yt_formats").insert({ name, title_keywords: keywords(form) });
  if (error) throw error;
  revalidatePath("/dashboard", "layout");
}

export async function updateFormat(form: FormData) {
  await requireSession();
  const priority = Number(form.get("priority"));
  const { error } = await db()
    .from("yt_formats")
    .update({ title_keywords: keywords(form), ...(Number.isFinite(priority) && form.get("priority") !== "" ? { priority } : {}) })
    .eq("id", id(form, "id"));
  if (error) throw error;
  revalidatePath("/dashboard", "layout");
}

export async function syncNow() {
  await requireSession();
  await runSync();
  revalidatePath("/dashboard", "layout");
}
