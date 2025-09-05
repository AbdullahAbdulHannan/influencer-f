import { useNavigate } from 'react-router-dom';

const AuthError = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate('/');
  };

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
        border: '1px solid #2a2a2a',
        maxWidth: '400px'
      }}>
        <h1 style={{ color: '#ff4444', marginBottom: '20px' }}>Authentication Failed</h1>
        <p style={{ marginBottom: '20px' }}>
          There was an error during the authentication process. This could be due to:
        </p>
        <ul style={{ textAlign: 'left', marginBottom: '30px', color: '#888888' }}>
          <li>User cancelled the authentication</li>
          <li>Network connection issues</li>
          <li>Invalid OAuth configuration</li>
        </ul>
        <button
          onClick={handleRetry}
          style={{
            background: '#3B82F6',
            color: '#ffffff',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.background = '#2563EB'}
          onMouseOut={(e) => e.target.style.background = '#3B82F6'}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default AuthError;

