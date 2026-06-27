import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTaskStore } from "@/stores/useTaskStore";
import { deleteTask } from "@/services/taskService";

export function useDeleteTask() {
  const queryClient = useQueryClient();
  const removeTask = useTaskStore((state) => state.removeTask);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId),
    onSuccess: (_: void, taskId: string) => {
      removeTask(taskId);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return { mutateAsync, isPending };
}