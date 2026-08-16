import { useEffect, useState, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from 'react'

import { RouterContext } from './routerContext'
import { useRouter } from './useRouter'

function readPath() {
  const legacyHashPath = window.location.hash.match(/^#(\/.*)$/)?.[1]
  const value = legacyHashPath ?? window.location.pathname ?? '/'
  const normalized = value.length > 1 ? value.replace(/\/$/, '') : value
  return normalized.startsWith('/') ? normalized : `/${normalized}`
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(readPath)

  useEffect(() => {
    const syncPath = () => {
      setPath(readPath())
      window.scrollTo({ top: 0, behavior: 'instant' })
    }

    if (window.location.hash.startsWith('#/')) {
      window.history.replaceState(null, '', readPath())
    }

    window.addEventListener('popstate', syncPath)
    return () => window.removeEventListener('popstate', syncPath)
  }, [])

  const navigate = (nextPath: string) => {
    if (nextPath === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const update = () => {
      window.history.pushState(null, '', nextPath)
      setPath(nextPath)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }

    if ('startViewTransition' in document) {
      document.startViewTransition(update)
    } else {
      update()
    }
  }

  return <RouterContext value={{ path, navigate }}>{children}</RouterContext>
}

type RouteLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string
}

export function RouteLink({ to, onClick, ...props }: RouteLinkProps) {
  const { navigate } = useRouter()

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || props.target === '_blank') return
    event.preventDefault()
    navigate(to)
  }

  return <a href={to} onClick={handleClick} {...props} />
}
