'use client'

import { useState, useEffect } from 'react'
import SectionTitle from '@/components/SectionTitle'
import Button from '@/components/Button'

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  role: string
}

export default function MediaKitPage() {
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
  })

  useEffect(() => {
    const saved = localStorage.getItem('geromball_media_kit_access')
    if (saved === 'true') {
      setSubmitted(true)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/media-kit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.error || 'Failed to submit')

      localStorage.setItem('geromball_media_kit_access', 'true')
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  if (!submitted) {
    return (
      <main className="min-h-screen bg-background pt-32 pb-20">
        <section className="mx-auto max-w-lg px-6">
          <SectionTitle
            title="Media Kit"
            subtitle="Isi form untuk mengakses media kit kami"
          />

          <div className="glass-card rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted">
                  Nama <span className="text-foreground">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Nama kamu"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-card-border bg-card px-4 py-3 text-foreground placeholder-muted transition-colors focus:border-foreground focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted">
                  Email <span className="text-foreground">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="email@kamu.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-card-border bg-card px-4 py-3 text-foreground placeholder-muted transition-colors focus:border-foreground focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="phone" className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted">
                  No. WhatsApp <span className="text-foreground">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="08xxxxxxxxxx"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-card-border bg-card px-4 py-3 text-foreground placeholder-muted transition-colors focus:border-foreground focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="company" className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted">
                  Perusahaan <span className="text-foreground">*</span>
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  required
                  placeholder="Nama perusahaan"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-card-border bg-card px-4 py-3 text-foreground placeholder-muted transition-colors focus:border-foreground focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="role" className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted">
                  Posisi <span className="text-foreground">*</span>
                </label>
                <input
                  id="role"
                  name="role"
                  type="text"
                  required
                  placeholder="Marketing Manager, Brand Manager, dll."
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-card-border bg-card px-4 py-3 text-foreground placeholder-muted transition-colors focus:border-foreground focus:outline-none"
                />
              </div>

              {error && (
                <p className="text-sm text-red-400">{error}</p>
              )}

              <Button type="submit" variant="primary" className="w-full">
                {isLoading ? 'Mengirim...' : 'Akses Media Kit'}
              </Button>
            </form>

            <p className="mt-6 text-center text-xs text-muted">
              Data Anda hanya digunakan untuk keperluan kolaborasi.
            </p>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-background/95 px-6 py-4 backdrop-blur-sm border-b border-card-border">
        <h1 className="heading-display text-xl font-bold uppercase tracking-wider">Media Kit</h1>
        <a
          href="https://wa.me/6287700023151?text=Halo%20Geromball!%20Saya%20ingin%20berkolaborasi."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-green-500 px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-green-600"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Hubungi Kami
        </a>
      </div>
      <iframe
        src="/media-kit.html"
        className="h-screen w-full border-0 pt-16"
        title="Geromball Media Kit"
      />
    </main>
  )
}
