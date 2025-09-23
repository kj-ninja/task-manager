import AppRouter from "@pages/router"
import { queryClient } from "@services/query-client"
import { QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast"

function App() {
  // TODO: Add authentication state check
  const isAuthenticated = false

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen w-full bg-gray-50">
        <AppRouter isAuthenticated={isAuthenticated} />
        <Toaster position="top-right" />
      </div>
    </QueryClientProvider>
  )
}

export default App
