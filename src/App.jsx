import { useEffect, useState } from "react";
import {
  Volume2,
  VolumeX,
  Castle,
  Wand2,
  Shield,
  BookOpen,
  HelpCircle,
  Lock,
} from "lucide-react";
import { HOUSES, HOUSE_ORDER, NEUTRAL_THEME } from "./data/houses";
import { magicAudio } from "./utils/sound";
import HogwartsBackdrop from "./components/HogwartsBackdrop";
import { HouseCrest } from "./components/HouseCrest";
import SanctuaryHome from "./components/SanctuaryHome";
import SortingCeremony from "./components/SortingCeremony";
import HousesHall from "./components/HousesHall";
import QuizArena from "./components/QuizArena";
import PerfilGame from "./components/PerfilGame";

const NAV_ITEMS = [
  { id: "home", label: "Salão", mobileLabel: "Salão", icon: Castle },
  { id: "sorting", label: "Chapéu Seletor", mobileLabel: "Chapéu", icon: Wand2 },
  { id: "houses", label: "Provas das Casas", mobileLabel: "Provas", icon: Shield },
  { id: "quiz", label: "Quiz Bruxo", mobileLabel: "Quiz", icon: BookOpen },
  { id: "perfil", label: "Perfil HP", mobileLabel: "Perfil", icon: HelpCircle },
];

export default function App() {
  const [view, setView] = useState("home"); // home | sorting | houses | quiz | perfil
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

  const handleCompleteSorting = (houseId) => {
    const nextUnlocked = [houseId];
    setSortedHouse(houseId);
    setUnlockedHouses(nextUnlocked);
    setActiveTheme(houseId);
    saveState(houseId, nextUnlocked, houseId);
    magicAudio.themeSwitch(houseId);
  };

  const handleUnlockHouse = (houseId) => {
    setUnlockedHouses((prev) => {
      const next = prev.includes(houseId) ? prev : [...prev, houseId];
      saveState(sortedHouse, next, activeTheme);
      return next;
    });
  };

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
          text: `${targetName} selada — descubra sua Casa no Chapéu Seletor primeiro.`,
          actionLabel: "Chapéu Seletor",
          targetView: "sorting",
        });
      } else {
        setLockNotice({
          text: `${targetName} bloqueada — vença o exame da Casa para liberar esta Sala.`,
          actionLabel: `Fazer Prova`,
          targetView: "houses",
        });
      }
    }
  };

  const currentThemeObj =
    activeTheme === "neutral" || !HOUSES[activeTheme] ? NEUTRAL_THEME : HOUSES[activeTheme];

  return (
    <div
      className={`hogwarts-app theme-${activeTheme}`}
      style={{
        "--theme-primary": currentThemeObj.colors.primary,
        "--theme-secondary": currentThemeObj.colors.secondary,
        "--theme-accent": currentThemeObj.colors.accent,
        "--theme-surface": currentThemeObj.colors.surface,
        "--theme-surface-alt": currentThemeObj.colors.surfaceAlt,
        "--theme-glow": currentThemeObj.colors.glow,
        "--theme-ornament": currentThemeObj.colors.borderOrnament,
        "--theme-rgb": currentThemeObj.particleColor || "226, 190, 104",
      }}
    >
      {/* Real Hogwarts Photography Backdrop with Theme Color Grading */}
      <HogwartsBackdrop themeId={activeTheme} />

      {/* Top Navigation & Official Crests Bar */}
      <header className="top-navbar">
        <div className="header-inner">
          <div className="header-top-row">
            <button
              type="button"
              className="brand-btn"
              onClick={() => {
                magicAudio.stopVoice();
                magicAudio.sparkle();
                setView("home");
              }}
            >
              <HouseCrest houseId={activeTheme} size={36} />
              <div className="brand-titles">
                <strong>Hogwarts</strong>
                <small>{currentThemeObj.name}</small>
              </div>
            </button>

            <nav className="desktop-nav" aria-label="Menu Principal">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={view === item.id ? "is-active" : ""}
                  onClick={() => {
                    magicAudio.stopVoice();
                    magicAudio.sparkle();
                    setView(item.id);
                    setLockNotice(null);
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <button
              type="button"
              className="sound-toggle"
              onClick={() => setSoundOn((s) => !s)}
              aria-label={soundOn ? "Silenciar som" : "Ativar som"}
              title={soundOn ? "Som e Voz ativados" : "Som silenciado"}
            >
              {soundOn ? <Volume2 size={17} /> : <VolumeX size={17} />}
            </button>
          </div>

          {/* 5 Official Crests Theme Bar */}
          <div className="header-crest-bar" role="toolbar" aria-label="Salas e Temas de Hogwarts">
            <button
              type="button"
              className={`header-crest-btn ${activeTheme === "neutral" ? "is-selected" : ""}`}
              onClick={() => handleSelectCrestHeader("neutral")}
              title="Salão Principal de Hogwarts"
            >
              <HouseCrest houseId="neutral" size={30} />
              <span>Salão</span>
            </button>

            <span className="crest-bar-sep" aria-hidden="true" />

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
                  title={isUnlocked ? `Sala Comunal da ${h.name}` : `${h.name} (Bloqueada)`}
                >
                  <HouseCrest houseId={id} size={30} locked={!isUnlocked} />
                  <span>{h.name}</span>
                </button>
              );
            })}
          </div>

          {lockNotice && (
            <div className="header-lock-toast">
              <Lock size={14} />
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
        </div>
      </header>

      {/* Main Content */}
      <main className="sanctuary-main">
        {view === "home" && (
          <SanctuaryHome
            sortedHouse={sortedHouse}
            unlockedHouses={unlockedHouses}
            activeTheme={activeTheme}
            onNavigate={(next) => {
              setView(next);
              setLockNotice(null);
            }}
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
            onSelectTheme={handleSelectCrestHeader}
            onUnlockHouse={handleUnlockHouse}
            onStartSorting={() => setView("sorting")}
          />
        )}
        {view === "quiz" && <QuizArena />}
        {view === "perfil" && <PerfilGame />}
      </main>

      {/* Mobile Bottom Dock (5 Tabs) */}
      <nav className="mobile-bottom-dock" aria-label="Navegação Mobile">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              className={view === item.id ? "is-active" : ""}
              onClick={() => {
                magicAudio.sparkle();
                setView(item.id);
                setLockNotice(null);
              }}
            >
              <Icon size={19} />
              <span>{item.mobileLabel}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
