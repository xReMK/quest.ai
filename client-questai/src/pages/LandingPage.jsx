import React from 'react';
import { Link } from 'react-router-dom';
import { AtomAnimation } from '../animations/AtomAnimation';
import authorImg from '../assets/Author.jpg';
import { GameOfLifeWallpaper } from '../GameOfLife/GameOfLifeWallpaper';

export default function LandingPage() {
  return (
    <>
          {/* <GameOfLifeWallpaper /> */}
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
        <div className="app-main-content">
        <h1 className="app-main-title">Introducing you to Atomai</h1>
        <p className="app-main-desc">Your knowledge curator</p>
        <button className="know-how-btn">Know How</button>
        </div>
        <footer className="app-footer">
          <span className="app-footer-madeby">Engineered by</span>
          <a href={authorImg} target="_blank" rel="noopener noreferrer">
            <img src={authorImg} alt="Author" className="app-footer-author-img" />
          </a>
          <span className="app-footer-signature">
            <i> m e mk</i>
          </span>
        </footer>
    </>
  );
}