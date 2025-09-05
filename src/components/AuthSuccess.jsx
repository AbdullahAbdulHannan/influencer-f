import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AuthSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      // Store the token
      localStorage.setItem('token', token);
      
      // Redirect to dashboard or main app
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } else {
      // No token, redirect to login
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#000000',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: '#1a1a1a',
        padding: '40px',
        borderRadius: '16px',
        textAlign: 'center',
        border: '1px solid #2a2a2a'
      }}>
        <h1 style={{ color: '#FF6B35', marginBottom: '20px' }}>Welcome to Whop!</h1>
        <p style={{ marginBottom: '20px' }}>Authentication successful!</p>
        <p style={{ color: '#888888' }}>Redirecting you to the dashboard...</p>
      </div>
    </div>
  );
};

export default AuthSuccess;

