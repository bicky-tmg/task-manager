import { TaskFormModal } from "./components/Task/TaskFormModal";
import { useCallback, useState } from "react";
import { useTaskStore } from "./store/taskStore";
import { Header } from "./components/Header";
import { FilterControls } from "./components/Filters/FilterControls";
import { KanbanBoard } from "./components/Kanban/KanbanBoard";
import { TaskStats } from "./components/Task/TaskStats";
import { ThemeProvider } from "./components/ThemeProvider";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Toaster } from "./components/ui/sonner";
import { DownloadTasksCSV } from "./components/DownloadCsv";
import { useFilteredTasks } from "./hooks/useFilteredTasks";
import { BulkUploadModal } from "./components/BulkUploadModal";
import { Button } from "./components/ui/button";
import { Upload } from "lucide-react";

function App() {
  const { filteredTasks } = useFilteredTasks();
  const setIsFormModalOpen = useTaskStore((state) => state.setIsFormModalOpen);
  const setEditingTask = useTaskStore((state) => state.setEditingTask);
  const addBulkTasks = useTaskStore((state) => state.addBulkTasks);
  const [isBulkUploadModalOpen, setIsBulkUploadModalOpen] = useState(false);

  const handleAddTask = useCallback(() => {
    setEditingTask(null);
    setIsFormModalOpen(true);
  }, [setEditingTask, setIsFormModalOpen]);

  const onBulkUploadOpenChange = useCallback((open: boolean) => {
    setIsBulkUploadModalOpen(open);
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
        <div className="flex min-h-screen flex-col bg-background">
          <Header onAddTask={handleAddTask} />
          <div className="container px-4 py-6 sm:px-6">
            <section className="mb-6">
              <TaskStats />
            </section>

            <section className="mb-6 flex justify-between flex-wrap-reverse gap-4">
              <FilterControls />
              <div className="flex gap-2 self-baseline">
                <Button
                  onClick={() => onBulkUploadOpenChange(true)}
                  variant="secondary"
                >
                  <Upload className=" h-4 w-4" />
                  Bulk Upload
                </Button>
                <DownloadTasksCSV tasks={filteredTasks} />
              </div>
            </section>
            <KanbanBoard onAddTask={handleAddTask} />
            <TaskFormModal />
          </div>
        </div>
        <BulkUploadModal
          open={isBulkUploadModalOpen}
          onOpenChange={onBulkUploadOpenChange}
          onComplete={(tasks) => addBulkTasks(tasks)}
        />
      </ThemeProvider>
      <Toaster />
    </ErrorBoundary>
  );
}
export default App;
