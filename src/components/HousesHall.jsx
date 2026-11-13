import { useState } from "react";
import {
  Lock,
  Unlock,
  Sparkles,
  ShieldAlert,
  Award,
  RotateCcw,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Wand2,
} from "lucide-react";
import { HOUSES, HOUSE_ORDER, NEUTRAL_THEME } from "../data/houses";
import { HOUSE_QUIZZES, HOUSE_UNLOCK_MIN_SCORE } from "../data/houseQuizzes";
import { HouseCrest, GuardianAnimalShowcase } from "./HouseCrest";
import TiltCard from "./TiltCard";
import { magicAudio } from "../utils/sound";

const ROMAN = ["I", "II", "III", "IV"];

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function HousesHall({
  sortedHouse,
  unlockedHouses = [],
  activeTheme,
  onSelectTheme,
  onUnlockHouse,
  onResetSorting,
  onStartSorting,
}) {
  const [quizHouseId, setQuizHouseId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [qIndex, setQIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const startHouseTrial = (houseId) => {
    const quizData = HOUSE_QUIZZES[houseId];
    if (!quizData) return;
    magicAudio.spellCast();
    const prepared = shuffle(quizData.questions).map((q) => ({
      ...q,
      options: shuffle(q.options),
    }));
    setQuizHouseId(houseId);
    setQuestions(prepared);
    setQIndex(0);
    setSelectedOpt(null);
    setScore(0);
    setQuizFinished(false);
  };

  const handleSelectOption = (opt) => {
    if (selectedOpt) return;
    setSelectedOpt(opt);
    const currentQ = questions[qIndex];
    if (opt === currentQ.answer) {
      magicAudio.correct();
      setScore((s) => s + 1);
    } else {
      magicAudio.wrong();
    }
  };

  const handleNext = () => {
    if (qIndex + 1 >= questions.length) {
      const passed = score >= HOUSE_UNLOCK_MIN_SCORE;
      if (passed) {
        magicAudio.reveal();
        onUnlockHouse(quizHouseId);
      } else {
        magicAudio.prank();
      }
      setQuizFinished(true);
      return;
    }
    magicAudio.sparkle();
    setQIndex((i) => i + 1);
    setSelectedOpt(null);
  };

  // ==================== ACTIVE HOUSE QUIZ TRIAL ====================
  if (quizHouseId) {
    const targetHouse = HOUSES[quizHouseId];
    const quizMeta = HOUSE_QUIZZES[quizHouseId];
    const currentQ = questions[qIndex];
    const passed = score >= HOUSE_UNLOCK_MIN_SCORE;

    return (
      <div className="house-trial-view fade-in">
        <div className="view-topbar">
          <button className="btn-grimoire-back" onClick={() => setQuizHouseId(null)}>
            ← Voltar às Casas
          </button>
          <span className="grimoire-pill" style={{ borderColor: targetHouse.colors.secondary }}>
            {quizMeta.title}
          </span>
        </div>

        {!quizFinished && currentQ && (
          <div
            className="grimoire-stage"
            style={{
              "--card-ornament": targetHouse.colors.secondary,
              "--card-glow": targetHouse.colors.glow,
            }}
          >
            <div className="grimoire-corner tl" />
            <div className="grimoire-corner tr" />
            <div className="grimoire-corner bl" />
            <div className="grimoire-corner br" />

            <div className="trial-header-strip">
              <div className="trial-crest-mini">
                <HouseCrest houseId={quizHouseId} size={46} />
                <div>
                  <small>{quizMeta.guardian}</small>
                  <strong>
                    Pergunta {qIndex + 1} de {questions.length}
                  </strong>
                </div>
              </div>
              <div className="trial-score-counter">
                <span>Acertos</span>
                <strong>
                  {score} / {HOUSE_UNLOCK_MIN_SCORE} mín.
                </strong>
              </div>
            </div>

            <div className="rune-progress-track">
              {questions.map((_, idx) => (
                <span
                  key={idx}
                  className={`rune-step ${idx < qIndex ? "done" : ""} ${idx === qIndex ? "active" : ""}`}
                />
              ))}
            </div>

            <div className="parchment-question-box">
              <span className="parchment-seal">❖ Enigma da Casa {targetHouse.name} ❖</span>
              <h2>{currentQ.question}</h2>
            </div>

            <div className="spellbook-options-grid">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOpt === opt;
                const isCorrect = opt === currentQ.answer;
                let statusClass = "";
                if (selectedOpt) {
                  if (isCorrect) statusClass = "is-correct";
                  else if (isSelected) statusClass = "is-wrong";
                  else statusClass = "is-dimmed";
                }

                return (
                  <button
                    key={opt}
                    type="button"
                    className={`spell-tablet-btn ${statusClass}`}
                    disabled={!!selectedOpt}
                    onClick={() => handleSelectOption(opt)}
                  >
                    <span className="tablet-wax-seal">{ROMAN[idx] || "•"}</span>
                    <span className="tablet-text">{opt}</span>
                    <span className="tablet-status-icon">
                      {selectedOpt && isCorrect && <CheckCircle2 size={20} />}
                      {selectedOpt && isSelected && !isCorrect && <XCircle size={20} />}
                    </span>
                  </button>
                );
              })}
            </div>

            {selectedOpt && (
              <div className="grimoire-explanation-drawer">
                <p>{currentQ.explanation}</p>
                <button className="btn-hogwarts-gold" onClick={handleNext}>
                  <span>
                    {qIndex + 1 >= questions.length ? "Ver Sentença do Guardião" : "Próximo Enigma"}
                  </span>
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        )}

        {quizFinished && (
          <div className="grimoire-stage trial-result-box">
            <div className="grimoire-corner tl" />
            <div className="grimoire-corner tr" />
            <div className="grimoire-corner bl" />
            <div className="grimoire-corner br" />

            <GuardianAnimalShowcase themeId={quizHouseId} />

            {passed ? (
              <>
                <span className="eyebrow-pill">Guardião Conquistado!</span>
                <h1 style={{ color: targetHouse.colors.secondary }}>
                  Tema de {targetHouse.name} Desbloqueado!
                </h1>
                <p className="trial-verdict-text">
                  Você acertou <strong>{score}</strong> de <strong>{questions.length}</strong>{" "}
                  perguntas! O <strong>{targetHouse.animalName}</strong> reconheceu seu valor e
                  liberou o brasão de <strong>{targetHouse.name}</strong> no topo do site.
                </p>
                <div className="reveal-actions">
                  <button
                    className="btn-hogwarts-gold"
                    onClick={() => {
                      magicAudio.themeSwitch(quizHouseId);
                      onSelectTheme(quizHouseId);
                      setQuizHouseId(null);
                    }}
                  >
                    <Sparkles size={18} /> Ativar Tema 3D de {targetHouse.name} Agora
                  </button>
                  <button className="btn-grimoire-secondary" onClick={() => setQuizHouseId(null)}>
                    Voltar às Casas
                  </button>
                </div>
              </>
            ) : (
              <>
                <span className="eyebrow-pill prank-pill">Passagem Negada pelo Guardião!</span>
                <h1 className="prank-title">A Porta Permanece Selada!</h1>
                <p className="trial-verdict-text">
                  Você acertou <strong>{score}</strong> de <strong>{questions.length}</strong>, mas
                  eram necessários pelo menos <strong>{HOUSE_UNLOCK_MIN_SCORE} acertos</strong> para
                  liberar o tema de <strong>{targetHouse.name}</strong>.
                </p>
                <div className="result-box prank-box">
                  {quizHouseId === "hufflepuff" && (
                    <p>Você bateu no barril errado e levou um banho de vinagre nos porões da Lufa-Lufa!</p>
                  )}
                  {quizHouseId === "ravenclaw" && (
                    <p>A aldrava de águia de bronze fechou o bico: você terá que estudar mais antes de entrar!</p>
                  )}
                  {quizHouseId === "gryffindor" && (
                    <p>A Mulher Gorda se recusou a abrir o retrato sem o conhecimento correto da Grifinória!</p>
                  )}
                  {quizHouseId === "slytherin" && (
                    <p>A parede de pedra das masmorras permaneceu imóvel sob o Lago Negro!</p>
                  )}
                </div>
                <div className="reveal-actions">
                  <button
                    className="btn-hogwarts-gold"
                    onClick={() => startHouseTrial(quizHouseId)}
                  >
                    <RotateCcw size={17} /> Tentar Desafio Novamente
                  </button>
                  <button className="btn-grimoire-secondary" onClick={() => setQuizHouseId(null)}>
                    Voltar às Casas
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
  }

  // ==================== HOUSES OVERVIEW & UNLOCK HUB ====================
  return (
    <div className="houses-hall fade-in">
      <header className="section-header">
        <span className="eyebrow-pill">Temas 3D, Guardiões &amp; Desafios das Casas</span>
        <h1>Salão das Casas &amp; Provas dos Fundadores</h1>
        <p>
          Ao entrar em Hogwarts, você começa no <strong>Salão Principal (Modo Neutro)</strong>. O{" "}
          <strong>Chapéu Seletor</strong> revela e libera sua primeira Casa. Para desbloquear os
          temas 3D das outras Casas no topo da tela, vença o <strong>Desafio do Guardião</strong> de
          cada uma!
        </p>
      </header>

      {/* If user hasn't done Sorting Hat yet */}
      {!sortedHouse ? (
        <div className="unsorted-callout grimoire-stage">
          <div className="grimoire-corner tl" />
          <div className="grimoire-corner tr" />
          <div className="grimoire-corner bl" />
          <div className="grimoire-corner br" />
          <ShieldAlert size={42} className="gold-icon" />
          <h2>Você ainda está no Banquete de Boas-Vindas!</h2>
          <p>
            Antes de desbloquear qualquer Casa ou desafiar os Guardiões, todo bruxo precisa passar
            pela <strong>Cerimônia do Chapéu Seletor</strong>. Ele escolherá sua Casa inicial e
            aplicará automaticamente o tema dela ao site!
          </p>
          <button className="btn-hogwarts-gold" onClick={onStartSorting}>
            <Wand2 size={18} /> Ir para o Chapéu Seletor Agora
          </button>
        </div>
      ) : (
        <div className="sorted-controls-bar">
          <div className="sorted-status-text">
            <span>
              Casa de Origem pelo Chapéu: <strong>{HOUSES[sortedHouse]?.name}</strong> • Temas
              liberados: <strong>{unlockedHouses.length} de 4</strong>
            </span>
          </div>
          {!confirmReset ? (
            <button className="btn-reset-hat" onClick={() => setConfirmReset(true)}>
              <RotateCcw size={15} /> Refazer Chapéu Seletor
            </button>
          ) : (
            <div className="reset-confirm-inline">
              <span>Refazer o Chapéu apagará as Casas desbloqueadas! Confirmar?</span>
              <button
                className="btn-danger-sm"
                onClick={() => {
                  setConfirmReset(false);
                  onResetSorting();
                }}
              >
                Sim, Zerar e Refazer
              </button>
              <button className="btn-grimoire-secondary sm" onClick={() => setConfirmReset(false)}>
                Cancelar
              </button>
            </div>
          )}
        </div>
      )}

      {/* NEUTRAL GREAT HALL CARD */}
      <div className="neutral-hall-banner grimoire-stage">
        <div className="neutral-banner-left">
          <HouseCrest houseId="neutral" size={62} />
          <div>
            <span className="house-element">Modo Padrão Inicial • Sempre Liberado</span>
            <h2>{NEUTRAL_THEME.name} — {NEUTRAL_THEME.subtitle}</h2>
            <p>{NEUTRAL_THEME.environmentDesc}</p>
          </div>
        </div>
        <button
          className={`btn-grimoire-secondary ${activeTheme === "neutral" ? "is-active-theme" : ""}`}
          onClick={() => {
            magicAudio.themeSwitch("neutral");
            onSelectTheme("neutral");
          }}
        >
          {activeTheme === "neutral" ? "✓ Tema Ativo no Momento" : "Ativar Salão Principal"}
        </button>
      </div>

      {/* 4 HOUSE CARDS */}
      <div className="houses-grid">
        {HOUSE_ORDER.map((id) => {
          const h = HOUSES[id];
          const isUnlocked = unlockedHouses.includes(id);
          const isCurrentTheme = activeTheme === id;
          const isHatHouse = sortedHouse === id;

          return (
            <TiltCard
              key={id}
              className={`house-hall-card grimoire-card ${isCurrentTheme ? "is-active" : ""} ${
                !isUnlocked ? "is-locked-card" : ""
              }`}
              glowColor={h.colors.glow}
              style={{
                borderColor: isCurrentTheme
                  ? h.colors.secondary
                  : isUnlocked
                  ? `${h.colors.secondary}66`
                  : "rgba(255,255,255,0.12)",
              }}
            >
              <div className="house-card-top">
                <HouseCrest houseId={id} size={74} locked={!isUnlocked} />
                <div className="house-card-titles">
                  <div className="house-badges-row">
                    <span className="house-element">
                      {h.element} • {h.animal}
                    </span>
                    {isHatHouse && <span className="hat-origin-Tag">Sua Casa do Chapéu</span>}
                  </div>
                  <h2>{h.name}</h2>
                  <p className="house-founder">Fundador(a): {h.founder}</p>
                </div>
              </div>

              <GuardianAnimalShowcase themeId={id} />

              <blockquote className="house-motto">“{h.motto}”</blockquote>
              <p className="house-philosophy">{h.environmentDesc}</p>

              <div className="house-traits">
                {h.traits.map((t) => (
                  <span key={t} className="trait-pill" style={{ borderColor: h.colors.secondary }}>
                    {t}
                  </span>
                ))}
              </div>

              <div className="house-card-actions">
                {isUnlocked ? (
                  <>
                    <button
                      className={`btn-hogwarts-gold full-w ${isCurrentTheme ? "active-glow" : ""}`}
                      onClick={() => {
                        magicAudio.themeSwitch(id);
                        onSelectTheme(id);
                      }}
                    >
                      <Unlock size={16} />
                      <span>
                        {isCurrentTheme
                          ? `Tema ${h.name} Ativo`
                          : `Aplicar Tema 3D de ${h.name}`}
                      </span>
                    </button>
                    <button
                      className="btn-grimoire-secondary full-w"
                      onClick={() => startHouseTrial(id)}
                    >
                      <Award size={16} /> Praticar Quiz de {h.name} (8 Perguntas)
                    </button>
                  </>
                ) : sortedHouse ? (
                  <button
                    className="btn-hogwarts-gold full-w"
                    onClick={() => startHouseTrial(id)}
                  >
                    <Lock size={16} />
                    <span>
                      Desafiar Guardião ({HOUSE_UNLOCK_MIN_SCORE}/8 para Liberar Tema)
                    </span>
                  </button>
                ) : (
                  <button className="btn-grimoire-secondary full-w" onClick={onStartSorting}>
                    <Lock size={16} /> Faça o Chapéu Seletor Primeiro
                  </button>
                )}
              </div>
            </TiltCard>
          );
        })}
      </div>
    </div>
  );
}
