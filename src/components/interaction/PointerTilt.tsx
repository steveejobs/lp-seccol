import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'

import styles from './PointerTilt.module.css'

type PointerTiltProps = {
  children: ReactNode
  className?: string
  intensity?: number
}

type TiltStyle = CSSProperties & {
  '--tilt-intensity': string
}

export function PointerTilt({ children, className = '', intensity = 5 }: PointerTiltProps) {
  const surfaceRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const surface = surfaceRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')

    if (!surface || reducedMotion.matches || !finePointer.matches) {
      return
    }

    let frame = 0

    const update = (event: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const bounds = surface.getBoundingClientRect()
        const x = (event.clientX - bounds.left) / bounds.width - 0.5
        const y = (event.clientY - bounds.top) / bounds.height - 0.5
        surface.style.setProperty('--pointer-x', x.toFixed(3))
        surface.style.setProperty('--pointer-y', y.toFixed(3))
      })
    }

    const reset = () => {
      surface.style.setProperty('--pointer-x', '0')
      surface.style.setProperty('--pointer-y', '0')
    }

    surface.addEventListener('pointermove', update)
    surface.addEventListener('pointerleave', reset)

    return () => {
      cancelAnimationFrame(frame)
      surface.removeEventListener('pointermove', update)
      surface.removeEventListener('pointerleave', reset)
    }
  }, [])

  const style: TiltStyle = { '--tilt-intensity': `${intensity}deg` }

  return (
    <div ref={surfaceRef} className={`${styles.perspective} ${className}`.trim()} style={style}>
      <div className={styles.surface}>{children}</div>
    </div>
  )
}
