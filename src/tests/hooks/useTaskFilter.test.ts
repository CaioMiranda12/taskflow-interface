import { renderHook, act } from "@testing-library/react";
import { useTaskFilter } from "@/hooks/useTaskFilter";
import { Task } from "@/types/task";

const mockTasks: Task[] = [
  { id: "1", title: "Task 1", status: "todo", priority: "low", createdAt: "2024-01-01" },
  { id: "2", title: "Task 2", status: "in_progress", priority: "medium", createdAt: "2024-01-01" },
  { id: "3", title: "Task 3", status: "done", priority: "high", createdAt: "2024-01-01" },
];

describe("useTaskFilter", () => {
  it("should return all tasks when filter is 'all'", () => {
    const { result } = renderHook(() => useTaskFilter(mockTasks));

    expect(result.current.filteredTasks).toHaveLength(3);
  });

  it("should filter tasks by status", () => {
    const { result } = renderHook(() => useTaskFilter(mockTasks));

    act(() => {
      result.current.handleFilterChange("todo");
    });

    expect(result.current.filteredTasks).toHaveLength(1);
    expect(result.current.filteredTasks[0].status).toBe("todo");
  });

  it("should return empty array when no tasks match the filter", () => {
    const { result } = renderHook(() => useTaskFilter(mockTasks));

    act(() => {
      result.current.handleFilterChange("in_review");
    });

    expect(result.current.filteredTasks).toHaveLength(0);
  });

  it("should update active filter", () => {
    const { result } = renderHook(() => useTaskFilter(mockTasks));

    act(() => {
      result.current.handleFilterChange("done");
    });

    expect(result.current.activeFilter).toBe("done");
  });
});