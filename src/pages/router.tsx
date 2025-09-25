import { AuthGuard } from "@components/guards/AuthGuard";
import { GuestGuard } from "@components/guards/GuestGuard";
import NotFound from "@pages/not-found";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { LoginPage } from "@/pages/auth/LoginPage";
import { SignUpPage } from "@/pages/auth/SignUpPage";
import { DashboardPage } from "@/pages/home/DashboardPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route element={<AuthGuard />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        <Route element={<GuestGuard />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
