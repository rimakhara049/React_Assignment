import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const { tasks } = useTasks();

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'Completed').length;
  const inProgress = tasks.filter((t) => t.status === 'In Progress').length;
  const highPriority = tasks.filter((t) => t.priority === 'High' && t.status !== 'Completed').length;

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1>Protected Dashboard</h1>
        <p>Current Session: <strong>{currentUser?.username}</strong></p>
      </div>

      <div className="jwt-viewer-card">
        <div className="jwt-header">
          <span>🔒 Active JWT Bearer Token</span>
        </div>
        <code className="jwt-token-display">{currentUser?.token}</code>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <span className="metric-label">Total Assigned</span>
          <span className="metric-value">{total}</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">In Progress</span>
          <span className="metric-value text-blue">{inProgress}</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Completed</span>
          <span className="metric-value text-green">{completed}</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">High Priority Alert</span>
          <span className="metric-value text-red">{highPriority}</span>
        </div>
      </div>

      <div className="section-head-row">
        <h2>Active Task Queue</h2>
        <Link to="/tasks" className="btn btn-secondary">View All Tasks →</Link>
      </div>

      <div className="task-summary-list">
        {tasks.slice(0, 3).map((task) => (
          <div key={task.id} className="task-summary-row">
            <div className="summary-left">
              <span className={`priority-tag ${task.priority.toLowerCase()}`}>{task.priority}</span>
              <Link to={`/tasks/${task.id}`} className="summary-title">{task.description}</Link>
            </div>
            <div className="summary-right">
              <span className="category-pill">{task.category}</span>
              <span className="due-text">Due: {task.dueDate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}