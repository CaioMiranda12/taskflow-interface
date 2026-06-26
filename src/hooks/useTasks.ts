import { useQuery } from "@tanstack/react-query";
import { useTaskStore } from "@/stores/useTaskStore";
import { fetchTasks } from "@/services/taskService";

export function useTasks() {
  const setTasks = useTaskStore((state) => state.setTasks);

  const { isLoading, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const tasks = await fetchTasks();
      setTasks(tasks);
      return tasks;
    },
  });

  return { isLoading, isError };
}