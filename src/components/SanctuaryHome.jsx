import { Wand2, Shield, BookOpen, HelpCircle, ArrowRight, Sparkles } from "lucide-react";
import { HOUSES, NEUTRAL_THEME } from "../data/houses";
import { HouseCrest } from "./HouseCrest";
import { WizFrame, HallowsDivider } from "./WizFrame";
import { magicAudio } from "../utils/sound";

const PORTALS = [
  {
    id: "sorting",
    title: "Chapéu Seletor",
    tag: "Cerimônia Oficial",
    desc: "Descubra sua Casa com voz e seleção ramificada.",
    icon: Wand2,
    cta: "Iniciar Seleção",
  },
  {
    id: "houses",
    title: "Provas das Casas",
    tag: "N.O.M.s & N.I.E.M.s",
    desc: "Vença os exames oficiais e libere todas as Salas Comunais.",
    icon: Shield,
    cta: "Fazer Exames",
  },
  {
    id: "quiz",
    title: "Quiz Bruxo",
    tag: "Filmes & Livros",
    desc: "80 perguntas em 4 níveis com Dica da Hermione e Reducto.",
    icon: BookOpen,
    cta: "Abrir Quiz",
  },
  {
    id: "perfil",
    title: "Perfil Bruxo",
    tag: "Novo • 56 Cartas",
    desc: "Adivinhe personagens, criaturas e relíquias em 10 dicas.",
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
  const isHouse = activeTheme !== "neutral" && HOUSES[activeTheme];
  const current = isHouse ? HOUSES[activeTheme] : NEUTRAL_THEME;
  const sortedObj = sortedHouse ? HOUSES[sortedHouse] : null;

  const go = (target) => {
    magicAudio.sparkle();
    onNavigate(target);
  };

  return (
    <section className="home-view">
      {/* Majestic Compact Hero */}
      <WizFrame className="home-hero">
        <div className="home-hero-crest">
          <div className="crest-halo" />
          <HouseCrest houseId={activeTheme} size={118} />
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
            Jogar Perfil HP
          </button>
        </div>

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
