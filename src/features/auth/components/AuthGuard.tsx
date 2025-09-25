// Interview Question #52: Route protection patterns with loading states

import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks";

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
  fallback?: React.ReactNode;
}

/**
 * AuthGuard component for protecting routes
 * Shows loading state while Firebase initializes, redirects if not authenticated
 */
export function AuthGuard({
  children,
  redirectTo = "/login",
  fallback = <div className="flex min-h-screen items-center justify-center">Loading...</div>
}: AuthGuardProps) {
  const { user, isLoading } = useAuth();

  // Show loading state while Firebase auth initializes
  if (isLoading) {
    return <>{fallback}</>;
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  // User is authenticated, render protected content
  return <>{children}</>;
}

/**
 * Inverse guard - only allows access to unauthenticated users
 * Useful for login/signup pages to redirect already logged in users
 */
export function GuestGuard({
  children,
  redirectTo = "/dashboard",
  fallback = <div className="flex min-h-screen items-center justify-center">Loading...</div>
}: AuthGuardProps) {
  const { user, isLoading } = useAuth();

  // Show loading state while Firebase auth initializes
  if (isLoading) {
    return <>{fallback}</>;
  }

  // Redirect to dashboard if already authenticated
  if (user) {
    return <Navigate to={redirectTo} replace />;
  }

  // User is not authenticated, render guest content
  return <>{children}</>;
}