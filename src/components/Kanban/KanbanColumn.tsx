import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { STATUS_LABELS } from "@/constant/common";
import { TaskItem } from "../Task/TaskItem";
import type { Task, TaskStatus } from "@/types/common";
import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

interface KanbanColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onAddTask?: () => void;
}

const statusColors = {
  todo: "bg-status-todo/10 border-status-todo/30",
  "in-progress": "bg-status-in-progress/10 border-status-in-progress/30",
  completed: "bg-status-completed/10 border-status-completed/30",
};

const statusHeaderColors = {
  todo: "text-status-todo",
  "in-progress": "text-status-in-progress",
  completed: "text-status-completed",
};

export const KanbanColumn = ({
  status,
  tasks,
  onAddTask,
}: KanbanColumnProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: tasks.length,
    estimateSize: () => 140,
    getScrollElement: () => scrollRef.current,
    overscan: 5,
  });

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border-2 border-dashed transition-colors",
        statusColors[status],
      )}
    >
      <div className="flex items-center justify-between border-b border-border/50 px-3 py-2">
        <div className="flex items-center gap-2">
          <h3
            className={cn("text-sm font-semibold", statusHeaderColors[status])}
          >
            {STATUS_LABELS[status]}
          </h3>
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            {tasks.length}
          </span>
        </div>
        {status === "todo" && onAddTask && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={onAddTask}
            aria-label="Add new task"
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex-1 min-h-50">
        <div
          ref={scrollRef}
          className="h-[calc(100vh-200px)] overflow-y-auto scrollbar-hidden"
        >
          <div
            className="relative w-full"
            style={{ height: `${virtualizer.getTotalSize()}px` }}
          >
            <div
              className="absolute top-0 left-0 w-full"
              style={{
                transform: `translateY(${virtualItems[0]?.start ?? 0}px)`,
              }}
            >
              {virtualItems.map(({ index, key }) => {
                const task = tasks[index];
                return (
                  <div
                    key={key}
                    data-index={index}
                    ref={virtualizer.measureElement}
                    className="m-2"
                  >
                    <TaskItem key={task.id} task={task} className="w-full" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
