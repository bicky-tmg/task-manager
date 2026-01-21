import { STATUS_LABELS } from "@/constant/common";
import { KanbanColumn } from "./KanbanColumn";
import type { Task, TaskStatus } from "@/types/common";
import { EmptyState } from "../EmptyState";
import { useFilteredTasks } from "@/hooks/useFilteredTasks";
import { DeleteConfirmModal } from "../DeleteConfirmModal";
import { useCallback, useState } from "react";
import { useTaskStore } from "@/store/taskStore";
import { toast } from "sonner";

interface KanbanBoardProps {
  onAddTask: () => void;
}

export const KanbanBoard = ({ onAddTask }: KanbanBoardProps) => {
  const { allTasks, tasksByStatus } = useFilteredTasks();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const setEditingTask = useTaskStore((state) => state.setEditingTask);
  const setIsFormModalOpen = useTaskStore((state) => state.setIsFormModalOpen);
  const deletingTask = useTaskStore((state) => state.editingTask);

  const onDeleteOpen = useCallback(
    (task: Task, open: boolean) => {
      setEditingTask(task);
      setShowDeleteModal(open);
    },
    [setEditingTask],
  );

  const handleEdit = useCallback(
    (task: Task) => {
      setEditingTask(task);
      setIsFormModalOpen(true);
    },
    [setEditingTask, setIsFormModalOpen],
  );

  const handleDelete = useCallback(() => {
    if (!deletingTask) return;
    deleteTask(deletingTask.id);
    toast.success("Task has been deleted");
    setEditingTask(null);
  }, [deletingTask, deleteTask, setEditingTask]);

  if (allTasks.length === 0) {
    return <EmptyState onAddTask={onAddTask} />;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {Object.keys(STATUS_LABELS).map((status) => (
          <KanbanColumn
            key={status}
            status={status as TaskStatus}
            tasks={tasksByStatus[status as TaskStatus]}
            onAddTask={status === "todo" ? onAddTask : undefined}
            onEdit={handleEdit}
            onDeleteOpen={onDeleteOpen}
          />
        ))}
      </div>
      <DeleteConfirmModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        taskTitle={deletingTask?.title ?? ""}
        onConfirm={handleDelete}
      />
    </>
  );
};
