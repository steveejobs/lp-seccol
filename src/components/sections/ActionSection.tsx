import { company } from '../../content/siteContent'
import { Reveal } from '../motion/Reveal'
import styles from './Sections.module.css'

type ActionSectionProps = {
  title?: string
}

export function ActionSection({ title = 'Leve precisão técnica para o seu ambiente.' }: ActionSectionProps) {
  return (
    <section className={styles.actionSection}>
      <Reveal><h2>{title}</h2></Reveal>
      <Reveal index={1}>
        <a href={company.whatsapp} target="_blank" rel="noreferrer">Solicitar orçamento <span aria-hidden="true">→</span></a>
      </Reveal>
    </section>
  )
}
