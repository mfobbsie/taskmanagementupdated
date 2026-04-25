import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import App from "../../src/App";

test("full task flow: add → view → complete", () => {
  renderWithProviders(<App />);

  // Fill out the form
  fireEvent.change(screen.getByLabelText(/task title/i), {
    target: { value: "Walk Ellie" },
  });

  fireEvent.change(screen.getByLabelText(/description/i), {
    target: { value: "Take Ellie for a walk" },
  });

  fireEvent.change(screen.getByLabelText(/due date/i), {
    target: { value: "2025-12-31" },
  });

  fireEvent.change(screen.getByLabelText(/priority/i), {
    target: { value: "Medium" },
  });

  fireEvent.change(screen.getByLabelText(/urgency/i), {
    target: { value: "Urgent" },
  });

  fireEvent.change(screen.getByLabelText(/importance/i), {
    target: { value: "Important" },
  });

  fireEvent.change(screen.getByLabelText(/energy level/i), {
    target: { value: "Medium" },
  });

  // Submit
  fireEvent.click(screen.getByRole("button", { name: /add task/i }));

  // Task appears
  expect(screen.getByText(/walk ellie/i)).toBeInTheDocument();

  // Toggle completion
  const checkbox = screen.getByRole("checkbox");
  fireEvent.click(checkbox);

  // Assert the specific completion message (not the toast)
  expect(
    screen.getByText(/awesome job — this task is complete/i),
  ).toBeInTheDocument();
});
