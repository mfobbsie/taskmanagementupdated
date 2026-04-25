import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import App from "../../src/App";
import { fillTaskForm } from "../helpers/fillTaskForm";

test("user can complete a task", () => {
  renderWithProviders(<App />);

  fillTaskForm({ title: "Walk Ellie" });
  fireEvent.click(screen.getByRole("button", { name: /add task/i }));

  const checkbox = screen.getByRole("checkbox");
  fireEvent.click(checkbox);

  expect(
    screen.getByText(/awesome job — this task is complete/i),
  ).toBeInTheDocument();
});
