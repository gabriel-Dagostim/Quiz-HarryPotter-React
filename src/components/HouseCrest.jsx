import { Lock } from "lucide-react";
import { HOUSES, NEUTRAL_THEME } from "../data/houses";

export function HouseCrest({ houseId = "neutral", size = 64, locked = false, className = "" }) {
  const obj = houseId === "neutral" || !HOUSES[houseId] ? NEUTRAL_THEME : HOUSES[houseId];

  return (
    <span
      className={`crest-img-wrap ${locked ? "is-locked" : ""} ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={obj.crest}
        alt={`Brasão ${obj.name}`}
        width={size}
        height={size}
        loading="lazy"
        draggable={false}
        className="crest-img"
      />
      {locked && (
        <span className="crest-lock-badge" aria-hidden="true">
          <Lock size={Math.max(10, Math.round(size * 0.28))} />
        </span>
      )}
    </span>
  );
}
