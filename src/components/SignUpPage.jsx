import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import './SignInPage.css';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const res = await apiService.signUp(email, password, firstName, lastName);
      localStorage.setItem('token', res.token);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Failed to sign up');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <div className="background-pattern"></div>
      <div className="signin-card">
        <div className="signin-header">
          <div className="logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 2L20 8H28L24 14L28 20H20L16 26L12 20H4L8 14L4 8H12L16 2Z" fill="#FF6B35"/>
            </svg>
          </div>
          <h1 className="signin-title">Create account</h1>
        </div>

        <form onSubmit={handleSubmit} className="email-form">
          <div className="form-group">
            <label htmlFor="firstName" className="form-label">First name</label>
            <input
              id="firstName"
              className="email-input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName" className="form-label">Last name</label>
            <input
              id="lastName"
              className="email-input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Appleseed"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="email-input"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="email-input"
              placeholder="Create a password (min 6 chars)"
              required
              minLength={6}
            />
          </div>

          {error && (
            <p style={{ color: '#f87171', marginBottom: 12 }}>{error}</p>
          )}

          <button type="submit" className="continue-btn" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create account'}
          </button>
        </form>

        <p className="terms-text" style={{ marginTop: 12 }}>
          Already have an account? <Link className="terms-link" to="/signin">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
