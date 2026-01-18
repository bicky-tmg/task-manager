import { cva, type VariantProps } from "class-variance-authority";
import type { TaskPriority } from "@/types/task";
import { cn } from "@/lib/utils";
import { PRIORITY_LABELS } from "@/constant/common";

const priorityBadgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      priority: {
        low: "bg-priority-low/10 text-priority-low",
        medium: "bg-priority-medium/10 text-priority-medium",
        high: "bg-priority-high/10 text-priority-high",
        critical: "bg-priority-critical/10 text-priority-critical",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      priority: "medium",
      size: "md",
    },
  },
);

interface PriorityBadgeProps extends VariantProps<
  typeof priorityBadgeVariants
> {
  priority: TaskPriority;
  className?: string;
  showLabel?: boolean;
}

export const PriorityBadge = ({
  priority,
  size,
  className,
  showLabel = true,
}: PriorityBadgeProps) => {
  return (
    <span
      className={cn(priorityBadgeVariants({ priority, size }), className)}
      role="status"
      aria-label={`Priority: ${PRIORITY_LABELS[priority]}`}
    >
      <span
        className={cn(
          "mr-1.5 h-1.5 w-1.5 rounded-full",
          priority === "low" && "bg-priority-low",
          priority === "medium" && "bg-priority-medium",
          priority === "high" && "bg-priority-high",
          priority === "critical" && "bg-priority-critical",
        )}
      />
      {showLabel && PRIORITY_LABELS[priority]}
    </span>
  );
};
