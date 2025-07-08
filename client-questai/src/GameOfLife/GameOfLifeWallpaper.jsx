import React, { useRef, useEffect } from 'react';

// Utility to create a random grid
function createRandomGrid(rows, cols) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => (Math.random() > 0.7 ? 1 : 0))
  );
}

// Game of Life logic
function getNextGrid(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const next = grid.map(arr => [...arr]);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let neighbors = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
            neighbors += grid[nr][nc];
          }
        }
      }
      if (grid[r][c]) {
        next[r][c] = neighbors === 2 || neighbors === 3 ? 1 : 0;
      } else {
        next[r][c] = neighbors === 3 ? 1 : 0;
      }
    }
  }
  return next;
}

export function GameOfLifeWallpaper({ rows = 80, cols = 120, cellSize = 10, blur = 8 }) {
  const canvasRef = useRef(null);
  const gridRef = useRef(createRandomGrid(rows, cols));

  useEffect(() => {
    let animationId;
    const ctx = canvasRef.current.getContext('2d');
    // Elegant dark background
    canvasRef.current.style.background = 'rgba(0, 0, 0, 0.7)'; // near-black/grey
    canvasRef.current.style.backgroundRepeat = 'repeat';
    canvasRef.current.style.backgroundSize = `${cellSize * 2.5}px auto`;
    const draw = () => {
      ctx.clearRect(0, 0, cols * cellSize, rows * cellSize);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (gridRef.current[r][c]) {
            // Elegant green gradient for live cells
            const grad = ctx.createLinearGradient(0, r * cellSize, 0, (r + 1) * cellSize);
            grad.addColorStop(0, '#fff'); // light green
            grad.addColorStop(1, '#fff'); // teal-green
            ctx.fillStyle = grad;
            ctx.beginPath();
            // Draw hexagon shape for each cell
            const x = c * cellSize + cellSize / 2;
            const y = r * cellSize + cellSize / 2;
            const s = cellSize / 2;
            ctx.moveTo(x + s * Math.cos(0), y + s * Math.sin(0));
            for (let side = 1; side <= 6; side++) {
              ctx.lineTo(x + s * Math.cos((side * 2 * Math.PI) / 6), y + s * Math.sin((side * 2 * Math.PI) / 6));
            }
            ctx.closePath();
            ctx.fill();
          }
        }
      }
    };
    const step = () => {
      gridRef.current = getNextGrid(gridRef.current);
      draw();
      animationId = requestAnimationFrame(step);
    };
    step();
    return () => cancelAnimationFrame(animationId);
  }, [rows, cols, cellSize]);

  return (
    <canvas
      ref={canvasRef}
      width={cols * cellSize}
      height={rows * cellSize}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        filter: `blur(${blur}px) brightness(1)`,
        pointerEvents: 'none',
        objectFit: 'cover',
        background: '#181a1b',
      }}
    />
  );
}
