import { useState, useEffect } from 'react';

const DEPARTMENTS = [
  'Crop Management',
  'Dairy & Livestock',
  'Equipment & Machinery',
  'Field Operations',
  'Supply Chain & Logistics'
];

export default function EmployeeFormModal({
  isOpen,
  onClose,
  onSubmit,
  editingEmployee
}) {
  const [formData, setFormData] = useState({
    empId: '',
    name: '',
    department: DEPARTMENTS[0],
    gender: 'Male',
    phone: '',
    localAddress: '',
    permanentAddress: ''
  });

  useEffect(() => {
    if (editingEmployee) {
      setFormData(editingEmployee);
    } else {
      setFormData({
        empId: `FRM-${Math.floor(1000 + Math.random() * 9000)}`,
        name: '',
        department: DEPARTMENTS[0],
        gender: 'Male',
        phone: '',
        localAddress: '',
        permanentAddress: ''
      });
    }
  }, [editingEmployee, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill out all required fields.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editingEmployee ? 'Edit Employee' : 'Add New Employee'}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-grid">
            <div className="field-group">
              <label>Employee ID</label>
              <input
                type="text"
                name="empId"
                value={formData.empId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="field-group">
              <label>Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="field-group">
              <label>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="field-group full-width">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                required
              />
            </div>

            <div className="field-group full-width">
              <label>Local Address</label>
              <textarea
                name="localAddress"
                rows="2"
                value={formData.localAddress}
                onChange={handleChange}
                placeholder="Current residence..."
                required
              ></textarea>
            </div>

            <div className="field-group full-width">
              <label>Permanent Address</label>
              <textarea
                name="permanentAddress"
                rows="2"
                value={formData.permanentAddress}
                onChange={handleChange}
                placeholder="Permanent residence..."
                required
              ></textarea>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editingEmployee ? 'Save Changes' : 'Register Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}