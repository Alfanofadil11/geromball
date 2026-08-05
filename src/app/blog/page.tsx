import type { Metadata } from 'next'
import SectionTitle from '@/components/SectionTitle'

export const metadata: Metadata = {
  title: 'Blog | GEROMBALL - KOL Bola Indonesia',
  description: 'Blog GEROMBALL — KOL Bola Indonesia dan Football KOL. Artikel tentang Podcast, Live Reaction, Short-Form (Instagram, TikTok, YouTube Shorts), dan industri media olahraga.',
  openGraph: {
    title: 'Blog | GEROMBALL - KOL Bola Indonesia',
    description: 'Blog GEROMBALL — KOL Bola Indonesia dan Football KOL. Artikel tentang Podcast, Live Reaction, Short-Form.',
    url: 'https://geromball.com/blog',
  },
  alternates: {
    canonical: 'https://geromball.com/blog',
  },
}

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
}

const posts: BlogPost[] = [
  {
    slug: 'panduan-jadi-kol-sepakbola',
    title: 'Panduan Lengkap Jadi KOL Sepakbola 2026',
    excerpt: 'Ingin menjadi KOL sepakbola? Pelajari langkah-langkah praktis dari nol hingga membangun audiens yang loyal.',
    date: '2026-07-29',
    readTime: '8 menit',
    category: 'Panduan',
  },
  {
    slug: 'rate-card-kol-football-indonesia',
    title: 'Rate Card KOL Football Indonesia: Berapa Harganya?',
    excerpt: 'Breakdown lengkap rate card KOL football Indonesia berdasarkan ukuran audiens, platform, dan jenis konten.',
    date: '2026-07-29',
    readTime: '6 menit',
    category: 'Bisnis',
  },
  {
    slug: '10-program-football-terbaik-indonesia',
    title: '10 Program Football Terbaik di Indonesia 2026',
    excerpt: 'Daftar program football paling populer di Indonesia mulai dari podcast, debat, hingga live reaction.',
    date: '2026-07-29',
    readTime: '7 menit',
    category: 'Rekomendasi',
  },
  {
    slug: 'kenapa-live-reaction-bola-viral',
    title: 'Kenapa Live Reaction Bola Viral di Indonesia',
    excerpt: 'Analisis mengapa konten live reaction pertandingan bola menjadi fenomena viral di kalangan fans Indonesia.',
    date: '2026-07-29',
    readTime: '5 menit',
    category: 'Analisis',
  },
]

export default function BlogPage() {
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'GEROMBALL Blog',
    description: 'Artikel dan panduan tentang football KOL dan industri media olahraga Indonesia.',
    url: 'https://geromball.com/blog',
    publisher: {
      '@type': 'Organization',
      name: 'GEROMBALL',
      logo: {
        '@type': 'ImageObject',
        url: 'https://geromball.com/logo.jpg',
      },
    },
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'GEROMBALL Blog Posts',
    itemListElement: posts.map((post, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Article',
        headline: post.title,
        url: `https://geromball.com/blog/${post.slug}`,
        datePublished: post.date,
        author: {
          '@type': 'Organization',
          name: 'GEROMBALL',
        },
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <main className="min-h-screen bg-background pt-32 pb-20">
        <section className="mx-auto max-w-4xl px-6">
          <SectionTitle
            title="Blog"
            subtitle="Artikel, panduan, dan analisis tentang football"
            as="h1"
          />

          <div className="mb-12 rounded-2xl border border-foreground/20 bg-card p-8">
            <p className="text-lg leading-relaxed text-muted">
              Temukan artikel terbaru tentang <strong className="text-foreground">football KOL</strong>, <strong className="text-foreground">konten football</strong>, dan <strong className="text-foreground">industri media olahraga</strong> Indonesia. Dari panduan praktis hingga analisis tren terkini.
            </p>
          </div>

          <div className="space-y-6">
            {posts.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block rounded-xl border border-card-border bg-card p-6 transition-all hover:border-foreground/30"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="rounded-full bg-foreground/10 px-3 py-1 text-xs uppercase tracking-wider text-muted">
                    {post.category}
                  </span>
                  <span className="text-xs text-muted">{post.date}</span>
                  <span className="text-xs text-muted">· {post.readTime}</span>
                </div>
                <h2 className="heading-display mb-2 text-xl font-bold uppercase tracking-wider group-hover:text-foreground/80 transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted">{post.excerpt}</p>
                <span className="mt-4 inline-block text-sm text-foreground/50 group-hover:text-foreground transition-colors">
                  Baca selengkapnya →
                </span>
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl border border-foreground/20 bg-card p-8 text-center">
            <h2 className="heading-display mb-4 text-2xl font-bold uppercase tracking-wider">
              Ingin Kolaborasi?
            </h2>
            <p className="mx-auto mb-6 max-w-xl text-muted">
              GEROMBALL terbuka untuk kolaborasi brand, sponsorship, dan kerja sama bisnis.
            </p>
            <a
              href="https://wa.me/6287700023151?text=Halo%20Geromball!%20Saya%20ingin%20berkolaborasi."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-green-600"
            >
              Chat WhatsApp
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
