import { GameOfLifeWallpaper } from '../GameOfLife/GameOfLifeWallpaper';
import { AtomAnimation } from '../animations/AtomAnimation';
import authorImg from '../assets/Author.jpg';
import { Link, useLocation } from 'react-router-dom';

export default function PageLayout({ children }) {
  const location = useLocation();
  return (
    <div className="app-root-fullscreen">
      <GameOfLifeWallpaper />
      <header className="app-header">
        <div className="app-header-left">
          <AtomAnimation width={70} height={50} />
          <span className="app-header-title">quest.ai</span>
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
      <main className="app-main-content">
        {children}
      </main>
      <footer className="app-footer">
        <span className="app-footer-madeby">Made by</span>
        <a href={authorImg} target="_blank" rel="noopener noreferrer">
          <img src={authorImg} alt="Author" className="app-footer-author-img" />
        </a>
        <span className="app-footer-signature">
          <i> m e mk</i>
        </span>
      </footer>
    </div>
  );
}