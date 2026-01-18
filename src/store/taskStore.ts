import type { Task } from '@/types/task'
import type { TaskFormData } from '@/validation/task';
import { create } from 'zustand'

type TaskStore = {
    tasks: Task[];
    addTask: (data: TaskFormData) => void;
}

export const useTaskStore = create<TaskStore>()((set, get) => ({
    tasks: [],
    addTask: (data: TaskFormData) => {
        const now = new Date().toISOString();
        const newTask: Task = {
            id: `TM-${get().tasks.length + 1}`,
            ...data,
            createdAt: now,
            updatedAt: now,
        };
        set((state) => {
            const newTasks = [...state.tasks, newTask];
            return { tasks: newTasks }
        })
    }
}))