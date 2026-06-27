import { useTaskStore } from "@/stores/useTaskStore";

describe("useTaskStore", () => {
  beforeEach(() => {
    useTaskStore.setState({ tasks: [] });
  });

  it("should add a task", () => {
    const { addTask } = useTaskStore.getState();

    addTask({
      id: "1",
      title: "Test task",
      status: "todo",
      priority: "medium",
      createdAt: "2024-01-01",
    });

    expect(useTaskStore.getState().tasks).toHaveLength(1);
    expect(useTaskStore.getState().tasks[0].title).toBe("Test task");
  });

  it("should remove a task", () => {
    useTaskStore.setState({
      tasks: [{ id: "1", title: "Test task", status: "todo", priority: "medium", createdAt: "2024-01-01" }],
    });

    useTaskStore.getState().removeTask("1");

    expect(useTaskStore.getState().tasks).toHaveLength(0);
  });

  it("should update task status", () => {
    useTaskStore.setState({
      tasks: [{ id: "1", title: "Test task", status: "todo", priority: "medium", createdAt: "2024-01-01" }],
    });

    useTaskStore.getState().updateTaskStatus("1", "done");

    expect(useTaskStore.getState().tasks[0].status).toBe("done");
  });
});