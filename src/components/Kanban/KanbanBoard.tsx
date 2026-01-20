import { STATUS_LABELS } from "@/constant/common";
import { KanbanColumn } from "./KanbanColumn";
import { useMemo } from "react";
import { useTaskStore } from "@/store/taskStore";
import { useFilterStore } from "@/store/filterStore";
import { getFilteredTasks } from "@/lib/utils";
import type { Task, TaskStatus } from "@/types/common";

interface KanbanBoardProps {
  onAddTask: () => void;
}

export const KanbanBoard = ({ onAddTask }: KanbanBoardProps) => {
  const allTasks = useTaskStore((state) => state.tasks);
  const filters = useFilterStore((state) => state.filters);
  const tasks = useMemo(
    () => getFilteredTasks(allTasks, filters),
    [allTasks, filters],
  );

  const tasksByStatus = useMemo(() => {
    const grouped: Record<TaskStatus, Task[]> = {
      todo: [],
      "in-progress": [],
      completed: [],
    };

    tasks.forEach((task) => {
      grouped[task.status].push(task);
    });

    return grouped;
  }, [tasks]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {Object.keys(STATUS_LABELS).map((status) => (
        <KanbanColumn
          key={status}
          status={status as TaskStatus}
          tasks={tasksByStatus[status as TaskStatus]}
          onAddTask={status === "todo" ? onAddTask : undefined}
        />
      ))}
    </div>
  );
};
