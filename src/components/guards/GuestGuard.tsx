import { useAuth } from "@features/auth/hooks";
import { Navigate, Outlet } from "react-router-dom";

import { LoadingScreen } from "../ui/spinner";

export function GuestGuard() {
  const { user, isLoading } = useAuth();

  // Show loading screen while Firebase auth initializes
  if (isLoading) {
    return <LoadingScreen message="Loading..." />;
  }

  // Redirect to dashboard if already authenticated
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // User is not authenticated, render child routes
  return <Outlet />;
}
