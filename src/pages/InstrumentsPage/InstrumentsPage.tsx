import { Reveal } from '../../components/motion/Reveal'
import { ActionSection } from '../../components/sections/ActionSection'
import { PageIntro } from '../../components/sections/PageIntro'
import styles from '../../components/sections/Sections.module.css'
import { instruments } from '../../content/siteContent'

export function InstrumentsPage() {
  return (
    <main>
      <PageIntro title="Instrumentação para medir o que não pode ser presumido." description="Equipamentos publicados pela Seccol para avaliação de partículas, fluxo, pressão, luminosidade, ruído, umidade e radiação UVC." image="./media/generated/instrument-calibration.webp" imageAlt="Instrumentos utilizados em medições de controle ambiental" signals={['12 instrumentos publicados', 'Calibração anual', 'Grandezas ambientais críticas']} actionLabel="Explicar o que preciso medir" />
      <section className={styles.section}>
        <div className={styles.sectionHeader}><Reveal><h2>Equipamentos de medição e verificação.</h2></Reveal><Reveal index={1}><p>Os instrumentos sujeitos à calibração são descritos pela empresa como calibrados anualmente.</p></Reveal></div>
        <div className={styles.itemGrid}>
          {instruments.map((instrument, index) => <Reveal className={styles.item} index={index} key={instrument.title}><h3>{instrument.title}</h3><p>{instrument.text}</p></Reveal>)}
        </div>
      </section>
      <ActionSection title="Defina a instrumentação necessária para o seu processo." description="Comece pela variável, pelo ambiente ou pelo desvio. A instrumentação vem depois da leitura correta do cenário." />
    </main>
  )
}
