import { TaskPriority, TaskStatus } from "@/types/task";

export const TASK_STATUS_LABEL: Record<TaskStatus, string> = {
  todo: "A fazer",
  in_progress: "Em andamento",
  in_review: "Em revisão",
  done: "Concluído",
};

export const TASK_PRIORITY_LABEL: Record<TaskPriority, string> = {
  low: "Baixa",
  medium: "Média",
  high: "Alta",
  urgent: "Urgente",
};

export const TASK_STATUS_COLOR: Record<TaskStatus, string> = {
  todo: "bg-slate-100 text-slate-700",
  in_progress: "bg-blue-100 text-blue-700",
  in_review: "bg-yellow-100 text-yellow-700",
  done: "bg-green-100 text-green-700",
};

export const TASK_PRIORITY_COLOR: Record<TaskPriority, string> = {
  low: "bg-slate-100 text-slate-700",
  medium: "bg-blue-100 text-blue-700",
  high: "bg-orange-100 text-orange-700",
  urgent: "bg-red-100 text-red-700",
};