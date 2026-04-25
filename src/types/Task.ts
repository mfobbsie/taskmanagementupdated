// src/types/Task.ts

export type TaskPriority = "Low" | "Medium" | "High";
export type TaskUrgency = "Urgent" | "Not Urgent";
export type TaskImportance = "Important" | "Not Important";
export type TaskEnergyLevel = "Low" | "Medium" | "High";

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
  completed: boolean;
  urgency: TaskUrgency;
  importance: TaskImportance;
  energyLevel: TaskEnergyLevel;
}
