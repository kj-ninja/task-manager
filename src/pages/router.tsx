import { DashboardPage } from "@pages/DashboardPage";
import { LoginPage } from "@pages/LoginPage";
import NotFound from "@pages/not-found";
import { SignUpPage } from "@pages/SignUpPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

interface AppRouterProps {
  isAuthenticated: boolean;
}

export default function AppRouter({ isAuthenticated }: AppRouterProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />} />
        <Route path="/signup" element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/dashboard" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
