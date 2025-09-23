import { z } from "zod"

const envSchema = z.object({
  VITE_FIREBASE_API_KEY: z.string().min(1, "Firebase API key is required"),
})

function validateEnv() {
  const result = envSchema.safeParse(import.meta.env)

  if (!result.success) {
    console.error("❌ Invalid environment variables:")
    console.error(result.error.issues)
    throw new Error("Invalid environment variables")
  }

  return result.data
}

export const env = validateEnv()
