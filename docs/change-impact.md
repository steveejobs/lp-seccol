# Matriz de impacto — integração institucional

Objetivo: transformar o protótipo aprovado em um site institucional multipágina, preservando credibilidade, conteúdo confirmado e comportamento responsivo.

| Área | Arquivos principais | Rotas | Evidência |
|---|---|---|---|
| Navegação | `src/app/router.tsx`, `SiteHeader.tsx` | todas | sete rotas e menu validados |
| Home | `HomePage.tsx`, `features/home/hero/*` | `/` | sete viewports da hero e auditoria integrada |
| Empresa | `CompanyPage.tsx` | `/a-seccol` | desktop/mobile sem overflow ou erro |
| Testes | `EquipmentTestsPage.tsx` | `/testes-em-equipamentos` | vinte itens publicados e rota validada |
| Áreas limpas | `CleanRoomsPage.tsx` | `/areas-limpas` | onze testes, certificado e relatório |
| Instrumentos | `InstrumentsPage.tsx` | `/instrumentos` | doze instrumentos publicados |
| FAQ | `FaqPage.tsx`, `Accordion.tsx` | `/faq` | abrir/fechar automatizado |
| Contato | `ContactPage.tsx`, `ContactBrief.tsx` | `/contato` | canais reais e briefing direcionado para WhatsApp |
| Instagram | `InstagramPage.tsx` | `/instagram` | experiência autônoma validada em 360 e 390 px |
| Motion | `MotionController.tsx`, `theme/motion.css` | todas | entrada, saída, fallback e reduced motion |
| Mídia | `assets/generated-originals/`, `public/media/generated/` | todas | quatro originais e quatro WebP rastreáveis |
| QA | `tools/capture_site.mjs`, `tools/capture_ui.mjs` | todas | `validation: PASS` |

## Regras incorporadas

- Sem tópicos ou eyebrows antes das headlines das seções.
- Sem numeração de imagens ou galerias.
- Sem legendas pequenas ou descrições sobre as imagens.
- Seções desktop ocupam ao menos uma tela quando o conteúdo permite; conteúdo extenso cresce sem corte.
- Mobile possui composição própria e altura natural.
- Nenhum fato novo é sustentado por fotografia gerada.

## Fora do escopo atual

- Backend de formulário, CMS, mapa incorporado e analytics.
- Ensaios fotográficos documentais da equipe e instalações reais.
- Prerender/SSG.
