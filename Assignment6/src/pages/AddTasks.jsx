import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

export default function AddTask() {
  const { addTask } = useTasks();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    description: '',
    priority: 'Medium',
    category: 'Work',
    dueDate: '2026-08-28', // As requested in assignment spec
    status: 'Pending'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description.trim()) {
      alert('Please enter a task description.');
      return;
    }
    addTask(formData);
    navigate('/tasks');
  };

  return (
    <div className="page-wrapper narrow">
      <div className="page-header">
        <h1>Create New Task</h1>
        <p>Schedule a new work order, study objective, or personal errand</p>
      </div>

      <form onSubmit={handleSubmit} className="form-card">
        <div className="field-block">
          <label>Task Description *</label>
          <textarea
            rows="3"
            placeholder="What needs to be accomplished?"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          ></textarea>
        </div>

        <div className="form-grid-2">
          <div className="field-block">
            <label>Priority Level</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="field-block">
            <label>Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="Work">Work</option>
              <option value="Study">Study</option>
              <option value="Personal">Personal</option>
              <option value="Errand">Errand</option>
            </select>
          </div>
        </div>

        <div className="form-grid-2">
          <div className="field-block">
            <label>Due Date</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              required
            />
          </div>

          <div className="field-block">
            <label>Initial Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="form-submit-row">
          <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save Task
          </button>
        </div>
      </form>
    </div>
  );
}