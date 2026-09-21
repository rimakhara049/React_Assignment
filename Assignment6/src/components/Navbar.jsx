import { NavLink } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

export default function Navbar() {
  const { isAuthenticated, setIsAuthenticated } = useTasks();

  return (
    <nav className="tm-navbar">
      <div className="tm-brand">
        <NavLink to="/">
          Task<span>Pilot</span>
        </NavLink>
      </div>

      <ul className="tm-nav-links">
        <li>
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active-link' : '')}>
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

      <div className="tm-auth-block">
        <button
          className={`auth-toggle-pill ${isAuthenticated ? 'logged-in' : 'logged-out'}`}
          onClick={() => setIsAuthenticated(!isAuthenticated)}
        >
          {isAuthenticated ? '● Authenticated' : '○ Locked Out'}
        </button>
      </div>
    </nav>
  );
}