import { HOUSES, NEUTRAL_THEME } from "../data/houses";

export function HouseCrest({ houseId = "neutral", size = 64, locked = false, className = "" }) {
  const isNeutral = houseId === "neutral" || !HOUSES[houseId];
  const house = isNeutral ? NEUTRAL_THEME : HOUSES[houseId];
  const { primary, secondary } = house.colors;

  return (
    <div
      className={`crest-wrapper ${locked ? "is-locked" : ""} ${className}`}
      style={{ width: size, height: size * 1.12 }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 120 136"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="house-crest-svg"
        aria-label={`Brasão de ${house.name}`}
      >
        <defs>
          <linearGradient id={`shield-${houseId}`} x1="0" y1="0" x2="120" y2="136" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={primary} />
            <stop offset="60%" stopColor="#121016" />
            <stop offset="100%" stopColor="#060508" />
          </linearGradient>
          <linearGradient id={`gold-${houseId}`} x1="0" y1="0" x2="120" y2="136" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fff2b2" />
            <stop offset="50%" stopColor={secondary} />
            <stop offset="100%" stopColor="#7a5812" />
          </linearGradient>
        </defs>

        {/* Ornate Outer Shield */}
        <path
          d="M60 4L112 20V66C112 101 85 123 60 132C35 123 8 101 8 66V20L60 4Z"
          fill={`url(#shield-${houseId})`}
          stroke={`url(#gold-${houseId})`}
          strokeWidth="5"
        />
        <path
          d="M60 12L104 25.5V65C104 94 80 114 60 123C40 114 16 94 16 65V25.5L60 12Z"
          stroke={secondary}
          strokeOpacity="0.55"
          strokeWidth="1.6"
          strokeDasharray="4 2"
        />

        {/* NEUTRAL: GREAT HALL HOGWARTS 'H' & 4 QUADRANTS */}
        {isNeutral && (
          <g>
            <path d="M60 14V121M18 65H102" stroke={secondary} strokeOpacity="0.35" strokeWidth="1.5" />
            <circle cx="60" cy="65" r="24" fill="#1a130a" stroke={secondary} strokeWidth="2.5" />
            <path
              d="M50 51V79M70 51V79M50 65H70M46 51H54M66 51H74M46 79H54M66 79H74"
              stroke="#fff2b2"
              strokeWidth="3.4"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* GRYFFINDOR: HERALDIC LION & SWORD */}
        {houseId === "gryffindor" && (
          <g stroke="#ffe799" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M60 22V106" strokeOpacity="0.6" />
            <path d="M44 36H76" strokeOpacity="0.7" />
            <path
              d="M38 54C32 44 40 30 53 33C57 26 63 26 67 33C80 30 88 44 82 54C89 64 81 80 69 82L60 94L51 82C39 80 31 64 38 54Z"
              fill="#f5c542"
              fillOpacity="0.28"
            />
            <path d="M46 46L52 50M74 46L68 50" strokeWidth="3" />
            <circle cx="52" cy="54" r="2.5" fill="#ff3b1f" stroke="none" />
            <circle cx="68" cy="54" r="2.5" fill="#ff3b1f" stroke="none" />
            <path d="M53 66L60 72L67 66" strokeWidth="3" />
          </g>
        )}

        {/* SLYTHERIN: CROWNED SERPENT */}
        {houseId === "slytherin" && (
          <g stroke="#98f5c4" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <path
              d="M76 34C64 24 42 32 42 46C42 58 78 56 78 70C78 84 42 80 42 92C42 101 55 105 68 99"
              fill="none"
              strokeWidth="4.2"
            />
            <path d="M76 34L86 37L78 43Z" fill="#98f5c4" />
            <circle cx="73" cy="36" r="1.8" fill="#051c12" stroke="none" />
            <path d="M86 37L93 34M86 37L93 40" stroke="#ff4d6d" strokeWidth="1.8" />
          </g>
        )}

        {/* RAVENCLAW: SOARING EAGLE & ASTROLABE */}
        {houseId === "ravenclaw" && (
          <g stroke="#f0c38e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="60" cy="62" r="28" stroke="#73b3ff" strokeOpacity="0.4" strokeDasharray="3 3" />
            <path
              d="M60 34C51 34 45 41 45 49C31 44 22 49 22 59C32 64 41 63 48 61L53 92L60 83L67 92L72 61C79 63 88 64 98 59C98 49 89 44 75 49C75 41 69 34 60 34Z"
              fill="#73b3ff"
              fillOpacity="0.25"
            />
            <circle cx="60" cy="27" r="3.2" fill="#73b3ff" stroke="none" />
          </g>
        )}

        {/* HUFFLEPUFF: GUARDIAN BADGER & GOLDEN VINES */}
        {houseId === "hufflepuff" && (
          <g stroke="#ffe07d" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path
              d="M38 56C38 40 48 33 60 33C72 33 82 40 82 56C82 74 71 88 60 88C49 88 38 74 38 56Z"
              fill="#ffd447"
              fillOpacity="0.24"
            />
            <path d="M47 38L54 64M73 38L66 64" strokeWidth="4" />
            <circle cx="50" cy="54" r="2.4" fill="#fff" stroke="none" />
            <circle cx="70" cy="54" r="2.4" fill="#fff" stroke="none" />
            <path d="M55 70C58 74 62 74 65 70" strokeWidth="3" />
            <path d="M36 94C48 102 72 102 84 94" strokeOpacity="0.8" />
          </g>
        )}
      </svg>

      {locked && (
        <div className="crest-lock-overlay" title="Bloqueado">
          <span>🔒</span>
        </div>
      )}
    </div>
  );
}

/**
 * Animated 3D-styled Guardian Mascot showcase for the active theme!
 */
export function GuardianAnimalShowcase({ themeId = "neutral" }) {
  if (themeId === "neutral") {
    return (
      <div className="guardian-showcase guardian-neutral" aria-label="Salão Principal de Banquetes">
        <div className="guardian-halo neutral-halo" />
        <svg viewBox="0 0 220 130" className="guardian-svg">
          {/* 4 Floating Candles & Golden Chalice of the Great Hall */}
          <g className="floating-candles-svg">
            <rect x="38" y="32" width="8" height="34" rx="3" fill="#f7eed7" />
            <path d="M42 18C46 25 46 30 42 32C38 30 38 25 42 18Z" fill="#ffdf6b" />
            <rect x="68" y="20" width="8" height="38" rx="3" fill="#f7eed7" />
            <path d="M72 6C76 13 76 18 72 20C68 18 68 13 72 6Z" fill="#ffdf6b" />
            <rect x="144" y="22" width="8" height="36" rx="3" fill="#f7eed7" />
            <path d="M148 8C152 15 152 20 148 22C144 20 144 15 148 8Z" fill="#ffdf6b" />
            <rect x="174" y="34" width="8" height="32" rx="3" fill="#f7eed7" />
            <path d="M178 20C182 27 182 32 178 34C174 32 174 27 178 20Z" fill="#ffdf6b" />
          </g>
          {/* Central Banquet Goblet & Tables */}
          <path
            d="M92 46H128L122 76C120 84 115 88 110 88C105 88 100 84 98 76L92 46Z"
            fill="url(#gobletGold)"
            stroke="#fff1b8"
            strokeWidth="2"
          />
          <path d="M110 88V108M96 108H124" stroke="#f5c542" strokeWidth="4" strokeLinecap="round" />
          <path d="M24 116H196" stroke="#8c6b2a" strokeWidth="3" strokeDasharray="8 4" />
          <defs>
            <linearGradient id="gobletGold" x1="92" y1="46" x2="128" y2="90" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fff2b2" />
              <stop offset="50%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#6e4f10" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  if (themeId === "gryffindor") {
    return (
      <div className="guardian-showcase guardian-gryffindor" aria-label="Leão Guardião da Grifinória">
        <div className="guardian-halo gryffindor-halo" />
        <svg viewBox="0 0 220 140" className="guardian-svg">
          {/* Roaring Lion with Fiery Mane */}
          <path
            className="guardian-mane"
            d="M110 12L126 24L146 18L152 38L172 44L164 64L178 82L158 94L162 114L138 112L126 128L110 118L94 128L82 112L58 114L62 94L42 82L56 64L48 44L68 38L74 18L94 24Z"
            fill="rgba(217, 20, 36, 0.32)"
            stroke="#f5c542"
            strokeWidth="2.5"
          />
          <path
            d="M80 52C80 36 94 28 110 28C126 28 140 36 140 52C140 74 128 96 110 104C92 96 80 74 80 52Z"
            fill="#5e080c"
            stroke="#ffd86b"
            strokeWidth="2.5"
          />
          {/* Glowing Eyes */}
          <polygon points="92,54 103,58 95,62" fill="#ffdf6b" />
          <polygon points="128,54 117,58 125,62" fill="#ffdf6b" />
          {/* Nose & Roaring Fangs */}
          <polygon points="104,68 116,68 110,76" fill="#f5c542" />
          <path d="M96 84H124L120 94H100Z" fill="#1a0204" stroke="#f5c542" strokeWidth="1.8" />
        </svg>
      </div>
    );
  }

  if (themeId === "slytherin") {
    return (
      <div className="guardian-showcase guardian-slytherin" aria-label="Serpente Guardiã da Sonserina">
        <div className="guardian-halo slytherin-halo" />
        <svg viewBox="0 0 220 140" className="guardian-svg">
          {/* Coiled Regal Serpent */}
          <path
            className="serpent-coil"
            d="M44 108C28 84 58 64 88 76C118 88 154 96 168 72C180 50 142 36 114 48C92 58 86 30 112 22C132 16 150 26 156 34"
            fill="none"
            stroke="#2ee68a"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M44 108C28 84 58 64 88 76C118 88 154 96 168 72C180 50 142 36 114 48C92 58 86 30 112 22C132 16 150 26 156 34"
            fill="none"
            stroke="#083820"
            strokeWidth="6"
            strokeDasharray="6 6"
            strokeLinecap="round"
          />
          {/* Serpent Head & Flickering Tongue */}
          <polygon points="152,24 176,34 156,44" fill="#7ce8b0" stroke="#083820" strokeWidth="2" />
          <circle cx="160" cy="32" r="2.3" fill="#ff2a55" />
          <path
            className="serpent-tongue"
            d="M176 34H192M192 34L199 29M192 34L199 39"
            stroke="#ff3b6b"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  if (themeId === "ravenclaw") {
    return (
      <div className="guardian-showcase guardian-ravenclaw" aria-label="Águia Guardiã da Corvinal">
        <div className="guardian-halo ravenclaw-halo" />
        <svg viewBox="0 0 220 140" className="guardian-svg">
          <circle cx="110" cy="70" r="52" stroke="#d99b52" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
          {/* Soaring Eagle Wings */}
          <path
            className="eagle-wings"
            d="M110 46C96 46 86 58 86 68C58 56 30 62 18 82C42 88 66 86 84 80L96 118L110 104L124 118L136 80C154 86 178 88 202 82C190 62 162 56 134 68C134 58 124 46 110 46Z"
            fill="rgba(59, 130, 246, 0.28)"
            stroke="#d99b52"
            strokeWidth="2.6"
          />
          <polygon points="105,36 115,36 110,24" fill="#73b3ff" />
          <polygon points="106,54 114,54 110,64" fill="#ffd885" />
        </svg>
      </div>
    );
  }

  return (
    <div className="guardian-showcase guardian-hufflepuff" aria-label="Texugo Guardião da Lufa-Lufa">
      <div className="guardian-halo hufflepuff-halo" />
      <svg viewBox="0 0 220 140" className="guardian-svg">
        {/* Hexagonal Honeycomb Aura & Badger */}
        <polygon
          points="110,12 162,40 162,96 110,124 58,96 58,40"
          fill="rgba(255, 212, 71, 0.12)"
          stroke="#ffd447"
          strokeWidth="2"
        />
        <path
          d="M74 66C74 44 90 32 110 32C130 32 146 44 146 66C146 92 130 110 110 110C90 110 74 92 74 66Z"
          fill="#261c0a"
          stroke="#ffd447"
          strokeWidth="2.8"
        />
        {/* Badger White Stripes */}
        <path d="M92 36L100 82M128 36L120 82" stroke="#f7eed7" strokeWidth="8" strokeLinecap="round" />
        <circle cx="94" cy="64" r="3" fill="#ffd447" />
        <circle cx="126" cy="64" r="3" fill="#ffd447" />
        <ellipse cx="110" cy="84" rx="8" ry="5" fill="#ffd447" />
      </svg>
    </div>
  );
}

export function SortingHat3D({ deliberating = false, size = 160 }) {
  return (
    <div className={`sorting-hat-3d ${deliberating ? "is-deliberating" : ""}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="hatLeather" x1="40" y1="20" x2="160" y2="160" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7a5132" />
            <stop offset="55%" stopColor="#4a2d18" />
            <stop offset="100%" stopColor="#241308" />
          </linearGradient>
          <radialGradient id="hatAura" cx="50%" cy="55%" r="50%">
            <stop offset="0%" stopColor="#f5d87e" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#f5d87e" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="86" fill="url(#hatAura)" />
        <ellipse cx="100" cy="144" rx="86" ry="19" fill="#2d1a0e" stroke="#b88940" strokeWidth="2.5" />
        <path
          d="M48 140C54 96 68 60 84 32C96 14 120 18 128 34C112 44 118 66 132 82C142 100 148 122 152 140Z"
          fill="url(#hatLeather)"
          stroke="#b88940"
          strokeWidth="2.4"
        />
        <path d="M72 88C81 80 90 83 96 90" stroke="#170b04" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M106 90C112 83 121 80 130 88" stroke="#170b04" strokeWidth="4.5" strokeLinecap="round" />
        <path
          className="hat-mouth"
          d="M72 115C88 125 114 125 130 113"
          stroke="#120802"
          strokeWidth="6.5"
          strokeLinecap="round"
        />
        <path d="M86 52L106 59" stroke="#cfa15a" strokeWidth="1.8" strokeDasharray="3 3" />
      </svg>
    </div>
  );
}

export function GoldenSnitch3D({ size = 76 }) {
  return (
    <div className="snitch-3d" style={{ width: size * 2.2, height: size }}>
      <div className="snitch-wing left" />
      <div className="snitch-core" />
      <div className="snitch-wing right" />
    </div>
  );
}
