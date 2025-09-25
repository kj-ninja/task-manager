import { z } from "zod";

// Interview Question #53: Environment variable security
// This demonstrates secure environment configuration patterns:
// 1. Type-safe validation using Zod schemas
// 2. Build-time vs runtime environment variable handling
// 3. Fail-fast validation on application startup
// 4. Clear error messages for missing configuration

// Interview Question #12: Pragmatic validation vs over-engineering
// Simple validation - just check required fields exist, skip complex regex patterns
const envSchema = z.object({
  // Firebase - just ensure they exist
  VITE_FIREBASE_API_KEY: z.string().min(1, "Firebase API key required"),
  VITE_FIREBASE_AUTH_DOMAIN: z.string().min(1, "Firebase auth domain required"),
  VITE_FIREBASE_PROJECT_ID: z.string().min(1, "Firebase project ID required"),
  VITE_FIREBASE_STORAGE_BUCKET: z.string().min(1, "Firebase storage bucket required"),
  VITE_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1, "Firebase sender ID required"),
  VITE_FIREBASE_APP_ID: z.string().min(1, "Firebase app ID required"),
  VITE_FIREBASE_MEASUREMENT_ID: z.string().optional(),

  // Simple feature flags - string to boolean conversion
  VITE_APP_ENV: z.enum(["development", "staging", "production"]).default("development"),
  VITE_ENABLE_ANALYTICS: z
    .string()
    .default("false")
    .transform((val) => val === "true"),
  VITE_ENABLE_DEBUG: z
    .string()
    .default("true")
    .transform((val) => val === "true"),
});

// Interview Question #15: Type narrowing and type guards
// Zod's safeParse provides runtime type checking
// This is a form of type guard that narrows unknown input to our schema type
function validateEnv() {
  const result = envSchema.safeParse(import.meta.env);

  if (!result.success) {
    // Interview Question #49: Global error handling strategies
    // Fail fast on startup with clear error messages
    console.error("❌ Environment validation failed:");
    console.group("Missing or invalid environment variables:");

    result.error.issues.forEach((issue) => {
      const path = issue.path.join(".");
      console.error(`  • ${path}: ${issue.message}`);
    });

    console.groupEnd();
    console.error("\n💡 Create a .env file with the required variables");
    console.error("📖 See .env.example for template");

    // In development, we want immediate feedback
    // In production, this prevents app startup with invalid config
    throw new Error("Invalid environment configuration");
  }

  // Log successful validation in development
  if (result.data.VITE_ENABLE_DEBUG) {
    console.log("✅ Environment validation successful");
    console.log("🏗️  App Environment:", result.data.VITE_APP_ENV);
    console.log("📊 Analytics:", result.data.VITE_ENABLE_ANALYTICS ? "enabled" : "disabled");
  }

  return result.data;
}

// Export the validated environment configuration
// This ensures all environment access is type-safe throughout the app
export const env = validateEnv();

// Interview Question #13: TypeScript utility types
// Type inference from Zod schema - demonstrates how to derive types from runtime schemas
export type EnvConfig = z.infer<typeof envSchema>;

// Export individual Firebase config for easier consumption
// This separates Firebase-specific config from general app config
export const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Simple environment helpers - Interview Question #88: Keep it practical
export const isDevelopment = env.VITE_APP_ENV === "development";
export const isProduction = env.VITE_APP_ENV === "production";
