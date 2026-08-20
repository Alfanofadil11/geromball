import type { Metadata } from 'next'
import Button from '@/components/Button'

export const metadata: Metadata = {
  title: 'Ali Reds History - Liverpool KOL Indonesia | GEROMBALL',
  description: 'Ali Reds History, Liverpool KOL terbesar di Indonesia. Fan Liverpool sejati yang membawa banter dan fandom football ke level berikutnya.',
  openGraph: {
    title: 'Ali Reds History - Liverpool KOL Indonesia | GEROMBALL',
    description: 'Liverpool KOL terbesar di Indonesia. Fan Liverpool sejati yang membawa banter dan fandom football ke level berikutnya.',
    url: 'https://geromball.com/talent/ali-reds-history',
  },
  alternates: { canonical: 'https://geromball.com/talent/ali-reds-history' },
}

const socialLinks = [
  { platform: 'Instagram', url: 'https://instagram.com/aliredshistory', handle: '@aliredshistory', followers: '33K+' },
  { platform: 'TikTok', url: 'https://tiktok.com/@aliredshistory', handle: '@aliredshistory', followers: '' },
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/ali-reds-history-b7b261428/', handle: 'Ali Reds History', followers: '' },
  { platform: 'YouTube', url: 'https://www.youtube.com/@geromball', handle: '@geromball', followers: '235K+' },
]

export default function AliRedsHistoryPage() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ali Reds History',
    description: 'Liverpool KOL terbesar di Indonesia. Fan Liverpool dan talent GEROMBALL.',
    url: 'https://geromball.com/talent/ali-reds-history',
    image: 'https://geromball.com/talent/Ali Reds History.JPG',
    jobTitle: 'Content Creator & Football KOL',
    worksFor: { '@type': 'Organization', name: 'GEROMBALL' },
    knowsAbout: ['Football', 'Liverpool FC', 'Premier League', 'Football Content Creation'],
    sameAs: ['https://instagram.com/aliredshistory'],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <main className="min-h-screen bg-background pt-32 pb-20">
        <section className="mx-auto max-w-4xl px-6">
          <div className="mb-12 flex flex-col items-center gap-8 md:flex-row">
            <div className="h-48 w-48 flex-none overflow-hidden rounded-2xl">
              <img src="/talent/Ali Reds History.JPG" alt="Ali Reds History" className="h-full w-full object-cover object-top" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="heading-display mb-2 text-4xl font-bold uppercase tracking-wider md:text-5xl">Ali Reds History</h1>
              <p className="mb-4 text-lg text-muted">
                <strong className="text-foreground">Liverpool</strong> KOL Indonesia
              </p>
              <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                <span className="rounded-full bg-red-600/10 px-4 py-1 text-xs font-medium text-red-500">33K+ Followers</span>
                <span className="rounded-full bg-foreground/10 px-4 py-1 text-xs font-medium text-foreground">GEROMBALL Talent</span>
              </div>
            </div>
          </div>

          <div className="mb-12 rounded-2xl border border-foreground/20 bg-card p-8">
            <h2 className="heading-display mb-4 text-2xl font-bold uppercase tracking-wider">Tentang Ali</h2>
            <p className="mb-4 text-lg leading-relaxed text-muted">
              Ali Reds History adalah <strong className="text-foreground">Liverpool KOL</strong> paling berpengaruh di Indonesia. Dikenal dengan konten sejarah Liverpool yang mendalam dan takes yang tajam.
            </p>
            <p className="text-lg leading-relaxed text-muted">
              Sebagai bagian dari <strong className="text-foreground">GEROMBALL</strong>, Ali berkontribusi dalam program-program unggulan dengan perspektif unik sebagai dedicated fan dari Liverpool FC.
            </p>
          </div>

          <div className="mb-12 grid gap-4 grid-cols-3">
            <div className="rounded-xl border border-card-border bg-card p-6 text-center">
              <div className="heading-display text-3xl font-bold gradient-text">230K+</div>
              <div className="text-xs uppercase tracking-widest text-muted">Combined Followers</div>
            </div>
            <div className="rounded-xl border border-card-border bg-card p-6 text-center">
              <div className="heading-display text-3xl font-bold gradient-text">Liverpool</div>
              <div className="text-xs uppercase tracking-widest text-muted">Dedicated Club</div>
            </div>
            <div className="rounded-xl border border-card-border bg-card p-6 text-center">
              <div className="heading-display text-3xl font-bold gradient-text">GEROMBALL</div>
              <div className="text-xs uppercase tracking-widest text-muted">Talent</div>
            </div>
          </div>

          <div className="mb-12 rounded-2xl border border-foreground/20 bg-card p-8">
            <h2 className="heading-display mb-4 text-2xl font-bold uppercase tracking-wider">Yang Dibahas Ali</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {['Liverpool FC — sejarah, transfer, taktik', 'Premier League — analisis dan prediksi', 'Football history — konten mendalam', 'Live reaction — Liverpool matches'].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-1 text-red-600">●</span>
                  <span className="text-muted">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12 rounded-2xl border border-foreground/20 bg-card p-8">
            <h2 className="heading-display mb-4 text-2xl font-bold uppercase tracking-wider">Ikuti Ali</h2>
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
            <p className="mx-auto mb-8 max-w-xl text-muted">Hubungi GEROMBALL untuk kolaborasi dengan Ali Reds History.</p>
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
