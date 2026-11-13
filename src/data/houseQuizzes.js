// Dedicated House Quizzes ("Provas dos Guardiões das Casas")
// Answering >= 6 out of 8 unlocks that House's 3D Theme & Guardian in the Header!

export const HOUSE_UNLOCK_MIN_SCORE = 6;
export const HOUSE_QUIZ_TOTAL = 8;

export const HOUSE_QUIZZES = {
  gryffindor: {
    houseId: "gryffindor",
    title: "Desafio do Leão de Godric",
    guardian: "Leão Dourado da Torre Carmesim",
    intro:
      "Prove seu conhecimento sobre a história, relíquias e heróis da Grifinória. Alcance pelo menos 6 de 8 acertos para domar o Leão e liberar o Tema 3D da Grifinória!",
    questions: [
      {
        question: "Quem guarda a entrada da Sala Comunal da Grifinória no sétimo andar?",
        options: ["O retrato da Mulher Gorda", "O Barão Sangrento", "Uma gárgula de pedra", "Uma aldrava em forma de leão"],
        answer: "O retrato da Mulher Gorda",
        explanation: "O retrato da Mulher Gorda exige a senha correta antes de girar para revelar a entrada redonda.",
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
        explanation: "Hermione sabe seu título completo de cor: Sir Nicholas de Mimsy-Porpington.",
      },
      {
        question: "O que apenas um verdadeiro aluno da Grifinória consegue retirar de dentro do Chapéu Seletor em momentos de necessidade?",
        options: [
          "A Espada de Godric Gryffindor",
          "A Capa da Invisibilidade",
          "O Pomo de Ouro de Tiago Potter",
          "O Escudo de Rubi",
        ],
        answer: "A Espada de Godric Gryffindor",
        explanation: "Tanto Harry (na Câmara Secreta) quanto Neville (na Batalha de Hogwarts) puxaram a espada do Chapéu.",
      },
      {
        question: "Qual professora é a Diretora da Casa Grifinória durante todo o período de Harry em Hogwarts?",
        options: ["Minerva McGonagall", "Pomona Sprout", "Sibila Trelawney", "Aurora Sinistra"],
        answer: "Minerva McGonagall",
        explanation: "A Professora de Transfiguração, Minerva McGonagall, chefia a Grifinória com rigor e justiça.",
      },
      {
        question: "Qual era o nome do vilarejo natal de Godric Gryffindor, onde também moraram os Potter e os Dumbledore?",
        options: ["Godric's Hollow", "Little Hangleton", "Ottery St. Catchpole", "Hogsmeade"],
        answer: "Godric's Hollow",
        explanation: "O vilarejo de Godric's Hollow recebeu esse nome em homenagem ao fundador Godric Gryffindor.",
      },
      {
        question: "Quem confeccionou a Espada de Godric Gryffindor segundo a história dos livros?",
        options: [
          "O rei duende Ragnuk I",
          "O próprio Godric Gryffindor",
          "Os ferreiros de Gringotes no século XVIII",
          "Nicolau Flamel",
        ],
        answer: "O rei duende Ragnuk I",
        explanation: "A espada foi forjada em prata pura por Ragnuk I, o melhor ferreiro entre os duendes.",
      },
      {
        question: "O que acontece quando um menino tenta subir a escada do dormitório feminino na Torre da Grifinória?",
        options: [
          "Os degraus se achatam e viram um escorregador de pedra",
          "A Mulher Gorda tranca a porta",
          "Um feitiço de choque o lança para trás",
          "As armaduras bloqueiam o corredor",
        ],
        answer: "Os degraus se achatam e viram um escorregador de pedra",
        explanation: "Os fundadores acharam que as meninas eram mais confiáveis que os meninos e enfeitiçaram a escada delas!",
      },
      {
        question: "Qual pedra preciosa preenche a ampulheta que marca os pontos da Grifinória no Salão Principal?",
        options: ["Rubis", "Granadas", "Topázios", "Diamantes vermelhos"],
        answer: "Rubis",
        explanation: "A ampulheta da Grifinória conta os pontos da casa com rubis cintilantes.",
      },
    ],
  },

  slytherin: {
    houseId: "slytherin",
    title: "Desafio da Serpente de Salazar",
    guardian: "Serpente Esmeralda do Lago Negro",
    intro:
      "Prove sua astúcia e domínio sobre os segredos das masmorras. Alcance pelo menos 6 de 8 acertos para despertar a Serpente e liberar o Tema 3D da Sonserina!",
    questions: [
      {
        question: "Onde fica localizada a Sala Comunal da Sonserina e o que se vê através de suas janelas?",
        options: [
          "Nas masmorras, sob as águas esverdeadas do Lago Negro",
          "Na Torre Norte, com vista para a Floresta Proibida",
          "Abaixo das Cozinhas, com vista para as estufas",
          "No subsolo de Hogsmeade",
        ],
        answer: "Nas masmorras, sob as águas esverdeadas do Lago Negro",
        explanation: "A sala comunal da Sonserina fica abaixo do Lago Negro, dando a ela um brilho subaquático esverdeado.",
      },
      {
        question: "Qual habilidade mágica rara Salazar Slytherin possuía e transmitiu aos seus descendentes?",
        options: [
          "Ofidioglossia (falar a língua das cobras)",
          "Metamorfomagia",
          "Invisibilidade sem capa",
          "Animagia natural",
        ],
        answer: "Ofidioglossia (falar a língua das cobras)",
        explanation: "Salazar era conhecido como 'Língua de Cobra' por sua capacidade de conversar com serpentes.",
      },
      {
        question: "Quem assume a direção da Casa Sonserina após Severo Snape se tornar Diretor ou fugir de Hogwarts?",
        options: ["Horácio Slughorn", "Lúcio Malfoy", "Alecto Carrow", "Narcisa Malfoy"],
        answer: "Horácio Slughorn",
        explanation: "O Professor de Poções Horácio Slughorn volta a liderar a Sonserina e luta ao lado de Hogwarts.",
      },
      {
        question: "Qual era a relíquia pessoal de Salazar Slytherin que passou para a família Gaunt?",
        options: [
          "Um medalhão de ouro pesado com um 'S' de esmeraldas",
          "Um anel com a pedra de safira",
          "Uma adaga de prata com veneno",
          "Um cálice de esmeralda",
        ],
        answer: "Um medalhão de ouro pesado com um 'S' de esmeraldas",
        explanation: "O Medalhão de Slytherin só abria quando alguém falava em Ofidioglossia.",
      },
      {
        question: "Qual ex-aluno da Sonserina sacrificou a própria vida na caverna dos Inferi para roubar a Horcrux de Voldemort?",
        options: ["Régulo Arcturus Black (R.A.B.)", "Severo Snape", "Andrômeda Black", "Bartô Crouch Jr."],
        answer: "Régulo Arcturus Black (R.A.B.)",
        explanation: "Régulo Black descobriu o segredo das Horcruxes e trocou o medalhão verdadeiro com a ajuda de Monstro.",
      },
      {
        question: "Por que o Barão Sangrento, fantasma da Sonserina, carrega correntes e manchas prateadas de sangue?",
        options: [
          "Como penitência por ter tirado a vida de Helena Ravenclaw e a própria",
          "Porque morreu defendendo Hogwarts de duendes",
          "Por causa de uma maldição de Salazar Slytherin",
          "Porque foi preso em Azkaban",
        ],
        answer: "Como penitência por ter tirado a vida de Helena Ravenclaw e a própria",
        explanation: "No último livro, a Dama Cinzenta revela a Harry a trágica história do Barão Sangrento.",
      },
      {
        question: "Qual lendário bruxo medieval da história britânica foi aluno da Sonserina segundo o cânone?",
        options: ["Merlin", "Beedle, o Bardo", "Nicolau Flamel", "Ignoto Peverell"],
        answer: "Merlin",
        explanation: "O próprio Merlin foi selecionado para a Sonserina quando jovem em Hogwarts.",
      },
      {
        question: "Qual pedra preciosa marca os pontos da Sonserina nas ampulhetas do Salão Principal?",
        options: ["Esmeraldas", "Jades imperiais", "Turmalinas", "Safiras verdes"],
        answer: "Esmeraldas",
        explanation: "As esmeraldas preenchem a ampulheta da Sonserina.",
      },
    ],
  },

  ravenclaw: {
    houseId: "ravenclaw",
    title: "Desafio da Águia de Rowena",
    guardian: "Águia de Bronze Celestial",
    intro:
      "Na Corvinal, a porta não tem fechadura: só entra quem responde ao enigma. Alcance pelo menos 6 de 8 acertos para liberar o Tema 3D da Corvinal!",
    questions: [
      {
        question: "Como um aluno consegue entrar na Sala Comunal da Corvinal na Torre Oeste?",
        options: [
          "Respondendo a um enigma filosófico feito pela aldrava de águia de bronze",
          "Dizendo uma senha que muda a cada quinzena",
          "Tocando uma sequência musical nos tijolos",
          "Mostrando sua varinha ao retrato de Rowena",
        ],
        answer: "Respondendo a um enigma filosófico feito pela aldrava de águia de bronze",
        explanation: "Se o aluno errar o enigma, precisa esperar outro colega aparecer e resolver!",
      },
      {
        question: "Qual é o animal oficial no brasão da Corvinal (muitas vezes confundido por causa do nome em inglês)?",
        options: ["Uma Águia", "Um Corvo", "Um Falcão", "Uma Coruja"],
        answer: "Uma Águia",
        explanation: "Embora 'Raven' signifique corvo, o animal heráldico da Corvinal é a Águia, que voa onde ninguém mais alcança.",
      },
      {
        question: "Quem é o Diretor da Casa Corvinal e mestre de Feitiços em Hogwarts?",
        options: ["Fílio Flitwick", "Gilderoy Lockhart", "Cuthbert Binns", "Quirinus Quirrell"],
        answer: "Fílio Flitwick",
        explanation: "O Professor Fílio Flitwick, ex-campeão de duelos, é o dedicado Diretor da Corvinal.",
      },
      {
        question: "Qual é a inscrição gravada no Diadema Perdido de Rowena Ravenclaw?",
        options: [
          "O espírito sem limites é o maior tesouro do homem",
          "A sabedoria abre todas as portas do mundo",
          "Conhece a ti mesmo antes de lançar um feitiço",
          "Acima das estrelas habita a verdade",
        ],
        answer: "O espírito sem limites é o maior tesouro do homem",
        explanation: "O Diadema amplificava a sabedoria de quem o usava e trazia o lema imortal de Rowena.",
      },
      {
        question: "Quem era a Dama Cinzenta em vida antes de se tornar o fantasma da Corvinal?",
        options: [
          "Helena Ravenclaw, filha de Rowena Ravenclaw",
          "Irmã mais nova de Godric Gryffindor",
          "A primeira diretora de Hogwarts",
          "Esposa do Barão Sangrento",
        ],
        answer: "Helena Ravenclaw, filha de Rowena Ravenclaw",
        explanation: "Helena roubou o diadema da mãe e o escondeu em uma árvore oca na Albânia.",
      },
      {
        question: "Qual foi a resposta de Luna Lovegood/McGonagall para os enigmas da porta da Corvinal no 7º livro ('Onde vão parar os objetos que desaparecem?')?",
        options: [
          "No não-ser, isto é, em tudo",
          "Na Sala Precisa",
          "No esquecimento do tempo",
          "No coração de quem os perdeu",
        ],
        answer: "No não-ser, isto é, em tudo",
        explanation: "A aldrava elogia a resposta poética e abre imediatamente a porta para Harry e Luna.",
      },
      {
        question: "Qual famoso artesão de varinhas do Beco Diagonal pertencia à Casa Corvinal?",
        options: ["Garrick Olivaras", "Gregorovitch", " Xenofílio Lovegood", "Bathsheda Babbling"],
        answer: "Garrick Olivaras",
        explanation: "Garrick Olivaras e os membros da família Lovegood (Luna e Xenofílio) foram da Corvinal.",
      },
      {
        question: "Quais são as cores originais da Corvinal descritas nos livros de Harry Potter?",
        options: ["Azul e Bronze", "Azul e Prata", "Roxo e Ouro", "Azul-marinho e Branco"],
        answer: "Azul e Bronze",
        explanation: "Nos livros, as cores da Corvinal são azul e bronze (representando o céu e as penas da águia).",
      },
    ],
  },

  hufflepuff: {
    houseId: "hufflepuff",
    title: "Desafio do Texugo de Helga",
    guardian: "Texugo Dourado do Santuário",
    intro:
      "Lealdade, paciência e honra guardam o acesso aos porões da Lufa-Lufa. Alcance pelo menos 6 de 8 acertos para liberar o Tema 3D da Lufa-Lufa!",
    questions: [
      {
        question: "Como se abre a passagem para a Sala Comunal da Lufa-Lufa e o que acontece se alguém errar o ritmo?",
        options: [
          "Batendo no barril certo no ritmo de 'Helga Hufflepuff'; quem erra leva um banho de vinagre!",
          "Dizendo uma senha para o quadro de uma fruteira",
          "Regando uma planta mágica na entrada",
          "Acariciando a estátua de um texugo dourado",
        ],
        answer: "Batendo no barril certo no ritmo de 'Helga Hufflepuff'; quem erra leva um banho de vinagre!",
        explanation: "É a única sala comunal que possui um sistema de defesa ativo que expulsa invasores com vinagre!",
      },
      {
        question: "Qual professora é a Diretora da Casa Lufa-Lufa?",
        options: ["Pomona Sprout", "Caridade Burbage", "Grubbly-Plank", " Rolanda Hooch"],
        answer: "Pomona Sprout",
        explanation: "A Professora de Herbologia, Pomona Sprout, é a calorosa diretora da Lufa-Lufa.",
      },
      {
        question: "Durante a Batalha de Hogwarts no 7º livro, qual casa teve o maior número de alunos maiores de idade que ficaram para lutar (depois da própria Grifinória de Harry)?",
        options: ["Lufa-Lufa", "Corvinal", "Sonserina", "Beauxbatons"],
        answer: "Lufa-Lufa",
        explanation: "Os alunos da Lufa-Lufa levantaram-se em peso para defender Hogwarts por pura lealdade e senso de justiça.",
      },
      {
        question: "Quem foi o campeão oficial de Hogwarts escolhido pelo Cálice de Fogo no 4º ano, trazendo imenso orgulho à Lufa-Lufa?",
        options: ["Cedrico Diggory", "Ernesto Macmillan", "Justino Finch-Fletchley", "Zacarias Smith"],
        answer: "Cedrico Diggory",
        explanation: "Cedrico Diggory exemplificava todas as qualidades de um verdadeiro Lufa-Lufa: justo, leal e corajoso.",
      },
      {
        question: "Qual famosa Auror e Metamorfomaga da Ordem da Fênix foi aluna da Lufa-Lufa?",
        options: ["Ninfadora Tonks", "Emmeline Vance", "Héstia Jones", "Alice Longbottom"],
        answer: "Ninfadora Tonks",
        explanation: "Ninfadora Tonks pertencia à Lufa-Lufa quando estudou em Hogwarts.",
      },
      {
        question: "Pelo que Helga Hufflepuff era especialmente famosa em toda a comunidade bruxa medieval, deixando receitas usadas até hoje em Hogwarts?",
        options: [
          "Seus feitiços culinários e banquetes mágicos nas cozinhas",
          "Forjar espadas encantadas",
          "Mapear as estrelas do hemisfério norte",
          "Domar dragões selvagens",
        ],
        answer: "Seus feitiços culinários e banquetes mágicos nas cozinhas",
        explanation: "Helga Hufflepuff criou as receitas tradicionais servidas nos grandes banquetes de Hogwarts.",
      },
      {
        question: "Quem é o fantasma residente da Casa Lufa-Lufa?",
        options: ["O Frei Gorducho", "Sir Patrick Delaney-Podmore", "A Murta Que Geme", "O Barão Alegre"],
        answer: "O Frei Gorducho",
        explanation: "O Frei Gorducho é o fantasma mais gentil e acolhedor de Hogwarts, sempre disposto a dar uma segunda chance.",
      },
      {
        question: "Qual era a relíquia pessoal de Helga Hufflepuff que passou de geração em geração até Hepzibá Smith?",
        options: [
          "Uma pequena taça de ouro com duas alças finamente trabalhadas e um texugo gravado",
          "Um prato de prata encantado",
          "Um colar de âmbar dourado",
          "Um caldeirão de ouro maciço",
        ],
        answer: "Uma pequena taça de ouro com duas alças finamente trabalhadas e um texugo gravado",
        explanation: "A Taça de Helga Hufflepuff é a relíquia sagrada da fundadora.",
      },
    ],
  },
};
