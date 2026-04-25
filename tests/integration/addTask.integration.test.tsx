import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import App from "../../src/App";
import { fillTaskForm } from "../helpers/fillTaskForm";

test("user can add a task", () => {
  renderWithProviders(<App />);

  fillTaskForm({ title: "Walk Ellie" });

  fireEvent.click(screen.getByRole("button", { name: /add task/i }));

  expect(screen.getByText(/walk ellie/i)).toBeInTheDocument();
});
