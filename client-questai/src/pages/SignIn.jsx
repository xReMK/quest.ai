import { AtomAnimation } from '../animations/AtomAnimation';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import authorImg from '../assets/Author.jpg';
import { GameOfLifeWallpaper } from '../GameOfLife/GameOfLifeWallpaper';

export default function SignIn() {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Username: ${form.username}\nPassword: ${form.password}`);
  };

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
      <div className="auth-form-container">
        <h2 className="auth-title">Sign In</h2>
        <form className="auth-form" onSubmit={handleSubmit} autoComplete="off">
          <label className="auth-label">
            Username
            <input
              type="text"
              name="username"
              className="auth-input"
              value={form.username}
              onChange={handleChange}
              required
              autoFocus
            />
          </label>
          <label className="auth-label">
            Password
            <input
              type="password"
              name="password"
              className="auth-input"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit" className="auth-btn">Sign In</button>
        </form>
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