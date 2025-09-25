import { LoadingScreen } from "@components/ui/spinner";
import { useAuthInitialization, useAuthInitializer } from "@features/auth/hooks";
import AppRouter from "@pages/router";
import { queryClient } from "@services/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

function App() {
  useAuthInitializer();
  const { isInitialized } = useAuthInitialization();

  if (!isInitialized) {
    return <LoadingScreen message="Initializing..." />;
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
