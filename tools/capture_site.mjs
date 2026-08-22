import { existsSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'

import { chromium } from 'playwright-core'

const baseUrl = process.argv[2] ?? 'http://127.0.0.1:8000/dist/'
const output = resolve(process.argv[3] ?? 'artifacts/site')
const shouldCapture = process.argv.includes('--screenshots')
const edgeCandidates = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
]
const executablePath = edgeCandidates.find(existsSync)
if (!executablePath) throw new Error('Microsoft Edge não encontrado.')
if (shouldCapture) mkdirSync(output, { recursive: true })

const routes = [
  '/', '/a-seccol', '/testes-em-equipamentos', '/areas-limpas',
  '/instrumentos', '/faq', '/contato', '/instagram',
]
const viewports = [
  { name: 'desktop', width: 1366, height: 768 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'narrow', width: 360, height: 800 },
]
const screenshotRoutes = new Set(routes)
const violations = []
const browser = await chromium.launch({ executablePath, headless: true })

try {
  for (const viewport of viewports) {
    for (const route of routes) {
      const page = await browser.newPage({ viewport, reducedMotion: 'no-preference' })
      const runtimeErrors = []
      page.on('console', (message) => { if (message.type() === 'error') runtimeErrors.push(message.text()) })
      page.on('pageerror', (error) => runtimeErrors.push(error.message))
      page.on('requestfailed', (request) => runtimeErrors.push(`network: ${request.url()}`))
      await page.goto(new URL(route, baseUrl).toString(), { waitUntil: 'networkidle' })

      const metrics = await page.evaluate(() => ({
        width: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        h1: document.querySelectorAll('h1').length,
        title: document.title,
        brokenImages: Array.from(document.images).filter((image) => image.complete && image.naturalWidth === 0).length,
        navLinks: document.querySelectorAll('header nav a').length,
      }))
      const label = `${viewport.name}:${route}`
      console.log(`${label} overflow=${metrics.scrollWidth > metrics.width ? 'YES' : 'no'} h1=${metrics.h1} images=${metrics.brokenImages === 0 ? 'ready' : `FAIL:${metrics.brokenImages}`} runtime=${runtimeErrors.length}`)
      if (metrics.scrollWidth > metrics.width) violations.push(`${label}: overflow horizontal`)
      if (metrics.h1 !== 1) violations.push(`${label}: esperava um H1, recebeu ${metrics.h1}`)
      if (metrics.brokenImages > 0) violations.push(`${label}: ${metrics.brokenImages} imagem(ns) quebrada(s)`)
      if (route !== '/instagram' && metrics.navLinks < 6) violations.push(`${label}: navegação incompleta`)
      if (route === '/instagram' && metrics.navLinks !== 0) violations.push(`${label}: página autônoma não deveria exibir a navegação institucional`)
      if (runtimeErrors.length > 0) violations.push(`${label}: ${runtimeErrors.join(' | ')}`)

      if (route === '/faq') {
        const firstQuestion = page.locator('main button[aria-expanded]').first()
        await firstQuestion.click()
        if ((await firstQuestion.getAttribute('aria-expanded')) !== 'false') violations.push(`${label}: FAQ não fechou`)
        await firstQuestion.click()
        if ((await firstQuestion.getAttribute('aria-expanded')) !== 'true') violations.push(`${label}: FAQ não reabriu`)
      }

      if (shouldCapture && screenshotRoutes.has(route)) {
        const fileName = route === '/' ? 'home' : route.slice(1)
        try {
          await page.screenshot({ path: resolve(output, `${viewport.name}-${fileName}.png`), fullPage: false, animations: 'disabled', timeout: 15_000 })
        } catch (error) {
          violations.push(`${label}: captura indisponível (${error.name})`)
        }
      }

      if (route === '/instagram' && shouldCapture) {
        const galleryImage = page.locator('[data-reveal="gallery-left"]').first()
        await galleryImage.scrollIntoViewIfNeeded()
        await galleryImage.waitFor({ state: 'visible' })
        await page.waitForTimeout(700)
        try {
          await page.screenshot({ path: resolve(output, `${viewport.name}-instagram-gallery.png`), fullPage: false, animations: 'allow', timeout: 15_000 })
        } catch (error) {
          violations.push(`${label}: captura da galeria indisponível (${error.name})`)
        }
      }

      if (route === '/contato') {
        await page.route('**/api/leads', async (routeRequest) => {
          await routeRequest.fulfill({
            status: 201,
            contentType: 'application/json',
            body: JSON.stringify({ ok: true, protocol: 'SECCOL-QA-001' }),
          })
        })
        await page.locator('input[name="need"]').first().evaluate((input) => input.click())
        await page.getByRole('button', { name: /continuar/i }).click()
        await page.locator('input[name="moment"]').first().evaluate((input) => input.click())
        await page.locator('textarea[name="details"]').fill('Validação automatizada do contexto operacional.')
        await page.getByRole('button', { name: /continuar/i }).click()
        await page.locator('input[name="name"]').fill('Equipe QA')
        await page.locator('input[name="phone"]').fill('(62) 99999-9999')
        await page.locator('input[name="location"]').fill('Goiânia, GO')
        await page.getByRole('button', { name: /continuar/i }).click()
        await page.locator('input[name="consent"]').evaluate((input) => input.click())
        await page.getByRole('button', { name: /enviar para a equipe/i }).click()
        const protocol = page.getByText('SECCOL-QA-001')
        try {
          await protocol.waitFor({ state: 'visible', timeout: 5_000 })
        } catch {
          violations.push(`${label}: jornada de diagnóstico não confirmou o protocolo`)
        }
      }
      await page.close()
    }
  }

  const motionPage = await browser.newPage({ viewport: { width: 1366, height: 768 }, reducedMotion: 'no-preference' })
  await motionPage.goto(new URL('/a-seccol', baseUrl).toString(), { waitUntil: 'networkidle' })
  const motionTarget = motionPage.locator('[data-reveal-repeat="true"]').first()
  await motionTarget.waitFor({ state: 'visible' })
  const initialMotionLayout = await motionTarget.evaluate((element) => ({
    height: element.offsetHeight,
    pageHeight: document.documentElement.scrollHeight,
  }))
  await motionPage.evaluate(() => window.scrollTo({ top: window.innerHeight * 1.5, behavior: 'instant' }))
  await motionPage.waitForTimeout(120)
  const exitState = await motionTarget.getAttribute('data-reveal-state')
  const exitMotionLayout = await motionTarget.evaluate((element) => ({
    height: element.offsetHeight,
    pageHeight: document.documentElement.scrollHeight,
  }))
  await motionPage.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await motionPage.waitForTimeout(120)
  const returnState = await motionTarget.getAttribute('data-reveal-state')
  const layoutStable = initialMotionLayout.height === exitMotionLayout.height && initialMotionLayout.pageHeight === exitMotionLayout.pageHeight
  console.log(`scroll-motion=${exitState === 'hidden' && returnState === 'visible' && layoutStable ? 'PASS' : 'FAIL'}`)
  if (exitState !== 'hidden') violations.push('motion: elemento não executou saída após deixar a viewport')
  if (returnState !== 'visible') violations.push('motion: elemento não retornou ao reentrar na viewport')
  if (!layoutStable) violations.push('motion: entrada ou saída alterou o espaço do layout')
  await motionPage.close()

  const galleryMotionPage = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'no-preference' })
  await galleryMotionPage.goto(new URL('/instagram', baseUrl).toString(), { waitUntil: 'networkidle' })
  const galleryLeftCount = await galleryMotionPage.locator('[data-reveal="gallery-left"]').count()
  const galleryRightCount = await galleryMotionPage.locator('[data-reveal="gallery-right"]').count()
  const galleryMotionOk = galleryLeftCount > 0 && Math.abs(galleryLeftCount - galleryRightCount) <= 1
  console.log(`gallery-motion=${galleryMotionOk ? 'PASS' : 'FAIL'} (${galleryLeftCount}/${galleryRightCount})`)
  if (!galleryMotionOk) violations.push('gallery-motion: variações complementares não foram aplicadas às imagens')
  await galleryMotionPage.close()

  const reducedPage = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' })
  await reducedPage.goto(new URL('/a-seccol', baseUrl).toString(), { waitUntil: 'networkidle' })
  const reducedMotionOk = await reducedPage.locator('[data-reveal]').evaluateAll((elements) => elements.every((element) => {
    const styles = getComputedStyle(element)
    return styles.opacity === '1' && styles.transform === 'none'
  }))
  console.log(`reduced-motion=${reducedMotionOk ? 'PASS' : 'FAIL'}`)
  if (!reducedMotionOk) violations.push('reduced-motion: conteúdo oculto ou transformado')
  await reducedPage.close()

  if (violations.length > 0) {
    console.error(`validation: FAIL (${violations.length})`)
    violations.forEach((violation) => console.error(`  - ${violation}`))
    process.exitCode = 1
  } else {
    console.log('validation: PASS')
  }
} finally {
  await browser.close()
}
