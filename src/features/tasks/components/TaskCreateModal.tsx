import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@components/ui/dialog";
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
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>Add a new task to your task list. Fill in the details below.</DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <TaskForm mode="create" onSubmit={handleSubmit} onCancel={handleCancel} isLoading={isLoading} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
