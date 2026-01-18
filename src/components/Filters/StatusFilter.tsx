import { STATUS_LABELS } from "@/constant/common";
import { getTaskCounts } from "@/lib/utils";
import { useFilterStore } from "@/store/filterStore";
import { useTaskStore } from "@/store/taskStore";
import { useMemo } from "react";

export const StatusFilter = () => {
  const allTasks = useTaskStore((state) => state.tasks);
  const filters = useFilterStore((state) => state.filters);
  const setStatusFilter = useFilterStore((state) => state.setStatusFilter);

  const counts = useMemo(() => getTaskCounts(allTasks), [allTasks]);
  return (
    <div className="flex flex-wrap gap-2">
      {(["all", "todo", "in-progress", "completed"] as const).map((status) => {
        const label = status === "all" ? "All" : STATUS_LABELS[status];
        const count = counts[status];
        const isActive = filters.status === status;

        return (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`
                  inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-ring
                  ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  }
                `}
            aria-pressed={isActive}
          >
            {label}
            <span
              className={`
                    rounded-full px-1.5 py-0.5 text-xs
                    ${
                      isActive
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-background text-foreground"
                    }
                  `}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
