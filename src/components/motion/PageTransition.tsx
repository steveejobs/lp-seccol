import type { ReactNode } from 'react'

type PageTransitionProps = {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  return <div data-page-transition>{children}</div>
}
