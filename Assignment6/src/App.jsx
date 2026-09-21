import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { TaskProvider } from './context/TaskContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import AddTask from './pages/AddTasks';
import TaskDetails from './pages/TaskDetails';
import CompletedTasks from './pages/CompletedTasks';
export default function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Navbar />
          <main className="shell-main">
            <Routes>
              {/* Public/Standard Routes */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/tasks/:id" element={<TaskDetails />} />
              <Route path="/completed" element={<CompletedTasks />} />

              {/* Protected Route */}
              <Route
                path="/add-task"
                element={
                  <ProtectedRoute>
                    <AddTask />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TaskProvider>
  );
}