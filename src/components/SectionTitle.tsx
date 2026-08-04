interface SectionTitleProps {
  title: string
  subtitle?: string
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-12 text-center">
      <h1 className="heading-display mb-4 text-4xl font-bold uppercase tracking-wider md:text-5xl gradient-text">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg text-muted">{subtitle}</p>
      )}
    </div>
  )
}
