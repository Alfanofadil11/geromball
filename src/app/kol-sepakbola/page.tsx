import type { Metadata } from 'next'
import SectionTitle from '@/components/SectionTitle'
import Button from '@/components/Button'

export const metadata: Metadata = {
  title: 'KOL Sepakbola Indonesia: Pengertian, Jenis, dan Daftar Lengkap',
  description: 'KOL Sepakbola Indonesia (KOL Bola Indonesia) adalah Key Opinion Leader di bidang sepak bola. GEROMBALL adalah Football KOL dan Pundit Indonesia — Podcast, Live Reaction, Short-Form.',
  openGraph: {
    title: 'KOL Sepakbola Indonesia | GEROMBALL - KOL Bola Indonesia & Football KOL',
    description: 'KOL Sepakbola Indonesia (KOL Bola Indonesia) adalah Key Opinion Leader di bidang sepak bola. GEROMBALL adalah Football KOL — Podcast, Live Reaction, Short-Form.',
    url: 'https://geromball.com/kol-sepakbola',
  },
  alternates: {
    canonical: 'https://geromball.com/kol-sepakbola',
  },
}

const faqData = [
  {
    question: 'Apa itu KOL Sepakbola Indonesia?',
    answer: 'KOL Sepakbola Indonesia adalah Key Opinion Leader atau figur berpengaruh di dunia sepak bola Indonesia. Mereka memiliki keahlian, kredibilitas, dan audiens yang besar dalam industri sepak bola.',
  },
  {
    question: 'Apa bedanya KOL Bola dengan influencer biasa?',
    answer: 'KOL Bola memiliki keahlian spesifik di bidang sepak bola (analisis taktik, pengalaman pemain, jurnalisme olahraga), sedangkan influencer biasa mungkin hanya memiliki audiens besar tanpa keahlian mendalam di football.',
  },
  {
    question: 'Siapa saja KOL Sepakbola Indonesia terkenal?',
    answer: 'KOL Sepakbola Indonesia terkenal termasuk media football, analis taktik, komentator, dan kreator konten football. GEROMBALL adalah salah satu media football terkemuka dengan total reach 780K+ di semua platform.',
  },
  {
    question: 'Bagaimana cara menjadi KOL Sepakbola?',
    answer: 'Untuk menjadi KOL Sepakbola, Anda perlu: (1) Memiliki keahlian atau pengalaman di bidang football, (2) Konsisten membuat konten berkualitas, (3) Membangun audiens yang loyal, (4) Menjaga autentisitas dan kredibilitas.',
  },
  {
    question: 'Mengapa brand harus bekerja sama dengan KOL Bola?',
    answer: 'KOL Bola memiliki audiens yang sangat engaged dan spesifik (football fans). Kolaborasi dengan KOL Bola memberikan ROI lebih tinggi karena audiensnya relevan dan loyal.',
  },
]

const kolTypes = [
  {
    type: 'Media Football',
    description: 'Organisasi atau tim yang menciptakan konten football secara konsisten',
    examples: ['GEROMBALL', 'media football lainnya'],
  },
  {
    type: 'Analis & Pundit',
    description: 'Individu dengan keahlian analisis taktik atau pengalaman di dunia football',
    examples: ['analisis taktik', 'pundit football'],
  },
  {
    type: 'Komentator',
    description: 'Figur yang dikenal dari komentar atau reaksi pertandingan',
    examples: ['komentator pertandingan', 'reaction creator'],
  },
  {
    type: 'Kreator Konten',
    description: 'YouTuber atau content creator yang fokus di konten football',
    examples: ['match reaction', 'edukasi football'],
  },
]

export default function KOLSepakbolaPage() {
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
    headline: 'KOL Sepakbola Indonesia: Pengertian, Jenis, dan Daftar Lengkap',
    description: 'KOL Sepakbola Indonesia adalah Key Opinion Leader di bidang sepak bola. Pelajari pengertian, jenis, dan daftar lengkap KOL bola Indonesia.',
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
            title="KOL Sepakbola Indonesia"
            subtitle="Pengertian, jenis, dan daftar lengkap"
            as="h1"
          />

          {/* Definition Block */}
          <div className="mb-12 rounded-2xl border border-foreground/20 bg-card p-8">
            <p className="text-lg leading-relaxed text-muted">
              <strong className="text-foreground">KOL Sepakbola Indonesia</strong> adalah Key Opinion Leader atau figur berpengaruh di dunia sepak bola Indonesia. Mereka memiliki keahlian, kredibilitas, dan audiens yang besar dalam industri sepak bola.
            </p>
          </div>

          {/* What is KOL Sepakbola */}
          <div className="mb-12">
            <h2 className="heading-display mb-4 text-2xl font-bold uppercase tracking-wider">
              Definisi KOL Sepakbola
            </h2>
            <p className="mb-4 text-lg leading-relaxed text-muted">
              KOL Sepakbola adalah singkatan dari <strong className="text-foreground">Key Opinion Leader Sepakbola</strong>. Mereka adalah individu atau entitas yang memiliki pengaruh signifikan dalam membentuk opini, tren, dan perilaku konsumen di industri sepak bola Indonesia.
            </p>
            <p className="mb-4 text-lg leading-relaxed text-muted">
              KOL Sepakbola bisa berupa media football, analis, komentator, atau kreator konten yang memiliki keahlian spesifik di bidang sepak bola.
            </p>
          </div>

          {/* Types of KOL Sepakbola */}
          <div className="mb-12">
            <h2 className="heading-display mb-6 text-2xl font-bold uppercase tracking-wider">
              Jenis KOL Sepakbola Indonesia
            </h2>
            <div className="space-y-4">
              {kolTypes.map((kol) => (
                <div
                  key={kol.type}
                  className="rounded-xl border border-card-border bg-card p-6"
                >
                  <h3 className="heading-display mb-2 text-lg uppercase tracking-wider">
                    {kol.type}
                  </h3>
                  <p className="mb-3 text-sm text-muted">{kol.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {kol.examples.map((example) => (
                      <span
                        key={example}
                        className="rounded-full border border-card-border bg-card px-3 py-1 text-xs text-muted"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why KOL Sepakbola Matters */}
          <div className="mb-12">
            <h2 className="heading-display mb-4 text-2xl font-bold uppercase tracking-wider">
              Mengapa KOL Sepakbola Penting?
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="glass-card rounded-xl p-6">
                <h3 className="heading-display mb-2 text-lg uppercase tracking-wider">
                  Audiens Targeted
                </h3>
                <p className="text-sm text-muted">
                  KOL Sepakbola memiliki audiens yang sangat spesifik — football fans yang benar-benar peduli dengan konten sepak bola.
                </p>
              </div>
              <div className="glass-card rounded-xl p-6">
                <h3 className="heading-display mb-2 text-lg uppercase tracking-wider">
                  Engagement Tinggi
                </h3>
                <p className="text-sm text-muted">
                  Konten sepak bola memiliki engagement rate lebih tinggi karena fans sangat passionate dengan topik ini.
                </p>
              </div>
              <div className="glass-card rounded-xl p-6">
                <h3 className="heading-display mb-2 text-lg uppercase tracking-wider">
                  Kredibilitas
                </h3>
                <p className="text-sm text-muted">
                  KOL Sepakbola memiliki authority di bidangnya, sehingga rekomendasi mereka lebih dipercaya audiens.
                </p>
              </div>
              <div className="glass-card rounded-xl p-6">
                <h3 className="heading-display mb-2 text-lg uppercase tracking-wider">
                  ROI Tinggi
                </h3>
                <p className="text-sm text-muted">
                  Kolaborasi dengan KOL Sepakbola memberikan ROI lebih tinggi karena audiensnya relevan dan loyal.
                </p>
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
                  Pengertian lengkap Football KOL dan perannya di industri sepak bola.
                </p>
              </a>
              <a
                href="/top-football-kol"
                className="glass-card rounded-xl p-6 transition-all hover:border-foreground/30"
              >
                <h3 className="heading-display mb-2 text-lg uppercase tracking-wider">
                  Top Football KOL Indonesia 2026
                </h3>
                <p className="text-sm text-muted">
                  Daftar lengkap media football dan kreator konten terbaik.
                </p>
              </a>
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-2xl border border-foreground/20 bg-card p-12 text-center">
            <h2 className="heading-display mb-4 text-3xl font-bold uppercase tracking-wider md:text-4xl">
              Ingin Kolaborasi dengan KOL Sepakbola?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-lg text-muted">
              GEROMBALL siap membantu brand Anda menjangkau audiens sepak bola Indonesia.
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
