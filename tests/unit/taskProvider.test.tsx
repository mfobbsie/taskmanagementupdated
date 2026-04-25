import { renderHook, act } from "@testing-library/react";
import { TaskProvider } from "../../src/context/TaskProvider";
import { useTasks } from "../../src/hooks/useTasks";

describe("TaskProvider", () => {
  it("adds a task", () => {
    const wrapper = ({ children }: any) => (
      <TaskProvider>{children}</TaskProvider>
    );

    const { result } = renderHook(() => useTasks(), { wrapper });

    act(() => {
      result.current.addTask({
        title: "Unit Test Task",
        description: "",
        dueDate: "",
        priority: "Low",
        urgency: "Urgent",
        importance: "Important",
        energyLevel: "Low",
        completed: false,
      });
    });

    expect(result.current.tasks.length).toBe(1);
    expect(result.current.tasks[0].title).toBe("Unit Test Task");
  });
});
