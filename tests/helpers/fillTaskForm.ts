import { fireEvent, screen } from "@testing-library/react";

export function fillTaskForm({
  title = "Test Task",
  description = "Description",
  dueDate = "2025-12-31",
  priority = "Medium",
  urgency = "Urgent",
  importance = "Important",
  energyLevel = "Medium",
} = {}) {
  fireEvent.change(screen.getByLabelText(/task title/i), {
    target: { value: title },
  });

  fireEvent.change(screen.getByLabelText(/description/i), {
    target: { value: description },
  });

  fireEvent.change(screen.getByLabelText(/due date/i), {
    target: { value: dueDate },
  });

  fireEvent.change(screen.getByLabelText(/priority/i), {
    target: { value: priority },
  });

  fireEvent.change(screen.getByLabelText(/urgency/i), {
    target: { value: urgency },
  });

  fireEvent.change(screen.getByLabelText(/importance/i), {
    target: { value: importance },
  });

  fireEvent.change(screen.getByLabelText(/energy level/i), {
    target: { value: energyLevel },
  });
}
