# Banco de referência — site atual da Seccol

Esta pasta é uma fonte de consulta para a criação do novo site. Ela não é a aplicação ativa e não deve ser usada como base de código visual.

## Fonte e data

- Site consultado: https://seccol.com.br/
- Captura realizada em: 15 de agosto de 2026
- Escopo: todos os arquivos públicos encontrados no mesmo domínio, incluindo sete páginas, imagens, CSS, JavaScript e fontes.

## Onde consultar

- `catalog/knowledge-base.json`: fatos comerciais organizados, serviços, segmentos, testes, instrumentos e contatos.
- `catalog/pages.json`: inventário literal de textos, títulos, links, imagens e formulários de cada página.
- `catalog/images.json`: dimensões, formato, tamanho, hash e locais de uso das imagens.
- `catalog/image-contact-sheet.jpg`: visão rápida de todas as imagens.
- `catalog/manifest.json`: inventário técnico e SHA-256 dos 81 arquivos capturados.
- `site-original/`: captura imutável do conteúdo público original.

## Regra de precisão

1. Não editar arquivos dentro de `site-original/`.
2. Não corrigir silenciosamente grafia, datas, nomes de segmentos ou afirmações do site antigo.
3. Ao escrever o novo site, consultar primeiro `knowledge-base.json` e confirmar a redação em `pages.json` ou no HTML original.
4. Qualquer informação nova ou correção fornecida pela Seccol deve ser registrada separadamente como atualização aprovada.
5. Os hashes do `manifest.json` permitem comprovar que os arquivos de origem não foram alterados.

## Limitações explícitas

Os códigos PHP que processam os formulários rodam no servidor e não são públicos; por isso, não fazem parte da captura. As ações e os campos publicados foram inventariados. Google Maps, Google Fonts, redes sociais, WhatsApp e o carregador externo da RD Station permanecem identificados como dependências externas.

## Regeneração

Execute `python tools/build_reference_bank.py` na raiz do projeto para reconstruir os inventários a partir da captura imutável.
