import React, { useState } from 'react';
import '../styles/App.css';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = '794056152748-5jl64o6vth79cijk6gucq8ea9t8st50s.apps.googleusercontent.com';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store the token in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user)); // is_admin included if present

      // Redirect to QnA page
      navigate('/qna');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <div style={{ margin: '16px 0', textAlign: 'center' }}>
          <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <GoogleLogin
              onSuccess={credentialResponse => {
                fetch('http://localhost:5001/api/auth/google', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ token: credentialResponse.credential })
                })
                  .then(res => res.json())
                  .then(data => {
                    if (data.token) {
                      localStorage.setItem('token', data.token);
                      localStorage.setItem('user', JSON.stringify(data.user));
                      navigate('/qna');
                    } else {
                      setError(data.error || 'Google login failed');
                    }
                  });
              }}
              onError={() => {
                setError('Google Sign In Failed');
              }}
            />
          </GoogleOAuthProvider>
        </div>
        <div className="create">
          <Link to="/register"><h5>Register</h5></Link>
          <Link to="/qna"><h5>Open page</h5></Link>
        </div>
      </div>
    </div>
  );
};

export default Login; 