// tests/test-utils.tsx
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { TaskProvider } from "../src/context/TaskProvider";
import { ToastProvider } from "../src/components/ToastProvider";

export function renderWithProviders(ui: React.ReactElement) {
  return render(
    <MemoryRouter>
      <ToastProvider>
        <TaskProvider>{ui}</TaskProvider>
      </ToastProvider>
    </MemoryRouter>,
  );
}

