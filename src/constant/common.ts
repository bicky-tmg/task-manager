import type { SortField, TaskPriority, TaskStatus } from "@/types/common";

export const STATUS_LABELS: Record<TaskStatus, string> = {
    todo: "To Do",
    "in-progress": "In Progress",
    completed: "Completed",
};

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
    low: "Low",
    medium: "Medium",
    high: "High",
    critical: "Critical",
};

export const SORT_FIELD_LABELS: Record<SortField, string> = {
    dueDate: "Due Date",
    priority: "Priority",
    createdAt: "Created Date",
};