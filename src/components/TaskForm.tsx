"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { taskSchema, TaskFormData } from "@/schemas/taskSchema";
import { useCreateTask } from "@/hooks/useCreateTask";
import { useUpdateTask } from "@/hooks/useUpdateTask";
import { Task } from "@/types/task";

interface TaskFormProps {
  onClose: () => void;
  taskToEdit?: Task;
}

export function TaskForm({ onClose, taskToEdit }: TaskFormProps) {
  const { mutateAsync: createTask, isPending: isCreating } = useCreateTask();
  const { mutateAsync: updateTask, isPending: isUpdating } = useUpdateTask();

  const isEditing = !!taskToEdit;
  const isPending = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: taskToEdit?.title ?? "",
      description: taskToEdit?.description ?? "",
      status: taskToEdit?.status ?? "todo",
      priority: taskToEdit?.priority ?? "medium",
      dueDate: taskToEdit?.dueDate ?? "",
    },
  });

  async function onSubmit(data: TaskFormData) {
    if (isEditing) {
      await updateTask({ taskId: taskToEdit.id, data });
      toast.success("Tarefa atualizada com sucesso!");
    } else {
      await createTask(data);
      toast.success("Tarefa criada com sucesso!");
    }
    onClose();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm text-slate-700">Título</label>
        <input
          {...register("title")}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
          placeholder="Nome da tarefa"
        />
        {errors.title && (
          <span className="text-xs text-red-500">{errors.title.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-slate-700">Descrição</label>
        <textarea
          {...register("description")}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300 resize-none"
          rows={3}
          placeholder="Descrição opcional"
        />
      </div>

      <div className="flex gap-3">
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-sm text-slate-700">Status</label>
          <select
            {...register("status")}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
          >
            <option value="todo">A fazer</option>
            <option value="in_progress">Em andamento</option>
            <option value="in_review">Em revisão</option>
            <option value="done">Concluído</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 flex-1">
          <label className="text-sm text-slate-700">Prioridade</label>
          <select
            {...register("priority")}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
          >
            <option value="low">Baixa</option>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
            <option value="urgent">Urgente</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-slate-700">Prazo</label>
        <input
          type="date"
          {...register("dueDate")}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
        />
      </div>

      <div className="flex justify-end gap-2 mt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 text-sm bg-slate-900 text-white rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Salvando..." : isEditing ? "Salvar alterações" : "Criar tarefa"}
        </button>
      </div>
    </form>
  );
}