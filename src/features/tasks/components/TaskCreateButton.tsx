import { Button } from "@components/ui/button";
import { useState } from "react";

import type { CreateTaskFormData } from "../validation/schemas";

import { TaskCreateModal } from "./TaskCreateModal";

export function TaskCreateButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} className="w-full">
        Create Task
      </Button>

      <TaskCreateModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleCreateTask}
        isLoading={isLoading}
      />
    </>
  );
}
