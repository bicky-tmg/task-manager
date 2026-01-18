import { TaskItem } from "./TaskItem";
import { useTaskStore } from "@/store/taskStore";

interface TaskListProps {
  setIsFormModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TaskList = ({ setIsFormModalOpen }: TaskListProps) => {
  const tasks = useTaskStore((state) => state.tasks);
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          setIsFormModalOpen={setIsFormModalOpen}
        />
      ))}
    </div>
  );
};
