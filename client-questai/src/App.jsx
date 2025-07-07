import { useState } from 'react'
import './App.css'
import { GameOfLifeWallpaper } from './GameOfLife/GameOfLifeWallpaper';
import { AtomAnimation } from './animations/AtomAnimation';
import authorImg from './assets/Author.jpg';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';


function App() {
  return (
    <div className="app-root-fullscreen">
      <GameOfLifeWallpaper />
      <Router>
        <header className="app-header">
          <div className="app-header-left">
            <AtomAnimation width={70} height={50} />
              <Link to="/">
                 <span className="app-header-title">quest.ai</span>
            </Link>
          </div>
          <nav className="app-header-nav">
            <Link to="/signin">
              <button className="app-header-btn">Sign In</button>
            </Link>
            <Link to="/signup">
              <button className="app-header-btn">Sign Up</button>
            </Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <footer className="app-footer">
          <span className="app-footer-madeby">Engineered by</span>
          <a href={authorImg} target="_blank" rel="noopener noreferrer">
            <img src={authorImg} alt="Author" className="app-footer-author-img" />
          </a>
          <span className="app-footer-signature">
            <i> m e mk</i>
          </span>
        </footer>
      </Router>
    </div>
  )
}

export default App
