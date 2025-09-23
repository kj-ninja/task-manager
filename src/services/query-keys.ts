export const queryKeys = {
  // Authentication
  auth: {
    user: () => ["auth", "user"] as const,
  },
} as const
