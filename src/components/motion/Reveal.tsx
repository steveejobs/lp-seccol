import type { CSSProperties, ElementType, ReactNode } from 'react'

type RevealProps = {
  as?: ElementType
  children: ReactNode
  className?: string
  index?: number
  repeat?: boolean
  variant?: 'lift' | 'fade'
}

type RevealStyle = CSSProperties & {
  '--reveal-index': number
}

export function Reveal({
  as: Component = 'div',
  children,
  className,
  index = 0,
  repeat = false,
  variant = 'lift',
}: RevealProps) {
  const style: RevealStyle = { '--reveal-index': index }

  return (
    <Component
      className={className}
      data-reveal={variant}
      data-reveal-repeat={repeat ? 'true' : undefined}
      style={style}
    >
      {children}
    </Component>
  )
}
