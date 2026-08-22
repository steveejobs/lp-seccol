import { RouteLink } from '../../app/router'
import { Reveal } from '../motion/Reveal'
import styles from './Sections.module.css'

type PageIntroProps = {
  title: string
  description: string
  image: string
  imageAlt: string
  imageWidth?: number
  imageHeight?: number
  signals: readonly string[]
  actionLabel?: string
}

export function PageIntro({ title, description, image, imageAlt, imageWidth = 1536, imageHeight = 1024, signals, actionLabel = 'Iniciar diagnóstico técnico' }: PageIntroProps) {
  return (
    <section className={styles.pageIntro}>
      <div className={styles.pageIntroCopy}>
        <Reveal><h1>{title}</h1></Reveal>
        <Reveal index={1}><p>{description}</p></Reveal>
        <Reveal className={styles.pageIntroAction} index={2}>
          <RouteLink to="/contato">{actionLabel} <span aria-hidden="true">→</span></RouteLink>
        </Reveal>
        <Reveal className={styles.pageIntroSignals} index={3}>
          {signals.map((signal, index) => <span key={signal}><i aria-hidden="true">0{index + 1}</i>{signal}</span>)}
        </Reveal>
      </div>
      <Reveal className={styles.pageIntroMedia} variant="fade">
        <img src={image} width={imageWidth} height={imageHeight} alt={imageAlt} fetchPriority="high" />
      </Reveal>
    </section>
  )
}
