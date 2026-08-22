# Seccol — novo site

Documento vivo para orientar pessoas e agentes em contextos futuros. Atualizar este arquivo durante todo o projeto.

Última atualização: 22 de agosto de 2026

Estado: site institucional integrado em oito rotas reais; home e páginas internas orientadas à prevenção de não conformidades; sistema editorial com evidências e conversão unificada; página autônoma de links com galeria humana, imóvel, mapa e rota por coordenadas; jornada de diagnóstico conectada com segurança ao CRM do Sistema Seccol; conteúdo e funcionamento validados localmente.

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
- Vercel como hospedagem do build estático, com configuração versionada em `vercel.json` e Node.js 24.
- Vercel Function em `api/leads.ts` como adaptador server-side do formulário para o CRM, sem segredo no bundle do navegador.

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
- Entrada e saída repetida são o padrão dos componentes `Reveal`; blocos que precisam permanecer estáticos podem optar por execução única.
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
- `capture_site.mjs`: auditoria das oito rotas em 1366, 390 e 360 px, FAQ, jornada completa de diagnóstico, retorno de motion por scroll, estabilidade de layout, galeria, imagens, navegação, runtime e reduced motion.

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

Foram integradas oito rotas funcionais. Seções não usam tópicos antes das headlines. Imagens não recebem numeração, legendas pequenas ou descrições sobrepostas. As rotas possuem transição de entrada/saída e as seções usam o motion uniforme do projeto.

### 2026-08-15 — Página de links do Instagram

A rota `/instagram` foi criada como experiência autônoma, sem cabeçalho ou rodapé institucional, inspirada na hierarquia móvel das páginas de referência da SOS Ótica e Ótica Moderna. Ela reutiliza tema, logo e mídia já aprovados no projeto. Os destinos seguem os canais confirmados da Seccol: atendimento, website, Facebook, LinkedIn e localização; o website antigo foi substituído pela home interna do site atual.

### 2026-08-15 — Deploy na Vercel

O deploy estático passou a ter configuração versionada em `vercel.json`: detecção explícita de Vite, instalação reprodutível com `npm ci`, build por `npm run build` e saída em `dist`. O runtime foi fixado em Node.js 24 pelo campo `engines` do `package.json`, versão suportada pela Vercel e compatível com Vite 8.

A tentativa anterior apontava para `steveejobs/SIVS-Seccol`, enquanto o remoto deste projeto é `steveejobs/lp-seccol`. A conexão Git da Vercel deve usar o repositório atual e a raiz do repositório como Root Directory. O procedimento está documentado em `docs/deploy-vercel.md`.

O primeiro deploy corrigido foi publicado com sucesso em `https://sivs-seccol.vercel.app` a partir deste workspace. A Vercel confirmou instalação limpa e build de produção sem erros. A integração Git do projeto `sivs-seccol` também foi substituída com sucesso e agora aponta para `steveejobs/lp-seccol`, permitindo deploys automáticos por push na branch de produção.

### 2026-08-15 — Redesenho de densidade e ritmo da home

A home deixou de depender de seções genéricas com altura mínima de viewport e passou a ter sete capítulos visuais: hero, capacidades, protocolo técnico, instrumentação, entregáveis, operações atendidas e estrutura, seguidos pelo convite comercial. O redesenho mantém apenas quatro fotografias e obtém variedade por composição, escala, contraste, tipografia, documentos abstratos e grids específicos.

As novas seções reutilizam o `Reveal` e o `MotionController`, com duração, deslocamento e stagger centralizados. O componente `Reveal` passou a aceitar atributos HTML sem criar uma nova infraestrutura de motion. Não foi adicionada dependência.

### 2026-08-15 — LinkedIn e página mobile de links

O usuário confirmou `https://www.linkedin.com/company/grupo-seccol/` como perfil oficial do Grupo Seccol. O destino foi registrado em `docs/source-of-truth.md`, adicionado ao rodapé institucional e ao `/instagram`.

A página `/instagram` foi reconstruída como composição mobile-first de largura controlada, superfície branca, tipografia editorial, detalhes laranja, mídia curta e cinco links com alvos confortáveis. Desktop funciona apenas como moldura de apresentação da experiência móvel; a prioridade de decisão permanece entre 360 e 430 px.

### 2026-08-15 — URLs, conversão e acabamento de experiência

A navegação passou de hashes para caminhos reais, com metadados, Open Graph e canonical específicos por página. O `vercel.json` recebeu o rewrite de SPA necessário para abertura e atualização direta das rotas; links antigos com hash permanecem compatíveis e são normalizados.

O WhatsApp da página `/instagram` foi unificado com o canal móvel institucional confirmado no banco de conteúdo. A página de contato ganhou um briefing guiado que monta a mensagem localmente e a abre no WhatsApp, sem persistir informações. O convite comercial duplicado no rodapé foi removido para que cada página termine com uma única decisão principal.

As novas entradas reutilizam o sistema `Reveal` centralizado, com grupos curtos, deslocamento moderado e fallback para `prefers-reduced-motion`; nenhuma dependência foi adicionada.

### 2026-08-15 — Favicon da marca

O favicon passou a usar somente o símbolo de caixa e check do logo atual. O ativo foi extraído deterministicamente dos pixels originais, sem redesenho, e publicado em PNG transparente de 32×32 px e ICO com camadas de 16×16 e 32×32 px. A tentativa de edição generativa foi rejeitada na inspeção por alterar acabamento e geometria do símbolo.

### 2026-08-21 — Clareza comercial e risco de não conformidade

A mensagem principal passou a explicitar a dor de não conformidades, fiscalização e paralisação operacional. A redação evita prometer que a Seccol impede sanções ou garante conformidade: o benefício publicado é identificar desvios, orientar correções e produzir evidências técnicas antes da fiscalização, coerente com o objetivo confirmado de prevenção e redução de paradas prolongadas.

### 2026-08-21 — Galeria humana e localização no `/instagram`

O usuário confirmou Instagram, Facebook, WhatsApp e o ponto da empresa no Google, validado nas coordenadas `-16.6974441, -49.2870744`. O `/instagram` passou a oferecer seis destinos oficiais, rota direta por coordenadas, mapa incorporado e fotografia do imóvel sem recorte.

A galeria usa 15 cenas visualmente únicas entre 18 arquivos fornecidos; duas duplicações por hash e uma repetição visual em resolução diferente foram excluídas da interface. A ordem é embaralhada por visita, as proporções são preservadas e uma lightbox nativa oferece abertura, avanço, retorno, Escape e fechamento pelo fundo. A nova seção reutiliza `Reveal`, `MotionController` e os tokens existentes; nenhuma dependência foi adicionada.

### 2026-08-21 — Formulário integrado ao CRM

O briefing da rota `/contato` deixou de apenas preparar uma mensagem de WhatsApp e passou a enviar o lead à função server-side `/api/leads`. A função aceita somente requisições JSON da mesma origem, valida campos, consentimento, honeypot e tempo de preenchimento, preserva página, referência e UTMs e encaminha um evento `lead.created` assinado por HMAC-SHA256 ao Sistema Seccol. Credenciais permanecem somente nas variáveis protegidas da Vercel; nenhuma dependência foi adicionada.

O navegador recebe apenas sucesso e protocolo. Indisponibilidade do CRM apresenta fallback explícito para o WhatsApp com o mesmo briefing, sem declarar que o lead foi registrado. O contrato, as variáveis e um prompt reutilizável de manutenção estão em `docs/crm-integration.md`.

### 2026-08-21 — Contato como experiência de diagnóstico

O formulário convencional foi substituído por uma jornada de quatro etapas: sinal percebido, contexto operacional, identificação do contato e revisão da leitura. A interface oferece escolhas visuais, progresso, leitura dinâmica do cenário, retorno a etapas concluídas, validação contextual e confirmação final com protocolo. Em falha, todo o conteúdo permanece disponível e pode ser levado ao WhatsApp.

O momento operacional selecionado é incorporado ao campo de contexto já aceito pelo CRM, preservando o contrato assinado e evitando mudança desnecessária no schema do SIVS. A transição entre etapas usa apenas opacidade e deslocamento de 8 px durante 620 ms, conforme os tokens existentes; `prefers-reduced-motion` remove a animação. Nenhuma dependência foi adicionada.

### 2026-08-21 — Sistema editorial e conversão unificada

As páginas internas deixaram de repetir blocos genéricos de altura integral e passaram a usar introduções editoriais densas, três sinais factuais, índices técnicos numerados e seções de decisão coerentes. O CRM é agora o caminho primário de conversão na home, nas introduções e nos encerramentos; WhatsApp permanece como alternativa explícita. A rota `/contato` começa diretamente pelo diagnóstico e apresenta os canais diretos somente depois da experiência, sem repetir o endereço já presente no rodapé.

A página institucional passou a usar uma fotografia real da equipe fornecida na galeria e uma faixa de registros publicados. A direção visual aprovada da hero da home foi preservada; apenas seu CTA foi alinhado ao diagnóstico. As novas composições reutilizam `Reveal`, duração de 620 ms e tokens existentes, sem biblioteca ou dependência adicional.

### 2026-08-22 — Motion editorial recorrente

O sistema `Reveal` passou a executar entrada, saída e retorno por scroll nos principais títulos, textos, cards, mídias e decisões do site. Dois `IntersectionObserver` compartilhados criam uma faixa de histerese: a entrada acontece dentro de 9% das bordas da viewport e a saída somente quando o elemento ultrapassa a faixa de 6%. Essa diferença impede disparos antecipados, oscilação ao inverter o scroll e conteúdo invisível em áreas relevantes da tela.

As variações `lift`, `card`, `media` e as duas direções complementares da galeria compartilham 620 ms, o mesmo easing, deslocamento máximo de 10 px no desktop e 6 px no mobile. A galeria anima cada moldura individualmente com diferença lateral de apenas 6 px; as imagens não recebem zoom ou transformação direta. Todas as saídas usam somente opacidade e transform, preservando dimensões e fluxo do layout. A hero manteve seu timing próprio aprovado e cabeçalho/navegação permanecem estáveis.

## Próxima decisão

Incorporar casos de sucesso verificáveis, com autorização de clientes, contexto, desafio, intervenção e resultado mensurável, quando a Seccol disponibilizar esse material.

## Pendências técnicas conhecidas

- Definir antes da produção se a entrega terá prerender/SSG para disponibilizar o conteúdo completo sem JavaScript. A fundação atual é uma SPA de validação e depende de JavaScript para montar o React.
- Obter o logo oficial em vetor; o PNG publicado possui apenas 128×31 px úteis.
- Definir família tipográfica final somente após aprovação da direção de arte.
- Criar variantes responsivas e política final de preload da imagem após aprovação do asset principal.
- Substituir fotografias geradas por ensaio próprio da Seccol quando houver material atual com qualidade equivalente.
- Configurar `SIVS_CRM_BASE_URL` e `SIVS_WEBSITE_LEADS_SECRET` na Vercel e o mesmo segredo com a empresa de destino no Dokploy antes de publicar a integração.

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
- Primeira versão da página de links validada isoladamente em 1366×768 e 390×844: um H1, quatro links com alvos de 74–76 px, sem cabeçalho/rodapé institucional, overflow, imagens quebradas ou erros de runtime.
- `prefers-reduced-motion` da página de links: sem transformação e sem transição perceptível.
- Capturas da página de links: `artifacts/instagram/`.
- FAQ: abertura e fechamento aprovados.
- Navegação legada por hash: aprovada em todas as rotas antes da migração para URLs reais.
- Capturas do site integrado: `artifacts/site-v2/`.
- Relatório integrado: `docs/qa-site.md`.
- Ferramentas Python: compilação aprovada.
- Otimizador de imagens: teste funcional, com redução de 114,9 KB para 28,7 KB no asset de teste.
- Deploy de produção na Vercel: instalação com `npm ci`, build Vite e alias `https://sivs-seccol.vercel.app` aprovados.
- Home redesenhada validada nos sete viewports de controle: sem overflow, H1 cortado, imagens quebradas ou erros de runtime.
- `/instagram` validado em cinco viewports móveis: cinco links, incluindo LinkedIn, com alvos de 65–70 px e sem overflow ou erros de runtime.
- Capturas do redesenho: `artifacts/redesign-review/` e `artifacts/home-redesign/`.
- Favicon PNG/ICO: recorte do símbolo validado com transparência e integrado ao build.
- URLs reais validadas diretamente em todas as oito rotas, em 1366×768 e 390×844: sem overflow, imagens quebradas ou erros de runtime.
- Metadados específicos, canonical e normalização dos links antigos com hash: aprovados.
- `/instagram` claro e mobile-first validado em 360×800 e 390×844, com cinco links e alvos confortáveis.
- Briefing de contato validado com preenchimento real: mensagem codificada corretamente para o WhatsApp institucional e nenhum armazenamento local ou remoto.
- `prefers-reduced-motion` após as novas seções: aprovado.
- Capturas finais de experiência: `artifacts/experience-v3/`.
- `npm run check` após a migração de rotas e refinamentos: aprovado.
- Deploy `9d4b0fc` publicado pela integração Git com status `Ready`; `/instagram`, `/contato` e `/areas-limpas` abertos e atualizados diretamente em produção com HTTP 200, metadados específicos, sem overflow ou erros de runtime.
- Compatibilidade legada confirmada em produção: `/#/instagram` é normalizado para `/instagram`.
- Em 21 de agosto de 2026, a nova copy, os seis destinos do `/instagram`, a galeria humana e a localização foram validados em 1366×900, 390×844 e 360×800: um H1, 15 imagens visualmente únicas, mapa incorporado, rota por coordenadas, alvos de 66–70 px, ausência de overflow, imagens quebradas e erros de runtime.
- A lightbox foi aprovada com abertura, navegação por setas, contador, Escape e fechamento; `prefers-reduced-motion` manteve todos os elementos visíveis e sem transformação.
- `npm run check` aprovado após a integração, com CSS de 49,10 kB (9,42 kB gzip) e JavaScript de 239,00 kB (73,51 kB gzip).
- Em 21 de agosto de 2026, `npm run check` foi aprovado após a integração do formulário com o CRM: 48 módulos, CSS de 50,42 kB (9,63 kB gzip) e JavaScript de 242,24 kB (74,50 kB gzip).
- O proxy `/api/leads` foi validado com CRM local simulado, confirmando bloqueio por origem, assinatura HMAC exata, evento `lead.created` e retorno somente do protocolo; o formulário foi aprovado em desktop e mobile nos fluxos de sucesso e fallback para WhatsApp, sem overflow nem erro de runtime.
- A jornada de diagnóstico foi validada em 1366×900, 390×844 e 360×800: seleção e avanço por teclado, erros acessíveis, revisão, payload com momento operacional, protocolo, fallback preservando dados, alvo principal de 56 px, ausência de overflow e zero erro de runtime.
- A aplicação da skill `animate-new-sections-cleanly` manteve a entrada de etapa em 620 ms com 8 px de deslocamento e grupos inteiros; sob `prefers-reduced-motion`, a duração computada caiu para `0.01 ms` e nenhum conteúdo foi ocultado.
- `npm run check` final aprovado: 48 módulos, CSS de 62,07 kB (11,40 kB gzip) e JavaScript de 249,97 kB (76,76 kB gzip).
- Após a unificação editorial, `npm run check` foi aprovado com 48 módulos, CSS de 66,93 kB (12,02 kB gzip) e JavaScript de 253,42 kB (77,64 kB gzip).
- As oito rotas passaram em 1366×768, 390×844 e 360×800: um H1, imagens íntegras, zero overflow e zero erro de runtime; FAQ, diagnóstico completo com protocolo simulado e `prefers-reduced-motion` também foram aprovados por `tools/capture_site.mjs`.
- Em 22 de agosto de 2026, após o motion editorial recorrente, `npm run check` foi aprovado com 48 módulos, CSS de 67,65 kB (12,16 kB gzip) e JavaScript de 254,20 kB (77,88 kB gzip). A auditoria final aprovou as 24 combinações de rota e viewport, `scroll-motion`, estabilidade de layout, galeria alternada 8/7 e `prefers-reduced-motion`; capturas em `artifacts/motion-review-final/`.
