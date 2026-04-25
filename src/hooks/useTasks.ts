import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

export const useTasks = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) {
    throw new Error("useTasks must be used inside a TaskProvider");
  }
  return ctx;
};
