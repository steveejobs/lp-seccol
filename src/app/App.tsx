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

const pages: Record<string, { title: string; content: ReactNode; standalone?: boolean }> = {
  '/': { title: 'Seccol — Controle e Certificação', content: <HomePage /> },
  '/a-seccol': { title: 'A Seccol — Controle e Certificação', content: <CompanyPage /> },
  '/testes-em-equipamentos': { title: 'Testes em Equipamentos — Seccol', content: <EquipmentTestsPage /> },
  '/areas-limpas': { title: 'Áreas Limpas — Seccol', content: <CleanRoomsPage /> },
  '/instrumentos': { title: 'Instrumentos — Seccol', content: <InstrumentsPage /> },
  '/faq': { title: 'Dúvidas Frequentes — Seccol', content: <FaqPage /> },
  '/contato': { title: 'Contato — Seccol', content: <ContactPage /> },
  '/instagram': { title: 'Links da Seccol', content: <InstagramPage />, standalone: true },
}

function RoutedSite() {
  const { path } = useRouter()
  const page = pages[path] ?? pages['/']

  useEffect(() => {
    document.title = page.title
  }, [page.title])

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
