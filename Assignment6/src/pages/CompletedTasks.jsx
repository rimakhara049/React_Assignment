import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

export default function CompletedTasks() {
  const { tasks, toggleTaskStatus } = useTasks();
  const completed = tasks.filter((t) => t.status === 'Completed');

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1>Completed Task Archive</h1>
        <p>Audited records of completed assignments and operations</p>
      </div>

      {completed.length === 0 ? (
        <div className="locked-view-card">
          <p>No completed tasks found in records.</p>
        </div>
      ) : (
        <div className="task-summary-list">
          {completed.map((task) => (
            <div key={task.id} className="task-summary-row completed-item">
              <div className="summary-left">
                <span className="badge-done">✓ Finished</span>
                <Link to={`/tasks/${task.id}`} className="summary-title done">
                  {task.description}
                </Link>
              </div>
              <div className="summary-right">
                <button
                  className="btn-reopen"
                  onClick={() => toggleTaskStatus(task.id)}
                >
                  Mark Incomplete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}