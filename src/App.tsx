import { Plus } from "lucide-react";
import { Button } from "./components/ui/button";
import { TaskFormModal } from "./components/TaskFormModal";
import { useState } from "react";
import { useTaskStore } from "./store/taskStore";
import type { TaskFormData } from "./validation/task";

function App() {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);

  const handleAddTask = () => {
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = (data: TaskFormData) => {
    addTask(data);
  };

  return (
    <>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} onClick={() => console.log(task.id)}>
            {task.title}
          </li>
        ))}
      </ul>
      <Button onClick={handleAddTask} className="gap-2">
        <Plus className="h-4 w-4" />
        <span className="hidden sm:inline">Add Task</span>
      </Button>
      <TaskFormModal
        open={isFormModalOpen}
        onOpenChange={setIsFormModalOpen}
        onSubmit={handleFormSubmit}
      />
    </>
  );
}

export default App;
