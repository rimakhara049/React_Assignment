import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import StudentList from './components/StudentList';
import Footer from './components/Footer';

const INITIAL_STUDENTS = [
  {
    rollNumber: "BC2024-001",
    name: "Souvik Das",
    department: "Computer Applications",
    semester: "Semester VI",
    cgpa: 9.42,
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face"
  },
  {
    rollNumber: "BC2024-002",
    name: "Rima Khara",
    department: "Computer Applications",
    semester: "Semester VI",
    cgpa: 9.85,
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face"
  },
  {
    rollNumber: "BC2024-003",
    name: "Rahul Verma",
    department: "Information Technology",
    semester: "Semester IV",
    cgpa: 7.90,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
  },
  {
    rollNumber: "BC2024-004",
    name: "Priyanka Sen",
    department: "Computer Applications",
    semester: "Semester VI",
    cgpa: 9.15,
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop&crop=face"
  },
  {
    rollNumber: "BC2024-005",
    name: "Debanjan Mukherjee",
    department: "Data Science",
    semester: "Semester IV",
    cgpa: 8.20,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face"
  },
  {
    rollNumber: "BC2024-006",
    name: "Sneha Roy",
    department: "Software Engineering",
    semester: "Semester II",
    cgpa: 7.45,
    photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=300&fit=crop&crop=face"
  }
];

export default function App() {
  const [sortOrder, setSortOrder] = useState('default');

  const sortedStudents = [...INITIAL_STUDENTS].sort((a, b) => {
    if (sortOrder === 'high-to-low') return b.cgpa - a.cgpa;
    if (sortOrder === 'low-to-high') return a.cgpa - b.cgpa;
    return 0; 
  });

  return (
    <div className="portal-wrapper">
      <Header 
        totalCount={INITIAL_STUDENTS.length} 
        sortOrder={sortOrder} 
        onSortChange={setSortOrder} 
      />
      <StudentList students={sortedStudents} />
      <Footer recordCount={sortedStudents.length} />
    </div>
  );
}