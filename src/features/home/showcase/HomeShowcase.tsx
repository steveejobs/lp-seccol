import { RouteLink } from '../../../app/router'
import { Reveal } from '../../../components/motion/Reveal'
import { ActionSection } from '../../../components/sections/ActionSection'
import { instruments, segments, services } from '../../../content/siteContent'

import styles from './HomeShowcase.module.css'

const protocol = [
  { number: '01', title: 'Avaliar', text: 'Condições do equipamento, do ambiente e do sistema de filtragem entram em uma leitura técnica integrada.' },
  { number: '02', title: 'Medir', text: 'Ensaios verificam fluxo de ar, partículas, pressão, integridade de filtros e demais parâmetros aplicáveis.' },
  { number: '03', title: 'Intervir', text: 'Manutenção, ajustes, reforma e substituição de componentes são definidos conforme a necessidade encontrada.' },
  { number: '04', title: 'Documentar', text: 'O trabalho é consolidado em certificado e relatório detalhado com testes, ajustes e recomendações técnicas.' },
] as const

const evidence = [
  { value: '2009', label: 'início da atuação da Seccol' },
  { value: 'Brasil', label: 'serviços publicados em todo o país' },
  { value: 'HEPA / ULPA', label: 'integridade, pressão e vazamentos' },
] as const

export function HomeShowcase() {
  return (
    <div className={styles.home}>
      <section className={styles.capabilities} aria-labelledby="capabilities-title">
        <div className={styles.sectionLead}>
          <Reveal className={styles.sectionNumber} aria-hidden="true">01</Reveal>
          <Reveal as="h2" id="capabilities-title">O desvio precisa aparecer antes da fiscalização.</Reveal>
          <Reveal as="p" index={1}>Problemas de fluxo, pressão, filtragem e manutenção nem sempre são visíveis — mas podem expor uma operação a não conformidades e paralisações. A Seccol mede, intervém e documenta para que sua empresa possa agir antes.</Reveal>
        </div>

        <div className={styles.capabilityGrid}>
          {services.slice(0, 6).map((service, index) => (
            <Reveal className={styles.capabilityCard} index={index} variant="card" key={service.title}>
              <span>0{index + 1}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className={styles.inlineAction}>
          <RouteLink to="/testes-em-equipamentos">Ver testes e serviços <span aria-hidden="true">→</span></RouteLink>
        </Reveal>
      </section>

      <section className={styles.protocol} aria-labelledby="protocol-title">
        <div className={styles.protocolIntro}>
          <Reveal className={styles.sectionNumber} aria-hidden="true">02</Reveal>
          <Reveal as="h2" id="protocol-title">Do risco invisível ao registro técnico.</Reveal>
          <Reveal as="p" index={1}>Uma sequência clara transforma variáveis ambientais em decisões verificáveis.</Reveal>
        </div>
        <div className={styles.protocolGrid}>
          {protocol.map((step, index) => (
            <Reveal className={styles.protocolStep} index={index} variant="card" key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={styles.measurement} aria-labelledby="measurement-title">
        <div className={styles.measurementMedia}>
          <Reveal variant="media" className={styles.primaryMedia}>
            <img src="./media/generated/instrument-calibration.webp" width="1536" height="1024" alt="Instrumentos preparados para medição técnica" loading="lazy" />
          </Reveal>
          <Reveal variant="media" className={styles.secondaryMedia} index={1}>
            <img src="./media/generated/cleanroom-certification.webp" width="1536" height="1024" alt="Medição sendo realizada em uma área limpa" loading="lazy" />
          </Reveal>
          <Reveal className={styles.mediaNote} index={2}>
            <strong>Calibração anual</strong>
            <span>Instrumentação publicada com controle periódico.</span>
          </Reveal>
        </div>

        <div className={styles.measurementCopy}>
          <Reveal className={styles.sectionNumber} aria-hidden="true">03</Reveal>
          <Reveal as="h2" id="measurement-title">Precisão é instrumento, método e leitura.</Reveal>
          <Reveal as="p" index={1}>Cada variável exige uma ferramenta adequada. A Seccol publica instrumentação para partículas, vazão, pressão, temperatura, umidade, iluminação, ruído e radiação UV-C.</Reveal>
          <div className={styles.instrumentList}>
            {instruments.slice(0, 5).map((instrument, index) => (
              <Reveal className={styles.instrumentItem} index={index} variant="card" key={instrument.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div><h3>{instrument.title}</h3><p>{instrument.text}</p></div>
              </Reveal>
            ))}
          </div>
          <Reveal className={styles.inlineAction}>
            <RouteLink to="/instrumentos">Conhecer a instrumentação <span aria-hidden="true">→</span></RouteLink>
          </Reveal>
        </div>
      </section>

      <section className={styles.deliverables} aria-labelledby="deliverables-title">
        <div className={styles.deliverableHeadline}>
          <Reveal className={styles.sectionNumber} aria-hidden="true">04</Reveal>
          <Reveal as="h2" id="deliverables-title">O serviço termina com evidência.</Reveal>
          <Reveal as="p" index={1}>Ao final do trabalho, os clientes recebem documentação com o que foi verificado, ajustado e recomendado.</Reveal>
        </div>
        <div className={styles.documentStack}>
          <Reveal className={styles.certificateCard} variant="card">
            <span>Documento 01</span>
            <strong>Certificado</strong>
            <p>Descrições das solicitações das normas exigidas pela ANVISA e SBCC.</p>
            <i aria-hidden="true">SECCOL</i>
          </Reveal>
          <Reveal className={styles.reportCard} index={1} variant="card">
            <span>Documento 02</span>
            <strong>Relatório técnico</strong>
            <p>Registro detalhado de testes, ajustes e recomendações técnicas.</p>
            <div aria-hidden="true"><b /><b /><b /><b /></div>
          </Reveal>
        </div>
      </section>

      <section className={styles.operations} aria-labelledby="operations-title">
        <div className={styles.operationsHeader}>
          <Reveal className={styles.sectionNumber} aria-hidden="true">05</Reveal>
          <Reveal as="h2" id="operations-title">Controle ambiental para operações que não podem improvisar.</Reveal>
          <Reveal as="p" index={1}>Atuação publicada em ambientes de saúde, pesquisa, indústria, produção e ensino.</Reveal>
        </div>
        <Reveal>
          <ul className={styles.segmentGrid}>
            {segments.map((segment, index) => <li key={segment}><span>{String(index + 1).padStart(2, '0')}</span>{segment}</li>)}
          </ul>
        </Reveal>
      </section>

      <section className={styles.structure} aria-labelledby="structure-title">
        <Reveal variant="media" className={styles.structureMedia}>
          <img src="./media/generated/technical-team.webp" width="1536" height="1024" alt="Profissionais preparando uma inspeção técnica" loading="lazy" />
          <span>Imagem de direção visual</span>
        </Reveal>
        <div className={styles.structureCopy}>
          <Reveal className={styles.sectionNumber} aria-hidden="true">06</Reveal>
          <Reveal as="h2" id="structure-title">Estrutura preparada para diferentes escalas.</Reveal>
          <Reveal as="p" index={1}>Frota para equipamentos pesados, pick-ups para manutenção técnica, instrumentação e estrutura administrativa em Goiânia.</Reveal>
          <div className={styles.evidenceGrid}>
            {evidence.map((item, index) => (
              <Reveal className={styles.evidenceItem} index={index} variant="card" key={item.value}>
                <strong>{item.value}</strong><span>{item.label}</span>
              </Reveal>
            ))}
          </div>
          <Reveal className={styles.inlineAction}>
            <RouteLink to="/a-seccol">Conhecer a Seccol <span aria-hidden="true">→</span></RouteLink>
          </Reveal>
        </div>
      </section>

      <ActionSection title="Seu ambiente crítico merece uma decisão precisa." />
    </div>
  )
}
