import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, updateTask, deleteTask } = useTasks();

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return (
      <div className="page-wrapper narrow">
        <div className="locked-view-card">
          <h2>Task Not Found</h2>
          <p>No record matches identifier #{id}.</p>
          <Link to="/tasks" className="btn btn-primary">Return to Tasks</Link>
        </div>
      </div>
    );
  }

  const handleStatusChange = (newStatus) => {
    updateTask(task.id, { status: newStatus });
  };

  return (
    <div className="page-wrapper narrow">
      <div className="details-header">
        <button className="btn-back" onClick={() => navigate('/tasks')}>
          ← Back to Tasks
        </button>
        <span className="task-id-tag">ID: {task.id}</span>
      </div>

      <div className="details-card">
        <div className="details-top">
          <span className={`priority-tag ${task.priority.toLowerCase()}`}>{task.priority} Priority</span>
          <span className="category-pill">{task.category}</span>
        </div>

        <h1 className="details-title">{task.description}</h1>

        <div className="details-grid">
          <div className="details-cell">
            <label>Due Date</label>
            <strong>{task.dueDate}</strong>
          </div>
          <div className="details-cell">
            <label>Status</label>
            <select
              value={task.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="status-selector"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="details-actions">
          <button
            className="btn btn-danger"
            onClick={() => {
              if (window.confirm('Delete this task permanently?')) {
                deleteTask(task.id);
                navigate('/tasks');
              }
            }}
          >
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
}