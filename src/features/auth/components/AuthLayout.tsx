// Interview Question #38: Component composition patterns for reusable layouts
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card";

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">{title}</CardTitle>
            {subtitle && (
              <CardDescription className="text-gray-600">{subtitle}</CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {children}
          </CardContent>
        </Card>
        {footer && (
          <div className="text-center text-sm text-gray-600">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}