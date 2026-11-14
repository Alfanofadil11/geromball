import type { Metadata } from "next";
import { cookies } from "next/headers";
import "../globals.css";

// A separate root layout: no public navbar, no analytics tag, never indexed.
export const metadata: Metadata = {
  title: { default: "Dashboard", template: "%s · Dashboard Geromball" },
  robots: { index: false, follow: false },
};

const THEME_COOKIE = "gb_theme"; // set by ThemeToggle

export default async function DashboardRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // read on the server so the page renders in the chosen theme without a flash
  const theme = (await cookies()).get(THEME_COOKIE)?.value === "dark" ? "dark" : "light";
  return (
    <html lang="id" className="dash h-full antialiased" data-theme={theme}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
