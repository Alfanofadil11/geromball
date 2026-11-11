import type { Metadata } from "next";
import "../globals.css";

// A separate root layout: no public navbar, no analytics tag, never indexed.
export const metadata: Metadata = {
  title: { default: "Dashboard", template: "%s · Dashboard Geromball" },
  robots: { index: false, follow: false },
};

export default function DashboardRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
