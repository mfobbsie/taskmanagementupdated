// src/pages/ViewTaskDetails.tsx

import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";
import { useState, useEffect } from "react";
import type { Task } from "../types/Task";
import FocusTimer from "../components/FocusTimer";
import "../styles/TaskDetails.css";

export default function ViewTaskDetails() {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);
  const navigate = useNavigate();
  const location = useLocation();

  const { tasks, updateTask, deleteTask } = useTasks();

  // Prefer state passed from Dashboard, fallback to lookup
  const initialTask: Task | undefined =
    (location.state as { task?: Task })?.task ||
    tasks.find((t) => t.id === numericId);


  const [task, setTask] = useState<Task | undefined>(initialTask);

  useEffect(() => {
    if (!initialTask) {
      navigate("/dashboard");
    }
  }, [initialTask, navigate]);

  if (!task) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setTask((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleSave = () => {
    if (!task) return;
    updateTask(task.id, task);
    navigate("/dashboard");
  };

  const handleDelete = () => {
    if (!task) return;
    deleteTask(task.id);
    navigate("/dashboard");
  };

  return (
    <div className="task-details-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="task-details-card">
        <h1>Edit Task</h1>

        <div className="form-grid">
          <label>
            Title
            <input name="title" value={task.title} onChange={handleChange} />
          </label>

          <label>
            Description
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
            />
          </label>

          <label>
            Due Date
            <input
              type="date"
              name="dueDate"
              value={task.dueDate || ""}
              onChange={handleChange}
            />
          </label>

          <label>
            Priority
            <select
              name="priority"
              value={task.priority}
              onChange={handleChange}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </label>

          <label>
            Urgency
            <select name="urgency" value={task.urgency} onChange={handleChange}>
              <option>Urgent</option>
              <option>Not Urgent</option>
            </select>
          </label>

          <label>
            Importance
            <select
              name="importance"
              value={task.importance}
              onChange={handleChange}
            >
              <option>Important</option>
              <option>Not Important</option>
            </select>
          </label>

          <label>
            Energy Level
            <select
              name="energyLevel"
              value={task.energyLevel}
              onChange={handleChange}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </label>
        </div>

        <div className="task-details-actions">
          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>

          <button className="delete-btn" onClick={handleDelete}>
            Delete Task
          </button>
        </div>
      </div>

      <FocusTimer taskTitle={task.title} />
    </div>
  );
}
