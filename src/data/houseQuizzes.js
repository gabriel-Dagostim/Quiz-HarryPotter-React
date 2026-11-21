// Exames Oficiais das Casas de Hogwarts (com nomes canônicos das provas de Harry Potter)
// Atingir >= 6/8 (Nota Aceitável "A" ou superior) libera o tema da Sala Comunal da Casa!

export const HOUSE_UNLOCK_MIN_SCORE = 6;
export const HOUSE_QUIZ_TOTAL = 8;

export const HOUSE_QUIZZES = {
  gryffindor: {
    houseId: "gryffindor",
    examCode: "N.O.M. • D.C.A.T.",
    title: "N.O.M. de Defesa Contra as Artes das Trevas",
    subtitle: "Prova da Espada de Gryffindor",
    examiner: "Profa. Minerva McGonagall",
    questions: [
      {
        question: "Quem guarda a entrada da Sala Comunal da Grifinória no sétimo andar?",
        options: [
          "O retrato da Mulher Gorda",
          "O Barão Sangrento",
          "Uma gárgula de pedra",
          "Uma aldrava em forma de leão",
        ],
        answer: "O retrato da Mulher Gorda",
        explanation: "O retrato da Mulher Gorda exige a senha correta antes de girar para revelar a entrada.",
      },
      {
        question: "Qual é o nome verdadeiro de Nick-Quase-Sem-Cabeça, o fantasma da Grifinória?",
        options: [
          "Sir Nicholas de Mimsy-Porpington",
          "Sir Godric de Hollow",
          "Lorde Nicholas de Gryffindor",
          "Sir Percival de Arundel",
        ],
        answer: "Sir Nicholas de Mimsy-Porpington",
        explanation: "Hermione recita seu título completo de cor: Sir Nicholas de Mimsy-Porpington.",
      },
      {
        question: "O que apenas um verdadeiro aluno da Grifinória consegue puxar de dentro do Chapéu Seletor em apuros?",
        options: [
          "A Espada de Godric Gryffindor",
          "A Capa da Invisibilidade",
          "O Pomo de Ouro de Tiago Potter",
          "O Escudo de Rubi",
        ],
        answer: "A Espada de Godric Gryffindor",
        explanation: "Tanto Harry (na Câmara Secreta) quanto Neville (na Batalha de Hogwarts) retiraram a espada do Chapéu.",
      },
      {
        question: "Qual professora é a Diretora da Casa Grifinória durante os anos de Harry em Hogwarts?",
        options: ["Minerva McGonagall", "Pomona Sprout", "Sibila Trelawney", "Aurora Sinistra"],
        answer: "Minerva McGonagall",
        explanation: "A Professora de Transfiguração, Minerva McGonagall, chefia a Grifinória com rigor e justiça.",
      },
      {
        question: "Qual era o vilarejo natal de Godric Gryffindor, onde também moraram os Potter e os Dumbledore?",
        options: ["Godric's Hollow", "Little Hangleton", "Ottery St. Catchpole", "Hogsmeade"],
        answer: "Godric's Hollow",
        explanation: "Godric's Hollow recebeu esse nome em homenagem ao fundador Godric Gryffindor.",
      },
      {
        question: "Quem forjou a Espada de Godric Gryffindor segundo os livros?",
        options: [
          "O rei duende Ragnuk I",
          "O próprio Godric Gryffindor",
          "Os ferreiros de Gringotes no século XVIII",
          "Nicolau Flamel",
        ],
        answer: "O rei duende Ragnuk I",
        explanation: "A espada foi forjada em prata pura pelo rei duende Ragnuk I.",
      },
      {
        question: "O que acontece quando um menino tenta subir a escada do dormitório feminino na Torre da Grifinória?",
        options: [
          "Os degraus se achatam e viram um escorregador de pedra",
          "A Mulher Gorda tranca a porta",
          "Um feitiço o lança para trás",
          "As armaduras bloqueiam o corredor",
        ],
        answer: "Os degraus se achatam e viram um escorregador de pedra",
        explanation: "Os fundadores enfeitiçaram a escada feminina para virar um escorregador se um menino subir.",
      },
      {
        question: "Qual pedra preciosa marca os pontos da Grifinória nas ampulhetas do Salão Principal?",
        options: ["Rubis", "Granadas", "Topázios", "Diamantes vermelhos"],
        answer: "Rubis",
        explanation: "A ampulheta da Grifinória acumula rubis cintilantes.",
      },
    ],
  },

  slytherin: {
    houseId: "slytherin",
    examCode: "N.I.E.M. • Poções",
    title: "N.I.E.M. de Poções & Artes das Trevas",
    subtitle: "Prova da Câmara Secreta",
    examiner: "Prof. Severo Snape",
    questions: [
      {
        question: "Onde fica localizada a Sala Comunal da Sonserina?",
        options: [
          "Nas masmorras, sob as águas esverdeadas do Lago Negro",
          "Na Torre Norte, com vista para a Floresta Proibida",
          "Abaixo das Cozinhas, com vista para as estufas",
          "No subsolo de Hogsmeade",
        ],
        answer: "Nas masmorras, sob as águas esverdeadas do Lago Negro",
        explanation: "Suas janelas ficam abaixo da superfície do Lago Negro, trazendo o brilho esmeralda.",
      },
      {
        question: "Qual dom mágico raro Salazar Slytherin transmitiu aos seus descendentes?",
        options: [
          "Ofidioglossia (falar a língua das cobras)",
          "Metamorfomagia",
          "Invisibilidade sem capa",
          "Animagia natural",
        ],
        answer: "Ofidioglossia (falar a língua das cobras)",
        explanation: "Salazar era conhecido como 'Língua de Cobra' por falar Ofidioglossia.",
      },
      {
        question: "Quem assume a direção da Casa Sonserina após Severo Snape deixar o cargo de professor de Poções?",
        options: ["Horácio Slughorn", "Lúcio Malfoy", "Alecto Carrow", "Narcisa Malfoy"],
        answer: "Horácio Slughorn",
        explanation: "Horácio Slughorn retorna como Diretor da Sonserina e luta por Hogwarts.",
      },
      {
        question: "Qual era a relíquia pessoal de Salazar Slytherin que passou para a família Gaunt?",
        options: [
          "Um medalhão de ouro com um 'S' de esmeraldas",
          "Um anel com pedra de safira",
          "Uma adaga de prata encantada",
          "Um cálice de esmeralda",
        ],
        answer: "Um medalhão de ouro com um 'S' de esmeraldas",
        explanation: "O Medalhão de Slytherin só abria quando alguém falava em Ofidioglossia.",
      },
      {
        question: "Qual ex-aluno da Sonserina sacrificou a vida na caverna dos Inferi para roubar uma Horcrux?",
        options: ["Régulo Arcturo Black (R.A.B.)", "Severo Snape", "Andrômeda Black", "Bartô Crouch Jr."],
        answer: "Régulo Arcturo Black (R.A.B.)",
        explanation: "Régulo descobriu o segredo de Voldemort e trocou o medalhão com a ajuda de Monstro.",
      },
      {
        question: "Por que o Barão Sangrento, fantasma da Sonserina, carrega correntes pesadas?",
        options: [
          "Como penitência por ter tirado a vida de Helena Ravenclaw e a própria",
          "Porque morreu defendendo Hogwarts de duendes",
          "Por causa de uma maldição de Salazar Slytherin",
          "Porque escapou preso de Azkaban",
        ],
        answer: "Como penitência por ter tirado a vida de Helena Ravenclaw e a própria",
        explanation: "A Dama Cinzenta revela essa tragédia a Harry na Batalha de Hogwarts.",
      },
      {
        question: "Qual lendário bruxo medieval da história britânica estudou na Sonserina?",
        options: ["Merlin", "Beedle, o Bardo", "Nicolau Flamel", "Ignoto Peverell"],
        answer: "Merlin",
        explanation: "No cânone oficial, o próprio Merlin foi selecionado para a Sonserina.",
      },
      {
        question: "Qual pedra preciosa marca os pontos da Sonserina no Salão Principal?",
        options: ["Esmeraldas", "Jades imperiais", "Turmalinas", "Safiras verdes"],
        answer: "Esmeraldas",
        explanation: "As esmeraldas preenchem a ampulheta da Sonserina.",
      },
    ],
  },

  ravenclaw: {
    houseId: "ravenclaw",
    examCode: "N.I.E.M. • Feitiços & Runas",
    title: "N.I.E.M. de Feitiços & Enigma da Aldrava",
    subtitle: "Prova do Diadema de Ravenclaw",
    examiner: "Prof. Fílio Flitwick",
    questions: [
      {
        question: "Como um aluno entra na Sala Comunal da Corvinal na Torre Oeste?",
        options: [
          "Respondendo a um enigma feito pela aldrava de águia de bronze",
          "Dizendo uma senha que muda a cada quinzena",
          "Tocando uma melodia nos tijolos",
          "Mostrando sua varinha ao retrato de Rowena",
        ],
        answer: "Respondendo a um enigma feito pela aldrava de águia de bronze",
        explanation: "A porta não tem fechadura: só se abre para quem responde com sabedoria.",
      },
      {
        question: "Qual é o animal oficial no brasão da Corvinal?",
        options: ["Uma Águia", "Um Corvo", "Um Falcão", "Uma Coruja"],
        answer: "Uma Águia",
        explanation: "Apesar do nome em inglês (Ravenclaw), o animal heráldico oficial é a Águia.",
      },
      {
        question: "Quem é o Diretor da Casa Corvinal e mestre de Feitiços?",
        options: ["Fílio Flitwick", "Gilderoy Lockhart", "Cuthbert Binns", "Quirinus Quirrell"],
        answer: "Fílio Flitwick",
        explanation: "O Professor Fílio Flitwick, ex-campeão de duelos, chefia a Corvinal.",
      },
      {
        question: "Qual inscrição está gravada no Diadema Perdido de Rowena Ravenclaw?",
        options: [
          "O espírito sem limites é o maior tesouro do homem",
          "A sabedoria abre todas as portas do mundo",
          "Conhece a ti mesmo antes de lançar um feitiço",
          "Acima das estrelas habita a verdade",
        ],
        answer: "O espírito sem limites é o maior tesouro do homem",
        explanation: "O lema imortal de Rowena está gravado no próprio Diadema.",
      },
      {
        question: "Quem era a Dama Cinzenta em vida antes de se tornar o fantasma da Corvinal?",
        options: [
          "Helena Ravenclaw, filha de Rowena",
          "Irmã mais nova de Godric Gryffindor",
          "A primeira diretora de Hogwarts",
          "Esposa do Barão Sangrento",
        ],
        answer: "Helena Ravenclaw, filha de Rowena",
        explanation: "Helena fugiu com o diadema da mãe para uma floresta na Albânia.",
      },
      {
        question: "Qual foi a resposta de McGonagall ao enigma 'Onde vão parar os objetos que desaparecem?' no 7º livro?",
        options: [
          "No não-ser, isto é, em tudo",
          "Na Sala Precisa",
          "No esquecimento do tempo",
          "No coração de quem os perdeu",
        ],
        answer: "No não-ser, isto é, em tudo",
        explanation: "A aldrava elogia a resposta poética e abre a porta imediatamente.",
      },
      {
        question: "Qual famoso artesão de varinhas do Beco Diagonal pertencia à Corvinal?",
        options: ["Garrick Olivaras", "Gregorovitch", "Xenofílio Lovegood", "Bathsheda Babbling"],
        answer: "Garrick Olivaras",
        explanation: "Garrick Olivaras estudou na Corvinal antes de assumir a loja de varinhas.",
      },
      {
        question: "Quais são as cores originais da Corvinal nos livros?",
        options: ["Azul e Bronze", "Azul e Prata", "Roxo e Ouro", "Azul-marinho e Branco"],
        answer: "Azul e Bronze",
        explanation: "Nos livros, as cores são azul e bronze (o céu e as penas da águia).",
      },
    ],
  },

  hufflepuff: {
    houseId: "hufflepuff",
    examCode: "N.O.M. • Herbologia & Tribruxo",
    title: "N.O.M. de Herbologia & Torneio Tribruxo",
    subtitle: "Prova da Taça de Hufflepuff",
    examiner: "Profa. Pomona Sprout",
    questions: [
      {
        question: "Como se abre a entrada da Sala Comunal da Lufa-Lufa e o que ocorre se errar?",
        options: [
          "Batendo no barril certo no ritmo de 'Helga Hufflepuff'; quem erra leva banho de vinagre",
          "Dizendo uma senha ao quadro de uma fruteira",
          "Regando uma planta mágica na entrada",
          "Acariciando uma estátua de texugo",
        ],
        answer: "Batendo no barril certo no ritmo de 'Helga Hufflepuff'; quem erra leva banho de vinagre",
        explanation: "A Lufa-Lufa possui o único sistema de defesa ativo que encharca intrusos com vinagre.",
      },
      {
        question: "Qual professora é a Diretora da Casa Lufa-Lufa?",
        options: ["Pomona Sprout", "Caridade Burbage", "Wilhelmina Grubbly-Plank", "Rolanda Hooch"],
        answer: "Pomona Sprout",
        explanation: "A Professora de Herbologia Pomona Sprout é a calorosa diretora da Lufa-Lufa.",
      },
      {
        question: "Na Batalha de Hogwarts, qual casa teve mais alunos maiores de idade ficando para lutar além da Grifinória?",
        options: ["Lufa-Lufa", "Corvinal", "Sonserina", "Beauxbatons"],
        answer: "Lufa-Lufa",
        explanation: "A Lufa-Lufa permaneceu quase inteira para defender Hogwarts por lealdade.",
      },
      {
        question: "Quem foi o campeão oficial de Hogwarts escolhido pelo Cálice de Fogo no 4º ano?",
        options: ["Cedrico Diggory", "Ernesto Macmillan", "Justino Finch-Fletchley", "Zacarias Smith"],
        answer: "Cedrico Diggory",
        explanation: "Cedrico Diggory representou Hogwarts e a Lufa-Lufa com honra no Torneio Tribruxo.",
      },
      {
        question: "Qual Auror e Metamorfomaga da Ordem da Fênix estudou na Lufa-Lufa?",
        options: ["Ninfadora Tonks", "Emmeline Vance", "Héstia Jones", "Alice Longbottom"],
        answer: "Ninfadora Tonks",
        explanation: "Ninfadora Tonks foi aluna da Lufa-Lufa em Hogwarts.",
      },
      {
        question: "Pelo que Helga Hufflepuff era especialmente famosa na comunidade bruxa medieval?",
        options: [
          "Feitiços culinários e receitas dos banquetes de Hogwarts",
          "Forjar espadas encantadas",
          "Mapear constelações raras",
          "Domar dragões selvagens",
        ],
        answer: "Feitiços culinários e receitas dos banquetes de Hogwarts",
        explanation: "Muitas receitas servidas até hoje nos banquetes de Hogwarts foram criadas por Helga.",
      },
      {
        question: "Quem é o fantasma residente da Casa Lufa-Lufa?",
        options: ["O Frei Gorducho", "Sir Patrick Delaney-Podmore", "A Murta Que Geme", "O Barão Alegre"],
        answer: "O Frei Gorducho",
        explanation: "O Frei Gorducho é o fantasma mais acolhedor de Hogwarts.",
      },
      {
        question: "Qual era a relíquia pessoal de Helga Hufflepuff que pertencia a Hepzibá Smith?",
        options: [
          "Uma taça de ouro de duas alças com um texugo gravado",
          "Um prato de prata encantado",
          "Um colar de âmbar dourado",
          "Um caldeirão de ouro maciço",
        ],
        answer: "Uma taça de ouro de duas alças com um texugo gravado",
        explanation: "A Taça de Helga Hufflepuff foi transformada em Horcrux por Voldemort.",
      },
    ],
  },
};
