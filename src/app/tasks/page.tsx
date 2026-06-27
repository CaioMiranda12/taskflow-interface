"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Modal } from "@/components/Modal";
import { TaskForm } from "@/components/TaskForm";
import { TaskTable } from "@/components/TaskTable";
import { TaskFilter } from "@/components/TaskFilter";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { TableSkeleton } from "@/components/TableSkeleton";
import { useTaskStore } from "@/stores/useTaskStore";
import { useTaskFilter } from "@/hooks/useTaskFilter";
import { useDeleteTask } from "@/hooks/useDeleteTask";
import { useTasks } from "@/hooks/useTasks";
import { Task } from "@/types/task";

export default function TasksPage() {
  const tasks = useTaskStore((state) => state.tasks);
  const { isLoading, isError } = useTasks();
  const { mutateAsync: deleteTask, isPending: isDeleting } = useDeleteTask();
  const { activeFilter, filteredTasks, handleFilterChange } = useTaskFilter(tasks);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [taskIdToRemove, setTaskIdToRemove] = useState<string | null>(null);

  function handleOpenCreateModal() {
    setTaskToEdit(null);
    setIsModalOpen(true);
  }

  function handleOpenEditModal(task: Task) {
    setTaskToEdit(task);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setTaskToEdit(null);
    setIsModalOpen(false);
  }

  function handleRequestRemove(taskId: string) {
    setTaskIdToRemove(taskId);
  }

  async function handleConfirmRemove() {
    if (taskIdToRemove) {
      await deleteTask(taskIdToRemove);
      toast.error("Tarefa removida.");
    }
    setTaskIdToRemove(null);
  }

  function handleCancelRemove() {
    setTaskIdToRemove(null);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Tarefas</h2>
        <button
          onClick={handleOpenCreateModal}
          className="px-4 py-2 text-sm bg-slate-900 text-white rounded-lg hover:bg-slate-700 transition-colors"
        >
          Nova tarefa
        </button>
      </div>

      <TaskFilter value={activeFilter} onChange={handleFilterChange} />

      {isLoading && <TableSkeleton />}

      {isError && (
        <div className="flex items-center justify-center py-16">
          <span className="text-sm text-slate-500">Erro ao carregar tarefas.</span>
        </div>
      )}

      {!isLoading && !isError && (
        <TaskTable
          tasks={filteredTasks}
          showAssignee
          onRemoveTask={handleRequestRemove}
          onEditTask={handleOpenEditModal}
        />
      )}

      {isModalOpen && (
        <Modal
          title={taskToEdit ? "Editar tarefa" : "Nova tarefa"}
          onClose={handleCloseModal}
        >
          <TaskForm onClose={handleCloseModal} taskToEdit={taskToEdit ?? undefined} />
        </Modal>
      )}

      {taskIdToRemove && (
        <ConfirmDialog
          title="Remover tarefa"
          description="Tem certeza que deseja remover esta tarefa? Esta ação não pode ser desfeita."
          onConfirm={handleConfirmRemove}
          onCancel={handleCancelRemove}
          isLoading={isDeleting}
        />
      )}
    </div>
  );
}