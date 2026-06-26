"use client";

import { useState } from "react";
import { Modal } from "@/components/Modal";
import { TaskForm } from "@/components/TaskForm";
import { TaskTable } from "@/components/TaskTable";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useTaskStore } from "@/stores/useTaskStore";

export default function TasksPage() {
  const tasks = useTaskStore((state) => state.tasks);
  const removeTask = useTaskStore((state) => state.removeTask);

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

      <TaskTable
        tasks={tasks}
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