import React, { useRef, useEffect } from "react";
import "../styles/Sidebar.css";

export default function SidebarAtomAnimation() {
  const canvasRef = useRef(null);

  // Animation constants
  const DOTS = 8;
  const RADIUS = 22; // px, fits "at"
  const DOT_RADIUS = 3.5;
  const CENTER_X = 25; // Move circle right, away from text
  const CENTER_Y = 34;
  const ANIMATION_SPEED = 0.012; // radians per frame

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let frame = 0;
    let animationId;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw dots in a circle
      for (let i = 0; i < DOTS; i++) {
        const angle = (2 * Math.PI * i) / DOTS + frame * ANIMATION_SPEED;
        // Calculate dot position
        const x = CENTER_X + RADIUS * Math.cos(angle);
        const y = CENTER_Y + RADIUS * Math.sin(angle);

        // No need to hide behind "o" anymore
        ctx.beginPath();
        ctx.arc(x, y, DOT_RADIUS, 0, 2 * Math.PI);
        ctx.fillStyle = "#38f9d7";
        ctx.shadowColor = "#38f9d7";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationId = requestAnimationFrame(() => {
        frame++;
        draw();
      });
    }

    draw();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="sidebar-title-animated">
      <canvas
        ref={canvasRef}
        width={64}
        height={64}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          pointerEvents: "none",
        }}
      />
      <span className="sidebar-title-text" style={{ marginLeft: 56 }}>
        <span style={{ fontWeight: 700, letterSpacing: "0.04em" }}>
          atom.AI
        </span>
      </span>
    </div>
  );
}