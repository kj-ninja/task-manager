// Interview Question #89: Firebase v9+ modular SDK patterns

import { auth } from "@services/firebase";
import {
  createUserWithEmailAndPassword,
  type User as FirebaseUser,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import type { AuthError, SignInCredentials, SignUpCredentials, User } from "./types";

// Interview Question #49: Error handling and user experience
function mapFirebaseError(error: unknown): AuthError {
  const code = (error as any)?.code || "unknown";

  switch (code) {
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return {
        code,
        message: "Invalid email or password",
        type: "auth",
      };
    case "auth/email-already-in-use":
      return {
        code,
        message: "An account with this email already exists",
        type: "auth",
      };
    case "auth/weak-password":
      return {
        code,
        message: "Password should be at least 6 characters",
        type: "auth",
      };
    case "auth/invalid-email":
      return {
        code,
        message: "Invalid email address",
        type: "auth",
      };
    case "auth/too-many-requests":
      return {
        code,
        message: "Too many failed attempts. Please try again later",
        type: "auth",
      };
    case "auth/network-request-failed":
      return {
        code,
        message: "Network error. Please check your connection",
        type: "network",
      };
    default:
      return {
        code: "unknown",
        message: "An unexpected error occurred",
        type: "unknown",
      };
  }
}

// Interview Question #43: Testing async functions - convert Firebase User to our User type
function mapFirebaseUser(firebaseUser: FirebaseUser): User {
  return {
    id: firebaseUser.uid,
    email: firebaseUser.email!,
    displayName: firebaseUser.displayName || undefined,
    photoURL: firebaseUser.photoURL || undefined,
    emailVerified: firebaseUser.emailVerified,
  };
}

export const authApi = {
  // Interview Question #21: Async/await patterns and error handling
  async signInWithEmail(credentials: SignInCredentials): Promise<User> {
    try {
      const result = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
      return mapFirebaseUser(result.user);
    } catch (error) {
      throw mapFirebaseError(error);
    }
  },

  async signUpWithEmail(credentials: SignUpCredentials): Promise<User> {
    try {
      const result = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);

      // Update display name if provided
      if (credentials.displayName) {
        await updateProfile(result.user, {
          displayName: credentials.displayName,
        });
      }

      return mapFirebaseUser(result.user);
    } catch (error) {
      throw mapFirebaseError(error);
    }
  },

  // Interview Question #89: Third-party authentication integration
  async signInWithGoogle(): Promise<User> {
    try {
      const provider = new GoogleAuthProvider();
      // Add scopes if needed: provider.addScope('email')

      const result = await signInWithPopup(auth, provider);
      return mapFirebaseUser(result.user);
    } catch (error) {
      // Handle user cancellation gracefully
      if ((error as any)?.code === "auth/popup-closed-by-user") {
        throw {
          code: "auth/popup-closed-by-user",
          message: "Sign-in cancelled",
          type: "auth",
        } as AuthError;
      }
      throw mapFirebaseError(error);
    }
  },

  async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      throw mapFirebaseError(error);
    }
  },

  // Interview Question #15: Type guards and null checking
  getCurrentUser(): User | null {
    const firebaseUser = auth.currentUser;
    return firebaseUser ? mapFirebaseUser(firebaseUser) : null;
  },
};
