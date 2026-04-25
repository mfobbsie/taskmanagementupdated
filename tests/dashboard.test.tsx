import { screen } from "@testing-library/react";
import Dashboard from "../src/pages/Dashboard";
import { renderWithProviders } from "./test-utils";

test("renders dashboard title", () => {
  renderWithProviders(<Dashboard />);
  expect(screen.getByText(/task dashboard/i)).toBeInTheDocument();
});
