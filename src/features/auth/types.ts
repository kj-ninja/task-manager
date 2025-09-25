// Interview Question #13: TypeScript discriminated unions for better error handling
export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  emailVerified?: boolean;
}

// Interview Question #47: Form validation and credential types
export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  email: string;
  password: string;
  displayName?: string;
}

// Interview Question #49: Error handling strategies
export interface AuthError {
  code: string;
  message: string;
  type: "auth" | "network" | "unknown";
}

// Interview Question #15: State management with loading states per action
export interface AuthState {
  user: User | null;
  loading: {
    signIn: boolean;
    signUp: boolean;
    signOut: boolean;
    initialize: boolean;
  };
  error: AuthError | null;
}

// Interview Question #89: Firebase Auth provider types
export type AuthProvider = "email" | "google";
