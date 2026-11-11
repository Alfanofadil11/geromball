import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, isValidSession } from "./session";

/** Call at the top of every dashboard page and Server Function. */
export async function requireSession(): Promise<void> {
  const store = await cookies();
  if (!isValidSession(store.get(SESSION_COOKIE)?.value)) redirect("/dashboard/login");
}
