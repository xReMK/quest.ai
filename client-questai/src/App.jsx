import { useState } from 'react'
import './App.css'
import { GameOfLifeWallpaper } from './GameOfLife/GameOfLifeWallpaper';
import { AtomAnimation } from './animations/AtomAnimation';
import authorImg from './assets/Author.jpg';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

function WallpaperWrapper({ children }) {
  const location = useLocation();
  // Show wallpaper only for these routes
  const showWallpaper = ["/", "/home", "/signin", "/signup"].includes(location.pathname);
  return (
    <div className="app-root-fullscreen">
      {showWallpaper && <GameOfLifeWallpaper />}
      {children}
    </div>
  );
}

function App() {
  return (
    <Dashboard />
  );
}

export default App
