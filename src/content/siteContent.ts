export const company = {
  email: 'contato@seccol.com.br',
  whatsapp: 'https://api.whatsapp.com/send?1=pt_BR&phone=5562982468283',
  phone: '(62) 3275-1272',
  mobile: '(62) 9 8246-8283',
  address: 'R. C-27, nº 202, quadra 18, Lote 13 — Jardim América, Goiânia — GO, 74265-170',
  hours: 'Segunda à sexta, das 08h às 18h',
  instagram: 'https://www.instagram.com/seccolcertificacao/',
  facebook: 'https://www.facebook.com/seccolcertificacao/',
} as const

export const services = [
  { title: 'Área limpa', text: 'Áreas com controle ambiental utilizadas para reduzir a introdução de contaminantes.' },
  { title: 'Cabine de segurança biológica', text: 'Contenção primária para minimizar a exposição do produto e do ambiente.' },
  { title: 'Capela de exaustão', text: 'Barreira física entre reações químicas e o ambiente de laboratório.' },
  { title: 'Fluxo unidirecional', text: 'Manipulação segura de materiais biológicos ou estéreis sensíveis à contaminação.' },
  { title: 'Projetos para área limpa', text: 'Avaliação de espaços, definição de fluxos e elaboração de processos produtivos.' },
  { title: 'Projetos para centro cirúrgico', text: 'Elaboração e execução por profissionais com experiência publicada na área.' },
  { title: 'Monitoramento de descontaminação', text: 'Monitoramento de unidades de descontaminação e ventilação com base em normas.' },
] as const

export const segments = [
  'Reprodução assistida', 'Análise laboratorial', 'Oncologia', 'Indústria farmacêutica',
  'Centro cirúrgico', 'Fertilização animal', 'Instituto de pesquisa',
  'Nutrição parenteral e enteral', 'Alimentos', 'Cosméticos', 'Injetáveis',
  'Produtos químicos', 'Indústria agropecuária', 'Universidades', 'Laboratório P3',
] as const

export const equipmentTests = [
  'Velocidade e uniformidade do fluxo de ar',
  'Velocidade do fluxo de ar de face (inflow)',
  'Diferença de pressão do sistema de filtragem HEPA/ULPA',
  'Detecção de vazamentos no sistema de filtragem HEPA/ULPA',
  'Sentido e visualização do fluxo de ar por fumaça',
  'Contagem de partículas em suspensão no ar',
  'Avaliação dos alarmes da cabine de segurança biológica',
  'Intensidade de iluminação', 'Vibração', 'Ruído',
  'Inspeção ou substituição de filtros grossos e HEPA',
  'Balanceamento do sistema de insuflamento e exaustão',
  'Limpeza da parte interna do equipamento',
  'Eficiência de radiação de lâmpadas germicidas ou ultravioletas',
  'Pressão diferencial e grau de saturação dos filtros HEPA',
  'Tensão e corrente elétrica do motor',
  'Reparo no meio filtrante ou na estrutura dos filtros HEPA',
  'Revisão do manômetro de pressão diferencial',
  'Revisão dos selos de vedação',
  'Verificação de componentes eletromecânicos',
] as const

export const cleanRoomTests = [
  'Integridade e estanqueidade dos filtros HEPA (PAO)',
  'Pressão diferencial e grau de saturação dos filtros HEPA',
  'Cálculo de vazão do ar insuflado', 'Número de trocas de ar por hora',
  'Luminosidade das salas', 'Nível de ruído das salas',
  'Balanceamento do sistema de insuflamento e retorno',
  'Contagem eletrônica de partículas em suspensão no ar',
  'Medição da vazão do ar insuflado', 'Teste de recuperação',
  'Pressão diferencial entre salas',
] as const

export const instruments = [
  { title: 'Contador de partículas', text: 'Conta e discrimina individualmente partículas em suspensão no ar. Os equipamentos publicados possuem calibração anual conforme a ISO 21501-4.' },
  { title: 'Fotômetro e gerador de aerossol (PAO)', text: 'Conjunto utilizado para verificar a integridade dos filtros HEPA. Os fotômetros publicados possuem calibração anual.' },
  { title: 'Balometer', text: 'Mede vazão do ar, pressão, temperatura, umidade e velocidade do ar.' },
  { title: 'Luxímetro', text: 'Mede a iluminância de um ambiente.' },
  { title: 'Decibelímetro', text: 'Mede a pressão sonora e a intensidade do som.' },
  { title: 'Termoanemômetro', text: 'Instrumento de fio quente utilizado em testes de velocidade de baixo fluxo de ar.' },
  { title: 'Manômetro digital', text: 'Mede o diferencial de pressão entre ambientes e o nível de saturação dos filtros.' },
  { title: 'Alicate amperímetro', text: 'Permite medir corrente elétrica sem interromper o circuito.' },
  { title: 'Ampola de fumaça', text: 'Permite visualizar movimentação e fluxo de ar em salas, cabines e frestas.' },
  { title: 'Termohigrômetro', text: 'Mede temperatura e umidade relativa do ar no ambiente ou equipamento.' },
  { title: 'Radiômetro UVC', text: 'Mede a emissão de luz ultravioleta UV-C utilizada em superfícies e equipamentos.' },
  { title: 'VHP', text: 'Vapor de peróxido de hidrogênio para biodescontaminação, compatível com diversos materiais.' },
] as const

export const faqs = [
  { question: 'Quando foi fundada a Seccol?', answer: 'A Seccol foi fundada em 2009 e informa possuir profissionais com mais de 15 anos de experiência na área.' },
  { question: 'Qual é a especialidade da Seccol?', answer: 'Controle de Contaminação Ambiental, com serviços de manutenção, reforma, venda e certificação em equipamentos e áreas limpas.' },
  { question: 'Qual é a área de atuação?', answer: 'A empresa atende diversos segmentos, entre eles reprodução assistida, análises laboratoriais, oncologia, centros cirúrgicos, indústrias, universidades e laboratórios P3.' },
  { question: 'Quais serviços são prestados?', answer: 'Manutenção, reforma, venda e certificação em equipamentos de fluxo unidirecional, cabines de segurança biológica, capelas de exaustão e áreas limpas, além de projetos e monitoramento.' },
  { question: 'A Seccol possui registros nos órgãos responsáveis?', answer: 'A empresa publica registros no CREA, na SBCC e na Vigilância Sanitária e Ambiental da Secretaria Municipal de Saúde de Goiânia.' },
  { question: 'Qual é o principal objetivo da empresa?', answer: 'Evitar paradas prolongadas nos processos dos clientes por meio de prevenção e definição de prazos para substituição de materiais sobressalentes, como filtros HEPA e motores elétricos.' },
  { question: 'O que é o teste em área limpa?', answer: 'Os testes verificam condições de ambientes controlados destinados a reduzir e controlar partículas em suspensão no ar.' },
  { question: 'Como iniciar uma parceria com a Seccol?', answer: 'Entre em contato com a equipe por um dos canais publicados e solicite uma visita ou orçamento.' },
] as const
