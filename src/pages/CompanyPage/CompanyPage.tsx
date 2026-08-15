import { Reveal } from '../../components/motion/Reveal'
import { ActionSection } from '../../components/sections/ActionSection'
import { PageIntro } from '../../components/sections/PageIntro'
import styles from '../../components/sections/Sections.module.css'
import { services } from '../../content/siteContent'

export function CompanyPage() {
  return (
    <main>
      <PageIntro title="Engenharia aplicada ao controle ambiental." description="Fundada em 2009, a Seccol atua em todo o país com manutenção, reforma, venda e certificação em equipamentos e áreas limpas." image="./media/generated/technical-team.webp" imageAlt="Profissionais preparando uma inspeção técnica" />
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Reveal><h2>Especialização que reduz incertezas.</h2></Reveal>
          <Reveal index={1}><div className={styles.prose}><p>O trabalho da Seccol é orientado à prevenção, à continuidade dos processos e à definição de prazos para materiais sobressalentes, incluindo filtros absolutos HEPA e motores elétricos.</p><p>A empresa publica registros no CREA, na SBCC e na Vigilância Sanitária e Ambiental da Secretaria Municipal de Saúde de Goiânia.</p></div></Reveal>
        </div>
      </section>
      <section className={`${styles.section} ${styles.dark}`}>
        <div className={styles.sectionHeader}><Reveal><h2>Serviços para ambientes e equipamentos críticos.</h2></Reveal></div>
        <div className={styles.itemGrid}>
          {services.map((service, index) => <Reveal className={styles.item} index={index} key={service.title}><h3>{service.title}</h3><p>{service.text}</p></Reveal>)}
        </div>
      </section>
      <ActionSection title="Apresente seu ambiente à equipe Seccol." />
    </main>
  )
}
