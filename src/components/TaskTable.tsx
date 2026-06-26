import { Task } from "@/types/task";
import { Badge } from "@/components/Badge";
import { EmptyState } from "@/components/EmptyState";
import { useRouter } from "next/navigation";
import {
  TASK_PRIORITY_COLOR,
  TASK_PRIORITY_LABEL,
  TASK_STATUS_COLOR,
  TASK_STATUS_LABEL,
} from "@/constants/task";

interface TaskTableProps {
  tasks: Task[];
  showAssignee?: boolean;
  onRemoveTask?: (taskId: string) => void;
  onEditTask?: (task: Task) => void;
}

export function TaskTable({ tasks, showAssignee = true, onRemoveTask, onEditTask }: TaskTableProps) {
  const router = useRouter();

  function handleNavigateToTask(taskId: string) {
    router.push(`/tasks/${taskId}`);
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="text-left px-6 py-3 text-slate-500 font-medium whitespace-nowrap">Título</th>
              <th className="text-left px-6 py-3 text-slate-500 font-medium whitespace-nowrap">Status</th>
              <th className="text-left px-6 py-3 text-slate-500 font-medium whitespace-nowrap">Prioridade</th>
              {showAssignee && (
                <th className="text-left px-6 py-3 text-slate-500 font-medium whitespace-nowrap">Responsável</th>
              )}
              {(onEditTask || onRemoveTask) && (
                <th className="text-left px-6 py-3 text-slate-500 font-medium whitespace-nowrap">Ações</th>
              )}
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  <EmptyState
                    title="Nenhuma tarefa encontrada"
                    description="Crie uma nova tarefa para começar"
                  />
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr
                  key={task.id}
                  onClick={() => handleNavigateToTask(task.id)}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4 text-slate-900 font-medium whitespace-nowrap">{task.title}</td>
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
                  {showAssignee && (
                    <td className="px-6 py-4 text-slate-700 whitespace-nowrap">
                      {task.assignee?.name ?? "—"}
                    </td>
                  )}
                  {(onEditTask || onRemoveTask) && (
                    <td
                      className="px-6 py-4"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <div className="flex items-center gap-3">
                        {onEditTask && (
                          <button
                            onClick={() => onEditTask(task)}
                            className="text-xs text-slate-500 hover:text-slate-900 transition-colors"
                          >
                            Editar
                          </button>
                        )}
                        {onRemoveTask && (
                          <button
                            onClick={() => onRemoveTask(task.id)}
                            className="text-xs text-red-500 hover:text-red-700 transition-colors"
                          >
                            Remover
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}