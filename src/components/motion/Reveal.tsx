import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react'

type RevealProps = Omit<HTMLAttributes<HTMLElement>, 'children' | 'className' | 'style'> & {
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
  ...props
}: RevealProps) {
  const style: RevealStyle = { '--reveal-index': index }

  return (
    <Component
      {...props}
      className={className}
      data-reveal={variant}
      data-reveal-repeat={repeat ? 'true' : undefined}
      style={style}
    >
      {children}
    </Component>
  )
}
