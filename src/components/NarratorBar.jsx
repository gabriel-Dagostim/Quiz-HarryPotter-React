import { Volume2, Square } from "lucide-react";

const CHARACTERS = {
  hat: {
    name: "Chapéu Seletor",
    role: "Cerimônia de Seleção",
    avatar: "/images/props/sorting-hat.webp",
    isProp: true,
  },
  minerva: {
    name: "Profa. Minerva McGonagall",
    role: "Banca de Hogwarts",
    avatar: "/images/perfil/minerva-mcgonagall.webp",
    isProp: false,
  },
  dumbledore: {
    name: "Prof. Alvo Dumbledore",
    role: "Diretor de Hogwarts",
    avatar: "/images/perfil/alvo-dumbledore.webp",
    isProp: false,
  },
};

export default function NarratorBar({
  character = "dumbledore",
  speaking = false,
  caption = null,
  onReplay,
  onStop,
}) {
  const char = CHARACTERS[character] || CHARACTERS.dumbledore;

  return (
    <div className={`narrator-bar ${speaking ? "is-speaking" : ""}`}>
      <div className={`narrator-avatar ${char.isProp ? "is-prop" : ""}`}>
        <img src={char.avatar} alt={char.name} draggable={false} />
      </div>

      <div className="narrator-info">
        <div className="narrator-name-row">
          <strong>{char.name}</strong>
          {speaking && (
            <span className="voice-bars" aria-label="Falando">
              <i />
              <i />
              <i />
              <i />
            </span>
          )}
        </div>
        <small>{caption || char.role}</small>
      </div>

      <div className="narrator-actions">
        {speaking && onStop ? (
          <button type="button" className="btn-narrator" onClick={onStop} title="Parar leitura">
            <Square size={12} /> Parar
          </button>
        ) : (
          onReplay && (
            <button type="button" className="btn-narrator" onClick={onReplay} title="Ouvir narração">
              <Volume2 size={14} /> Ouvir
            </button>
          )
        )}
      </div>
    </div>
  );
}
