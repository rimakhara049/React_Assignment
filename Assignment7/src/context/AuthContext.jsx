import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

// Simulated Base64 JWT Token Generator
function generateMockJWT(username) {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(
    JSON.stringify({
      sub: username,
      role: 'administrator',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600
    })
  );
  const signature = btoa('react_jwt_signature_secret_key');
  return `${header}.${payload}.${signature}`;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedToken = localStorage.getItem('jwt_token') || sessionStorage.getItem('jwt_token');
    const savedUser = localStorage.getItem('auth_user') || sessionStorage.getItem('auth_user');
    return savedToken && savedUser ? { username: savedUser, token: savedToken } : null;
  });

  const login = (username, rememberMe) => {
    const token = generateMockJWT(username);
    const user = { username, token };

    if (rememberMe) {
      localStorage.setItem('jwt_token', token);
      localStorage.setItem('auth_user', username);
    } else {
      sessionStorage.setItem('jwt_token', token);
      sessionStorage.setItem('auth_user', username);
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('auth_user');
    }

    setCurrentUser(user);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('auth_user');
    sessionStorage.removeItem('jwt_token');
    sessionStorage.removeItem('auth_user');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated: !!currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}