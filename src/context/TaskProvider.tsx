// src/context/TaskProvider.tsx
import { useState, useEffect } from "react";
import { TaskContext } from "./TaskContext";
import type { Task } from "../types/Task";

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });

  // Persist tasks whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Omit<Task, "id">) => {
    const newTask: Task = { ...task, id: Date.now() };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (id: number, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    );
  };

  const toggleTaskCompleted = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        toggleTaskCompleted,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
