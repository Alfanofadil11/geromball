import type { Metadata } from 'next'
import SectionTitle from '@/components/SectionTitle'
import Button from '@/components/Button'

export const metadata: Metadata = {
  title: 'Program | GEROMBALL - KOL Bola Indonesia',
  description: 'Program konten GEROMBALL — KOL Bola Indonesia dan Football KOL. Podcast, Live Reaction, Short-Form (Instagram, TikTok, YouTube Shorts). Konten football yang mendefinisikan budaya.',
  openGraph: {
    title: 'Program | GEROMBALL - KOL Bola Indonesia',
    description: 'Program konten GEROMBALL — KOL Bola Indonesia dan Football KOL. Podcast, Live Reaction, Short-Form.',
    url: 'https://geromball.com/services',
  },
  alternates: {
    canonical: 'https://geromball.com/services',
  },
}

const majorPrograms = [
  {
    title: 'Pojok Debat',
    description: 'Debat topik panas tanpa filter. 376+ episode.',
    platform: 'YouTube',
    format: 'Podcast (1-1.5 jam)',
    url: 'https://www.youtube.com/@geromball/videos',
    isMain: true,
  },
  {
    title: 'Menjadi Manager',
    description: 'Challenge series — bertransformasi jadi manajer football.',
    platform: 'YouTube',
    format: 'Challenge (1-2 jam)',
    url: 'https://www.youtube.com/@geromball/videos',
    isMain: true,
  },
]

const otherPrograms = [
  {
    title: 'Live Reaction',
    description: 'Reaksi real-time pertandingan besar.',
    platform: 'YouTube',
    format: 'Live Streaming',
    url: 'https://www.youtube.com/@geromball/streams',
  },
  {
    title: 'Liga Logika',
    description: 'Breakdown taktik dan analisis mendalam.',
    platform: 'YouTube',
    format: 'Analisis (30-60 menit)',
    url: 'https://www.youtube.com/@geromball/videos',
  },
  {
    title: 'Double Pivot',
    description: 'Diskusi taktik, transfer, dan budaya football.',
    platform: 'YouTube',
    format: 'Diskusi (30-60 menit)',
    url: 'https://www.youtube.com/@geromball/videos',
  },
  {
    title: 'GL News',
    description: 'Berita transfer dan preview pertandingan.',
    platform: 'YouTube',
    format: 'Berita (10-15 menit)',
    url: 'https://www.youtube.com/@geromball/videos',
  },
  {
    title: 'Backlash',
    description: 'Reaksi panas momen terbesar minggu ini.',
    platform: 'YouTube',
    format: 'Reaksi (30-60 menit)',
    url: 'https://www.youtube.com/@geromball/videos',
  },
  {
    title: 'Sikat Balik',
    description: 'Replay dan analisis pertandingan terbaru.',
    platform: 'YouTube',
    format: 'Review',
    url: 'https://www.youtube.com/@geromball/videos',
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-20">
      <section className="mx-auto max-w-6xl px-6">
        <h1 className="heading-display mb-4 text-4xl font-bold uppercase tracking-wider md:text-5xl gradient-text text-center">
          Program Kami
        </h1>
        <p className="text-center text-lg text-muted mb-12 max-w-3xl mx-auto">
          GEROMBALL adalah <strong className="text-foreground">KOL Bola Indonesia</strong> dan <strong className="text-foreground">Football KOL</strong> yang menciptakan konten football berkualitas — Podcast, Live Reaction, Short-Form (Instagram, TikTok, YouTube Shorts). Program kami mendefinisikan budaya football di Indonesia.
        </p>

        {/* Major Programs */}
        <div className="mb-16 grid gap-6 md:grid-cols-2">
          {majorPrograms.map((program) => (
            <a
              key={program.title}
              href={program.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-foreground/20 bg-card p-8 transition-all duration-300 hover:border-foreground/40"
            >
              <div className="mb-4 flex items-center gap-3">
                <h2 className="heading-display text-3xl uppercase tracking-wider">
                  {program.title}
                </h2>
                <span className="rounded bg-foreground/10 px-2 py-0.5 text-xs uppercase tracking-wider text-muted">
                  {program.platform}
                </span>
              </div>
              <p className="mb-4 text-muted">{program.description}</p>
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-wider text-muted">
                  Format: {program.format}
                </p>
                <span className="text-xs uppercase tracking-wider text-foreground/50 group-hover:text-foreground transition-colors">
                  Tonton Sekarang →
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Other Programs */}
        <h2 className="heading-display mb-4 text-2xl font-bold uppercase tracking-wider text-center">
          Program Lainnya
        </h2>
        <p className="text-center text-muted mb-8">Konten long-form YouTube</p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {otherPrograms.map((program) => (
            <a
              key={program.title}
              href={program.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-card-border bg-card p-6 transition-all duration-300 hover:border-foreground/30"
            >
              <div className="mb-3 flex items-center gap-3">
                <h3 className="heading-display text-xl uppercase tracking-wider">
                  {program.title}
                </h3>
                <span className="rounded bg-foreground/10 px-2 py-0.5 text-xs uppercase tracking-wider text-muted">
                  {program.platform}
                </span>
              </div>
              <p className="mb-3 text-sm text-muted">{program.description}</p>
              <p className="text-xs uppercase tracking-wider text-muted">
                Format: {program.format}
              </p>
            </a>
          ))}
        </div>

        <div className="mt-20 rounded-xl border border-card-border bg-card p-12 text-center">
          <h2 className="heading-display mb-4 text-2xl font-bold uppercase tracking-wider">
            Tertarik berkolaborasi?
          </h2>
          <p className="mb-8 text-muted">
            Mari diskusi bagaimana kami bisa bekerja sama
          </p>
          <Button href="/contact" variant="primary">
            Hubungi Kami
          </Button>
        </div>
      </section>
    </main>
  )
}
