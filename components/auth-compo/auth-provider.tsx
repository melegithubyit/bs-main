"use client"

import { useRefreshToken } from "@/hooks/useRefreshToken"
import type { ReactNode } from "react"

export function AuthProvider({ children }: { children: ReactNode }) {
  // This hook will handle token refresh
  useRefreshToken()

  return <>{children}</>
}
