import { Reveal } from '../../components/motion/Reveal'
import { company } from '../../content/siteContent'
import { ContactBrief } from './ContactBrief'
import styles from './ContactPage.module.css'

export function ContactPage() {
  return (
    <main className={styles.contactPage}>
      <ContactBrief />
      <section className={styles.contactAlternatives} aria-labelledby="direct-contact-title">
        <div className={styles.alternativeIntro}>
          <Reveal as="h2" id="direct-contact-title">Prefere falar diretamente?</Reveal>
          <Reveal as="p" index={1}>Os canais oficiais continuam disponíveis. O diagnóstico acima é o caminho mais completo para a equipe receber o contexto organizado.</Reveal>
          <Reveal className={styles.serviceHours} index={2}><span>Atendimento</span><strong>{company.hours}</strong></Reveal>
        </div>
        <div className={styles.channelList}>
          <Reveal><a className={styles.channelPrimary} href={company.whatsapp} target="_blank" rel="noreferrer"><span>WhatsApp</span><strong>{company.mobile}</strong><i aria-hidden="true">↗</i></a></Reveal>
          <Reveal index={1}><a href={`mailto:${company.email}`}><span>E-mail</span><strong>{company.email}</strong><i aria-hidden="true">→</i></a></Reveal>
          <Reveal index={2}><a href="tel:+556232751272"><span>Telefone</span><strong>{company.phone}</strong><i aria-hidden="true">→</i></a></Reveal>
        </div>
      </section>
    </main>
  )
}
