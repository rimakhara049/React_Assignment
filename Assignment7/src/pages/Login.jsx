import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated) {
      const origin = location.state?.from?.pathname || '/dashboard';
      navigate(origin, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const calculateStrength = (pwd) => {
    if (!pwd) return { score: 0, text: 'None', className: '' };
    let score = 0;
    if (pwd.length >= 6) score += 1;
    if (pwd.length >= 8) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score <= 1) return { score: 25, text: 'Weak', className: 'weak' };
    if (score <= 3) return { score: 65, text: 'Medium', className: 'medium' };
    return { score: 100, text: 'Strong', className: 'strong' };
  };

  const strength = calculateStrength(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!username.trim()) newErrors.username = 'Username is required';
    if (!password.trim()) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    login(username, rememberMe);
    const origin = location.state?.from?.pathname || '/dashboard';
    navigate(origin, { replace: true });
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-header">
          <h2>Sign In</h2>
          <p>Authentication System with JWT Token Simulation</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (errors.username) setErrors((prev) => ({ ...prev, username: '' }));
              }}
              className={errors.username ? 'input-error' : ''}
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
              }}
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {password && (
            <div className="strength-meter-box">
              <div className="strength-meta">
                <span>Password Strength:</span>
                <strong className={`strength-label ${strength.className}`}>{strength.text}</strong>
              </div>
              <div className="strength-bar-track">
                <div
                  className={`strength-bar-fill ${strength.className}`}
                  style={{ width: `${strength.score}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="remember-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember User (Save in LocalStorage)</span>
            </label>
          </div>

          <button type="submit" className="btn btn-primary submit-auth-btn">
            Login & Generate Token
          </button>
        </form>
      </div>
    </div>
  );
}