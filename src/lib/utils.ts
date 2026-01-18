import { priorityWeight } from "@/constant/common";
import type { FilterState, Task } from "@/types/common";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTaskCounts = (tasks: Task[]) => {
  return {
    all: tasks.length,
    todo: tasks.filter((t) => t.status === "todo").length,
    "in-progress": tasks.filter((t) => t.status === "in-progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };
}

export function getFilteredTasks(tasks: Task[], filters: FilterState): Task[] {
  let result = [...tasks];

  if (filters.status !== "all") {
    result = result.filter((task) => task.status === filters.status);
  }

  if (filters.searchQuery.trim()) {
    const query = filters.searchQuery.toLowerCase().trim();
    result = result.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        task?.description?.toLowerCase()?.includes(query)
    );
  }

  result.sort((a, b) => {
    let comparison = 0;

    switch (filters.sortField) {
      case "dueDate":
        comparison =
          new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        break;
      case "priority":
        comparison =
          (priorityWeight[a.priority] || 0) -
          (priorityWeight[b.priority] || 0);
        break;
      case "createdAt":
      default:
        comparison =
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
    }

    return filters.sortOrder === "asc" ? comparison : -comparison;
  });

  return result;
}