import { fetchTasks, createTask, updateTask, deleteTask } from "@/services/taskService";
import { Task } from "@/types/task";

const mockGet = jest.fn();
const mockPost = jest.fn();
const mockPut = jest.fn();
const mockDelete = jest.fn();

jest.mock("axios", () => ({
  create: () => ({
    get: (...args: unknown[]) => mockGet(...args),
    post: (...args: unknown[]) => mockPost(...args),
    put: (...args: unknown[]) => mockPut(...args),
    delete: (...args: unknown[]) => mockDelete(...args),
  }),
}));

const mockTask: Task = {
  id: "1",
  title: "Test task",
  status: "todo",
  priority: "medium",
  createdAt: "2024-01-01",
};

describe("taskService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch tasks", async () => {
    mockGet.mockResolvedValueOnce({ data: [mockTask] });

    const tasks = await fetchTasks();

    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe("Test task");
  });

  it("should create a task", async () => {
    mockPost.mockResolvedValueOnce({ data: mockTask });

    const task = await createTask({ title: "Test task", status: "todo", priority: "medium" });

    expect(task.id).toBe("1");
    expect(task.title).toBe("Test task");
  });

  it("should update a task", async () => {
    const updatedTask = { ...mockTask, title: "Updated task" };
    mockPut.mockResolvedValueOnce({ data: updatedTask });

    const task = await updateTask("1", { title: "Updated task" });

    expect(task.title).toBe("Updated task");
  });

  it("should delete a task", async () => {
    mockDelete.mockResolvedValueOnce({});

    await expect(deleteTask("1")).resolves.not.toThrow();
  });
});