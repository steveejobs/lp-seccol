import { createContext } from 'react'

export type RouterValue = {
  path: string
  navigate: (path: string) => void
}

export const RouterContext = createContext<RouterValue | null>(null)
