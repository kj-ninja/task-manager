import { DashboardPage } from "@pages/DashboardPage";
import NotFound from "@pages/not-found";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { LoginPage } from "@/pages/auth/LoginPage";
import { SignUpPage } from "@/pages/auth/SignUpPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
