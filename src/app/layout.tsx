import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  title: {
    default: "GEROMBALL | KOL Bola Indonesia & Football KOL",
    template: "%s | GEROMBALL",
  },
  description:
    "GEROMBALL adalah KOL Bola Indonesia, Football KOL, dan Pundit Indonesia terdepan. Media football Indonesia — Podcast, Live Reaction, Short-Form (Instagram, TikTok, YouTube Shorts). 235K+ subscriber YouTube, 455K+ TikTok, 95K+ Instagram.",
  keywords: [
    "KOL Bola Indonesia",
    "Football KOL",
    "Football KOL Indonesia",
    "Pundit Indonesia",
    "media football Indonesia",
    "KOL sepakbola",
    "football",
    "sepak bola",
    "konten",
    "podcast",
    "YouTube",
    "TikTok",
    "Instagram",
    "Indonesia",
    "live reaction",
    "short-form",
    "shorts",
    "reels",
  ],
  openGraph: {
    title: "GEROMBALL | KOL Bola Indonesia & Football KOL",
    description:
      "GEROMBALL adalah KOL Bola Indonesia, Football KOL, dan Pundit Indonesia terdepan. Media football Indonesia — Podcast, Live Reaction, Short-Form.",
    url: "https://geromball.com",
    siteName: "GEROMBALL",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/logo.jpg",
        width: 512,
        height: 512,
        alt: "GEROMBALL Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GEROMBALL | KOL Bola Indonesia & Football KOL",
    description:
      "GEROMBALL adalah KOL Bola Indonesia, Football KOL, dan Pundit Indonesia terdepan. Media football Indonesia — Podcast, Live Reaction, Short-Form.",
    images: ["/logo.jpg"],
  },
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  metadataBase: new URL("https://geromball.com"),
  alternates: {
    canonical: "https://geromball.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GEROMBALL",
    url: "https://geromball.com",
    description:
      "GEROMBALL adalah KOL Bola Indonesia, Football KOL, dan Pundit Indonesia terdepan. Media football Indonesia — Podcast, Live Reaction, Short-Form.",
    keywords: [
      "KOL Bola Indonesia",
      "Football KOL Indonesia",
      "Pundit Indonesia",
      "media football Indonesia",
      "KOL sepakbola",
    ],
    sameAs: [
      "https://www.youtube.com/@geromball",
      "https://www.tiktok.com/@geromball",
      "https://www.instagram.com/geromball/"
    ],
  };

  return (
    <html lang="id" className="h-full antialiased">
      <head>
        <meta name="msvalidate.01" content="9CC6D6514DFF83F078B89D4981810397" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-49XVRSFFVY"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-49XVRSFFVY');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
