import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="tm-navbar">
      <div className="tm-brand">
        <Link to="/dashboard">
          Task<span>Vault</span> <span className="secure-badge">JWT Secured</span>
        </Link>
      </div>

      {isAuthenticated ? (
        <>
          <ul className="tm-nav-links">
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/tasks" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                All Tasks
              </NavLink>
            </li>
            <li>
              <NavLink to="/add-task" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                + Add Task
              </NavLink>
            </li>
            <li>
              <NavLink to="/completed" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                Completed
              </NavLink>
            </li>
          </ul>

          <div className="tm-user-cluster">
            <span className="user-greeting">User: <strong>{currentUser?.username}</strong></span>
            <button onClick={handleLogout} className="btn-logout">Log Out</button>
          </div>
        </>
      ) : (
        <div className="tm-auth-block">
          <Link to="/login" className="btn btn-primary">Sign In</Link>
        </div>
      )}
    </nav>
  );
}