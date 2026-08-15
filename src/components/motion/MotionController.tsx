import { useEffect, type ReactNode } from 'react'

type MotionControllerProps = {
  children: ReactNode
  routeKey?: string
}

const visibleState = 'visible'
const hiddenState = 'hidden'

export function MotionController({ children, routeKey }: MotionControllerProps) {
  useEffect(() => {
    const root = document.documentElement
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))

    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
      revealTargets.forEach((target) => {
        target.dataset.revealState = visibleState
      })
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement
          if (entry.isIntersecting) {
            target.dataset.revealState = visibleState
            if (target.dataset.revealRepeat !== 'true') {
              observer.unobserve(target)
            }
          } else if (target.dataset.revealRepeat === 'true') {
            target.dataset.revealState = hiddenState
          }
        })
      },
      {
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.12,
      },
    )

    revealTargets.forEach((target) => {
      target.dataset.revealState = hiddenState
      observer.observe(target)
    })
    root.classList.add('motion-ready')

    return () => {
      observer.disconnect()
      root.classList.remove('motion-ready')
    }
  }, [routeKey])

  return children
}
