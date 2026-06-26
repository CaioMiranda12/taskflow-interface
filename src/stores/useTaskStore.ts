import { create } from "zustand";
import { Task, TaskStatus } from "@/types/task";
import { tasks as mockTasks } from "@/data/tasks";

interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (taskId: string, data: Partial<Task>) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  removeTask: (taskId: string) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: mockTasks,

  addTask: (task: Task) => {
    set((state: TaskStore) => ({
      tasks: [...state.tasks, task],
    }));
  },

  updateTask: (taskId: string, data: Partial<Task>) => {
    set((state: TaskStore) => ({
      tasks: state.tasks.map((task: Task) =>
        task.id === taskId ? { ...task, ...data } : task
      ),
    }));
  },

  updateTaskStatus: (taskId: string, status: TaskStatus) => {
    set((state: TaskStore) => ({
      tasks: state.tasks.map((task: Task) =>
        task.id === taskId ? { ...task, status } : task
      ),
    }));
  },

  removeTask: (taskId: string) => {
    set((state: TaskStore) => ({
      tasks: state.tasks.filter((task: Task) => task.id !== taskId),
    }));
  },
}));