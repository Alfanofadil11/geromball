import type { Metadata } from 'next'
import SectionTitle from '@/components/SectionTitle'
import Button from '@/components/Button'

export const metadata: Metadata = {
  title: 'Media Kit | GEROMBALL - KOL Bola Indonesia & Football KOL',
  description: 'Media kit GEROMBALL — KOL Bola Indonesia, Football KOL, dan Pundit Indonesia. Statistik audiens 780K+, format konten (Podcast, Live Reaction, Short-Form), dan opsi kolaborasi.',
  openGraph: {
    title: 'Media Kit | GEROMBALL - KOL Bola Indonesia & Football KOL',
    description: 'Media kit GEROMBALL — KOL Bola Indonesia, Football KOL, dan Pundit Indonesia. Statistik audiens 780K+, format konten, opsi kolaborasi.',
    url: 'https://geromball.com/media-kit',
  },
  alternates: {
    canonical: 'https://geromball.com/media-kit',
  },
}

const platforms = [
  {
    name: 'YouTube',
    handle: '@geromball',
    subscribers: '235K+',
    avgViews: '50K-200K',
    contentTypes: ['Long-form Podcast', 'Live Reaction', 'Shorts'],
    url: 'https://www.youtube.com/@geromball',
  },
  {
    name: 'TikTok',
    handle: '@geromball',
    followers: '455K+',
    avgViews: '100K-1M',
    contentTypes: ['Short-form (1-3 min)', 'Reels', 'Trending Content'],
    url: 'https://www.tiktok.com/@geromball',
  },
  {
    name: 'Instagram',
    handle: '@geromball',
    followers: '95K+',
    avgViews: '100K-1M',
    peakViews: 'FYP Viral',
    contentTypes: ['Reels', 'Stories', 'Carousel', 'Feed Posts'],
    url: 'https://www.instagram.com/geromball/',
  },
]

const programs = [
  {
    name: 'Pojok Debat',
    description: 'Program unggulan debat football. Opini tanpa filter dengan host dan talent yang bersemangat.',
    format: 'Long-form Podcast',
    frequency: 'Mingguan',
    audience: 'Football fans yang suka debat dan analisis mendalam',
  },
  {
    name: 'Menjadi Manager',
    description: 'Challenge series — bertransformasi menjadi manajer football. Konten interaktif dan edukatif.',
    format: 'Challenge Series',
    frequency: 'Mingguan',
    audience: 'Fans yang tertarik dengan aspek manajerial football',
  },
  {
    name: 'Live Reaction',
    description: 'Reaksi pertandingan real-time bersama komunitas. Energi stadion langsung ke layar.',
    format: 'Live Stream',
    frequency: 'Saat pertandingan besar',
    audience: 'Komunitas football yang ingin merasakan atmosfer pertandingan',
  },
  {
    name: 'Liga Logika',
    description: 'Analisis football yang membongkar permainan indah. Data-driven dan insight mendalam.',
    format: 'Analisis',
    frequency: 'Mingguan',
    audience: 'Football enthusiasts yang suka analisis taktik',
  },
]

const collaborationTypes = [
  {
    type: 'Sponsorship',
    description: 'Integrasikan brand Anda ke dalam konten kami. Product placement, shoutout, atau segment khusus.',
    deliverables: ['Product placement dalam video', 'Shoutout di awal/akhir konten', 'Segment khusus di program', 'Promosi di semua platform'],
  },
  {
    type: 'Kolaborasi Konten',
    description: 'Buat konten bersama yang menampilkan brand Anda secara organik dan autentik.',
    deliverables: ['Video kolaborasi eksklusif', 'Cross-promotion di TikTok & Instagram', 'Behind-the-scenes content', 'Co-branded merchandise'],
  },
  {
    type: 'Brand Ambassador',
    description: 'Kerja sama jangka panjang dengan talent GEROMBALL sebagai wajah brand Anda.',
    deliverables: ['Brand ambassador eksklusif', 'Konten bulanan berkelanjutan', 'Event coverage', 'Social media takeover'],
  },
  {
    type: 'Event & Activity',
    description: 'Sponsorasi atau kolaborasi dalam event dan aktivitas komunitas GEROMBALL.',
    deliverables: ['Sponsor event komunitas', 'Watch party sponsorship', 'Fan meet & greet', 'Turnamen/kompetisi'],
  },
]

const audienceInsights = [
  { label: 'Usia Dominan', value: '18-34 tahun' },
  { label: 'Gender', value: 'Laki-laki 78%, Perempuan 22%' },
  { label: 'Lokasi', value: 'Indonesia (85%), Malaysia (8%), Lainnya (7%)' },
  { label: 'Interest', value: 'Football, Sports, Entertainment, Gaming' },
]

export default function MediaKitPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-20">
      <section className="mx-auto max-w-6xl px-6">
        <SectionTitle
          title="Media Kit"
          subtitle="Statistik, audiens, dan opsi kolaborasi"
          as="h1"
        />

        {/* Quick Stats */}
        <div className="mb-20 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="glass-card rounded-xl p-6 text-center">
            <span className="heading-display text-3xl font-bold gradient-text md:text-4xl">235K+</span>
            <span className="mt-1 block text-xs uppercase tracking-widest text-muted">YouTube Subscribers</span>
          </div>
          <div className="glass-card rounded-xl p-6 text-center">
            <span className="heading-display text-3xl font-bold gradient-text md:text-4xl">455K+</span>
            <span className="mt-1 block text-xs uppercase tracking-widest text-muted">TikTok Followers</span>
          </div>
          <div className="glass-card rounded-xl p-6 text-center">
            <span className="heading-display text-3xl font-bold gradient-text md:text-4xl">95K+</span>
            <span className="mt-1 block text-xs uppercase tracking-widest text-muted">Instagram Followers</span>
          </div>
          <div className="glass-card rounded-xl p-6 text-center">
            <span className="heading-display text-3xl font-bold gradient-text md:text-4xl">780K+</span>
            <span className="mt-1 block text-xs uppercase tracking-widest text-muted">Total Reach</span>
          </div>
        </div>

        {/* Brand Overview */}
        <div className="mb-20">
          <div className="rounded-2xl border border-card-border bg-card p-8 md:p-12">
            <h2 className="heading-display mb-4 text-3xl font-bold uppercase tracking-wider">
              Tentang GEROMBALL
            </h2>
            <p className="mb-4 text-lg leading-relaxed text-muted">
              GEROMBALL adalah <strong className="text-foreground">KOL Bola Indonesia</strong>, <strong className="text-foreground">Football KOL</strong>, dan <strong className="text-foreground">Pundit Indonesia</strong> yang menggabungkan passion autentik dengan produksi profesional. 
              Dengan konten Podcast, Live Reaction, dan Short-Form (Instagram, TikTok, YouTube Shorts), kami menjangkau ratusan ribu 
              fans di semua platform besar.
            </p>
            <p className="text-lg leading-relaxed text-muted">
              Fanatik tapi fun — itulah filosofi kami. Kami tidak sekadar membuat konten, kami membangun gerakan.
            </p>
          </div>
        </div>

        {/* Platform Stats */}
        <div className="mb-20">
          <SectionTitle
            title="Platform"
            subtitle="Kehadiran kami di berbagai platform"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {platforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-xl p-6 transition-all hover:border-foreground/30"
              >
                <h3 className="heading-display mb-1 text-2xl uppercase tracking-wider">
                  {platform.name}
                </h3>
                <p className="mb-4 text-sm text-muted">{platform.handle}</p>
                <div className="mb-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-muted">Followers</span>
                    <span className="heading-display text-lg font-bold">{platform.subscribers || platform.followers}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-muted">Avg. Views</span>
                    <span className="heading-display text-lg font-bold">{platform.avgViews}</span>
                  </div>
                  {platform.peakViews && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider text-muted">Peak</span>
                      <span className="heading-display text-lg font-bold text-green-400">{platform.peakViews}</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {platform.contentTypes.map((type) => (
                    <span
                      key={type}
                      className="rounded-full border border-card-border bg-card px-3 py-1 text-xs text-muted"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Programs */}
        <div className="mb-20">
          <SectionTitle
            title="Program Kami"
            subtitle="Konten yang mendefinisikan budaya football"
          />
          <div className="grid gap-4 md:grid-cols-2">
            {programs.map((program) => (
              <div
                key={program.name}
                className="glass-card rounded-xl p-6"
              >
                <div className="mb-3 flex items-start justify-between">
                  <h3 className="heading-display text-xl uppercase tracking-wider">
                    {program.name}
                  </h3>
                  <span className="rounded-full border border-card-border bg-card px-3 py-1 text-xs text-muted">
                    {program.frequency}
                  </span>
                </div>
                <p className="mb-3 text-sm text-muted">{program.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted">
                  <span className="uppercase tracking-wider">{program.format}</span>
                  <span>•</span>
                  <span>{program.audience}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audience Insights */}
        <div className="mb-20">
          <SectionTitle
            title="Audiens Kami"
            subtitle="Siapa yang menonton konten kami"
          />
          <div className="rounded-2xl border border-card-border bg-card p-8">
            <div className="grid gap-6 sm:grid-cols-2">
              {audienceInsights.map((insight) => (
                <div
                  key={insight.label}
                  className="flex flex-col gap-1"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-muted">
                    {insight.label}
                  </span>
                  <span className="text-sm text-foreground">
                    {insight.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Past Collaborations */}
        <div className="mb-20">
          <SectionTitle
            title="Brand yang Bekerja Sama"
            subtitle="Brand yang telah berkolaborasi dengan GEROMBALL"
          />
          <div className="rounded-2xl border border-card-border bg-card p-8">
            <div className="flex flex-wrap justify-center gap-4">
              {[
                'Sunpride', 'Original Source', 'Kamaye', 'Mizone', 'BitStar',
                'Spigen', 'BenQ', 'Kahf', 'Starbucks', 'Gillette',
                'Makarizo Hair', 'Hemaviton', 'AQUA', 'GoFood', 'OKX',
                'Garena', 'Barber Daily', 'Lifebouy'
              ].map((brand) => (
                <span
                  key={brand}
                  className="rounded-full border border-card-border bg-card px-5 py-2 text-sm font-medium text-muted transition-colors hover:border-foreground/30 hover:text-foreground"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Collaboration Types */}
        <div className="mb-20">
          <SectionTitle
            title="Opsi Kolaborasi"
            subtitle="Bagaimana brand Anda bisa bekerja sama dengan kami"
          />
          <div className="grid gap-6 md:grid-cols-2">
            {collaborationTypes.map((collab) => (
              <div
                key={collab.type}
                className="glass-card rounded-xl p-6"
              >
                <h3 className="heading-display mb-2 text-xl uppercase tracking-wider">
                  {collab.type}
                </h3>
                <p className="mb-4 text-sm text-muted">{collab.description}</p>
                <ul className="space-y-2">
                  {collab.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-foreground/20 bg-card p-12 text-center">
          <h2 className="heading-display mb-4 text-3xl font-bold uppercase tracking-wider md:text-4xl">
            Siap Berkolaborasi?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-lg text-muted">
            Hubungi kami untuk diskusi lebih lanjut tentang peluang kolaborasi.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://wa.me/6287700023151?text=Halo%20Geromball!%20Saya%20ingin%20berkolaborasi."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-green-500 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-green-600"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat WhatsApp
            </a>
            <Button href="/contact" variant="secondary">
              Kirim Email
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}