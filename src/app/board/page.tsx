"use client";

import { KanbanColumn } from "@/components/KanbanColumn";
import { useTaskStore } from "@/stores/useTaskStore";
import { TaskStatus } from "@/types/task";

const BOARD_COLUMNS: TaskStatus[] = ["todo", "in_progress", "in_review", "done"];

export default function BoardPage() {
  const tasks = useTaskStore((state) => state.tasks);

  function getTasksByStatus(status: TaskStatus) {
    return tasks.filter((task) => task.status === status);
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-slate-900">Board</h2>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {BOARD_COLUMNS.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            tasks={getTasksByStatus(status)}
          />
        ))}
      </div>
    </div>
  );
}