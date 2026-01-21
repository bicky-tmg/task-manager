import { useState, useRef } from "react";
import { Upload, FileText, Loader2, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Task } from "@/types/common";
import { Alert, AlertDescription } from "./ui/alert";
import { DownloadTasksCSV } from "./DownloadCsv";
import { sampleTasksData } from "@/constant/common";

interface BulkUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (tasks: Task[]) => void;
}

export const BulkUploadModal = ({
  open,
  onOpenChange,
  onComplete,
}: BulkUploadModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const workerRef = useRef<Worker | null>(null);
  const tasksRef = useRef<Task[]>([]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
    setError(null);
  };

  const handleUploadClick = () => {
    if (!file || loading) return;

    setLoading(true);
    setError(null);
    tasksRef.current = [];

    workerRef.current = new Worker(
      new URL("../lib/csvUploadWorker.ts", import.meta.url),
      { type: "module" },
    );

    workerRef.current.onmessage = (e) => {
      const { type, task, message } = e.data;

      if (type === "row") {
        tasksRef.current.push(task);
      }

      if (type === "done") {
        setLoading(false);
        onComplete(tasksRef.current);
        workerRef.current?.terminate();
        onOpenChange(false);
        setFile(null);
      }

      if (type === "error") {
        setLoading(false);
        setError(message);
        workerRef.current?.terminate();
      }
    };

    workerRef.current.postMessage(file);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-175 max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Bulk Add Tasks
          </DialogTitle>
          <DialogDescription>
            Add multiple tasks at once by importing from CSV.
          </DialogDescription>
        </DialogHeader>

        <DownloadTasksCSV
          className="self-start"
          label="Download Sample"
          fileName="Sample"
          tasks={sampleTasksData}
        />

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex items-center gap-3 p-10 pl-5 border border-dashed rounded-md mt-4">
          <Button asChild variant="outline">
            <label className="cursor-pointer">
              <FileText className="mr-2 h-4 w-4" />
              Choose CSV
              <input
                type="file"
                accept=".csv"
                hidden
                onChange={handleFileSelect}
              />
            </label>
          </Button>

          {file && (
            <span className="truncate text-sm text-muted-foreground">
              {file.name}
            </span>
          )}
        </div>
        <DialogFooter className="gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false);
              setError(null);
              setFile(null);
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleUploadClick} disabled={!file || loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload CSV
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
