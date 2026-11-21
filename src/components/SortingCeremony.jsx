import { useEffect, useMemo, useRef, useState } from "react";
import { Sparkles, RotateCcw, Shield, BookOpen, Volume2, ArrowRight } from "lucide-react";
import { HOUSES, HOUSE_ORDER, VIRTUE_LABELS } from "../data/houses";
import { pickNextSortingQuestion, TOTAL_SORTING_STEPS } from "../data/sortingData";
import { shuffleArray } from "../utils/shuffle";
import { HouseCrest } from "./HouseCrest";
import { WizFrame, HallowsDivider } from "./WizFrame";
import { magicAudio } from "../utils/sound";

const HAT_WHISPERS = [
  "Hmm... difícil, muito difícil...",
  "Muita coragem, estou vendo... e uma mente nada má...",
  "Há talento aqui, ah sim, e uma sede de provar seu valor...",
  "Onde vou colocar você? Vamos ouvir mais um pouco...",
  "Interessante... muito interessante...",
];

const INITIAL_SCORES = { gryffindor: 0, slytherin: 0, ravenclaw: 0, hufflepuff: 0 };
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

function withShuffledOptions(q) {
  if (!q) return null;
  if (q.options) {
    return { ...q, options: shuffleArray(q.options) };
  }
  return q;
}

export default function SortingCeremony({
  sortedHouse,
  unlockedCount,
  onCompleteHouse,
  onResetSorting,
  onGoHouses,
  onGoQuiz,
}) {
  const [stage, setStage] = useState(sortedHouse ? "already_sorted" : "intro");
  const [step, setStep] = useState(0);
  const [answeredIds, setAnsweredIds] = useState([]);
  const [scores, setScores] = useState(INITIAL_SCORES);
  const [virtues, setVirtues] = useState(INITIAL_VIRTUES);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [hatLine, setHatLine] = useState("Sente-se no banquinho e deixe-me olhar dentro da sua mente...");
  const [hatSpeaking, setHatSpeaking] = useState(false);
  const [winnerId, setWinnerId] = useState(sortedHouse || null);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const triggerSpeak = (text, isShout = false) => {
    setHatLine(text);
    setHatSpeaking(true);
    magicAudio.speakHat(text, isShout);
    setTimeout(() => setHatSpeaking(false), isShout ? 3200 : 2200);
  };

  const startCeremony = (shouldReset = false) => {
    if (shouldReset) onResetSorting();
    magicAudio.spellCast();
    const firstQ = withShuffledOptions(pickNextSortingQuestion([], INITIAL_SCORES, 0));
    setScores(INITIAL_SCORES);
    setVirtues(INITIAL_VIRTUES);
    setAnsweredIds([]);
    setStep(0);
    setWinnerId(null);
    setCurrentQuestion(firstQ);
    setStage("question");
    triggerSpeak("Hmm... deixe-me ver o que há nessa sua mente...");
  };

  const handleChoose = (choice) => {
    magicAudio.sparkle();

    const nextScores = { ...scores };
    if (choice.weights) {
      Object.entries(choice.weights).forEach(([h, val]) => {
        nextScores[h] = (nextScores[h] || 0) + val;
      });
    }

    const nextVirtues = { ...virtues };
    if (choice.virtues) {
      Object.entries(choice.virtues).forEach(([v, val]) => {
        nextVirtues[v] = (nextVirtues[v] || 0) + val;
      });
    }

    const nextAnswered = [...answeredIds, currentQuestion.id];
    const nextStep = step + 1;

    setScores(nextScores);
    setVirtues(nextVirtues);
    setAnsweredIds(nextAnswered);
    setStep(nextStep);

    if (nextStep >= TOTAL_SORTING_STEPS) {
      setStage("deliberating");
      triggerSpeak("Difícil... muito difícil... mas agora eu sei exatamente onde você pertence!");

      const ranked = [...HOUSE_ORDER].sort((a, b) => {
        const diff = (nextScores[b] || 0) - (nextScores[a] || 0);
        return diff !== 0 ? diff : Math.random() - 0.5;
      });
      const chosen = ranked[0];

      timerRef.current = setTimeout(() => {
        setWinnerId(chosen);
        setStage("result");
        magicAudio.reveal();
        onCompleteHouse(chosen);
        triggerSpeak(HOUSES[chosen].hatSpeech, true);
      }, 2400);
      return;
    }

    const nextQ = withShuffledOptions(pickNextSortingQuestion(nextAnswered, nextScores, nextStep));
    if (!nextQ) {
      const ranked = [...HOUSE_ORDER].sort((a, b) => (nextScores[b] || 0) - (nextScores[a] || 0));
      const chosen = ranked[0];
      setWinnerId(chosen);
      setStage("result");
      onCompleteHouse(chosen);
      return;
    }

    setCurrentQuestion(nextQ);
    if (nextStep === 3 || nextStep === 6 || nextStep === 8) {
      const whisper = HAT_WHISPERS[Math.floor(Math.random() * HAT_WHISPERS.length)];
      triggerSpeak(whisper);
    }
  };

  const topVirtues = useMemo(() => {
    return Object.entries(virtues)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([k]) => VIRTUE_LABELS[k]?.name)
      .filter(Boolean);
  }, [virtues]);

  const houseBreakdown = useMemo(() => {
    const total = Object.values(scores).reduce((acc, v) => acc + v, 0) || 1;
    return HOUSE_ORDER.map((id) => ({
      id,
      name: HOUSES[id].name,
      pct: Math.round(((scores[id] || 0) / total) * 100),
      color: HOUSES[id].colors.secondary,
    })).sort((a, b) => b.pct - a.pct);
  }, [scores]);

  // ALREADY SORTED SUMMARY
  if (stage === "already_sorted" && sortedHouse && HOUSES[sortedHouse]) {
    const house = HOUSES[sortedHouse];
    return (
      <section className="sorting-view">
        <WizFrame className="sorting-center-card">
          <div className="hat-stage-mini">
            <HouseCrest houseId={sortedHouse} size={116} />
          </div>
          <span className="wiz-eyebrow">Casa Selecionada</span>
          <h2 className="wiz-title">{house.name}</h2>
          <p className="wiz-subtitle">“{house.motto}”</p>

          <div className="trait-pills">
            {house.traits.map((t) => (
              <span key={t} className="trait-pill">
                {t}
              </span>
            ))}
          </div>

          <div className="action-row">
            <button type="button" className="btn-gold" onClick={onGoHouses}>
              <Shield size={16} /> Provas das Casas ({unlockedCount}/4)
            </button>
            <button type="button" className="btn-outline" onClick={onGoQuiz}>
              <BookOpen size={16} /> Ir ao Quiz Bruxo
            </button>
          </div>

          <button
            type="button"
            className="btn-ghost-danger"
            onClick={() => startCeremony(true)}
          >
            <RotateCcw size={14} /> Refazer Cerimônia (reseta Salas liberadas)
          </button>
        </WizFrame>
      </section>
    );
  }

  // INTRO STAGE (MOVIE-LIKE SORTING HAT PEDESTAL)
  if (stage === "intro") {
    return (
      <section className="sorting-view">
        <WizFrame className="sorting-intro-card">
          <div className={`hat-pedestal ${hatSpeaking ? "is-speaking" : ""}`}>
            <div className="hat-aura" aria-hidden="true" />
            <div className="hat-ring" aria-hidden="true" />
            <img
              src="/images/props/sorting-hat.webp"
              alt="O Chapéu Seletor de Hogwarts"
              className="hat-prop-img"
              draggable={false}
            />
          </div>

          <span className="wiz-eyebrow">
            <Sparkles size={13} /> Salão Principal • Cerimônia de Seleção
          </span>
          <h2 className="wiz-title">O Chapéu Seletor</h2>
          <p className="hat-quote">
            “Não há nada escondido em sua cabeça que o Chapéu Seletor não consiga ver.”
          </p>

          <div className="sorting-meta-chips">
            <span>{TOTAL_SORTING_STEPS} Provas Aleatórias</span>
            <span>4 Casas de Hogwarts</span>
            <span>Voz do Chapéu</span>
          </div>

          <button type="button" className="btn-gold btn-lg" onClick={() => startCeremony(false)}>
            Vestir o Chapéu Seletor <ArrowRight size={17} />
          </button>
        </WizFrame>
      </section>
    );
  }

  // DELIBERATING STAGE
  if (stage === "deliberating") {
    return (
      <section className="sorting-view">
        <WizFrame className="sorting-intro-card">
          <div className="hat-pedestal is-speaking is-deliberating">
            <div className="hat-aura" aria-hidden="true" />
            <div className="hat-ring" aria-hidden="true" />
            <img
              src="/images/props/sorting-hat.webp"
              alt="Chapéu Seletor deliberando"
              className="hat-prop-img"
              draggable={false}
            />
          </div>
          <span className="wiz-eyebrow">Lendo sua mente...</span>
          <h2 className="wiz-title">“{hatLine}”</h2>
        </WizFrame>
      </section>
    );
  }

  // RESULT REVEAL STAGE
  if (stage === "result" && winnerId && HOUSES[winnerId]) {
    const house = HOUSES[winnerId];
    return (
      <section className="sorting-view">
        <WizFrame className="sorting-result-card">
          <div className="result-crest-stage">
            <div className="crest-halo" />
            <HouseCrest houseId={winnerId} size={130} />
          </div>

          <span className="wax-seal-pill">Veredito do Chapéu Seletor</span>
          <h2 className="wiz-title result-house-name">{house.name}!</h2>
          <p className="hat-quote">“{house.hatSpeech}”</p>

          <button
            type="button"
            className="btn-voice-replay"
            onClick={() => triggerSpeak(house.hatSpeech, true)}
          >
            <Volume2 size={15} /> Ouvir anúncio novamente
          </button>

          {topVirtues.length > 0 && (
            <div className="trait-pills">
              {topVirtues.map((v) => (
                <span key={v} className="trait-pill">
                  {v}
                </span>
              ))}
            </div>
          )}

          <div className="affinity-bars">
            {houseBreakdown.map((item) => (
              <div key={item.id} className="affinity-row">
                <span className="affinity-name">{item.name}</span>
                <div className="affinity-track">
                  <div
                    className="affinity-fill"
                    style={{ width: `${Math.max(item.pct, 6)}%`, background: item.color }}
                  />
                </div>
                <span className="affinity-pct">{item.pct}%</span>
              </div>
            ))}
          </div>

          <HallowsDivider />

          <div className="action-row">
            <button type="button" className="btn-gold" onClick={onGoHouses}>
              <Shield size={16} /> Liberar Outras Casas
            </button>
            <button type="button" className="btn-outline" onClick={onGoQuiz}>
              <BookOpen size={16} /> Quiz Bruxo
            </button>
          </div>
        </WizFrame>
      </section>
    );
  }

  // QUESTION STAGE
  if (!currentQuestion) return null;
  const progressPct = Math.round(((step + 1) / TOTAL_SORTING_STEPS) * 100);

  return (
    <section className="sorting-view">
      <WizFrame className="sorting-question-card">
        <div className="sorting-top-bar">
          <div className={`hat-mini-speaker ${hatSpeaking ? "is-speaking" : ""}`}>
            <img src="/images/props/sorting-hat.webp" alt="Chapéu Seletor" draggable={false} />
            <p>“{hatLine}”</p>
          </div>
          <span className="step-badge">
            {step + 1} / {TOTAL_SORTING_STEPS}
          </span>
        </div>

        <div className="wiz-progress">
          <div className="wiz-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>

        <h2 className="question-heading">{currentQuestion.title}</h2>
        <p className="question-lead">{currentQuestion.subtitle}</p>

        {currentQuestion.type === "scale" && currentQuestion.steps ? (
          <div className="scale-choices">
            <div className="scale-endpoints">
              <span>{currentQuestion.leftLabel}</span>
              <span>{currentQuestion.rightLabel}</span>
            </div>
            <div className="scale-grid">
              {currentQuestion.steps.map((st, i) => (
                <button
                  key={st.label}
                  type="button"
                  className="wiz-option-card scale-btn"
                  onClick={() => handleChoose(st)}
                >
                  <span className="opt-numeral">{i + 1}</span>
                  <strong>{st.label}</strong>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="sorting-options-grid">
            {(currentQuestion.options || []).map((opt, idx) => (
              <button
                key={opt.id || opt.label}
                type="button"
                className="wiz-option-card"
                onClick={() => handleChoose(opt)}
              >
                <span className="opt-numeral">{["I", "II", "III", "IV"][idx] || idx + 1}</span>
                <div className="opt-text">
                  <strong>{opt.label}</strong>
                  {opt.detail && <small>{opt.detail}</small>}
                </div>
              </button>
            ))}
          </div>
        )}
      </WizFrame>
    </section>
  );
}
