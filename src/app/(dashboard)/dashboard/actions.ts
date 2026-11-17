"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/dashboard/auth";
import { db } from "@/lib/dashboard/db";
import { runSync } from "@/lib/dashboard/sync";
import { youtubeId } from "@/lib/dashboard/campaigns";
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

// ---- Brand campaigns (SOW tracker) ----

function text(form: FormData, name: string): string | null {
  return String(form.get(name) ?? "").trim() || null;
}

/** "100.000", "100,000" and "100000" all mean one hundred thousand. */
function num(form: FormData, name: string): number | null {
  const raw = String(form.get(name) ?? "").replace(/[^\d]/g, "");
  return raw ? Number(raw) : null;
}

function done() {
  revalidatePath("/dashboard", "layout");
}

export async function createCampaign(form: FormData) {
  await requireSession();
  const brand = text(form, "brand");
  if (!brand) return;
  const { data, error } = await db()
    .from("yt_campaigns")
    .insert({
      brand,
      name: text(form, "name") ?? `${brand} x Geromball`,
      start_date: text(form, "start_date"),
      end_date: text(form, "end_date"),
      keywords: keywords(form).length ? keywords(form) : [brand.toLowerCase()],
    })
    .select("id")
    .single();
  if (error) throw error;
  done();
  redirect(`/dashboard/kampanye/${data.id}`);
}

export async function updateCampaign(form: FormData) {
  await requireSession();
  const { error } = await db()
    .from("yt_campaigns")
    .update({
      brand: text(form, "brand"),
      name: text(form, "name"),
      start_date: text(form, "start_date"),
      end_date: text(form, "end_date"),
      keywords: keywords(form),
      notes: text(form, "notes"),
      active: form.get("active") === "on",
    })
    .eq("id", id(form, "id"));
  if (error) throw error;
  done();
}

export async function addDeliverable(form: FormData) {
  await requireSession();
  const units = num(form, "units_target") ?? 1;
  const perUnit = num(form, "views_per_unit");
  const name = text(form, "name");
  if (!name) return;
  const { error } = await db()
    .from("yt_campaign_deliverables")
    .insert({
      campaign_id: id(form, "campaign_id"),
      section: text(form, "section") ?? "guaranteed",
      group_name: text(form, "group_name") ?? name,
      name,
      units_target: units,
      unit_label: text(form, "unit_label") ?? "eps",
      views_per_unit: perUnit,
      views_target: num(form, "views_target") ?? (perUnit ?? 0) * units,
      mirrored: form.get("mirrored") === "on",
    });
  if (error) throw error;
  done();
}

export async function updateDeliverable(form: FormData) {
  await requireSession();
  const units = num(form, "units_target") ?? 1;
  const perUnit = num(form, "views_per_unit");
  const { error } = await db()
    .from("yt_campaign_deliverables")
    .update({
      name: text(form, "name"),
      units_target: units,
      views_per_unit: perUnit,
      views_target: num(form, "views_target") ?? (perUnit ?? 0) * units,
    })
    .eq("id", id(form, "id"));
  if (error) throw error;
  done();
}

export async function deleteDeliverable(form: FormData) {
  await requireSession();
  const { error } = await db().from("yt_campaign_deliverables").delete().eq("id", id(form, "id"));
  if (error) throw error;
  done();
}

/** Adds a piece of content to a deliverable: a YouTube video (by pick or link) or a manual entry. */
export async function addItem(form: FormData) {
  await requireSession();
  const deliverableId = id(form, "deliverable_id");
  const picked = text(form, "video") ?? text(form, "link");
  let videoId = picked ? youtubeId(picked) : null;
  let url = text(form, "link");
  if (videoId) {
    // a video the daily sync has not seen yet (or from another channel) is kept as a link
    const { data } = await db().from("yt_videos").select("id").eq("id", videoId).maybeSingle();
    if (!data) {
      url = url ?? `https://youtu.be/${videoId}`;
      videoId = null;
    }
  }
  const title = text(form, "title");
  if (!videoId && !title && !url) return;
  const { error } = await db()
    .from("yt_campaign_items")
    .insert({
      deliverable_id: deliverableId,
      video_id: videoId,
      title,
      url: videoId ? null : url,
      units: num(form, "units") ?? 1,
      ig_views: num(form, "ig_views") ?? 0,
      tiktok_views: num(form, "tiktok_views") ?? 0,
      other_views: num(form, "other_views") ?? 0,
      note: text(form, "note"),
    });
  // the same video twice in one deliverable is a no-op
  if (error && error.code !== "23505") throw error;
  done();
}

export async function updateItem(form: FormData) {
  await requireSession();
  const { error } = await db()
    .from("yt_campaign_items")
    .update({
      units: num(form, "units") ?? 1,
      ig_views: num(form, "ig_views") ?? 0,
      tiktok_views: num(form, "tiktok_views") ?? 0,
      other_views: num(form, "other_views") ?? 0,
      note: text(form, "note"),
    })
    .eq("id", id(form, "id"));
  if (error) throw error;
  done();
}

export async function removeItem(form: FormData) {
  await requireSession();
  const { error } = await db().from("yt_campaign_items").delete().eq("id", id(form, "id"));
  if (error) throw error;
  done();
}
