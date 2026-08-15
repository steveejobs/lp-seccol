import { Reveal } from '../../components/motion/Reveal'
import { Accordion } from '../../components/sections/Accordion'
import { ActionSection } from '../../components/sections/ActionSection'
import { PageIntro } from '../../components/sections/PageIntro'
import styles from '../../components/sections/Sections.module.css'
import { faqs } from '../../content/siteContent'

export function FaqPage() {
  return (
    <main>
      <PageIntro title="Respostas diretas para decisões técnicas." description="Informações institucionais, escopo de atuação, serviços e formas de iniciar uma conversa com a Seccol." image="./media/generated/instrument-calibration.webp" imageAlt="Instrumentação preparada para medição técnica" />
      <section className={styles.section}>
        <Reveal><h2>Dúvidas frequentes.</h2></Reveal>
        <Reveal index={1}><Accordion items={faqs} /></Reveal>
      </section>
      <ActionSection title="Ainda tem uma dúvida específica?" />
    </main>
  )
}
