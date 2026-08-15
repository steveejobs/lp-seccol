# Evidência de QA — hero “Engenharia em evidência”

Data: 15 de agosto de 2026  
Alvo: build de produção servido em `http://127.0.0.1:8000/dist/`  
Comando: `node tools\capture_ui.mjs http://127.0.0.1:8000/dist/ artifacts\hero-v2 --screenshots`

## Resultado automatizado

| Viewport | Overflow horizontal | H1 | Hero | Imagem | CTA principal | Runtime |
|---|---|---|---:|---|---|---|
| 1366×768 | não | 1, íntegro | 768 px | carregada | 213×56 px; base 589 px | 0 erros |
| 1440×900 | não | 1, íntegro | 900 px | carregada | 213×56 px; base 704 px | 0 erros |
| 430×932 | não | 1, íntegro | 1215 px | carregada | 398×56 px; base 875 px | 0 erros |
| 412×915 | não | 1, íntegro | 1202 px | carregada | 380×56 px; base 861 px | 0 erros |
| 390×844 | não | 1, íntegro | 1171 px | carregada | 358×56 px; base 832 px | 0 erros |
| 375×812 | não | 1, íntegro | 1097 px | carregada | 343×56 px; base 762 px | 0 erros |
| 360×800 | não | 1, íntegro | 1090 px | carregada | 328×56 px; base 750 px | 0 erros |

`prefers-reduced-motion`: dois elementos monitorados; ambos estáticos, sem transformação, sem animação e visíveis. Resultado final do verificador: `validation: PASS`.

## Verificações de build

- Oxlint: aprovado.
- TypeScript: aprovado.
- Vite build: aprovado.
- CSS: 11,82 kB; 3,40 kB gzip.
- JavaScript: 195,46 kB; 61,70 kB gzip.

## Evidência visual

Capturas finais: `artifacts/hero-v2/desktop-1366.png`, `desktop-1440.png` e os cinco arquivos `mobile-*`.

As capturas comprovam geometria final e enquadramento, não o ritmo temporal. O motion precisa de crítica humana em execução antes de RQ-011 e da direção visual serem aprovados.
