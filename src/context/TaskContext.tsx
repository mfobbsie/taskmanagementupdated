// src/context/TaskContext.tsx

import { createContext } from "react";
import type { Task } from "../types/Task";

export interface TaskContextValue {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
  toggleTaskCompleted: (id: number) => void;
  updateTask: (id: number, updates: Omit<Task, "id">) => void;
  deleteTask: (id: number) => void;
}

export const TaskContext = createContext<TaskContextValue | undefined>(
  undefined,
);
