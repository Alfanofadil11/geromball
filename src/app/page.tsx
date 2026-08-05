import SocialProof from "@/components/SocialProof";
import SectionTitle from "@/components/SectionTitle";
import Button from "@/components/Button";
import { getYouTubeVideos } from "@/lib/youtube";

export default async function Home() {
  const videos = await getYouTubeVideos()

  // VideoObject schema for AI/Google
  const videoSchema = [
    ...videos.pojokDebat.map((v, i) => ({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: v.title,
      description: `${v.title} - GEROMBALL Pojok Debat episode ${i + 1}`,
      thumbnailUrl: v.thumbnail,
      uploadDate: v.published,
      contentUrl: v.url,
      embedUrl: `https://www.youtube.com/embed/${v.id}`,
      publisher: {
        "@type": "Organization",
        name: "GEROMBALL",
        logo: {
          "@type": "ImageObject",
          url: "https://geromball.com/logo.jpg",
        },
      },
      isPartOf: {
        "@type": "Playlist",
        name: "Pojok Debat",
        url: "https://www.youtube.com/playlist?list=PLONlD36-GxIh41bn5Gt0WkGNY6ifTSaAN",
      },
    })),
    ...videos.menjadiManager.map((v, i) => ({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: v.title,
      description: `${v.title} - GEROMBALL Menjadi Manager episode ${i + 1}`,
      thumbnailUrl: v.thumbnail,
      uploadDate: v.published,
      contentUrl: v.url,
      embedUrl: `https://www.youtube.com/embed/${v.id}`,
      publisher: {
        "@type": "Organization",
        name: "GEROMBALL",
        logo: {
          "@type": "ImageObject",
          url: "https://geromball.com/logo.jpg",
        },
      },
      isPartOf: {
        "@type": "Playlist",
        name: "Menjadi Manager",
        url: "https://www.youtube.com/playlist?list=PLONlD36-GxIhjvuA2xLSHSPP9VbFE_tDG",
      },
    })),
    ...videos.liveReaction.map((v, i) => ({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: v.title,
      description: `${v.title} - GEROMBALL Live Reaction stream ${i + 1}`,
      thumbnailUrl: v.thumbnail,
      uploadDate: v.published,
      contentUrl: v.url,
      embedUrl: `https://www.youtube.com/embed/${v.id}`,
      publisher: {
        "@type": "Organization",
        name: "GEROMBALL",
        logo: {
          "@type": "ImageObject",
          url: "https://geromball.com/logo.jpg",
        },
      },
      isPartOf: {
        "@type": "Playlist",
        name: "Live Reaction",
        url: "https://www.youtube.com/playlist?list=PLONlD36-GxIgzgz-Y2jC5g6Di0p-x0HvV",
      },
    })),
  ]

  // WebSite schema with SearchAction
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GEROMBALL",
    url: "https://geromball.com",
    description: "Fanatik tapi fun. Media football — Pojok Debat, Menjadi Manager, Live Reaction.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://geromball.com/portfolio?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

const programs = [
  {
    title: "Pojok Debat",
    description: "Program unggulan debat football. Opini tanpa filter.",
    url: "https://www.youtube.com/@geromball/videos",
  },
  {
    title: "Menjadi Manager",
    description: "Challenge series — bertransformasi menjadi manajer football.",
    url: "https://www.youtube.com/@geromball/videos",
  },
  {
    title: "Live Reaction",
    description: "Reaksi pertandingan real-time bersama komunitas.",
    url: "https://www.youtube.com/@geromball/streams",
  },
  {
    title: "Liga Logika",
    description: "Analisis football yang membongkar permainan indah.",
    url: "https://www.youtube.com/@geromball/videos",
  },
  {
    title: "Double Pivot",
    description: "Diskusi mendalam tentang taktik dan budaya football.",
    url: "https://www.youtube.com/@geromball/videos",
  },
  {
    title: "GL News",
    description: "Berita transfer, preview pertandingan, dan kabar terkini.",
    url: "https://www.youtube.com/@geromball/videos",
  },
];

  return (
    <>
      {/* SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
        <div className="halftone absolute inset-0" />
        <div className="grain absolute inset-0" />

        {/* Glow effect */}
        <div className="glow absolute inset-0" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="heading-display text-7xl font-bold leading-none sm:text-8xl md:text-9xl lg:text-[10rem]">
            <span className="gradient-text">FANATIK</span>
            <br />
            <span className="gradient-text">TAPI FUN</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-muted md:text-xl">
            <strong className="text-foreground">GEROMBALL</strong> adalah <strong className="text-foreground">media football Indonesia</strong> dan <strong className="text-foreground">Football KOL</strong> terdepan. Kami menciptakan konten football — dari <strong className="text-foreground">Pojok Debat</strong> hingga <strong className="text-foreground">Live Reaction</strong> — yang menghibur, mengedukasi, dan menyatukan komunitas fanatik bola.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted/70">
            235K+ YouTube Subscribers · 455K+ TikTok Followers · 95K+ Instagram Followers
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/portfolio" variant="primary">
              Konten Kami
            </Button>
            <Button href="/media-kit" variant="secondary">
              Media Kit
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <SocialProof />

      {/* Programs */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            title="Program Kami"
            subtitle="Konten yang mendefinisikan budaya football"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <a
                key={program.title}
                href={program.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card group p-6"
              >
                <h3 className="heading-display mb-2 text-2xl uppercase tracking-wider">
                  {program.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {program.description}
                </p>
                <span className="mt-3 inline-block text-xs uppercase tracking-wider text-foreground/50 group-hover:text-foreground transition-colors">
                  Tonton di YouTube →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Pojok Debat Section */}
      <section className="relative px-4 py-24 sm:px-6 lg:px-8">
        <div className="halftone absolute inset-0" />
        <div className="relative mx-auto max-w-7xl">
          <SectionTitle
            title="Pojok Debat"
            subtitle="Program debat unggulan kami — opini tanpa filter"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {videos.pojokDebat.map((video) => (
              <a
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="video-card relative flex aspect-video cursor-pointer items-center justify-center"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="video-overlay absolute inset-0" />
                <div className="play-pulse relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-foreground/10 text-xl text-foreground backdrop-blur-sm">
                  ▶
                </div>
                <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
                  <p className="text-xs font-medium leading-tight line-clamp-2 text-white">
                    {video.title}
                  </p>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button
              href="https://www.youtube.com/@geromball/videos"
              variant="secondary"
            >
              Watch All Episodes
            </Button>
          </div>
        </div>
      </section>

      {/* Menjadi Manager Section */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            title="Menjadi Manager"
            subtitle="Challenge series — bertransformasi menjadi manajer football"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {videos.menjadiManager.map((video) => (
              <a
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="video-card relative flex aspect-video cursor-pointer items-center justify-center"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="video-overlay absolute inset-0" />
                <div className="play-pulse relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-foreground/10 text-xl text-foreground backdrop-blur-sm">
                  ▶
                </div>
                <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
                  <p className="text-xs font-medium leading-tight line-clamp-2 text-white">
                    {video.title}
                  </p>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button
              href="https://www.youtube.com/@geromball/videos"
              variant="secondary"
            >
              Watch All Episodes
            </Button>
          </div>
        </div>
      </section>

      {/* Live Reaction Section */}
      <section className="relative px-4 py-24 sm:px-6 lg:px-8">
        <div className="halftone absolute inset-0" />
        <div className="relative mx-auto max-w-7xl">
          <SectionTitle
            title="Live Reaction"
            subtitle="Reaksi pertandingan real-time bersama komunitas"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {videos.liveReaction.map((video) => (
              <a
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="video-card relative flex aspect-video cursor-pointer items-center justify-center"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="video-overlay absolute inset-0" />
                <div className="play-pulse live-pulse relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/20 text-xl text-red-400 backdrop-blur-sm">
                  ●
                </div>
                <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
                  <p className="text-xs font-medium leading-tight line-clamp-2 text-white">
                    {video.title}
                  </p>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button
              href="https://www.youtube.com/@geromball/videos"
              variant="secondary"
            >
              Tonton Semua Episode
            </Button>
          </div>
        </div>
      </section>

      {/* Business Collaboration CTA */}
      <section className="relative px-4 py-24 sm:px-6 lg:px-8">
        <div className="halftone absolute inset-0" />
        <div className="relative mx-auto max-w-4xl">
          <div className="rounded-2xl border border-foreground/20 bg-card p-12 text-center">
            <h2 className="heading-display mb-4 text-3xl font-bold uppercase tracking-wider md:text-4xl">
              Ingin Berkolaborasi?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-lg text-muted">
              Sponsorship, konten kustom, atau kolaborasi brand — hubungi kami langsung via WhatsApp.
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
                Chat WhatsApp Sekarang
              </a>
              <a
                href="mailto:alfanofadil@geromball.com"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-transparent px-8 py-4 text-sm font-bold uppercase tracking-wider text-foreground transition-all hover:bg-foreground/10"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Kami
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="glass-card relative mx-auto max-w-4xl p-12 text-center">
          <div className="halftone absolute inset-0 rounded-2xl" />
          <div className="glow absolute inset-0" />
          <div className="relative">
            <h2 className="heading-display text-4xl font-bold gradient-text md:text-5xl">
              Gabung Komunitas
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              GEROMBOYS Telegram, donasi SAWERIA, Clipper Program.
              Bagian dari pergerakan.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/contact" variant="primary">
                Hubungi Kami
              </Button>
              <a
                href="https://t.me/GEROMBOYS"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center justify-center rounded-full border border-foreground/20 bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-wider text-foreground heading-display"
              >
                Gabung Telegram
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
