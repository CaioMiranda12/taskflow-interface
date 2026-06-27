import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTaskStore } from "@/stores/useTaskStore";
import { updateTask } from "@/services/taskService";
import { Task } from "@/types/task";

export function useUpdateTask() {
  const queryClient = useQueryClient();
  const updateTaskInStore = useTaskStore((state) => state.updateTask);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ taskId, data }: { taskId: string; data: Partial<Task> }) =>
      updateTask(taskId, data),
    onSuccess: (updatedTask: Task) => {
      updateTaskInStore(updatedTask.id, updatedTask);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return { mutateAsync, isPending };
}