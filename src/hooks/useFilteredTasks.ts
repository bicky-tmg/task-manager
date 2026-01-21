import { getFilteredTasks } from "@/lib/utils";
import { useFilterStore } from "@/store/filterStore";
import { useTaskStore } from "@/store/taskStore";
import type { Task, TaskStatus } from "@/types/common";
import { useMemo } from "react";

export const useFilteredTasks = () => {
    const allTasks = useTaskStore((state) => state.tasks);
    const filters = useFilterStore((state) => state.filters);
    const filteredTasks = useMemo(
        () => getFilteredTasks(allTasks, filters),
        [allTasks, filters],
    );

    const tasksByStatus = useMemo(() => {
        const grouped: Record<TaskStatus, Task[]> = {
            todo: [],
            "in-progress": [],
            completed: [],
        };

        filteredTasks.forEach((task) => {
            grouped[task.status].push(task);
        });

        return grouped;
    }, [filteredTasks]);

    return {
        allTasks,
        filteredTasks,
        tasksByStatus
    }
}
