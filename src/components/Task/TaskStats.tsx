import { ListTodo, Clock, CheckCircle2, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useFilterActions } from "@/hooks/useFilterActions";

const stats = [
  {
    key: "all" as const,
    label: "Total Tasks",
    icon: BarChart3,
    colorClass: "text-foreground",
    bgClass: "bg-muted",
  },
  {
    key: "todo" as const,
    label: "To Do",
    icon: ListTodo,
    colorClass: "text-status-todo",
    bgClass: "bg-status-todo/10",
  },
  {
    key: "in-progress" as const,
    label: "In Progress",
    icon: Clock,
    colorClass: "text-status-in-progress",
    bgClass: "bg-status-in-progress/10",
  },
  {
    key: "completed" as const,
    label: "Completed",
    icon: CheckCircle2,
    colorClass: "text-status-completed",
    bgClass: "bg-status-completed/10",
  },
];

export const TaskStats = () => {
  const { counts } = useFilterActions();
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const count = counts[stat.key];

        return (
          <Card className="border-0 shadow-sm py-0" key={index}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg",
                    stat.bgClass,
                  )}
                >
                  <Icon className={cn("h-5 w-5", stat.colorClass)} />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">
                    {count}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
