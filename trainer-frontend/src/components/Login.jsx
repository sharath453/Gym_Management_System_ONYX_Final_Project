import React, { useState } from 'react';
import { authAPI } from '../services/api';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const motivationQuotes = [
    {
      text: "The only bad workout is the one that didn't happen",
            author: "Rajanna"

      
    },
    {
      text: "Strength doesn't come from what you can do. It comes from overcoming the things you once thought you couldn't",
      author: "Rikki Rogers"
    },
    {
      text: "Your body can stand almost anything. It's your mind that you have to convince",
      author: "Suprith"
    },
    {
      text: "The hardest lift of all is lifting your butt off the couch",
      author: "Sharath"
    }
  ];

  const randomQuote = motivationQuotes[Math.floor(Math.random() * motivationQuotes.length)];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(credentials);
      console.log('Login response:', response.data);
      
      if (response.data.access) {
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
        setTimeout(() => onLogin(), 1000);
      } else {
        throw new Error('No access token received');
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.detail || 
                          error.response?.data?.message || 
                          error.message || 
                          'Invalid credentials. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="hero-section">
      <div className="animated-bg"></div>
      <div className="hero-content">
        {/* Motivation Quote */}
        <div className="motivation-quote pulse">
          <h3>Welcome to FitVerse</h3>
          <p>"{randomQuote.text}"</p>
          <small>— {randomQuote.author}</small>
        </div>

        {/* Login Form */}
        <div className="login-form">
          <h2>Trainer Portal</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>👤 Username</label>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label>🔒 Password</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                disabled={loading}
              />
            </div>
            {error && (
              <div className="error" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                marginBottom: '1rem'
              }}>
                ⚠️ {error}
              </div>
            )}
            <button 
              type="submit" 
              className="btn btn-primary btn-lg"
              disabled={loading}
              style={{ width: '100%' }}
            >
              {loading ? '🔄 Logging in...' : '🚀 Login to Dashboard'}
            </button>
          </form>

          {/* Development tip */}
          <div style={{ 
            marginTop: '1.5rem', 
            padding: '1rem', 
            background: 'rgba(255,159,28,0.1)', 
            borderRadius: 'var(--border-radius)',
            border: '1px solid rgba(255,159,28,0.2)',
            fontSize: '0.8rem',
            textAlign: 'center'
          }}>
            <strong>💡 Trainer Tip:</strong> Use your registered username and password to access the dashboard.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;