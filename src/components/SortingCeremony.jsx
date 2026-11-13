import { useEffect, useMemo, useState } from "react";
import {
  Flame,
  Waves,
  Sparkles,
  Leaf,
  FlaskConical,
  Heart,
  Moon,
  Feather,
  Shield,
  Sword,
  Crown,
  KeyRound,
  Trophy,
  Wand2,
  RotateCcw,
  Volume2,
} from "lucide-react";
import { HOUSES, HOUSE_ORDER, VIRTUE_LABELS } from "../data/houses";
import { TOTAL_SORTING_STEPS, pickNextSortingQuestion } from "../data/sortingData";
import TiltCard from "./TiltCard";
import { HouseCrest, SortingHat3D, GuardianAnimalShowcase } from "./HouseCrest";
import { magicAudio } from "../utils/sound";

const ICON_MAP = {
  sword: Sword,
  locket: KeyRound,
  diadem: Crown,
  cup: Trophy,
  flame: Flame,
  waves: Waves,
  sparkles: Sparkles,
  leaf: Leaf,
  flask: FlaskConical,
  heart: Heart,
  moon: Moon,
  feather: Feather,
  shield: Shield,
};

const ROMAN = ["I", "II", "III", "IV"];

const INITIAL_SCORES = {
  gryffindor: 0,
  slytherin: 0,
  ravenclaw: 0,
  hufflepuff: 0,
};

const INITIAL_VIRTUES = {
  courage: 0,
  daring: 0,
  ambition: 0,
  cunning: 0,
  wisdom: 0,
  curiosity: 0,
  loyalty: 0,
  fairness: 0,
};

export default function SortingCeremony({
  sortedHouse,
  unlockedCount = 0,
  onCompleteHouse,
  onResetSorting,
  onGoHouses,
  onGoQuiz,
}) {
  const [stage, setStage] = useState("intro"); // intro | testing | deliberating | reveal
  const [step, setStep] = useState(0);
  const [answeredIds, setAnsweredIds] = useState([]);
  const [scores, setScores] = useState(INITIAL_SCORES);
  const [virtues, setVirtues] = useState(INITIAL_VIRTUES);
  const [scaleIndex, setScaleIndex] = useState(2);
  const [deliberationLine, setDeliberationLine] = useState("Hmm... interessante...");
  const [transitioning, setTransitioning] = useState(false);

  const currentQuestion = useMemo(() => {
    if (stage !== "testing") return null;
    return pickNextSortingQuestion(answeredIds, scores, step);
  }, [stage, answeredIds, scores, step]);

  const sortedHouseResults = useMemo(() => {
    const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
    return HOUSE_ORDER.map((id) => ({
      id,
      house: HOUSES[id],
      score: scores[id],
      percent: Math.round((scores[id] / total) * 100),
    })).sort((a, b) => b.score - a.score);
  }, [scores]);

  const winningHouse = sortedHouseResults[0];
  const runnerUpHouse = sortedHouseResults[1];

  const topVirtues = useMemo(() => {
    const maxVal = Math.max(...Object.values(virtues), 1);
    return Object.entries(virtues)
      .map(([key, value]) => ({
        key,
        ...VIRTUE_LABELS[key],
        value,
        percent: Math.round((value / maxVal) * 100),
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [virtues]);

  useEffect(() => {
    if (stage !== "deliberating") return;
    const h1 = winningHouse.house.name;
    const h2 = runnerUpHouse.house.name;
    const lines = [
      "Hmm... difícil... muito difícil...",
      `Vejo grande potencial para ${h1}, mas também traços de ${h2}...`,
      "Onde devo colocar você? Já sei...",
      winningHouse.house.hatSpeech,
    ];
    setDeliberationLine(lines[0]);
    magicAudio.speakHat(`Hmm... difícil. Vejo traços de ${h1} e ${h2}...`, false);

    const t1 = setTimeout(() => setDeliberationLine(lines[1]), 1100);
    const t2 = setTimeout(() => setDeliberationLine(lines[2]), 2200);
    const t3 = setTimeout(() => {
      setDeliberationLine(lines[3]);
      magicAudio.speakHat(winningHouse.house.hatSpeech, true);
    }, 3100);
    const t4 = setTimeout(() => {
      magicAudio.reveal();
      setStage("reveal");
      onCompleteHouse(winningHouse.id);
    }, 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [stage, winningHouse, runnerUpHouse, onCompleteHouse]);

  const startTest = () => {
    if (sortedHouse && onResetSorting) {
      onResetSorting();
    }
    magicAudio.spellCast();
    setStage("testing");
    setStep(0);
    setAnsweredIds([]);
    setScores(INITIAL_SCORES);
    setVirtues(INITIAL_VIRTUES);
    setScaleIndex(2);
  };

  const applyAnswer = (weights, answerVirtues) => {
    if (transitioning || !currentQuestion) return;
    magicAudio.sparkle();
    setTransitioning(true);

    const nextScores = { ...scores };
    Object.entries(weights || {}).forEach(([h, pts]) => {
      nextScores[h] = (nextScores[h] || 0) + pts;
    });

    const nextVirtues = { ...virtues };
    Object.entries(answerVirtues || {}).forEach(([v, pts]) => {
      nextVirtues[v] = (nextVirtues[v] || 0) + pts;
    });

    const nextAnswered = [...answeredIds, currentQuestion.id];
    const nextStep = step + 1;

    setTimeout(() => {
      setScores(nextScores);
      setVirtues(nextVirtues);
      setAnsweredIds(nextAnswered);
      setScaleIndex(2);
      setTransitioning(false);

      if (nextStep >= TOTAL_SORTING_STEPS) {
        setStage("deliberating");
      } else {
        setStep(nextStep);
      }
    }, 240);
  };

  return (
    <div className="sorting-ceremony fade-in">
      {/* INTRO */}
      {stage === "intro" && (
        <div className="grimoire-stage ceremony-intro">
          <div className="grimoire-corner tl" />
          <div className="grimoire-corner tr" />
          <div className="grimoire-corner bl" />
          <div className="grimoire-corner br" />

          <SortingHat3D size={168} />
          <span className="eyebrow-pill">Cerimônia Oficial com Voz do Chapéu</span>
          <h1>O Teste do Chapéu Seletor</h1>
          <p className="intro-lead">
            Sente-se no banquinho do Salão Principal. Ao longo de{" "}
            <strong>{TOTAL_SORTING_STEPS} provações interativas ramificadas</strong>, o Chapéu lerá
            suas escolhas diante de relíquias, poções, feitiços e dilemas morais — e no final{" "}
            <strong>anunciará em voz alta sua Casa</strong>, transformando todo o site!
          </p>

          {sortedHouse && (
            <div className="resort-warning-box">
              <strong>⚠️ Atenção ao Refazer:</strong> Você já pertence à{" "}
              <strong>{HOUSES[sortedHouse]?.name}</strong>{" "}
              {unlockedCount > 1 && `e liberou ${unlockedCount} casas`}. Iniciar uma nova cerimônia
              apagará as casas liberadas anteriormente e retornará ao Salão Principal até a nova
              decisão do Chapéu!
            </div>
          )}

          <div className="intro-features">
            <span>🕯️ 15 Provas em Fluxo Adaptativo</span>
            <span>🔊 Voz do Chapéu Seletor</span>
            <span>🦁 Libera o Tema 3D e Animal da Casa</span>
          </div>

          <button className="btn-hogwarts-gold" onClick={startTest}>
            <Wand2 size={18} />
            <span>{sortedHouse ? "Zerar Progresso e Refazer Seleção" : "Colocar o Chapéu Seletor"}</span>
          </button>
        </div>
      )}

      {/* TESTING */}
      {stage === "testing" && currentQuestion && (
        <div className={`grimoire-stage sorting-stage ${transitioning ? "is-fading" : ""}`}>
          <div className="grimoire-corner tl" />
          <div className="grimoire-corner tr" />
          <div className="grimoire-corner bl" />
          <div className="grimoire-corner br" />

          <div className="sorting-hud-row">
            <span className="trial-type-badge">
              {currentQuestion.type === "relic" && "✦ Relíquia Ancestral ✦"}
              {currentQuestion.type === "sensory" && "✦ Sintonia Mágica ✦"}
              {currentQuestion.type === "spell" && "✦ Reflexo de Varinha ✦"}
              {currentQuestion.type === "scale" && "✦ Balança de Valores ✦"}
              {currentQuestion.type === "dilemma" && "✦ Dilema dos Fundadores ✦"}
            </span>
            <span className="step-counter">
              Prova {step + 1} / {TOTAL_SORTING_STEPS}
            </span>
          </div>

          {/* 15 Enchanted Runes Progress */}
          <div className="rune-progress-track">
            {Array.from({ length: TOTAL_SORTING_STEPS }).map((_, idx) => (
              <span
                key={idx}
                className={`rune-step ${idx < step ? "done" : ""} ${idx === step ? "active" : ""}`}
              />
            ))}
          </div>

          <div className="parchment-question-box">
            <h2>{currentQuestion.title}</h2>
            <p>{currentQuestion.subtitle}</p>
          </div>

          {/* RELIC / SENSORY / SPELL / DILEMMA */}
          {currentQuestion.type !== "scale" && (
            <div className="sorting-relic-grid">
              {currentQuestion.options.map((opt, idx) => {
                const IconComp = opt.icon ? ICON_MAP[opt.icon] : null;
                return (
                  <TiltCard
                    key={opt.id}
                    className="relic-choice-card"
                    glowColor={opt.accent ? `${opt.accent}66` : "rgba(212,175,55,0.45)"}
                    onClick={() => applyAnswer(opt.weights, opt.virtues)}
                    style={{
                      "--choice-accent": opt.accent || "#e5c158",
                    }}
                  >
                    <div className="relic-card-top">
                      <span className="tablet-wax-seal">{ROMAN[idx] || "✦"}</span>
                      {IconComp && (
                        <div className="relic-icon-medallion">
                          <IconComp size={22} />
                        </div>
                      )}
                      {opt.spell && <span className="spell-incantation-tag">🪄 {opt.spell}</span>}
                    </div>
                    <h3>{opt.label}</h3>
                    <p>{opt.detail}</p>
                    <div className="relic-card-footer">
                      <span>Escolher Destino</span>
                      <span>⟶</span>
                    </div>
                  </TiltCard>
                );
              })}
            </div>
          )}

          {/* SCALE / PENDULUM */}
          {currentQuestion.type === "scale" && (
            <div className="scale-altar-box">
              <div className="scale-poles">
                <span>⚖️ {currentQuestion.leftLabel}</span>
                <span>{currentQuestion.rightLabel} ⚖️</span>
              </div>

              <div className="scale-track">
                {currentQuestion.steps.map((s, idx) => (
                  <button
                    key={s.label}
                    type="button"
                    className={`scale-node ${scaleIndex === idx ? "active" : ""}`}
                    onClick={() => {
                      magicAudio.sparkle();
                      setScaleIndex(idx);
                    }}
                  >
                    <span className="scale-dot">{ROMAN[idx] || "V"}</span>
                    <span className="scale-node-label">{s.label}</span>
                  </button>
                ))}
              </div>

              <button
                className="btn-hogwarts-gold"
                onClick={() =>
                  applyAnswer(
                    currentQuestion.steps[scaleIndex].weights,
                    currentQuestion.steps[scaleIndex].virtues
                  )
                }
              >
                <Wand2 size={18} /> Selar Inclinação na Balança
              </button>
            </div>
          )}
        </div>
      )}

      {/* DELIBERATING */}
      {stage === "deliberating" && (
        <div className="grimoire-stage deliberation-stage">
          <div className="grimoire-corner tl" />
          <div className="grimoire-corner tr" />
          <div className="grimoire-corner bl" />
          <div className="grimoire-corner br" />

          <SortingHat3D deliberating size={190} />
          <span className="eyebrow-pill">
            <Volume2 size={14} /> O Chapéu Está Falando...
          </span>
          <h2>Sondando os Pensamentos e Virtudes...</h2>
          <p className="hat-whisper">“{deliberationLine}”</p>
          <div className="magic-loader-bar">
            <span />
          </div>
        </div>
      )}

      {/* REVEAL */}
      {stage === "reveal" && winningHouse && (
        <div
          className="grimoire-stage reveal-stage"
          style={{
            borderColor: winningHouse.house.colors.secondary,
            boxShadow: `0 0 65px ${winningHouse.house.colors.glow}`,
          }}
        >
          <div className="grimoire-corner tl" />
          <div className="grimoire-corner tr" />
          <div className="grimoire-corner bl" />
          <div className="grimoire-corner br" />

          <div className="reveal-hero-showcase">
            <HouseCrest houseId={winningHouse.id} size={115} />
            <GuardianAnimalShowcase themeId={winningHouse.id} />
          </div>

          <span className="eyebrow-pill">
            <Sparkles size={14} /> Tema 3D Aplicado Automaticamente!
          </span>
          <h1 className="reveal-house-name" style={{ color: winningHouse.house.colors.secondary }}>
            {winningHouse.house.name}!
          </h1>
          <p className="reveal-founder">
            Fundador: {winningHouse.house.founder} • Guardião: {winningHouse.house.animalName}
          </p>

          <button
            className="btn-grimoire-secondary sm"
            style={{ margin: "0 auto 1.2rem" }}
            onClick={() => magicAudio.speakHat(winningHouse.house.hatSpeech, true)}
          >
            <Volume2 size={15} /> Ouvir Voz do Chapéu Novamente
          </button>

          <blockquote className="reveal-motto">“{winningHouse.house.motto}”</blockquote>
          <p className="reveal-philosophy">{winningHouse.house.founderPhilosophy}</p>

          <div className="reveal-analytics">
            <div className="analytics-block">
              <h3>Sintonia com as Casas</h3>
              <div className="bars-list">
                {sortedHouseResults.map((item) => (
                  <div key={item.id} className="bar-row">
                    <div className="bar-label">
                      <span>{item.house.name}</span>
                      <strong>{item.percent}%</strong>
                    </div>
                    <div className="bar-track">
                      <div
                        className="bar-fill"
                        style={{
                          width: `${item.percent}%`,
                          background: item.house.colors.secondary,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="analytics-block">
              <h3>Virtudes Reconhecidas</h3>
              <div className="bars-list">
                {topVirtues.map((v) => (
                  <div key={v.key} className="bar-row">
                    <div className="bar-label">
                      <span>{v.name}</span>
                      <strong>{v.percent}%</strong>
                    </div>
                    <div className="bar-track">
                      <div
                        className="bar-fill"
                        style={{
                          width: `${v.percent}%`,
                          background: HOUSES[v.house].colors.secondary,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="reveal-actions">
            <button className="btn-hogwarts-gold" onClick={onGoHouses}>
              🔓 Desbloquear as Outras 3 Casas no Quiz das Casas
            </button>
            <button className="btn-grimoire-secondary" onClick={onGoQuiz}>
              Ir para o Quiz Filmes &amp; Livros
            </button>
            <button className="btn-grimoire-secondary" onClick={startTest}>
              <RotateCcw size={16} /> Zerar e Refazer Chapéu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
