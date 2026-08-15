import { RouteLink } from '../../app/router'
import { company } from '../../content/siteContent'
import styles from './SiteLayout.module.css'

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLead}>
        <h2>Converse com quem entende de ambientes críticos.</h2>
        <a href={company.whatsapp} target="_blank" rel="noreferrer">Solicitar orçamento <span aria-hidden="true">→</span></a>
      </div>
      <div className={styles.footerGrid}>
        <RouteLink to="/" aria-label="Seccol — início">
          <img src="./brand/seccol-logo.png" width="128" height="31" alt="Seccol Controle e Certificação" />
        </RouteLink>
        <div>
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <a href={`tel:+556232751272`}>{company.phone}</a>
          <a href={company.whatsapp} target="_blank" rel="noreferrer">{company.mobile}</a>
        </div>
        <div>
          <p>{company.address}</p>
          <p>{company.hours}</p>
        </div>
        <div>
          <a href={company.instagram} target="_blank" rel="noreferrer">Instagram</a>
          <a href={company.facebook} target="_blank" rel="noreferrer">Facebook</a>
        </div>
      </div>
      <p className={styles.copyright}>Seccol Controle e Certificação · Desde 2009</p>
    </footer>
  )
}
