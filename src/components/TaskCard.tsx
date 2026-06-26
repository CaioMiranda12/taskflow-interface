import { Task } from "@/types/task";
import { Badge } from "@/components/Badge";
import { TASK_PRIORITY_COLOR, TASK_PRIORITY_LABEL } from "@/constants/task";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 flex flex-col gap-3 hover:shadow-sm transition-shadow">
      <span className="text-sm font-medium text-slate-900">{task.title}</span>

      {task.description && (
        <span className="text-xs text-slate-500">{task.description}</span>
      )}

      <div className="flex items-center justify-between">
        <Badge
          label={TASK_PRIORITY_LABEL[task.priority]}
          className={TASK_PRIORITY_COLOR[task.priority]}
        />

        {task.assignee && (
          <img
            src={task.assignee.avatarUrl}
            alt={task.assignee.name}
            className="w-6 h-6 rounded-full"
          />
        )}
      </div>

      {task.dueDate && (
        <span className="text-xs text-slate-400">Prazo: {task.dueDate}</span>
      )}
    </div>
  );
}