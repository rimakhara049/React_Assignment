export default function StudentCard({ student }) {
  const { name, rollNumber, department, semester, cgpa, photo } = student;

  // Visual highlight for top academic performers
  const isDistinction = cgpa >= 8.5;

  return (
    <div className={`student-card ${isDistinction ? 'distinction-border' : ''}`}>
      <div className="card-top">
        <div className="avatar-wrapper">
          <img 
            src={photo} 
            alt={`${name}'s photo`} 
            className="student-avatar" 
          />
          {isDistinction && <span className="top-badge">Top Tier</span>}
        </div>
        <div className="student-main-info">
          <h3 className="student-name">{name}</h3>
          <span className="roll-badge">Roll: {rollNumber}</span>
        </div>
      </div>

      <div className="card-details">
        <div className="detail-row">
          <span className="detail-label">Department</span>
          <span className="detail-value">{department}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Semester</span>
          <span className="detail-value">{semester}</span>
        </div>
        <div className="detail-row highlight-row">
          <span className="detail-label">CGPA</span>
          <span className="cgpa-score">{cgpa.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}