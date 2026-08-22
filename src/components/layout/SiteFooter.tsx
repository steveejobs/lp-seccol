import { RouteLink } from '../../app/router'
import { company } from '../../content/siteContent'
import styles from './SiteLayout.module.css'

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div className={styles.footerBrand}>
          <RouteLink to="/" aria-label="Seccol — início">
            <img src="./brand/seccol-logo.png" width="128" height="31" alt="Seccol Controle e Certificação" />
          </RouteLink>
          <p>Controle e certificação para ambientes críticos.</p>
          <RouteLink className={styles.footerDiagnostic} to="/contato">Iniciar diagnóstico <span aria-hidden="true">→</span></RouteLink>
        </div>
        <div>
          <strong className={styles.footerLabel}>Atendimento</strong>
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <a href={`tel:+556232751272`}>{company.phone}</a>
          <a href={company.whatsapp} target="_blank" rel="noreferrer">{company.mobile}</a>
        </div>
        <div>
          <strong className={styles.footerLabel}>Base</strong>
          <p>{company.address}</p>
          <p>{company.hours}</p>
        </div>
        <div>
          <strong className={styles.footerLabel}>Canais oficiais</strong>
          <a href={company.instagram} target="_blank" rel="noreferrer">Instagram</a>
          <a href={company.facebook} target="_blank" rel="noreferrer">Facebook</a>
          <a href={company.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
      <p className={styles.copyright}>Seccol Controle e Certificação · Desde 2009</p>
    </footer>
  )
}
