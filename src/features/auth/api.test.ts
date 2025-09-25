// Interview Question #43: Testing async functions and mocking external services
import { beforeEach, describe, expect, jest, test } from "bun:test";

import { authApi } from "./api";
import type { AuthError } from "./types";

// Interview Question #89: Mocking Firebase auth methods
const mockSignInWithEmailAndPassword = jest.fn();
const mockCreateUserWithEmailAndPassword = jest.fn();
const mockSignInWithPopup = jest.fn();
const mockSignOut = jest.fn();
const mockUpdateProfile = jest.fn();

// Mock Firebase auth module
jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
  createUserWithEmailAndPassword: mockCreateUserWithEmailAndPassword,
  signInWithPopup: mockSignInWithPopup,
  signOut: mockSignOut,
  updateProfile: mockUpdateProfile,
  GoogleAuthProvider: jest.fn(),
}));

// Mock Firebase service
jest.mock("@services/firebase", () => ({
  auth: { currentUser: null },
}));

describe("authApi", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("signInWithEmail", () => {
    test("should sign in successfully", async () => {
      // Interview Question #21: Testing async/await patterns
      const mockUser = {
        uid: "test-uid",
        email: "test@example.com",
        displayName: "Test User",
        photoURL: "https://example.com/photo.jpg",
        emailVerified: true,
      };

      mockSignInWithEmailAndPassword.mockResolvedValue({
        user: mockUser,
      });

      const credentials = {
        email: "test@example.com",
        password: "password123",
      };

      const result = await authApi.signInWithEmail(credentials);

      expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.any(Object), // auth object
        credentials.email,
        credentials.password
      );

      expect(result).toEqual({
        id: mockUser.uid,
        email: mockUser.email,
        displayName: mockUser.displayName,
        photoURL: mockUser.photoURL,
        emailVerified: mockUser.emailVerified,
      });
    });

    test("should handle invalid credentials error", async () => {
      // Interview Question #49: Error handling strategies
      const firebaseError = {
        code: "auth/invalid-credential",
        message: "Invalid credential",
      };

      mockSignInWithEmailAndPassword.mockRejectedValue(firebaseError);

      const credentials = {
        email: "test@example.com",
        password: "wrongpassword",
      };

      await expect(authApi.signInWithEmail(credentials)).rejects.toEqual({
        code: "auth/invalid-credential",
        message: "Invalid email or password",
        type: "auth",
      } as AuthError);
    });

    test("should handle network error", async () => {
      const firebaseError = {
        code: "auth/network-request-failed",
        message: "Network error",
      };

      mockSignInWithEmailAndPassword.mockRejectedValue(firebaseError);

      const credentials = {
        email: "test@example.com",
        password: "password123",
      };

      await expect(authApi.signInWithEmail(credentials)).rejects.toEqual({
        code: "auth/network-request-failed",
        message: "Network error. Please check your connection",
        type: "network",
      } as AuthError);
    });
  });

  describe("signUpWithEmail", () => {
    test("should sign up successfully without display name", async () => {
      const mockUser = {
        uid: "new-user-uid",
        email: "new@example.com",
        displayName: null,
        photoURL: null,
        emailVerified: false,
      };

      mockCreateUserWithEmailAndPassword.mockResolvedValue({
        user: mockUser,
      });

      const credentials = {
        email: "new@example.com",
        password: "password123",
      };

      const result = await authApi.signUpWithEmail(credentials);

      expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalledWith(
        expect.any(Object),
        credentials.email,
        credentials.password
      );

      expect(mockUpdateProfile).not.toHaveBeenCalled();

      expect(result).toEqual({
        id: mockUser.uid,
        email: mockUser.email,
        displayName: undefined,
        photoURL: undefined,
        emailVerified: mockUser.emailVerified,
      });
    });

    test("should sign up successfully with display name", async () => {
      const mockUser = {
        uid: "new-user-uid",
        email: "new@example.com",
        displayName: null,
        photoURL: null,
        emailVerified: false,
      };

      mockCreateUserWithEmailAndPassword.mockResolvedValue({
        user: mockUser,
      });
      mockUpdateProfile.mockResolvedValue(undefined);

      const credentials = {
        email: "new@example.com",
        password: "password123",
        displayName: "New User",
      };

      await authApi.signUpWithEmail(credentials);

      expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalledWith(
        expect.any(Object),
        credentials.email,
        credentials.password
      );

      expect(mockUpdateProfile).toHaveBeenCalledWith(mockUser, {
        displayName: credentials.displayName,
      });
    });

    test("should handle email already in use error", async () => {
      const firebaseError = {
        code: "auth/email-already-in-use",
        message: "Email already in use",
      };

      mockCreateUserWithEmailAndPassword.mockRejectedValue(firebaseError);

      const credentials = {
        email: "existing@example.com",
        password: "password123",
      };

      await expect(authApi.signUpWithEmail(credentials)).rejects.toEqual({
        code: "auth/email-already-in-use",
        message: "An account with this email already exists",
        type: "auth",
      } as AuthError);
    });
  });

  describe("signInWithGoogle", () => {
    test("should sign in with Google successfully", async () => {
      const mockUser = {
        uid: "google-user-uid",
        email: "google@example.com",
        displayName: "Google User",
        photoURL: "https://lh3.googleusercontent.com/photo",
        emailVerified: true,
      };

      mockSignInWithPopup.mockResolvedValue({
        user: mockUser,
      });

      const result = await authApi.signInWithGoogle();

      expect(mockSignInWithPopup).toHaveBeenCalledWith(
        expect.any(Object), // auth
        expect.any(Object) // GoogleAuthProvider instance
      );

      expect(result).toEqual({
        id: mockUser.uid,
        email: mockUser.email,
        displayName: mockUser.displayName,
        photoURL: mockUser.photoURL,
        emailVerified: mockUser.emailVerified,
      });
    });

    test("should handle popup closed by user", async () => {
      const firebaseError = {
        code: "auth/popup-closed-by-user",
        message: "Popup closed",
      };

      mockSignInWithPopup.mockRejectedValue(firebaseError);

      await expect(authApi.signInWithGoogle()).rejects.toEqual({
        code: "auth/popup-closed-by-user",
        message: "Sign-in cancelled",
        type: "auth",
      } as AuthError);
    });
  });

  describe("signOut", () => {
    test("should sign out successfully", async () => {
      mockSignOut.mockResolvedValue(undefined);

      await authApi.signOut();

      expect(mockSignOut).toHaveBeenCalledWith(expect.any(Object));
    });

    test("should handle sign out error", async () => {
      const firebaseError = {
        code: "auth/too-many-requests",
        message: "Too many requests",
      };

      mockSignOut.mockRejectedValue(firebaseError);

      await expect(authApi.signOut()).rejects.toEqual({
        code: "auth/too-many-requests",
        message: "Too many failed attempts. Please try again later",
        type: "auth",
      } as AuthError);
    });
  });

  describe("getCurrentUser", () => {
    test("should return null when no user is signed in", () => {
      const result = authApi.getCurrentUser();
      expect(result).toBeNull();
    });

    test("should return current user when signed in", () => {
      const mockFirebaseUser = {
        uid: "current-user-uid",
        email: "current@example.com",
        displayName: "Current User",
        photoURL: null,
        emailVerified: true,
      };

      // Mock auth.currentUser
      jest.doMock("@services/firebase", () => ({
        auth: { currentUser: mockFirebaseUser },
      }));

      // Re-import to get mocked version
      const { auth } = require("@services/firebase");
      auth.currentUser = mockFirebaseUser;

      const result = authApi.getCurrentUser();

      expect(result).toEqual({
        id: mockFirebaseUser.uid,
        email: mockFirebaseUser.email,
        displayName: mockFirebaseUser.displayName,
        photoURL: undefined,
        emailVerified: mockFirebaseUser.emailVerified,
      });
    });
  });
});