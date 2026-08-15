import { useState } from 'react'

import styles from './Sections.module.css'

type AccordionItem = { question: string; answer: string }

export function Accordion({ items }: { items: readonly AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className={styles.accordion}>
      {items.map((item, index) => {
        const open = openIndex === index
        const panelId = `faq-panel-${index}`
        return (
          <div className={styles.accordionItem} key={item.question}>
            <h2>
              <button type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenIndex(open ? null : index)}>
                {item.question}<span aria-hidden="true">{open ? '−' : '+'}</span>
              </button>
            </h2>
            <div id={panelId} className={styles.accordionPanel} data-open={open ? 'true' : 'false'}>
              <p>{item.answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
