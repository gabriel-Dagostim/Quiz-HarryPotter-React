/**
 * Authentic Hogwarts gilded corner frame & wizarding ornamental divider.
 */
export function WizFrame({ children, className = "", variant = "obsidian", style }) {
  return (
    <div className={`wiz-frame wiz-frame-${variant} ${className}`} style={style}>
      <span className="wf-corner wf-tl" aria-hidden="true" />
      <span className="wf-corner wf-tr" aria-hidden="true" />
      <span className="wf-corner wf-bl" aria-hidden="true" />
      <span className="wf-corner wf-br" aria-hidden="true" />
      {children}
    </div>
  );
}

export function HallowsDivider({ label = null }) {
  return (
    <div className="hallows-divider" aria-hidden="true">
      <span className="hd-line" />
      {label ? (
        <span className="hd-label">{label}</span>
      ) : (
        <svg className="hd-icon" viewBox="0 0 28 24" width="22" height="19">
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
      <span className="hd-line" />
    </div>
  );
}
