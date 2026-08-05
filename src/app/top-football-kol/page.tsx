import type { Metadata } from 'next'
import SectionTitle from '@/components/SectionTitle'
import Button from '@/components/Button'

export const metadata: Metadata = {
  title: 'Top Football KOL Indonesia 2026 | Daftar Lengkap',
  description: 'Daftar lengkap Top Football KOL Indonesia 2026. Media football, analis, komentator, dan kreator konten sepak bola terbaik di Indonesia.',
  openGraph: {
    title: 'Top Football KOL Indonesia 2026 | GEROMBALL',
    description: 'Daftar lengkap Top Football KOL Indonesia 2026. Media football, analis, komentator, dan kreator konten sepak bola terbaik.',
    url: 'https://geromball.com/top-football-kol',
  },
  alternates: {
    canonical: 'https://geromball.com/top-football-kol',
  },
}

const faqData = [
  {
    question: 'Siapa saja Top Football KOL Indonesia?',
    answer: 'Top Football KOL Indonesia termasuk media football, analis taktik, komentator, dan kreator konten. GEROMBALL adalah salah satu media football terkemuka dengan total reach 780K+ di semua platform.',
  },
  {
    question: 'Bagaimana cara memilih Football KOL yang tepat untuk brand?',
    answer: 'Pertimbangkan: (1) Relevansi audiens dengan target market Anda, (2) Engagement rate, (3) Kualitas konten, (4) Kredibilitas dan reputasi, (5) Format konten yang sesuai dengan kampanye Anda.',
  },
  {
    question: 'Berapa rate card Football KOL Indonesia?',
    answer: 'Rate card bervariasi tergantung ukuran audiens, platform, dan jenis konten. Micro KOL (10K-50K followers) mulai dari Rp 500K-2M per konten. Macro KOL (100K-1M) mulai dari Rp 5M-20M per konten.',
  },
  {
    question: 'Apakah GEROMBALL menerima kolaborasi brand?',
    answer: 'Ya, GEROMBALL terbuka untuk berbagai jenis kolaborasi termasuk sponsorship, kolaborasi konten, brand ambassador, dan event. Hubungi kami via WhatsApp atau email untuk diskusi lebih lanjut.',
  },
]

export default function TopFootballKOLPage() {
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

  const listSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Top Football KOL Indonesia 2026',
    description: 'Daftar lengkap Football KOL terbaik di Indonesia',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'Organization',
          name: 'GEROMBALL',
          url: 'https://geromball.com',
          description: 'Media football Indonesia dengan total reach 780K+',
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'ListItem',
          name: 'Media Football Lainnya',
          description: 'Portal berita dan media sepak bola Indonesia',
        },
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@type': 'ListItem',
          name: 'Analis & Pundit',
          description: 'Individu dengan keahlian analisis taktik football',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
      />

      <main className="min-h-screen bg-background pt-32 pb-20">
        <section className="mx-auto max-w-6xl px-6">
          <SectionTitle
            title="Top Football KOL Indonesia 2026"
            subtitle="Daftar lengkap Football KOL terbaik di Indonesia"
            as="h1"
          />

          {/* Intro */}
          <div className="mb-12 rounded-2xl border border-foreground/20 bg-card p-8">
            <p className="text-lg leading-relaxed text-muted">
              <strong className="text-foreground">Football KOL (Key Opinion Leader)</strong> adalah figur berpengaruh di dunia sepak bola Indonesia. Berikut daftar lengkap media football, analis, komentator, dan kreator konten terbaik di Indonesia tahun 2026.
            </p>
          </div>

          {/* Media Football KOL */}
          <div className="mb-12">
            <h2 className="heading-display mb-6 text-2xl font-bold uppercase tracking-wider">
              Media Football
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <a
                href="https://geromball.com"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-xl p-6 transition-all hover:border-foreground/30"
              >
                <h3 className="heading-display mb-2 text-xl uppercase tracking-wider">
                  GEROMBALL
                </h3>
                <p className="mb-2 text-xs text-muted">YouTube, TikTok, Instagram</p>
                <p className="mb-3 text-sm text-muted">Media football, debat, analisis, live reaction</p>
                <span className="heading-display text-2xl font-bold gradient-text">
                  780K+
                </span>
                <span className="ml-2 text-xs text-muted">total reach</span>
              </a>
              <div className="glass-card rounded-xl p-6">
                <h3 className="heading-display mb-2 text-xl uppercase tracking-wider">
                  Media Football Lainnya
                </h3>
                <p className="mb-2 text-xs text-muted">Website, YouTube, Social Media</p>
                <p className="mb-3 text-sm text-muted">Berita football, highlight, analisis</p>
                <span className="heading-display text-2xl font-bold gradient-text">
                  Beragam
                </span>
                <span className="ml-2 text-xs text-muted">platform</span>
              </div>
              <div className="glass-card rounded-xl p-6">
                <h3 className="heading-display mb-2 text-xl uppercase tracking-wider">
                  Berita Olahraga
                </h3>
                <p className="mb-2 text-xs text-muted">Portal Berita, Social Media</p>
                <p className="mb-3 text-sm text-muted">Liputan berita sepak bola nasional dan internasional</p>
                <span className="heading-display text-2xl font-bold gradient-text">
                  Luas
                </span>
                <span className="ml-2 text-xs text-muted">jangkauan</span>
              </div>
            </div>
          </div>

          {/* Jenis Football KOL */}
          <div className="mb-12">
            <h2 className="heading-display mb-6 text-2xl font-bold uppercase tracking-wider">
              Jenis Football KOL
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="glass-card rounded-xl p-6">
                <h3 className="heading-display mb-2 text-xl uppercase tracking-wider">
                  Analis & Pundit
                </h3>
                <p className="mb-3 text-sm text-muted">Individu dengan keahlian analisis taktik atau pengalaman di dunia football. Mereka memberikan breakdown taktik dan analisis mendalam tentang pertandingan.</p>
                <span className="heading-display text-lg font-bold gradient-text">
                  Analisis Taktik
                </span>
              </div>
              <div className="glass-card rounded-xl p-6">
                <h3 className="heading-display mb-2 text-xl uppercase tracking-wider">
                  Komentator
                </h3>
                <p className="mb-3 text-sm text-muted">Figur yang dikenal dari komentar atau reaksi pertandingan. Mereka memberikan warna dan cerita di setiap momen pertandingan.</p>
                <span className="heading-display text-lg font-bold gradient-text">
                  Storytelling
                </span>
              </div>
              <div className="glass-card rounded-xl p-6">
                <h3 className="heading-display mb-2 text-xl uppercase tracking-wider">
                  Kreator Konten
                </h3>
                <p className="mb-3 text-sm text-muted">YouTuber atau content creator yang fokus di konten football. Mereka membuat match reaction, edukasi football, dan konten menarik lainnya.</p>
                <span className="heading-display text-lg font-bold gradient-text">
                  Match Reaction
                </span>
              </div>
            </div>
          </div>

          {/* FAQ */}
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
                href="/football-kol"
                className="glass-card rounded-xl p-6 transition-all hover:border-foreground/30"
              >
                <h3 className="heading-display mb-2 text-lg uppercase tracking-wider">
                  Apa itu Football KOL?
                </h3>
                <p className="text-sm text-muted">
                  Pengertian lengkap Football KOL dan perannya di industri sepak bola Indonesia.
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
                  Jenis dan daftar lengkap KOL bola Indonesia.
                </p>
              </a>
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-2xl border border-foreground/20 bg-card p-12 text-center">
            <h2 className="heading-display mb-4 text-3xl font-bold uppercase tracking-wider md:text-4xl">
              Ingin Kolaborasi dengan Football KOL?
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
