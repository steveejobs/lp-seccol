import { PointerTilt } from '../../components/interaction/PointerTilt'
import { Reveal } from '../../components/motion/Reveal'
import { Button } from '../../components/ui/Button'

import styles from './FoundationPage.module.css'

const foundations = [
  ['Fonte confiável', 'Conteúdo e imagens oficiais permanecem isolados e verificáveis.'],
  ['Tema central', 'Tokens semânticos controlam cor, espaço, tipografia, motion e ergonomia.'],
  ['Motion progressivo', 'Entrada, saída e ponteiro respeitam dispositivo e preferência do usuário.'],
] as const

export function FoundationPage() {
  return (
    <main className={styles.page}>
      <section className={`container ${styles.intro}`} aria-labelledby="foundation-title">
        <Reveal className={styles.eyebrow} repeat>
          Fundação do novo site
        </Reveal>

        <Reveal as="h1" className={styles.title} index={1} repeat>
          A arquitetura está pronta. A direção visual ainda será escolhida.
        </Reveal>

        <Reveal as="p" className={styles.copy} index={2} repeat>
          Esta tela é apenas uma bancada técnica para validar tema, componentes, responsividade e
          movimento. Ela não representa a futura página principal da Seccol.
        </Reveal>

        <Reveal className={styles.actions} index={3} repeat>
          <Button href="#foundations" variant="primary">
            Explorar fundações
          </Button>
          <Button href="#next-step" variant="secondary">
            Ver próxima etapa
          </Button>
        </Reveal>
      </section>

      <section
        id="foundations"
        className={`container ${styles.grid}`}
        aria-label="Fundações implementadas"
      >
        {foundations.map(([title, description], index) => (
          <Reveal key={title} index={index} repeat>
            <PointerTilt className={styles.card} intensity={3}>
              <article className={styles.cardInner}>
                <span className={styles.index}>0{index + 1}</span>
                <h2>{title}</h2>
                <p>{description}</p>
              </article>
            </PointerTilt>
          </Reveal>
        ))}
      </section>

      <p id="next-step" className={`container ${styles.nextStep}`}>
        Próxima etapa: explorar e escolher a direção de arte da primeira impressão.
      </p>
    </main>
  )
}
