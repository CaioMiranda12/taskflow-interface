import { useTaskStore } from "@/stores/useTaskStore";
import { TaskStatus } from "@/types/task";

const ALL_STATUSES: TaskStatus[] = ["todo", "in_progress", "in_review", "done"];

export function useTaskMetrics() {
  const tasks = useTaskStore((state) => state.tasks);

  const total = tasks.length;
  const todo = tasks.filter((task) => task.status === "todo").length;
  const inProgress = tasks.filter((task) => task.status === "in_progress").length;
  const inReview = tasks.filter((task) => task.status === "in_review").length;
  const done = tasks.filter((task) => task.status === "done").length;

  const recentTasks = tasks.slice(0, 5);

  const urgentTasks = tasks.filter(
    (task) => task.priority === "urgent" && task.status !== "done"
  );

  const statusChartData = ALL_STATUSES.map((status) => ({
    status,
    count: tasks.filter((task) => task.status === status).length,
  }));

  return {
    total,
    todo,
    inProgress,
    inReview,
    done,
    recentTasks,
    urgentTasks,
    statusChartData,
  };
}