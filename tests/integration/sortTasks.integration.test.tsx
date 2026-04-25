import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import App from "../../src/App";
import { fillTaskForm } from "../helpers/fillTaskForm";

test("tasks can be sorted by priority", async () => {
  renderWithProviders(<App />);

  // Add Low priority task
  fillTaskForm({ title: "Low Task", priority: "Low" });
  fireEvent.click(screen.getByRole("button", { name: /add task/i }));

  // Add High priority task
  fillTaskForm({ title: "High Task", priority: "High" });
  fireEvent.click(screen.getByRole("button", { name: /add task/i }));

  // Change sort dropdown
  fireEvent.change(screen.getByLabelText(/sort tasks by/i), {
    target: { value: "priority" },
  });

  // Wait for DOM to update
  const allHeadings = await screen.findAllByRole("heading", { level: 3 });

  // Filter to only task titles (inside .task-item)
  const taskHeadings = allHeadings.filter(
    (el) => el.closest(".task-item") !== null,
  );

  // Assert sorted order: High Task should be first
  expect(taskHeadings[0]).toHaveTextContent(/high task/i);
});
