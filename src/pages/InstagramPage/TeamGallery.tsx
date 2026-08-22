import { useEffect, useRef, useState } from 'react'

import { Reveal } from '../../components/motion/Reveal'
import styles from './InstagramPage.module.css'

type GalleryImage = {
  src: string
  width: number
  height: number
  alt: string
}

const galleryImages: readonly GalleryImage[] = [
  { src: './galeria-optimized/04086d26-56ad-4387-83ec-b3f5db02ac3f.webp', width: 960, height: 1280, alt: 'Equipe Seccol reunida durante encontro técnico' },
  { src: './galeria-optimized/436e7106-af5a-4d84-be5c-a8a8a4455d57.webp', width: 960, height: 1280, alt: 'Representantes da Seccol com participante de evento técnico' },
  { src: './galeria-optimized/5bff4ee8-97be-4a9b-b776-cd20cf5e4ca5.webp', width: 1200, height: 1600, alt: 'Profissionais reunidos em evento do setor de controle de contaminação' },
  { src: './galeria-optimized/6b699671-3541-4109-9f71-198f92c86995.webp', width: 1200, height: 1600, alt: 'Encontro entre profissionais durante programação técnica' },
  { src: './galeria-optimized/a4e94f7e-54f1-431e-bb2c-d62bbbc84602.webp', width: 1200, height: 1600, alt: 'Profissionais em congresso do setor de ambientes controlados' },
  { src: './galeria-optimized/b24c1dc9-9df2-4aec-8f5d-021716aeea3a.webp', width: 1200, height: 1600, alt: 'Equipe Seccol recebendo profissionais em seu espaço de evento' },
  { src: './galeria-optimized/bc54647e-5a5d-4750-b573-b9710b37242c.webp', width: 1200, height: 1600, alt: 'Representante da Seccol em encontro profissional' },
  { src: './galeria-optimized/c7e1d35d-2507-404e-bb67-3d2252edfe7e.webp', width: 1200, height: 1600, alt: 'Conexões profissionais durante evento técnico' },
  { src: './galeria-optimized/c8f31b1c-8382-4fcd-ac7e-5567f12c7764.webp', width: 1080, height: 810, alt: 'Equipe reunida na sede da Seccol' },
  { src: './galeria-optimized/d9217e81-b6a3-4dbe-afa1-b25e169faa05.webp', width: 960, height: 1280, alt: 'Equipe Seccol e visitante durante encontro técnico' },
  { src: './galeria-optimized/seccolcertificacao_1780521683_3911621479329285711_41283813402.webp', width: 1080, height: 1440, alt: 'Equipe em frente ao estande do Grupo Seccol' },
  { src: './galeria-optimized/seccolcertificacao_1780521683_3911621488398936331_41283813402.webp', width: 1080, height: 1440, alt: 'Profissionais reunidos no estande do Grupo Seccol' },
  { src: './galeria-optimized/seccolcertificacao_1783021287_3932588926392002685_41283813402.webp', width: 1080, height: 1440, alt: 'Equipe Seccol no Congresso Consulfarma 2026' },
  { src: './galeria-optimized/seccolcertificacao_1783021287_3932588927180453147_41283813402.webp', width: 1080, height: 1440, alt: 'Conversa profissional no Congresso Consulfarma 2026' },
  { src: './galeria-optimized/snapinsta-1787345862668.webp', width: 1200, height: 1600, alt: 'Equipe e convidados reunidos em estande do Grupo Seccol' },
]

function randomizeImages(images: readonly GalleryImage[]) {
  const result = [...images]
  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[result[index], result[randomIndex]] = [result[randomIndex], result[index]]
  }
  return result
}

export function TeamGallery() {
  const [images] = useState(() => randomizeImages(galleryImages))
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const activeImage = activeIndex === null ? null : images[activeIndex]

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (activeIndex === null && dialog.open) dialog.close()
    if (activeIndex !== null && !dialog.open) dialog.showModal()
  }, [activeIndex])

  const showPrevious = () => {
    setActiveIndex((current) => current === null ? 0 : (current - 1 + images.length) % images.length)
  }

  const showNext = () => {
    setActiveIndex((current) => current === null ? 0 : (current + 1) % images.length)
  }

  return (
    <section className={styles.gallerySection} aria-labelledby="gallery-title">
      <Reveal className={styles.galleryHeader}>
        <span>Seccol em movimento</span>
        <h2 id="gallery-title">A técnica aproxima. As pessoas fazem acontecer.</h2>
        <p>Encontros, aprendizado e relações que mantêm nosso trabalho em movimento.</p>
      </Reveal>

      <Reveal variant="fade" className={styles.galleryGrid}>
        {images.map((image, index) => (
          <button
            className={styles.galleryItem}
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Abrir foto ${index + 1} de ${images.length}: ${image.alt}`}
          >
            <img
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image.alt}
              loading="lazy"
              decoding="async"
            />
          </button>
        ))}
      </Reveal>

      <dialog
        className={styles.lightbox}
        ref={dialogRef}
        aria-label="Galeria de fotos da Seccol"
        onCancel={(event) => {
          event.preventDefault()
          setActiveIndex(null)
        }}
        onClose={() => setActiveIndex(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setActiveIndex(null)
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') showPrevious()
          if (event.key === 'ArrowRight') showNext()
        }}
      >
        {activeImage && (
          <div className={styles.lightboxContent}>
            <button className={styles.lightboxClose} type="button" onClick={() => setActiveIndex(null)} aria-label="Fechar galeria">×</button>
            <button className={`${styles.lightboxControl} ${styles.lightboxPrevious}`} type="button" onClick={showPrevious} aria-label="Foto anterior">←</button>
            <img src={activeImage.src} width={activeImage.width} height={activeImage.height} alt={activeImage.alt} />
            <button className={`${styles.lightboxControl} ${styles.lightboxNext}`} type="button" onClick={showNext} aria-label="Próxima foto">→</button>
            <p><span>{String((activeIndex ?? 0) + 1).padStart(2, '0')}</span> / {String(images.length).padStart(2, '0')}</p>
          </div>
        )}
      </dialog>
    </section>
  )
}
