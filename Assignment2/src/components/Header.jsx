export default function Header({ totalCount, sortOrder, onSortChange }) {
  return (
    <header className="portal-header">
      <div className="header-brand">
        <h1>Student Information Portal</h1>
        <p className="header-subtitle">Academic Registry & Performance Dashboard</p>
      </div>

      <div className="header-controls">
        <div className="stat-pill">
          <span>Total Students:</span> <strong>{totalCount}</strong>
        </div>

        <div className="sort-selector">
          <label htmlFor="cgpaSort">Sort by CGPA:</label>
          <select 
            id="cgpaSort" 
            value={sortOrder} 
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="default">Default Order</option>
            <option value="high-to-low">Highest to Lowest</option>
            <option value="low-to-high">Lowest to Highest</option>
          </select>
        </div>
      </div>
    </header>
  );
}