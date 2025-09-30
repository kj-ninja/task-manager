import { useModalManager } from "@services/modals";
import { useState } from "react";

import { TaskCreateModal } from "../components/TaskCreateModal";
import type { CreateTaskFormData } from "../validation/schemas";

export function useTaskCreateModal() {
  const { openModal } = useModalManager();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateTask = async (data: CreateTaskFormData) => {
    console.log("Creating task with data:", data);

    // Simulate API call
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Task created successfully!");
      // Here you would call your React Query mutation
    } catch (error) {
      console.error("Failed to create task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openTaskCreateModal = () => {
    openModal(<TaskCreateModal onSubmit={handleCreateTask} isLoading={isLoading} />, {
      id: "task-create-modal",
    });
  };

  return { openTaskCreateModal };
}