import { Reveal } from '../motion/Reveal'
import styles from './Sections.module.css'

type PageIntroProps = {
  title: string
  description: string
  image: string
  imageAlt: string
}

export function PageIntro({ title, description, image, imageAlt }: PageIntroProps) {
  return (
    <section className={styles.pageIntro}>
      <div className={styles.pageIntroCopy}>
        <Reveal><h1>{title}</h1></Reveal>
        <Reveal index={1}><p>{description}</p></Reveal>
      </div>
      <Reveal className={styles.pageIntroMedia} variant="fade">
        <img src={image} width="1536" height="1024" alt={imageAlt} fetchPriority="high" />
      </Reveal>
    </section>
  )
}
