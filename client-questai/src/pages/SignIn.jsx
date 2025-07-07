import React, { useState } from 'react';

export default function SignIn() {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add authentication logic here
    alert(`Username: ${form.username}\nPassword: ${form.password}`);
  };

  return (
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
  );
}