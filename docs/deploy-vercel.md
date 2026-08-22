# Deploy na Vercel

Produção: https://sivs-seccol.vercel.app

Último deploy validado: 15 de agosto de 2026.

## Configuração versionada

O projeto publica um build estático do Vite. A configuração em `vercel.json` fixa os valores usados no deploy:

- framework: Vite;
- instalação: `npm ci`;
- build: `npm run build`;
- diretório de saída: `dist`;
- runtime: Node.js 24, declarado em `package.json`.

As rotas do site usam URLs reais (`/a-seccol`, `/areas-limpas`, `/instagram` etc.). O `vercel.json` reescreve as requisições para `index.html`, permitindo abrir e atualizar qualquer rota diretamente sem erro 404. Os endereços antigos com hash continuam sendo normalizados para a URL equivalente.

## Primeiro deploy pelo GitHub

1. Enviar este commit para a branch `main` de `steveejobs/lp-seccol`.
2. Na Vercel, importar `steveejobs/lp-seccol` ou alterar a conexão Git do projeto existente para esse repositório.
3. Manter **Root Directory** vazio, pois `package.json` e `vercel.json` estão na raiz.
4. Não sobrescrever Framework Preset, Build Command, Install Command ou Output Directory no painel. Se houver overrides antigos, removê-los para que `vercel.json` seja a fonte versionada.
5. Disparar um novo deploy da branch `main` sem reaproveitar o cache da tentativa anterior.

O primeiro deploy corrigido foi feito pela CLI a partir deste workspace e vinculado ao projeto `sivs-seccol`. A integração Git do projeto também foi atualizada para `steveejobs/lp-seccol`; depois que esta configuração estiver na branch `main`, novos pushes gerarão deploys automáticos.

## Integração do formulário com o CRM

O diretório `api/` contém a função server-side que recebe o formulário e o encaminha de forma assinada ao Sistema Seccol. Antes do deploy, configure na Vercel, para Production e Preview quando aplicável:

```text
SIVS_CRM_BASE_URL=https://oziresmoreira.online
SIVS_WEBSITE_LEADS_SECRET=<mesmo segredo configurado no Dokploy>
```

Essas variáveis são exclusivas do servidor e não devem receber o prefixo `VITE_`. O contrato completo e o teste de ponta a ponta estão descritos em `docs/crm-integration.md`.

## Diagnóstico

Antes de publicar, executar:

```powershell
npm ci
npm run check
```

A tentativa relatada em 15 de agosto de 2026 clonou `steveejobs/SIVS-Seccol` no commit `c61de70`. Esse não é o repositório deste workspace, cujo remoto é `steveejobs/lp-seccol`. As linhas do log até `Cloning completed` indicam sucesso do clone, não o erro de build; qualquer falha remanescente deve ser analisada a partir das linhas posteriores do log.
