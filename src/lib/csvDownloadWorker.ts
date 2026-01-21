import type { Task } from "@/types/common";


self.addEventListener("message", (event) => {
    const tasks: Task[] = event.data;

    const headers = ["Title", "Description", "Status", "Priority", "Due Date"];

    const rows = tasks.map((task) =>
        [
            task.title,
            task.description ?? "",
            task.status,
            task.priority,
            task.dueDate,
        ]
            .map((value) => `"${String(value).replace(/"/g, '""')}"`) // escape quotes
            .join(",")
    );

    const csv = [headers.join(","), ...rows].join("\n");

    self.postMessage(csv);
});
