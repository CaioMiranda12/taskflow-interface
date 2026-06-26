"use client";

import { useParams, useRouter } from "next/navigation";
import { useTaskStore } from "@/stores/useTaskStore";
import { Badge } from "@/components/Badge";
import {
  TASK_PRIORITY_COLOR,
  TASK_PRIORITY_LABEL,
  TASK_STATUS_COLOR,
  TASK_STATUS_LABEL,
} from "@/constants/task";
import { MdArrowBack } from "react-icons/md";

export default function TaskDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const tasks = useTaskStore((state) => state.tasks);

  const task = tasks.find((task) => task.id === id);

  function handleGoBack() {
    router.back();
  }

  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-2">
        <span className="text-sm text-slate-500">Tarefa não encontrada.</span>
        <button
          onClick={handleGoBack}
          className="text-sm text-slate-900 underline"
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <button
        onClick={handleGoBack}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors w-fit"
      >
        <MdArrowBack size={18} />
        Voltar
      </button>

      <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-slate-900">{task.title}</h2>
          {task.description && (
            <p className="text-sm text-slate-500">{task.description}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-slate-400">Status</span>
            <Badge
              label={TASK_STATUS_LABEL[task.status]}
              className={TASK_STATUS_COLOR[task.status]}
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-slate-400">Prioridade</span>
            <Badge
              label={TASK_PRIORITY_LABEL[task.priority]}
              className={TASK_PRIORITY_COLOR[task.priority]}
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-slate-400">Responsável</span>
            <span className="text-sm text-slate-700">
              {task.assignee?.name ?? "—"}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-slate-400">Prazo</span>
            <span className="text-sm text-slate-700">
              {task.dueDate ?? "—"}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-slate-400">Criado em</span>
            <span className="text-sm text-slate-700">
              {new Date(task.createdAt).toLocaleDateString("pt-BR")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}