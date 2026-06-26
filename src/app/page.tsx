"use client";

import { StatCard } from "@/components/StatCard";
import { Badge } from "@/components/Badge";
import { useTaskStore } from "@/stores/useTaskStore";
import {
  TASK_STATUS_COLOR,
  TASK_STATUS_LABEL,
  TASK_PRIORITY_COLOR,
  TASK_PRIORITY_LABEL,
} from "@/constants/task";

export default function DashboardPage() {
  const tasks = useTaskStore((state) => state.tasks);

  const total = tasks.length;
  const todo = tasks.filter((task) => task.status === "todo").length;
  const inProgress = tasks.filter((task) => task.status === "in_progress").length;
  const done = tasks.filter((task) => task.status === "done").length;

  const recentTasks = tasks.slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-slate-900">Dashboard</h2>

      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Total" value={total} description="Todas as tarefas" />
        <StatCard title="A fazer" value={todo} description="Aguardando início" />
        <StatCard title="Em andamento" value={inProgress} description="Em execução" />
        <StatCard title="Concluídas" value={done} description="Finalizadas" />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-base font-semibold text-slate-800">Tarefas recentes</h3>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left px-6 py-3 text-slate-500 font-medium">Título</th>
                <th className="text-left px-6 py-3 text-slate-500 font-medium">Status</th>
                <th className="text-left px-6 py-3 text-slate-500 font-medium">Prioridade</th>
                <th className="text-left px-6 py-3 text-slate-500 font-medium">Responsável</th>
              </tr>
            </thead>
            <tbody>
              {recentTasks.map((task) => (
                <tr
                  key={task.id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 text-slate-900 font-medium">{task.title}</td>
                  <td className="px-6 py-4">
                    <Badge
                      label={TASK_STATUS_LABEL[task.status]}
                      className={TASK_STATUS_COLOR[task.status]}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      label={TASK_PRIORITY_LABEL[task.priority]}
                      className={TASK_PRIORITY_COLOR[task.priority]}
                    />
                  </td>
                  <td className="px-6 py-4 text-slate-700">
                    {task.assignee?.name ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}