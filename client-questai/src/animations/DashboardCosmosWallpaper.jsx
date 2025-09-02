import React, { useRef, useEffect } from "react";

const STAR_COUNT = 300;
const STAR_COLOR = "#fff";
const BG_COLOR = "#18191c";
const ARC_RADIUS = 3.2; // normalized to min(width, height)/2

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function createStars(count) {
  // theta: angle, r: radius (0.5 to 1 for even spread), blinkSpeed: how fast it blinks
  return Array.from({ length: count }).map(() => ({
    theta: randomBetween(Math.PI, 2 * Math.PI), // start from bottom left to top right
    r: randomBetween(0, ARC_RADIUS),
    size: randomBetween(0.5, 1.8),
    blinkSpeed: randomBetween(0.5, 1.2),
    blinkPhase: Math.random() * Math.PI * 2,
    speed: randomBetween(0.0005, 0.0006), // each star can have a slightly different speed
  }));
}

export default function DashboardCosmosWallpaper() {
  const canvasRef = useRef();
  const starsRef = useRef(createStars(STAR_COUNT));
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width;
      const cy = canvas.height;
      const minDim = Math.min(cx, cy);

      for (const star of starsRef.current) {
        // Move each star forward along the arc
        star.theta += star.speed;

        // If the star has gone past the top right, reset to bottom left with new random radius and blink
        if (star.theta > 2 * Math.PI) {
          star.theta -= Math.PI; // wrap to bottom left
          star.r = randomBetween(0.5, ARC_RADIUS);
          star.size = randomBetween(1, 1.6);
          star.blinkSpeed = randomBetween(1, 2.5);
          star.blinkPhase = Math.random() * Math.PI * 2;
        }

        const angle = star.theta;
        const radius = minDim * star.r;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;

        // Blinking effect
        const blink =
          0.7 +
          0.3 *
            Math.abs(
              Math.sin(performance.now() * 0.001 * star.blinkSpeed + star.blinkPhase)
            );

        ctx.globalAlpha = blink;
        ctx.beginPath();
        ctx.arc(x, y, star.size, 0, 2 * Math.PI);
        ctx.fillStyle = STAR_COLOR;
        ctx.shadowColor = STAR_COLOR;
        ctx.shadowBlur = 8 * blink;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;

      animationRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        background: BG_COLOR,
        pointerEvents: "none",
      }}
    />
  );
}