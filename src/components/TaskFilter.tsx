import { TaskStatus } from "@/types/task";
import { TASK_STATUS_LABEL } from "@/constants/task";

const ALL_OPTION = "all" as const;

type FilterValue = TaskStatus | typeof ALL_OPTION;

interface TaskFilterProps {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
}

const FILTER_OPTIONS: { label: string; value: FilterValue }[] = [
  { label: "Todos", value: ALL_OPTION },
  { label: TASK_STATUS_LABEL.todo, value: "todo" },
  { label: TASK_STATUS_LABEL.in_progress, value: "in_progress" },
  { label: TASK_STATUS_LABEL.in_review, value: "in_review" },
  { label: TASK_STATUS_LABEL.done, value: "done" },
];

export function TaskFilter({ value, onChange }: TaskFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {FILTER_OPTIONS.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-3 py-1.5 text-xs rounded-lg transition-colors whitespace-nowrap ${value === option.value
              ? "bg-slate-900 text-white"
              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}