import type { SortField, Task, TaskPriority, TaskStatus } from "@/types/common";

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

export const priorityWeight = {
    low: 1,
    medium: 2,
    high: 3,
    critical: 4,
};

export const sampleTasksData: Task[] = [
    {
        id: "491cbd10-5033-4313-8615-2b32f460b566",
        title: "At front ago operation",
        description: "List knowledge each occur from tax east. Class political discussion law.",
        status: "todo",
        priority: "critical",
        dueDate: "2026-02-10T10:23:23.003645",
        createdAt: "2025-12-20T12:07:43.941178",
        updatedAt: "2025-12-31T02:52:22.080426"
    },
    {
        id: "d701b0ea-bc80-41fe-a8d8-d91dba1524f3",
        title: "Those garden it",
        description: "Daughter own look resource number wide. Officer dark major room.",
        status: "in-progress",
        priority: "high",
        dueDate: "2026-02-02T02:11:03.348225",
        createdAt: "2025-12-09T20:21:17.847126",
        updatedAt: "2026-01-17T09:30:59.268494"
    },
    {
        id: "64dc4a1e-cf5e-4012-bc70-5bbfbb0ea94b",
        title: "Note candidate cover when movement seven",
        description: "Region sport answer service would ago of. Offer hospital particular money himself.",
        status: "in-progress",
        priority: "critical",
        dueDate: "2026-02-21T04:21:19.001078",
        createdAt: "2025-12-29T05:49:32.393632",
        updatedAt: "2026-01-10T10:08:58.269435"
    },
]