export type TaskStatus = 'todo' | 'in-progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';
export type SortField = "dueDate" | "priority" | "createdAt";
export type SortOrder = "asc" | "desc";
export type FilterTaskStatus = TaskStatus | "all";

export type Task = {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string; // ISO date string
    createdAt: string;
    updatedAt: string;
}

export interface FilterState {
    status: FilterTaskStatus;
    searchQuery: string;
    sortField: SortField;
    sortOrder: SortOrder;
}
