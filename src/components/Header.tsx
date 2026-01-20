import { Plus, CheckSquare, Bug } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFilterActions } from "@/hooks/useFilterActions";
import { ModeToggle } from "./ModeToggle";
import { useState } from "react";

interface HeaderProps {
  onAddTask: () => void;
}

export const Header = ({ onAddTask }: HeaderProps) => {
  const { counts } = useFilterActions();
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error("Intentional error to showcase Error Boundary");
  }

  return (
    <header className="border-b bg-card">
      <div className="container flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <CheckSquare className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              Task Manager
            </h1>
            <p className="text-xs text-muted-foreground">
              {counts.all} tasks • {counts.completed} completed
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="destructive"
            aria-label="Trigger error boundary"
            onClick={() => {
              setShouldThrow(true);
            }}
          >
            <Bug className="h-4 w-4" />
            Trigger Error
          </Button>
          <ModeToggle />
          <Button onClick={onAddTask} className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Task</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
