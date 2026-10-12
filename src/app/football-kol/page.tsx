import type { Metadata } from 'next'
import SectionTitle from '@/components/SectionTitle'
import Button from '@/components/Button'

export const metadata: Metadata = {
  title: 'Apa itu Football KOL? Pengertian dan Perannya di Indonesia',
  description: 'Football KOL Indonesia (Key Opinion Leader) adalah figur berpengaruh di dunia sepak bola. GEROMBALL adalah Football KOL dan KOL Bola Indonesia — Podcast, Live Reaction, Short-Form.',
  openGraph: {
    title: 'Apa itu Football KOL? | GEROMBALL - KOL Bola Indonesia',
    description: 'Football KOL Indonesia adalah figur berpengaruh di dunia sepak bola. GEROMBALL adalah Football KOL — Podcast, Live Reaction, Short-Form.',
    url: 'https://geromball.com/football-kol',
  },
  alternates: {
    canonical: 'https://geromball.com/football-kol',
  },
}

const faqData = [
  {
    question: 'Apa itu Football KOL?',
    answer: 'Football KOL (Key Opinion Leader) adalah figur berpengaruh di dunia sepak bola yang memiliki keahlian, kredibilitas, dan audiens yang besar. Mereka menciptakan konten football, memberikan analisis, opini, dan memengaruhi cara fans menikmati sepak bola.',
  },
  {
    question: 'Apa bedanya Football KOL dengan Influencer biasa?',
    answer: 'Football KOL memiliki keahlian spesifik di bidang sepak bola (analisis taktik, pengalaman pemain, jurnalisme olahraga), sedangkan influencer biasa mungkin hanya memiliki audiens besar tanpa keahlian mendalam di football.',
  },
  {
    question: 'Siapa contoh Football KOL di Indonesia?',
    answer: 'Contoh Football KOL di Indonesia termasuk GEROMBALL (media football), analis taktik, komentator pertandingan, dan kreator konten football lainnya. GEROMBALL adalah media football dengan total reach 780K+ di semua platform.',
  },
  {
    question: 'Mengapa brand harus bekerja sama dengan Football KOL?',
    answer: 'Football KOL memiliki audiens yang sangat engaged dan spesifik (football fans). Kolaborasi dengan Football KOL memberikan ROI lebih tinggi karena audiensnya relevan dan loyal.',
  },
  {
    question: 'Bagaimana cara menjadi Football KOL?',
    answer: 'Untuk menjadi Football KOL, Anda perlu: (1) Memiliki keahlian atau pengalaman di bidang football, (2) Konsisten membuat konten berkualitas, (3) Membangun audiens yang loyal, (4) Menjaga autentisitas dan kredibilitas.',
  },
  {
    question: 'Apa saja platform yang digunakan Football KOL?',
    answer: 'Football KOL biasanya aktif di YouTube (long-form content), TikTok (short-form), Instagram (reels, stories), dan podcast. Setiap platform memiliki format konten yang berbeda.',
  },
]

export default function FootballKOLPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Apa itu Football KOL? Pengertian dan Perannya di Indonesia',
    description: 'Football KOL (Key Opinion Leader) adalah figur berpengaruh di dunia sepak bola yang menciptakan konten dan memengaruhi opini publik.',
    author: {
      '@type': 'Organization',
      name: 'GEROMBALL',
    },
    publisher: {
      '@type': 'Organization',
      name: 'GEROMBALL',
      logo: {
        '@type': 'ImageObject',
        url: 'https://geromball.com/logo.jpg',
      },
    },
    datePublished: '2026-07-29',
    dateModified: '2026-07-29',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <main className="min-h-screen bg-background pt-32 pb-20">
        <section className="mx-auto max-w-4xl px-6">
          <SectionTitle
            title="Apa itu Football KOL?"
            subtitle="Pengertian, peran, dan contoh di Indonesia"
            as="h1"
          />

          {/* Definition Block - Answer First */}
          <div className="mb-12 rounded-2xl border border-foreground/20 bg-card p-8">
            <p className="text-lg leading-relaxed text-muted">
              <strong className="text-foreground">Football KOL (Key Opinion Leader)</strong> adalah figur berpengaruh di dunia sepak bola yang memiliki keahlian, kredibilitas, dan audiens yang besar. Mereka menciptakan konten football, memberikan analisis, opini, dan memengaruhi cara fans menikmati sepak bola.
            </p>
          </div>

          {/* What is Football KOL */}
          <div className="mb-12">
            <h2 className="heading-display mb-4 text-2xl font-bold uppercase tracking-wider">
              Definisi Football KOL
            </h2>
            <p className="mb-4 text-lg leading-relaxed text-muted">
              Football KOL adalah singkatan dari <strong className="text-foreground">Key Opinion Leader</strong> di bidang sepak bola. Mereka adalah individu atau entitas yang memiliki pengaruh signifikan dalam membentuk opini, tren, dan perilaku konsumen di industri sepak bola.
            </p>
            <p className="mb-4 text-lg leading-relaxed text-muted">
              Berbeda dengan influencer biasa, Football KOL memiliki keahlian spesifik seperti analisis taktik, pengalaman sebagai pemain/pelatih, jurnalisme olahraga, atau pengetahuan mendalam tentang industri football.
            </p>
          </div>

          {/* Why Football KOL Matters */}
          <div className="mb-12">
            <h2 className="heading-display mb-4 text-2xl font-bold uppercase tracking-wider">
              Mengapa Football KOL Penting?
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="glass-card rounded-xl p-6">
                <h3 className="heading-display mb-2 text-lg uppercase tracking-wider">
                  Audiens Targeted
                </h3>
                <p className="text-sm text-muted">
                  Football KOL memiliki audiens yang sangat spesifik — football fans yang benar-benar peduli dengan konten sepak bola.
                </p>
              </div>
              <div className="glass-card rounded-xl p-6">
                <h3 className="heading-display mb-2 text-lg uppercase tracking-wider">
                  Engagement Tinggi
                </h3>
                <p className="text-sm text-muted">
                  Konten football memiliki engagement rate lebih tinggi karena fans sangat passionate dengan topik ini.
                </p>
              </div>
              <div className="glass-card rounded-xl p-6">
                <h3 className="heading-display mb-2 text-lg uppercase tracking-wider">
                  Kredibilitas
                </h3>
                <p className="text-sm text-muted">
                  Football KOL memiliki authority di bidangnya, sehingga rekomendasi mereka lebih dipercaya audiens.
                </p>
              </div>
              <div className="glass-card rounded-xl p-6">
                <h3 className="heading-display mb-2 text-lg uppercase tracking-wider">
                  ROI Tinggi
                </h3>
                <p className="text-sm text-muted">
                  Kolaborasi dengan Football KOL memberikan ROI lebih tinggi karena audiensnya relevan dan loyal.
                </p>
              </div>
            </div>
          </div>

          {/* Types of Football KOL */}
          <div className="mb-12">
            <h2 className="heading-display mb-4 text-2xl font-bold uppercase tracking-wider">
              Jenis Football KOL
            </h2>
            <div className="space-y-4">
              <div className="rounded-xl border border-card-border bg-card p-6">
                <h3 className="heading-display mb-2 text-lg uppercase tracking-wider">
                  Media Football
                </h3>
                <p className="text-sm text-muted">
                  Organisasi atau tim yang menciptakan konten football secara konsisten. Contoh: GEROMBALL, Bola.com, Goal.com Indonesia.
                </p>
              </div>
              <div className="rounded-xl border border-card-border bg-card p-6">
                <h3 className="heading-display mb-2 text-lg uppercase tracking-wider">
                  Analis & Pundit
                </h3>
                <p className="text-sm text-muted">
                  Individu dengan keahlian analisis taktik atau pengalaman di dunia football. Mereka memberikan breakdown taktik dan analisis mendalam tentang pertandingan.
                </p>
              </div>
              <div className="rounded-xl border border-card-border bg-card p-6">
                <h3 className="heading-display mb-2 text-lg uppercase tracking-wider">
                  Komentator
                </h3>
                <p className="text-sm text-muted">
                  Figur yang dikenal dari komentar atau reaksi pertandingan. Mereka memberikan warna dan cerita di setiap momen pertandingan.
                </p>
              </div>
              <div className="rounded-xl border border-card-border bg-card p-6">
                <h3 className="heading-display mb-2 text-lg uppercase tracking-wider">
                  Kreator Konten
                </h3>
                <p className="text-sm text-muted">
                  YouTuber atau content creator yang fokus di konten football. Mereka membuat match reaction, edukasi football, dan konten menarik lainnya.
                </p>
              </div>
            </div>
          </div>

          {/* GEROMBALL as Football KOL */}
          <div className="mb-12">
            <h2 className="heading-display mb-4 text-2xl font-bold uppercase tracking-wider">
              GEROMBALL sebagai Football KOL
            </h2>
            <p className="mb-4 text-lg leading-relaxed text-muted">
              GEROMBALL adalah media football Indonesia yang merupakan bagian dari ekosistem Football KOL. Dengan audiens 780K+ di semua platform, kami menciptakan konten football yang menghibur, mengedukasi, dan menyatukan komunitas.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <span className="heading-display text-3xl font-bold gradient-text">235K+</span>
                <span className="mt-1 block text-xs uppercase tracking-widest text-muted">YouTube Subscribers</span>
              </div>
              <div className="text-center">
                <span className="heading-display text-3xl font-bold gradient-text">455K+</span>
                <span className="mt-1 block text-xs uppercase tracking-widest text-muted">TikTok Followers</span>
              </div>
              <div className="text-center">
                <span className="heading-display text-3xl font-bold gradient-text">95K+</span>
                <span className="mt-1 block text-xs uppercase tracking-widest text-muted">Instagram Followers</span>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="heading-display mb-6 text-2xl font-bold uppercase tracking-wider">
              Pertanyaan Umum
            </h2>
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <details
                  key={index}
                  className="group rounded-xl border border-card-border bg-card"
                >
                  <summary className="cursor-pointer p-6 text-lg font-medium text-foreground">
                    {faq.question}
                  </summary>
                  <div className="px-6 pb-6 text-muted">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Related Pages */}
          <div className="mb-12">
            <h2 className="heading-display mb-6 text-2xl font-bold uppercase tracking-wider">
              Baca Juga
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <a
                href="/top-football-kol"
                className="glass-card rounded-xl p-6 transition-all hover:border-foreground/30"
              >
                <h3 className="heading-display mb-2 text-lg uppercase tracking-wider">
                  Top Football KOL Indonesia 2026
                </h3>
                <p className="text-sm text-muted">
                  Daftar lengkap media football, analis, komentator, dan kreator konten terbaik di Indonesia.
                </p>
              </a>
              <a
                href="/kol-sepakbola"
                className="glass-card rounded-xl p-6 transition-all hover:border-foreground/30"
              >
                <h3 className="heading-display mb-2 text-lg uppercase tracking-wider">
                  KOL Sepakbola Indonesia
                </h3>
                <p className="text-sm text-muted">
                  Pengertian, jenis, dan daftar lengkap KOL bola Indonesia.
                </p>
              </a>
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-2xl border border-foreground/20 bg-card p-12 text-center">
            <h2 className="heading-display mb-4 text-3xl font-bold uppercase tracking-wider md:text-4xl">
              Ingin Berkolaborasi dengan Football KOL?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-lg text-muted">
              GEROMBALL siap membantu brand Anda menjangkau audiens football Indonesia.
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
              <Button href="/media-kit" variant="secondary">
                Lihat Media Kit
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
