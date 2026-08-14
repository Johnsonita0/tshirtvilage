import React, { useState } from 'react';
import { signInAdmin } from '../lib/supabaseClient';
import '../css/pages/AdminLoginPage.css';

function AdminLoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setError('');

    if (!email.trim() || !password.trim()) {
      setStatus('error');
      setError('Please enter both email and password.');
      return;
    }

    try {
      const { data, error: signInError } = await signInAdmin(email, password);

      if (signInError) {
        setStatus('error');
        setError(signInError.message || 'Failed to sign in. Please check your credentials.');
        return;
      }

      if (data?.session && data?.user) {
        setStatus('success');
        localStorage.setItem('adminAuth', JSON.stringify({
          authenticated: true,
          user: data.user,
          session: data.session,
        }));
        onLoginSuccess(data.user);
      }
    } catch (err) {
      setStatus('error');
      setError(err.message || 'An error occurred during login.');
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <img src="/logo/logo-tshirtvilage.svg" alt="T-Shirts Village" className="login-logo" />
            <h1>Admin Portal</h1>
            <p>T-Shirts Village Management Dashboard</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@tshirtvilage.com"
                disabled={status === 'submitting'}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={status === 'submitting'}
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button
              type="submit"
              className="login-btn"
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="login-footer">
            <p className="demo-info">
              <strong>Demo Credentials:</strong><br />
              Contact administrator for access
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;
