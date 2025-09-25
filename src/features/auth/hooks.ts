// Interview Question #49: Custom hooks for auth state management
// Clean abstraction layer between components and Zustand store

import { useAuthStore } from "./store";

/**
 * Primary auth hook - Used by most components
 * Returns auth state and computed values for better UX
 */
export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);

  return {
    // Core state
    user,
    isAuthenticated: !!user,
    error,

    // Loading states for granular UI control
    isLoading: loading.initialize,
    isSigningIn: loading.signIn,
    isSigningUp: loading.signUp,
    isSigningOut: loading.signOut,
  };
}

/**
 * Auth actions hook - Used by forms and navigation
 * Returns only action functions to avoid unnecessary re-renders
 */
export function useAuthActions() {
  const signIn = useAuthStore((state) => state.signIn);
  const signUp = useAuthStore((state) => state.signUp);
  const signOut = useAuthStore((state) => state.signOut);
  const clearError = useAuthStore((state) => state.clearError);

  return {
    signIn,
    signUp,
    signOut,
    clearError,
  };
}

/**
 * Initialize auth hook - Used by app root
 * Returns initialization state for app-level loading
 */
export function useAuthInitialization() {
  const isInitialized = useAuthStore((state) => !state.loading.initialize);
  return { isInitialized };
}
