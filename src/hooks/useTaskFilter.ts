import { useState } from "react";
import { Task, TaskStatus } from "@/types/task";

const ALL_OPTION = "all" as const;

type FilterValue = TaskStatus | typeof ALL_OPTION;

export function useTaskFilter(tasks: Task[]) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>(ALL_OPTION);

  const filteredTasks = activeFilter === ALL_OPTION
    ? tasks
    : tasks.filter((task) => task.status === activeFilter);

  function handleFilterChange(value: FilterValue) {
    setActiveFilter(value);
  }

  return {
    activeFilter,
    filteredTasks,
    handleFilterChange,
  };
}