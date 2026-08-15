import { ActionSection } from '../../components/sections/ActionSection'
import { Reveal } from '../../components/motion/Reveal'
import sectionStyles from '../../components/sections/Sections.module.css'
import { services, segments } from '../../content/siteContent'
import { InstitutionalHero } from '../../features/home/hero/InstitutionalHero'

export function HomePage() {
  return (
    <main>
      <InstitutionalHero />

      <section className={sectionStyles.section}>
        <div className={sectionStyles.sectionHeader}>
          <Reveal><h2>Prevenção para manter processos em movimento.</h2></Reveal>
          <Reveal index={1}><p>A Seccol trabalha para evitar paradas prolongadas em processos de manipulação, fabricação e pesquisa, apoiando a prevenção e a definição de prazos para substituição de materiais.</p></Reveal>
        </div>
        <div className={sectionStyles.itemGrid}>
          {services.slice(0, 6).map((service, index) => (
            <Reveal className={sectionStyles.item} index={index} key={service.title}>
              <h3>{service.title}</h3><p>{service.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={`${sectionStyles.section} ${sectionStyles.dark}`}>
        <div className={sectionStyles.sectionHeader}>
          <Reveal><h2>Controle ambiental em diferentes operações.</h2></Reveal>
          <Reveal index={1}><p>Atuação publicada em ambientes de saúde, pesquisa, indústria, produção e ensino.</p></Reveal>
        </div>
        <Reveal>
          <ul className={sectionStyles.plainList}>
            {segments.map((segment) => <li key={segment}>{segment}</li>)}
          </ul>
        </Reveal>
      </section>

      <section className={sectionStyles.mediaSection}>
        <div>
          <Reveal><h2>Estrutura para atender diferentes escalas de serviço.</h2></Reveal>
          <Reveal index={1}><p>Frota para equipamentos pesados, pick-ups para manutenção técnica, instrumentação e estrutura administrativa em Goiânia.</p></Reveal>
        </div>
        <Reveal variant="fade"><img src="./media/generated/technical-team.webp" width="1536" height="1024" alt="Profissionais preparando uma inspeção técnica" loading="lazy" /></Reveal>
      </section>

      <ActionSection />
    </main>
  )
}
