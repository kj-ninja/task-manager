import { useAuth } from "@features/auth/hooks";
import { Navigate, Outlet } from "react-router-dom";

import { LoadingScreen } from "../ui/spinner";
export function AuthGuard() {
  const { user, isLoading } = useAuth();

  // Show loading screen while Firebase auth initializes
  if (isLoading) {
    return <LoadingScreen message="Loading..." />;
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // User is authenticated, render child routes
  return <Outlet />;
}
