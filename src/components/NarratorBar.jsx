import { Volume2, Square } from "lucide-react";

const CHARACTERS = {
  hat: {
    name: "Chapéu Seletor",
    role: "Cerimônia de Seleção",
    avatar: "/images/props/sorting-hat.webp",
    isProp: true,
    tone: "neutral",
  },
  minerva: {
    name: "Profa. Minerva McGonagall",
    role: "Diretora da Grifinória",
    avatar: "/images/perfil/minerva-mcgonagall.webp",
    isProp: false,
    tone: "gryffindor",
  },
  snape: {
    name: "Prof. Severo Snape",
    role: "Diretor da Sonserina • Poções",
    avatar: "/images/perfil/severo-snape.webp",
    isProp: false,
    tone: "slytherin",
  },
  lockhart: {
    name: "Prof. Gilderoy Lockhart",
    role: "Banca da Corvinal • Autor Premiado",
    avatar: "/images/perfil/gilderoy-lockhart.webp",
    isProp: false,
    tone: "ravenclaw",
  },
  cedric: {
    name: "Cedrico Diggory",
    role: "Monitor & Campeão da Lufa-Lufa",
    avatar: "/images/perfil/cedrico-diggory.webp",
    isProp: false,
    tone: "hufflepuff",
  },
  dumbledore: {
    name: "Prof. Alvo Dumbledore",
    role: "Diretor de Hogwarts",
    avatar: "/images/perfil/alvo-dumbledore.webp",
    isProp: false,
    tone: "neutral",
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
    <div className={`narrator-bar narrator-tone-${char.tone} ${speaking ? "is-speaking" : ""}`}>
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
