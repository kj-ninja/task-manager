import { CenteredCardLayout } from "@components/layouts/CenteredCardLayout";
import { LoginForm } from "@features/auth/components/LoginForm";
import { useAuth, useAuthActions } from "@features/auth/hooks";
import { Link } from "react-router-dom";

export function LoginPage() {
  const { signIn } = useAuthActions();
  const { isSigningIn, error } = useAuth();

  return (
    <CenteredCardLayout
      title="Welcome Back"
      subtitle="Sign in to your account"
      footer={
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
            Sign up here
          </Link>
        </p>
      }
    >
      <LoginForm onSubmit={signIn} isLoading={isSigningIn} />
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-red-800 text-sm">{error.message}</p>
        </div>
      )}
    </CenteredCardLayout>
  );
}
