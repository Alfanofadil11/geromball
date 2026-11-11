import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, isValidSession } from "@/lib/dashboard/session";

// Optimistic gate for /dashboard. Pages and Server Functions check the session again
// (requireSession), so this is a fast redirect, not the only line of defence.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/dashboard/login") return NextResponse.next();
  if (!isValidSession(request.cookies.get(SESSION_COOKIE)?.value)) {
    return NextResponse.redirect(new URL("/dashboard/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
