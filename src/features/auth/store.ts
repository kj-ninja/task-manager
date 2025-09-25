// Interview Question #15: Zustand state management patterns

import { auth } from "@services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { create } from "zustand";

import { authApi } from "./api";
import type { AuthError, AuthState, SignInCredentials, SignUpCredentials, User } from "./types";

// Interview Question #21: State management with actions and loading states
interface AuthStore extends AuthState {
  // Actions
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  // Initial state
  user: null,
  loading: {
    signIn: false,
    signUp: false,
    signOut: false,
    initialize: true,
  },
  error: null,

  // Interview Question #49: Async actions with proper error handling
  signIn: async (credentials) => {
    set((state) => ({
      loading: { ...state.loading, signIn: true },
      error: null,
    }));

    try {
      const user = await authApi.signInWithEmail(credentials);
      set((state) => ({
        user,
        loading: { ...state.loading, signIn: false },
        error: null,
      }));
    } catch (error) {
      set((state) => ({
        loading: { ...state.loading, signIn: false },
        error: error as AuthError,
      }));
      throw error; // Re-throw for component error handling
    }
  },

  signUp: async (credentials) => {
    set((state) => ({
      loading: { ...state.loading, signUp: true },
      error: null,
    }));

    try {
      const user = await authApi.signUpWithEmail(credentials);
      set((state) => ({
        user,
        loading: { ...state.loading, signUp: false },
        error: null,
      }));
    } catch (error) {
      set((state) => ({
        loading: { ...state.loading, signUp: false },
        error: error as AuthError,
      }));
      throw error;
    }
  },

  signInWithGoogle: async () => {
    set((state) => ({
      loading: { ...state.loading, signIn: true },
      error: null,
    }));

    try {
      const user = await authApi.signInWithGoogle();
      set((state) => ({
        user,
        loading: { ...state.loading, signIn: false },
        error: null,
      }));
    } catch (error) {
      set((state) => ({
        loading: { ...state.loading, signIn: false },
        error: error as AuthError,
      }));
      throw error;
    }
  },

  signOut: async () => {
    set((state) => ({
      loading: { ...state.loading, signOut: true },
      error: null,
    }));

    try {
      await authApi.signOut();
      set((state) => ({
        user: null,
        loading: { ...state.loading, signOut: false },
        error: null,
      }));
    } catch (error) {
      set((state) => ({
        loading: { ...state.loading, signOut: false },
        error: error as AuthError,
      }));
      throw error;
    }
  },

  // Interview Question #89: Firebase auth state persistence
  initialize: () => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const user: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email!,
          displayName: firebaseUser.displayName || undefined,
          photoURL: firebaseUser.photoURL || undefined,
          emailVerified: firebaseUser.emailVerified,
        };

        set((state) => ({
          user,
          loading: { ...state.loading, initialize: false },
          error: null,
        }));
      } else {
        set((state) => ({
          user: null,
          loading: { ...state.loading, initialize: false },
          error: null,
        }));
      }
    });

    // Store unsubscribe function for cleanup
    (get as any)._unsubscribe = unsubscribe;
  },

  clearError: () => {
    set({ error: null });
  },
}));
