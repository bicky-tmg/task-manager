import { Plus } from "lucide-react";
import { Button } from "./components/ui/button";
import { TaskFormModal } from "./components/Task/TaskFormModal";
import { useState } from "react";
import { useTaskStore } from "./store/taskStore";
import { TaskList } from "./components/Task/TaskList";

function App() {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const setEditingTask = useTaskStore((state) => state.setEditingTask);

  const handleAddTask = () => {
    setEditingTask(null);
    setIsFormModalOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="container px-4 py-6 sm:px-6">
        <Button onClick={handleAddTask} className="gap-2">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Task</span>
        </Button>
        <TaskList setIsFormModalOpen={setIsFormModalOpen} />
        <TaskFormModal
          open={isFormModalOpen}
          onOpenChange={setIsFormModalOpen}
        />
      </div>
    </div>
  );
}

export default App;
