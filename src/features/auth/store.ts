import { create } from "zustand"

import type { AuthState } from "@features/auth/types"

export const useAuthStore = create<AuthState>((_set) => ({
  user: null,
  loading: true,
  error: null,
}))
