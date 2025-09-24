import { z } from "zod"

// Interview Question #53: Environment variable security
// This demonstrates secure environment configuration patterns:
// 1. Type-safe validation using Zod schemas
// 2. Build-time vs runtime environment variable handling
// 3. Fail-fast validation on application startup
// 4. Clear error messages for missing configuration

// Interview Question #12: Interface vs Type - when to use which?
// Using Zod schema inference creates a type automatically
// This provides both runtime validation AND compile-time type safety
const envSchema = z.object({
  // Firebase configuration - all required for app functionality
  // These are safe to expose in client builds (they're public anyway)
  VITE_FIREBASE_API_KEY: z
    .string()
    .min(1, "Firebase API key is required")
    .regex(/^AIza[0-9A-Za-z-_]{35}$/, "Invalid Firebase API key format"),

  VITE_FIREBASE_AUTH_DOMAIN: z
    .string()
    .min(1, "Firebase auth domain is required")
    .regex(/\.firebaseapp\.com$/, "Auth domain must be a Firebase domain"),

  VITE_FIREBASE_PROJECT_ID: z
    .string()
    .min(1, "Firebase project ID is required")
    .regex(/^[a-z][a-z0-9-]*[a-z0-9]$/, "Invalid Firebase project ID format"),

  VITE_FIREBASE_STORAGE_BUCKET: z
    .string()
    .min(1, "Firebase storage bucket is required")
    .regex(/\.appspot\.com$/, "Storage bucket must be an App Engine domain"),

  VITE_FIREBASE_MESSAGING_SENDER_ID: z
    .string()
    .min(1, "Firebase messaging sender ID is required")
    .regex(/^\d+$/, "Sender ID must be numeric"),

  VITE_FIREBASE_APP_ID: z
    .string()
    .min(1, "Firebase app ID is required")
    .regex(/^1:\d+:web:[a-f0-9]+$/, "Invalid Firebase app ID format"),

  // Optional analytics configuration
  VITE_FIREBASE_MEASUREMENT_ID: z
    .string()
    .regex(/^G-[A-Z0-9]{10}$/, "Invalid measurement ID format")
    .optional(),

  // Environment-specific settings
  VITE_APP_ENV: z
    .enum(["development", "staging", "production"])
    .default("development"),

  // Feature flags - useful for gradual rollouts
  VITE_ENABLE_ANALYTICS: z
    .string()
    .transform((val) => val === "true")
    .pipe(z.boolean())
    .default(false),

  VITE_ENABLE_OFFLINE_SUPPORT: z
    .string()
    .transform((val) => val === "true")
    .pipe(z.boolean())
    .default(false),

  // Development-only settings
  VITE_ENABLE_DEBUG: z
    .string()
    .transform((val) => val === "true")
    .pipe(z.boolean())
    .default(false),
})

// Interview Question #15: Type narrowing and type guards
// Zod's safeParse provides runtime type checking
// This is a form of type guard that narrows unknown input to our schema type
function validateEnv() {
  const result = envSchema.safeParse(import.meta.env)

  if (!result.success) {
    // Interview Question #49: Global error handling strategies
    // Fail fast on startup with clear error messages
    console.error("❌ Environment validation failed:")
    console.group("Missing or invalid environment variables:")

    result.error.issues.forEach((issue) => {
      const path = issue.path.join(".")
      console.error(`  • ${path}: ${issue.message}`)
    })

    console.groupEnd()
    console.error("\n💡 Create a .env file with the required variables")
    console.error("📖 See .env.example for template")

    // In development, we want immediate feedback
    // In production, this prevents app startup with invalid config
    throw new Error("Invalid environment configuration")
  }

  // Log successful validation in development
  if (result.data.VITE_ENABLE_DEBUG) {
    console.log("✅ Environment validation successful")
    console.log("🏗️  App Environment:", result.data.VITE_APP_ENV)
    console.log("📊 Analytics:", result.data.VITE_ENABLE_ANALYTICS ? "enabled" : "disabled")
    console.log("📱 Offline Support:", result.data.VITE_ENABLE_OFFLINE_SUPPORT ? "enabled" : "disabled")
  }

  return result.data
}

// Export the validated environment configuration
// This ensures all environment access is type-safe throughout the app
export const env = validateEnv()

// Interview Question #13: TypeScript utility types
// Type inference from Zod schema - demonstrates how to derive types from runtime schemas
export type EnvConfig = z.infer<typeof envSchema>

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
}

// Interview Question #88: Environment-specific configurations
// Helper functions for environment-aware behavior
export const isDevelopment = env.VITE_APP_ENV === "development"
export const isProduction = env.VITE_APP_ENV === "production"
export const isStaging = env.VITE_APP_ENV === "staging"

// Feature flag helpers - useful for gradual feature rollouts
export const features = {
  analytics: env.VITE_ENABLE_ANALYTICS,
  offlineSupport: env.VITE_ENABLE_OFFLINE_SUPPORT,
  debug: env.VITE_ENABLE_DEBUG,
} as const
