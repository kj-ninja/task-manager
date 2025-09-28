/**
 * Task Validation Schemas with Zod
 *
 * These schemas provide runtime validation for forms and API inputs.
 * They work seamlessly with React Hook Form and provide excellent error messages.
 */

import { z } from "zod";

// =============================================================================
// Base Schema Definitions
// =============================================================================

/**
 * Task status validation schema
 */
export const taskStatusSchema = z.enum(["todo", "in-progress", "completed", "cancel"]);

/**
 * Task priority validation schema
 */
export const taskPrioritySchema = z.enum(["low", "medium", "high", "urgent"]);

/**
 * Task category validation schema
 */
export const taskCategorySchema = z.enum(["personal", "work", "shopping", "health", "other"]);

// =============================================================================
// Form Validation Schemas
// =============================================================================

/**
 * Task creation form validation
 *
 * Used with React Hook Form for the task creation modal/form
 */
export const createTaskSchema = z.object({
  title: z.string().min(1, "Task title is required").max(100, "Task title must be less than 100 characters").trim(),

  description: z.string().max(1000, "Description must be less than 1000 characters").optional().or(z.literal("")), // Allow empty string

  priority: taskPrioritySchema,

  dueDate: z.date().min(new Date(), "Due date cannot be in the past").optional(),

  category: taskCategorySchema.optional(),

  // TODO: Add label field for future implementation
  // label: z.string().max(50, "Label must be less than 50 characters").optional(),

  estimatedMinutes: z
    .number()
    .int()
    .min(1, "Estimated time must be at least 1 minute")
    .max(1440, "Estimated time cannot exceed 24 hours")
    .optional(),
});

/**
 * Task update form validation
 *
 * All fields optional for partial updates
 */
export const updateTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Task title cannot be empty")
    .max(100, "Task title must be less than 100 characters")
    .trim()
    .optional(),

  description: z.string().max(1000, "Description must be less than 1000 characters").optional(),

  status: taskStatusSchema.optional(),

  priority: taskPrioritySchema.optional(),

  dueDate: z.date().optional(),

  category: taskCategorySchema.optional(),

  // TODO: Add label field for future implementation
  // label: z.string().max(50, "Label must be less than 50 characters").optional(),

  estimatedMinutes: z
    .number()
    .int()
    .min(1, "Estimated time must be at least 1 minute")
    .max(1440, "Estimated time cannot exceed 24 hours")
    .optional(),
});

/**
 * Quick task creation validation (minimal fields)
 */
export const quickCreateTaskSchema = z.object({
  title: z.string().min(1, "Task title is required").max(100, "Task title must be less than 100 characters").trim(),

  priority: taskPrioritySchema.optional().default("medium"),
});

// =============================================================================
// Filter and Query Validation
// =============================================================================

/**
 * Task filters validation schema
 */
export const taskFiltersSchema = z.object({
  status: z.array(taskStatusSchema).optional(),
  priority: z.array(taskPrioritySchema).optional(),
  category: z.array(taskCategorySchema).optional(),

  dueDateRange: z
    .object({
      start: z.date(),
      end: z.date(),
    })
    .refine((data) => data.start <= data.end, {
      message: "Start date must be before or equal to end date",
      path: ["start"],
    })
    .optional(),

  // TODO: Add label filter for future implementation
  // label: z.array(z.string()).optional(),

  search: z.string().max(100, "Search query too long").optional(),
});

/**
 * Task sorting validation schema
 */
export const taskSortSchema = z.object({
  field: z.enum(["createdAt", "updatedAt", "dueDate", "priority", "title"]),
  direction: z.enum(["asc", "desc"]),
});

/**
 * Complete task query parameters validation
 */
export const taskQueryParamsSchema = z.object({
  filters: taskFiltersSchema.optional(),
  sort: taskSortSchema.optional(),
  limit: z.number().int().min(1).max(100).optional().default(20),
  cursor: z.string().optional(),
});

// =============================================================================
// Type Inference from Schemas
// =============================================================================

/**
 * Infer TypeScript types from Zod schemas
 *
 * This ensures our TypeScript types stay in sync with validation schemas
 */
export type CreateTaskFormData = z.infer<typeof createTaskSchema>;
export type UpdateTaskFormData = z.infer<typeof updateTaskSchema>;
export type QuickCreateTaskFormData = z.infer<typeof quickCreateTaskSchema>;
export type TaskFiltersData = z.infer<typeof taskFiltersSchema>;
export type TaskSortData = z.infer<typeof taskSortSchema>;
export type TaskQueryParamsData = z.infer<typeof taskQueryParamsSchema>;

// =============================================================================
// Utility Functions
// =============================================================================

/**
 * Validate task creation data
 */
export function validateCreateTask(data: unknown) {
  return createTaskSchema.safeParse(data);
}

/**
 * Validate task update data
 */
export function validateUpdateTask(data: unknown) {
  return updateTaskSchema.safeParse(data);
}

// =============================================================================
// Form Default Values
// =============================================================================

/**
 * Default values for task creation form
 */
export const createTaskDefaults: CreateTaskFormData = {
  title: "",
  description: "",
  priority: "medium",
};

/**
 * Default values for task filters
 */
export const taskFiltersDefaults: TaskFiltersData = {
  status: undefined,
  priority: undefined,
  category: undefined,
  search: "",
};

/**
 * Default sorting
 */
export const taskSortDefaults: TaskSortData = {
  field: "createdAt",
  direction: "desc",
};
