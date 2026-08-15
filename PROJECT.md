# Seccol — novo site

Documento vivo para orientar pessoas e agentes em contextos futuros. Atualizar este arquivo durante todo o projeto.

Última atualização: 15 de agosto de 2026  
Estado: site institucional integrado em oito rotas, incluindo a página autônoma de links para Instagram; direção “Engenharia em evidência” aplicada, conteúdo e funcionamento validados, revisão visual contínua.

## Objetivo

Criar uma experiência digital memorável para a Seccol, com percepção de precisão, confiança e contemporaneidade. O resultado precisa ser visualmente extraordinário sem cair em estética hospitalar genérica, industrial antiquada, excesso de efeitos, aparência futurista artificial ou linguagem brega.

O novo site não será uma reforma do código antigo. Informações e imagens publicadas foram capturadas apenas como fonte verificável.

## Princípios não negociáveis

- Primeira impressão forte e específica da Seccol.
- UI/UX ergonômica, acessível, responsiva e previsível.
- Conteúdo comercial fiel ao banco de referência.
- Componentes pequenos, reutilizáveis e com responsabilidade clara.
- Tema e motion centralizados; evitar valores visuais espalhados.
- Movimento com função narrativa ou de feedback, nunca como ruído.
- Mobile projetado como experiência própria, não desktop empilhado.
- Funcionar sem motion e respeitar `prefers-reduced-motion`.
- Priorizar estabilidade visual, carregamento progressivo e interação fluida.
- Nenhuma dependência pesada sem necessidade demonstrada.

## Stack atual

- React 19 com TypeScript.
- Vite 8 como ambiente de desenvolvimento e build.
- CSS Modules para estilos locais.
- Custom properties em CSS para tokens globais.
- Motion nativo com CSS, `IntersectionObserver` e `requestAnimationFrame`.
- Oxlint, TypeScript e build de produção como verificações obrigatórias.
- Playwright Core reutilizando o Edge local para validação visual responsiva.
- Python e Pillow para ferramentas de tratamento de assets.

Fontes oficiais consultadas na definição da stack:

- https://vite.dev/guide/
- https://react.dev/learn/typescript

## Arquitetura

```text
src/
├── app/                    # composição da aplicação e estilos globais
├── components/
│   ├── interaction/        # primitives de ponteiro e perspectiva
│   ├── motion/             # controller, reveal e transição de página
│   └── ui/                 # componentes visuais reutilizáveis
├── features/               # módulos de domínio por parte do produto
├── hooks/                  # hooks compartilhados
├── lib/                    # funções puras e integrações
├── pages/                  # composição de páginas
├── theme/                  # tokens, reset, motion e utilitários globais
└── types/                  # tipos compartilhados

reference/
├── catalog/                # banco estruturado, manifestos e catálogo visual
└── site-original/          # snapshot público imutável

tools/                      # scripts Python independentes do frontend
```

### Regras de modularização

- Páginas apenas compõem features e componentes.
- Features concentram conteúdo e comportamento de domínio.
- Componentes de UI não conhecem conteúdo comercial.
- Componentes de motion não definem copy, paleta ou layout de página.
- CSS Modules pertencem ao componente; valores compartilhados vêm de `theme/`.
- Evitar arquivos genéricos gigantes como `utils.ts`, `components.tsx` ou um único CSS global.
- Só criar abstrações quando houver uso concreto ou uma regra transversal clara.

## Tema unificado

A pasta `src/theme/` é a única fonte para decisões globais:

- `tokens.css`: cores primitivas, tokens semânticos, tipografia, espaçamento, raios, sombras, motion, alvos de toque e camadas.
- `reset.css`: normalização mínima.
- `motion.css`: comportamento global de entrada, saída e transição.
- `utilities.css`: poucas utilidades estruturais estáveis.

Componentes devem consumir tokens semânticos como `--color-text` e `--color-accent`, nunca repetir valores hexadecimais de marca. A paleta atual é provisória até a aprovação da direção de arte.

## Ergonomia de UI/UX

- Alvos interativos com mínimo de 44 px.
- Estado de foco sempre visível e com contraste.
- Hover somente quando o dispositivo realmente possui hover.
- Interações essenciais também funcionam por teclado e toque.
- Texto corrido com largura de leitura controlada.
- Tipografia e espaçamentos fluidos sem saltos agressivos.
- Não bloquear scroll, navegação ou leitura para reproduzir animação.
- Evitar cursor customizado, scroll hijacking e botões que fogem do ponteiro.
- Feedback de clique rápido e discreto.
- O sistema de motion nunca oculta conteúdo antes de ser inicializado e possui fallback imediato.
- Validar em 1366×768, 1440×900, 360×800, 375×812, 390×844, 412×915 e 430×932.

## Sistema de motion

### Fora da hero

- Duração padrão: 620 ms.
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Deslocamento: 10 px no desktop e 6 px no mobile.
- Stagger: 40 ms por item, limitado a 180 ms.
- Propriedades principais: `opacity` e `transform`.
- Entrada e saída repetida são opt-in por componente.
- Sem JavaScript, os elementos permanecem visíveis.

Arquivos centrais:

- `src/components/motion/MotionController.tsx`
- `src/components/motion/Reveal.tsx`
- `src/components/motion/PageTransition.tsx`
- `src/theme/motion.css`

### Mouse e perspectiva

`PointerTilt` oferece resposta 3D leve com CSS perspective e atualização via `requestAnimationFrame`. Ele é desativado em touch, ponteiro impreciso e reduced motion. Não aplicar em textos longos, formulários ou controles essenciais.

WebGL, Three.js ou shaders só serão considerados se a direção aprovada exigir transformação espacial impossível de realizar com CSS e se houver fallback estático equivalente.

## Direção da primeira impressão

Fase atual da hero: **integrada e em polimento**. A direção “Engenharia em evidência” foi aprovada como base e estendida ao restante do site.

1. **Tese da marca:** a Seccol torna riscos invisíveis mensuráveis e mantém ambientes críticos sob controle.
2. **Função da hero:** demonstrar precisão e confiança em poucos segundos e conduzir a uma conversa técnica ou orçamento.
3. **Ativos fortes:** especialização desde 2009, atuação nacional, instrumentação, testes HEPA/ULPA, certificação, relatório técnico e imagens operacionais próprias já publicadas.
4. **Regra visual:** tipografia editorial clara, fotografia operacional publicada e faixa de evidências; sem simulação de dashboard, carrossel, partículas, vidro ou 3D gratuito.
5. **Motion da hero:** revelação única da mídia, acomodação curta de imagem e copy, com repouso completo e fallback por `prefers-reduced-motion`.
6. **Desktop:** seção completa em exatamente uma altura de viewport nos dois tamanhos de controle.
7. **Mobile:** ordem própria — introdução, mídia, decisão/CTA e evidências — com CTA principal ainda na primeira dobra.

### Assinatura conceitual do site atual

- Tese: especialistas em controle de contaminação ambiental.
- Regra espacial: slideshow fotográfico de largura total com texto sobreposto.
- Relação texto/mídia: frases institucionais sobre imagens rotativas.
- Protagonista: fotografia de fundo e efeitos do Revolution Slider.
- Motion: zoom Ken Burns, parallax e entradas de caracteres.
- Mobile: mesma lógica comprimida e recortada.
- Ação principal: comunicação institucional, sem CTA dominante na abertura.
- Dependência dos assets: alta; a composição depende das três imagens do slider.

### Comparação estrutural

O padrão atual coincide com clichês comuns de sites industriais antigos: carrossel, zoom contínuo, texto sobre foto e plugin de animação genérico. O protótipo substitui essa assinatura por uma composição editorial estável, centrada em medição real e evidências verificáveis. A avaliação de credibilidade e distinção permanece humana.

## Banco de informação e imagens

Fonte publicada: https://seccol.com.br/  
Captura: 15 de agosto de 2026.

- `reference/catalog/knowledge-base.json`: fatos comerciais organizados.
- `reference/catalog/pages.json`: textos, links, imagens e formulários por página.
- `reference/catalog/images.json`: imagens, dimensões, hashes e usos.
- `reference/catalog/manifest.json`: 81 arquivos com SHA-256.
- `reference/catalog/image-contact-sheet.jpg`: prancha das 25 imagens.
- `reference/site-original/`: captura original, imutável.

Regra: não inventar, completar ou corrigir silenciosamente informações. Atualizações confirmadas pela empresa devem ganhar registro próprio com data e origem.

## Ferramentas Python

A pasta correta é `tools/` — interpretação do nome “tous” mencionado no briefing.

- `optimize_images.py`: otimiza e converte imagens sem sobrescrever originais por padrão.
- `build_reference_bank.py`: regenera o catálogo de referência.
- `mirror_site.py`: captura autorizada de uma nova versão pública para auditoria.
- `trim_transparency.py`: remove margens transparentes sem alterar os pixels visíveis.
- `requirements.txt`: dependências das ferramentas.
- `capture_ui.mjs`: validação dos sete viewports de controle da home.
- `capture_site.mjs`: auditoria das sete rotas em desktop/mobile, FAQ, imagens, navegação, runtime e reduced motion.

Novos scripts devem oferecer ajuda por CLI, validar caminhos, evitar sobrescrita por padrão e relatar claramente o que modificaram.

## Comandos

```powershell
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
npm run check
```

Ferramentas:

```powershell
python -m pip install -r tools\requirements.txt
python tools\optimize_images.py origem destino
python tools\build_reference_bank.py
```

## Fluxo de trabalho

1. Ler este documento e `reference/README.md`.
2. Confirmar a etapa atual e não antecipar decisões visuais pendentes.
3. Implementar em módulo pequeno e removível.
4. Atualizar este documento quando uma decisão mudar o projeto.
5. Validar teclado, reduced motion, desktop e mobile.
6. Executar `npm run check`.
7. Registrar limitações reais; não declarar qualidade ou performance sem evidência.

## Decisões registradas

### 2026-08-15 — Fonte de verdade

O site publicado será usado apenas como banco de informações e imagens. Seu código e layout não serão reaproveitados.

### 2026-08-15 — Fundação frontend

Escolhidos React, TypeScript e Vite para permitir composição modular e build estático eficiente. Motion geral será nativo; nenhuma biblioteca de animação foi instalada.

O build usa caminhos relativos para poder ser revisado em subpastas e hospedagens estáticas sem quebrar assets.

### 2026-08-15 — Tema

Tokens semânticos centralizados em `src/theme/`. A paleta ainda é provisória e não representa aprovação de direção de arte.

### 2026-08-15 — Hero

A direção “Engenharia em evidência” foi integrada. O conceito usa fotografia técnica contemporânea, linguagem editorial e fatos confirmados para priorizar credibilidade B2B. Efeitos ostensivos, metáforas visuais, 3D, partículas, carrossel e dashboard fictício foram excluídos.

As imagens de referência visual foram geradas especificamente para a nova direção e não são prova documental de equipe, instalações ou instrumentos da Seccol. Sua origem e limitações estão registradas em `docs/assets-manifest.md`.

### 2026-08-15 — Páginas e regras editoriais

Foram integradas oito rotas funcionais por hash para compatibilidade com hospedagem estática. Seções não usam tópicos antes das headlines. Imagens não recebem numeração, legendas pequenas ou descrições sobrepostas. As rotas possuem transição de entrada/saída e as seções usam o motion uniforme do projeto.

### 2026-08-15 — Página de links do Instagram

A rota `#/instagram` foi criada como experiência autônoma, sem cabeçalho ou rodapé institucional, inspirada na hierarquia móvel das páginas de referência da SOS Ótica e Ótica Moderna. Ela reutiliza tema, logo e mídia já aprovados no projeto. Os destinos seguem o Instabio público da Seccol na ordem publicada: atendimento, website, Facebook e localização; o website antigo foi substituído pela home interna do site atual. Não foram adicionados destinos comerciais não confirmados.

## Próxima decisão

Revisar as páginas completas com o usuário e refinar ritmo, densidade de conteúdo e escolha das fotografias sem alterar fatos confirmados.

## Pendências técnicas conhecidas

- Definir antes da produção se a entrega terá prerender/SSG para disponibilizar o conteúdo completo sem JavaScript. A fundação atual é uma SPA de validação e depende de JavaScript para montar o React.
- Obter o logo oficial em vetor; o PNG publicado possui apenas 128×31 px úteis.
- Definir família tipográfica final somente após aprovação da direção de arte.
- Criar variantes responsivas e política final de preload da imagem após aprovação do asset principal.
- Substituir fotografias geradas por ensaio próprio da Seccol quando houver material atual com qualidade equivalente.

## Última validação

15 de agosto de 2026:

- Oxlint: aprovado.
- TypeScript: aprovado.
- Build de produção: aprovado.
- Dependências auditadas: nenhuma vulnerabilidade encontrada pelo npm.
- Viewports 1366×768, 1440×900, 360×800, 375×812, 390×844, 412×915 e 430×932: sem overflow horizontal, com um H1 íntegro e mídia carregada.
- Hero desktop: exatamente uma altura de viewport nos dois tamanhos testados.
- CTA mobile: 56 px de altura e dentro da primeira dobra nos cinco tamanhos testados.
- Runtime: nenhum erro de console, página ou rede nos sete viewports.
- `prefers-reduced-motion`: dois elementos monitorados, ambos visíveis, sem transformação e sem animação.
- Capturas: `artifacts/hero-v2/`.
- Relatório: `docs/qa-hero.md`.
- Oito rotas integradas cobertas pela ferramenta de auditoria em 1366×768 e 390×844.
- Página `#/instagram` validada isoladamente em 1366×768 e 390×844: um H1, quatro links com alvos de 74–76 px, sem cabeçalho/rodapé institucional, overflow, imagens quebradas ou erros de runtime.
- `prefers-reduced-motion` da página de links: sem transformação e sem transição perceptível.
- Capturas da página de links: `artifacts/instagram/`.
- FAQ: abertura e fechamento aprovados.
- Navegação por hash: aprovada em todas as rotas.
- Capturas do site integrado: `artifacts/site-v2/`.
- Relatório integrado: `docs/qa-site.md`.
- Ferramentas Python: compilação aprovada.
- Otimizador de imagens: teste funcional, com redução de 114,9 KB para 28,7 KB no asset de teste.
