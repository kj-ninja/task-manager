import { Outlet, useLocation } from "react-router-dom";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { AppSidebar } from "./AppSidebar";
import { UserDropdown } from "./UserDropdown";

export function AppLayout() {
  const location = useLocation();

  const getPageTitle = (pathname: string) => {
    switch (pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/tasks":
        return "Tasks";
      case "/calendar":
        return "Calendar";
      case "/settings":
        return "Settings";
      default:
        return "Dashboard";
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex flex-1 flex-col">
          {/* Header with sidebar trigger and user dropdown */}
          <header className="flex h-16 items-center justify-between gap-4 border-b bg-background px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h2 className="font-semibold text-lg">{getPageTitle(location.pathname)}</h2>
            </div>
            <UserDropdown />
          </header>

          {/* Page content */}
          <div className="flex-1 p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
