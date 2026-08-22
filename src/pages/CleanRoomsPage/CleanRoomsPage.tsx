import { Reveal } from '../../components/motion/Reveal'
import { ActionSection } from '../../components/sections/ActionSection'
import { PageIntro } from '../../components/sections/PageIntro'
import styles from '../../components/sections/Sections.module.css'
import { cleanRoomTests } from '../../content/siteContent'

export function CleanRoomsPage() {
  return (
    <main>
      <PageIntro title="Certificação em áreas limpas." description="Testes para ambientes controlados, com verificação de filtragem, vazão, pressão, partículas e condições das salas." image="./media/generated/cleanroom-certification.webp" imageAlt="Técnico verificando um módulo de filtragem em área limpa" signals={['Integridade HEPA (PAO)', 'Vazão e pressão', 'Certificado e relatório']} actionLabel="Descrever minha área limpa" />
      <section className={styles.mediaSection}>
        <div>
          <Reveal><h2>Certificado e relatório técnico ao final do trabalho.</h2></Reveal>
          <Reveal index={1}><p>Os clientes recebem certificado com as descrições das solicitações das normas exigidas pela ANVISA e SBCC, além de relatório detalhado dos testes, ajustes e recomendações técnicas.</p></Reveal>
        </div>
        <Reveal variant="media"><img src="./media/generated/hero-technical.webp" width="1536" height="1024" alt="Execução de medição técnica em equipamento controlado" loading="lazy" /></Reveal>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionHeader}><Reveal><h2>Testes em áreas limpas.</h2></Reveal><Reveal index={1}><p>O conjunto publicado observa integridade dos filtros, comportamento do ar e condições ambientais entre salas.</p></Reveal></div>
        <Reveal><ul className={styles.plainList}>{cleanRoomTests.map((test) => <li key={test}>{test}</li>)}</ul></Reveal>
      </section>
      <ActionSection title="Solicite uma avaliação para sua área limpa." description="Conte a situação do ambiente e o que está em jogo agora. A equipe recebe o contexto antes do primeiro contato." />
    </main>
  )
}
