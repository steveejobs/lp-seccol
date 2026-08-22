import { Reveal } from '../../components/motion/Reveal'
import { ActionSection } from '../../components/sections/ActionSection'
import { PageIntro } from '../../components/sections/PageIntro'
import styles from '../../components/sections/Sections.module.css'
import { equipmentTests } from '../../content/siteContent'

export function EquipmentTestsPage() {
  return (
    <main>
      <PageIntro title="Testes técnicos em equipamentos." description="Medições, verificações, manutenção e certificação para equipamentos utilizados em ambientes controlados." image="./media/generated/hero-technical.webp" imageAlt="Medição técnica em cabine de segurança biológica" signals={['Fluxo e filtragem', 'Partículas e alarmes', 'Componentes eletromecânicos']} actionLabel="Descrever meu equipamento" />
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Reveal><h2>Uma leitura completa do funcionamento.</h2></Reveal>
          <Reveal index={1}><p>O escopo publicado combina ensaios de fluxo, filtragem, partículas, segurança, condições ambientais e componentes eletromecânicos.</p></Reveal>
        </div>
        <Reveal><ul className={styles.plainList}>{equipmentTests.map((test) => <li key={test}>{test}</li>)}</ul></Reveal>
      </section>
      <ActionSection title="Planeje os próximos testes do seu equipamento." description="Descreva o equipamento, o sinal percebido e o momento da operação para orientar a primeira conversa técnica." />
    </main>
  )
}
