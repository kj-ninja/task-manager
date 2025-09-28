import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@components/ui/dialog";
import type { CreateTaskFormData } from "@features/tasks/validation/schemas";

import { TaskForm } from "./TaskForm";

interface TaskCreateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateTaskFormData) => Promise<void>;
  isLoading?: boolean;
}

export function TaskCreateModal({ open, onOpenChange, onSubmit, isLoading = false }: TaskCreateModalProps) {
  const handleSubmit = async (data: CreateTaskFormData) => {
    await onSubmit(data);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-6">
        <DialogHeader className="pb-4">
          <DialogTitle className="font-semibold text-lg">Create Task</DialogTitle>
        </DialogHeader>

        <TaskForm mode="create" onSubmit={handleSubmit} onCancel={handleCancel} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
}
