import type { Metadata } from 'next'
import SectionTitle from '@/components/SectionTitle'
import Button from '@/components/Button'
import SocialProof from '@/components/SocialProof'

export const metadata: Metadata = {
  title: 'Tentang | Geromball - Media Football',
  description: 'Geromball - Di mana passion football bertemu kreativitas. Fanatik tapi fun. Kenali tim, misi, dan program konten kami.',
  openGraph: {
    title: 'Tentang Geromball',
    description: 'Di mana passion football bertemu kreativitas. Fanatik tapi fun.',
    url: 'https://geromball.com/about',
  },
  alternates: {
    canonical: 'https://geromball.com/about',
  },
}

const talents = [
  { name: 'Ole Alatas', handle: '@olealatas' },
  { name: 'Karim Nasar', handle: '@karimnasar' },
  { name: 'Basya', handle: '@basyaknowsball' },
  { name: 'Ali Reds History', handle: '@aliredshistory' },
  { name: 'Bang Gundo', handle: '@banggundo' },
  { name: 'Hasan', handle: '@hasanhbsy' },
  { name: 'Nuggy', handle: '@nuggyramadhan' },
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
          <strong className="text-foreground">GEROMBALL</strong> adalah <strong className="text-foreground">media football Indonesia</strong> yang lahir dari passion autentik terhadap sepak bola. Fanatik tapi fun — kami adalah <strong className="text-foreground">Football KOL</strong> yang menjangkau 780K+ audiens di semua platform.
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
            <div className="heading-display flex h-64 w-64 items-center justify-center rounded-2xl bg-card text-6xl tracking-wider border border-card-border">
              GT
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
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {talents.map((talent) => (
              <article
                key={talent.name}
                className="rounded-xl border border-card-border bg-card p-5 transition-all duration-300 hover:border-foreground/30"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground/10 text-sm font-bold uppercase tracking-wider">
                    {talent.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="heading-display text-lg uppercase tracking-wider">
                      {talent.name}
                    </h3>
                    <p className="text-xs text-muted">{talent.handle}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
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
