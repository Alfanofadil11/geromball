import type { Metadata } from 'next'
import SectionTitle from '@/components/SectionTitle'
import Button from '@/components/Button'

interface Props {
  params: Promise<{ slug: string }>
}

const articles: Record<string, {
  title: string
  description: string
  date: string
  readTime: string
  category: string
  content: string[]
  faq: { question: string; answer: string }[]
}> = {
  'panduan-jadi-kol-sepakbola': {
    title: 'Panduan Lengkap Jadi KOL Sepakbola 2026',
    description: 'Ingin menjadi KOL sepakbola? Pelajari langkah-langkah praktis dari nol hingga membangun audiens yang loyal.',
    date: '2026-07-29',
    readTime: '8 menit',
    category: 'Panduan',
    content: [
      'Football KOL (Key Opinion Leader) adalah figur berpengaruh di dunia sepak bola yang memiliki keahlian, kredibilitas, dan audiens yang besar. Mereka menciptakan konten football, memberikan analisis, opini, dan memengaruhi cara fans menikmati sepak bola.',
      'Industri football content creation di Indonesia terus berkembang pesat. Dengan total reach GEROMBALL mencapai 780K+ di semua platform, peluang untuk menjadi KOL sepakbola semakin terbuka lebar.',
      '**Langkah 1: Tentukan Niche-mu**',
      'Pertama, tentukan spesialisasi kamu. Apakah kamu ingin jadi analis taktik, komentator pertandingan, kreator konten, atau media football? Setiap niche memiliki audiens dan gaya konten yang berbeda.',
      '**Langkah 2: Bangun Keahlian**',
      'KOL sepakbola harus memiliki keahlian nyata. Pelajari analisis taktik, sejarah football, atau pengalaman langsung sebagai pemain/pelatih. Keahlian ini yang membedakanmu dari influencer biasa.',
      '**Langkah 3: Pilih Platform**',
      'YouTube untuk konten long-form (podcast, debat, analisis). TikTok untuk short-form (highlight, momen viral). Instagram untuk visual (reels, feeds, stories). Fokus di 1-2 platform dulu.',
      '**Langkah 4: Konsisten Bikin Konten**',
      'Konsistensi adalah kunci. Minimal 2-3 konten per minggu. Gunakan format yang berbeda: podcast, shorts, reels, carousel. Yang penting, konten harus berkualitas dan autentik.',
      '**Langkah 5: Bangun Komunitas**',
      'Interaksi dengan audiens sangat penting. Balas komentar, buat diskusi, dengarkan feedback. Komunitas yang loyal akan menjadi aset terbesarmu.',
      '**Langkah 6: Monetisasi**',
      'Setelah memiliki audiens yang cukup, mulai monetisasi melalui sponsorship, brand collaboration, dan merchandise. GEROMBALL menerima kolaborasi brand untuk berbagai jenis campaign.',
    ],
    faq: [
      {
        question: 'Berapa lama bisa jadi KOL sepakbola?',
        answer: 'Tergantung konsistensi dan kualitas konten. Biasanya butuh 6-12 bulan untuk membangun audiens 10K followers, dan 1-2 tahun untuk mencapai 100K+.',
      },
      {
        question: 'Apakah harus punya pengalaman football?',
        answer: 'Tidak harus. Tapi keahlian atau pengetahuan football yang mendalam akan membantu membedakanmu dari konten kreator lain.',
      },
      {
        question: 'Berapa penghasilan KOL sepakbola?',
        answer: 'Bervariasi. Micro KOL (10K-50K) bisa dapat Rp 500K-2M per konten. Macro KOL (100K-1M) bisa dapat Rp 5M-20M per konten. Bergantung pada platform dan jenis konten.',
      },
    ],
  },
  'rate-card-kol-football-indonesia': {
    title: 'Rate Card KOL Football Indonesia: Berapa Harganya?',
    description: 'Breakdown lengkap rate card KOL football Indonesia berdasarkan ukuran audiens, platform, dan jenis konten.',
    date: '2026-07-29',
    readTime: '6 menit',
    category: 'Bisnis',
    content: [
      'Rate card adalah daftar harga yang ditawarkan oleh KOL untuk berbagai jenis konten. Di industri football Indonesia, rate card bervariasi tergantung beberapa faktor.',
      '**Faktor yang Memengaruhi Rate Card:**',
      '1. Ukuran audiens (followers/subscribers)',
      '2. Platform (YouTube, TikTok, Instagram)',
      '3. Jenis konten (dedicated video, shoutout, story)',
      '4. Engagement rate',
      '5. Niche spesifik (analisis, komentar, lifestyle)',
      '**Rate Card Berdasarkan Ukuran Audiens:**',
      '- Micro KOL (10K-50K): Rp 500K - 2M per konten',
      '- Mid-Tier KOL (50K-100K): Rp 2M - 5M per konten',
      '- Macro KOL (100K-1M): Rp 5M - 20M per konten',
      '- Mega KOL (1M+): Rp 20M - 100M+ per konten',
      '**Rate Card Berdasarkan Platform:**',
      '- YouTube: Paling mahal (long-form, high effort)',
      '- TikTok: Menengah (short-form, viral potential)',
      '- Instagram: Bervariasi (reels, feeds, stories)',
      '**Tips Negosiasi:**',
      '1. Minta portofolio dan case study',
      '2. Cek engagement rate, bukan hanya followers',
      '3. Diskusikan deliverables yang jelas',
      '4. Pertimbangkan paket multi-platform',
    ],
    faq: [
      {
        question: 'Apakah rate card bisa nego?',
        answer: 'Ya, sebagian besar KOL terbuka untuk negosiasi, terutama untuk paket jangka panjang atau multi-platform.',
      },
      {
        question: 'Apa itu engagement rate?',
        answer: 'Engagement rate adalah persentase audiens yang berinteraksi dengan konten (likes, comments, shares). Semakin tinggi, semakin berharga.',
      },
      {
        question: 'Bagaimana cara menghitung ROI?',
        answer: 'ROI = (Pendapatan dari kampanye - Biaya kampanye) / Biaya kampanye x 100%. Track menggunakan UTM codes dan promo codes.',
      },
    ],
  },
  '10-program-football-terbaik-indonesia': {
    title: '10 Program Football Terbaik di Indonesia 2026',
    description: 'Daftar program football paling populer di Indonesia mulai dari podcast, debat, hingga live reaction.',
    date: '2026-07-29',
    readTime: '7 menit',
    category: 'Rekomendasi',
    content: [
      'Industri konten football di Indonesia semakin kaya dengan berbagai program menarik. Berikut 10 program football terbaik yang wajib ditonton.',
      '**1. Pojok Debat (GEROMBALL)**',
      'Program debat football unggulan dengan opini tanpa filter. Sudah lebih dari 376 episode membahas topik-topik panas dalam dunia football.',
      '**2. Menjadi Manager (GEROMBALL)**',
      'Challenge series di mana talent bertransformasi menjadi manajer football. Dari Arsenal ke Real Madrid — mewujudkan fantasi football ultimate.',
      '**3. Live Reaction (GEROMBALL)**',
      'Reaksi pertandingan real-time bersama komunitas. Live saat pertandingan besar seperti Champions League dan Premier League.',
      '**4. Liga Logika (GEROMBALL)**',
      'Analisis football data-driven. breakdown taktik, statistik, dan tren permainan.',
      '**5. Double Pivot (GEROMBALL)**',
      'Diskusi taktik dan budaya football. Deep dive ke aspek-aspek teknis permainan.',
      '**6. GL News (GEROMBALL)**',
      'Berita transfer dan kabar terkini dari dunia football.',
      '**7. Backlash (GEROMBALL)**',
      'Reaksi panas terhadap momen-momen kontroversial dalam pertandingan.',
      '**8. Sikat Balik (GEROMBALL)**',
      'Review momen pertandingan dari berbagai sudut pandang.',
      '**9. Podcast Football Indonesia**',
      'Berbagai podcast football dari kreator independen dan media.',
      '**10. Highlight Channels**',
      'Channel YouTube yang fokus pada highlight dan klip pertandingan.',
    ],
    faq: [
      {
        question: 'Program mana yang paling populer?',
        answer: 'Pojok Debat dan Menjadi Manager dari GEROMBALL adalah program paling populer dengan jutaan views per episode.',
      },
      {
        question: 'Bagaimana cara menonton live reaction?',
        answer: 'Live reaction GEROMBALL disiarkan langsung di YouTube (@geromball/streams) saat pertandingan besar.',
      },
      {
        question: 'Apakah semua program gratis?',
        answer: 'Ya, semua program bisa ditonton gratis di YouTube. Beberapa konten eksklusif mungkin tersedia di platform berbayar.',
      },
    ],
  },
  'kenapa-live-reaction-bola-viral': {
    title: 'Kenapa Live Reaction Bola Viral di Indonesia',
    description: 'Analisis mengapa konten live reaction pertandingan bola menjadi fenomena viral di kalangan fans Indonesia.',
    date: '2026-07-29',
    readTime: '5 menit',
    category: 'Analisis',
    content: [
      'Live reaction pertandingan bola telah menjadi fenomena viral di Indonesia. Jutaan fans menonton reaksi real-time dari kreator konten saat pertandingan besar berlangsung.',
      '**Mengapa Live Reaction Begitu Populer?**',
      '1. **Sentuhan Komunitas**: Fans merasa menonton bersama komunitas, bukan sendirian',
      '2. **Emosi Real-Time**: Reaksi autentik saat gol, kartu merah, atau kejutan lainnya',
      '3. **Interaktif**: Audiens bisa berkomentar dan berinteraksi langsung',
      '4. **Hiburan**: Menambah keseruan menonton pertandingan',
      '**Faktor Kesuksesan Live Reaction:**',
      '- Komentator yang charismatic dan knowledgeable',
      '- Kualitas streaming yang stabil',
      '- Timing yang tepat (pertandingan besar)',
      '- Komunitas yang aktif dan engaged',
      '**Tren Live Reaction 2026:**',
      '- Multi-cam setup untuk pengalaman lebih immersive',
      '- Integration dengan social media untuk real-time updates',
      '- Collaborative streams dengan multiple hosts',
      '- Behind-the-scenes content sebelum dan sesudah pertandingan',
      '**Tips Membuat Live Reaction:**',
      '1. Pilih pertandingan yang menarik banyak fans',
      '2. Siapkan setup streaming yang reliable',
      '3. Bangun komunitas sebelum live',
      '4. Interaksi aktif dengan audiens',
      '5. Buat highlight setelah live untuk konten evergreen',
    ],
    faq: [
      {
        question: 'Platform mana yang terbaik untuk live reaction?',
        answer: 'YouTube adalah platform utama karena mendukung long-form content dan live streaming dengan kualitas tinggi.',
      },
      {
        question: 'Berapa lama durasi live reaction?',
        answer: 'Biasanya mengikuti durasi pertandingan, yaitu 90-120 menit ditambah waktu diskusi sebelum dan sesudah.',
      },
      {
        question: 'Bagaimana cara memulai live reaction?',
        answer: 'Mulai dengan setup sederhana: kamera, microphone, dan koneksi internet stabil. Fokus pada konten dan interaksi dengan audiens.',
      },
    ],
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = articles[slug]
  
  if (!article) {
    return { title: 'Artikel Tidak Ditemukan' }
  }

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://geromball.com/blog/${slug}`,
      type: 'article',
      publishedTime: article.date,
      authors: ['GEROMBALL'],
      images: [
        {
          url: '/logo.jpg',
          width: 512,
          height: 512,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: ['/logo.jpg'],
    },
    alternates: {
      canonical: `https://geromball.com/blog/${slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const article = articles[slug]

  if (!article) {
    return (
      <main className="min-h-screen bg-background pt-32 pb-20">
        <section className="mx-auto max-w-4xl px-6">
          <SectionTitle title="Artikel Tidak Ditemukan" subtitle="Halaman yang kamu cari tidak ada" />
          <Button href="/blog">Kembali ke Blog</Button>
        </section>
      </main>
    )
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
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
    datePublished: article.date,
    dateModified: article.date,
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faq.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-background pt-32 pb-20">
        <article className="mx-auto max-w-4xl px-6">
          {/* Header */}
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-full bg-foreground/10 px-3 py-1 text-xs uppercase tracking-wider text-muted">
                {article.category}
              </span>
              <span className="text-sm text-muted">{article.date}</span>
              <span className="text-sm text-muted">· {article.readTime}</span>
            </div>
            <h1 className="heading-display mb-4 text-4xl font-bold uppercase tracking-wider md:text-5xl">
              {article.title}
            </h1>
            <p className="text-lg text-muted">{article.description}</p>
          </div>

          {/* Content */}
          <div className="prose prose-invert mb-12 max-w-none">
            {article.content.map((paragraph, i) => (
              <p key={i} className="mb-4 text-muted leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* FAQ */}
          <div className="mb-12">
            <h2 className="heading-display mb-6 text-2xl font-bold uppercase tracking-wider">
              Pertanyaan Umum
            </h2>
            <div className="space-y-4">
              {article.faq.map((faq, i) => (
                <details
                  key={i}
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

          {/* Related Articles */}
          <div className="mb-12">
            <h2 className="heading-display mb-6 text-2xl font-bold uppercase tracking-wider">
              Artikel Lainnya
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <a
                href="/blog/panduan-jadi-kol-sepakbola"
                className="glass-card rounded-xl p-6 transition-all hover:border-foreground/30"
              >
                <span className="text-xs text-muted">Panduan</span>
                <h3 className="heading-display mt-2 text-lg uppercase tracking-wider">
                  Panduan Lengkap Jadi KOL Sepakbola 2026
                </h3>
              </a>
              <a
                href="/blog/rate-card-kol-football-indonesia"
                className="glass-card rounded-xl p-6 transition-all hover:border-foreground/30"
              >
                <span className="text-xs text-muted">Bisnis</span>
                <h3 className="heading-display mt-2 text-lg uppercase tracking-wider">
                  Rate Card KOL Football Indonesia
                </h3>
              </a>
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-2xl border border-foreground/20 bg-card p-12 text-center">
            <h2 className="heading-display mb-4 text-3xl font-bold uppercase tracking-wider">
              Ingin Kolaborasi?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-lg text-muted">
              GEROMBALL terbuka untuk kolaborasi brand, sponsorship, dan kerja sama bisnis.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="https://wa.me/6287700023151?text=Halo%20Geromball!%20Saya%20ingin%20berkolaborasi."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-green-500 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-green-600"
              >
                Chat WhatsApp
              </a>
              <Button href="/blog" variant="secondary">
                Kembali ke Blog
              </Button>
            </div>
          </div>
        </article>
      </main>
    </>
  )
}
