// src/context/TaskContext.tsx
import { createContext } from "react";
import type { Task } from "../types/Task";

export interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
  updateTask: (id: number, updates: Partial<Task>) => void;
  toggleTaskCompleted: (id: number) => void;
  deleteTask: (id: number) => void; 
}


export const TaskContext = createContext<TaskContextType | null>(null);
