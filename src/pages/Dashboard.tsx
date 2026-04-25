import { useTasks } from "../hooks/useTasks";

export default function Dashboard() {
  const { tasks, addTask, toggleTaskCompleted, deleteTask } = useTasks();

  return (
    <div>
      <h1>Task Dashboard</h1>

      <button
        onClick={() =>
          addTask({
            title: "New Task",
            description: "Example",
            dueDate: "",
            priority: "Low",
            completed: false,
            urgency: "Not Urgent",
            importance: "Not Important",
            energyLevel: "Medium",
          })
        }
      >
        Add Example Task
      </button>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.title}
            <button onClick={() => toggleTaskCompleted(t.id)}>Toggle</button>
            <button onClick={() => deleteTask(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
