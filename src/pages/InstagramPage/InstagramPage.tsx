import { RouteLink } from '../../app/router'
import { company } from '../../content/siteContent'
import styles from './InstagramPage.module.css'

type LinkIconProps = { type: 'arrow' | 'facebook' | 'linkedin' | 'map' | 'whatsapp' }

function LinkIcon({ type }: LinkIconProps) {
  if (type === 'whatsapp') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 11.7a8 8 0 0 1-11.8 7L4 20l1.3-4.1A8 8 0 1 1 20 11.7Z" />
        <path d="M8.4 7.8c.2-.4.4-.4.7-.4h.4c.1 0 .3 0 .4.3l.7 1.7c.1.2.1.4 0 .5l-.6.8c-.1.1-.2.3-.1.5.6 1.2 1.6 2.2 2.8 2.8.2.1.4.1.5-.1l.8-1c.2-.2.4-.2.6-.1l1.7.8c.2.1.3.2.3.4 0 .5-.2 1.5-.7 1.9-.5.5-1.3.8-2.2.6-1-.2-2.3-.7-3.8-2-2-1.8-3.1-4-3.2-4.2-.1-.2-.8-1.6 0-2.9l.7-.9Z" />
      </svg>
    )
  }
  if (type === 'facebook') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4.3c-.5-.1-2.2-.3-4.1-.3C9 4 7 6.3 7 10.4V14H3v4h4v6h5v-6h4l.6-4H12v-3.2C12 9.6 12.4 8 14 8Z" /></svg>
  }
  if (type === 'linkedin') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 8.5H3V20h3.5V8.5ZM4.8 3A2.1 2.1 0 1 0 4.8 7.2 2.1 2.1 0 0 0 4.8 3ZM20.5 13.4c0-3.5-1.9-5.2-4.4-5.2-2 0-3 1.1-3.5 1.9V8.5H9.1V20h3.5v-5.7c0-1.5.3-3 2.2-3 1.9 0 1.9 1.8 1.9 3.1V20h3.5l.3-6.6Z" /></svg>
  }
  if (type === 'map') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5.5-8 12-8 12S4 15.5 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.7" /></svg>
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
}

const links = [
  {
    kind: 'external' as const,
    title: 'Atendimento Seccol',
    description: 'Fale diretamente com nossa equipe',
    href: company.whatsapp,
    icon: 'whatsapp' as const,
    primary: true,
  },
  {
    kind: 'internal' as const,
    title: 'Site oficial',
    description: 'Conheça serviços e atuação técnica',
    href: '/',
    icon: 'arrow' as const,
    primary: false,
  },
  {
    kind: 'external' as const,
    title: 'Fan page Seccol',
    description: 'Acompanhe a Seccol no Facebook',
    href: 'https://www.facebook.com/seccolcertificacao',
    icon: 'facebook' as const,
    primary: false,
  },
  {
    kind: 'external' as const,
    title: 'LinkedIn',
    description: 'Acompanhe o Grupo Seccol',
    href: 'https://www.linkedin.com/company/grupo-seccol/',
    icon: 'linkedin' as const,
    primary: false,
  },
  {
    kind: 'external' as const,
    title: 'Localização',
    description: 'Abra a rota no Google Maps',
    href: 'https://goo.gl/maps/VDEdZiviCbrzHzbJ8',
    icon: 'map' as const,
    primary: false,
  },
] as const

export function InstagramPage() {
  return (
    <main className={styles.page}>
      <div className={styles.ambient} aria-hidden="true" />
      <section className={styles.card} aria-labelledby="instagram-page-title">
        <div className={styles.content}>
          <header className={styles.intro}>
            <div className={styles.topline}>
              <RouteLink className={styles.brand} to="/" aria-label="Seccol — ir para o site">
                <img src="./brand/seccol-logo.png" width="128" height="31" alt="Seccol Controle e Certificação" />
              </RouteLink>
              <span className={styles.official}><i aria-hidden="true">✓</i> Links oficiais</span>
            </div>
            <h1 id="instagram-page-title">Controle que você pode comprovar.</h1>
            <p>Certificação, manutenção e engenharia para equipamentos e áreas limpas em todo o país.</p>
          </header>

          <div className={styles.media} aria-hidden="true">
            <img src="./media/generated/instrument-calibration.webp" alt="" />
            <span><b>Desde 2009</b> Precisão em ambientes críticos</span>
          </div>

          <nav className={styles.links} aria-label="Links da Seccol">
            {links.map((link) => {
              const content = (
                <>
                  <span className={styles.icon}><LinkIcon type={link.icon} /></span>
                  <span className={styles.linkCopy}><strong>{link.title}</strong><small>{link.description}</small></span>
                  <span className={styles.arrow}><LinkIcon type="arrow" /></span>
                </>
              )

              return link.kind === 'internal'
                ? <RouteLink className={styles.link} to={link.href} key={link.title}>{content}</RouteLink>
                : <a className={`${styles.link} ${link.primary ? styles.primary : ''}`} href={link.href} key={link.title} target="_blank" rel="noreferrer">{content}</a>
            })}
          </nav>

          <p className={styles.signature}>Seccol Controle e Certificação <span aria-hidden="true">•</span> Goiânia, GO</p>
        </div>
      </section>
    </main>
  )
}
