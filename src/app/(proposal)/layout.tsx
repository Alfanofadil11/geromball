import type { Metadata, Viewport } from "next";
import "./proposal.css";

// Its own root layout: no site navbar, no WhatsApp float, never indexed.
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
  icons: { icon: "/icon.png" },
};

export const viewport: Viewport = { themeColor: "#18181b" };

export default function ProposalRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Source+Serif+4:ital,opsz,wght@1,8..60,400;1,8..60,500&display=swap" rel="stylesheet" />
      </head>
      <body className="pp">{children}</body>
    </html>
  );
}
