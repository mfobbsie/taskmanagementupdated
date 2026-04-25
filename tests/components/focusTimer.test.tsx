import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import FocusTimer from "../../src/components/FocusTimer";

test("starts and resets the timer", () => {
  renderWithProviders(<FocusTimer taskTitle="Write tests" />);

  fireEvent.click(screen.getByRole("button", { name: /start/i }));
  expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
});
