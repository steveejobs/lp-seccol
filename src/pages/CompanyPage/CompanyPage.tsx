import { Reveal } from '../../components/motion/Reveal'
import { ActionSection } from '../../components/sections/ActionSection'
import { PageIntro } from '../../components/sections/PageIntro'
import styles from '../../components/sections/Sections.module.css'
import { services } from '../../content/siteContent'

export function CompanyPage() {
  return (
    <main>
      <PageIntro title="Engenharia aplicada ao controle ambiental." description="Fundada em 2009, a Seccol atua em todo o país com manutenção, reforma, venda e certificação em equipamentos e áreas limpas." image="./galeria-optimized/04086d26-56ad-4387-83ec-b3f5db02ac3f.webp" imageAlt="Equipe Seccol reunida durante encontro técnico" imageWidth={960} imageHeight={1280} signals={['Desde 2009', 'Atuação em todo o país', 'Prevenção e continuidade']} actionLabel="Apresentar meu ambiente" />
      <section className={styles.factBand} aria-label="Evidências institucionais">
        <Reveal><strong>CREA</strong><span>Registro publicado</span></Reveal>
        <Reveal index={1}><strong>SBCC</strong><span>Registro publicado</span></Reveal>
        <Reveal index={2}><strong>Vigilância Sanitária</strong><span>Registro municipal publicado</span></Reveal>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Reveal><h2>Especialização que reduz incertezas.</h2></Reveal>
          <Reveal index={1}><div className={styles.prose}><p>O trabalho da Seccol é orientado à prevenção, à continuidade dos processos e à definição de prazos para materiais sobressalentes, incluindo filtros absolutos HEPA e motores elétricos.</p><p>A empresa publica registros no CREA, na SBCC e na Vigilância Sanitária e Ambiental da Secretaria Municipal de Saúde de Goiânia.</p></div></Reveal>
        </div>
      </section>
      <section className={`${styles.section} ${styles.dark}`}>
        <div className={styles.sectionHeader}><Reveal><h2>Serviços para ambientes e equipamentos críticos.</h2></Reveal></div>
        <div className={styles.itemGrid}>
          {services.map((service, index) => <Reveal className={styles.item} index={index} variant="card" key={service.title}><h3>{service.title}</h3><p>{service.text}</p></Reveal>)}
        </div>
      </section>
      <ActionSection title="Apresente seu ambiente à equipe Seccol." description="A conversa começa pelo processo, pelo equipamento e pelo risco que você precisa compreender." />
    </main>
  )
}
