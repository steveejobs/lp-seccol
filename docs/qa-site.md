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
