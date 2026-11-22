import { useEffect, useMemo, useRef, useState } from "react";
import {
  Shuffle,
  Eye,
  EyeOff,
  Check,
  Send,
  Users,
  User,
  Plus,
  Trash2,
  Clock,
  Sparkles,
  BookOpen,
  Film,
  ChevronRight,
  RotateCcw,
  HelpCircle,
  Volume2,
  Trophy,
} from "lucide-react";
import {
  PERFIL_CARDS,
  PERFIL_DIVISIONS,
  PERFIL_DIFFICULTIES,
  PERFIL_THEMES,
} from "../data/perfilData";
import { HOUSES } from "../data/houses";
import { shuffleFresh, matchesPerfilAnswer } from "../utils/shuffle";
import { HouseCrest } from "./HouseCrest";
import { WizFrame, HallowsDivider } from "./WizFrame";
import { magicAudio } from "../utils/sound";

const DEFAULT_TEAMS = [
  { id: "gryff", name: "Grifinória", score: 0, color: "#d94e3b" },
  { id: "slyth", name: "Sonserina", score: 0, color: "#34b876" },
];

const TEAM_COLORS = ["#d94e3b", "#34b876", "#5ea0f5", "#eab93e", "#c97be8", "#e88b50"];

const HOUSE_COMMENTATORS = {
  gryffindor: {
    prefix: "minerva_perfil",
    name: "Profa. Minerva",
    avatar: "/images/perfil/minerva-mcgonagall.webp",
  },
  slytherin: {
    prefix: "snape_perfil",
    name: "Prof. Snape",
    avatar: "/images/perfil/severo-snape.webp",
  },
  ravenclaw: {
    prefix: "lockhart_perfil",
    name: "Prof. Lockhart",
    avatar: "/images/perfil/gilderoy-lockhart.webp",
  },
  hufflepuff: {
    prefix: "cedric_perfil",
    name: "Cedrico Diggory",
    avatar: "/images/perfil/cedrico-diggory.webp",
  },
  neutral: {
    prefix: "dumbledore_perfil_win",
    name: "Prof. Dumbledore",
    avatar: "/images/perfil/alvo-dumbledore.webp",
  },
};

const DIFF_LABELS = {
  facil: "1º Ano • Fácil",
  medio: "N.O.M.s • Médio",
  dificil: "N.I.E.M.s • Difícil",
};

const THEME_LABELS = {
  personagem: "Personagem",
  criatura: "Criatura Mágica",
  lugar: "Lugar Mágico",
  objeto: "Objeto / Relíquia",
  feiticopocao: "Feitiço / Poção",
};

export default function PerfilGame() {
  const [screen, setScreen] = useState("lobby"); // lobby | play
  const [mode, setMode] = useState("solo"); // solo | mesa
  const [division, setDivision] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [theme, setTheme] = useState("all");
  const [prioritizeUnseen, setPrioritizeUnseen] = useState(true);
  const [speakingDumbledore, setSpeakingDumbledore] = useState(false);
  const [introToggle, setIntroToggle] = useState(0);
  const winsCountRef = useRef(0);
  const lastClipByPrefixRef = useRef({});

  const playHouseComment = (card, force = false) => {
    const houseKey = card?.house && HOUSE_COMMENTATORS[card.house] ? card.house : "neutral";
    const commentator = HOUSE_COMMENTATORS[houseKey];
    if (!force) {
      winsCountRef.current += 1;
      const n = winsCountRef.current;
      // Only auto-speak on 1st win, every 3rd win, or a 10-point 1-clue master deduction!
      const isMilestone = n === 1 || n % 3 === 0 || potentialPoints >= 10;
      if (!isMilestone) return;
    }
    const prevIdx = lastClipByPrefixRef.current[commentator.prefix] || 0;
    const nextIdx = (prevIdx % 3) + 1;
    lastClipByPrefixRef.current[commentator.prefix] = nextIdx;
    magicAudio.playVoice(`${commentator.prefix}_${nextIdx}`, {
      onStart: () => setSpeakingDumbledore(true),
      onEnd: () => setSpeakingDumbledore(false),
    });
  };

  // Persisted discovered cards tracker
  const [discoveredIds, setDiscoveredIds] = useState(() => {
    try {
      const raw = localStorage.getItem("hp_perfil_discovered");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Active deck & round state
  const [deck, setDeck] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [revealedClues, setRevealedClues] = useState([0]);
  const [revealedAnswer, setRevealedAnswer] = useState(false);
  const [peeking, setPeeking] = useState(false);

  // Solo state
  const [guessInput, setGuessInput] = useState("");
  const [guessFeedback, setGuessFeedback] = useState(null); // null | "wrong" | "correct"
  const [soloScore, setSoloScore] = useState(0);
  const [soloSolved, setSoloSolved] = useState(0);
  const [soloStreak, setSoloStreak] = useState(0);

  // Mesa / Group state
  const [teams, setTeams] = useState(DEFAULT_TEAMS);
  const [newTeam, setNewTeam] = useState("");
  const [awardNotice, setAwardNotice] = useState(null);
  const [timerPreset, setTimerPreset] = useState(0); // 0 | 30 | 60
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    return () => magicAudio.stopVoice();
  }, []);

  const markDiscovered = (cardId) => {
    setDiscoveredIds((prev) => {
      if (prev.includes(cardId)) return prev;
      const next = [...prev, cardId];
      try {
        localStorage.setItem("hp_perfil_discovered", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const matchingPool = useMemo(() => {
    return PERFIL_CARDS.filter((c) => {
      if (division !== "all" && c.division !== division) return false;
      if (difficulty !== "all" && c.difficulty !== difficulty) return false;
      if (theme !== "all" && c.theme !== theme) return false;
      return true;
    });
  }, [division, difficulty, theme]);

  // Live theme counts under current division/difficulty
  const themeCounts = useMemo(() => {
    const counts = { all: 0 };
    for (const c of PERFIL_CARDS) {
      if (division !== "all" && c.division !== division) continue;
      if (difficulty !== "all" && c.difficulty !== difficulty) continue;
      counts.all += 1;
      counts[c.theme] = (counts[c.theme] || 0) + 1;
    }
    return counts;
  }, [division, difficulty]);

  useEffect(() => {
    if (!timerOn || timerPreset === 0) return;
    const id = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setTimerOn(false);
          magicAudio.wrong();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [timerOn, timerPreset]);

  const resetCardUI = (startClock = false) => {
    magicAudio.stopVoice();
    setRevealedClues([0]);
    setRevealedAnswer(false);
    setPeeking(false);
    setGuessInput("");
    setGuessFeedback(null);
    setAwardNotice(null);
    setTimeLeft(timerPreset);
    setTimerOn(startClock && timerPreset > 0);
  };

  const buildOrderedDeck = (pool, lastId = null) => {
    if (!prioritizeUnseen) {
      return shuffleFresh(pool, (c) => c.id, lastId);
    }
    const unseen = pool.filter((c) => !discoveredIds.includes(c.id));
    const seen = pool.filter((c) => discoveredIds.includes(c.id));
    return [
      ...shuffleFresh(unseen, (c) => c.id, lastId),
      ...shuffleFresh(seen, (c) => c.id, null),
    ];
  };

  const startDeck = () => {
    const pool = matchingPool.length > 0 ? matchingPool : PERFIL_CARDS;
    const lastId = deck[cardIndex]?.id || null;
    const fresh = buildOrderedDeck(pool, lastId);
    magicAudio.spellCast();
    setDeck(fresh);
    setCardIndex(0);
    resetCardUI(mode === "mesa");
    setScreen("play");
  };

  const currentCard = deck[cardIndex] || null;
  const potentialPoints = Math.max(1, 11 - revealedClues.length);

  const toggleClue = (idx) => {
    setRevealedClues((prev) => {
      if (prev.includes(idx)) return prev;
      magicAudio.sparkle();
      return [...prev, idx].sort((a, b) => a - b);
    });
  };

  const revealNextClue = () => {
    if (!currentCard) return;
    for (let i = 0; i < currentCard.clues.length; i++) {
      if (!revealedClues.includes(i)) {
        magicAudio.sparkle();
        setRevealedClues((prev) => [...prev, i].sort((a, b) => a - b));
        return;
      }
    }
  };

  const handleSoloGuess = (e) => {
    e.preventDefault();
    if (!currentCard || revealedAnswer || !guessInput.trim()) return;

    if (matchesPerfilAnswer(guessInput, currentCard)) {
      magicAudio.correct();
      setSoloScore((s) => s + potentialPoints);
      setSoloSolved((n) => n + 1);
      setSoloStreak((st) => st + 1);
      setGuessFeedback("correct");
      setRevealedAnswer(true);
      markDiscovered(currentCard.id);
      playHouseComment(currentCard, false);
    } else {
      magicAudio.wrong();
      setSoloStreak(0);
      setGuessFeedback("wrong");
      setGuessInput("");
      revealNextClue();
    }
  };

  const handleNextCard = () => {
    if (!deck.length) return;
    if (cardIndex + 1 < deck.length) {
      setCardIndex((i) => i + 1);
      resetCardUI(mode === "mesa");
      magicAudio.sparkle();
    } else {
      const lastId = currentCard?.id || null;
      const fresh = buildOrderedDeck(deck, lastId);
      setDeck(fresh);
      setCardIndex(0);
      resetCardUI(mode === "mesa");
      magicAudio.spellCast();
    }
  };

  const handleReshuffle = () => {
    const lastId = currentCard?.id || null;
    const fresh = shuffleFresh(deck.length ? deck : matchingPool, (c) => c.id, lastId);
    setDeck(fresh);
    setCardIndex(0);
    resetCardUI(mode === "mesa");
    magicAudio.spellCast();
  };

  const awardTeam = (teamId) => {
    const team = teams.find((t) => t.id === teamId);
    if (!team) return;
    setTeams((prev) =>
      prev.map((t) => (t.id === teamId ? { ...t, score: t.score + potentialPoints } : t))
    );
    setRevealedAnswer(true);
    setTimerOn(false);
    if (currentCard) markDiscovered(currentCard.id);
    magicAudio.reveal();
    playHouseComment(currentCard, false);
    setAwardNotice(`+${potentialPoints} pts para ${team.name}!`);
  };

  const addTeam = (e) => {
    e.preventDefault();
    const clean = newTeam.trim();
    if (!clean) return;
    setTeams((prev) => [
      ...prev,
      {
        id: `team-${Date.now()}`,
        name: clean.slice(0, 18),
        score: 0,
        color: TEAM_COLORS[prev.length % TEAM_COLORS.length],
      },
    ]);
    setNewTeam("");
  };

  const removeTeam = (id) => {
    if (teams.length <= 1) return;
    setTeams((prev) => prev.filter((t) => t.id !== id));
  };

  // ==================== LOBBY SCREEN ====================
  if (screen === "lobby") {
    return (
      <section className="perfil-view">
        <div className="section-head">
          <span className="wiz-eyebrow">
            <HelpCircle size={13} /> Jogo de Cartas • {PERFIL_CARDS.length} Cartas • 5 Temas
          </span>
          <h2 className="wiz-title">Perfil Bruxo</h2>
          <p className="wiz-subtitle">
            Personagens com fotos reais, criaturas, lugares, relíquias, feitiços e cartas exclusivas dos livros em pergaminho.
          </p>

          <button
            type="button"
            className={`btn-dumbledore-greet ${speakingDumbledore ? "is-speaking" : ""}`}
            onClick={() => {
              if (speakingDumbledore) {
                magicAudio.stopVoice();
                setSpeakingDumbledore(false);
              } else {
                const nextIntro = (introToggle % 2) + 1;
                setIntroToggle((n) => n + 1);
                magicAudio.playVoice(`dumbledore_perfil_intro_${nextIntro}`, {
                  onStart: () => setSpeakingDumbledore(true),
                  onEnd: () => setSpeakingDumbledore(false),
                });
              }
            }}
          >
            <img src="/images/perfil/alvo-dumbledore.webp" alt="Prof. Dumbledore" />
            <Volume2 size={14} />
            <span>
              {speakingDumbledore ? "Prof. Dumbledore falando..." : "Ouvir Prof. Dumbledore"}
            </span>
          </button>
        </div>

        <WizFrame className="perfil-lobby-card">
          {/* Discovered Progress */}
          <div className="perfil-collection-bar">
            <span>
              <Trophy size={14} /> Coleção descoberta:{" "}
              <strong>
                {discoveredIds.length} / {PERFIL_CARDS.length}
              </strong>
            </span>
            <label className="unseen-toggle">
              <input
                type="checkbox"
                checked={prioritizeUnseen}
                onChange={(e) => setPrioritizeUnseen(e.target.checked)}
              />
              <span>Priorizar cartas inéditas</span>
            </label>
          </div>

          {/* Mode selector */}
          <div className="perfil-mode-row">
            <button
              type="button"
              className={`mode-btn ${mode === "solo" ? "is-active" : ""}`}
              onClick={() => setMode("solo")}
            >
              <User size={18} />
              <div>
                <strong>Modo Solo</strong>
                <small>Digite seu palpite pelas dicas</small>
              </div>
            </button>
            <button
              type="button"
              className={`mode-btn ${mode === "mesa" ? "is-active" : ""}`}
              onClick={() => setMode("mesa")}
            >
              <Users size={18} />
              <div>
                <strong>Modo Mesa (Grupo)</strong>
                <small>Narrador lê dicas + placar das equipes</small>
              </div>
            </button>
          </div>

          <HallowsDivider />

          {/* Filters */}
          <div className="perfil-filters">
            <div className="filter-group">
              <label>Divisão</label>
              <div className="chip-row">
                {PERFIL_DIVISIONS.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    className={`filter-chip ${division === d.id ? "is-active" : ""}`}
                    onClick={() => setDivision(d.id)}
                  >
                    {d.id === "movies" && <Film size={13} />}
                    {d.id === "books" && <BookOpen size={13} />}
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label>Dificuldade</label>
              <div className="chip-row">
                {PERFIL_DIFFICULTIES.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    className={`filter-chip ${difficulty === d.id ? "is-active" : ""}`}
                    onClick={() => setDifficulty(d.id)}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label>Tema de Harry Potter</label>
              <div className="chip-row">
                {PERFIL_THEMES.map((t) => {
                  const cnt = themeCounts[t.id] || 0;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      className={`filter-chip ${theme === t.id ? "is-active" : ""}`}
                      onClick={() => setTheme(t.id)}
                    >
                      {t.label} <span className="chip-count">{cnt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="perfil-lobby-footer">
            <span className="deck-count-pill">
              <Sparkles size={14} />
              <strong>{matchingPool.length}</strong>{" "}
              {matchingPool.length === 1 ? "carta encontrada" : "cartas no baralho"}
            </span>
            <button
              type="button"
              className="btn-gold btn-lg"
              disabled={matchingPool.length === 0}
              onClick={startDeck}
            >
              <Shuffle size={17} /> Embaralhar e Jogar
            </button>
          </div>
        </WizFrame>
      </section>
    );
  }

  // ==================== PLAY SCREEN ====================
  if (!currentCard) return null;
  const showIdentity = revealedAnswer || peeking;
  const cardHouseObj =
    currentCard.house && HOUSES[currentCard.house] ? HOUSES[currentCard.house] : null;
  const isCardDiscovered = discoveredIds.includes(currentCard.id);

  return (
    <section className="perfil-view">
      {/* Top Bar */}
      <div className="perfil-play-bar">
        <button
          type="button"
          className="btn-back-chip"
          onClick={() => {
            magicAudio.stopVoice();
            setScreen("lobby");
          }}
        >
          ← Filtros ({deck.length} cartas)
        </button>

        <div className="perfil-bar-right">
          {mode === "solo" ? (
            <span className="exam-score-pill">
              {soloScore} pts • {soloSolved} acertos{soloStreak >= 2 ? ` • ${soloStreak}x` : ""}
            </span>
          ) : (
            <div className="timer-pills">
              {[0, 30, 60].map((sec) => (
                <button
                  key={sec}
                  type="button"
                  className={`timer-chip ${timerPreset === sec ? "is-active" : ""}`}
                  onClick={() => {
                    setTimerPreset(sec);
                    setTimeLeft(sec);
                    setTimerOn(sec > 0);
                  }}
                >
                  <Clock size={12} /> {sec === 0 ? "Livre" : `${sec}s`}
                </button>
              ))}
              {timerPreset > 0 && <span className="timer-countdown">{timeLeft}s</span>}
            </div>
          )}

          <button
            type="button"
            className="btn-icon-chip"
            onClick={handleReshuffle}
            title="Embaralhar baralho"
          >
            <Shuffle size={15} />
          </button>
        </div>
      </div>

      <div className="perfil-board-grid">
        {/* LEFT COLUMN: IDENTITY CARD (PHOTO OR BOOK PARCHMENT PLAQUE) */}
        <WizFrame className="perfil-card-stage">
          <div className="perfil-card-meta-row">
            <span className="exam-code-chip">
              {currentCard.division === "movies" ? "Filmes" : "Livros"}
            </span>
            <span className="perfil-meta-tag">{THEME_LABELS[currentCard.theme]}</span>
            <span className="perfil-meta-tag">{DIFF_LABELS[currentCard.difficulty]}</span>
            {isCardDiscovered && <span className="sorted-chip">Descoberta</span>}
          </div>

          <div className={`perfil-portrait-frame ${showIdentity ? "is-revealed" : "is-sealed"}`}>
            {showIdentity ? (
              currentCard.image ? (
                <div className="portrait-photo-wrap">
                  <img
                    src={currentCard.image}
                    alt={currentCard.name}
                    className="portrait-photo"
                  />
                  <div className="portrait-nameplate">
                    <strong>{currentCard.name}</strong>
                    <span>{currentCard.tag}</span>
                  </div>
                </div>
              ) : (
                <div className="book-parchment-plaque">
                  <HouseCrest houseId={currentCard.house || "neutral"} size={66} />
                  <span className="plaque-origin">
                    {currentCard.bookOrigin || "Exclusivo dos Livros"}
                  </span>
                  <h3 className="plaque-name">{currentCard.name}</h3>
                  <span className="plaque-tag">{currentCard.tag}</span>
                </div>
              )
            ) : (
              <div className="mystery-card-back">
                <HouseCrest houseId="neutral" size={84} />
                <span className="mystery-points">Valendo {potentialPoints} pts</span>
                <p>
                  {mode === "solo"
                    ? "Abra dicas e descubra quem ou o que está selado"
                    : "Segure 'Espiar' para ler a resposta"}
                </p>
                {cardHouseObj && revealedClues.length >= 6 && (
                  <span className="mystery-hint-badge">Dica Extra: {cardHouseObj.name}</span>
                )}
              </div>
            )}
          </div>

          {showIdentity && <p className="perfil-summary">{currentCard.summary}</p>}

          {revealedAnswer && (() => {
            const c = HOUSE_COMMENTATORS[currentCard.house] || HOUSE_COMMENTATORS.neutral;
            return (
              <button
                type="button"
                className={`btn-house-comment ${speakingDumbledore ? "is-speaking" : ""}`}
                onClick={() => {
                  if (speakingDumbledore) {
                    magicAudio.stopVoice();
                    setSpeakingDumbledore(false);
                  } else {
                    playHouseComment(currentCard, true);
                  }
                }}
              >
                <img src={c.avatar} alt={c.name} draggable={false} />
                <Volume2 size={14} />
                <span>{speakingDumbledore ? `${c.name} falando...` : `Comentário: ${c.name}`}</span>
              </button>
            );
          })()}

          {/* Card Controls */}
          <div className="perfil-card-controls">
            {mode === "mesa" && !revealedAnswer && (
              <button
                type="button"
                className="btn-outline"
                onMouseDown={() => setPeeking(true)}
                onMouseUp={() => setPeeking(false)}
                onMouseLeave={() => setPeeking(false)}
                onTouchStart={() => setPeeking(true)}
                onTouchEnd={() => setPeeking(false)}
              >
                {peeking ? <EyeOff size={15} /> : <Eye size={15} />} Segurar para Espiar
              </button>
            )}

            {!revealedAnswer ? (
              <button
                type="button"
                className="btn-outline"
                onClick={() => {
                  setRevealedAnswer(true);
                  setTimerOn(false);
                  magicAudio.reveal();
                }}
              >
                <Eye size={15} /> Revelar Carta
              </button>
            ) : (
              <button type="button" className="btn-gold" onClick={handleNextCard}>
                Próxima Carta <ChevronRight size={16} />
              </button>
            )}
          </div>
        </WizFrame>

        {/* RIGHT COLUMN: 10 CLUES + SOLO GUESS OR MESA SCOREBOARD */}
        <WizFrame className="perfil-clues-panel">
          <div className="clues-header">
            <div>
              <span className="wiz-eyebrow">
                Carta {cardIndex + 1} de {deck.length}
              </span>
              <h3>Dicas Numeradas (1–10)</h3>
            </div>
            <span className="points-orb">
              <strong>{potentialPoints}</strong>
              <small>pts</small>
            </span>
          </div>

          {/* Numbered Seals 1..10 */}
          <div className="clue-number-bar">
            {currentCard.clues.map((_, idx) => {
              const isOpen = revealedClues.includes(idx);
              return (
                <button
                  key={idx}
                  type="button"
                  className={`clue-num-btn ${isOpen ? "is-open" : ""}`}
                  onClick={() => toggleClue(idx)}
                  title={`Revelar dica ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Open Clues List with optional Voice Readout button */}
          <ol className="clues-list">
            {revealedClues.map((idx) => (
              <li key={idx} className="clue-item">
                <span className="clue-idx">{idx + 1}</span>
                <span className="clue-text">{currentCard.clues[idx]}</span>
                <button
                  type="button"
                  className="btn-clue-speak"
                  onClick={() => magicAudio.speakFallback(`Dica ${idx + 1}. ${currentCard.clues[idx]}`)}
                  title="Ler esta dica em voz alta"
                  aria-label={`Ler dica ${idx + 1}`}
                >
                  <Volume2 size={13} />
                </button>
              </li>
            ))}
          </ol>

          {revealedClues.length < currentCard.clues.length && !revealedAnswer && (
            <button type="button" className="btn-outline btn-next-clue" onClick={revealNextClue}>
              + Revelar Próxima Dica ({revealedClues.length}/{currentCard.clues.length})
            </button>
          )}

          {/* SOLO MODE: GUESS FORM */}
          {mode === "solo" && (
            <div className="solo-guess-box">
              {!revealedAnswer ? (
                <form onSubmit={handleSoloGuess} className="guess-form">
                  <input
                    type="text"
                    value={guessInput}
                    onChange={(e) => setGuessInput(e.target.value)}
                    placeholder="Digite seu palpite (ex: Snape, Polissuco, Pirraça)..."
                    className="wiz-input"
                    autoComplete="off"
                  />
                  <button type="submit" className="btn-gold">
                    <Send size={15} /> Chutar
                  </button>
                </form>
              ) : (
                <div className={`guess-banner ${guessFeedback === "correct" ? "is-win" : ""}`}>
                  {guessFeedback === "correct"
                    ? `Correto! +${potentialPoints} pontos pela carta ${currentCard.name}!`
                    : `Resposta: ${currentCard.name}`}
                </div>
              )}

              {guessFeedback === "wrong" && !revealedAnswer && (
                <p className="guess-wrong-note">
                  Ainda não! Uma nova dica foi aberta para ajudar.
                </p>
              )}
            </div>
          )}

          {/* MESA MODE: TEAMS SCOREBOARD */}
          {mode === "mesa" && (
            <div className="mesa-scoreboard">
              <div className="mesa-score-head">
                <strong>Placar da Mesa</strong>
                <button
                  type="button"
                  className="btn-text-muted"
                  onClick={() => setTeams((prev) => prev.map((t) => ({ ...t, score: 0 })))}
                >
                  <RotateCcw size={12} /> Zerar
                </button>
              </div>

              {awardNotice && <div className="guess-banner is-win">{awardNotice}</div>}

              <div className="teams-list">
                {teams.map((t) => (
                  <div key={t.id} className="team-row">
                    <span className="team-dot" style={{ background: t.color }} />
                    <span className="team-name">{t.name}</span>
                    <strong className="team-pts">{t.score} pts</strong>
                    <button
                      type="button"
                      className="btn-award"
                      onClick={() => awardTeam(t.id)}
                      title={`Dar +${potentialPoints} pts para ${t.name}`}
                    >
                      <Check size={13} /> +{potentialPoints}
                    </button>
                    {teams.length > 1 && (
                      <button
                        type="button"
                        className="btn-remove-team"
                        onClick={() => removeTeam(t.id)}
                        aria-label={`Remover ${t.name}`}
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={addTeam} className="add-team-form">
                <input
                  type="text"
                  value={newTeam}
                  onChange={(e) => setNewTeam(e.target.value)}
                  placeholder="Adicionar jogador ou Casa..."
                  className="wiz-input wiz-input-sm"
                />
                <button type="submit" className="btn-outline btn-sm">
                  <Plus size={14} /> Adicionar
                </button>
              </form>
            </div>
          )}
        </WizFrame>
      </div>
    </section>
  );
}
