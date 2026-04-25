import { screen } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import Dashboard from "../../src/pages/Dashboard";

test("renders dashboard title", () => {
  renderWithProviders(<Dashboard />);
  expect(
    screen.getByRole("heading", { name: /task dashboard/i }),
  ).toBeInTheDocument();
});
