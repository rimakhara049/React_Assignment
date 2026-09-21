import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import AddTask from './pages/AddTasks';
import TaskDetails from './pages/TaskDetails';
import CompletedTasks from './pages/CompletedTasks';

export default function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <div className="app-shell">
            <Navbar />
            <main className="shell-main">
              <Routes>
                {/* Public Route */}
                <Route path="/login" element={<Login />} />

                {/* Protected Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/tasks"
                  element={
                    <ProtectedRoute>
                      <Tasks />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/tasks/:id"
                  element={
                    <ProtectedRoute>
                      <TaskDetails />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/add-task"
                  element={
                    <ProtectedRoute>
                      <AddTask />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/completed"
                  element={
                    <ProtectedRoute>
                      <CompletedTasks />
                    </ProtectedRoute>
                  }
                />

                {/* Catch-all redirects */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}