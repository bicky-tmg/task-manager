import { useCallback, useMemo, useState } from "react";
import { format, isBefore, startOfDay } from "date-fns";
import { Calendar, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Task } from "@/types/common";
import { cn } from "@/lib/utils";
import { PriorityBadge } from "../PriorityBadge";
import { StatusBadge } from "../StatusBadge";
import { DeleteConfirmModal } from "../DeleteConfirmModal";
import { useTaskStore } from "@/store/taskStore";

interface TaskItemProps {
  task: Task;
  setIsFormModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const now = () => Date.now();

export const TaskItem = ({ task, setIsFormModalOpen }: TaskItemProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const setEditingTask = useTaskStore((state) => state.setEditingTask);

  const handleDelete = useCallback(() => {
    deleteTask(task.id);
  }, [task.id, deleteTask]);

  const handleEdit = useCallback(() => {
    setEditingTask(task);
    setIsFormModalOpen(true);
  }, [setEditingTask, setIsFormModalOpen, task]);

  const isOverdue = useMemo(
    () =>
      task.status !== "completed" &&
      isBefore(new Date(task.dueDate), startOfDay(new Date())),
    [task.dueDate, task.status],
  );

  const isDueSoon = useMemo(
    () =>
      task.status !== "completed" &&
      !isOverdue &&
      isBefore(
        new Date(task.dueDate),
        new Date(now() + 2 * 24 * 60 * 60 * 1000), // within 2 days
      ),

    [isOverdue, task.dueDate, task.status],
  );

  return (
    <div
      className={cn(
        "group rounded-lg border bg-card p-3 shadow-sm transition-all hover:shadow-md",
        task.status === "completed" && "opacity-75",
      )}
    >
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={cn(
                "text-sm font-medium text-foreground",
                task.status === "completed" &&
                  "line-through text-muted-foreground",
              )}
            >
              {task.title}
            </h3>

            <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={handleEdit}
                aria-label="Edit task"
              >
                <Edit2 className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-destructive hover:text-destructive"
                onClick={() => setShowDeleteModal(true)}
                aria-label="Delete task"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {task.description && (
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <StatusBadge status={task.status} size="sm" />
            <PriorityBadge priority={task.priority} size="sm" />

            <span
              className={cn(
                "inline-flex items-center gap-1 text-xs",
                isOverdue
                  ? "text-destructive"
                  : isDueSoon
                    ? "text-priority-medium"
                    : "text-muted-foreground",
              )}
            >
              <Calendar className="h-3 w-3" />
              {isOverdue && "Overdue: "}
              {format(new Date(task.dueDate), "MMM d")}
            </span>
          </div>
        </div>
      </div>
      <DeleteConfirmModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        taskTitle={task.title}
        onConfirm={handleDelete}
      />
    </div>
  );
};
