import type { Task } from '@/types/task'
import type { TaskFormData } from '@/validation/task';
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type TaskStore = {
    tasks: Task[];
    editingTask: Task | null;
    setEditingTask: (next: Task | null | ((prev: Task | null) => Task | null)) => void;
    addTask: (data: TaskFormData) => void;
    updateTask: (id: string, data: Partial<TaskFormData>) => void;
    deleteTask: (id: string) => void;
}

export const useTaskStore = create<TaskStore>()(
    persist((set, get) => ({
        tasks: [],
        editingTask: null,
        setEditingTask: (next) => set((state) => ({ editingTask: typeof next === "function" ? next(state.editingTask) : next })),
        addTask: (data) => {
            const now = new Date().toISOString();
            const tasks = get().tasks
            const lastIdNumber = Number(tasks[tasks.length - 1]?.id?.split("-")?.[1])
            const newId = isNaN(lastIdNumber) ? "TM-1" : `TM-${lastIdNumber + 1}`
            const newTask: Task = {
                id: newId,
                ...data,
                createdAt: now,
                updatedAt: now,
            };
            set((state) => {
                const tasks = [...state.tasks, newTask];
                return { tasks }
            })
        },
        updateTask: (id, data): void => {
            set((state) => {
                const tasks = state.tasks.map((task) =>
                    task.id === id
                        ? { ...task, ...data, updatedAt: new Date().toISOString() }
                        : task
                );
                return { tasks };
            });
        },
        deleteTask: (id: string): void => {
            set((state) => {
                const tasks = state.tasks.filter((task) => task.id !== id);
                return { tasks };
            });
        },
    }), { name: 'tasks-storage', partialize: (state) => ({ tasks: state.tasks }) }))