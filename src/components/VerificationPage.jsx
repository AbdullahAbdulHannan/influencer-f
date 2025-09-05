import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import apiService from '../services/api';
import './VerificationPage.css';

const VerificationPage = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const navigate = useNavigate();
  const location = useLocation();
  const inputRefs = useRef([]);

  const email = location.state?.email || 'be*****214@marchub.com';

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

    // Start resend timer
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if all fields are filled
    if (newCode.every(digit => digit !== '') && !newCode.includes('')) {
      handleSubmit(newCode.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newCode = [...code];
    
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newCode[i] = pastedData[i];
    }
    
    setCode(newCode);
    
    // Focus the next empty input or the last one
    const nextEmptyIndex = newCode.findIndex(digit => digit === '');
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = async (verificationCode) => {
    setIsLoading(true);
    
    try {
      const response = await apiService.verifyEmail(email, verificationCode);
      
      // Store token and user data
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // Redirect to dashboard or main app
      alert('Verification successful! Welcome to Whop!');
      // You can redirect to a dashboard page here
      // navigate('/dashboard');
    } catch (error) {
      alert(`Verification failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;
    
    try {
      await apiService.resendVerification(email);
      
      setCanResend(false);
      setResendTimer(30);
      setCode(['', '', '', '', '', '']);
      
      // Start new timer
      const timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Focus first input
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);

      alert('Verification code sent successfully!');
    } catch (error) {
      alert(`Failed to resend code: ${error.message}`);
    }
  };

  const handleBackToLogin = () => {
    navigate('/');
  };

  return (
    <div className="verification-container">
      <div className="background-pattern"></div>
      
      <div className="verification-card">
        {/* Header */}
        <div className="verification-header">
          <h1 className="verification-title">
            Verify it's you by entering the code we sent to {email}
          </h1>
          
          <button 
            className="resend-link"
            onClick={handleResendCode}
            disabled={!canResend}
          >
            {canResend ? 'Resend code' : `Resend code in ${resendTimer}s`}
          </button>
        </div>

        {/* Code Input Fields */}
        <div className="code-input-container">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength="1"
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="code-input"
              disabled={isLoading}
            />
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <span>Verifying...</span>
          </div>
        )}

        {/* Back Button */}
        <button 
          className="back-btn"
          onClick={handleBackToLogin}
          disabled={isLoading}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          Back to login
        </button>
      </div>
    </div>
  );
};

export default VerificationPage;

