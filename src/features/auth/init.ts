// Interview Question #89: App initialization patterns with Firebase auth

import { useAuthStore } from "./store";

/**
 * Initialize Firebase auth listener
 * Should be called once at app startup
 */
export function initializeAuth(): void {
  useAuthStore.getState().initialize();
}

/**
 * Cleanup auth listeners (for testing or app unmount)
 */
export function cleanupAuth(): void {
  const store = useAuthStore.getState() as any;
  if (store._unsubscribe) {
    store._unsubscribe();
  }
}