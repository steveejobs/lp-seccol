import { type FormEvent, useState } from 'react'

import { Reveal } from '../../components/motion/Reveal'
import { company } from '../../content/siteContent'
import styles from './ContactPage.module.css'

const needs = [
  'Certificação de área limpa',
  'Testes em equipamentos',
  'Manutenção ou reforma',
  'Projeto para área limpa',
  'Projeto para centro cirúrgico',
  'Outro assunto',
] as const

export function ContactBrief() {
  const [name, setName] = useState('')
  const [need, setNeed] = useState('')
  const [location, setLocation] = useState('')
  const [details, setDetails] = useState('')

  const submitBrief = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const message = [
      'Olá, equipe Seccol. Gostaria de solicitar uma avaliação técnica.',
      `Nome: ${name}`,
      `Necessidade: ${need}`,
      `Cidade/UF: ${location}`,
      `Contexto: ${details}`,
    ].join('\n')
    const separator = company.whatsapp.includes('?') ? '&' : '?'
    window.open(`${company.whatsapp}${separator}text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className={styles.briefSection} aria-labelledby="brief-title">
      <div className={styles.briefIntro}>
        <Reveal className={styles.briefIndex}>Próximo passo</Reveal>
        <Reveal as="h2" id="brief-title">Comece com um briefing claro.</Reveal>
        <Reveal as="p" index={1}>Conte o essencial sobre seu ambiente ou equipamento. A mensagem será organizada e aberta no WhatsApp para você revisar antes de enviar.</Reveal>
        <Reveal className={styles.briefAssurance} index={2}>
          <span aria-hidden="true">✓</span>
          <p>Nenhum dado é armazenado neste site.</p>
        </Reveal>
      </div>

      <Reveal className={styles.formFrame} variant="fade">
        <form className={styles.briefForm} onSubmit={submitBrief}>
          <div className={styles.fieldRow}>
            <label><span>Seu nome</span><input name="name" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} required /></label>
            <label><span>Cidade e estado</span><input name="location" autoComplete="address-level2" placeholder="Goiânia, GO" value={location} onChange={(event) => setLocation(event.target.value)} required /></label>
          </div>
          <label><span>O que você precisa?</span><select name="need" value={need} onChange={(event) => setNeed(event.target.value)} required><option value="" disabled>Selecione uma opção</option>{needs.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label><span>Conte um pouco do contexto</span><textarea name="details" rows={5} placeholder="Tipo de ambiente ou equipamento, situação atual e objetivo do contato." value={details} onChange={(event) => setDetails(event.target.value)} required /></label>
          <div className={styles.formFooter}>
            <small>Não inclua dados pessoais sensíveis.</small>
            <button type="submit">Preparar mensagem <span aria-hidden="true">→</span></button>
          </div>
        </form>
      </Reveal>
    </section>
  )
}
