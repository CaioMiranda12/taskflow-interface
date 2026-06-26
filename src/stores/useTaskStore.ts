import { create } from "zustand";
import { Task, TaskStatus } from "@/types/task";

interface TaskStore {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (taskId: string, data: Partial<Task>) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  removeTask: (taskId: string) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],

  setTasks: (tasks: Task[]) => {
    set(() => ({ tasks }));
  },

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