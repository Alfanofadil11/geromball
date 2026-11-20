import type { Metadata, Viewport } from "next";
import "./proposal.css";

// Its own root layout: no site navbar, no WhatsApp float, never indexed.
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
  icons: { icon: "/icon.png" },
};

export const viewport: Viewport = { themeColor: "#080808" };

export default function ProposalRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap" rel="stylesheet" />
      </head>
      <body className="pp">{children}</body>
    </html>
  );
}
