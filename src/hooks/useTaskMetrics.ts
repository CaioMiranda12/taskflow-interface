import { useTaskStore } from "@/stores/useTaskStore";

export function useTaskMetrics() {
  const tasks = useTaskStore((state) => state.tasks);

  const total = tasks.length;
  const todo = tasks.filter((task) => task.status === "todo").length;
  const inProgress = tasks.filter((task) => task.status === "in_progress").length;
  const inReview = tasks.filter((task) => task.status === "in_review").length;
  const done = tasks.filter((task) => task.status === "done").length;
  const recentTasks = tasks.slice(0, 5);

  return {
    total,
    todo,
    inProgress,
    inReview,
    done,
    recentTasks,
  };
}