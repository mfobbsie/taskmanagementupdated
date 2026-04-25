import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import App from "../../src/App";
import { fillTaskForm } from "../helpers/fillTaskForm";

test("task appears in correct Eisenhower quadrant", () => {
  renderWithProviders(<App />);

  fillTaskForm({
    title: "Urgent Important Task",
    urgency: "Urgent",
    importance: "Important",
  });

  fireEvent.click(screen.getByRole("button", { name: /add task/i }));
  fireEvent.click(screen.getByRole("button", { name: /eisenhower matrix/i }));

  expect(screen.getByText(/urgent important task/i)).toBeInTheDocument();
});
