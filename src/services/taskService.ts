import axios from "axios";
import { Task } from "@/types/task";
import { tasks as mockTasks } from "@/data/tasks";

const SIMULATED_DELAY = 1000;

function simulateDelay(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));
}

export async function fetchTasks(): Promise<Task[]> {
  await simulateDelay();
  return mockTasks;
}