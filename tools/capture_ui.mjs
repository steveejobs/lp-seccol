import { existsSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'

import { chromium } from 'playwright-core'

const url = process.argv[2] ?? 'http://127.0.0.1:8000/dist/'
const output = resolve(process.argv[3] ?? 'artifacts/ui')
const shouldCapture = process.argv.includes('--screenshots')
const edgeCandidates = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
]
const executablePath = edgeCandidates.find(existsSync)

if (!executablePath) {
  throw new Error('Microsoft Edge não encontrado.')
}

if (shouldCapture) {
  mkdirSync(output, { recursive: true })
}

const browser = await chromium.launch({ executablePath, headless: true })
const violations = []
const viewports = [
  { name: 'desktop-1366', width: 1366, height: 768 },
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'mobile-430', width: 430, height: 932 },
  { name: 'mobile-412', width: 412, height: 915 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'mobile-375', width: 375, height: 812 },
  { name: 'mobile-360', width: 360, height: 800 },
]

try {
  for (const viewport of viewports) {
    const runtimeErrors = []
    const page = await browser.newPage({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1,
      reducedMotion: 'no-preference',
    })
    page.on('console', (message) => {
      if (message.type() === 'error') runtimeErrors.push(`console: ${message.text()}`)
    })
    page.on('pageerror', (error) => runtimeErrors.push(`page: ${error.message}`))
    page.on('requestfailed', (request) => runtimeErrors.push(`network: ${request.url()}`))
    await page.goto(url, { waitUntil: 'networkidle' })
    const metrics = await page.evaluate(() => ({
      innerWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      title: document.title,
      h1Count: document.querySelectorAll('h1').length,
      h1Dimensions: (() => {
        const heading = document.querySelector('h1')
        return heading
          ? {
              scrollWidth: heading.scrollWidth,
              clientWidth: heading.clientWidth,
              scrollHeight: heading.scrollHeight,
              clientHeight: heading.clientHeight,
            }
          : null
      })(),
      h1Clipped: (() => {
        const heading = document.querySelector('h1')
        const hero = document.querySelector('[data-hero-root]')
        if (!heading || !hero) return true
        const headingBounds = heading.getBoundingClientRect()
        const heroBounds = hero.getBoundingClientRect()
        return (
          headingBounds.left < -1 ||
          headingBounds.right > window.innerWidth + 1 ||
          headingBounds.top < heroBounds.top - 1 ||
          headingBounds.bottom > heroBounds.bottom + 1
        )
      })(),
      heroHeight: document.querySelector('[data-hero-root]')?.getBoundingClientRect().height ?? 0,
      headerHeight: document.querySelector('header')?.getBoundingClientRect().height ?? 0,
      cta: (() => {
        const element = document.querySelector('[data-primary-cta]')
        if (!element) return null
        const bounds = element.getBoundingClientRect()
        return { width: bounds.width, height: bounds.height, top: bounds.top, bottom: bounds.bottom }
      })(),
      imageReady: (() => {
        const image = document.querySelector('[data-hero-image]')
        return image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0
      })(),
    }))
    console.log(
      `${viewport.name}: viewport=${metrics.innerWidth}px scroll=${metrics.scrollWidth}px ` +
        `overflow=${metrics.scrollWidth > metrics.innerWidth ? 'YES' : 'no'}`,
    )
    if (metrics.scrollWidth > metrics.innerWidth) violations.push(`${viewport.name}: overflow horizontal`)
    if (metrics.h1Count !== 1 || metrics.h1Clipped) violations.push(`${viewport.name}: H1 ausente ou cortado`)
    if (!metrics.imageReady) violations.push(`${viewport.name}: imagem principal não carregou`)
    if (!metrics.cta || metrics.cta.height < 44 || metrics.cta.width < 44) {
      violations.push(`${viewport.name}: CTA ausente ou menor que 44px`)
    }
    if (viewport.width > 760 && Math.abs(metrics.heroHeight + metrics.headerHeight - viewport.height) > 1) {
      violations.push(`${viewport.name}: header + hero não fecham a altura da tela`)
    }
    if (viewport.width <= 760 && (!metrics.cta || metrics.cta.bottom > viewport.height)) {
      violations.push(`${viewport.name}: CTA principal fora da primeira dobra`)
    }
    if (runtimeErrors.length > 0) {
      violations.push(`${viewport.name}: ${runtimeErrors.join(' | ')}`)
      console.log(`  details: ${runtimeErrors.join(' | ')}`)
    }
    console.log(
      `  h1=${metrics.h1Count} clipped=${metrics.h1Clipped ? 'YES' : 'no'} ` +
        `hero=${Math.round(metrics.heroHeight)}px image=${metrics.imageReady ? 'ready' : 'FAIL'} ` +
        `cta=${metrics.cta ? `${Math.round(metrics.cta.width)}x${Math.round(metrics.cta.height)} bottom=${Math.round(metrics.cta.bottom)}` : 'MISSING'} ` +
        `runtime-errors=${runtimeErrors.length}`,
    )
    if (metrics.h1Clipped) console.log(`  h1-box: ${JSON.stringify(metrics.h1Dimensions)}`)
    if (shouldCapture) {
      try {
        await page.screenshot({
          path: resolve(output, `${viewport.name}.png`),
          animations: 'disabled',
          fullPage: false,
          timeout: 15_000,
        })
      } catch (error) {
        console.warn(`${viewport.name}: screenshot indisponível neste Edge (${error.name})`)
      }
    }
    await page.close()
  }

  const reducedPage = await browser.newPage({
    viewport: { width: 390, height: 844 },
    reducedMotion: 'reduce',
  })
  await reducedPage.goto(url, { waitUntil: 'networkidle' })
  const reducedState = await reducedPage.locator('[data-hero-motion]').evaluateAll((elements) =>
    elements.map((element) => {
      const styles = window.getComputedStyle(element)
      return { opacity: styles.opacity, transform: styles.transform, animationName: styles.animationName }
    }),
  )
  const reducedVisible = reducedState.every(
    (state) => state.opacity === '1' && state.transform === 'none' && state.animationName === 'none',
  )
  console.log(
    `reduced-motion: elements=${reducedState.length} static-and-visible=${reducedVisible ? 'yes' : 'NO'}`,
  )
  if (!reducedVisible) violations.push('reduced-motion: animações permaneceram ativas')
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
