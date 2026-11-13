import { useEffect, useState } from "react";
import { Volume2, VolumeX, Castle, Wand2, Shield, BookOpen, Lock } from "lucide-react";
import { HOUSES, HOUSE_ORDER, NEUTRAL_THEME } from "./data/houses";
import { magicAudio } from "./utils/sound";
import MagicCanvas from "./components/MagicCanvas";
import { HouseCrest } from "./components/HouseCrest";
import SanctuaryHome from "./components/SanctuaryHome";
import SortingCeremony from "./components/SortingCeremony";
import QuizArena from "./components/QuizArena";
import HousesHall from "./components/HousesHall";

export default function App() {
  const [view, setView] = useState("home"); // home | sorting | houses | quiz
  const [soundOn, setSoundOn] = useState(true);
  const [lockNotice, setLockNotice] = useState(null);

  const [sortedHouse, setSortedHouse] = useState(() => {
    try {
      return localStorage.getItem("hp_sorted_house") || null;
    } catch {
      return null;
    }
  });

  const [unlockedHouses, setUnlockedHouses] = useState(() => {
    try {
      const raw = localStorage.getItem("hp_unlocked_houses");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [activeTheme, setActiveTheme] = useState(() => {
    try {
      return localStorage.getItem("hp_active_theme") || "neutral";
    } catch {
      return "neutral";
    }
  });

  useEffect(() => {
    magicAudio.setEnabled(soundOn);
  }, [soundOn]);

  const saveState = (nextSorted, nextUnlocked, nextTheme) => {
    try {
      if (nextSorted) localStorage.setItem("hp_sorted_house", nextSorted);
      else localStorage.removeItem("hp_sorted_house");
      localStorage.setItem("hp_unlocked_houses", JSON.stringify(nextUnlocked));
      localStorage.setItem("hp_active_theme", nextTheme);
    } catch {
      // ignore storage errors
    }
  };

  // Called when the Sorting Hat finishes and selects a House!
  // Automatically unlocks that House and applies its 3D theme!
  const handleCompleteSorting = (houseId) => {
    const nextUnlocked = [houseId];
    setSortedHouse(houseId);
    setUnlockedHouses(nextUnlocked);
    setActiveTheme(houseId);
    saveState(houseId, nextUnlocked, houseId);
    magicAudio.themeSwitch(houseId);
  };

  // Called when the player passes a House Guardian Quiz (>= 6/8)
  const handleUnlockHouse = (houseId) => {
    setUnlockedHouses((prev) => {
      const next = prev.includes(houseId) ? prev : [...prev, houseId];
      saveState(sortedHouse, next, activeTheme);
      return next;
    });
  };

  // Called when the player chooses to re-take the Sorting Hat test:
  // Wipes previously unlocked houses and resets to Neutral Great Hall!
  const handleResetSorting = () => {
    setSortedHouse(null);
    setUnlockedHouses([]);
    setActiveTheme("neutral");
    saveState(null, [], "neutral");
    magicAudio.themeSwitch("neutral");
  };

  const handleSelectCrestHeader = (themeId) => {
    if (themeId === "neutral") {
      magicAudio.themeSwitch("neutral");
      setActiveTheme("neutral");
      saveState(sortedHouse, unlockedHouses, "neutral");
      setLockNotice(null);
      return;
    }

    if (unlockedHouses.includes(themeId)) {
      magicAudio.themeSwitch(themeId);
      setActiveTheme(themeId);
      saveState(sortedHouse, unlockedHouses, themeId);
      setLockNotice(null);
    } else {
      magicAudio.prank();
      const targetName = HOUSES[themeId]?.name || "";
      if (!sortedHouse) {
        setLockNotice({
          text: `O brasão de ${targetName} está selado! Passe primeiro pelo Chapéu Seletor para descobrir sua Casa.`,
          actionLabel: "Ir ao Chapéu Seletor",
          targetView: "sorting",
        });
      } else {
        setLockNotice({
          text: `Tema de ${targetName} bloqueado! Vença o Desafio do Guardião na aba Casas para liberar este brasão.`,
          actionLabel: `Desafiar ${targetName}`,
          targetView: "houses",
        });
      }
    }
  };

  const currentThemeObj =
    activeTheme === "neutral" || !HOUSES[activeTheme] ? NEUTRAL_THEME : HOUSES[activeTheme];

  return (
    <div
      className={`sanctuary-app theme-${activeTheme}`}
      style={{
        "--theme-primary": currentThemeObj.colors.primary,
        "--theme-secondary": currentThemeObj.colors.secondary,
        "--theme-accent": currentThemeObj.colors.accent,
        "--theme-surface": currentThemeObj.colors.surface,
        "--theme-surface-alt": currentThemeObj.colors.surfaceAlt,
        "--theme-glow": currentThemeObj.colors.glow,
        "--theme-bg": currentThemeObj.colors.bgGradient,
        "--theme-ornament": currentThemeObj.colors.borderOrnament,
      }}
    >
      {/* Real Three.js 3D World Background */}
      <MagicCanvas themeId={activeTheme} />
      <div className="ambient-vignette" aria-hidden="true" />

      {/* Sticky Header with the 5 Interactive Crests (Great Hall + 4 Houses) */}
      <header className="top-navbar">
        <div className="header-top-row">
          <button
            type="button"
            className="brand-btn"
            onClick={() => {
              magicAudio.sparkle();
              setView("home");
            }}
          >
            <span className="brand-crest-dot" />
            <div className="brand-titles">
              <strong>Refúgio de Hogwarts</strong>
              <small>{currentThemeObj.name}</small>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" aria-label="Menu Principal">
            <button className={view === "home" ? "active" : ""} onClick={() => setView("home")}>
              Salão
            </button>
            <button
              className={view === "sorting" ? "active" : ""}
              onClick={() => setView("sorting")}
            >
              Chapéu Seletor
            </button>
            <button className={view === "houses" ? "active" : ""} onClick={() => setView("houses")}>
              Provas das Casas
            </button>
            <button className={view === "quiz" ? "active" : ""} onClick={() => setView("quiz")}>
              Quiz Bruxo
            </button>
          </nav>

          <button
            type="button"
            className="sound-toggle"
            onClick={() => setSoundOn((s) => !s)}
            aria-label={soundOn ? "Desativar som mágico" : "Ativar som mágico"}
            title={soundOn ? "Som e Voz do Chapéu: Ativados" : "Som Mudo"}
          >
            {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        </div>

        {/* Crest Theme Selector Bar in Header */}
        <div className="header-crest-bar" role="toolbar" aria-label="Seletor de Tema e Casa">
          <button
            type="button"
            className={`header-crest-btn ${activeTheme === "neutral" ? "is-selected" : ""}`}
            onClick={() => handleSelectCrestHeader("neutral")}
            title="Modo Neutro: Salão Principal de Banquetes"
          >
            <HouseCrest houseId="neutral" size={34} />
            <span className="crest-btn-label">Salão</span>
          </button>

          <div className="crest-bar-divider" />

          {HOUSE_ORDER.map((id) => {
            const isUnlocked = unlockedHouses.includes(id);
            const isSelected = activeTheme === id;
            const h = HOUSES[id];
            return (
              <button
                key={id}
                type="button"
                className={`header-crest-btn ${isSelected ? "is-selected" : ""} ${
                  !isUnlocked ? "is-locked" : ""
                }`}
                onClick={() => handleSelectCrestHeader(id)}
                title={
                  isUnlocked
                    ? `Ativar Tema 3D de ${h.name}`
                    : `${h.name} (Bloqueado — libere pelo Chapéu ou Quiz das Casas)`
                }
              >
                <HouseCrest houseId={id} size={34} locked={!isUnlocked} />
                <span className="crest-btn-label">{h.name}</span>
              </button>
            );
          })}
        </div>

        {/* Locked Crest Toast Notice */}
        {lockNotice && (
          <div className="header-lock-toast">
            <Lock size={15} />
            <span>{lockNotice.text}</span>
            <button
              type="button"
              className="toast-action-btn"
              onClick={() => {
                setView(lockNotice.targetView);
                setLockNotice(null);
              }}
            >
              {lockNotice.actionLabel} →
            </button>
            <button
              type="button"
              className="toast-close-btn"
              onClick={() => setLockNotice(null)}
              aria-label="Fechar aviso"
            >
              ✕
            </button>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="sanctuary-main">
        {view === "home" && (
          <SanctuaryHome
            sortedHouse={sortedHouse}
            unlockedHouses={unlockedHouses}
            activeTheme={activeTheme}
            onNavigate={setView}
            onSelectTheme={(id) => handleSelectCrestHeader(id)}
          />
        )}
        {view === "sorting" && (
          <SortingCeremony
            sortedHouse={sortedHouse}
            unlockedCount={unlockedHouses.length}
            onCompleteHouse={handleCompleteSorting}
            onResetSorting={handleResetSorting}
            onGoHouses={() => setView("houses")}
            onGoQuiz={() => setView("quiz")}
          />
        )}
        {view === "houses" && (
          <HousesHall
            sortedHouse={sortedHouse}
            unlockedHouses={unlockedHouses}
            activeTheme={activeTheme}
            onSelectTheme={(id) => handleSelectCrestHeader(id)}
            onUnlockHouse={handleUnlockHouse}
            onResetSorting={handleResetSorting}
            onStartSorting={() => setView("sorting")}
          />
        )}
        {view === "quiz" && <QuizArena onBack={() => setView("home")} />}
      </main>

      {/* Mobile-First Bottom Magical Dock Navigation */}
      <nav className="mobile-bottom-dock" aria-label="Navegação Mobile">
        <button className={view === "home" ? "active" : ""} onClick={() => setView("home")}>
          <Castle size={20} />
          <span>Salão</span>
        </button>
        <button className={view === "sorting" ? "active" : ""} onClick={() => setView("sorting")}>
          <Wand2 size={20} />
          <span>Chapéu</span>
        </button>
        <button className={view === "houses" ? "active" : ""} onClick={() => setView("houses")}>
          <Shield size={20} />
          <span>Casas ({unlockedHouses.length}/4)</span>
        </button>
        <button className={view === "quiz" ? "active" : ""} onClick={() => setView("quiz")}>
          <BookOpen size={20} />
          <span>Quiz HP</span>
        </button>
      </nav>
    </div>
  );
}
