import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

export default function Tasks() {
  const { tasks, deleteTask, toggleTaskStatus } = useTasks();
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');

  const filteredTasks = tasks.filter((task) => {
    const matchCat = filterCategory === 'All' || task.category === filterCategory;
    const matchPri = filterPriority === 'All' || task.priority === filterPriority;
    return matchCat && matchPri;
  });

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1>Task Registry</h1>
        <p>Comprehensive task management, filtering, and status controls</p>
      </div>

      <div className="filter-controls-card">
        <div className="control-group">
          <label>Category Filter</label>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Work">Work</option>
            <option value="Study">Study</option>
            <option value="Personal">Personal</option>
            <option value="Errand">Errand</option>
          </select>
        </div>

        <div className="control-group">
          <label>Priority Filter</label>
          <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="tasks-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Task Description</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.length === 0 ? (
              <tr>
                <td colSpan="6" className="table-empty">No tasks matching current filter criteria.</td>
              </tr>
            ) : (
              filteredTasks.map((t) => (
                <tr key={t.id} className={t.status === 'Completed' ? 'row-completed' : ''}>
                  <td>
                    <button
                      className={`status-chip ${t.status.replace(/\s+/g, '-').toLowerCase()}`}
                      onClick={() => toggleTaskStatus(t.id)}
                    >
                      {t.status}
                    </button>
                  </td>
                  <td>
                    <Link to={`/tasks/${t.id}`} className="table-link">
                      {t.description}
                    </Link>
                  </td>
                  <td><span className="category-pill">{t.category}</span></td>
                  <td><span className={`priority-tag ${t.priority.toLowerCase()}`}>{t.priority}</span></td>
                  <td>{t.dueDate}</td>
                  <td>
                    <div className="table-action-btns">
                      <Link to={`/tasks/${t.id}`} className="btn-table view">View</Link>
                      <button onClick={() => deleteTask(t.id)} className="btn-table delete">Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}