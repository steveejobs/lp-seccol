import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

import styles from './Button.module.css'

type SharedProps = {
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'quiet'
}

type ButtonAsLink = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
  }

type ButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never
  }

type ButtonProps = ButtonAsLink | ButtonAsButton

export function Button({ children, className = '', variant = 'primary', ...props }: ButtonProps) {
  const classes = `${styles.button} ${styles[variant]} ${className}`.trim()

  if ('href' in props && props.href) {
    return (
      <a className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button
      className={classes}
      type="button"
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  )
}
