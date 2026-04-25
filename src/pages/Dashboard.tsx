// src/pages/Dashboard.tsx

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";
import type { Task } from "../types/Task";
import EisenhowerMatrix from "../components/EisenhowerMatrix";
import "../styles/Dashboard.css";
import { useToast } from "../components/ToastProvider";

type SortOption = "none" | "dueDate" | "priority";

export default function Dashboard() {
  const { tasks, addTask, toggleTaskCompleted } = useTasks();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [view, setView] = useState<"list" | "matrix">("list");
  const [sortBy, setSortBy] = useState<SortOption>("none");

  const [energy, setEnergy] = useState<"Low" | "Medium" | "High" | null>(null);
  const [intention, setIntention] = useState<
    "Self-Care" | "Productivity" | "Inspiration" | null
  >(null);

  const [newTask, setNewTask] = useState<Omit<Task, "id">>({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
    completed: false,
    urgency: "Not Urgent",
    importance: "Not Important",
    energyLevel: "Medium",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const viewTask = (task: Task) => {
    navigate(`/tasks/${task.id}`, { state: { task } });
  };

  const sortedTasks = useMemo(() => {
    const priorityRank = { High: 3, Medium: 2, Low: 1 };
    const items = [...tasks];

    if (sortBy === "dueDate") {
      return items.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
    }

    if (sortBy === "priority") {
      return items.sort(
        (a, b) => priorityRank[b.priority] - priorityRank[a.priority],
      );
    }

    return tasks;
  }, [tasks, sortBy]);

  const addNewTask = () => {
    if (!newTask.title.trim()) {
      alert("Task title is required.");
      return;
    }
    if (!newTask.description.trim()) {
      alert("Task description is required.");
      return;
    }

    addTask(newTask);
    showToast("Task added!", "success");

    setNewTask({
      title: "",
      description: "",
      dueDate: "",
      priority: "Low",
      completed: false,
      urgency: "Not Urgent",
      importance: "Not Important",
      energyLevel: "Medium",
    });
  };

  const recommendedTasks = useMemo(() => {
    if (!energy && !intention) return [];

    return tasks.filter((t) => {
      if (energy === "Low" && t.energyLevel !== "Low") return false;
      if (energy === "Medium" && t.energyLevel === "High") return false;

      if (intention === "Self-Care" && t.priority !== "Low") return false;
      if (intention === "Productivity" && t.priority === "Low") return false;
      if (
        intention === "Inspiration" &&
        !t.description.toLowerCase().includes("creative")
      )
        return false;

      return true;
    });
  }, [tasks, energy, intention]);

  return (
    <div className="dashboard">
      <h1>Task Dashboard</h1>

      {/* Theme Toggle */}
      <div
        style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}
      >
        <button
          onClick={() => {
            const current = document.documentElement.getAttribute("data-theme");
            const next = current === "dark" ? "light" : "dark";
            document.documentElement.setAttribute("data-theme", next);
            showToast(`Switched to ${next} mode`, "info");
          }}
        >
          Toggle Theme
        </button>
      </div>

      {/* View Toggle */}
      <div className="view-toggle">
        <button onClick={() => setView("list")}>List View</button>
        <button onClick={() => setView("matrix")}>Eisenhower Matrix</button>
      </div>

      {/* Feeling Prompt */}
      <div className="dashboard-panel">
        <h3>How are you feeling today?</h3>

        <div className="choice-row">
          {["Low", "Medium", "High"].map((lvl) => (
            <button
              key={lvl}
              className={energy === lvl ? "choice selected" : "choice"}
              onClick={() => setEnergy(lvl as any)}
            >
              {lvl} Energy
            </button>
          ))}
        </div>

        <h4>What do you want to lean into?</h4>

        <div className="choice-row">
          {["Self-Care", "Productivity", "Inspiration"].map((opt) => (
            <button
              key={opt}
              className={intention === opt ? "choice selected" : "choice"}
              onClick={() => setIntention(opt as any)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="section-divider" />

      {/* Add Task Form */}
      <div className="task-form">
        <div className="form-group">
          <label>Task Title</label>
          <input
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={newTask.dueDate}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Priority</label>
          <select
            name="priority"
            value={newTask.priority}
            onChange={handleInputChange}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div className="form-group">
          <label>Urgency</label>
          <select
            name="urgency"
            value={newTask.urgency}
            onChange={handleInputChange}
          >
            <option>Urgent</option>
            <option>Not Urgent</option>
          </select>
        </div>

        <div className="form-group">
          <label>Importance</label>
          <select
            name="importance"
            value={newTask.importance}
            onChange={handleInputChange}
          >
            <option>Important</option>
            <option>Not Important</option>
          </select>
        </div>

        <div className="form-group">
          <label>Energy Level</label>
          <select
            name="energyLevel"
            value={newTask.energyLevel}
            onChange={handleInputChange}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <button onClick={addNewTask}>Add Task</button>
      </div>

      <div className="section-divider" />

      {/* Sort Dropdown */}
      <div className="task-list-header">
        <label>Sort tasks by</label>
        <select
          value={sortBy}
          onChange={(e) => {
            const value = e.target.value as SortOption;
            setSortBy(value);
            showToast(
              `Sorted by ${
                value === "none"
                  ? "Newest Added"
                  : value === "dueDate"
                    ? "Due Date"
                    : "Priority"
              }`,
              "info",
            );
          }}
        >
          <option value="none">Newest Added</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      <div className="section-divider" />

      {/* Recommended Tasks */}
      {(energy || intention) && (
        <div className="dashboard-panel">
          <h3>Recommended for You</h3>

          {recommendedTasks.length === 0 && (
            <p>No tasks match your current energy and intention.</p>
          )}

          {recommendedTasks.map((task) => (
            <div key={task.id} style={{ marginBottom: 8 }}>
              <strong>{task.title}</strong>
              <button style={{ marginLeft: 12 }} onClick={() => viewTask(task)}>
                View
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Conditional Rendering */}
      {view === "list" && (
        <div className="task-list">
          {sortedTasks.map((task) => (
            <div key={task.id} className="task-item">
              <label className="task-complete-label">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => {
                    toggleTaskCompleted(task.id);
                    showToast(
                      task.completed
                        ? "Task marked incomplete"
                        : "Task completed!",
                      "success",
                    );
                  }}
                />
                Mark completed
              </label>

              <h3 className={task.completed ? "task-title-completed" : ""}>
                {task.title}
              </h3>

              <p>Due: {task.dueDate || "No date"}</p>
              <p>Priority: {task.priority}</p>

              {task.completed && (
                <p className="task-complete-message">
                  Awesome job — this task is complete!
                </p>
              )}

              <button onClick={() => viewTask(task)}>View More</button>
            </div>
          ))}
        </div>
      )}

      {view === "matrix" && <EisenhowerMatrix />}
    </div>
  );
}
