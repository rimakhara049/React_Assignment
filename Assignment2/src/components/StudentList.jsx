import StudentCard from './StudentCard';

export default function StudentList({ students }) {
  if (!students || students.length === 0) {
    return (
      <div className="empty-state">
        <p>No student records available.</p>
      </div>
    );
  }

  return (
    <main className="student-grid-container">
      <div className="student-grid">
        {students.map((student) => (
          <StudentCard key={student.rollNumber} student={student} />
        ))}
      </div>
    </main>
  );
}