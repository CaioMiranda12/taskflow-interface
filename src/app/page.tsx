"use client";

import { StatCard } from "@/components/StatCard";
import { TaskTable } from "@/components/TaskTable";
import { useTaskStore } from "@/stores/useTaskStore";

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
        <TaskTable tasks={recentTasks} />
      </div>
    </div>
  );
}