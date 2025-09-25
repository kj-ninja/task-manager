// Interview Question #43: Testing async functions and mocking external services with Bun
import { beforeEach, describe, expect, mock, test } from "bun:test";

import type { AuthError, User } from "./types";

// Interview Question #13: Creating precise mock types instead of `any`
type MockFirebaseUser = {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
};

// Interview Question #89: Type-safe mocking system
const mockAuth: { currentUser: MockFirebaseUser | null } = {
  currentUser: null,
};

// Interview Question #43: Using real types in tests ensures type safety
const mockFirebaseUser: MockFirebaseUser = {
  uid: "test-uid",
  email: "test@example.com",
  displayName: "Test User",
  photoURL: "https://example.com/photo.jpg",
  emailVerified: true,
};

// Our expected User object after transformation
const expectedUser: User = {
  id: "test-uid",
  email: "test@example.com",
  displayName: "Test User",
  photoURL: "https://example.com/photo.jpg",
  emailVerified: true,
};

// Expected error response after our transformation
const expectedAuthError: AuthError = {
  code: "auth/invalid-credential",
  message: "Invalid email or password",
  type: "auth",
};

const mockSignInWithEmailAndPassword = mock(() => Promise.resolve({ user: mockFirebaseUser }));
const mockCreateUserWithEmailAndPassword = mock(() => Promise.resolve({ user: mockFirebaseUser }));
const mockSignInWithPopup = mock(() => Promise.resolve({ user: mockFirebaseUser }));
const mockSignOut = mock(() => Promise.resolve());
const mockUpdateProfile = mock(() => Promise.resolve());

// Mock the Firebase auth module
mock.module("firebase/auth", () => ({
  signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
  createUserWithEmailAndPassword: mockCreateUserWithEmailAndPassword,
  signInWithPopup: mockSignInWithPopup,
  signOut: mockSignOut,
  updateProfile: mockUpdateProfile,
  GoogleAuthProvider: class MockGoogleAuthProvider {},
}));

// Mock the Firebase service
mock.module("@services/firebase", () => ({
  auth: mockAuth,
}));

describe("Auth API", () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockSignInWithEmailAndPassword.mockClear();
    mockCreateUserWithEmailAndPassword.mockClear();
    mockSignInWithPopup.mockClear();
    mockSignOut.mockClear();
    mockUpdateProfile.mockClear();
    mockAuth.currentUser = null;
  });

  test("should sign in with email successfully", async () => {
    // Dynamic import after mocking
    const { authApi } = await import("./api");

    const credentials = {
      email: "test@example.com",
      password: "password123",
    };

    const result = await authApi.signInWithEmail(credentials);

    expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(mockAuth, credentials.email, credentials.password);

    expect(result).toEqual(expectedUser);
  });

  test("should handle sign in error", async () => {
    const { authApi } = await import("./api");

    const firebaseError = {
      code: "auth/invalid-credential",
      message: "Invalid credential",
    };

    mockSignInWithEmailAndPassword.mockRejectedValue(firebaseError);

    const credentials = {
      email: "test@example.com",
      password: "wrongpassword",
    };

    try {
      await authApi.signInWithEmail(credentials);
      expect(false).toBe(true); // Should not reach here
    } catch (error) {
      expect(error).toEqual(expectedAuthError);
    }
  });

  test("should sign up with email successfully", async () => {
    const { authApi } = await import("./api");

    const credentials = {
      email: "new@example.com",
      password: "password123",
      displayName: "New User",
    };

    await authApi.signUpWithEmail(credentials);

    expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalledWith(mockAuth, credentials.email, credentials.password);

    expect(mockUpdateProfile).toHaveBeenCalledWith(mockFirebaseUser, {
      displayName: credentials.displayName,
    });
  });

  test("should sign in with Google successfully", async () => {
    const { authApi } = await import("./api");

    const result = await authApi.signInWithGoogle();

    expect(mockSignInWithPopup).toHaveBeenCalled();
    expect(result).toEqual(expectedUser);
  });

  test("should sign out successfully", async () => {
    const { authApi } = await import("./api");

    await authApi.signOut();

    expect(mockSignOut).toHaveBeenCalledWith(mockAuth);
  });

  test("should return current user when signed in", async () => {
    const { authApi } = await import("./api");

    mockAuth.currentUser = mockFirebaseUser;

    const result = authApi.getCurrentUser();

    expect(result).toEqual(expectedUser);
  });

  test("should return null when no user is signed in", async () => {
    const { authApi } = await import("./api");

    mockAuth.currentUser = null;

    const result = authApi.getCurrentUser();

    expect(result).toBeNull();
  });

  test("should handle user without optional fields", async () => {
    // Interview Question #15: Testing edge cases with our real User type
    const { authApi } = await import("./api");

    const minimalFirebaseUser: MockFirebaseUser = {
      uid: "minimal-user",
      email: "minimal@example.com",
      displayName: null, // Test null handling
      photoURL: null, // Test null handling
      emailVerified: false,
    };

    const expectedMinimalUser: User = {
      id: "minimal-user",
      email: "minimal@example.com",
      displayName: undefined, // Our API converts null to undefined
      photoURL: undefined, // Our API converts null to undefined
      emailVerified: false,
    };

    mockAuth.currentUser = minimalFirebaseUser;

    const result = authApi.getCurrentUser();

    expect(result).toEqual(expectedMinimalUser);
  });
});
