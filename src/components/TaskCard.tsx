import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@/types/task";
import { Badge } from "@/components/Badge";
import { TASK_PRIORITY_COLOR, TASK_PRIORITY_LABEL } from "@/constants/task";

interface TaskCardProps {
  task: Task;
  isDragging?: boolean;
}

export function TaskCard({ task, isDragging = false }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging: isActiveDrag } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  if (isActiveDrag) {
    return (
      <div className="bg-white rounded-lg border border-dashed border-slate-300 p-4 h-24 opacity-40" />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`bg-white rounded-lg border border-slate-200 p-4 flex flex-col gap-3 cursor-grab active:cursor-grabbing transition-shadow ${isDragging ? "opacity-50 shadow-lg" : "hover:shadow-sm"
        }`}
    >
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