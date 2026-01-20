import { TaskFormModal } from "./components/Task/TaskFormModal";
import { useCallback } from "react";
import { useTaskStore } from "./store/taskStore";
import { Header } from "./components/Header";
import { FilterControls } from "./components/Filters/FilterControls";
import { KanbanBoard } from "./components/Kanban/KanbanBoard";
import { TaskStats } from "./components/Task/TaskStats";
import { ThemeProvider } from "./components/ThemeProvider";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Toaster } from "./components/ui/sonner";

function App() {
  const setIsFormModalOpen = useTaskStore((state) => state.setIsFormModalOpen);
  const setEditingTask = useTaskStore((state) => state.setEditingTask);

  const handleAddTask = useCallback(() => {
    setEditingTask(null);
    setIsFormModalOpen(true);
  }, [setEditingTask, setIsFormModalOpen]);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
        <div className="flex min-h-screen flex-col bg-background">
          <Header onAddTask={handleAddTask} />
          <div className="container px-4 py-6 sm:px-6">
            <section className="mb-6">
              <TaskStats />
            </section>

            <section className="mb-6">
              <FilterControls />
            </section>
            <KanbanBoard onAddTask={handleAddTask} />
            <TaskFormModal />
          </div>
        </div>
      </ThemeProvider>
      <Toaster />
    </ErrorBoundary>
  );
}

export default App;
