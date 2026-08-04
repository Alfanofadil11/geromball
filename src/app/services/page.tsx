import type { Metadata } from 'next'
import SectionTitle from '@/components/SectionTitle'
import Button from '@/components/Button'

export const metadata: Metadata = {
  title: 'Program | Geromball - Media Football',
  description: 'Program konten Geromball — Pojok Debat, Menjadi Manager, Live Reaction, dan lainnya. Konten football yang mendefinisikan budaya.',
  openGraph: {
    title: 'Program | Geromball',
    description: 'Program konten kami yang mendefinisikan budaya football.',
    url: 'https://geromball.com/services',
  },
  alternates: {
    canonical: 'https://geromball.com/services',
  },
}

const majorPrograms = [
  {
    title: 'Pojok Debat',
    description: 'Program debat unggulan. Opini tanpa filter. Fans football, analis, dan figur publik membahas topik panas dalam permainan. 376 episode dan terus bertambah.',
    platform: 'YouTube',
    format: 'Podcast Long-form (1-1.5 jam)',
    url: 'https://www.youtube.com/@geromball/videos',
    isMain: true,
  },
  {
    title: 'Menjadi Manager',
    description: 'Challenge series di mana talent kami bertransformasi menjadi manajer football. Dari Arsenal ke Real Madrid — kami mewujudkan fantasi football ultimate.',
    platform: 'YouTube',
    format: 'Challenge Long-form (1-2 jam)',
    url: 'https://www.youtube.com/@geromball/videos',
    isMain: true,
  },
]

const otherPrograms = [
  {
    title: 'Live Reaction',
    description: 'Reaksi pertandingan real-time saat pertandingan besar. Champions League, Premier League, dan timnas Indonesia — kami live agar kamu bisa merasakannya bersama kami.',
    platform: 'YouTube',
    format: 'Live Streaming',
    url: 'https://www.youtube.com/@geromball/streams',
  },
  {
    title: 'Liga Logika',
    description: 'Analisis football yang membongkar permainan indah. Breakdown taktik, review pertandingan, dan diskusi mendalam.',
    platform: 'YouTube',
    format: 'Analisis Long-form (30-60 menit)',
    url: 'https://www.youtube.com/@geromball/videos',
  },
  {
    title: 'Double Pivot',
    description: 'Diskusi mendalam tentang taktik, transfer, dan budaya football. Dua suara, satu percakapan.',
    platform: 'YouTube',
    format: 'Diskusi Long-form (30-60 menit)',
    url: 'https://www.youtube.com/@geromball/videos',
  },
  {
    title: 'GL News',
    description: 'Berita transfer, preview pertandingan, dan kabar terkini dari dunia football.',
    platform: 'YouTube',
    format: 'Berita Long-form (10-15 menit)',
    url: 'https://www.youtube.com/@geromball/videos',
  },
  {
    title: 'Backlash',
    description: 'Reaksi panas terhadap momen-momen terbesar minggu ini. Tanpa filter, tanpa kompromi.',
    platform: 'YouTube',
    format: 'Reaksi Long-form (30-60 menit)',
    url: 'https://www.youtube.com/@geromball/videos',
  },
  {
    title: 'Sikat Balik',
    description: 'Replay dan analisis momen-momen penting dari pertandingan terbaru.',
    platform: 'YouTube',
    format: 'Review Long-form',
    url: 'https://www.youtube.com/@geromball/videos',
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-20">
      <section className="mx-auto max-w-6xl px-6">
        <SectionTitle
          title="Program Kami"
          subtitle="Konten yang mendefinisikan budaya football"
        />

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
                <h3 className="heading-display text-3xl uppercase tracking-wider">
                  {program.title}
                </h3>
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
        <SectionTitle
          title="Program Lainnya"
          subtitle="Konten long-form YouTube"
        />
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
          <h3 className="heading-display mb-4 text-2xl font-bold uppercase tracking-wider">
            Tertarik berkolaborasi?
          </h3>
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
