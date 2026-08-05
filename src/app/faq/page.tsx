import type { Metadata } from 'next'
import SectionTitle from '@/components/SectionTitle'

export const metadata: Metadata = {
  title: 'FAQ | GEROMBALL - KOL Bola Indonesia',
  description: 'FAQ GEROMBALL — KOL Bola Indonesia, Football KOL, dan Pundit Indonesia. Pertanyaan tentang Pojok Debat, Menjadi Manager, dan program kami.',
  openGraph: {
    title: 'FAQ | GEROMBALL - KOL Bola Indonesia',
    description: 'FAQ GEROMBALL — KOL Bola Indonesia, Football KOL, dan Pundit Indonesia.',
    url: 'https://geromball.com/faq',
  },
}

const faqs = [
  {
    question: 'Apa itu GEROMBALL?',
    answer: 'GEROMBALL adalah media football Indonesia dengan slogan "Fanatik tapi fun". Kami menghasilkan konten football seperti podcast, debat, live reaction, dan shorts di YouTube, TikTok, dan Instagram.',
  },
  {
    question: 'Apa itu Pojok Debat?',
    answer: 'Pojok Debat adalah program unggulan GEROMBALL — podcast debat football tanpa filter. Kami membahas topik-topik panas dalam dunia football dengan host, fans, dan figur publik. Sudah lebih dari 376 episode.',
  },
  {
    question: 'Apa itu Menjadi Manager?',
    answer: 'Menjadi Manager adalah challenge series di mana talent GEROMBALL bertransformasi menjadi manajer football. Dari Arsenal ke Real Madrid — kami mewujudkan fantasi football ultimate.',
  },
  {
    question: 'Di mana bisa menonton GEROMBALL?',
    answer: 'GEROMBALL tersedia di YouTube (@geromball) untuk konten long-form dan live reaction, TikTok (@geromball) untuk konten short-form, dan Instagram (@geromball) untuk reels, feeds, stories, dan carousels.',
  },
  {
    question: 'Bagaimana cara menonton live reaction?',
    answer: 'Live reaction GEROMBALL disiarkan langsung di YouTube (@geromball/streams). Kami live saat pertandingan besar seperti Champions League, Premier League, dan timnas Indonesia.',
  },
  {
    question: 'Berapa subscriber YouTube GEROMBALL?',
    answer: 'GEROMBALL memiliki lebih dari 235.000 subscriber di YouTube dengan total ratusan juta views dari semua program.',
  },
  {
    question: 'Apakah GEROMBALL menerima kerja sama?',
    answer: 'Ya! GEROMBALL terbuka untuk kolaborasi, sponsorship, dan kerja sama bisnis. Hubungi kami melalui WhatsApp di 087700023151 atau email alfanofadil@geromball.com.',
  },
  {
    question: 'Siapa host GEROMBALL?',
    answer: 'GEROMBALL memiliki tim host dan talent yang berpengalaman di dunia football content creation. Kunjungi halaman About untuk mengenal tim kami.',
  },
  {
    question: 'Apa program lain selain Pojok Debat?',
    answer: 'Selain Pojok Debat, GEROMBALL memiliki Liga Logika (analisis football), Double Pivot (diskusi taktik), GL News (berita transfer), Backlash (reaksi panas), dan Sikat Balik (review momen pertandingan).',
  },
  {
    question: 'Bagaimana cara menghubungi GEROMBALL?',
    answer: 'Anda bisa menghubungi kami melalui WhatsApp di 087700023151, email alfanofadil@geromball.com, atau melalui formulir kontak di website ini.',
  },
]

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".faq-answer"],
        },
      },
    })),
  }

  return (
    <main className="min-h-screen bg-background pt-32 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="mx-auto max-w-4xl px-6">
        <SectionTitle
          title="FAQ"
          subtitle="Pertanyaan yang sering ditanyakan"
          as="h1"
        />

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-card-border bg-card p-6"
            >
              <h2 className="heading-display mb-3 text-lg font-semibold uppercase tracking-wider text-foreground">
                {faq.question}
              </h2>
              <p className="text-muted leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
