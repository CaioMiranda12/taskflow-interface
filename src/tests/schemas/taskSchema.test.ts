import { taskSchema } from "@/schemas/taskSchema";

describe("taskSchema", () => {
  it("should pass with valid data", () => {
    const result = taskSchema.safeParse({
      title: "Fix bug",
      status: "todo",
      priority: "medium",
    });

    expect(result.success).toBe(true);
  });

  it("should fail with short title", () => {
    const result = taskSchema.safeParse({
      title: "Fi",
      status: "todo",
      priority: "medium",
    });

    expect(result.success).toBe(false);
  });

  it("should fail with invalid status", () => {
    const result = taskSchema.safeParse({
      title: "Fix bug",
      status: "invalid_status",
      priority: "medium",
    });

    expect(result.success).toBe(false);
  });

  it("should fail with invalid priority", () => {
    const result = taskSchema.safeParse({
      title: "Fix bug",
      status: "todo",
      priority: "invalid_priority",
    });

    expect(result.success).toBe(false);
  });

  it("should pass with optional fields", () => {
    const result = taskSchema.safeParse({
      title: "Fix bug",
      status: "done",
      priority: "urgent",
      description: "Optional description",
      dueDate: "2024-12-31",
    });

    expect(result.success).toBe(true);
  });
});