import { renderWithProviders } from "../test-utils";
import { useToast } from "../../src/components/ToastProvider";
import { screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

function TestComponent() {
  const { showToast } = useToast();
  return <button onClick={() => showToast("Hello!", "success")}>Toast</button>;
}

test("shows a toast", () => {
  vi.useFakeTimers(); // mock timers

  renderWithProviders(<TestComponent />);

  fireEvent.click(screen.getByRole("button", { name: /toast/i }));

  // Toast should appear immediately
  expect(screen.getByText(/hello/i)).toBeInTheDocument();

  // Advance timers so cleanup runs
  vi.runAllTimers();
});
