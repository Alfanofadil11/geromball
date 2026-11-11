import type { Metadata } from 'next'
import Button from '@/components/Button'

export const metadata: Metadata = {
  title: 'Bang Gundo - Manchester City & Barcelona KOL Indonesia | GEROMBALL',
  description: 'Bang Gundo, Manchester City & Barcelona KOL di Indonesia. Fan City dan Barca yang membawa banter dan fandom football ke level berikutnya.',
  openGraph: {
    title: 'Bang Gundo - Manchester City & Barcelona KOL Indonesia | GEROMBALL',
    description: 'Manchester City & Barcelona KOL di Indonesia. Fan City dan Barca yang membawa banter dan fandom football ke level berikutnya.',
    url: 'https://geromball.com/talent/bang-gundo',
  },
  alternates: { canonical: 'https://geromball.com/talent/bang-gundo' },
}

const socialLinks = [
  { platform: 'Instagram', url: 'https://instagram.com/banggundo', handle: '@banggundo', followers: '' },
  { platform: 'TikTok', url: 'https://tiktok.com/@panditdiaspora', handle: '@panditdiaspora', followers: '32.5K+' },
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/bang-gundo-73282b185?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app', handle: 'Bang Gundo', followers: '' },
  { platform: 'YouTube', url: 'https://www.youtube.com/@geromball', handle: '@geromball', followers: '235K+' },
]

export default function BangGundoPage() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Bang Gundo',
    description: 'Manchester City & Barcelona KOL di Indonesia. Fan City dan Barca dan talent GEROMBALL.',
    url: 'https://geromball.com/talent/bang-gundo',
    image: 'https://geromball.com/talent/Bang Gundo.JPG',
    jobTitle: 'Content Creator & Football KOL',
    worksFor: { '@type': 'Organization', name: 'GEROMBALL' },
    knowsAbout: ['Football', 'Manchester City', 'Barcelona', 'Premier League', 'Football Content Creation'],
    sameAs: ['https://instagram.com/banggundo'],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <main className="min-h-screen bg-background pt-32 pb-20">
        <section className="mx-auto max-w-4xl px-6">
          <div className="mb-12 flex flex-col items-center gap-8 md:flex-row">
            <div className="h-48 w-48 flex-none overflow-hidden rounded-2xl">
              <img src="/talent/Bang Gundo.JPG" alt="Bang Gundo" className="h-full w-full object-cover object-top" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="heading-display mb-2 text-4xl font-bold uppercase tracking-wider md:text-5xl">Bang Gundo</h1>
              <p className="mb-4 text-lg text-muted">
                <strong className="text-foreground">Manchester City & Barcelona</strong> KOL Indonesia
              </p>
              <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                <span className="rounded-full bg-blue-400/10 px-4 py-1 text-xs font-medium text-blue-400">32.5K+ TikTok</span>
                <span className="rounded-full bg-foreground/10 px-4 py-1 text-xs font-medium text-foreground">GEROMBALL Talent</span>
              </div>
            </div>
          </div>

          <div className="mb-12 rounded-2xl border border-foreground/20 bg-card p-8">
            <h2 className="heading-display mb-4 text-2xl font-bold uppercase tracking-wider">Tentang Bang Gundo</h2>
            <p className="mb-4 text-lg leading-relaxed text-muted">
              Bang Gundo adalah <strong className="text-foreground">Manchester City & Barcelona KOL</strong> yang membawa perspektif unik sebagai fan dari dua klub raksasa Eropa.
            </p>
            <p className="text-lg leading-relaxed text-muted">
              Sebagai bagian dari <strong className="text-foreground">GEROMBALL</strong>, Bang Gundo berkontribusi dalam program-program unggulan dengan takes yang tajam dan autentik.
            </p>
          </div>

          <div className="mb-12 grid gap-4 grid-cols-3">
            <div className="rounded-xl border border-card-border bg-card p-6 text-center">
              <div className="heading-display text-3xl font-bold gradient-text">40K+</div>
              <div className="text-xs uppercase tracking-widest text-muted">Combined Followers</div>
            </div>
            <div className="rounded-xl border border-card-border bg-card p-6 text-center">
              <div className="heading-display text-3xl font-bold gradient-text">City & Barca</div>
              <div className="text-xs uppercase tracking-widest text-muted">Dedicated Clubs</div>
            </div>
            <div className="rounded-xl border border-card-border bg-card p-6 text-center">
              <div className="heading-display text-3xl font-bold gradient-text">GEROMBALL</div>
              <div className="text-xs uppercase tracking-widest text-muted">Talent</div>
            </div>
          </div>

          <div className="mb-12 rounded-2xl border border-foreground/20 bg-card p-8">
            <h2 className="heading-display mb-4 text-2xl font-bold uppercase tracking-wider">Yang Dibahas Bang Gundo</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {['Manchester City — transfer, taktik, pertandingan', 'Barcelona — transfer, taktik, pertandingan', 'Football banter — takes panas tanpa filter', 'Live reaction — City & Barca matches'].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-1 text-blue-400">●</span>
                  <span className="text-muted">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12 rounded-2xl border border-foreground/20 bg-card p-8">
            <h2 className="heading-display mb-4 text-2xl font-bold uppercase tracking-wider">Ikuti Bang Gundo</h2>
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
            <p className="mx-auto mb-8 max-w-xl text-muted">Hubungi GEROMBALL untuk kolaborasi dengan Bang Gundo.</p>
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
