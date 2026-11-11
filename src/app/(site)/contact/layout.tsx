import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontak | Geromball - Media Football',
  description: 'Hubungi GEROMBALL untuk sponsorship, kolaborasi, dan pertanyaan bisnis. WhatsApp: 087700023151',
  openGraph: {
    title: 'Kontak GEROMBALL',
    description: 'Hubungi GEROMBALL untuk sponsorship, kolaborasi, dan pertanyaan bisnis.',
    url: 'https://geromball.com/contact',
  },
  alternates: {
    canonical: 'https://geromball.com/contact',
  },
}

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
