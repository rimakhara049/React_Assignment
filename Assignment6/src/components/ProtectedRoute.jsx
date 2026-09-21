import { useTasks } from '../context/TaskContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, setIsAuthenticated } = useTasks();

  if (!isAuthenticated) {
    return (
      <div className="locked-view-card">
        <h2>Access Restricted</h2>
        <p>This route requires active authorization credentials.</p>
        <button className="btn btn-primary" onClick={() => setIsAuthenticated(true)}>
          Authenticate As Admin
        </button>
      </div>
    );
  }

  return children;
}