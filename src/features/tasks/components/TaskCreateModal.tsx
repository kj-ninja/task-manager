import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@components/ui/dialog";
import type { CreateTaskFormData } from "@features/tasks/validation/schemas";
import { useModalState } from "@services/modals";

import { TaskForm } from "./TaskForm";

interface TaskCreateModalProps {
  onSubmit: (data: CreateTaskFormData) => Promise<void>;
  isLoading?: boolean;
}

export function TaskCreateModal({ onSubmit, isLoading = false }: TaskCreateModalProps) {
  const { isOpen, closeModal } = useModalState();

  const handleSubmit = async (data: CreateTaskFormData) => {
    await onSubmit(data);
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => closeModal()}>
      <DialogContent className="max-w-lg p-6">
        <DialogHeader className="pb-4">
          <DialogTitle className="font-semibold text-lg">Create Task</DialogTitle>
        </DialogHeader>

        <TaskForm mode="create" onSubmit={handleSubmit} onCancel={handleCancel} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
}
