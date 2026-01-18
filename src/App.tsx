import { TaskFormModal } from "./components/Task/TaskFormModal";
import { useCallback, useState } from "react";
import { useTaskStore } from "./store/taskStore";
import { TaskList } from "./components/Task/TaskList";
import { Header } from "./components/Header";

function App() {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const setEditingTask = useTaskStore((state) => state.setEditingTask);

  const handleAddTask = useCallback(() => {
    setEditingTask(null);
    setIsFormModalOpen(true);
  }, [setEditingTask]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header onAddTask={handleAddTask} />
      <div className="container px-4 py-6 sm:px-6">
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
