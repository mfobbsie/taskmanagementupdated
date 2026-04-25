// src/context/TaskProvider.tsx

import { useEffect, useState, type ReactNode } from "react";
import type { Task } from "../types/Task";
import { TaskContext } from "./TaskContext";

interface TaskProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = "tasks";

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      const parsed = JSON.parse(stored) as Task[];
      if (!Array.isArray(parsed)) return [];
      return parsed;
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // fail silently for now
    }
  }, [tasks]);

  const addTask = (task: Omit<Task, "id">) => {
    setTasks((prev) => [
      ...prev,
      {
        ...task,
        id: Date.now(),
      },
    ]);
  };

  const toggleTaskCompleted = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const updateTask = (id: number, updates: Omit<Task, "id">) => {
    setTasks((prev) => {
      const exists = prev.some((t) => t.id === id);
      if (!exists) return prev;
      return prev.map((t) => (t.id === id ? { ...t, ...updates, id } : t));
    });
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, toggleTaskCompleted, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}
