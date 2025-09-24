import type { AuthState } from "@features/auth/types"
import { create } from "zustand"

export const useAuthStore = create<AuthState>((_set) => ({
  user: null,
  loading: true,
  error: null,
}))
