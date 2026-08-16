import { Reveal } from '../../components/motion/Reveal'
import { PageIntro } from '../../components/sections/PageIntro'
import styles from '../../components/sections/Sections.module.css'
import { company } from '../../content/siteContent'
import { ContactBrief } from './ContactBrief'
import contactStyles from './ContactPage.module.css'

export function ContactPage() {
  return (
    <main>
      <PageIntro title="Vamos entender o seu ambiente." description="Fale diretamente com a equipe Seccol para dúvidas, visitas e solicitações de orçamento." image="./media/generated/technical-team.webp" imageAlt="Profissionais alinhando uma atividade técnica" />
      <section className={`${styles.section} ${contactStyles.contactSection}`}>
        <Reveal><h2>Escolha o canal mais conveniente.</h2></Reveal>
        <div className={contactStyles.contactGrid}>
          <Reveal><a className={contactStyles.primary} href={company.whatsapp} target="_blank" rel="noreferrer"><strong>WhatsApp</strong><span>{company.mobile}</span></a></Reveal>
          <Reveal index={1}><a href={`mailto:${company.email}`}><strong>E-mail</strong><span>{company.email}</span></a></Reveal>
          <Reveal index={2}><a href="tel:+556232751272"><strong>Telefone</strong><span>{company.phone}</span></a></Reveal>
          <Reveal index={3}><div><strong>Atendimento</strong><span>{company.hours}</span></div></Reveal>
        </div>
        <Reveal><div className={contactStyles.address}><h3>Endereço</h3><p>{company.address}</p></div></Reveal>
      </section>
      <ContactBrief />
    </main>
  )
}
