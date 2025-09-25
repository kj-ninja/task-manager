import { AuthLayout } from "@features/auth/components/AuthLayout";
import { SignUpForm } from "@features/auth/components/SignUpForm";
import type { SignUpFormData } from "@features/auth/schemas";
import { Link } from "react-router-dom";

export function SignUpPage() {
  // Temporary handler - we'll connect to Firebase next
  const handleSignUp = async (data: SignUpFormData) => {
    console.log("Sign up data:", data);
    // TODO: Connect to Firebase auth
    alert(`Creating account for: ${data.email}`);
  };

  return (
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
      <SignUpForm onSubmit={handleSignUp} />
    </AuthLayout>
  );
}
