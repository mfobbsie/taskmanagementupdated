import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { TaskProvider } from "../src/context/TaskProvider";

export function renderWithProviders(ui: React.ReactElement) {
  return render(
    <MemoryRouter>
      <TaskProvider>{ui}</TaskProvider>
    </MemoryRouter>,
  );
}
