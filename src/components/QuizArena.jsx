import { useMemo, useState } from "react";
import {
  Film,
  BookOpen,
  Sparkles,
  Lightbulb,
  Zap,
  Award,
  AlertTriangle,
  RotateCcw,
  ChevronRight,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { QUIZ_DIVISIONS, QUIZ_LEVELS, QUIZ_QUESTIONS } from "../data/quizData";
import TiltCard from "./TiltCard";
import { magicAudio } from "../utils/sound";

const ROMAN = ["I", "II", "III", "IV"];

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function QuizArena({ onBack }) {
  const [stage, setStage] = useState("division"); // division | level | playing | result
  const [division, setDivision] = useState(null);
  const [level, setLevel] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [showTip, setShowTip] = useState(false);
  const [hiddenOptions, setHiddenOptions] = useState([]);
  const [tipsLeft, setTipsLeft] = useState(2);
  const [reductoLeft, setReductoLeft] = useState(2);

  const currentQuestion = questions[currentIndex] || null;
  const divisionObj = useMemo(
    () => QUIZ_DIVISIONS.find((d) => d.id === division) || null,
    [division]
  );

  const startQuiz = (selectedLevel) => {
    const rawPool = QUIZ_QUESTIONS[division]?.[selectedLevel.id] || [];
    const prepared = shuffleArray(rawPool).map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));

    magicAudio.spellCast();
    setLevel(selectedLevel);
    setQuestions(prepared);
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setShowTip(false);
    setHiddenOptions([]);
    setTipsLeft(2);
    setReductoLeft(2);
    setStage("playing");
  };

  const handleAnswer = (opt) => {
    if (selectedOption || !currentQuestion) return;
    setSelectedOption(opt);

    if (opt === currentQuestion.answer) {
      magicAudio.correct();
      const nextStreak = streak + 1;
      setScore((s) => s + 1);
      setStreak(nextStreak);
      setBestStreak((b) => Math.max(b, nextStreak));
    } else {
      magicAudio.wrong();
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      const passed = score >= (level?.minScore || 5);
      if (passed) {
        magicAudio.reveal();
      } else {
        magicAudio.prank();
      }
      setStage("result");
      return;
    }

    magicAudio.sparkle();
    setCurrentIndex((i) => i + 1);
    setSelectedOption(null);
    setShowTip(false);
    setHiddenOptions([]);
  };

  const useTip = () => {
    if (showTip || tipsLeft <= 0 || selectedOption) return;
    magicAudio.sparkle();
    setTipsLeft((t) => t - 1);
    setShowTip(true);
  };

  const useReducto = () => {
    if (hiddenOptions.length > 0 || reductoLeft <= 0 || selectedOption || !currentQuestion) return;
    magicAudio.spellCast();
    const wrongs = currentQuestion.options.filter((o) => o !== currentQuestion.answer);
    const toHide = shuffleArray(wrongs).slice(0, 2);
    setHiddenOptions(toHide);
    setReductoLeft((r) => r - 1);
  };

  const passed = level ? score >= level.minScore : false;
  const levelIndex = level ? QUIZ_LEVELS.findIndex((l) => l.id === level.id) : -1;
  const lowerLevel = levelIndex > 0 ? QUIZ_LEVELS[levelIndex - 1] : null;
  const nextLevel =
    levelIndex >= 0 && levelIndex < QUIZ_LEVELS.length - 1 ? QUIZ_LEVELS[levelIndex + 1] : null;

  return (
    <div className="quiz-arena fade-in">
      {stage !== "division" && (
        <div className="view-topbar">
          <button
            className="btn-grimoire-back"
            onClick={() => {
              if (stage === "level") setStage("division");
              else if (stage === "playing" || stage === "result") setStage("level");
              else onBack();
            }}
          >
            ← {stage === "level" ? "Trocar Divisão" : "Trocar Nível Bruxo"}
          </button>

          {divisionObj && <span className="grimoire-pill">{divisionObj.name}</span>}
        </div>
      )}

      {/* STEP 1: CHOOSE DIVISION (MOVIES VS BOOKS) */}
      {stage === "division" && (
        <div className="quiz-setup">
          <header className="section-header">
            <span className="eyebrow-pill">Exames Oficiais de Hogwarts</span>
            <h1>Escolha Sua Fonte Canônica</h1>
            <p>
              Perguntas exclusivas da saga <strong>Harry Potter</strong> (sem Animais Fantásticos).
              Deseja ser avaliado pelos <strong>8 Filmes</strong> ou pelos <strong>7 Livros</strong>?
            </p>
          </header>

          <div className="divisions-grid">
            {QUIZ_DIVISIONS.map((div) => (
              <TiltCard
                key={div.id}
                className="division-card grimoire-card"
                glowColor={`${div.accent}66`}
                onClick={() => {
                  magicAudio.spellCast();
                  setDivision(div.id);
                  setStage("level");
                }}
              >
                <div className="grimoire-corner tl" />
                <div className="grimoire-corner tr" />
                <div className="grimoire-corner bl" />
                <div className="grimoire-corner br" />

                <div className="division-icon-medallion" style={{ color: div.accent }}>
                  {div.id === "movies" ? <Film size={32} /> : <BookOpen size={32} />}
                </div>
                <span className="division-badge">{div.badge}</span>
                <h2>{div.name}</h2>
                <h3>{div.subtitle}</h3>
                <p>{div.description}</p>
                <div className="relic-card-footer">
                  <span>Abrir Grimório</span>
                  <span>⟶</span>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: CHOOSE WIZARDING LEVEL */}
      {stage === "level" && (
        <div className="quiz-setup">
          <header className="section-header">
            <span className="eyebrow-pill">{divisionObj?.name}</span>
            <h1>Escolha Seu Grau de Bruxaria</h1>
            <p>
              Cada grau exige uma <strong>pontuação mínima</strong>. Se escolher um grau acima da
              sua varinha e não alcançar a meta, uma <strong>pegadinha mágica</strong> será ativada!
            </p>
          </header>

          <div className="levels-grid">
            {QUIZ_LEVELS.map((lvl, idx) => (
              <TiltCard
                key={lvl.id}
                className="level-card grimoire-card"
                glowColor={`${lvl.accent}66`}
                onClick={() => startQuiz(lvl)}
                style={{ borderColor: `${lvl.accent}88` }}
              >
                <div className="relic-card-top">
                  <span className="tablet-wax-seal">{ROMAN[idx]}</span>
                  <span className="level-rank" style={{ color: lvl.accent }}>
                    {lvl.rank}
                  </span>
                </div>
                <h2>{lvl.name}</h2>
                <p>{lvl.description}</p>
                <div className="level-threshold">
                  <span>Nota de Corte:</span>
                  <strong>
                    {lvl.minScore} / {lvl.totalQuestions} acertos
                  </strong>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: PLAYING (ORNATE GRIMOIRE TABLET) */}
      {stage === "playing" && currentQuestion && (
        <div className="grimoire-stage quiz-playing">
          <div className="grimoire-corner tl" />
          <div className="grimoire-corner tr" />
          <div className="grimoire-corner bl" />
          <div className="grimoire-corner br" />

          <div className="quiz-hud">
            <div className="hud-item">
              <span>Grau</span>
              <strong style={{ color: level.accent }}>{level.name}</strong>
            </div>
            <div className="hud-item">
              <span>Pergunta</span>
              <strong>
                {currentIndex + 1} / {questions.length}
              </strong>
            </div>
            <div className="hud-item">
              <span>Acertos</span>
              <strong>
                {score} <small>(mín. {level.minScore})</small>
              </strong>
            </div>
            <div className="hud-item">
              <span>Combo</span>
              <strong>🔥 {streak}</strong>
            </div>
          </div>

          <div className="rune-progress-track">
            {questions.map((_, idx) => (
              <span
                key={idx}
                className={`rune-step ${idx < currentIndex ? "done" : ""} ${
                  idx === currentIndex ? "active" : ""
                }`}
              />
            ))}
          </div>

          <div className="parchment-question-box">
            <span className="parchment-seal">❖ Pergaminho Nº {currentIndex + 1} ❖</span>
            <h2>{currentQuestion.question}</h2>
          </div>

          {/* Enchanted Lifelines */}
          <div className="lifelines-bar">
            <button
              type="button"
              className="btn-potion-scroll"
              onClick={useTip}
              disabled={showTip || tipsLeft <= 0 || !!selectedOption}
            >
              <Lightbulb size={16} />
              <span>Dica de Hermione ({tipsLeft})</span>
            </button>
            <button
              type="button"
              className="btn-potion-scroll"
              onClick={useReducto}
              disabled={hiddenOptions.length > 0 || reductoLeft <= 0 || !!selectedOption}
            >
              <Zap size={16} />
              <span>Feitiço Reducto 50/50 ({reductoLeft})</span>
            </button>
          </div>

          {showTip && currentQuestion.tip && (
            <div className="tip-box">
              <Sparkles size={16} /> <span>“{currentQuestion.tip}”</span>
            </div>
          )}

          {/* Ornate Hogwarts Spell Tablets */}
          <div className="spellbook-options-grid">
            {currentQuestion.options.map((opt, idx) => {
              const isHidden = hiddenOptions.includes(opt);
              const isSelected = selectedOption === opt;
              const isCorrect = opt === currentQuestion.answer;

              let stateClass = "";
              if (selectedOption) {
                if (isCorrect) stateClass = "is-correct";
                else if (isSelected) stateClass = "is-wrong";
                else stateClass = "is-dimmed";
              }

              return (
                <button
                  key={opt}
                  type="button"
                  className={`spell-tablet-btn ${stateClass} ${isHidden ? "is-hidden-opt" : ""}`}
                  disabled={!!selectedOption || isHidden}
                  onClick={() => handleAnswer(opt)}
                >
                  <span className="tablet-wax-seal">{ROMAN[idx] || "•"}</span>
                  <span className="tablet-text">
                    {isHidden ? "✦ Alternativa pulverizada por Reducto ✦" : opt}
                  </span>
                  <span className="tablet-status-icon">
                    {selectedOption && isCorrect && <CheckCircle2 size={20} />}
                    {selectedOption && isSelected && !isCorrect && <XCircle size={20} />}
                  </span>
                </button>
              );
            })}
          </div>

          {selectedOption && (
            <div className="grimoire-explanation-drawer">
              <p>{currentQuestion.explanation}</p>
              <button className="btn-hogwarts-gold" onClick={handleNext}>
                <span>
                  {currentIndex + 1 >= questions.length
                    ? "Revelar Nota da Banca"
                    : "Próximo Pergaminho"}
                </span>
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* STEP 4: RESULT (PASS OR PRANK!) */}
      {stage === "result" && level && (
        <div className={`grimoire-stage quiz-result ${passed ? "is-passed" : "is-pranked"}`}>
          <div className="grimoire-corner tl" />
          <div className="grimoire-corner tr" />
          <div className="grimoire-corner bl" />
          <div className="grimoire-corner br" />

          {passed ? (
            <>
              <div className="result-badge success">
                <Award size={50} />
              </div>
              <span className="eyebrow-pill">Exame Aprovado com Honras</span>
              <h1>Grau {level.name} Conquistado!</h1>
              <p className="result-subtitle">
                Você acertou <strong>{score}</strong> de <strong>{questions.length}</strong>{" "}
                perguntas na <strong>{divisionObj?.name}</strong> (maior sequência: {bestStreak}x).
              </p>
              <div className="result-box success-box">
                <p>
                  A banca examinadora de Hogwarts concedeu a Ordem de Merlim!{" "}
                  {nextLevel
                    ? `Sua magia está pronta para encarar o nível ${nextLevel.name}.`
                    : "Você dominou o nível mais extremo do mundo bruxo!"}
                </p>
              </div>
              <div className="result-actions">
                {nextLevel && (
                  <button className="btn-hogwarts-gold" onClick={() => startQuiz(nextLevel)}>
                    Avançar para {nextLevel.name} →
                  </button>
                )}
                <button className="btn-grimoire-secondary" onClick={() => startQuiz(level)}>
                  <RotateCcw size={16} /> Jogar Novamente
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="result-badge prank">
                <AlertTriangle size={50} />
              </div>
              <span className="eyebrow-pill prank-pill">Pegadinha Mágica Ativada!</span>
              <h1 className="prank-title">{level.prankTitle}</h1>
              <p className="result-subtitle">
                Você fez <strong>{score}</strong> de <strong>{questions.length}</strong> acertos,
                mas o grau <strong>{level.name}</strong> exigia pelo menos{" "}
                <strong>{level.minScore} acertos</strong>!
              </p>
              <div className="result-box prank-box">
                <p>{level.prankMessage}</p>
                <small>{level.prankSuggestion}</small>
              </div>
              <div className="result-actions">
                {lowerLevel && (
                  <button className="btn-hogwarts-gold" onClick={() => startQuiz(lowerLevel)}>
                    Descer para o nível {lowerLevel.name}
                  </button>
                )}
                <button className="btn-grimoire-secondary" onClick={() => startQuiz(level)}>
                  <RotateCcw size={16} /> Tentar {level.name} de Novo
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
