import { useEffect, useRef, useState } from "react";
import {
  Lock,
  CheckCircle2,
  XCircle,
  ChevronRight,
  RotateCcw,
  Award,
  Sparkles,
  Wand2,
  Volume2,
} from "lucide-react";
import { HOUSES, HOUSE_ORDER } from "../data/houses";
import { HOUSE_QUIZZES, HOUSE_UNLOCK_MIN_SCORE, HOUSE_QUIZ_TOTAL } from "../data/houseQuizzes";
import { prepareShuffledQuestions, getHogwartsGrade } from "../utils/shuffle";
import { HouseCrest } from "./HouseCrest";
import { WizFrame, HallowsDivider } from "./WizFrame";
import NarratorBar from "./NarratorBar";
import { magicAudio } from "../utils/sound";

const ROMAN = ["I", "II", "III", "IV"];

export default function HousesHall({
  sortedHouse,
  unlockedHouses,
  activeTheme,
  onSelectTheme,
  onUnlockHouse,
  onStartSorting,
}) {
  const [activeExamId, setActiveExamId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const lastFirstByHouse = useRef({});

  useEffect(() => {
    return () => magicAudio.stopVoice();
  }, []);

  const playMinerva = (clipId, fallbackText) => {
    magicAudio.playVoice(clipId, {
      onStart: () => setSpeaking(true),
      onEnd: () => setSpeaking(false),
      fallbackText,
    });
  };

  const startExam = (houseId) => {
    const exam = HOUSE_QUIZZES[houseId];
    if (!exam) return;
    // Draw 8 fresh randomized questions from the 16-question house bank
    const prepared = prepareShuffledQuestions(exam.questions, lastFirstByHouse.current[houseId]).slice(
      0,
      HOUSE_QUIZ_TOTAL
    );
    if (prepared.length > 0) {
      lastFirstByHouse.current[houseId] = prepared[0].question;
    }
    magicAudio.spellCast();
    setActiveExamId(houseId);
    setQuestions(prepared);
    setCurrentIdx(0);
    setSelectedOpt(null);
    setScore(0);
    setFinished(false);
    if (prepared[0]) {
      playMinerva(`minerva_${prepared[0].id}`, prepared[0].question);
    }
  };

  const handleAnswer = (opt) => {
    if (selectedOpt) return;
    const q = questions[currentIdx];
    magicAudio.stopVoice();
    setSpeaking(false);
    setSelectedOpt(opt);
    if (opt === q.answer) {
      magicAudio.correct();
      setScore((s) => s + 1);
    } else {
      magicAudio.wrong();
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);
      setSelectedOpt(null);
      const nextQ = questions[nextIdx];
      if (nextQ) {
        playMinerva(`minerva_${nextQ.id}`, nextQ.question);
      }
      return;
    }
    setFinished(true);
    if (score >= HOUSE_UNLOCK_MIN_SCORE) {
      magicAudio.reveal();
      onUnlockHouse(activeExamId);
      playMinerva("minerva_exam_pass", "Muito bem! A Sala Comunal agora está aberta para você.");
    } else {
      magicAudio.prank();
      playMinerva("minerva_exam_fail", "Receio que esta nota ainda não seja suficiente.");
    }
  };

  const closeExam = () => {
    magicAudio.stopVoice();
    setSpeaking(false);
    setActiveExamId(null);
    setFinished(false);
  };

  // ACTIVE HOUSE EXAM VIEW
  if (activeExamId) {
    const house = HOUSES[activeExamId];
    const exam = HOUSE_QUIZZES[activeExamId];

    if (finished) {
      const passed = score >= HOUSE_UNLOCK_MIN_SCORE;
      const grade = getHogwartsGrade(score, questions.length);
      return (
        <section className="houses-view">
          <WizFrame className="exam-result-card">
            <div className="grade-seal-row">
              <HouseCrest houseId={activeExamId} size={88} />
              <div className={`hogwarts-grade-seal tone-${grade.tone}`}>
                <strong>{grade.code}</strong>
                <span>{grade.label}</span>
              </div>
            </div>

            <span className="wiz-eyebrow">{exam.examCode}</span>
            <h2 className="wiz-title">
              {passed ? `Aprovado em ${house.name}!` : "Reprovado na Banca"}
            </h2>
            <p className="wiz-subtitle">
              {score} de {questions.length} acertos • Mínimo exigido: {HOUSE_UNLOCK_MIN_SCORE}/
              {questions.length}
            </p>

            <div className="action-row">
              {passed ? (
                <button
                  type="button"
                  className="btn-gold"
                  onClick={() => {
                    onSelectTheme(activeExamId);
                    closeExam();
                  }}
                >
                  <Sparkles size={16} /> Entrar na Sala Comunal
                </button>
              ) : (
                <button type="button" className="btn-gold" onClick={() => startExam(activeExamId)}>
                  <RotateCcw size={16} /> Refazer Exame (Novas Perguntas)
                </button>
              )}
              <button type="button" className="btn-outline" onClick={closeExam}>
                Voltar às Provas
              </button>
            </div>
          </WizFrame>
        </section>
      );
    }

    const q = questions[currentIdx];
    const pct = Math.round(((currentIdx + 1) / questions.length) * 100);

    return (
      <section className="houses-view">
        <WizFrame className="exam-play-card">
          <div className="exam-play-header">
            <div className="exam-title-group">
              <HouseCrest houseId={activeExamId} size={46} />
              <div>
                <span className="wiz-eyebrow">{exam.examCode}</span>
                <h3>{exam.title}</h3>
              </div>
            </div>
            <div className="exam-score-pill">
              {currentIdx + 1}/{questions.length} • {score} pts
            </div>
          </div>

          <NarratorBar
            character="minerva"
            speaking={speaking}
            caption={exam.subtitle}
            onReplay={() => playMinerva(`minerva_${q.id}`, q.question)}
            onStop={() => {
              magicAudio.stopVoice();
              setSpeaking(false);
            }}
          />

          <div className="wiz-progress">
            <div className="wiz-progress-fill" style={{ width: `${pct}%` }} />
          </div>

          <h2 className="question-heading">{q.question}</h2>

          <div className="quiz-options-list">
            {q.options.map((opt, idx) => {
              const isSelected = selectedOpt === opt;
              const isCorrect = opt === q.answer;
              let stateClass = "";
              if (selectedOpt) {
                if (isCorrect) stateClass = "is-correct";
                else if (isSelected) stateClass = "is-wrong";
                else stateClass = "is-dimmed";
              }
              return (
                <button
                  key={opt}
                  type="button"
                  disabled={!!selectedOpt}
                  className={`wiz-option-card ${stateClass}`}
                  onClick={() => handleAnswer(opt)}
                >
                  <span className="opt-numeral">{ROMAN[idx]}</span>
                  <span className="opt-label">{opt}</span>
                  {selectedOpt && isCorrect && <CheckCircle2 size={18} className="opt-status-icon" />}
                  {selectedOpt && isSelected && !isCorrect && (
                    <XCircle size={18} className="opt-status-icon" />
                  )}
                </button>
              );
            })}
          </div>

          {selectedOpt && (
            <div className="answer-feedback">
              <p>{q.explanation}</p>
              <button type="button" className="btn-gold" onClick={handleNext}>
                {currentIdx + 1 < questions.length ? "Próxima Questão" : "Ver Boletim"}
                <ChevronRight size={16} />
              </button>
            </div>
          )}

          <div className="exam-footer-row">
            <span className="examiner-label">Banca: {exam.examiner}</span>
            <button type="button" className="btn-text-muted" onClick={closeExam}>
              Cancelar exame
            </button>
          </div>
        </WizFrame>
      </section>
    );
  }

  // HOUSES & EXAMS OVERVIEW
  return (
    <section className="houses-view">
      <div className="section-head">
        <span className="wiz-eyebrow">
          <Award size={13} /> Autoridade de Exames Bruxos • 64 Questões
        </span>
        <h2 className="wiz-title">Provas das Casas</h2>
        <p className="wiz-subtitle">
          Conquiste nota Aceitável ({HOUSE_UNLOCK_MIN_SCORE}/{HOUSE_QUIZ_TOTAL}) nos exames narrados pela Profa. Minerva McGonagall.
        </p>
        <button
          type="button"
          className={`btn-dumbledore-greet ${speaking ? "is-speaking" : ""}`}
          onClick={() => {
            if (speaking) {
              magicAudio.stopVoice();
              setSpeaking(false);
            } else {
              playMinerva(
                "minerva_houses_intro",
                "Atenção, alunos! Estes são os exames oficiais de Hogwarts."
              );
            }
          }}
        >
          <img src="/images/perfil/minerva-mcgonagall.webp" alt="Profa. Minerva" />
          <Volume2 size={14} />
          <span>{speaking ? "Profa. Minerva falando..." : "Ouvir instruções da Profa. Minerva"}</span>
        </button>
      </div>

      {!sortedHouse && (
        <WizFrame className="compact-callout">
          <p>Passe primeiro pelo Chapéu Seletor para receber sua primeira Casa gratuitamente.</p>
          <button type="button" className="btn-gold" onClick={onStartSorting}>
            <Wand2 size={15} /> Ir ao Chapéu Seletor
          </button>
        </WizFrame>
      )}

      <HallowsDivider />

      <div className="houses-grid">
        {HOUSE_ORDER.map((id) => {
          const house = HOUSES[id];
          const exam = HOUSE_QUIZZES[id];
          const isUnlocked = unlockedHouses.includes(id);
          const isSelected = activeTheme === id;
          const isSorted = sortedHouse === id;

          return (
            <WizFrame
              key={id}
              className={`house-exam-card ${isSelected ? "is-active-theme" : ""}`}
              style={{ "--card-accent": house.colors.secondary }}
            >
              <div className="house-card-top">
                <HouseCrest houseId={id} size={74} locked={!isUnlocked} />
                <div className="house-card-info">
                  <div className="house-badges">
                    <span className="exam-code-chip">{exam.examCode}</span>
                    {isSorted && <span className="sorted-chip">Sua Casa</span>}
                  </div>
                  <h3>{house.name}</h3>
                  <p className="house-exam-name">{exam.title}</p>
                </div>
              </div>

              <div className="house-card-meta">
                <span>Banco: {exam.questions.length} questões</span>
                <span>Banca: {exam.examiner}</span>
              </div>

              <div className="house-card-actions">
                {isUnlocked ? (
                  <>
                    <button
                      type="button"
                      className={isSelected ? "btn-outline" : "btn-gold"}
                      onClick={() => onSelectTheme(id)}
                    >
                      {isSelected ? "Sala Ativa" : "Ativar Sala Comunal"}
                    </button>
                    <button
                      type="button"
                      className="btn-text-muted"
                      onClick={() => startExam(id)}
                    >
                      Refazer prova
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="btn-gold"
                    onClick={() => startExam(id)}
                  >
                    <Lock size={15} /> Fazer {exam.examCode}
                  </button>
                )}
              </div>
            </WizFrame>
          );
        })}
      </div>
    </section>
  );
}
