import axios from "axios";
import { Task } from "@/types/task";

const api = axios.create({
  baseURL: "/api",
});

export async function fetchTasks(): Promise<Task[]> {
  const response = await api.get<Task[]>("/tasks");
  return response.data;
}

export async function createTask(data: Partial<Task>): Promise<Task> {
  const response = await api.post<Task>("/tasks", data);
  return response.data;
}

export async function updateTask(taskId: string, data: Partial<Task>): Promise<Task> {
  const response = await api.put<Task>(`/tasks/${taskId}`, data);
  return response.data;
}

export async function deleteTask(taskId: string): Promise<void> {
  await api.delete(`/tasks/${taskId}`);
}