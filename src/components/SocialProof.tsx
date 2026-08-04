'use client'

import { useEffect, useState } from 'react'

interface CounterProps {
  end: number
  suffix?: string
  duration?: number
}

function Counter({ end, suffix = '', duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTimestamp: number | null = null
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
  }, [end, duration])

  return <>{count.toLocaleString()}{suffix}</>
}

const stats = [
  { label: 'YouTube Subscribers', value: 235000, suffix: '+' },
  { label: 'TikTok Followers', value: 455000, suffix: '+' },
  { label: 'Instagram Followers', value: 95000, suffix: '+' },
  { label: 'Total Reach', value: 780000, suffix: '+' },
]

export default function SocialProof() {
  return (
    <section className="border-y border-foreground/10 bg-foreground/5 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="heading-display text-3xl font-bold gradient-text md:text-4xl">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2 text-xs uppercase tracking-widest text-muted">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
