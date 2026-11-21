import { useMemo, useRef, useState } from "react";
import {
  Film,
  BookOpen,
  Lightbulb,
  Zap,
  AlertTriangle,
  RotateCcw,
  ChevronRight,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { QUIZ_DIVISIONS, QUIZ_LEVELS, QUIZ_QUESTIONS } from "../data/quizData";
import { prepareShuffledQuestions, shuffleArray, getHogwartsGrade } from "../utils/shuffle";
import { WizFrame, HallowsDivider } from "./WizFrame";
import { magicAudio } from "../utils/sound";

const ROMAN = ["I", "II", "III", "IV"];

export default function QuizArena() {
  const [stage, setStage] = useState("setup"); // setup | playing | result
  const [division, setDivision] = useState("movies");
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
  const lastFirstMap = useRef({});

  const divisionObj = useMemo(
    () => QUIZ_DIVISIONS.find((d) => d.id === division) || QUIZ_DIVISIONS[0],
    [division]
  );

  const currentQuestion = questions[currentIndex] || null;

  const startQuiz = (selectedLevel) => {
    const key = `${division}_${selectedLevel.id}`;
    const rawPool = QUIZ_QUESTIONS[division]?.[selectedLevel.id] || [];
    const prepared = prepareShuffledQuestions(rawPool, lastFirstMap.current[key]);
    if (prepared.length > 0) {
      lastFirstMap.current[key] = prepared[0].question;
    }

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

  const handleTip = () => {
    if (showTip || tipsLeft <= 0 || selectedOption) return;
    magicAudio.sparkle();
    setShowTip(true);
    setTipsLeft((t) => t - 1);
  };

  const handleReducto = () => {
    if (hiddenOptions.length > 0 || reductoLeft <= 0 || selectedOption || !currentQuestion) return;
    const wrongOpts = currentQuestion.options.filter((o) => o !== currentQuestion.answer);
    const toHide = shuffleArray(wrongOpts).slice(0, 2);
    magicAudio.spellCast();
    setHiddenOptions(toHide);
    setReductoLeft((r) => r - 1);
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setShowTip(false);
      setHiddenOptions([]);
      return;
    }
    setStage("result");
    if (score < level.minScore) {
      magicAudio.prank();
    } else {
      magicAudio.reveal();
    }
  };

  // SETUP SCREEN (COMPACT & VISUAL)
  if (stage === "setup") {
    return (
      <section className="quiz-view">
        <div className="section-head">
          <span className="wiz-eyebrow">
            <Sparkles size={13} /> Saberes de Hogwarts
          </span>
          <h2 className="wiz-title">Quiz Bruxo</h2>
          <p className="wiz-subtitle">
            Escolha a edição e o grau de dificuldade. Perguntas e alternativas são embaralhadas a cada partida.
          </p>
        </div>

        {/* Division segmented switcher */}
        <div className="division-switch">
          {QUIZ_DIVISIONS.map((div) => {
            const Icon = div.id === "movies" ? Film : BookOpen;
            const active = division === div.id;
            return (
              <button
                key={div.id}
                type="button"
                className={`division-pill ${active ? "is-active" : ""}`}
                onClick={() => {
                  magicAudio.sparkle();
                  setDivision(div.id);
                }}
              >
                <Icon size={18} />
                <div>
                  <strong>{div.name}</strong>
                  <small>{div.subtitle}</small>
                </div>
              </button>
            );
          })}
        </div>

        <HallowsDivider label={`Níveis • ${divisionObj.name}`} />

        <div className="levels-grid">
          {QUIZ_LEVELS.map((lvl) => (
            <WizFrame
              key={lvl.id}
              className="level-card"
              style={{ "--card-accent": lvl.accent }}
            >
              <div className="level-top">
                <span className="level-rank">{lvl.rank}</span>
                <span className="level-meta">Mín. {lvl.minScore}/10</span>
              </div>
              <h3>{lvl.name}</h3>
              <p>{lvl.description}</p>
              <button type="button" className="btn-gold" onClick={() => startQuiz(lvl)}>
                Iniciar Prova <ChevronRight size={16} />
              </button>
            </WizFrame>
          ))}
        </div>
      </section>
    );
  }

  // RESULT SCREEN
  if (stage === "result" && level) {
    const failed = score < level.minScore;
    const grade = getHogwartsGrade(score, questions.length);

    return (
      <section className="quiz-view">
        <WizFrame className="exam-result-card">
          <div className={`hogwarts-grade-seal tone-${grade.tone}`}>
            <strong>{grade.code}</strong>
            <span>{grade.label}</span>
          </div>

          <span className="wiz-eyebrow">
            {divisionObj.name} • {level.name}
          </span>

          {failed ? (
            <>
              <h2 className="wiz-title prank-title">
                <AlertTriangle size={22} /> {level.prankTitle}
              </h2>
              <p className="wiz-subtitle">{level.prankMessage}</p>
            </>
          ) : (
            <>
              <h2 className="wiz-title">Exame Concluído!</h2>
              <p className="wiz-subtitle">
                Você dominou o nível {level.name} na edição de {divisionObj.name}.
              </p>
            </>
          )}

          <div className="result-stats-row">
            <div className="stat-box">
              <strong>
                {score}/{questions.length}
              </strong>
              <span>Acertos</span>
            </div>
            <div className="stat-box">
              <strong>{Math.round((score / questions.length) * 100)}%</strong>
              <span>Precisão</span>
            </div>
            <div className="stat-box">
              <strong>{bestStreak}x</strong>
              <span>Sequência</span>
            </div>
          </div>

          <div className="action-row">
            <button type="button" className="btn-gold" onClick={() => startQuiz(level)}>
              <RotateCcw size={16} /> Jogar Novamente
            </button>
            <button type="button" className="btn-outline" onClick={() => setStage("setup")}>
              Trocar Nível / Edição
            </button>
          </div>
        </WizFrame>
      </section>
    );
  }

  // PLAYING SCREEN
  if (!currentQuestion) return null;
  const pct = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <section className="quiz-view">
      <WizFrame className="exam-play-card">
        <div className="exam-play-header">
          <button type="button" className="btn-back-chip" onClick={() => setStage("setup")}>
            <ArrowLeft size={15} /> {divisionObj.name} • {level.name}
          </button>
          <div className="exam-score-pill">
            {currentIndex + 1}/{questions.length} • {score} pts
          </div>
        </div>

        <div className="wiz-progress">
          <div className="wiz-progress-fill" style={{ width: `${pct}%` }} />
        </div>

        <h2 className="question-heading">{currentQuestion.question}</h2>

        {/* Lifelines */}
        <div className="lifelines-row">
          <button
            type="button"
            className="lifeline-btn"
            disabled={showTip || tipsLeft <= 0 || !!selectedOption}
            onClick={handleTip}
          >
            <Lightbulb size={15} /> Dica da Hermione ({tipsLeft})
          </button>
          <button
            type="button"
            className="lifeline-btn"
            disabled={hiddenOptions.length > 0 || reductoLeft <= 0 || !!selectedOption}
            onClick={handleReducto}
          >
            <Zap size={15} /> Reducto 50/50 ({reductoLeft})
          </button>
        </div>

        {showTip && currentQuestion.tip && (
          <div className="hermione-tip">
            <Lightbulb size={15} />
            <span>{currentQuestion.tip}</span>
          </div>
        )}

        <div className="quiz-options-list">
          {currentQuestion.options.map((opt, idx) => {
            if (hiddenOptions.includes(opt)) return null;
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
                disabled={!!selectedOption}
                className={`wiz-option-card ${stateClass}`}
                onClick={() => handleAnswer(opt)}
              >
                <span className="opt-numeral">{ROMAN[idx]}</span>
                <span className="opt-label">{opt}</span>
                {selectedOption && isCorrect && <CheckCircle2 size={18} className="opt-status-icon" />}
                {selectedOption && isSelected && !isCorrect && (
                  <XCircle size={18} className="opt-status-icon" />
                )}
              </button>
            );
          })}
        </div>

        {selectedOption && (
          <div className="answer-feedback">
            <p>{currentQuestion.explanation}</p>
            <button type="button" className="btn-gold" onClick={handleNext}>
              {currentIndex + 1 < questions.length ? "Próxima Pergunta" : "Ver Boletim"}
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </WizFrame>
    </section>
  );
}
