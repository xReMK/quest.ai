import React, { useRef, useEffect } from 'react';

// Electron animation constants
const ELECTRONS = 3;
const RADIUS = 16;
const SPEEDS = [1, 1.3, 1.7]; // Different speeds for each electron
const COLORS = ['#43e97b', '#43e97b', '#43e97b']; // Neon green for all

export function AtomAnimation({ width = 38, height = 38 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    let frame = 0;
    let animationId;

    function draw() {
      ctx.clearRect(0, 0, width, height);
      // Draw orbits
      for (let i = 0; i < ELECTRONS; i++) {
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(
          width / 2,
          height / 2,
          RADIUS + i * 5,
          RADIUS - i * 3,
          (i * Math.PI) / 3,
          0,
          2 * Math.PI
        );
        ctx.strokeStyle = 'rgba(167, 167, 167, 0.7)';
        ctx.lineWidth = 1.2;
        ctx.shadowColor = '#39ff14';
        ctx.shadowBlur = 4;
        ctx.stroke();
        ctx.restore();
      }
      // Draw electrons
      for (let i = 0; i < ELECTRONS; i++) {
        const angle = ((frame * SPEEDS[i]) / 40) % (2 * Math.PI);
        const x = width / 2 + (RADIUS + i * 5) * Math.cos(angle + (i * 2 * Math.PI) / 3);
        const y = height / 2 + (RADIUS - i * 3) * Math.sin(angle + (i * 2 * Math.PI) / 3);
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, 3.5, 0, 2 * Math.PI);
        ctx.fillStyle = COLORS[i];
        ctx.shadowColor = COLORS[i];
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }
      // Draw nucleus
      ctx.save();
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 5.5, 0, 2 * Math.PI);
      ctx.fillStyle = '#39ff14';
      ctx.shadowColor = '#39ff14';
      ctx.shadowBlur = 10;
      ctx.globalAlpha = 0.85;
      ctx.fill();
      ctx.restore();
      frame++;
      animationId = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animationId);
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        background: 'transparent',
        display: 'block',
        margin: '0 auto',
      }}
    />
  );
}
