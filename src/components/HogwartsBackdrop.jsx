import { useEffect, useRef } from "react";
import { HOUSES, NEUTRAL_THEME } from "../data/houses";

const ALL_THEMES = [
  NEUTRAL_THEME,
  HOUSES.gryffindor,
  HOUSES.slytherin,
  HOUSES.ravenclaw,
  HOUSES.hufflepuff,
];

/**
 * Real Hogwarts HD photography backdrop with smooth crossfading,
 * house color atmosphere tint, and delicate ambient dust motes.
 */
export default function HogwartsBackdrop({ themeId = "neutral" }) {
  const canvasRef = useRef(null);
  const current = themeId === "neutral" || !HOUSES[themeId] ? NEUTRAL_THEME : HOUSES[themeId];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    // Subtle out-of-focus dust motes (gentle atmospheric depth, never distracting)
    const count = width < 700 ? 18 : 30;
    const motes = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 0.9 + Math.random() * 2.1,
      vx: (Math.random() - 0.5) * 0.16,
      vy: -0.08 - Math.random() * 0.22,
      phase: Math.random() * Math.PI * 2,
      speed: 0.006 + Math.random() * 0.012,
    }));

    const rgb = current.particleColor || "235, 200, 120";

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (const m of motes) {
        m.x += m.vx;
        m.y += m.vy;
        m.phase += m.speed;

        if (m.y < -12) {
          m.y = height + 12;
          m.x = Math.random() * width;
        }
        if (m.x < -12) m.x = width + 12;
        if (m.x > width + 12) m.x = -12;

        const alpha = 0.08 + ((Math.sin(m.phase) + 1) * 0.5) * 0.28;
        const grad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r * 3.2);
        grad.addColorStop(0, `rgba(${rgb}, ${alpha.toFixed(3)})`);
        grad.addColorStop(1, `rgba(${rgb}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r * 3.2, 0, Math.PI * 2);
        ctx.fill();
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, [current.particleColor]);

  return (
    <div className="hogwarts-backdrop" aria-hidden="true">
      {ALL_THEMES.map((t) => (
        <div
          key={t.id}
          className={`backdrop-photo ${t.id === current.id ? "is-active" : ""}`}
          style={{ backgroundImage: `url("${t.background}")` }}
        />
      ))}
      <div className="backdrop-tint" style={{ background: current.colors.tint }} />
      <div className="backdrop-vignette" />
      <canvas ref={canvasRef} className="backdrop-motes" />
    </div>
  );
}
