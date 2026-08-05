interface SectionTitleProps {
  title: string
  subtitle?: string
  as?: 'h1' | 'h2' | 'h3'
}

export default function SectionTitle({ title, subtitle, as: Tag = 'h2' }: SectionTitleProps) {
  return (
    <div className="mb-12 text-center">
      <Tag className="heading-display mb-4 text-4xl font-bold uppercase tracking-wider md:text-5xl gradient-text">
        {title}
      </Tag>
      {subtitle && (
        <p className="text-lg text-muted">{subtitle}</p>
      )}
    </div>
  )
}
