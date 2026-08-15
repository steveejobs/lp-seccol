# Sistema de seções

| Seção | Função | Silhueta | Elemento dominante | Movimento | CTA |
|---|---|---|---|---|---|
| Hero inicial | apresentar oferta e estabelecer confiança | editorial assimétrica no desktop; composição própria no mobile | fotografia técnica e H1 | expansão única da mídia e assentamento tipográfico | solicitar orçamento |
| Intro interna | contextualizar cada rota | texto e mídia em duas áreas no desktop; sequência vertical no mobile | H1 e fotografia | entrada uniforme em grupos | navegação global |
| Conteúdo institucional | explicar tese e atuação | título amplo, texto curto e grid | headline e conteúdo | reveal de 620 ms | contextual |
| Grade técnica | organizar serviços, testes e instrumentos | três colunas desktop; lista mobile | nomes e explicações | stagger limitado a 180 ms | ação ao final |
| Lista operacional | apresentar escopos extensos sem cards | quatro colunas desktop; lista linear mobile | conteúdo técnico | reveal do grupo | ação ao final |
| FAQ | responder dúvidas | acordeão linear | perguntas | expansão funcional e motion curto | contato |
| Ação | converter | bloco cromático amplo | headline e botão | reveal uniforme | WhatsApp real |
| Rodapé | fechar a navegação | grade institucional | contato e endereço | estático | orçamento |

## Regras aplicadas

- Desktop: seções principais usam `min-height: 100svh`; conteúdo extenso pode crescer para não ser cortado.
- Mobile: composição natural, sem forçar altura de viewport.
- Nenhuma seção usa tópico, eyebrow ou etiqueta antes da headline.
- Imagens não possuem numeração, legenda pequena ou descrição visual sobreposta.
- Fora da hero, a entrada e a saída usam 620 ms, deslocamento máximo de 10 px e somente `opacity`/`transform`.
- Trocas de rota usam View Transitions quando disponíveis e fallback de entrada quando não estão.
- `prefers-reduced-motion` remove transformações e mantém todo o conteúdo visível.
