import { renderHook } from "@testing-library/react";
import { useTaskMetrics } from "@/hooks/useTaskMetrics";
import { useTaskStore } from "@/stores/useTaskStore";
import { Task } from "@/types/task";
import { act } from "@testing-library/react";

const mockTasks: Task[] = [
  { id: "1", title: "Task 1", status: "todo", priority: "low", createdAt: "2024-01-01" },
  { id: "2", title: "Task 2", status: "in_progress", priority: "medium", createdAt: "2024-01-01" },
  { id: "3", title: "Task 3", status: "in_review", priority: "high", createdAt: "2024-01-01" },
  { id: "4", title: "Task 4", status: "done", priority: "urgent", createdAt: "2024-01-01" },
  { id: "5", title: "Task 5", status: "todo", priority: "urgent", createdAt: "2024-01-01" },
];

describe("useTaskMetrics", () => {
  beforeEach(() => {
    useTaskStore.setState({ tasks: mockTasks });
  });

  afterEach(() => {
    act(() => {
      useTaskStore.setState({ tasks: [] });
    });
  });

  it("should return correct total", () => {
    const { result } = renderHook(() => useTaskMetrics());

    expect(result.current.total).toBe(5);
  });

  it("should return correct count per status", () => {
    const { result } = renderHook(() => useTaskMetrics());

    expect(result.current.todo).toBe(2);
    expect(result.current.inProgress).toBe(1);
    expect(result.current.inReview).toBe(1);
    expect(result.current.done).toBe(1);
  });

  it("should return urgent tasks that are not done", () => {
    const { result } = renderHook(() => useTaskMetrics());

    expect(result.current.urgentTasks).toHaveLength(1);
    expect(result.current.urgentTasks[0].id).toBe("5");
  });

  it("should return recent tasks limited to 5", () => {
    const { result } = renderHook(() => useTaskMetrics());

    expect(result.current.recentTasks).toHaveLength(5);
  });

  it("should return correct statusChartData", () => {
    const { result } = renderHook(() => useTaskMetrics());

    const todoChart = result.current.statusChartData.find((item) => item.status === "todo");
    const doneChart = result.current.statusChartData.find((item) => item.status === "done");

    expect(todoChart?.count).toBe(2);
    expect(doneChart?.count).toBe(1);
  });
});