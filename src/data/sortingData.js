// 15-step Adaptive Branching Sorting Ceremony
// Each choice awards weighted points across multiple houses & Founder virtues,
// never eliminating any house prematurely.

export const SORTING_QUESTIONS = [
  // ================= FASE 1: DESPERTAR & INSTINTO (Passos 1-4) =================
  {
    id: "q_relic_founders",
    phase: "core",
    type: "relic",
    title: "A Mesa das Relíquias",
    subtitle: "Antes de vestir o Chapéu Seletor, quatro objetos antigos repousam sobre uma mesa de carvalho. Qual deles atrai sua mão primeiro?",
    options: [
      {
        id: "sword",
        label: "Espada Cravejada de Rubis",
        detail: "Fria ao toque, mas parece vibrar com a promessa de batalhas justas.",
        icon: "sword",
        accent: "#ae0001",
        weights: { gryffindor: 4, hufflepuff: 1, slytherin: 1 },
        virtues: { courage: 3, daring: 2 },
      },
      {
        id: "locket",
        label: "Medalhão de Ouro e Esmeralda",
        detail: "Pesado e fechado por um enigma antigo; guarda segredos de linhagem e poder.",
        icon: "locket",
        accent: "#1a472a",
        weights: { slytherin: 4, ravenclaw: 1, gryffindor: 1 },
        virtues: { ambition: 3, cunning: 2 },
      },
      {
        id: "diadem",
        label: "Diadema de Prata com Safiras",
        detail: "Iridescente sob a luz das velas; dizem que clareia a mente de quem o usa.",
        icon: "diadem",
        accent: "#2a4d8f",
        weights: { ravenclaw: 4, slytherin: 1, hufflepuff: 1 },
        virtues: { wisdom: 3, curiosity: 2 },
      },
      {
        id: "cup",
        label: "Taça Dourada de Duas Alças",
        detail: "Emite um calor reconfortante, como o pão recém-saído do forno nas cozinhas.",
        icon: "cup",
        accent: "#d4af37",
        weights: { hufflepuff: 4, gryffindor: 1, ravenclaw: 1 },
        virtues: { loyalty: 3, fairness: 2 },
      },
    ],
  },
  {
    id: "q_sensory_sanctuary",
    phase: "core",
    type: "sensory",
    title: "O Refúgio Ideal em Hogwarts",
    subtitle: "Você tem uma noite livre após os exames. Onde sua magia se sente mais em casa?",
    options: [
      {
        id: "hearth",
        label: "Lareira Crepitante na Torre",
        detail: "Risadas altas, calor intenso e o cheiro de pergaminho chamuscado após um duelo amistoso.",
        icon: "flame",
        accent: "#d94e1f",
        weights: { gryffindor: 3, hufflepuff: 2 },
        virtues: { daring: 2, courage: 2, loyalty: 1 },
      },
      {
        id: "lake",
        label: "Janelas Submersas sob o Lago Negro",
        detail: "Luz esverdeada filtrada pela água, silêncio estratégico e a companhia de poucos confiáveis.",
        icon: "waves",
        accent: "#1f7a4c",
        weights: { slytherin: 3, ravenclaw: 2 },
        virtues: { cunning: 2, ambition: 2, wisdom: 1 },
      },
      {
        id: "observatory",
        label: "Torre de Astronomia sob a Chuva",
        detail: "Mapas estelares, brisa fria, o som da chuva nas vidraças e um livro raro aberto.",
        icon: "sparkles",
        accent: "#3b69c4",
        weights: { ravenclaw: 3, gryffindor: 1, slytherin: 1 },
        virtues: { curiosity: 3, wisdom: 2 },
      },
      {
        id: "greenhouse",
        label: "Estufa Iluminada ao Amanhecer",
        detail: "Aroma de terra úmida, ervas mágicas crescendo e uma xícara de chá compartilhada.",
        icon: "leaf",
        accent: "#c9971a",
        weights: { hufflepuff: 3, ravenclaw: 1, gryffindor: 1 },
        virtues: { fairness: 2, loyalty: 2, curiosity: 1 },
      },
    ],
  },
  {
    id: "q_spell_boggart",
    phase: "core",
    type: "spell",
    title: "Encontro no Corredor Escuro",
    subtitle: "Um Bicho-Papão salta de um armário trancado diante de você e de um colega assustado. Qual é seu primeiro reflexo com a varinha?",
    options: [
      {
        id: "riddikulus_front",
        label: "Avanço à frente do colega e lanço Riddikulus",
        detail: "Mesmo sem saber qual será a forma do medo, coloco-me entre o perigo e o outro.",
        spell: "Riddikulus!",
        accent: "#ae0001",
        weights: { gryffindor: 4, hufflepuff: 2 },
        virtues: { courage: 3, daring: 2 },
      },
      {
        id: "analyze_weakness",
        label: "Observo o padrão da criatura antes de agir",
        detail: "Identifico rapidamente do que ela se alimenta para escolher o ângulo exato do feitiço.",
        spell: "Legilimens / Análise",
        accent: "#3b69c4",
        weights: { ravenclaw: 3, slytherin: 2 },
        virtues: { wisdom: 3, cunning: 1 },
      },
      {
        id: "lock_and_leverage",
        label: "Uso Colloportus ou Protego para controlar o espaço",
        detail: "Não entro em combate sem vantagem; contenho a ameaça e garanto nossa saída.",
        spell: "Protego Maxima!",
        accent: "#1f7a4c",
        weights: { slytherin: 3, ravenclaw: 2 },
        virtues: { cunning: 3, ambition: 1 },
      },
      {
        id: "shield_friend",
        label: "Seguro a mão do colega e conjuramos juntos",
        detail: "O Bicho-Papão se confunde diante de duas pessoas — juntos somos mais fortes.",
        spell: "Lumos Duo!",
        accent: "#d4af37",
        weights: { hufflepuff: 4, gryffindor: 2 },
        virtues: { loyalty: 3, fairness: 2 },
      },
    ],
  },
  {
    id: "q_scale_instinct_strategy",
    phase: "core",
    type: "scale",
    title: "A Balança da Decisão",
    subtitle: "Diante de uma porta misteriosa no terceiro andar, onde você posiciona o pêndulo da sua mente?",
    leftLabel: "Impulso & Coragem Imediata",
    rightLabel: "Cálculo & Planejamento Frio",
    steps: [
      {
        label: "100% Instinto",
        weights: { gryffindor: 4, hufflepuff: 1 },
        virtues: { daring: 3, courage: 2 },
      },
      {
        label: "Mais Instinto",
        weights: { gryffindor: 2, hufflepuff: 2 },
        virtues: { courage: 2, loyalty: 1 },
      },
      {
        label: "Equilíbrio",
        weights: { hufflepuff: 2, ravenclaw: 2, gryffindor: 1, slytherin: 1 },
        virtues: { fairness: 2, wisdom: 1 },
      },
      {
        label: "Mais Cálculo",
        weights: { ravenclaw: 2, slytherin: 2 },
        virtues: { wisdom: 2, cunning: 2 },
      },
      {
        label: "100% Estratégia",
        weights: { slytherin: 4, ravenclaw: 2 },
        virtues: { cunning: 3, ambition: 2 },
      },
    ],
  },
  {
    id: "q_potion_cauldron",
    phase: "core",
    type: "sensory",
    title: "O Frasco de Amortentia",
    subtitle: "Na aula do Professor Slughorn, quatro frascos brilham com efeitos distintos. Qual você escolheria para guardar no bolso em um ano difícil?",
    options: [
      {
        id: "felix",
        label: "Felix Felicis (Sorte Líquida)",
        detail: "Um único gole para transformar uma oportunidade impossível em triunfo absoluto.",
        icon: "sparkles",
        accent: "#d4af37",
        weights: { slytherin: 3, gryffindor: 2 },
        virtues: { ambition: 3, daring: 2 },
      },
      {
        id: "wit",
        label: "Poção da Clareza Mental",
        detail: "Desbloqueia conexões ocultas e dissolve qualquer névoa de dúvida intelectual.",
        icon: "flask",
        accent: "#3b69c4",
        weights: { ravenclaw: 4, slytherin: 1 },
        virtues: { wisdom: 3, curiosity: 2 },
      },
      {
        id: "pepperup",
        label: "Elixir da Resistência",
        detail: "Mantém você de pé para ajudar sua equipe até o último segundo sem fraquejar.",
        icon: "heart",
        accent: "#c9971a",
        weights: { hufflepuff: 4, gryffindor: 1 },
        virtues: { loyalty: 3, fairness: 2 },
      },
      {
        id: "lionheart",
        label: "Essência de Coração de Leão",
        detail: "Dissipa o pânico em momentos críticos para que você não recue.",
        icon: "flame",
        accent: "#ae0001",
        weights: { gryffindor: 4, hufflepuff: 1 },
        virtues: { courage: 3, daring: 2 },
      },
    ],
  },

  // ================= FASE 2: RAMIFICAÇÕES POR PARES DE CASAS (Passos 6-11) =================
  // Gryffindor vs Slytherin
  {
    id: "q_branch_gs_1",
    phase: "branch",
    pairMatch: ["gryffindor", "slytherin"],
    type: "dilemma",
    title: "O Preço da Vitória no Quadribol",
    subtitle: "Faltam segundos para o fim da partida. Você percebe que o Apanhador adversário está prestes a pegar o Pomo, mas há uma brecha arriscada — e uma manobra quase ilegal que o árbitro não veria.",
    options: [
      {
        id: "dive_fair",
        label: "Mergulho em queda livre, tudo ou nada, dentro das regras",
        detail: "Prefiro perder com honra do que vencer com uma manobra suja.",
        weights: { gryffindor: 4, hufflepuff: 2 },
        virtues: { courage: 3, fairness: 2 },
      },
      {
        id: "feint_foul",
        label: "Uso um blefe tático para forçar o erro dele sem ser pego",
        detail: "O jogo recompensa quem lê os limites da regra e quer vencer acima de tudo.",
        weights: { slytherin: 4, ravenclaw: 1 },
        virtues: { cunning: 3, ambition: 2 },
      },
      {
        id: "team_signal",
        label: "Sinalizo aos batedores para abrir caminho limpo",
        detail: "Confio na coordenação do time para criar a chance real.",
        weights: { hufflepuff: 3, gryffindor: 2 },
        virtues: { loyalty: 2, courage: 1 },
      },
    ],
  },
  {
    id: "q_branch_gs_2",
    phase: "branch",
    pairMatch: ["gryffindor", "slytherin"],
    type: "scale",
    title: "O Legado que Você Busca",
    subtitle: "Quando seu nome for lembrado nos livros de História da Magia, o que importa mais?",
    leftLabel: "Ter defendido os vulneráveis",
    rightLabel: "Ter alcançado grandeza e influência",
    steps: [
      { label: "Total Altruísmo", weights: { gryffindor: 3, hufflepuff: 3 }, virtues: { courage: 2, fairness: 3 } },
      { label: "Mais Nobreza", weights: { gryffindor: 3, hufflepuff: 1 }, virtues: { courage: 2, daring: 1 } },
      { label: "Ambos", weights: { gryffindor: 2, slytherin: 2 }, virtues: { ambition: 1, courage: 1 } },
      { label: "Mais Ambição", weights: { slytherin: 3, ravenclaw: 1 }, virtues: { ambition: 2, cunning: 2 } },
      { label: "Total Grandeza", weights: { slytherin: 4, ravenclaw: 1 }, virtues: { ambition: 3, cunning: 2 } },
    ],
  },

  // Gryffindor vs Ravenclaw
  {
    id: "q_branch_gr_1",
    phase: "branch",
    pairMatch: ["gryffindor", "ravenclaw"],
    type: "dilemma",
    title: "O Livro da Seção Reservada",
    subtitle: "Você descobre um tomo proibido que explica um feitiço poderoso, mas perigoso e incompleto. Um colega está em apuros e o feitiço pode ajudar.",
    options: [
      {
        id: "test_now",
        label: "Uso o feitiço mesmo sem dominar 100% — o tempo urge!",
        detail: "Ação imperfeita agora vale mais do que perfeição tarde demais.",
        weights: { gryffindor: 4, hufflepuff: 1 },
        virtues: { daring: 3, courage: 2 },
      },
      {
        id: "decode_first",
        label: "Decifro as runas marginais antes de lançar qualquer coisa",
        detail: "Um erro de pronúncia ou intenção pode causar um desastre ainda maior.",
        weights: { ravenclaw: 4, slytherin: 1 },
        virtues: { wisdom: 3, curiosity: 2 },
      },
      {
        id: "alternative_plan",
        label: "Busco uma saída criativa combinando feitiços conhecidos",
        detail: "Uso o que já domino de forma inesperada.",
        weights: { ravenclaw: 3, gryffindor: 2 },
        virtues: { curiosity: 2, daring: 1 },
      },
    ],
  },

  // Gryffindor vs Hufflepuff
  {
    id: "q_branch_gh_1",
    phase: "branch",
    pairMatch: ["gryffindor", "hufflepuff"],
    type: "dilemma",
    title: "Quando um Amigo Erra Feio",
    subtitle: "Seu melhor amigo cometeu uma injustiça grave contra um aluno mais novo e pede que você fique em silêncio.",
    options: [
      {
        id: "confront_public",
        label: "Confronto ele imediatamente, doa a quem doer",
        detail: "Lealdade verdadeira não significa ser cúmplice do erro.",
        weights: { gryffindor: 4, ravenclaw: 1 },
        virtues: { courage: 3, fairness: 2 },
      },
      {
        id: "repair_together",
        label: "Acolho em privado, mas o convenço a reparar o dano pessoalmente",
        detail: "Não o abandono, mas exijo responsabilidade e cuidado com quem foi ferido.",
        weights: { hufflepuff: 4, gryffindor: 2 },
        virtues: { loyalty: 3, fairness: 3 },
      },
      {
        id: "quiet_fix",
        label: "Garanto que o mais novo seja protegido primeiro, sem escândalo",
        detail: "O foco é o bem-estar de quem sofreu.",
        weights: { hufflepuff: 3, slytherin: 1 },
        virtues: { fairness: 3, loyalty: 2 },
      },
    ],
  },

  // Slytherin vs Ravenclaw
  {
    id: "q_branch_sr_1",
    phase: "branch",
    pairMatch: ["slytherin", "ravenclaw"],
    type: "dilemma",
    title: "Por que Você Busca Conhecimento?",
    subtitle: "Você passou meses estudando magia avançada que poucos dominam. Qual é a centelha por trás do seu esforço?",
    options: [
      {
        id: "pure_wonder",
        label: "Pela pura beleza de entender como a magia funciona",
        detail: "A resposta em si já é a recompensa — mesmo que ninguém mais saiba.",
        weights: { ravenclaw: 4, hufflepuff: 1 },
        virtues: { curiosity: 3, wisdom: 3 },
      },
      {
        id: "power_edge",
        label: "Porque saber o que outros ignoram me dá controle e vantagem",
        detail: "Conhecimento é o escudo mais forte contra um mundo imprevisível.",
        weights: { slytherin: 4, ravenclaw: 1 },
        virtues: { ambition: 3, cunning: 2 },
      },
      {
        id: "protect_allies",
        label: "Para estar preparado caso alguém que eu ame precise de mim",
        detail: "Estudo para proteger, não apenas para vencer.",
        weights: { gryffindor: 2, hufflepuff: 2, ravenclaw: 1 },
        virtues: { loyalty: 2, courage: 2 },
      },
    ],
  },

  // Slytherin vs Hufflepuff
  {
    id: "q_branch_sh_1",
    phase: "branch",
    pairMatch: ["slytherin", "hufflepuff"],
    type: "dilemma",
    title: "O Círculo de Confiança",
    subtitle: "Como você trata as pessoas ao seu redor em Hogwarts?",
    options: [
      {
        id: "inner_circle",
        label: "Sou extremamente leal a um círculo seleto; o resto precisa provar valor",
        detail: "Confiança é um recurso raro e precioso.",
        weights: { slytherin: 4, gryffindor: 1 },
        virtues: { cunning: 2, loyalty: 2, ambition: 2 },
      },
      {
        id: "open_hearth",
        label: "Dou uma chance justa a todos até que me provem o contrário",
        detail: "Todo bruxo merece respeito e acolhimento inicial.",
        weights: { hufflepuff: 4, gryffindor: 1 },
        virtues: { fairness: 3, loyalty: 2 },
      },
      {
        id: "curious_observer",
        label: "Observo as intenções de cada um antes de me aproximar",
        detail: "Prefiro conexões intelectuais genuínas.",
        weights: { ravenclaw: 3, slytherin: 2 },
        virtues: { wisdom: 2, cunning: 1 },
      },
    ],
  },

  // Ravenclaw vs Hufflepuff
  {
    id: "q_branch_rh_1",
    phase: "branch",
    pairMatch: ["ravenclaw", "hufflepuff"],
    type: "dilemma",
    title: "O Projeto de Feitiços em Grupo",
    subtitle: "O Professor Flitwick passou um trabalho complexo em trio, mas seus dois colegas estão com muita dificuldade na teoria.",
    options: [
      {
        id: "teach_patiently",
        label: "Passo horas extras explicando passo a passo até todos dominarem",
        detail: "A vitória só tem graça se o grupo inteiro cruzar a linha de chegada.",
        weights: { hufflepuff: 4, gryffindor: 1 },
        virtues: { loyalty: 3, fairness: 2 },
      },
      {
        id: "split_efficiently",
        label: "Assumo a parte teórica mais densa e delego tarefas práticas claras",
        detail: "Cada um brilha no que faz melhor para alcançarmos a excelência.",
        weights: { ravenclaw: 3, slytherin: 2 },
        virtues: { wisdom: 2, cunning: 2 },
      },
      {
        id: "experiment_new",
        label: "Proponho uma abordagem experimental diferente para engajar os dois",
        detail: "Às vezes a teoria tradicional é chata; mudar a perspectiva resolve.",
        weights: { ravenclaw: 4, gryffindor: 1 },
        virtues: { curiosity: 3, wisdom: 2 },
      },
    ],
  },

  // ================= FASE 3: PROVAS IMERSIVAS COMPLEMENTARES (Passos 6-12 pool geral) =================
  {
    id: "q_spell_lock",
    phase: "general",
    type: "spell",
    title: "A Porta Sem Maçaneta",
    subtitle: "Você está atrasado e encontra uma porta encantada bloqueando a passagem secreta. Qual abordagem escolhe?",
    options: [
      {
        id: "alohomora",
        label: "Alohomora — Testo a fechadura mágica diretamente",
        detail: "Direto ao ponto: se não abrir, tento outra passagem na hora.",
        spell: "Alohomora!",
        accent: "#ae0001",
        weights: { gryffindor: 3, hufflepuff: 1 },
        virtues: { daring: 2, courage: 2 },
      },
      {
        id: "riddle",
        label: "Leio as inscrições na pedra para resolver o enigma",
        detail: "Portas antigas em Hogwarts geralmente respondem à lógica ou poesia.",
        spell: "Revelio!",
        accent: "#3b69c4",
        weights: { ravenclaw: 4 },
        virtues: { wisdom: 3, curiosity: 2 },
      },
      {
        id: "bypass",
        label: "Procuro uma rota alternativa pelo Mapa ou passagem oculta",
        detail: "Se uma porta foi trancada de propósito, alguém quer me atrasar.",
        spell: "Homenum Revelio",
        accent: "#1f7a4c",
        weights: { slytherin: 3, ravenclaw: 2 },
        virtues: { cunning: 3, ambition: 1 },
      },
      {
        id: "ask_portrait",
        label: "Peço ajuda educadamente ao retrato ou fantasma mais próximo",
        detail: "Os habitantes do castelo sempre ajudam quem os trata com gentileza.",
        spell: "Gentileza",
        accent: "#d4af37",
        weights: { hufflepuff: 4 },
        virtues: { fairness: 2, loyalty: 2 },
      },
    ],
  },
  {
    id: "q_creature_care",
    phase: "general",
    type: "relic",
    title: "Criatura da Floresta Proibida",
    subtitle: "Qual criatura mágica dos arredores de Hogwarts desperta sua maior afinidade?",
    options: [
      {
        id: "hippogriff",
        label: "Hipogrifo Orgulhoso",
        detail: "Exige respeito mútuo, coragem para se aproximar e liberdade nos céus.",
        icon: "feather",
        accent: "#ae0001",
        weights: { gryffindor: 3, ravenclaw: 1 },
        virtues: { courage: 3, daring: 1 },
      },
      {
        id: "thestral",
        label: "Testrálio Silencioso",
        detail: "Compreendido apenas por quem já viu a profundidade da vida e da perda.",
        icon: "moon",
        accent: "#3b69c4",
        weights: { ravenclaw: 3, slytherin: 2 },
        virtues: { wisdom: 3, curiosity: 2 },
      },
      {
        id: "basilisk_serpent",
        label: "Serpente Ancestral",
        detail: "Símbolo de paciência letal, poder antigo e sobrevivência absoluta.",
        icon: "shield",
        accent: "#1f7a4c",
        weights: { slytherin: 4 },
        virtues: { cunning: 3, ambition: 2 },
      },
      {
        id: "niffler_badger",
        label: "Tronquilho Guardião",
        detail: "Pequeno, atento e ferozmente protetor da árvore que chama de lar.",
        icon: "leaf",
        accent: "#d4af37",
        weights: { hufflepuff: 4 },
        virtues: { loyalty: 3, fairness: 2 },
      },
    ],
  },
  {
    id: "q_scale_rules",
    phase: "general",
    type: "scale",
    title: "O Decreto da Alta Inquisidora",
    subtitle: "Uma regra injusta acaba de ser imposta em Hogwarts, proibindo reuniões de estudo. Como você reage?",
    leftLabel: "Quebro a regra abertamente",
    rightLabel: "Contorno ou uso a regra a meu favor",
    steps: [
      { label: "Rebeldia Aberta", weights: { gryffindor: 4, hufflepuff: 1 }, virtues: { daring: 3, courage: 2 } },
      { label: "Resistência Firme", weights: { gryffindor: 3, hufflepuff: 2 }, virtues: { courage: 2, fairness: 2 } },
      { label: "Resistência Discreta", weights: { hufflepuff: 2, ravenclaw: 2 }, virtues: { loyalty: 2, wisdom: 2 } },
      { label: "Astúcia Legal", weights: { ravenclaw: 2, slytherin: 3 }, virtues: { cunning: 2, wisdom: 2 } },
      { label: "Manipulação do Sistema", weights: { slytherin: 4, ravenclaw: 1 }, virtues: { cunning: 3, ambition: 2 } },
    ],
  },
  {
    id: "q_wand_core",
    phase: "general",
    type: "sensory",
    title: "Na Loja de Olivaras",
    subtitle: "O Sr. Olivaras abre quatro caixas empoeiradas. Qual núcleo e madeira respondem ao seu chamado?",
    options: [
      {
        id: "phoenix",
        label: "Azevinho & Pena de Fênix",
        detail: "Rara, imprevisível e capaz dos feitos mais nobres nos momentos mais sombrios.",
        icon: "flame",
        accent: "#ae0001",
        weights: { gryffindor: 4, ravenclaw: 1 },
        virtues: { courage: 3, daring: 2 },
      },
      {
        id: "dragon",
        label: "Teixo & Fibra de Coração de Dragão",
        detail: "Poderosa, intensa e leal a bruxos de ambição monumental.",
        icon: "sparkles",
        accent: "#1f7a4c",
        weights: { slytherin: 4, gryffindor: 1 },
        virtues: { ambition: 3, cunning: 2 },
      },
      {
        id: "unicorn_raven",
        label: "Videira & Pelo de Unicórnio",
        detail: "Atraída por personalidades com visão oculta, profundidade e propósito elevado.",
        icon: "moon",
        accent: "#3b69c4",
        weights: { ravenclaw: 3, hufflepuff: 2 },
        virtues: { wisdom: 3, curiosity: 2 },
      },
      {
        id: "badger_willow",
        label: "Salgueiro & Pelo de Unicórnio",
        detail: "Estável, curativa e incapaz de trair quem confia nela.",
        icon: "leaf",
        accent: "#d4af37",
        weights: { hufflepuff: 4, gryffindor: 1 },
        virtues: { loyalty: 3, fairness: 2 },
      },
    ],
  },
  {
    id: "q_nightmare_fear",
    phase: "general",
    type: "dilemma",
    title: "O Sussurro do Dementador",
    subtitle: "Um Dementador se aproxima no Expresso de Hogwarts. Qual pensamento você escolhe para conjurar seu Patrono?",
    options: [
      {
        id: "triumph",
        label: "O instante em que superei um medo que parecia impossível",
        detail: "A adrenalina da vitória sobre meus próprios limites.",
        weights: { gryffindor: 4, slytherin: 1 },
        virtues: { courage: 3, daring: 2 },
      },
      {
        id: "belonging",
        label: "Uma mesa cheia de pessoas que amo rindo juntas sem pressa",
        detail: "O calor de pertencer e saber que ninguém está sozinho.",
        weights: { hufflepuff: 4, gryffindor: 1 },
        virtues: { loyalty: 3, fairness: 2 },
      },
      {
        id: "discovery",
        label: "O momento em que tudo finalmente fez sentido e o mundo se abriu",
        detail: "A epifania pura de desvendar um mistério antigo.",
        weights: { ravenclaw: 4 },
        virtues: { wisdom: 3, curiosity: 2 },
      },
      {
        id: "destiny",
        label: "A certeza de que ninguém nunca mais poderá me subestimar",
        detail: "Minha força interior e a promessa do futuro que construo.",
        weights: { slytherin: 4 },
        virtues: { ambition: 3, cunning: 2 },
      },
    ],
  },
  {
    id: "q_hogwarts_subject",
    phase: "general",
    type: "relic",
    title: "A Aula Favorita",
    subtitle: "Se pudesse dominar apenas uma disciplina em Hogwarts com perfeição absoluta, qual seria?",
    options: [
      {
        id: "dada",
        label: "Defesa Contra as Artes das Trevas",
        detail: "Duelos, contra-feitiços e estar na linha de frente quando o mundo escurece.",
        icon: "sword",
        accent: "#ae0001",
        weights: { gryffindor: 4, slytherin: 1 },
        virtues: { courage: 3, daring: 2 },
      },
      {
        id: "potions",
        label: "Poções Avançadas",
        detail: "Precisão milimétrica, paciência sutil e o domínio da química mágica.",
        icon: "flask",
        accent: "#1f7a4c",
        weights: { slytherin: 3, ravenclaw: 2 },
        virtues: { cunning: 2, ambition: 2, wisdom: 1 },
      },
      {
        id: "charms",
        label: "Feitiços & Runas Antigas",
        detail: "Criatividade ilimitada para dobrar a realidade através do estudo.",
        icon: "sparkles",
        accent: "#3b69c4",
        weights: { ravenclaw: 4 },
        virtues: { curiosity: 3, wisdom: 2 },
      },
      {
        id: "herbology",
        label: "Herbologia & Trato das Criaturas",
        detail: "Cuidar da vida mágica, curar feridas e nutrir o que cresce.",
        icon: "leaf",
        accent: "#d4af37",
        weights: { hufflepuff: 4 },
        virtues: { loyalty: 2, fairness: 3 },
      },
    ],
  },
  {
    id: "q_triwizard_task",
    phase: "general",
    type: "spell",
    title: "A Segunda Tarefa do Torneio",
    subtitle: "Você precisa resgatar algo precioso no fundo do Lago Negro em menos de uma hora. Como se prepara?",
    options: [
      {
        id: "gillyweed",
        label: "Engulo Guelricho e mergulho confiando na minha adaptabilidade",
        detail: "Se algo der errado lá embaixo, resolvo no calor do momento.",
        spell: "Mergulho Direto",
        accent: "#ae0001",
        weights: { gryffindor: 4, hufflepuff: 1 },
        virtues: { daring: 3, courage: 2 },
      },
      {
        id: "bubblehead",
        label: "Executo o Feitiço Cabeça-de-Bolha com cálculo exato de pressão",
        detail: "Técnica limpa, zero improviso desnecessário.",
        spell: "Cabeça-de-Bolha",
        accent: "#3b69c4",
        weights: { ravenclaw: 3, hufflepuff: 2 },
        virtues: { wisdom: 3, curiosity: 1 },
      },
      {
        id: "transfiguration",
        label: "Transfiguração parcial para ganhar velocidade predatória na água",
        detail: "Quero chegar antes de todos os outros campeões.",
        spell: "Transfiguração",
        accent: "#1f7a4c",
        weights: { slytherin: 4, gryffindor: 1 },
        virtues: { ambition: 3, cunning: 2 },
      },
      {
        id: "rescue_all",
        label: "Garanto que todos os reféns fiquem seguros antes de subir",
        detail: "Pontos extras não importam se alguém ficar para trás.",
        spell: "Resgate Completo",
        accent: "#d4af37",
        weights: { hufflepuff: 4, gryffindor: 2 },
        virtues: { loyalty: 3, fairness: 3 },
      },
    ],
  },

  // ================= FASE 4: ESPELHO DE OJESED & VEREDITO FINAL (Passos 13-15) =================
  {
    id: "q_final_erised",
    phase: "final",
    type: "dilemma",
    title: "Diante do Espelho de Ojesed",
    subtitle: "Você se aproxima da moldura dourada na sala abandonada. O que o espelho revela no reflexo mais profundo do seu coração?",
    options: [
      {
        id: "erised_hero",
        label: "Você liderando uma causa justa, sem medo de enfrentar o impossível",
        detail: "Com cicatrizes de coragem e o coração tranquilo por nunca ter recuado.",
        weights: { gryffindor: 4, hufflepuff: 1 },
        virtues: { courage: 3, daring: 2 },
      },
      {
        id: "erised_crown",
        label: "Você no topo, respeitado, poderoso e no controle do próprio destino",
        detail: "Ninguém nunca mais ditará seus limites.",
        weights: { slytherin: 4 },
        virtues: { ambition: 3, cunning: 2 },
      },
      {
        id: "erised_library",
        label: "Você desvendando os segredos mais antigos do universo mágico",
        detail: "Uma mente livre que compreende o que ninguém mais ousou imaginar.",
        weights: { ravenclaw: 4 },
        virtues: { wisdom: 3, curiosity: 3 },
      },
      {
        id: "erised_home",
        label: "Você cercado por todos que ama, em paz, lealdade e harmonia verdadeira",
        detail: "Um lar inabalável que nenhum mal consegue destruir.",
        weights: { hufflepuff: 4 },
        virtues: { loyalty: 3, fairness: 3 },
      },
    ],
  },
  {
    id: "q_final_founder_echo",
    phase: "final",
    type: "dilemma",
    title: "A Pergunta Secreta do Chapéu",
    subtitle: "O Chapéu Seletor sussurra direto na sua mente: 'Qual defeito você menos tolera em si mesmo?'",
    options: [
      {
        id: "hate_cowardice",
        label: "Ficar paralisado pela covardia quando alguém precisa de mim",
        detail: "Prefiro errar agindo do que me arrepender por não tentar.",
        weights: { gryffindor: 4, hufflepuff: 1 },
        virtues: { courage: 3, daring: 2 },
      },
      {
        id: "hate_naivety",
        label: "Ser ingênuo e deixar que outros me usem como degrau",
        detail: "Preciso enxergar o tabuleiro inteiro antes de confiar.",
        weights: { slytherin: 4, ravenclaw: 1 },
        virtues: { cunning: 3, ambition: 2 },
      },
      {
        id: "hate_ignorance",
        label: "Aceitar respostas rasas por preguiça de questionar",
        detail: "A ignorância voluntária é a pior prisão.",
        weights: { ravenclaw: 4 },
        virtues: { wisdom: 3, curiosity: 2 },
      },
      {
        id: "hate_betrayal",
        label: "Ser injusto ou abandonar quem caminhou ao meu lado",
        detail: "Nada quebra mais meu espírito do que falhar com quem confia em mim.",
        weights: { hufflepuff: 4, gryffindor: 1 },
        virtues: { loyalty: 3, fairness: 3 },
      },
    ],
  },
  {
    id: "q_final_hatstall",
    phase: "final",
    type: "scale",
    title: "A Escolha Consciente",
    subtitle: "Como Harry Potter disse ao Chapéu: nossas escolhas também moldam quem somos. Se o Chapéu hesitasse, o que você pediria a ele?",
    leftLabel: "Coloque-me onde meu coração arde mais",
    rightLabel: "Coloque-me onde minha mente ou ambição cresce mais",
    steps: [
      { label: "Coração & Coragem", weights: { gryffindor: 3, hufflepuff: 2 }, virtues: { courage: 2, loyalty: 2 } },
      { label: "Lealdade & Calor", weights: { hufflepuff: 3, gryffindor: 2 }, virtues: { loyalty: 2, fairness: 2 } },
      { label: "Deixo o Chapéu Decidir", weights: { gryffindor: 1, slytherin: 1, ravenclaw: 1, hufflepuff: 1 }, virtues: { wisdom: 1, fairness: 1 } },
      { label: "Mente & Descoberta", weights: { ravenclaw: 3, slytherin: 2 }, virtues: { wisdom: 2, curiosity: 2 } },
      { label: "Ambição & Estratégia", weights: { slytherin: 3, ravenclaw: 2 }, virtues: { ambition: 3, cunning: 2 } },
    ],
  },
];

export const TOTAL_SORTING_STEPS = 10;

function pickRandom(list) {
  if (!list.length) return null;
  return list[Math.floor(Math.random() * list.length)];
}

/**
 * Selects the next question dynamically & randomly from matching phases based on scores,
 * so no two Sorting Ceremonies ever follow the exact same question order.
 */
export function pickNextSortingQuestion(answeredIds, scores, stepIndex) {
  const remaining = SORTING_QUESTIONS.filter((q) => !answeredIds.includes(q.id));
  if (remaining.length === 0) return null;

  // Steps 0..2: Random core questions
  if (stepIndex < 3) {
    const core = remaining.filter((q) => q.phase === "core");
    if (core.length > 0) return pickRandom(core);
  }

  // Last 2 steps (8..9): Random final Mirror / Hatstall questions
  if (stepIndex >= TOTAL_SORTING_STEPS - 2) {
    const finals = remaining.filter((q) => q.phase === "final");
    if (finals.length > 0) return pickRandom(finals);
  }

  // Middle steps: Prefer a random branch matching the top 2 houses
  const sortedHouses = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([house]) => house);

  const topTwo = [sortedHouses[0], sortedHouses[1]];
  const branchMatches = remaining.filter(
    (q) =>
      q.phase === "branch" &&
      q.pairMatch &&
      q.pairMatch.includes(topTwo[0]) &&
      q.pairMatch.includes(topTwo[1])
  );
  if (branchMatches.length > 0) return pickRandom(branchMatches);

  const general = remaining.filter((q) => q.phase === "general" || q.phase === "core");
  if (general.length > 0) return pickRandom(general);

  const anyBranch = remaining.filter((q) => q.phase === "branch");
  if (anyBranch.length > 0) return pickRandom(anyBranch);

  return pickRandom(remaining);
}
