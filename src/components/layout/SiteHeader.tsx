import { useEffect, useState } from 'react'

import { RouteLink } from '../../app/router'
import { useRouter } from '../../app/useRouter'
import { company } from '../../content/siteContent'
import styles from './SiteLayout.module.css'

const links = [
  { label: 'A Seccol', to: '/a-seccol' },
  { label: 'Testes', to: '/testes-em-equipamentos' },
  { label: 'Áreas limpas', to: '/areas-limpas' },
  { label: 'Instrumentos', to: '/instrumentos' },
  { label: 'FAQ', to: '/faq' },
] as const

export function SiteHeader() {
  const { path } = useRouter()
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(false), [path])

  return (
    <header className={styles.header}>
      <RouteLink className={styles.brand} to="/" aria-label="Seccol — início">
        <img src="./brand/seccol-logo.png" width="128" height="31" alt="Seccol Controle e Certificação" />
      </RouteLink>

      <button
        className={styles.menuButton}
        type="button"
        aria-expanded={open}
        aria-controls="site-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        <span>Menu</span>
        <span className={styles.menuIcon} aria-hidden="true" />
      </button>

      <nav id="site-navigation" className={styles.navigation} data-open={open ? 'true' : 'false'} aria-label="Principal">
        {links.map((link) => (
          <RouteLink key={link.to} to={link.to} aria-current={path === link.to ? 'page' : undefined}>
            {link.label}
          </RouteLink>
        ))}
        <RouteLink className={styles.contactLink} to="/contato" aria-current={path === '/contato' ? 'page' : undefined}>Diagnóstico</RouteLink>
        <a className={styles.mobileWhatsApp} href={company.whatsapp} target="_blank" rel="noreferrer">Falar no WhatsApp</a>
      </nav>
    </header>
  )
}
