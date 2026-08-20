import type { Metadata } from 'next'
import Button from '@/components/Button'

export const metadata: Metadata = {
  title: 'Karim Nasar - Manchester United KOL Indonesia | GEROMBALL',
  description: 'Karim Nasar, Manchester United KOL di Indonesia. Fan Man United yang membawa banter dan fandom football ke level berikutnya.',
  openGraph: {
    title: 'Karim Nasar - Manchester United KOL Indonesia | GEROMBALL',
    description: 'Manchester United KOL di Indonesia. Fan Man United yang membawa banter dan fandom football ke level berikutnya.',
    url: 'https://geromball.com/talent/karim-nasar',
  },
  alternates: {
    canonical: 'https://geromball.com/talent/karim-nasar',
  },
}

const socialLinks = [
  { platform: 'Instagram', url: 'https://instagram.com/karimnasar', handle: '@karimnasar', followers: '65K+' },
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/karim-nasar-725986223?utm_source=share_via&utm_content=profile&utm_medium=member_ios', handle: 'Karim Nasar', followers: '' },
  { platform: 'YouTube', url: 'https://www.youtube.com/@geromball', handle: '@geromball', followers: '235K+' },
]

export default function KarimNasarPage() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Karim Nasar',
    description: 'Manchester United KOL di Indonesia. Fan Man United dan talent GEROMBALL.',
    url: 'https://geromball.com/talent/karim-nasar',
    image: 'https://geromball.com/talent/Karim Nasar.JPG',
    jobTitle: 'Content Creator & Football KOL',
    worksFor: { '@type': 'Organization', name: 'GEROMBALL' },
    knowsAbout: ['Football', 'Manchester United', 'Premier League', 'Football Content Creation'],
    sameAs: [
      'https://instagram.com/karimnasar',
      'https://www.linkedin.com/in/karim-nasar-725986223',
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <main className="min-h-screen bg-background pt-32 pb-20">
        <section className="mx-auto max-w-4xl px-6">
          <div className="mb-12 flex flex-col items-center gap-8 md:flex-row">
            <div className="h-48 w-48 flex-none overflow-hidden rounded-2xl">
              <img src="/talent/Karim Nasar.JPG" alt="Karim Nasar" className="h-full w-full object-cover object-top" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="heading-display mb-2 text-4xl font-bold uppercase tracking-wider md:text-5xl">Karim Nasar</h1>
              <p className="mb-4 text-lg text-muted">
                <strong className="text-foreground">Manchester United</strong> KOL Indonesia
              </p>
              <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                <span className="rounded-full bg-red-500/10 px-4 py-1 text-xs font-medium text-red-400">65K+ Followers</span>
                <span className="rounded-full bg-foreground/10 px-4 py-1 text-xs font-medium text-foreground">GEROMBALL Talent</span>
              </div>
            </div>
          </div>

          <div className="mb-12 rounded-2xl border border-foreground/20 bg-card p-8">
            <h2 className="heading-display mb-4 text-2xl font-bold uppercase tracking-wider">Tentang Karim</h2>
            <p className="mb-4 text-lg leading-relaxed text-muted">
              Karim Nasar adalah <strong className="text-foreground">Manchester United KOL</strong> yang membawa perspektif unik sebagai fan dari klub legendaris ini.
            </p>
            <p className="text-lg leading-relaxed text-muted">
              Sebagai bagian dari <strong className="text-foreground">GEROMBALL</strong>, Karim berkontribusi dalam program-program unggulan dengan takes yang tajam dan autentik.
            </p>
          </div>

          <div className="mb-12 grid gap-4 grid-cols-3">
            <div className="rounded-xl border border-card-border bg-card p-6 text-center">
              <div className="heading-display text-3xl font-bold gradient-text">65K+</div>
              <div className="text-xs uppercase tracking-widest text-muted">Combined Followers</div>
            </div>
            <div className="rounded-xl border border-card-border bg-card p-6 text-center">
              <div className="heading-display text-3xl font-bold gradient-text">Man United</div>
              <div className="text-xs uppercase tracking-widest text-muted">Dedicated Club</div>
            </div>
            <div className="rounded-xl border border-card-border bg-card p-6 text-center">
              <div className="heading-display text-3xl font-bold gradient-text">GEROMBALL</div>
              <div className="text-xs uppercase tracking-widest text-muted">Talent</div>
            </div>
          </div>

          <div className="mb-12 rounded-2xl border border-foreground/20 bg-card p-8">
            <h2 className="heading-display mb-4 text-2xl font-bold uppercase tracking-wider">Yang Dibahas Karim</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {['Manchester United — transfer, taktik, pertandingan', 'Premier League — analisis dan prediksi', 'Football banter — takes panas tanpa filter', 'Live reaction — Man United matches'].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-1 text-red-400">●</span>
                  <span className="text-muted">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12 rounded-2xl border border-foreground/20 bg-card p-8">
            <h2 className="heading-display mb-4 text-2xl font-bold uppercase tracking-wider">Ikuti Karim</h2>
            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-xl border border-card-border p-4 transition-all hover:border-foreground/30">
                  <div>
                    <div className="font-medium">{link.platform}</div>
                    <div className="text-sm text-muted">{link.handle}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {link.followers && <span className="text-sm font-medium text-foreground/70">{link.followers}</span>}
                    <span className="text-muted">→</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-foreground/20 bg-card p-12 text-center">
            <h3 className="heading-display mb-4 text-2xl font-bold uppercase tracking-wider">Ingin Kolaborasi?</h3>
            <p className="mx-auto mb-8 max-w-xl text-muted">Hubungi GEROMBALL untuk kolaborasi dengan Karim Nasar.</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/contact" variant="primary">Hubungi Kami</Button>
              <Button href="/about" variant="secondary">Lihat Semua Talent</Button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
