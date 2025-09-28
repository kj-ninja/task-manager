/**
 * Task Management TypeScript Types
 *
 * Frontend-focused type definitions for React components, forms, and API integration.
 * These types provide excellent developer experience and compile-time safety.
 */

import type { Timestamp } from "firebase/firestore";

// =============================================================================
// Core Domain Types - Single Source of Truth
// =============================================================================

/**
 * Task Status - Using union types for better TypeScript integration
 *
 * Why union over enum?
 * - Better tree-shaking in bundlers
 * - More flexible for conditional types
 * - Easier to work with in React components
 */
export type TaskStatus = "todo" | "in-progress" | "completed";

/**
 * Task Priority - Ordered from low to high
 */
export type TaskPriority = "low" | "medium" | "high" | "urgent";

/**
 * Task Category - Extensible for future features
 */
export type TaskCategory = "personal" | "work" | "shopping" | "health" | "other";

// =============================================================================
// Core Task Interface
// =============================================================================

/**
 * Main Task interface - represents a task as stored in Firestore
 *
 * Note: This matches our Firestore schema exactly, using Firestore Timestamp
 * for date fields to maintain consistency with the backend.
 */
export interface Task {
  id: string;
  title: string;
  description?: string;

  // Status and priority
  status: TaskStatus;
  priority: TaskPriority;

  // Dates - using Firestore Timestamp for backend consistency
  createdAt: Timestamp;
  updatedAt: Timestamp;
  dueDate?: Timestamp;
  completedAt?: Timestamp;

  // Organization
  category?: TaskCategory;
  tags?: string[];

  // Metadata
  estimatedMinutes?: number;
}

// =============================================================================
// Frontend-Optimized Types
// =============================================================================

/**
 * Task for React components - dates converted to JavaScript Date objects
 *
 * This type is optimized for frontend use:
 * - Date objects for easy manipulation in components
 * - Optional fields clearly marked
 * - Ready for form libraries and date pickers
 */
export interface TaskUI {
  id: string;
  title: string;
  description?: string;

  status: TaskStatus;
  priority: TaskPriority;

  // Dates as JavaScript Date objects for frontend use
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  completedAt?: Date;

  category?: TaskCategory;
  tags?: string[];
  estimatedMinutes?: number;
}

// =============================================================================
// Form Input Types
// =============================================================================

/**
 * Task creation form input
 *
 * Only includes fields that user can set during creation.
 * Timestamps and computed fields are excluded.
 */
export interface CreateTaskInput {
  title: string;
  description?: string;
  priority: TaskPriority;
  dueDate?: Date;
  category?: TaskCategory;
  tags?: string[];
  estimatedMinutes?: number;
}

/**
 * Task update form input
 *
 * All fields optional except those that should never be undefined.
 * Allows partial updates while maintaining type safety.
 */
export interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: Date;
  category?: TaskCategory;
  tags?: string[];
  estimatedMinutes?: number;
}

/**
 * Quick task creation - minimal required fields
 *
 * For rapid task entry (just title and auto-set defaults)
 */
export interface QuickCreateTaskInput {
  title: string;
  priority?: TaskPriority; // Optional, defaults to 'medium'
}

// =============================================================================
// API Response Types
// =============================================================================

/**
 * Task API response wrapper
 *
 * Standardizes how our API layer returns task data
 */
export interface TaskResponse {
  data: Task;
  success: boolean;
  message?: string;
}

/**
 * Multiple tasks API response
 */
export interface TasksResponse {
  data: Task[];
  total: number;
  page?: number;
  success: boolean;
  message?: string;
}

// =============================================================================
// Query & Filter Types
// =============================================================================

/**
 * Task filters for queries
 *
 * Used by React Query hooks and search components
 */
export interface TaskFilters {
  status?: TaskStatus[];
  priority?: TaskPriority[];
  category?: TaskCategory[];
  dueDateRange?: {
    start: Date;
    end: Date;
  };
  tags?: string[];
  search?: string;
}

/**
 * Task sorting options
 */
export interface TaskSort {
  field: "createdAt" | "updatedAt" | "dueDate" | "priority" | "title";
  direction: "asc" | "desc";
}

/**
 * Complete task query parameters
 *
 * Combines filters, sorting, and pagination
 */
export interface TaskQueryParams {
  filters?: TaskFilters;
  sort?: TaskSort;
  limit?: number;
  cursor?: string; // For pagination
}

// =============================================================================
// Utility Types
// =============================================================================

/**
 * Task status transition map
 *
 * Defines which status changes are valid - useful for UI state management
 */
export type TaskStatusTransitions = {
  [K in TaskStatus]: TaskStatus[];
};

/**
 * Task statistics
 *
 * For dashboard displays and progress tracking
 */
export interface TaskStats {
  total: number;
  byStatus: Record<TaskStatus, number>;
  byPriority: Record<TaskPriority, number>;
  overdue: number;
  dueToday: number;
  dueThisWeek: number;
}

// =============================================================================
// Error Types
// =============================================================================

/**
 * Task-specific error types
 *
 * Helps with error handling in React components
 */
export interface TaskError {
  code: "NOT_FOUND" | "VALIDATION_ERROR" | "PERMISSION_DENIED" | "UNKNOWN";
  message: string;
  field?: string; // For form validation errors
}

// =============================================================================
// Constants
// =============================================================================

/**
 * Task status constants with display labels
 *
 * Useful for dropdowns, filters, and display components
 */
export const TASK_STATUSES: Record<TaskStatus, { label: string; color: string }> = {
  todo: { label: "To Do", color: "gray" },
  "in-progress": { label: "In Progress", color: "blue" },
  completed: { label: "Completed", color: "green" },
} as const;

/**
 * Task priority constants with display labels and sort order
 */
export const TASK_PRIORITIES: Record<TaskPriority, { label: string; color: string; order: number }> = {
  low: { label: "Low", color: "gray", order: 1 },
  medium: { label: "Medium", color: "yellow", order: 2 },
  high: { label: "High", color: "orange", order: 3 },
  urgent: { label: "Urgent", color: "red", order: 4 },
} as const;

/**
 * Default values for task creation
 */
export const TASK_DEFAULTS: Pick<Task, "status" | "priority"> = {
  status: "todo",
  priority: "medium",
} as const;
