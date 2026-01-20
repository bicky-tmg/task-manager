import { useMemo } from "react";
import { TaskItem } from "./TaskItem";
import { useTaskStore } from "@/store/taskStore";
import { getFilteredTasks } from "@/lib/utils";
import { useFilterStore } from "@/store/filterStore";

export const TaskList = () => {
  const allTasks = useTaskStore((state) => state.tasks);
  const filters = useFilterStore((state) => state.filters);
  const tasks = useMemo(
    () => getFilteredTasks(allTasks, filters),
    [allTasks, filters],
  );
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};
