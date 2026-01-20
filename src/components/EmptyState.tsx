import { ClipboardList, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onAddTask: () => void;
}

export const EmptyState = ({ onAddTask }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <ClipboardList className="h-8 w-8 text-primary" />
      </div>
      <h3 className="mb-2 text-lg font-medium text-foreground">No tasks yet</h3>
      <p className="mb-6 max-w-sm text-sm text-muted-foreground">
        Get started by creating your first task. Stay organized and track your
        progress effectively.
      </p>
      <Button onClick={onAddTask}>
        <Plus className="mr-2 h-4 w-4" />
        Create Your First Task
      </Button>
    </div>
  );
};
