import { cva, type VariantProps } from "class-variance-authority";
import { Circle, Clock, CheckCircle2 } from "lucide-react";
import type { TaskStatus } from "@/types/common";
import { cn } from "@/lib/utils";
import { STATUS_LABELS } from "@/constant/common";

const statusBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      status: {
        todo: "bg-status-todo/10 text-status-todo",
        "in-progress": "bg-status-in-progress/10 text-status-in-progress",
        completed: "bg-status-completed/10 text-status-completed",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      status: "todo",
      size: "md",
    },
  },
);

const StatusIcon = {
  todo: Circle,
  "in-progress": Clock,
  completed: CheckCircle2,
};

interface StatusBadgeProps extends VariantProps<typeof statusBadgeVariants> {
  status: TaskStatus;
  className?: string;
  showIcon?: boolean;
  showLabel?: boolean;
}

export const StatusBadge = ({
  status,
  size,
  className,
  showIcon = true,
  showLabel = true,
}: StatusBadgeProps) => {
  const Icon = StatusIcon[status];

  return (
    <span
      className={cn(statusBadgeVariants({ status, size }), className)}
      role="status"
      aria-label={`Status: ${STATUS_LABELS[status]}`}
    >
      {showIcon && <Icon className="h-3 w-3" />}
      {showLabel && STATUS_LABELS[status]}
    </span>
  );
};
