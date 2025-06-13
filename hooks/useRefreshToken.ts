"use client"

import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRefreshTokenMutation } from "@/redux/api/authApi"
import { setCredentials, logout } from "@/redux/authSlice"
import type { RootState } from "@/redux/store"
import { jwtDecode } from "jwt-decode"

export const useRefreshToken = () => {
  const dispatch = useDispatch()
  const { accessToken } = useSelector((state: RootState) => state.auth)
  const [refreshToken] = useRefreshTokenMutation()
  const refreshAttempted = useRef(false)

  useEffect(() => {
    // Only attempt to refresh if we have an access token
    if (!accessToken || refreshAttempted.current) return

    const checkTokenExpiration = async () => {
      try {
        // Decode the token to check expiration
        const decoded: any = jwtDecode(accessToken)
        const currentTime = Date.now() / 1000

        // If token is expired or about to expire (within 5 minutes)
        if (decoded.exp < currentTime + 300) {
          refreshAttempted.current = true

          // Attempt to refresh the token
          const result = await refreshToken({
            accessToken: ""
          }).unwrap()

          if (result.status === "success" && result.data.accessToken) {
            dispatch(setCredentials({ accessToken: result.data.accessToken }))
          } else {
            dispatch(logout())
          }
        }
      } catch (error) {
        console.error("Token refresh error:", error)
        dispatch(logout())
      }
    }

    checkTokenExpiration()

    // Set up interval to check token expiration
    const interval = setInterval(checkTokenExpiration, 4 * 60 * 1000) // Check every 4 minutes

    return () => clearInterval(interval)
  }, [accessToken, dispatch, refreshToken])
}
