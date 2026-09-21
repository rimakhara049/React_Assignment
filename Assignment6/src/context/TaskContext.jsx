import { createContext, useContext, useState } from 'react';

const TaskContext = createContext();

const INITIAL_TASKS = [
  {
    id: "TSK-101",
    description: "Prepare React Router slides and live demo architecture",
    priority: "High",
    category: "Study",
    dueDate: "2026-08-28",
    status: "In Progress"
  },
  {
    id: "TSK-102",
    description: "Review quarterly server maintenance bills and submit receipts",
    priority: "Medium",
    category: "Work",
    dueDate: "2026-08-28",
    status: "Pending"
  },
  {
    id: "TSK-103",
    description: "Renew health insurance policy and verify tax declaration",
    priority: "High",
    category: "Personal",
    dueDate: "2026-08-28",
    status: "Completed"
  },
  {
    id: "TSK-104",
    description: "Purchase grocery rations and organic produce for the week",
    priority: "Low",
    category: "Errand",
    dueDate: "2026-08-28",
    status: "Completed"
  }
];

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Basic Auth toggle for Protected Routes

  const addTask = (newTask) => {
    const taskRecord = {
      ...newTask,
      id: `TSK-${Math.floor(100 + Math.random() * 900)}`
    };
    setTasks((prev) => [taskRecord, ...prev]);
  };

  const updateTask = (id, updatedFields) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updatedFields } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTaskStatus = (id) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          const nextStatus = task.status === "Completed" ? "In Progress" : "Completed";
          return { ...task, status: nextStatus };
        }
        return task;
      })
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
        isAuthenticated,
        setIsAuthenticated
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}