import { useState } from "react";
import { Wand2, Shield, BookOpen, HelpCircle, ArrowRight, Sparkles, Volume2 } from "lucide-react";
import { HOUSES, NEUTRAL_THEME } from "../data/houses";
import { PERFIL_CARDS } from "../data/perfilData";
import { HouseCrest } from "./HouseCrest";
import { WizFrame, HallowsDivider } from "./WizFrame";
import { magicAudio } from "../utils/sound";

const PORTALS = [
  {
    id: "sorting",
    title: "Chapéu Seletor",
    tag: "Voz do Chapéu",
    desc: "Cerimônia narrada com 10 provas aleatórias e veredito em voz.",
    icon: Wand2,
    cta: "Iniciar Seleção",
  },
  {
    id: "houses",
    title: "Provas das Casas",
    tag: "64 Questões • Minerva",
    desc: "N.O.M.s e N.I.E.M.s narrados pela Profa. Minerva McGonagall.",
    icon: Shield,
    cta: "Fazer Exames",
  },
  {
    id: "quiz",
    title: "Quiz Bruxo",
    tag: "160 Perguntas",
    desc: "Filmes (Minerva) e Livros (Dumbledore) em 4 níveis aleatórios.",
    icon: BookOpen,
    cta: "Abrir Quiz",
  },
  {
    id: "perfil",
    title: "Perfil Bruxo",
    tag: `${PERFIL_CARDS.length} Cartas • 5 Temas`,
    desc: "Personagens, criaturas, lugares, relíquias, feitiços e poções.",
    icon: HelpCircle,
    cta: "Jogar Perfil",
    featured: true,
  },
];

export default function SanctuaryHome({
  sortedHouse,
  unlockedHouses,
  activeTheme,
  onNavigate,
}) {
  const [speakingWelcome, setSpeakingWelcome] = useState(false);
  const isHouse = activeTheme !== "neutral" && HOUSES[activeTheme];
  const current = isHouse ? HOUSES[activeTheme] : NEUTRAL_THEME;
  const sortedObj = sortedHouse ? HOUSES[sortedHouse] : null;

  const go = (target) => {
    magicAudio.stopVoice();
    magicAudio.sparkle();
    onNavigate(target);
  };

  const playDumbledoreGreeting = () => {
    if (speakingWelcome) {
      magicAudio.stopVoice();
      setSpeakingWelcome(false);
      return;
    }
    magicAudio.playVoice("dumbledore_welcome", {
      onStart: () => setSpeakingWelcome(true),
      onEnd: () => setSpeakingWelcome(false),
    });
  };

  return (
    <section className="home-view">
      {/* Majestic Compact Hero */}
      <WizFrame className="home-hero">
        <div className="home-hero-crest">
          <div className="crest-halo" />
          <HouseCrest houseId={activeTheme} size={114} />
        </div>

        <span className="wiz-eyebrow">
          <Sparkles size={13} /> {current.commonRoom}
        </span>

        <h1 className="home-title">
          {isHouse ? `Casa ${current.name}` : "Escola de Magia de Hogwarts"}
        </h1>

        <p className="home-motto">“{current.motto}”</p>

        <div className="home-cta-row">
          <button type="button" className="btn-gold" onClick={() => go("sorting")}>
            <Wand2 size={17} />
            {sortedObj ? `Sua Casa: ${sortedObj.name}` : "Vestir o Chapéu Seletor"}
          </button>
          <button type="button" className="btn-outline" onClick={() => go("perfil")}>
            <HelpCircle size={17} />
            Jogar Perfil HP ({PERFIL_CARDS.length})
          </button>
        </div>

        <button
          type="button"
          className={`btn-dumbledore-greet ${speakingWelcome ? "is-speaking" : ""}`}
          onClick={playDumbledoreGreeting}
        >
          <img src="/images/perfil/alvo-dumbledore.webp" alt="Prof. Dumbledore" />
          <Volume2 size={14} />
          <span>
            {speakingWelcome ? "Dumbledore falando..." : "Ouvir boas-vindas de Dumbledore"}
          </span>
        </button>

        <div className="home-status-strip">
          <span>
            Salas liberadas: <strong>{unlockedHouses.length}/4</strong>
          </span>
          <span className="strip-dot">•</span>
          <span>
            Tema ativo: <strong>{current.name}</strong>
          </span>
        </div>
      </WizFrame>

      <HallowsDivider label="Atividades de Hogwarts" />

      {/* 4 Clean Visual Portals */}
      <div className="portal-grid">
        {PORTALS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              className={`portal-card ${item.featured ? "is-featured" : ""}`}
              onClick={() => go(item.id)}
            >
              <span className="wf-corner wf-tl" aria-hidden="true" />
              <span className="wf-corner wf-br" aria-hidden="true" />
              <div className="portal-top">
                <span className="portal-icon">
                  <Icon size={20} />
                </span>
                <span className="portal-tag">{item.tag}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <span className="portal-link">
                {item.cta} <ArrowRight size={15} />
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
