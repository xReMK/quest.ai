import { useState } from 'react'
import './App.css'
import { GameOfLifeWallpaper } from './GameOfLife/GameOfLifeWallpaper';
import { AtomAnimation } from './animations/AtomAnimation';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-root-fullscreen">
      <GameOfLifeWallpaper />
      {/* Elegant header */}
      <header className="app-header">
        <div className="app-header-left">
          <AtomAnimation width={70} height={50} />
          <span className="app-header-title">
            quest.ai
          </span>
        </div>
        <nav className="app-header-nav">
          <button className="app-header-btn">Home</button>
          <button className="app-header-btn">About</button>
          <button className="app-header-btn">Contact</button>
        </nav>
      </header>
      <div className="app-main-content">
        {/* Place your landing page content here */}
        <h1 className="app-main-title">Introducing you to Atomai</h1>
        <p className="app-main-desc">
          Your knowledge curator
        </p>
        {/* Add more components as needed */}
        <footer className="app-footer">
          Made with <span className="app-footer-highlight">Conway's Game of Life</span> &mdash; <span className="app-footer-signature">Your Name</span>
        </footer>
      </div>
    </div>
  )
}

export default App
