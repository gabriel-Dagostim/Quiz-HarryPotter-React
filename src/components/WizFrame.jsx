/**
 * Authentic Hogwarts sculpted brass-filigree frame & wizarding ornamental divider.
 */
function CornerFiligree({ className }) {
  return (
    <svg
      className={`wf-corner ${className}`}
      viewBox="0 0 36 36"
      width="32"
      height="32"
      fill="none"
      aria-hidden="true"
    >
      {/* Outer beveled bracket */}
      <path
        d="M2 34V6C2 3.8 3.8 2 6 2H34"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      {/* Inner etched secondary line */}
      <path
        d="M7 28V10.5C7 8.5 8.5 7 10.5 7H28"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.65"
        strokeLinecap="round"
      />
      {/* Filigree scroll curl */}
      <path
        d="M11 21C11 15.5 15.5 11 21 11"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeOpacity="0.78"
        strokeLinecap="round"
      />
      {/* Corner brass diamond rivet */}
      <polygon points="7,7 10.5,4.5 13,7 10.5,9.5" fill="currentColor" fillOpacity="0.92" />
      <circle cx="19.5" cy="19.5" r="1.4" fill="currentColor" fillOpacity="0.65" />
    </svg>
  );
}

export function WizFrame({ children, className = "", variant = "obsidian", style }) {
  return (
    <div className={`wiz-frame wiz-frame-${variant} ${className}`} style={style}>
      <CornerFiligree className="wf-tl" />
      <CornerFiligree className="wf-tr" />
      <CornerFiligree className="wf-bl" />
      <CornerFiligree className="wf-br" />
      {/* Subtle top-center gilded crest diamond */}
      <span className="wf-crown" aria-hidden="true">
        <svg viewBox="0 0 64 12" width="64" height="12" fill="none">
          <path d="M2 6H24M40 6H62" stroke="currentColor" strokeWidth="1" strokeOpacity="0.55" />
          <polygon points="32,1 38,6 32,11 26,6" fill="currentColor" fillOpacity="0.9" />
          <circle cx="20" cy="6" r="1.4" fill="currentColor" fillOpacity="0.75" />
          <circle cx="44" cy="6" r="1.4" fill="currentColor" fillOpacity="0.75" />
        </svg>
      </span>
      {children}
    </div>
  );
}

export function HallowsDivider({ label = null }) {
  return (
    <div className="hallows-divider" aria-hidden="true">
      <span className="hd-line" />
      <span className="hd-gem" />
      {label ? (
        <span className="hd-label">{label}</span>
      ) : (
        <svg className="hd-icon" viewBox="0 0 28 24" width="24" height="20">
          <polygon
            points="14,2 26,22 2,22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <circle cx="14" cy="15.2" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <line x1="14" y1="2" x2="14" y2="22" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      )}
      <span className="hd-gem" />
      <span className="hd-line" />
    </div>
  );
}
