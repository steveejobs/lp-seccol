import { useEffect, type ReactNode } from 'react'

type MotionControllerProps = {
  children: ReactNode
  routeKey?: string
}

const visibleState = 'visible'
const hiddenState = 'hidden'
const entryMargin = '-9% 0px -9% 0px'
const exitMargin = '-6% 0px -6% 0px'

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

    const entryObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement
          if (entry.isIntersecting) {
            target.dataset.revealState = visibleState
            if (target.dataset.revealRepeat !== 'true') {
              entryObserver.unobserve(target)
            }
          }
        })
      },
      {
        rootMargin: entryMargin,
        threshold: 0,
      },
    )

    const exitObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement
          if (entry.isIntersecting || target.dataset.revealRepeat !== 'true') return

          const rootTop = entry.rootBounds?.top ?? 0
          target.dataset.revealEdge = entry.boundingClientRect.bottom <= rootTop ? 'above' : 'below'
          target.dataset.revealState = hiddenState
        })
      },
      {
        rootMargin: exitMargin,
        threshold: 0,
      },
    )

    revealTargets.forEach((target) => {
      const bounds = target.getBoundingClientRect()
      target.dataset.revealEdge = bounds.bottom < 0 ? 'above' : 'below'
      target.dataset.revealState = hiddenState
      entryObserver.observe(target)
      if (target.dataset.revealRepeat === 'true') exitObserver.observe(target)
    })
    root.classList.add('motion-ready')

    return () => {
      entryObserver.disconnect()
      exitObserver.disconnect()
      root.classList.remove('motion-ready')
    }
  }, [routeKey])

  return children
}
