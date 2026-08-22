# Matriz de impacto — integração institucional

Objetivo: transformar o protótipo aprovado em um site institucional multipágina, preservando credibilidade, conteúdo confirmado e comportamento responsivo.

| Área | Arquivos principais | Rotas | Evidência |
|---|---|---|---|
| Navegação | `src/app/router.tsx`, `SiteHeader.tsx`, `SiteFooter.tsx` | todas | oito rotas, menu e conversão para diagnóstico validados |
| Home | `HomePage.tsx`, `features/home/hero/*` | `/` | sete viewports da hero e auditoria integrada |
| Empresa | `CompanyPage.tsx` | `/a-seccol` | fotografia real da equipe, registros publicados e desktop/mobile sem overflow |
| Testes | `EquipmentTestsPage.tsx` | `/testes-em-equipamentos` | vinte itens publicados e rota validada |
| Áreas limpas | `CleanRoomsPage.tsx` | `/areas-limpas` | onze testes, certificado e relatório |
| Instrumentos | `InstrumentsPage.tsx` | `/instrumentos` | doze instrumentos publicados |
| FAQ | `FaqPage.tsx`, `Accordion.tsx` | `/faq` | abrir/fechar automatizado |
| Contato | `ContactPage.tsx`, `ContactBrief.tsx`, `api/leads.ts` | `/contato`, `/api/leads` | diagnóstico no primeiro bloco, quatro etapas, revisão, CRM com protocolo e canais alternativos posteriores |
| Sistema editorial | `PageIntro.tsx`, `ActionSection.tsx`, `Sections.module.css` | rotas institucionais | sinais factuais, índices numerados, alturas naturais e decisão principal consistente |
| Instagram | `InstagramPage.tsx`, `TeamGallery.tsx` | `/instagram` | links, mídias e 15 fotos com motion individual complementar em 360 e 390 px |
| Motion | `Reveal.tsx`, `MotionController.tsx`, `theme/motion.css` | todas | entrada, saída e retorno por scroll com histerese, variantes editoriais, layout estável e reduced motion |
| Mídia | `assets/generated-originals/`, `public/media/generated/` | todas | quatro originais e quatro WebP rastreáveis |
| QA | `tools/capture_site.mjs`, `tools/capture_ui.mjs` | todas | 1366, 390 e 360 px, FAQ, diagnóstico, runtime e reduced motion |

## Regras incorporadas

- Sem tópicos ou eyebrows antes das headlines das seções.
- Sem numeração de imagens ou galerias.
- Sem legendas pequenas ou descrições sobre as imagens.
- Seções usam altura natural e densidade editorial; somente a hero aprovada conserva timing e ocupação próprios.
- Mobile possui composição própria e altura natural.
- Nenhum fato novo é sustentado por fotografia gerada.

## Fora do escopo atual

- CMS e analytics.
- Casos de sucesso autorizados com resultados verificáveis e ensaio fotográfico documental completo.
- Prerender/SSG.
