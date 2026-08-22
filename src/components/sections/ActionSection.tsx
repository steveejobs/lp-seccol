import { RouteLink } from '../../app/router'
import { company } from '../../content/siteContent'
import { Reveal } from '../motion/Reveal'
import styles from './Sections.module.css'

type ActionSectionProps = {
  title?: string
  description?: string
}

export function ActionSection({ title = 'Leve precisão técnica para o seu ambiente.', description = 'Você não precisa definir o ensaio ou o serviço sozinho. Conte o cenário e a equipe começa pela necessidade real.' }: ActionSectionProps) {
  return (
    <section className={styles.actionSection}>
      <div className={styles.actionCopy}>
        <Reveal><h2>{title}</h2></Reveal>
        <Reveal as="p" index={1}>{description}</Reveal>
      </div>
      <Reveal className={styles.actionChoices} index={2}>
        <RouteLink className={styles.actionPrimary} to="/contato">Iniciar diagnóstico <span aria-hidden="true">→</span></RouteLink>
        <a className={styles.actionSecondary} href={company.whatsapp} target="_blank" rel="noreferrer">Falar pelo WhatsApp</a>
      </Reveal>
    </section>
  )
}
