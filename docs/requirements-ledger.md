# Registro de requisitos

Status permitidos: `pendente`, `em implementação`, `aprovado`, `reprovado`, `bloqueado`, `substituído`.

| ID | Intenção | Requisito | Rota | Dispositivo | Prioridade | Status | Evidência | Commit |
|---|---|---|---|---|---|---|---|---|
| RQ-001 | visual | A primeira impressão deve ser institucional, B2B e transmitir alta credibilidade | `/` | todos | P0 | aprovado | direção integrada após avaliação; capturas em `artifacts/site-v2/` | — |
| RQ-002 | visual | Hero deve seguir “Engenharia em evidência”, sem metáforas ou efeitos chamativos | `/` | todos | P0 | aprovado | composição integrada sem carrossel, 3D, partículas ou dashboard | — |
| RQ-003 | content | Proposta da Seccol deve ser compreendida em até três segundos | `/` | todos | P0 | pendente | H1 e descrição visíveis; compreensão requer teste humano | — |
| RQ-004 | conversion | CTA de orçamento deve estar na primeira dobra e ter destino real | `/` | todos | P0 | aprovado | `docs/qa-hero.md`; WhatsApp publicado e CTA mobile dentro do viewport | — |
| RQ-005 | content | A seção inicial deve apresentar provas confirmadas: desde 2009, atuação nacional e registros publicados | `/` | todos | P0 | aprovado | `EvidenceStrip`; fonte em `docs/source-of-truth.md` | — |
| RQ-006 | visual | Hero deve ocupar uma tela completa no desktop | `/` | desktop | P0 | aprovado | 768/768 px e 900/900 px em `docs/qa-hero.md` | — |
| RQ-007 | visual | Mobile deve ter composição própria, não ser desktop empilhado | `/` | mobile | P0 | aprovado | ordem intro → mídia → decisão → evidências; capturas em `artifacts/hero-v2/` | — |
| RQ-008 | accessibility | Interações devem ter foco visível, alvo mínimo de 44 px e reduced motion | `/` | todos | P0 | aprovado | CTA 56 px; regras de foco; teste reduced motion em `docs/qa-hero.md` | — |
| RQ-009 | technical | Não pode existir overflow horizontal nos viewports críticos | `/` | todos | P0 | aprovado | sete viewports sem overflow em `docs/qa-hero.md` | — |
| RQ-010 | technical | Mídia publicada deve ser otimizada, ter proporção reservada e origem rastreável | todas | todos | P1 | aprovado | `docs/assets-manifest.md`; quatro WebP 1536×1024 | — |
| RQ-011 | interaction | Motion deve possuir entrada estrutural, terminar em repouso e não bloquear leitura | `/` | todos | P1 | pendente | implementação e fallback aprovados tecnicamente; falta evidência temporal e crítica humana | — |
| RQ-012 | visual | Imagem deve preservar o instrumento e a ação técnica em desktop e mobile | `/` | todos | P0 | aprovado | capturas em `artifacts/hero-v2/` | — |
| RQ-013 | process | Áreas aprovadas só podem mudar com escopo explícito e nova validação | todas | todos | P0 | aprovado | `AGENTS.md` e `PROJECT.md` | — |
| RQ-014 | architecture | O conteúdo da referência deve existir em várias páginas funcionais | todas | todos | P0 | aprovado | sete rotas validadas em `docs/qa-site.md` | — |
| RQ-015 | visual | Seções não devem ter tópicos, etiquetas ou eyebrows antes das headlines | todas | todos | P0 | aprovado | componentes `PageIntro` e seções sem pre-heading | — |
| RQ-016 | visual | Imagens e galerias não devem possuir numeração ou pequenas descrições visuais | todas | todos | P0 | aprovado | imagens sem índice ou `figcaption` | — |
| RQ-017 | interaction | Rotas e seções devem possuir entrada e saída acessíveis | todas | todos | P1 | aprovado | View Transitions com fallback; Reveal; reduced motion aprovado | — |
| RQ-018 | functional | Navegação, FAQ e canais de contato precisam funcionar | todas | todos | P0 | aprovado | navegação em 14 combinações; FAQ abre/fecha; contatos reais | — |
