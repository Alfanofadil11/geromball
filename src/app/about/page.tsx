import type { Metadata } from 'next'
import SectionTitle from '@/components/SectionTitle'
import Button from '@/components/Button'
import SocialProof from '@/components/SocialProof'
import TalentCard from '@/components/TalentCard'

export const metadata: Metadata = {
  title: 'Tentang GEROMBALL - KOL Bola Indonesia & Football KOL',
  description: 'GEROMBALL adalah KOL Bola Indonesia, Football KOL, dan Pundit Indonesia. Media football Indonesia — Podcast, Live Reaction, Short-Form (Instagram, TikTok, YouTube Shorts). Total reach 780K+.',
  openGraph: {
    title: 'Tentang GEROMBALL - KOL Bola Indonesia & Football KOL',
    description: 'GEROMBALL adalah KOL Bola Indonesia, Football KOL, dan Pundit Indonesia. Media football Indonesia — Podcast, Live Reaction, Short-Form.',
    url: 'https://geromball.com/about',
  },
  alternates: {
    canonical: 'https://geromball.com/about',
  },
}

const talents = [
  { name: 'Ole Alatas', handle: '@olealatas', linkedin: 'https://www.linkedin.com/in/ole-alatas-981567428?utm_source=share_via&utm_content=profile&utm_medium=member_ios', photo: '/talent/Ole Alatas.JPG', followers: '91K', club: 'Chelsea FC' },
  { name: 'Karim Nasar', handle: '@karimnasar', linkedin: 'https://www.linkedin.com/in/karim-nasar-725986223?utm_source=share_via&utm_content=profile&utm_medium=member_ios', photo: '/talent/Karim Nasar.JPG', followers: '65K', club: 'Manchester United FC' },
  { name: 'Basya', handle: '@basyaknowsball', linkedin: 'https://www.linkedin.com/in/basya-knowsball-0522b6428?utm_source=share_via&utm_content=profile&utm_medium=member_ios', photo: '/talent/Basyaknowsball.JPG', followers: '17K', club: 'Arsenal FC' },
  { name: 'Ali Reds History', handle: '@aliredshistory', linkedin: 'https://www.linkedin.com/in/ali-reds-history-b7b261428/', photo: '/talent/Ali Reds History.JPG', followers: '230K', club: 'Liverpool FC' },
  { name: 'Bang Gundo', handle: '@banggundo', linkedin: 'https://www.linkedin.com/in/bang-gundo-73282b185?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app', photo: '/talent/Bang Gundo.JPG', followers: '40K', club: 'Manchester City / Barcelona' },
  { name: 'Hasan', handle: '@hasanhbsy', linkedin: 'https://www.linkedin.com/in/hasan-habsyi-084595427?utm_source=share_via&utm_content=profile&utm_medium=member_ios', photo: '/talent/Hasan.JPG', followers: '10K', club: 'Arsenal FC' },
  { name: 'Nuggy Ramadhan', handle: '@nuggyramadhan', linkedin: 'https://www.linkedin.com/in/nuggy-ramadhan-a27586427?utm_source=share_via&utm_content=profile&utm_medium=member_ios', photo: '/talent/Nuggy Ramadhan.JPG', followers: '10K', club: 'Manchester City FC' },
]

const programs = [
  'Pojok Debat',
  'Liga Logika',
  'GL News',
  'Double Pivot',
  'Backlash',
  'Interogasi',
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-20">
      <section className="mx-auto max-w-6xl px-6">
        <h1 className="heading-display mb-4 text-4xl font-bold uppercase tracking-wider md:text-5xl gradient-text text-center">
          Tentang GEROMBALL
        </h1>
        <p className="text-center text-lg text-muted mb-12 max-w-3xl mx-auto">
          <strong className="text-foreground">GEROMBALL</strong> adalah <strong className="text-foreground">KOL Bola Indonesia</strong>, <strong className="text-foreground">Football KOL</strong>, dan <strong className="text-foreground">Pundit Indonesia</strong> terdepan. Kami lahir dari passion autentik terhadap sepak bola. Fanatik tapi fun — menjangkau 780K+ audiens di semua platform.
        </p>

        {/* Brand Story */}
        <div className="mb-20 grid gap-12 md:grid-cols-2">
          <div>
            <p className="mb-4 text-lg leading-relaxed text-muted">
              Geromball lahir dari keyakinan sederhana: konten football harus
              sepassion sport itu sendiri. Yang dimulai dari reaksi pertandingan
              telah berkembang menjadi operasi media skala penuh yang menjangkau
              ratusan ribu fans di semua platform besar.
            </p>
            <p className="mb-4 text-lg leading-relaxed text-muted">
              Kami adalah media football yang berbasis kepribadian — gerakan
              yang menyenangkan, bersemangat, dan pada akhirnya budaya. Kami
              bertujuan menangkap bentuk-bentuk fanatisme dan ekspresi dalam
              football dalam bentuk kreatif.
            </p>
            <p className="text-lg leading-relaxed text-muted">
              Tim kami hidup dan bernafas football. Dari Champions League hingga
              liga lokal, kami menutupi semuanya dengan autentisitas dan energi
              yang diinginkan fans.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex h-64 w-64 items-center justify-center rounded-2xl bg-card border border-card-border overflow-hidden">
              <img src="/LogoStrokePutih.png" alt="GEROMBALL Logo" className="h-full w-full object-contain p-8" />
            </div>
          </div>
        </div>

        {/* Mission */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <div className="mx-auto mb-4 h-0.5 w-16 bg-foreground" />
          <h2 className="heading-display mb-6 text-3xl font-bold uppercase tracking-wider">Misi Kami</h2>
          <p className="mb-12 text-lg leading-relaxed text-muted">
            Menciptakan konten football paling menarik di internet. Kami
            menggabungkan passion autentik dengan produksi profesional untuk
            menghadirkan konten yang mengedukasi, menghibur, dan menyatukan
            komunitas football global.
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="heading-display mb-2 text-lg font-bold uppercase tracking-wider">
                Autentisitas
              </h3>
              <p className="text-sm text-muted">Reaksi nyata, opini nyata</p>
            </div>
            <div>
              <h3 className="heading-display mb-2 text-lg font-bold uppercase tracking-wider">
                Kualitas
              </h3>
              <p className="text-sm text-muted">Standar produksi profesional</p>
            </div>
            <div>
              <h3 className="heading-display mb-2 text-lg font-bold uppercase tracking-wider">
                Komunitas
              </h3>
              <p className="text-sm text-muted">Dibuat oleh fans, untuk fans</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-20">
          <SocialProof />
        </div>

        {/* Programs */}
        <div className="mb-20">
          <h2 className="heading-display mb-4 text-3xl font-bold uppercase tracking-wider text-center">Program Kami</h2>
          <p className="text-center text-muted mb-8">Konten yang mendefinisikan budaya football</p>
          <div className="flex flex-wrap justify-center gap-3">
            {programs.map((program) => (
              <span
                key={program}
                className="heading-display rounded-lg border border-card-border bg-card px-4 py-2 text-sm uppercase tracking-wider text-muted"
              >
                {program}
              </span>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <SectionTitle title="Tim" subtitle="Talent di balik Geromball" />
          <div className="group relative">
            <div className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {talents.map((talent) => (
                <TalentCard key={talent.name} talent={talent} />
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
          </div>
          <p className="mt-4 text-center text-xs text-muted">← Scroll untuk lihat semua →</p>
        </div>

        {/* CTA */}
        <div className="rounded-xl border border-card-border bg-card p-12 text-center">
          <h3 className="heading-display mb-4 text-2xl font-bold uppercase tracking-wider">
            Ingin bergabung dengan Geromball?
          </h3>
          <p className="mb-8 text-muted">
            Kami selalu mencari minds football yang bersemangat
          </p>
          <Button href="/contact" variant="primary">
            Hubungi Kami
          </Button>
        </div>
      </section>
    </main>
  )
}
