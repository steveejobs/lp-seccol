import { useEffect, type ReactNode } from 'react'

import { SiteFooter } from '../components/layout/SiteFooter'
import { SiteHeader } from '../components/layout/SiteHeader'
import { MotionController } from '../components/motion/MotionController'
import { PageTransition } from '../components/motion/PageTransition'
import { CleanRoomsPage } from '../pages/CleanRoomsPage/CleanRoomsPage'
import { CompanyPage } from '../pages/CompanyPage/CompanyPage'
import { ContactPage } from '../pages/ContactPage/ContactPage'
import { EquipmentTestsPage } from '../pages/EquipmentTestsPage/EquipmentTestsPage'
import { FaqPage } from '../pages/FaqPage/FaqPage'
import { HomePage } from '../pages/HomePage/HomePage'
import { InstagramPage } from '../pages/InstagramPage/InstagramPage'
import { InstrumentsPage } from '../pages/InstrumentsPage/InstrumentsPage'
import { RouterProvider } from './router'
import { useRouter } from './useRouter'

const pages: Record<string, { title: string; description: string; content: ReactNode; standalone?: boolean }> = {
  '/': { title: 'Seccol — Controle e Certificação', description: 'Controle, manutenção e certificação de equipamentos e áreas limpas para ambientes críticos em todo o Brasil.', content: <HomePage /> },
  '/a-seccol': { title: 'A Seccol — Controle e Certificação', description: 'Conheça a estrutura, a atuação nacional e a especialização técnica da Seccol desde 2009.', content: <CompanyPage /> },
  '/testes-em-equipamentos': { title: 'Testes em Equipamentos — Seccol', description: 'Testes, medições, manutenção e certificação para equipamentos utilizados em ambientes controlados.', content: <EquipmentTestsPage /> },
  '/areas-limpas': { title: 'Certificação em Áreas Limpas — Seccol', description: 'Testes e certificação de áreas limpas com verificação de filtragem, vazão, pressão e partículas.', content: <CleanRoomsPage /> },
  '/instrumentos': { title: 'Instrumentação Técnica — Seccol', description: 'Instrumentos para medir partículas, vazão, pressão, temperatura, umidade, iluminação, ruído e radiação UV-C.', content: <InstrumentsPage /> },
  '/faq': { title: 'Dúvidas Frequentes — Seccol', description: 'Respostas sobre a atuação, os serviços, os registros e as certificações realizadas pela Seccol.', content: <FaqPage /> },
  '/contato': { title: 'Solicite uma Avaliação Técnica — Seccol', description: 'Descreva seu ambiente ou equipamento e inicie uma conversa técnica com a equipe Seccol.', content: <ContactPage /> },
  '/instagram': { title: 'Links Oficiais — Seccol', description: 'Acesse os canais oficiais de atendimento, site, LinkedIn, Facebook e localização da Seccol.', content: <InstagramPage />, standalone: true },
}

function RoutedSite() {
  const { path } = useRouter()
  const page = pages[path] ?? pages['/']

  useEffect(() => {
    document.title = page.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', page.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', page.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', page.description)
    const canonicalUrl = `${window.location.origin}${window.location.pathname}`
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl)
  }, [page.description, page.title])

  return (
    <>
      {!page.standalone && <SiteHeader />}
      <MotionController routeKey={path}>
        <PageTransition key={path}>{page.content}</PageTransition>
      </MotionController>
      {!page.standalone && <SiteFooter />}
    </>
  )
}

export function App() {
  return <RouterProvider><RoutedSite /></RouterProvider>
}
