'use client'

import { useState } from 'react'

interface Talent {
  name: string
  handle: string
  linkedin: string | null
  photo: string
  followers: string
  club: string
}

export default function TalentCard({ talent }: { talent: Talent }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <article className="flex-none w-48 snap-center rounded-xl border border-card-border bg-card p-6 text-center transition-all duration-300 hover:border-foreground/30">
        <button
          onClick={() => setShowModal(true)}
          className="mx-auto mb-4 block aspect-square w-full max-w-[160px] overflow-hidden rounded-xl cursor-pointer"
        >
          <img
            src={talent.photo}
            alt={talent.name}
            className="h-full w-full object-cover object-top"
          />
        </button>
        <h4 className="heading-display mb-1 text-base uppercase tracking-wider">
          {talent.name}
        </h4>
        <p className="mb-1 text-xs text-muted">{talent.handle}</p>
        <p className="mb-2 text-xs font-medium text-foreground/70">
          {talent.followers} followers · {talent.club}
        </p>
        {talent.linkedin && (
          <a
            href={talent.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"
          >
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
        )}
      </article>

      {/* Lightbox Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute -top-2 -right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background text-sm font-bold"
            >
              ✕
            </button>
            <img
              src={talent.photo}
              alt={talent.name}
              className="w-full rounded-xl object-contain"
            />
            <div className="mt-4 text-center">
              <h3 className="heading-display text-xl font-bold uppercase tracking-wider">
                {talent.name}
              </h3>
              <p className="text-sm text-muted">{talent.handle}</p>
              <p className="text-sm font-medium text-foreground/70">
                {talent.followers} followers · {talent.club}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
