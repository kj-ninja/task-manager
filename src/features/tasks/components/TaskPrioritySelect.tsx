import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select";
import { TASK_PRIORITIES, type TaskPriority } from "@features/tasks/types";
import { cn } from "@lib/utils";

interface PrioritySelectProps {
  value?: TaskPriority;
  onValueChange?: (value: TaskPriority) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const priorityColorClasses = {
  gray: "bg-gray-500",
  yellow: "bg-yellow-500",
  orange: "bg-orange-500",
  red: "bg-red-500",
} as const;

export function PrioritySelect({
  value,
  onValueChange,
  placeholder = "Select priority",
  disabled = false,
  className,
}: PrioritySelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className={cn(className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(TASK_PRIORITIES).map(([key, { label, color }]) => (
          <SelectItem key={key} value={key}>
            <div className="flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full ${priorityColorClasses[color as keyof typeof priorityColorClasses]}`}
                aria-hidden="true"
              />
              {label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
