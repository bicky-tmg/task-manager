import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { taskFormSchema, type TaskFormData } from "@/validation/task";
import { PRIORITY_LABELS, STATUS_LABELS } from "@/constant/common";
import { useTaskStore } from "@/store/taskStore";
import { FormInput } from "./FormInput";
import { FormTextarea } from "./FormTextarea";
import { FormSelect } from "./FormSelect";
import { FormDatePicker } from "./FormDatePicker";
import { toast } from "sonner";

const initialValues: TaskFormData = {
  title: "",
  description: "",
  status: "todo",
  priority: "medium",
  dueDate: new Date().toISOString(),
};

const statusOptions = Object.entries(STATUS_LABELS).map(([value, label]) => ({
  value,
  label,
}));

const priorityOptions = Object.entries(PRIORITY_LABELS).map(
  ([value, label]) => ({
    value,
    label,
  }),
);

export const TaskFormModal = () => {
  const open = useTaskStore((state) => state.isFormModalOpen);
  const onOpenChange = useTaskStore((state) => state.setIsFormModalOpen);
  const addTask = useTaskStore((state) => state.addTask);
  const updateTask = useTaskStore((state) => state.updateTask);
  const task = useTaskStore((state) => state.editingTask);
  const isEditing = !!task;

  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (open) {
      if (task) {
        form.reset({
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          dueDate: task.dueDate,
        });
      } else {
        form.reset({
          title: "",
          description: "",
          status: "todo",
          priority: "medium",
          dueDate: new Date().toISOString(),
        });
      }
    }
  }, [open, task, form]);

  const onSubmit = (data: TaskFormData) => {
    if (isEditing) {
      updateTask(task.id, data);
      toast.success("Task has been updated");
    } else {
      addTask(data);
      toast.success("Task has been created");
    }
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Task" : "Create New Task"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the task details below."
              : "Fill in the details to create a new task."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              name="title"
              label="Title"
              placeholder="Enter task title..."
              autoFocus
            />

            <FormTextarea<TaskFormData>
              name="description"
              label="Description"
              placeholder="Enter task description..."
              className="min-h-25 resize-none"
            />

            <div className="grid grid-cols-2 gap-4">
              <FormSelect<TaskFormData>
                name="status"
                label="Status"
                placeholder="Select status"
                options={statusOptions}
                className="w-full"
              />

              <FormSelect<TaskFormData>
                name="priority"
                label="Priority"
                placeholder="Select priority"
                options={priorityOptions}
                className="w-full"
              />
            </div>
            <FormDatePicker<TaskFormData>
              label="Due Date"
              name="dueDate"
              placeholder="Pick a date"
            />

            <DialogFooter className="gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? "Save Changes" : "Create Task"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
