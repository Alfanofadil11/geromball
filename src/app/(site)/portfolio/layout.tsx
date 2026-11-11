import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Konten | Geromball - Media Football',
  description: "Jelajahi konten football Geromball di YouTube, TikTok, dan Instagram. Reaksi, podcast, shorts, dan lainnya.",
  openGraph: {
    title: 'Konten | Geromball',
    description: 'Jelajahi konten football kami di semua platform.',
    url: 'https://geromball.com/portfolio',
  },
  alternates: {
    canonical: 'https://geromball.com/portfolio',
  },
}

export default function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
