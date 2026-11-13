import { Sparkles, BookOpen, Shield, Wand2, Lock, Unlock } from "lucide-react";
import { HOUSES, HOUSE_ORDER, NEUTRAL_THEME } from "../data/houses";
import TiltCard from "./TiltCard";
import { GoldenSnitch3D, HouseCrest, GuardianAnimalShowcase } from "./HouseCrest";
import { magicAudio } from "../utils/sound";

export default function SanctuaryHome({
  sortedHouse,
  unlockedHouses = [],
  activeTheme = "neutral",
  onNavigate,
  onSelectTheme,
}) {
  const isNeutral = activeTheme === "neutral" || !HOUSES[activeTheme];
  const currentThemeObj = isNeutral ? NEUTRAL_THEME : HOUSES[activeTheme];

  const go = (view) => {
    magicAudio.sparkle();
    onNavigate(view);
  };

  return (
    <div className="sanctuary-home fade-in">
      <section className="hero-banner grimoire-stage">
        <div className="grimoire-corner tl" />
        <div className="grimoire-corner tr" />
        <div className="grimoire-corner bl" />
        <div className="grimoire-corner br" />

        <div className="hero-visual-top">
          <GoldenSnitch3D size={62} />
          <GuardianAnimalShowcase themeId={activeTheme} />
        </div>

        <span className="eyebrow-pill">
          <Sparkles size={14} />{" "}
          {isNeutral
            ? "Modo Neutro • Salão Principal de Banquetes"
            : `Santuário de ${currentThemeObj.name} • ${currentThemeObj.animalName}`}
        </span>

        <h1 className="hero-title">
          {isNeutral ? (
            <>
              Bem-Vindo ao <span className="gold-shimmer">Salão Principal</span>
            </>
          ) : (
            <>
              Domínio da <span className="gold-shimmer">{currentThemeObj.name}</span>
            </>
          )}
        </h1>

        <p className="hero-subtitle">{currentThemeObj.environmentDesc}</p>

        {/* Theme Unlock Progress Strip */}
        <div className="unlock-strip">
          <div className="unlock-strip-title">
            {sortedHouse ? (
              <span>
                Casas Desbloqueadas no Topo: <strong>{unlockedHouses.length} de 4</strong>
              </span>
            ) : (
              <span>
                🔒 Faça o <strong>Chapéu Seletor</strong> para descobrir sua Casa e liberar os temas!
              </span>
            )}
          </div>

          <div className="unlock-mini-crests">
            {HOUSE_ORDER.map((id) => {
              const unlocked = unlockedHouses.includes(id);
              const active = activeTheme === id;
              return (
                <button
                  key={id}
                  type="button"
                  className={`mini-crest-btn ${active ? "is-active" : ""} ${
                    !unlocked ? "is-locked" : ""
                  }`}
                  onClick={() => {
                    if (unlocked) {
                      magicAudio.themeSwitch(id);
                      onSelectTheme(id);
                    } else {
                      go(sortedHouse ? "houses" : "sorting");
                    }
                  }}
                >
                  <HouseCrest houseId={id} size={38} locked={!unlocked} />
                  <span>{HOUSES[id].name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="portal-grid">
        <TiltCard
          className="portal-card grimoire-card"
          glowColor="rgba(229, 193, 88, 0.45)"
          onClick={() => go("sorting")}
        >
          <div className="grimoire-corner tl" />
          <div className="grimoire-corner tr" />
          <div className="grimoire-corner bl" />
          <div className="grimoire-corner br" />

          <div className="portal-top-row">
            <div className="portal-icon-badge gold">
              <Wand2 size={26} />
            </div>
            <span className="portal-tag">15 Provas + Voz do Chapéu</span>
          </div>
          <h2>Cerimônia do Chapéu Seletor</h2>
          <p>
            Encare relíquias, poções, feitiços e a balança dos Fundadores. O Chapéu anunciará sua
            Casa em voz alta e transformará o site automaticamente!
          </p>
          <div className="relic-card-footer">
            <span>{sortedHouse ? "Refazer Cerimônia" : "Iniciar Seleção"}</span>
            <span>⟶</span>
          </div>
        </TiltCard>

        <TiltCard
          className="portal-card grimoire-card"
          glowColor="rgba(46, 230, 138, 0.4)"
          onClick={() => go("houses")}
        >
          <div className="grimoire-corner tl" />
          <div className="grimoire-corner tr" />
          <div className="grimoire-corner bl" />
          <div className="grimoire-corner br" />

          <div className="portal-top-row">
            <div className="portal-icon-badge emerald">
              <Shield size={26} />
            </div>
            <span className="portal-tag">
              {unlockedHouses.length}/4 Casas Liberadas
            </span>
          </div>
          <h2>Provas das Casas &amp; Guardiões</h2>
          <p>
            Quer liberar os temas 3D e os animais das outras Casas no topo do site? Vença o quiz
            dedicado de cada Casa atingindo a pontuação mínima!
          </p>
          <div className="relic-card-footer">
            <span>Desafiar Guardiões</span>
            <span>⟶</span>
          </div>
        </TiltCard>

        <TiltCard
          className="portal-card grimoire-card"
          glowColor="rgba(115, 179, 255, 0.45)"
          onClick={() => go("quiz")}
        >
          <div className="grimoire-corner tl" />
          <div className="grimoire-corner tr" />
          <div className="grimoire-corner bl" />
          <div className="grimoire-corner br" />

          <div className="portal-top-row">
            <div className="portal-icon-badge blue">
              <BookOpen size={26} />
            </div>
            <span className="portal-tag">Filmes vs. Livros • 4 Níveis</span>
          </div>
          <h2>Desafio dos Saberes Bruxos</h2>
          <p>
            Escolha entre os <strong>8 Filmes</strong> ou os <strong>7 Livros</strong> nos graus{" "}
            <em>Trouxa</em>, <em>Aborto</em>, <em>Bruxo Formado</em> e{" "}
            <em>Mestre das Relíquias</em>. Cuidado com a pegadinha se reprovar!
          </p>
          <div className="relic-card-footer">
            <span>Abrir Pergaminhos</span>
            <span>⟶</span>
          </div>
        </TiltCard>
      </section>
    </div>
  );
}
