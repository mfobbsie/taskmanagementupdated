export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  completed: boolean;
  urgency: "Urgent" | "Not Urgent";
  importance: "Important" | "Not Important";
  energyLevel: "Low" | "Medium" | "High";
}
