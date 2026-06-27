import { loginSchema, registerSchema } from "@/schemas/authSchema";

describe("loginSchema", () => {
  it("should pass with valid data", () => {
    const result = loginSchema.safeParse({
      email: "john@example.com",
      password: "123456",
    });

    expect(result.success).toBe(true);
  });

  it("should fail with invalid email", () => {
    const result = loginSchema.safeParse({
      email: "invalid-email",
      password: "123456",
    });

    expect(result.success).toBe(false);
  });

  it("should fail with short password", () => {
    const result = loginSchema.safeParse({
      email: "john@example.com",
      password: "123",
    });

    expect(result.success).toBe(false);
  });
});

describe("registerSchema", () => {
  it("should pass with valid data", () => {
    const result = registerSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      password: "123456",
      confirmPassword: "123456",
    });

    expect(result.success).toBe(true);
  });

  it("should fail when passwords do not match", () => {
    const result = registerSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      password: "123456",
      confirmPassword: "654321",
    });

    expect(result.success).toBe(false);
  });

  it("should fail with short name", () => {
    const result = registerSchema.safeParse({
      name: "J",
      email: "john@example.com",
      password: "123456",
      confirmPassword: "123456",
    });

    expect(result.success).toBe(false);
  });
});