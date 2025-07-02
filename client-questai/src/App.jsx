import { useState } from 'react'
import './App.css'
import { GameOfLifeWallpaper } from './GameOfLife/GameOfLifeWallpaper';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <GameOfLifeWallpaper />
      {/* Elegant header */}
      <header style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        background: 'rgba(24,26,27,0.92)', // matches dark bg, slightly transparent
        boxShadow: '0 2px 12px 0 rgba(0,0,0,0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.2rem 2.5rem',
        fontFamily: 'Segoe UI, Roboto, Arial, sans-serif',
      }}>
        <span style={{ fontWeight: 700, fontSize: '1.7rem', color: '#43e97b', letterSpacing: '0.04em' }}>
          MyProject
        </span>
        <nav style={{ display: 'flex', gap: '2.2rem' }}>
          <button style={{
            background: 'none',
            border: 'none',
            color: '#e0e0e0',
            fontSize: '1.1rem',
            fontWeight: 500,
            cursor: 'pointer',
            padding: '0.3rem 0.7rem',
            borderRadius: '6px',
            transition: 'background 0.2s, color 0.2s',
          }} onMouseOver={e => e.target.style.background='#23272b'} onMouseOut={e => e.target.style.background='none'}>Home</button>
          <button style={{
            background: 'none',
            border: 'none',
            color: '#e0e0e0',
            fontSize: '1.1rem',
            fontWeight: 500,
            cursor: 'pointer',
            padding: '0.3rem 0.7rem',
            borderRadius: '6px',
            transition: 'background 0.2s, color 0.2s',
          }} onMouseOver={e => e.target.style.background='#23272b'} onMouseOut={e => e.target.style.background='none'}>About</button>
          <button style={{
            background: 'none',
            border: 'none',
            color: '#e0e0e0',
            fontSize: '1.1rem',
            fontWeight: 500,
            cursor: 'pointer',
            padding: '0.3rem 0.7rem',
            borderRadius: '6px',
            transition: 'background 0.2s, color 0.2s',
          }} onMouseOver={e => e.target.style.background='#23272b'} onMouseOut={e => e.target.style.background='none'}>Contact</button>
        </nav>
      </header>
      <div style={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#e0e0e0', // light gray for contrast
        fontFamily: 'Segoe UI, Roboto, Arial, sans-serif',
        textShadow: '0 2px 8px rgba(67,233,123,0.10)',
      }}>
        {/* Place your landing page content here */}
        <h1 style={{ fontWeight: 700, fontSize: '3rem', color: '#43e97b', marginBottom: 8 }}>Welcome to My Project</h1>
        <p style={{ fontSize: '1.3rem', color: '#e0e0e0', maxWidth: 600, textAlign: 'center', marginBottom: 32 }}>
          This is a landing page with a live Game of Life wallpaper background.
        </p>
        {/* Add more components as needed */}
        <footer style={{
          marginTop: 'auto',
          padding: '1.5rem 0 0.5rem 0',
          width: '100%',
          textAlign: 'center',
          color: '#43e97b',
          background: '#000',
          fontSize: '1.1rem',
          letterSpacing: '0.05em',
          opacity: 0.95,
        }}>
          Made with <span style={{color:'#38f9d7', fontWeight:600}}>Conway's Game of Life</span> &mdash; <span style={{fontStyle:'italic'}}>Your Name</span>
        </footer>
      </div>
    </>
  )
}

export default App
