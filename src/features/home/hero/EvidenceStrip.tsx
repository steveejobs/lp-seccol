import { heroContent } from './heroContent'
import styles from './InstitutionalHero.module.css'

export function EvidenceStrip() {
  return (
    <div id="evidencias" className={styles.evidenceStrip} aria-label="Evidências institucionais">
      {heroContent.evidence.map((item) => (
        <div className={styles.evidenceItem} key={item.value}>
          <strong>{item.value}</strong>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  )
}
