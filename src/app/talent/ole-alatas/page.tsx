import type { Metadata } from 'next'
import Button from '@/components/Button'

export const metadata: Metadata = {
  title: 'Ole Alatas - KOL Chelsea Terbesar & Pundit Bola Indonesia | GEROMBALL',
  description: 'Ole Alatas, KOL Chelsea terbesar di Indonesia dan Pundit Bola. Fan Chelsea sejati yang membawa banter dan fandom football ke level berikutnya.',
  openGraph: {
    title: 'Ole Alatas - KOL Chelsea Terbesar & Pundit Bola Indonesia | GEROMBALL',
    description: 'KOL Chelsea terbesar di Indonesia dan Pundit Bola. Fan Chelsea sejati yang membawa banter dan fandom football ke level berikutnya.',
    url: 'https://geromball.com/talent/ole-alatas',
  },
  alternates: {
    canonical: 'https://geromball.com/talent/ole-alatas',
  },
}

const socialLinks = [
  { platform: 'Instagram', url: 'https://instagram.com/olealatas', handle: '@olealatas', followers: '70K+' },
  { platform: 'TikTok', url: 'https://tiktok.com/@olealatas', handle: '@olealatas', followers: '2.5K+' },
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/ole-alatas-981567428?utm_source=share_via&utm_content=profile&utm_medium=member_ios', handle: 'Ole Alatas', followers: '' },
  { platform: 'YouTube', url: 'https://www.youtube.com/@geromball', handle: '@geromball', followers: '235K+' },
]

export default function OleAlatasPage() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ole Alatas',
    description: 'KOL Chelsea terbesar di Indonesia dan Pundit Bola. Fan Chelsea dan talent GEROMBALL.',
    url: 'https://geromball.com/talent/ole-alatas',
    image: 'https://geromball.com/talent/Ole Alatas.JPG',
    jobTitle: 'KOL Chelsea & Pundit Bola Indonesia',
    worksFor: {
      '@type': 'Organization',
      name: 'GEROMBALL',
    },
    knowsAbout: ['Football', 'Chelsea FC', 'Premier League', 'Football Content Creation', 'Pundit Football'],
    sameAs: [
      'https://instagram.com/olealatas',
      'https://www.linkedin.com/in/ole-alatas-981567428',
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <main className="min-h-screen bg-background pt-32 pb-20">
        <section className="mx-auto max-w-4xl px-6">
          {/* Header */}
          <div className="mb-12 flex flex-col items-center gap-8 md:flex-row">
            <div className="h-48 w-48 flex-none overflow-hidden rounded-2xl">
              <img
                src="/talent/Ole Alatas.JPG"
                alt="Ole Alatas"
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="heading-display mb-2 text-4xl font-bold uppercase tracking-wider md:text-5xl">
                Ole Alatas
              </h1>
              <p className="mb-4 text-lg text-muted">
                <strong className="text-foreground">KOL Chelsea Terbesar</strong> & <strong className="text-foreground">Pundit Bola</strong> Indonesia
              </p>
              <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                <span className="rounded-full bg-blue-500/10 px-4 py-1 text-xs font-medium text-blue-400">
                  70K+ Instagram
                </span>
                <span className="rounded-full bg-foreground/10 px-4 py-1 text-xs font-medium text-foreground">
                  2.5K+ TikTok
                </span>
                <span className="rounded-full bg-[#034694]/10 px-4 py-1 text-xs font-medium text-[#034694]">
                  Chelsea FC
                </span>
                <span className="rounded-full bg-foreground/10 px-4 py-1 text-xs font-medium text-foreground">
                  GEROMBALL Talent
                </span>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="mb-12 rounded-2xl border border-foreground/20 bg-card p-8">
            <h2 className="heading-display mb-4 text-2xl font-bold uppercase tracking-wider">
              Tentang Ole
            </h2>
            <p className="mb-4 text-lg leading-relaxed text-muted">
              Ole Alatas adalah <strong className="text-foreground">KOL Chelsea terbesar</strong> di Indonesia dan seorang <strong className="text-foreground">Pundit Bola</strong> yang dikenal luas. Sebagai fan Chelsea sejati, Ole membawa banter, analisis, dan fandom football ke level yang berbeda.
            </p>
            <p className="mb-4 text-lg leading-relaxed text-muted">
              Dikenal dengan takes yang tajam dan tidak takut kontroversi, Ole menjadi suara bagi ribu Chelsea fans Indonesia yang mencari konten football yang autentik dan menghibur.
            </p>
            <p className="text-lg leading-relaxed text-muted">
              Sebagai bagian dari <strong className="text-foreground">GEROMBALL</strong>, Ole berkontribusi dalam program-program unggulan seperti Pojok Debat dan Live Reaction, membawa perspektif unik sebagai dedicated fan dari satu klub.
            </p>
          </div>

          {/* Stats */}
          <div className="mb-12 grid gap-4 grid-cols-3">
            <div className="rounded-xl border border-card-border bg-card p-6 text-center">
              <div className="heading-display text-3xl font-bold gradient-text">70K+</div>
              <div className="text-xs uppercase tracking-widest text-muted">Instagram</div>
            </div>
            <div className="rounded-xl border border-card-border bg-card p-6 text-center">
              <div className="heading-display text-3xl font-bold gradient-text">Chelsea</div>
              <div className="text-xs uppercase tracking-widest text-muted">Dedicated Club</div>
            </div>
            <div className="rounded-xl border border-card-border bg-card p-6 text-center">
              <div className="heading-display text-3xl font-bold gradient-text">GEROMBALL</div>
              <div className="text-xs uppercase tracking-widest text-muted">Talent</div>
            </div>
          </div>

          {/* What Ole Covers */}
          <div className="mb-12 rounded-2xl border border-foreground/20 bg-card p-8">
            <h2 className="heading-display mb-4 text-2xl font-bold uppercase tracking-wider">
              Yang Dibahas Ole
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-3">
                <span className="mt-1 text-[#034694]">●</span>
                <span className="text-muted">Chelsea FC — transfer, taktik, pertandingan</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 text-[#034694]">●</span>
                <span className="text-muted">Premier League — analisis dan prediksi</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 text-[#034694]">●</span>
                <span className="text-muted">Banter football — takes panas tanpa filter</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 text-[#034694]">●</span>
                <span className="text-muted">Live reaction —Chelsea matches</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="mb-12 rounded-2xl border border-foreground/20 bg-card p-8">
            <h2 className="heading-display mb-4 text-2xl font-bold uppercase tracking-wider">
              Ikuti Ole
            </h2>
            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-card-border p-4 transition-all hover:border-foreground/30"
                >
                  <div>
                    <div className="font-medium">{link.platform}</div>
                    <div className="text-sm text-muted">{link.handle}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {link.followers && (
                      <span className="text-sm font-medium text-foreground/70">{link.followers}</span>
                    )}
                    <span className="text-muted">→</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-2xl border border-foreground/20 bg-card p-12 text-center">
            <h3 className="heading-display mb-4 text-2xl font-bold uppercase tracking-wider">
              Ingin Kolaborasi?
            </h3>
            <p className="mx-auto mb-8 max-w-xl text-muted">
              Hubungi GEROMBALL untuk kolaborasi dengan Ole Alatas.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/contact" variant="primary">
                Hubungi Kami
              </Button>
              <Button href="/about" variant="secondary">
                Lihat Semua Talent
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
