import { useAuthInitialization } from "@features/auth/hooks";
import { initializeAuth } from "@features/auth/init";
import AppRouter from "@pages/router";
import { queryClient } from "@services/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

function App() {
  const { isInitialized } = useAuthInitialization();

  // Initialize Firebase auth listener on app start
  useEffect(() => {
    initializeAuth();
  }, []);

  // Show loading screen until Firebase auth initializes
  if (!isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen w-full bg-gray-50">
        <AppRouter />
        <Toaster position="top-right" />
      </div>
    </QueryClientProvider>
  );
}

export default App;
