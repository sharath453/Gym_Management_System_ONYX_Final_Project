import React, { useState } from 'react';
import { authAPI, testAPI } from '../services/api';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');

  const testConnection = async () => {
    try {
      const response = await testAPI.testConnection();
      setDebugInfo(`API Connection: SUCCESS - ${response.status}`);
      console.log('API Test Response:', response.data);
    } catch (error) {
      setDebugInfo(`API Connection: FAILED - ${error.message}`);
      console.error('API Test Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setDebugInfo('');

    // Test credentials format
    console.log('Login attempt with:', credentials);

    try {
      const response = await authAPI.login(credentials);
      console.log('Login response:', response.data);
      
      if (response.data.access) {
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
        setDebugInfo('Login successful!');
        onLogin();
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
      setDebugInfo(`Error: ${error.response?.status} - ${JSON.stringify(error.response?.data)}`);
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
    <div className="login-container">
      <div className="login-form">
        <h2>Trainer Login</h2>
        
        {/* Debug section */}
        <div style={{ marginBottom: '1rem', padding: '0.5rem', background: '#f8f9fa', borderRadius: '5px' }}>
          <button 
            type="button" 
            onClick={testConnection}
            style={{ marginBottom: '0.5rem', padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
          >
            Test API Connection
          </button>
          {debugInfo && (
            <div style={{ fontSize: '0.8rem', color: '#666' }}>
              Debug: {debugInfo}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Sample credentials hint for development */}
        <div style={{ marginTop: '1rem', padding: '0.5rem', background: '#e7f3ff', borderRadius: '5px', fontSize: '0.8rem' }}>
          <strong>Development Tip:</strong> Make sure you have trainers in your database with correct credentials.
        </div>
      </div>
    </div>
  );
};

export default Login;