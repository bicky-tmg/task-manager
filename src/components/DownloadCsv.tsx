import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import type { Task } from "@/types/common";
import { cn } from "@/lib/utils";

export function DownloadTasksCSV({
  tasks = [],
  label = "Download CSV",
  className,
  fileName = "tasks",
}: {
  tasks?: Task[];
  label?: string;
  className?: string;
  fileName?: string;
}) {
  const [loading, setLoading] = useState(false);

  const workerRef = useRef<Worker | null>(null);

  const handleDownload = useCallback(() => {
    if (loading) return;

    setLoading(true);

    if (!workerRef.current) {
      workerRef.current = new Worker(
        new URL("../lib/csvDownloadWorker.ts", import.meta.url),
      );

      workerRef.current.onmessage = (e) => {
        const csv = e.data;
        const blob = new Blob(["\uFEFF" + csv], {
          type: "text/csv;charset=utf-8;",
        });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${fileName}.csv`;
        a.click();

        URL.revokeObjectURL(url);
        setLoading(false);
      };
    }

    workerRef.current.postMessage(tasks);
  }, [fileName, loading, tasks]);

  return (
    <Button
      className={cn(className)}
      onClick={handleDownload}
      variant="secondary"
      disabled={loading}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg
            className="h-4 w-4 animate-spin text-foreground"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          Generating...
        </span>
      ) : (
        <>
          <Download className=" h-4 w-4" />
          {label}
        </>
      )}
    </Button>
  );
}
