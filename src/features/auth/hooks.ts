// Interview Question #49: Custom hooks for auth state management
// Clean abstraction layer between components and Zustand store
import { useEffect } from "react";

import { useAuthStore } from "./store";

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);

  return {
    user,
    isAuthenticated: !!user,
    error,
    isLoading: loading.initialize,
    isSigningIn: loading.signIn,
    isSigningUp: loading.signUp,
    isSigningOut: loading.signOut,
  };
}

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

export function useAuthInitialization() {
  const isInitialized = useAuthStore((state) => !state.loading.initialize);
  return { isInitialized };
}

export function useAuthInitializer() {
  useEffect(() => {
    useAuthStore.getState().initialize();
  }, []);
}
