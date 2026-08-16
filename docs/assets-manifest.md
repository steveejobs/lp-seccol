# Manifesto de assets

## Fotografia gerada para a nova direção

| Original preservado | Publicado | Dimensões | Peso | Uso |
|---|---|---:|---:|---|
| `assets/generated-originals/hero-technical.png` | `public/media/generated/hero-technical.webp` | 1536×1024 | 87.918 B | home e testes em equipamentos |
| `assets/generated-originals/cleanroom-certification.png` | `public/media/generated/cleanroom-certification.webp` | 1536×1024 | 105.528 B | áreas limpas |
| `assets/generated-originals/instrument-calibration.png` | `public/media/generated/instrument-calibration.webp` | 1536×1024 | 135.728 B | instrumentos e FAQ |
| `assets/generated-originals/technical-team.png` | `public/media/generated/technical-team.webp` | 1536×1024 | 92.372 B | empresa, contato e estrutura |

As quatro imagens foram geradas pelo modo integrado da skill `imagegen` em 15 de agosto de 2026 e otimizadas com `tools/optimize_images.py`. São direção visual institucional; não documentam colaboradores, clientes, instalações ou instrumentos específicos da Seccol e não sustentam claims técnicos.

## Marca

| Original | Publicado | Estado |
|---|---|---|
| `reference/site-original/images/logo.png` | `public/brand/seccol-logo.png` | transparência externa removida; baixa resolução; substituir por vetor oficial quando disponível |
| `public/brand/seccol-logo.png` | `public/favicon.png` e `public/favicon.ico` | recorte exato de 22×20 px do símbolo de caixa e check, centralizado em canvas transparente de 32×32 px |

## Regras

- O banco publicado original permanece imutável em `reference/site-original/`.
- Originais gerados ficam separados das versões processadas.
- Imagens não recebem numeração, legendas pequenas ou texto sobreposto.
- Não usar uma imagem gerada como evidência de equipe, instalação, instrumento, certificado ou serviço executado.
- Não sobrescrever os originais; novas iterações recebem arquivos versionados.
