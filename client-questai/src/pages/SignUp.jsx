import { AtomAnimation } from '../animations/AtomAnimation';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import authorImg from '../assets/Author.jpg';
import { GameOfLifeWallpaper } from '../GameOfLife/GameOfLifeWallpaper';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Sign up successful!');
        navigate('/dashboard');
      } else {
        alert(data.message || 'Sign up failed');
      }
    } catch (err) {
      alert('Network error');
    }
    setLoading(false);
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
        <h2 className="auth-title">Sign Up</h2>
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
            Email
            <input
              type="email"
              name="email"
              className="auth-input"
              value={form.email}
              onChange={handleChange}
              required
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
          <button type="submit" className="auth-btn">Sign Up</button>
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