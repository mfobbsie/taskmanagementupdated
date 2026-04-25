import { createContext } from "react";
import type { Task } from "../types/Task";

export interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
  toggleTaskCompleted: (id: string) => void;
  deleteTask: (id: string) => void;
}

export const TaskContext = createContext<TaskContextType | null>(null);
