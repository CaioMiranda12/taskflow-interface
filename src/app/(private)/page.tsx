"use client";

import { StatCard } from "@/components/StatCard";
import { TaskTable } from "@/components/TaskTable";
import { TaskStatusChart } from "@/components/TaskStatusChart";
import { UrgentTasksList } from "@/components/UrgentTasksList";
import { DashboardSkeleton } from "@/components/DashboardSkeleton";
import { useTaskMetrics } from "@/hooks/useTaskMetrics";
import { useTasks } from "@/hooks/useTasks";

export default function DashboardPage() {
  const { isLoading, isError } = useTasks();
  const {
    total,
    todo,
    inProgress,
    done,
    recentTasks,
    urgentTasks,
    statusChartData,
  } = useTaskMetrics();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-sm text-slate-500">Erro ao carregar tarefas.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-slate-900">Dashboard</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total" value={total} description="Todas as tarefas" />
        <StatCard title="A fazer" value={todo} description="Aguardando início" />
        <StatCard title="Em andamento" value={inProgress} description="Em execução" />
        <StatCard title="Concluídas" value={done} description="Finalizadas" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TaskStatusChart data={statusChartData} />
        <UrgentTasksList tasks={urgentTasks} />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-base font-semibold text-slate-800">Tarefas recentes</h3>
        <TaskTable tasks={recentTasks} />
      </div>
    </div>
  );
}