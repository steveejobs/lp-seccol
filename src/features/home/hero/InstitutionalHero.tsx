import { RouteLink } from '../../../app/router'
import { EvidenceStrip } from './EvidenceStrip'
import { heroContent } from './heroContent'
import styles from './InstitutionalHero.module.css'

export function InstitutionalHero() {
  return (
    <section id="inicio" className={styles.hero} data-hero-root aria-labelledby="hero-title">
      <div className={styles.stage}>
        <div className={styles.copy}>
          <div className={styles.intro}>
            <h1 id="hero-title" className={styles.title} data-hero-motion>
              {heroContent.title}
            </h1>
          </div>

          <div className={styles.decision}>
            <p className={styles.description}>{heroContent.description}</p>
            <div className={styles.actions}>
              <RouteLink
                className={styles.primaryAction}
                data-primary-cta
                to={heroContent.primaryAction.href}
              >
                {heroContent.primaryAction.label}
                <svg aria-hidden="true" viewBox="0 0 20 20" width="20" height="20">
                  <path
                    d="M4 10h11M11 6l4 4-4 4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </RouteLink>
              <a className={styles.secondaryAction} href={heroContent.secondaryAction.href}>
                {heroContent.secondaryAction.label}
              </a>
            </div>
          </div>
        </div>

        <figure className={styles.media} data-hero-motion>
          <img
            className={styles.mediaImage}
            data-hero-image
            src="./media/generated/hero-technical.webp"
            width="1536"
            height="1024"
            alt="Mãos realizando medição técnica em equipamento de laboratório"
            fetchPriority="high"
          />
        </figure>
      </div>

      <EvidenceStrip />
    </section>
  )
}
