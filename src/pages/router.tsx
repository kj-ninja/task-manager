import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import Auth from "@pages/auth"
import Dashboard from "@pages/dashboard"
import NotFound from "@pages/not-found"

interface AppRouterProps {
  isAuthenticated: boolean
}

export default function AppRouter({ isAuthenticated }: AppRouterProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/auth" />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={!isAuthenticated ? <Auth /> : <Navigate to="/dashboard" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
