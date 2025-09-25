import { AuthLayout } from "@features/auth/components/AuthLayout";
import { GuestGuard } from "@features/auth/components/AuthGuard";
import { SignUpForm } from "@features/auth/components/SignUpForm";
import { useAuth, useAuthActions } from "@features/auth/hooks";
import { Link } from "react-router-dom";

export function SignUpPage() {
  const { signUp } = useAuthActions();
  const { isSigningUp, error } = useAuth();

  return (
    <GuestGuard>
      <AuthLayout
        title="Create Account"
        subtitle="Sign up to get started with Task Manager"
        footer={
          <p>
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in here
            </Link>
          </p>
        }
      >
        <SignUpForm onSubmit={signUp} isLoading={isSigningUp} />
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-red-800 text-sm">{error.message}</p>
          </div>
        )}
      </AuthLayout>
    </GuestGuard>
  );
}
