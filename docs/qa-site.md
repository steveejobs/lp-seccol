# Evidência de QA — site integrado

Data: 15 de agosto de 2026  
Build: produção Vite  
Comando: `node tools\capture_site.mjs http://127.0.0.1:8000/dist/ artifacts\site-v2 --screenshots`

## Cobertura

Foram verificadas as sete rotas em 1366×768 e 390×844, totalizando 14 combinações:

- um H1 por rota;
- ausência de overflow horizontal;
- imagens disponíveis;
- navegação completa;
- ausência de erros de console, página e rede;
- abertura e fechamento do FAQ;
- conteúdo estático e visível com `prefers-reduced-motion`.

Resultado: `validation: PASS` em todas as combinações.

## Build

- Oxlint: aprovado, sem avisos.
- TypeScript: aprovado.
- Build Vite: aprovado.
- CSS: 24,52 kB; 5,52 kB gzip.
- JavaScript: 216,07 kB; 67,26 kB gzip.

## Capturas

`artifacts/site-v2/` contém home, áreas limpas, FAQ e contato em desktop e mobile.

Capturas estáticas comprovam composição e geometria final. A qualidade subjetiva das novas fotografias e o ritmo percebido das transições continuam sujeitos à avaliação humana.

## Revisão de densidade visual e página de links

Validação executada após o redesenho de 15 de agosto de 2026:

- home com 9.197 px de altura em 1440×900, sete capítulos visuais e quatro imagens no total;
- home sem overflow, H1 cortado, imagem quebrada ou erro de runtime nos viewports 1366×768, 1440×900, 360×800, 375×812, 390×844, 412×915 e 430×932;
- CTA principal da hero com 56 px de altura e ainda dentro da primeira dobra nos cinco viewports móveis;
- `prefers-reduced-motion` com conteúdo estático e visível;
- `/instagram` verificada em 360×800, 375×812, 390×844, 412×915 e 430×932;
- cinco links no `/instagram`, incluindo LinkedIn, com alvos entre 65 e 70 px;
- página de links sem cabeçalho, rodapé institucional, overflow horizontal ou erro de runtime;
- capturas de revisão em `artifacts/redesign-review/` e `artifacts/home-redesign/`.

## Galeria humana, localização e nova mensagem — 21 de agosto de 2026

- `npm run check`: lint, TypeScript e build aprovados.
- Oito rotas verificadas em 1366×768 e 390×844, sem overflow horizontal, imagens quebradas ou erros de runtime.
- `/instagram` verificado adicionalmente em 1366×900, 390×844 e 360×800.
- Seis destinos oficiais com alvos mínimos entre 66 e 70 px.
- Quinze fontes visuais únicas entre quinze itens renderizados; três repetições fornecidas foram excluídas da interface.
- Galeria sem recorte, com proporções nativas e carregamento tardio.
- Lightbox aprovada com abertura, imagem seguinte, contador, Escape e fechamento.
- Imóvel, um iframe de mapa e rota por coordenadas presentes; o frame do Google carregou a interface e os dados do mapa.
- `prefers-reduced-motion`: todos os elementos monitorados visíveis e sem transformação.
- Home em 390×844 com a nova headline, sem overflow horizontal e com CTA principal na primeira dobra.

## Jornada de diagnóstico no contato — 21 de agosto de 2026

- quatro etapas percorridas por teclado e ponteiro: sinal, contexto, contato e revisão;
- validação contextual anunciada com `role="alert"`, sem apagar os dados já informados;
- envio simulado ao CRM aprovado, incluindo momento operacional no contexto, consentimento e protocolo final;
- indisponibilidade simulada do CRM preservou a leitura e exibiu o fallback preenchido para WhatsApp;
- desktop 1366×900 e mobile 390×844 inspecionados visualmente; 360×800 validado para teclado, alvo principal de 56 px e ausência de overflow;
- motion de etapa confirmado em 620 ms no modo normal e `0.01 ms` sob `prefers-reduced-motion`;
- auditoria integrada das oito rotas aprovada em 1366×768 e 390×844, sem overflow, imagem quebrada ou erro de runtime;
- capturas de início, revisão e sucesso em `artifacts/contact-journey/`.

## Refinamento editorial de todas as rotas — 21 de agosto de 2026

- introduções internas verificadas com CTA de diagnóstico, três sinais factuais e uma única headline principal;
- listas extensas de testes e instrumentos reorganizadas em índices numerados de três, duas e uma coluna conforme o viewport;
- encerramentos institucionais verificados com CRM como decisão primária e WhatsApp como alternativa;
- `/contato` abre diretamente na jornada e exibe canais diretos apenas depois do diagnóstico;
- fotografia real da equipe e faixa de registros publicados inspecionadas em `/a-seccol`;
- auditor permanente ampliado para 1366×768, 390×844 e 360×800 nas oito rotas, incluindo percurso das quatro etapas e protocolo simulado do CRM;
- nenhum pacote ou biblioteca de animação foi adicionado; novas entradas reutilizam o sistema de 620 ms e respeitam `prefers-reduced-motion`.
- resultado final: `npm run check` e `validation: PASS`; 24 combinações de rota e viewport sem overflow, imagem quebrada ou erro de runtime.

## Motion recorrente e galeria — 22 de agosto de 2026

- `Reveal` configurado para entrada, saída e retorno por scroll nos principais grupos de conteúdo;
- entrada observada na faixa interna de 9% da viewport e saída na faixa de 6%, evitando oscilação e disparo fora do campo de atenção;
- `offsetHeight` do elemento e `scrollHeight` da página comparados antes e depois da saída para confirmar preservação do espaço do layout;
- cards, mídias e texto compartilham 620 ms e o mesmo easing, com variações apenas de opacidade, deslocamento e escala entre `.992` e `.995`;
- galeria com oito itens `gallery-left` e sete `gallery-right`, alternados e limitados a 6 px laterais, sem transformar diretamente as fotografias;
- cabeçalho e navegação mantidos estáticos; hero preservada com timing próprio;
- `prefers-reduced-motion` continua revelando todo o conteúdo imediatamente;
- resultado final: `scroll-motion=PASS`, `gallery-motion=PASS (8/7)`, `reduced-motion=PASS` e `validation: PASS`; capturas em `artifacts/motion-review-final/`.
