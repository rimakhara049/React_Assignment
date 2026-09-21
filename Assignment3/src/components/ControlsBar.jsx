export default function ControlsBar({
  searchTerm,
  onSearchChange,
  selectedDepartment,
  onDepartmentChange,
  departments,
  onOpenAddModal,
  totalEmployees,
  filteredCount
}) {
  return (
    <div className="controls-card">
      <div className="stats-row">
        <div className="counter-badge">
          <span>Total Records:</span> <strong>{totalEmployees}</strong>
        </div>
        <div className="counter-badge accent">
          <span>Showing:</span> <strong>{filteredCount}</strong>
        </div>
      </div>

      <div className="actions-row">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name, ID, or phone..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="filter-box">
          <select
            value={selectedDepartment}
            onChange={(e) => onDepartmentChange(e.target.value)}
          >
            <option value="All">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-primary" onClick={onOpenAddModal}>
          + Add Employee
        </button>
      </div>
    </div>
  );
}