import { Badge } from "@/components/Badge";
import { tasks } from "@/data/tasks";
import { TASK_PRIORITY_COLOR, TASK_PRIORITY_LABEL, TASK_STATUS_COLOR, TASK_STATUS_LABEL } from "@/constants/task";

export default function TasksPage() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-slate-900">Tarefas</h2>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="text-left px-6 py-3 text-slate-500 font-medium">Título</th>
              <th className="text-left px-6 py-3 text-slate-500 font-medium">Status</th>
              <th className="text-left px-6 py-3 text-slate-500 font-medium">Prioridade</th>
              <th className="text-left px-6 py-3 text-slate-500 font-medium">Responsável</th>
              <th className="text-left px-6 py-3 text-slate-500 font-medium">Prazo</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
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
                <td className="px-6 py-4 text-slate-500">
                  {task.dueDate ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}