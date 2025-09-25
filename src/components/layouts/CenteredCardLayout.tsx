// Generic centered card layout - reusable across different features
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card";

interface CenteredCardLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

export function CenteredCardLayout({ title, subtitle, children, footer, maxWidth = "md" }: CenteredCardLayoutProps) {
  const widthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className={`w-full ${widthClasses[maxWidth]} space-y-6`}>
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
