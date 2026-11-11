import { createHmac, timingSafeEqual } from "node:crypto";

// A signed, expiring cookie. Used by both proxy.ts (optimistic redirect) and every
// dashboard page and Server Function (the real check), so it has no Next-only imports.
export const SESSION_COOKIE = "gb_dash";
export const SESSION_DAYS = 30;

function secret(): string {
  const s = process.env.DASHBOARD_SECRET;
  if (!s || s.length < 32) throw new Error("DASHBOARD_SECRET must be set (32+ characters)");
  return s;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function makeSession(now = Date.now()): string {
  const expires = String(now + SESSION_DAYS * 86_400_000);
  return `${expires}.${sign(expires)}`;
}

export function isValidSession(value: string | undefined, now = Date.now()): boolean {
  if (!value) return false;
  const [expires, mac] = value.split(".");
  if (!expires || !mac || Number(expires) < now) return false;
  const expected = Buffer.from(sign(expires));
  const given = Buffer.from(mac);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

export function passwordMatches(input: string): boolean {
  const real = process.env.DASHBOARD_PASSWORD;
  if (!real) return false;
  // compare digests so differing lengths do not short-circuit
  const a = createHmac("sha256", "pw").update(input).digest();
  const b = createHmac("sha256", "pw").update(real).digest();
  return timingSafeEqual(a, b);
}
