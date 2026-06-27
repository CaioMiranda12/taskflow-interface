"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import { KanbanColumn } from "@/components/KanbanColumn";
import { TaskCard } from "@/components/TaskCard";
import { useTaskStore } from "@/stores/useTaskStore";
import { useUpdateTask } from "@/hooks/useUpdateTask";
import { Task, TaskStatus } from "@/types/task";

const BOARD_COLUMNS: TaskStatus[] = ["todo", "in_progress", "in_review", "done"];

export default function BoardPage() {
  const tasks = useTaskStore((state) => state.tasks);
  const updateTaskInStore = useTaskStore((state) => state.updateTask);
  const { mutateAsync: updateTask } = useUpdateTask();

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  function getTasksByStatus(status: TaskStatus) {
    return tasks.filter((task) => task.status === status);
  }

  function handleDragStart(event: DragEndEvent) {
    const draggedTask = tasks.find((task) => task.id === event.active.id);
    if (draggedTask) {
      setActiveTask(draggedTask);
    }
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;

    if (!over) return;

    const activeTaskId = active.id as string;
    const overStatus = over.id as TaskStatus;

    const isOverColumn = BOARD_COLUMNS.includes(overStatus);

    if (!isOverColumn) return;

    const activeTaskData = tasks.find((task) => task.id === activeTaskId);

    if (!activeTaskData || activeTaskData.status === overStatus) return;

    updateTaskInStore(activeTaskId, { status: overStatus });
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    setActiveTask(null);

    if (!over) return;

    const activeTaskId = active.id as string;
    const overStatus = over.id as TaskStatus;

    const isOverColumn = BOARD_COLUMNS.includes(overStatus);

    if (!isOverColumn) return;

    const activeTaskData = tasks.find((task) => task.id === activeTaskId);

    if (!activeTaskData) return;

    await updateTask({ taskId: activeTaskId, data: { status: overStatus } });
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
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

      <DragOverlay>
        {activeTask && <TaskCard task={activeTask} isDragging />}
      </DragOverlay>
    </DndContext>
  );
}