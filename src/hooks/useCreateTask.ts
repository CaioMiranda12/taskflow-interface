import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTaskStore } from "@/stores/useTaskStore";
import { createTask } from "@/services/taskService";
import { Task } from "@/types/task";

export function useCreateTask() {
  const queryClient = useQueryClient();
  const addTask = useTaskStore((state) => state.addTask);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: Partial<Task>) => createTask(data),
    onSuccess: (createdTask: Task) => {
      addTask(createdTask);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return { mutateAsync, isPending };
}