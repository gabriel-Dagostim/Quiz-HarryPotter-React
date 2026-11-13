import { useRef, useState } from "react";

export default function TiltCard({
  children,
  className = "",
  onClick,
  glowColor = "rgba(212, 175, 55, 0.35)",
  disabled = false,
  style = {},
}) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)");
  const [sheen, setSheen] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (disabled || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateY = ((x - midX) / midX) * 7.5;
    const rotateX = -((y - midY) / midY) * 7.5;

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.018, 1.018, 1.018)`);
    setSheen({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)");
    setSheen((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={disabled ? undefined : onClick}
      style={{
        transform,
        "--tilt-glow": glowColor,
        ...style,
      }}
    >
      <div
        className="tilt-sheen"
        style={{
          opacity: sheen.opacity,
          background: `radial-gradient(circle at ${sheen.x}% ${sheen.y}%, rgba(255, 240, 190, 0.16), transparent 60%)`,
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
