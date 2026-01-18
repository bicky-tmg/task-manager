import { z } from "zod";

export const taskFormSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .max(100, "Title must be less than 100 characters")
        .trim(),
    description: z
        .string()
        .max(500, "Description must be less than 500 characters")
        .optional(),
    status: z.enum(["todo", "in-progress", "completed"] as const),
    priority: z.enum(["low", "medium", "high", "critical"] as const),
    dueDate: z.string().min(1, "Due date is required"),
});

export type TaskFormData = z.infer<typeof taskFormSchema>;