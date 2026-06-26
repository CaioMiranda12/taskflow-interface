import { Task, TaskStatus } from "@/types/task";
import { TaskCard } from "@/components/TaskCard";
import { TASK_STATUS_LABEL } from "@/constants/task";

interface KanbanColumnProps {
  status: TaskStatus;
  tasks: Task[];
}

export function KanbanColumn({ status, tasks }: KanbanColumnProps) {
  return (
    <div className="flex flex-col gap-3 min-w-[260px] flex-1">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-700">
          {TASK_STATUS_LABEL[status]}
        </span>
        <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
          {tasks.length}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}