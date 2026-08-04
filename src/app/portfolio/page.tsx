'use client'

import { useState } from 'react'
import SectionTitle from '@/components/SectionTitle'

type FilterTab = 'all' | 'youtube' | 'tiktok' | 'instagram'

interface PlatformInfo {
  name: string
  description: string
  contentTypes: string[]
  url: string
}

const platforms: PlatformInfo[] = [
  {
    name: 'YouTube',
    description: 'Hub utama konten football long-form — podcast, debat, challenge, live reaction, dan analisis.',
    contentTypes: ['Pojok Debat (Podcast)', 'Menjadi Manager (Challenge)', 'Live Reaction', 'Liga Logika', 'Double Pivot', 'GL News', 'Backlash', 'Shorts'],
    url: 'https://www.youtube.com/@geromball',
  },
  {
    name: 'TikTok',
    description: 'Konten short-form saja. Highlight singkat, momen football, dan klip viral.',
    contentTypes: ['Shorts (15-60 detik)', 'Highlight Singkat', 'Momen Football', 'Klip Viral'],
    url: 'https://www.tiktok.com/@geromball',
  },
  {
    name: 'Instagram',
    description: 'Konten campuran — reels, feed posts, stories, dan carousels. Storytelling visual untuk budaya football.',
    contentTypes: ['Reels (1-3 menit)', 'Feed Posts', 'IG Stories', 'Carousels', 'Highlight Pertandingan'],
    url: 'https://www.instagram.com/geromball/',
  },
]

const tabs: { key: FilterTab; label: string }[] = [
  { key: 'all', label: 'Semua Platform' },
  { key: 'youtube', label: 'YouTube' },
  { key: 'tiktok', label: 'TikTok' },
  { key: 'instagram', label: 'Instagram' },
]

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all')

  const filteredPlatforms = activeFilter === 'all'
    ? platforms
    : platforms.filter(p => p.name.toLowerCase() === activeFilter)

  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          title="Konten Kami"
          subtitle="Konten football di semua platform"
        />

        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {tabs.map(tab => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveFilter(tab.key)}
              className={`heading-display rounded-lg px-6 py-2.5 text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeFilter === tab.key
                  ? 'bg-foreground text-background'
                  : 'bg-card text-muted hover:text-foreground border border-card-border'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid gap-8">
          {filteredPlatforms.map(platform => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-card-border bg-card p-8 transition-all duration-300 hover:border-foreground/30"
            >
              <div className="mb-4 flex items-center gap-4">
                <h3 className="heading-display text-3xl uppercase tracking-wider">
                  {platform.name}
                </h3>
                <span className="rounded bg-foreground/10 px-3 py-1 text-xs uppercase tracking-wider text-muted">
                  {platform.contentTypes.length} jenis konten
                </span>
              </div>
              
              <p className="mb-6 text-muted">{platform.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {platform.contentTypes.map(type => (
                  <span
                    key={type}
                    className="rounded-lg border border-card-border bg-background px-3 py-1.5 text-xs text-muted"
                  >
                    {type}
                  </span>
                ))}
              </div>
              
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-muted">
                  {platform.name === 'YouTube' ? 'Long-form + Shorts' : platform.name === 'TikTok' ? 'Short-form saja' : 'Format campuran'}
                </span>
                <span className="text-xs uppercase tracking-wider text-foreground/50 group-hover:text-foreground transition-colors">
                  Kunjungi Channel →
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-16 rounded-xl border border-card-border bg-card p-12 text-center">
          <h3 className="heading-display mb-4 text-2xl font-bold uppercase tracking-wider">
            Strategi Konten
          </h3>
          <div className="mx-auto grid max-w-3xl gap-6 text-left md:grid-cols-3">
            <div>
              <h4 className="mb-2 font-semibold text-foreground">YouTube</h4>
              <p className="text-sm text-muted">Podcast long-form, debat, challenge, live reaction. Hub konten utama.</p>
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-foreground">TikTok</h4>
              <p className="text-sm text-muted">Klip short-form, highlight, momen viral. Konsumsi cepat.</p>
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-foreground">Instagram</h4>
              <p className="text-sm text-muted">Reels, feeds, stories, carousels. Storytelling visual.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
