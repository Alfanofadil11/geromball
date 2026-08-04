import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  title: {
    default: "GEROMBALL | Media Football Indonesia",
    template: "%s | GEROMBALL",
  },
  description:
    "Fanatik tapi fun. Media football — Pojok Debat, Menjadi Manager, Live Reaction, dan lainnya. 235K+ subscriber YouTube.",
  keywords: [
    "football",
    "sepak bola",
    "media",
    "konten",
    "podcast",
    "YouTube",
    "TikTok",
    "Indonesia",
    "debat",
    "Pojok Debat",
    "Menjadi Manager",
    "live reaction",
    "debat football",
    "podcast sepak bola",
  ],
  openGraph: {
    title: "GEROMBALL | Media Football Indonesia",
    description:
      "Fanatik tapi fun. Media football — Pojok Debat, Menjadi Manager, Live Reaction.",
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
    title: "GEROMBALL | Media Football Indonesia",
    description:
      "Fanatik tapi fun. Media football — Pojok Debat, Menjadi Manager, Live Reaction.",
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
      "Media football Indonesia. Fanatik tapi fun.",
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
