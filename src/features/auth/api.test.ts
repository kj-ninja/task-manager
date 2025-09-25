// Interview Question #43: Testing async functions and mocking external services with Bun
import { beforeEach, describe, expect, mock, test } from "bun:test";

// Interview Question #89: Bun's native mocking system
const mockAuth: { currentUser: any } = {
  currentUser: null,
};

const mockFirebaseUser = {
  uid: "test-uid",
  email: "test@example.com",
  displayName: "Test User",
  photoURL: "https://example.com/photo.jpg",
  emailVerified: true,
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

    expect(result).toEqual({
      id: mockFirebaseUser.uid,
      email: mockFirebaseUser.email,
      displayName: mockFirebaseUser.displayName,
      photoURL: mockFirebaseUser.photoURL,
      emailVerified: mockFirebaseUser.emailVerified,
    });
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
    } catch (error: any) {
      expect(error).toEqual({
        code: "auth/invalid-credential",
        message: "Invalid email or password",
        type: "auth",
      });
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
    expect(result).toEqual({
      id: mockFirebaseUser.uid,
      email: mockFirebaseUser.email,
      displayName: mockFirebaseUser.displayName,
      photoURL: mockFirebaseUser.photoURL,
      emailVerified: mockFirebaseUser.emailVerified,
    });
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

    expect(result).toEqual({
      id: mockFirebaseUser.uid,
      email: mockFirebaseUser.email,
      displayName: mockFirebaseUser.displayName,
      photoURL: mockFirebaseUser.photoURL,
      emailVerified: mockFirebaseUser.emailVerified,
    });
  });

  test("should return null when no user is signed in", async () => {
    const { authApi } = await import("./api");

    mockAuth.currentUser = null;

    const result = authApi.getCurrentUser();

    expect(result).toBeNull();
  });
});
