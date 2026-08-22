# Integração do formulário com o CRM

## Fluxo implementado

```text
/contato
  -> POST /api/leads (Vercel, sem segredo no navegador)
  -> POST /api/integrations/website/leads (Sistema Seccol)
  -> CRM / Novo lead
```

O site aceita somente JSON da mesma origem, valida o formulário, aplica honeypot e tempo mínimo de preenchimento, cria um evento `lead.created` e assina o corpo com HMAC-SHA256. O SIVS confere assinatura e horário, limita requisições, valida novamente os campos e grava o lead na empresa configurada. O `id` externo torna a operação idempotente: repetir a mesma entrega não cria outro registro.

Antes do envio, a interface conduz a pessoa por sinal percebido, momento operacional, contato e revisão. O momento selecionado é incorporado ao início de `lead.details`; assim, o CRM recebe o contexto organizado sem ampliar o contrato nem criar um campo incompatível com versões anteriores. Voltar entre etapas não perde dados, e uma falha de rede mantém toda a leitura disponível para nova tentativa ou envio pelo WhatsApp.

## Variáveis de produção

Na Vercel do `lp-seccol`:

```text
SIVS_CRM_BASE_URL=https://oziresmoreira.online
SIVS_WEBSITE_LEADS_SECRET=<segredo aleatório com pelo menos 32 caracteres>
```

No Dokploy do `SIVS-Seccol`:

```text
SIVS_WEBSITE_LEADS_COMPANY_ID=<id da empresa SECCOL no SQLite>
SIVS_WEBSITE_LEADS_SECRET=<o mesmo segredo da Vercel>
```

O segredo nunca deve usar prefixo `VITE_`, ser salvo em Git ou aparecer no navegador. Gere um valor diferente dos demais segredos da empresa. No PowerShell:

```powershell
[Convert]::ToHexString([Security.Cryptography.RandomNumberGenerator]::GetBytes(32)).ToLower()
```

## Contrato enviado ao SIVS

Cabeçalhos:

```text
Content-Type: application/json
X-Seccol-Timestamp: <Unix timestamp em segundos>
X-Seccol-Signature: sha256=<HMAC de "timestamp.corpo-json">
```

Evento:

```json
{
  "version": "1.0",
  "event": "lead.created",
  "id": "UUID idempotente",
  "occurredAt": "2026-08-21T15:30:00.000Z",
  "source": {
    "page": "https://seccol.com.br/contato",
    "referrer": "",
    "utm": { "source": "", "medium": "", "campaign": "", "term": "", "content": "" }
  },
  "lead": {
    "name": "Nome",
    "company": "Empresa",
    "phone": "+55 62 99999-9999",
    "email": "contato@empresa.com.br",
    "location": "Goiânia, GO",
    "need": "Certificação de área limpa",
    "details": "Contexto informado no formulário.",
    "consent": true
  }
}
```

## Prompt reutilizável para manutenção do sistema

```text
Trabalhe no repositório SIVS-Seccol e leia integralmente AGENTS.md e PROJECT_CONTEXT.md antes de alterar arquivos. Preserve multiempresa, permissões, auditoria, validação no servidor, contratos de IDs, acessibilidade e prefers-reduced-motion.

Audite e mantenha a integração POST /api/integrations/website/leads com o site lp-seccol. O endpoint deve permanecer público apenas no sentido de não exigir sessão, mas deve exigir HMAC-SHA256 usando SIVS_WEBSITE_LEADS_SECRET, X-Seccol-Timestamp com janela máxima de 5 minutos e X-Seccol-Signature calculada sobre "timestamp.corpo-json". A empresa de destino deve vir exclusivamente de SIVS_WEBSITE_LEADS_COMPANY_ID, nunca do payload. Valide novamente todos os campos, limite o corpo, aplique rate limit, não registre conteúdo do formulário na telemetria e preserve idempotência pelo id externo.

Cada evento lead.created válido deve criar exatamente um registro no módulo crm, com status e etapa "Novo lead", origem "Site institucional", dados de contato, necessidade, contexto, URL/UTMs e consentimento. Crie notificação interna sem expor segredos. Mantenha no CRM a visualização rápida "Novos leads" e os campos empresa informada, telefone, e-mail e localização. Não crie automaticamente um cliente cadastrado: a conversão de lead em cliente exige revisão humana.

Antes de concluir, teste assinatura válida, assinatura adulterada, repetição idempotente, empresa inexistente, payload inválido e isolamento multiempresa. Execute toda a validação obrigatória descrita em PROJECT_CONTEXT.md, atualize o diário de evolução e informe as variáveis que ainda precisam ser configuradas no Dokploy.
```
