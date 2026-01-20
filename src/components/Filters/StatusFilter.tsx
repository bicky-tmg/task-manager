import { STATUS_LABELS } from "@/constant/common";
import { useFilterActions } from "@/hooks/useFilterActions";

export const StatusFilter = () => {
  const { counts, status, setStatusFilter } = useFilterActions();

  return (
    <div className="flex flex-wrap gap-2">
      {(["all", "todo", "in-progress", "completed"] as const).map((_status) => {
        const label = _status === "all" ? "All" : STATUS_LABELS[_status];
        const count = counts[_status];
        const isActive = status === _status;

        return (
          <button
            key={_status}
            onClick={() => setStatusFilter(_status)}
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
