import Papa from "papaparse"
import type { Task, TaskStatus, TaskPriority } from "@/types/common"
import { v4 as uuidv4 } from "uuid"

const isValidStatus = (v: string): v is TaskStatus =>
    ["todo", "in-progress", "completed"].includes(v)

const isValidPriority = (v: string): v is TaskPriority =>
    ["low", "medium", "high", "critical"].includes(v)

const normalizeRow = (row: Record<string, any>) =>
    Object.fromEntries(
        Object.entries(row).map(([k, v]) => [
            k.trim().toLowerCase().replace(/\s+/g, ""),
            v,
        ])
    );

self.onmessage = (event) => {
    const file: File = event.data
    if (!file || file.size === 0) {
        self.postMessage({
            type: "error",
            message: "CSV file is empty",
        })
        return
    }

    let hasRows = false

    Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        worker: false,
        step: (results, parser) => {
            hasRows = true
            const row = normalizeRow(results.data as any);

            if (
                !row.title
            ) {
                self.postMessage({
                    type: "error",
                    message: "Invalid CSV format or data",
                })
                parser.abort()
                return
            }
            if (

                !isValidStatus(row.status)
            ) {
                self.postMessage({
                    type: "error",
                    message: "Invalid CSV format. Status must be one of: todo, in-progress, completed.",
                })
                parser.abort()
                return
            }
            if (!isValidPriority(row.priority)) {
                self.postMessage({
                    type: "error",
                    message: "Invalid CSV format. Priority must be one of: low, medium, high, critical.",
                })
                parser.abort()
                return
            }

            const now = new Date().toISOString();
            const dueDate = new Date(row.duedate).toISOString();

            const task: Task = {
                id: uuidv4(),
                title: row.title,
                description: row.description || undefined,
                status: row.status,
                priority: row.priority,
                dueDate,
                createdAt: now,
                updatedAt: now,
            }

            self.postMessage({ type: "row", task })
        },
        complete: () => {
            if (!hasRows) {
                self.postMessage({
                    type: "error",
                    message: "CSV contains no data rows",
                })
                return
            }

            self.postMessage({ type: "done" })
        },
        error: (err) => {
            self.postMessage({ type: "error", message: err.message })
        },
    })
}
