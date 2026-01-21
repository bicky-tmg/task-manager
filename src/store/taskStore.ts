import type { Task } from '@/types/common'
import type { TaskFormData } from '@/validation/task';
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from "uuid";

type TaskStore = {
    tasks: Task[];
    addBulkTasks: (newTasks: Task[]) => void;
    editingTask: Task | null;
    setEditingTask: (next: Task | null | ((prev: Task | null) => Task | null)) => void;
    isFormModalOpen: boolean;
    setIsFormModalOpen: (next: boolean | ((prev: boolean) => boolean)) => void;
    addTask: (data: TaskFormData) => void;
    updateTask: (id: string, data: Partial<TaskFormData>) => void;
    deleteTask: (id: string) => void;
}

export const useTaskStore = create<TaskStore>()(
    persist((set) => ({
        tasks: [],
        isFormModalOpen: false,
        setIsFormModalOpen: (next) => set((state) => ({ isFormModalOpen: typeof next === "function" ? next(state.isFormModalOpen) : next })),
        editingTask: null,
        setEditingTask: (next) => set((state) => ({ editingTask: typeof next === "function" ? next(state.editingTask) : next })),
        addTask: (data) => {
            const now = new Date().toISOString();

            const newTask: Task = {
                id: uuidv4(),
                ...data,
                createdAt: now,
                updatedAt: now,
            };
            set((state) => {
                const tasks = [...state.tasks, newTask];
                return { tasks }
            })
        },
        addBulkTasks: (tasksData: Task[]) => {
            set((state) => {
                const allTasks = [...state.tasks, ...tasksData];
                return { tasks: allTasks };
            });
        },
        updateTask: (id, data) => {
            set((state) => {
                const tasks = state.tasks.map((task) =>
                    task.id === id
                        ? { ...task, ...data, updatedAt: new Date().toISOString() }
                        : task
                );
                return { tasks };
            });
        },
        deleteTask: (id) => {
            set((state) => {
                const tasks = state.tasks.filter((task) => task.id !== id);
                return { tasks };
            });
        },

    }), { name: 'tasks-storage', partialize: (state) => ({ tasks: state.tasks }) }))