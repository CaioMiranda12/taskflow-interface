import { StatCard } from "@/components/StatCard";
import { tasks } from "@/data/tasks";

export default function DashboardPage() {
  const total = tasks.length;
  const todo = tasks.filter((task) => task.status === "todo").length;
  const inProgress = tasks.filter((task) => task.status === "in_progress").length;
  const done = tasks.filter((task) => task.status === "done").length;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-slate-900">Dashboard</h2>

      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Total" value={total} description="Todas as tarefas" />
        <StatCard title="A fazer" value={todo} description="Aguardando início" />
        <StatCard title="Em andamento" value={inProgress} description="Em execução" />
        <StatCard title="Concluídas" value={done} description="Finalizadas" />
      </div>
    </div>
  );
}