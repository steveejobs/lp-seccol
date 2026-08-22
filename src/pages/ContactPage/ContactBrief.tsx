import { type FormEvent, useRef, useState } from 'react'

import { Reveal } from '../../components/motion/Reveal'
import { company } from '../../content/siteContent'
import styles from './ContactPage.module.css'

const needOptions = [
  { value: 'Certificação de área limpa', title: 'Certificar uma área limpa', note: 'Verificar o ambiente e reunir evidências técnicas.' },
  { value: 'Testes em equipamentos', title: 'Testar um equipamento', note: 'Entender o desempenho antes que um desvio avance.' },
  { value: 'Manutenção ou reforma', title: 'Corrigir ou adequar', note: 'Planejar manutenção, reforma ou uma intervenção técnica.' },
  { value: 'Projeto para área limpa', title: 'Projetar uma área limpa', note: 'Estruturar um novo ambiente controlado.' },
  { value: 'Projeto para centro cirúrgico', title: 'Planejar um centro cirúrgico', note: 'Avaliar ou projetar esse ambiente crítico.' },
  { value: 'Outro assunto', title: 'Trazer outro cenário', note: 'Contar uma situação que ainda não cabe em uma categoria.' },
] as const

const momentOptions = [
  'Fiscalização ou auditoria próxima',
  'Operação parada ou limitada',
  'Desvio já identificado',
  'Planejamento preventivo',
  'Ainda estou entendendo o cenário',
] as const

const journeySteps = [
  { label: 'O sinal', title: 'O que trouxe você até aqui?' },
  { label: 'O contexto', title: 'O que está em jogo agora?' },
  { label: 'O contato', title: 'Como a equipe encontra você?' },
  { label: 'A leitura', title: 'Confira a leitura do seu cenário.' },
] as const

type Submission =
  | { status: 'idle' | 'submitting' }
  | { status: 'success'; protocol: string }
  | { status: 'error' }

export function ContactBrief() {
  const formStartedAt = useRef(Date.now())
  const stepPanel = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [business, setBusiness] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [need, setNeed] = useState('')
  const [moment, setMoment] = useState('')
  const [location, setLocation] = useState('')
  const [details, setDetails] = useState('')
  const [consent, setConsent] = useState(false)
  const [website, setWebsite] = useState('')
  const [error, setError] = useState('')
  const [submission, setSubmission] = useState<Submission>({ status: 'idle' })

  const selectedNeed = needOptions.find((option) => option.value === need)
  const diagnosticDetails = [`Momento informado: ${moment}.`, details.trim()].join('\n')
  const message = [
    'Olá, equipe Seccol. Gostaria de solicitar uma avaliação técnica.',
    `Nome: ${name}`,
    business ? `Empresa: ${business}` : '',
    `Telefone: ${phone}`,
    email ? `E-mail: ${email}` : '',
    `Necessidade: ${need}`,
    `Momento: ${moment}`,
    `Cidade/UF: ${location}`,
    `Contexto: ${details}`,
  ].filter(Boolean).join('\n')
  const separator = company.whatsapp.includes('?') ? '&' : '?'
  const whatsappUrl = `${company.whatsapp}${separator}text=${encodeURIComponent(message)}`

  const moveToStep = (nextStep: number) => {
    setError('')
    setStep(nextStep)
    window.requestAnimationFrame(() => stepPanel.current?.focus())
  }

  const validateStep = () => {
    if (step === 0 && !need) return 'Escolha o cenário que mais se aproxima do que você precisa.'
    if (step === 1 && !moment) return 'Conte em que momento sua operação está.'
    if (step === 1 && details.trim().length < 10) return 'Descreva o contexto em pelo menos 10 caracteres.'
    if (step === 2 && name.trim().length < 2) return 'Informe seu nome para a equipe saber com quem falar.'
    const phoneDigits = phone.replace(/\D/g, '')
    if (step === 2 && (phoneDigits.length < 8 || phoneDigits.length > 15)) return 'Informe um telefone ou WhatsApp válido.'
    if (step === 2 && email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Confira o endereço de e-mail informado.'
    if (step === 2 && location.trim().length < 2) return 'Informe a cidade e o estado do atendimento.'
    if (step === 3 && !consent) return 'Autorize o contato para enviar o diagnóstico à equipe.'
    return ''
  }

  const continueJourney = () => {
    const validationError = validateStep()
    if (validationError) {
      setError(validationError)
      return
    }
    moveToStep(Math.min(step + 1, journeySteps.length - 1))
  }

  const submitBrief = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (step < journeySteps.length - 1) {
      continueJourney()
      return
    }
    if (submission.status === 'submitting') return
    const validationError = validateStep()
    if (validationError) {
      setError(validationError)
      return
    }
    setError('')
    setSubmission({ status: 'submitting' })
    const parameters = new URLSearchParams(window.location.search)
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          company: business,
          phone,
          email,
          need,
          location,
          details: diagnosticDetails,
          consent,
          website,
          formStartedAt: formStartedAt.current,
          source: {
            page: window.location.href,
            referrer: document.referrer,
            utm: {
              source: parameters.get('utm_source') || '',
              medium: parameters.get('utm_medium') || '',
              campaign: parameters.get('utm_campaign') || '',
              term: parameters.get('utm_term') || '',
              content: parameters.get('utm_content') || '',
            },
          },
        }),
      })
      const result = await response.json() as { ok?: boolean; protocol?: string }
      if (!response.ok || !result.ok || !result.protocol) throw new Error('lead_not_created')
      setSubmission({ status: 'success', protocol: result.protocol })
    } catch {
      setSubmission({ status: 'error' })
    }
  }

  return (
    <section className={styles.briefSection} aria-labelledby="brief-title">
      <div className={styles.briefGlow} aria-hidden="true" />
      <div className={styles.journeyShell}>
        <aside className={styles.briefIntro}>
          <Reveal className={styles.briefIndex}>Diagnóstico inicial</Reveal>
          <Reveal as="h1" id="brief-title">Antes que um desvio avance, organize o que está acontecendo.</Reveal>
          <Reveal as="p" index={1}>Você não precisa conhecer o termo técnico. Comece pelo sinal percebido e entregue à equipe um contexto claro desde o primeiro contato.</Reveal>

          <Reveal className={styles.journeyMap} index={2}>
            <p className={styles.mapLabel}>Seu percurso</p>
            <ol>
              {journeySteps.map((item, index) => (
                <li key={item.label} data-state={submission.status === 'success' || index < step ? 'complete' : index === step ? 'current' : 'upcoming'}>
                  <button type="button" disabled={index > step || submission.status === 'success'} onClick={() => moveToStep(index)} aria-current={submission.status !== 'success' && index === step ? 'step' : undefined}>
                    <span>{submission.status === 'success' || index < step ? '✓' : String(index + 1).padStart(2, '0')}</span>
                    <strong>{item.label}</strong>
                  </button>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal className={styles.liveReading} index={3} aria-live="polite">
            <span>Leitura atual</span>
            <strong>{selectedNeed?.title || 'Seu cenário começa a ganhar forma aqui.'}</strong>
            <p>{moment || selectedNeed?.note || 'Escolha o primeiro sinal e a experiência se adapta ao seu contexto.'}</p>
          </Reveal>
        </aside>

        <Reveal className={styles.formFrame} variant="fade">
          <form className={styles.briefForm} onSubmit={submitBrief} aria-busy={submission.status === 'submitting'} noValidate>
            <label className={styles.honeypot} aria-hidden="true"><span>Website</span><input name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} /></label>

            {submission.status === 'success' ? (
              <div className={styles.successExperience} role="status">
                <span className={styles.successMark} aria-hidden="true">✓</span>
                <p className={styles.stepEyebrow}>Contexto entregue</p>
                <h2>Agora a equipe não recebe apenas um contato. Recebe a história por trás dele.</h2>
                <p>Seu diagnóstico inicial já está disponível no CRM da Seccol para triagem.</p>
                <div className={styles.protocolCard}>
                  <span>Protocolo de entrada</span>
                  <strong>{submission.protocol}</strong>
                </div>
                <a className={styles.whatsappAfter} href={whatsappUrl} target="_blank" rel="noreferrer">Acrescentar algo pelo WhatsApp <span aria-hidden="true">→</span></a>
              </div>
            ) : (
              <>
                <header className={styles.formHeader}>
                  <div className={styles.progressCopy}><span>Etapa {step + 1} de {journeySteps.length}</span><span>{journeySteps[step].label}</span></div>
                  <div className={styles.progressTrack} aria-hidden="true"><span style={{ transform: `scaleX(${(step + 1) / journeySteps.length})` }} /></div>
                </header>

                <div className={styles.stepPanel} ref={stepPanel} tabIndex={-1} key={step}>
                  <p className={styles.stepEyebrow}>{step === 0 ? 'Não precisa saber o nome técnico exato' : step === 1 ? 'A urgência muda a conversa' : step === 2 ? 'Uma pessoa, não um número' : 'Tudo organizado antes do envio'}</p>
                  <h2>{journeySteps[step].title}</h2>
                  {step === 0 && (
                    <fieldset className={styles.optionGrid}>
                      <legend className={styles.srOnly}>Selecione sua necessidade</legend>
                      {needOptions.map((option, index) => (
                        <label className={`${styles.optionCard} ${need === option.value ? styles.optionSelected : ''}`} key={option.value}>
                          <input type="radio" name="need" value={option.value} checked={need === option.value} onChange={() => { setNeed(option.value); setError('') }} />
                          <span className={styles.optionNumber}>{String(index + 1).padStart(2, '0')}</span>
                          <span className={styles.optionCopy}><strong>{option.title}</strong><small>{option.note}</small></span>
                          <span className={styles.optionCheck} aria-hidden="true">✓</span>
                        </label>
                      ))}
                    </fieldset>
                  )}

                  {step === 1 && (
                    <div className={styles.contextStep}>
                      <fieldset className={styles.momentFieldset}>
                        <legend>Qual frase descreve melhor o momento?</legend>
                        <div className={styles.momentOptions}>
                          {momentOptions.map((option) => (
                            <label className={moment === option ? styles.momentSelected : ''} key={option}>
                              <input type="radio" name="moment" value={option} checked={moment === option} onChange={() => { setMoment(option); setError('') }} />
                              <span>{option}</span>
                            </label>
                          ))}
                        </div>
                      </fieldset>
                      <label className={styles.storyField}><span>Conte o que você já percebeu</span><textarea name="details" rows={5} minLength={10} maxLength={2800} placeholder="O que aconteceu, qual ambiente ou equipamento está envolvido e o que você precisa decidir agora?" value={details} onChange={(event) => { setDetails(event.target.value); setError('') }} required /><small>{details.length}/2800 · Não inclua dados pessoais sensíveis.</small></label>
                    </div>
                  )}

                  {step === 2 && (
                    <div className={styles.identityStep}>
                      <div className={styles.fieldRow}>
                        <label><span>Como podemos chamar você?</span><input name="name" autoComplete="name" value={name} onChange={(event) => { setName(event.target.value); setError('') }} required /></label>
                        <label><span>Empresa <small>(se houver)</small></span><input name="company" autoComplete="organization" value={business} onChange={(event) => setBusiness(event.target.value)} /></label>
                      </div>
                      <div className={styles.fieldRow}>
                        <label><span>Telefone ou WhatsApp</span><input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="(62) 99999-9999" value={phone} onChange={(event) => { setPhone(event.target.value); setError('') }} required /></label>
                        <label><span>E-mail <small>(opcional)</small></span><input name="email" type="email" inputMode="email" autoComplete="email" value={email} onChange={(event) => { setEmail(event.target.value); setError('') }} /></label>
                      </div>
                      <label><span>Onde está a operação?</span><input name="location" autoComplete="address-level2" placeholder="Goiânia, GO" value={location} onChange={(event) => { setLocation(event.target.value); setError('') }} required /></label>
                    </div>
                  )}

                  {step === 3 && (
                    <div className={styles.reviewStep}>
                      <div className={styles.reviewSignal}><span>Necessidade percebida</span><strong>{selectedNeed?.title}</strong><p>{moment}</p></div>
                      <dl className={styles.reviewDetails}>
                        <div><dt>Contato</dt><dd>{name}</dd></div>
                        <div><dt>Empresa</dt><dd>{business || 'Não informada'}</dd></div>
                        <div><dt>Canal</dt><dd>{phone}{email ? ` · ${email}` : ''}</dd></div>
                        <div><dt>Local</dt><dd>{location}</dd></div>
                      </dl>
                      <blockquote>“{details}”</blockquote>
                      <label className={styles.consentField}><input name="consent" type="checkbox" checked={consent} onChange={(event) => { setConsent(event.target.checked); setError('') }} required /><span>Autorizo a Seccol a usar estes dados exclusivamente para entrar em contato sobre esta solicitação.</span></label>
                    </div>
                  )}
                </div>

                <div className={styles.feedbackRegion} aria-live="polite">
                  {error && <p className={styles.validationError} role="alert">{error}</p>}
                  {submission.status === 'error' && <div className={`${styles.formNotice} ${styles.formError}`} role="alert"><strong>O CRM não respondeu desta vez.</strong><span>Seu contexto continua preenchido. Você pode tentar novamente ou levá-lo pronto ao WhatsApp.</span><a href={whatsappUrl} target="_blank" rel="noreferrer">Continuar pelo WhatsApp →</a></div>}
                </div>

                <footer className={styles.formFooter}>
                  <button className={styles.backButton} type="button" onClick={() => moveToStep(step - 1)} disabled={step === 0 || submission.status === 'submitting'}><span aria-hidden="true">←</span> Voltar</button>
                  {step < journeySteps.length - 1 ? (
                    <button className={styles.continueButton} type="button" onClick={continueJourney}>Continuar <span aria-hidden="true">→</span></button>
                  ) : (
                    <button className={styles.continueButton} type="submit" disabled={submission.status === 'submitting'}>{submission.status === 'submitting' ? 'Entregando contexto…' : 'Enviar para a equipe'}{submission.status !== 'submitting' && <span aria-hidden="true">→</span>}</button>
                  )}
                </footer>
              </>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
