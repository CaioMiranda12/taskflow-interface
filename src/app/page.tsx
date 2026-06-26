"use client";

import { StatCard } from "@/components/StatCard";
import { TaskTable } from "@/components/TaskTable";
import { useTaskMetrics } from "@/hooks/useTaskMetrics";

export default function DashboardPage() {
  const { total, todo, inProgress, done, recentTasks } = useTaskMetrics();

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-slate-900">Dashboard</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total" value={total} description="Todas as tarefas" />
        <StatCard title="A fazer" value={todo} description="Aguardando início" />
        <StatCard title="Em andamento" value={inProgress} description="Em execução" />
        <StatCard title="Concluídas" value={done} description="Finalizadas" />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-base font-semibold text-slate-800">Tarefas recentes</h3>
        <TaskTable tasks={recentTasks} />
      </div>
    </div>
  );
}