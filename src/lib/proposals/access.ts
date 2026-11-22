import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { rexona } from "./rexona";
import type { Proposal } from "./types";

const PROPOSALS: Record<string, Proposal> = { [rexona.slug]: rexona };

export function getProposal(slug: string): Proposal | null {
  return PROPOSALS[slug] ?? null;
}

export const ACCESS_DAYS = 60;
export const accessCookie = (slug: string) => `gb_pp_${slug}`;

function secret(): string {
  const s = process.env.PROPOSAL_SECRET || process.env.DASHBOARD_SECRET;
  if (!s || s.length < 32) throw new Error("PROPOSAL_SECRET (or DASHBOARD_SECRET) must be set, 32+ characters");
  return s;
}

const sign = (payload: string) => createHmac("sha256", secret()).update(payload).digest("base64url");

function same(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

/** Codes are typed loosely (spaces, lower case); compare the normalised form's digest. */
export function codeMatches(p: { codeSha256: string }, input: string): boolean {
  const norm = input.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const want = p.codeSha256;
  // the stored hash is of the dashed form XXXX-XXXX-XXXX
  const dashed = norm.match(/.{1,4}/g)?.join("-") ?? "";
  return same(createHash("sha256").update(dashed).digest("hex"), want);
}

export function makeAccess(slug: string, now = Date.now()): string {
  const expires = String(now + ACCESS_DAYS * 86_400_000);
  return `${expires}.${sign(`${slug}.${expires}`)}`;
}

export function hasAccess(slug: string, value: string | undefined, now = Date.now()): boolean {
  if (!value) return false;
  const [expires, mac] = value.split(".");
  if (!expires || !mac || Number(expires) < now) return false;
  return same(sign(`${slug}.${expires}`), mac);
}
