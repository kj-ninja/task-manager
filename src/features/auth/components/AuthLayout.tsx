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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="font-bold text-2xl text-gray-900">{title}</CardTitle>
            {subtitle && <CardDescription className="text-gray-600">{subtitle}</CardDescription>}
          </CardHeader>
          <CardContent className="space-y-6">{children}</CardContent>
        </Card>
        {footer && <div className="text-center text-gray-600 text-sm">{footer}</div>}
      </div>
    </div>
  );
}
