import { Button } from "@components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card";
import { useAuth, useAuthActions } from "@features/auth/hooks";

export function DashboardPage() {
  const { user, isSigningOut } = useAuth();
  const { signOut } = useAuthActions();

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="font-bold text-3xl text-gray-900">Task Manager Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome back, {user?.displayName || user?.email}!</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Your Tasks</CardTitle>
              <CardDescription>Manage your daily tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-bold text-2xl text-blue-600">0</p>
              <p className="text-gray-600 text-sm">tasks pending</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Completed</CardTitle>
              <CardDescription>Tasks you've finished</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-bold text-2xl text-green-600">0</p>
              <p className="text-gray-600 text-sm">tasks completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Get started quickly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full">Create New Task</Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={signOut}
                disabled={isSigningOut}
              >
                {isSigningOut ? "Signing Out..." : "Sign Out"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
