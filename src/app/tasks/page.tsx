"use client";

import { useState } from "react";
import { Modal } from "@/components/Modal";
import { TaskForm } from "@/components/TaskForm";
import { TaskTable } from "@/components/TaskTable";
import { TaskFilter } from "@/components/TaskFilter";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useTaskStore } from "@/stores/useTaskStore";
import { useTaskFilter } from "@/hooks/useTaskFilter";
import { toast } from "sonner";

export default function TasksPage() {
  const tasks = useTaskStore((state) => state.tasks);
  const removeTask = useTaskStore((state) => state.removeTask);

  const { activeFilter, filteredTasks, handleFilterChange } = useTaskFilter(tasks);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskIdToRemove, setTaskIdToRemove] = useState<string | null>(null);

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleRequestRemove(taskId: string) {
    setTaskIdToRemove(taskId);
  }

  function handleConfirmRemove() {
    if (taskIdToRemove) {
      removeTask(taskIdToRemove);
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
          onClick={handleOpenModal}
          className="px-4 py-2 text-sm bg-slate-900 text-white rounded-lg hover:bg-slate-700 transition-colors"
        >
          Nova tarefa
        </button>
      </div>

      <TaskFilter value={activeFilter} onChange={handleFilterChange} />

      <TaskTable
        tasks={filteredTasks}
        showAssignee
        onRemoveTask={handleRequestRemove}
      />

      {isModalOpen && (
        <Modal title="Nova tarefa" onClose={handleCloseModal}>
          <TaskForm onClose={handleCloseModal} />
        </Modal>
      )}

      {taskIdToRemove && (
        <ConfirmDialog
          title="Remover tarefa"
          description="Tem certeza que deseja remover esta tarefa? Esta ação não pode ser desfeita."
          onConfirm={handleConfirmRemove}
          onCancel={handleCancelRemove}
        />
      )}
    </div>
  );
}