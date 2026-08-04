import Link from 'next/link'

interface ButtonProps {
  href?: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export default function Button({ href, children, variant = 'primary', onClick, type = 'button', className: extraClass }: ButtonProps) {
  const baseStyles = 'heading-display rounded-full px-8 py-3 text-sm font-bold uppercase tracking-wider transition-all'

  const variants = {
    primary: 'bg-foreground text-background hover:bg-white/90',
    secondary: 'border border-foreground/20 text-foreground hover:bg-foreground/10',
  }

  const className = `${baseStyles} ${variants[variant]}${extraClass ? ` ${extraClass}` : ''}`

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  )
}
