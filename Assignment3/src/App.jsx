import { useState } from 'react';
import './App.css';
import ControlsBar from './components/ControlsBar';
import EmployeeCard from './components/EmployeeCard';
import EmployeeFormModal from './components/EmployeeFormModal';

const INITIAL_EMPLOYEES = [
  {
    id: 1,
    empId: 'FRM-101',
    name: 'Ramesh Das',
    department: 'Crop Management',
    gender: 'Male',
    phone: '+91 98301 12345',
    localAddress: 'Staff Quarters B-12, Green Farm Estate',
    permanentAddress: 'Village - Ramnagar, Burdwan, WB'
  },
  {
    id: 2,
    empId: 'FRM-102',
    name: 'Sunita Ghosh',
    department: 'Dairy & Livestock',
    gender: 'Female',
    phone: '+91 98302 23456',
    localAddress: 'Flat 4A, Green Valley Residency, Kolkata',
    permanentAddress: 'Post - Chinsurah, Hooghly, WB'
  },
  {
    id: 3,
    empId: 'FRM-103',
    name: 'Amit Mondal',
    department: 'Equipment & Machinery',
    gender: 'Male',
    phone: '+91 98303 34567',
    localAddress: 'Workshop Line, Quarters 4, Estate',
    permanentAddress: 'Barasat Road, North 24 Parganas, WB'
  },
  {
    id: 4,
    empId: 'FRM-104',
    name: 'Pooja Biswas',
    department: 'Supply Chain & Logistics',
    gender: 'Female',
    phone: '+91 98304 45678',
    localAddress: 'Plot 18, Sector 5, Salt Lake, Kolkata',
    permanentAddress: 'Kalyani Main Road, Nadia, WB'
  }
];

export default function App() {
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const departments = Array.from(new Set(employees.map((e) => e.department)));

  const handleOpenAdd = () => {
    setEditingEmployee(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this employee record?')) {
      setEmployees((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const handleSaveEmployee = (record) => {
    if (editingEmployee) {
      setEmployees((prev) =>
        prev.map((e) => (e.id === editingEmployee.id ? { ...record, id: e.id } : e))
      );
    } else {
      const newRecord = { ...record, id: Date.now() };
      setEmployees((prev) => [newRecord, ...prev]);
    }
    setIsModalOpen(false);
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.empId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.phone.includes(searchTerm);

    const matchesDept =
      selectedDepartment === 'All' || emp.department === selectedDepartment;

    return matchesSearch && matchesDept;
  });

  return (
    <div className="directory-app">
      <header className="directory-header">
        <div className="brand">
          <h1>Farm Operations — Employee Directory</h1>
          <p>Real-time workforce management & department routing</p>
        </div>
      </header>

      <main className="main-content">
        <ControlsBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedDepartment={selectedDepartment}
          onDepartmentChange={setSelectedDepartment}
          departments={departments}
          onOpenAddModal={handleOpenAdd}
          totalEmployees={employees.length}
          filteredCount={filteredEmployees.length}
        />

        {filteredEmployees.length === 0 ? (
          <div className="empty-message">
            <p>No matching employee records found.</p>
          </div>
        ) : (
          <div className="cards-grid">
            {filteredEmployees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onEdit={handleOpenEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      <EmployeeFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveEmployee}
        editingEmployee={editingEmployee}
      />
    </div>
  );
}