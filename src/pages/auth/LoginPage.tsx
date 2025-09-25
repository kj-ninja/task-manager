import { AuthLayout } from "@features/auth/components/AuthLayout";
import { LoginForm } from "@features/auth/components/LoginForm";
import type { LoginFormData } from "@features/auth/schemas";
import { Link } from "react-router-dom";

export function LoginPage() {
  // Temporary handler - we'll connect to Firebase next
  const handleLogin = async (data: LoginFormData) => {
    console.log("Login data:", data);
    // TODO: Connect to Firebase auth
    alert(`Logging in: ${data.email}`);
  };

  return (
    <AuthLayout
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
      <LoginForm onSubmit={handleLogin} />
    </AuthLayout>
  );
}
