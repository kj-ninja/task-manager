import { z } from "zod"

const envSchema = z.object({
  VITE_FIREBASE_API_KEY: z.string().min(1),
  VITE_FIREBASE_AUTH_DOMAIN: z.string().min(1),
  VITE_FIREBASE_PROJECT_ID: z.string().min(1),
  VITE_FIREBASE_STORAGE_BUCKET: z.string().min(1),
  VITE_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1),
  VITE_FIREBASE_APP_ID: z.string().min(1),
})

function validateEnv() {
  const result = envSchema.safeParse(import.meta.env)

  if (!result.success) {
    console.error("❌ Invalid environment variables:", result.error.format())
    throw new Error("Invalid environment variables")
  }

  return result.data
}

export const env = validateEnv()
