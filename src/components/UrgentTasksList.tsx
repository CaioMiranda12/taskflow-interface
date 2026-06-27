import { Task } from "@/types/task";
import { Badge } from "@/components/Badge";
import { EmptyState } from "@/components/EmptyState";
import { TASK_PRIORITY_COLOR, TASK_PRIORITY_LABEL } from "@/constants/task";

interface UrgentTasksListProps {
  tasks: Task[];
}

export function UrgentTasksList({ tasks }: UrgentTasksListProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-4">
      <span className="text-sm font-semibold text-slate-800">Tarefas urgentes</span>

      {tasks.length === 0 ? (
        <EmptyState
          title="Nenhuma tarefa urgente"
          description="Você está em dia com suas prioridades"
        />
      ) : (
        <div className="flex flex-col gap-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-slate-900">{task.title}</span>
                {task.dueDate && (
                  <span className="text-xs text-slate-400">Prazo: {task.dueDate}</span>
                )}
              </div>
              <Badge
                label={TASK_PRIORITY_LABEL[task.priority]}
                className={TASK_PRIORITY_COLOR[task.priority]}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}