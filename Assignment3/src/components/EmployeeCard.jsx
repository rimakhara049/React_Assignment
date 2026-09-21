export default function EmployeeCard({ employee, onEdit, onDelete }) {
  const {
    id,
    empId,
    name,
    department,
    gender,
    phone,
    localAddress,
    permanentAddress
  } = employee;

  return (
    <div className="employee-card">
      <div className="card-header">
        <div className="identity-block">
          <h3>{name}</h3>
          <span className="emp-id">{empId}</span>
        </div>
        <span className="gender-pill">{gender}</span>
      </div>

      <div className="department-badge">{department}</div>

      <div className="card-body">
        <div className="info-line">
          <span className="info-title">Phone:</span>
          <span>{phone}</span>
        </div>

        <div className="address-section">
          <div className="address-item">
            <span className="info-title">Local Address:</span>
            <p>{localAddress}</p>
          </div>
          <div className="address-item">
            <span className="info-title">Permanent Address:</span>
            <p>{permanentAddress}</p>
          </div>
        </div>
      </div>

      <div className="card-footer">
        <button className="btn btn-edit" onClick={() => onEdit(employee)}>
          Edit
        </button>
        <button className="btn btn-delete" onClick={() => onDelete(id)}>
          Delete
        </button>
      </div>
    </div>
  );
}