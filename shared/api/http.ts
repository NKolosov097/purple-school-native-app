import axios, { AxiosError } from "axios"

import { AUTH_API } from "@/entities/auth/api/api"
import {
  AuthResponse,
  getAccessToken,
  logout,
  setAccessToken,
} from "@/entities/auth/model/auth.model"

// Public client without interceptors (for login/refresh to avoid recursion).
export const publicHttp = axios.create({
  withCredentials: true,
})

export const http = axios.create({
  withCredentials: true,
})

http.interceptors.request.use(async (config) => {
  const accessToken = await getAccessToken()
  if (accessToken) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

let refreshPromise: Promise<string> | null = null

http.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status
    const originalRequest = error.config as any
    const originalUrl = String(originalRequest?.url ?? "")

    if (!originalRequest || status !== 401) {
      logout()
      throw error
    }

    // Never try to refresh if refresh itself failed.
    if (
      originalUrl === AUTH_API.refreshToken ||
      originalUrl.endsWith("/auth/refresh-token")
    ) {
      logout()
      throw error
    }

    // Avoid infinite loops.
    if (originalRequest._retry) {
      throw error
    }
    originalRequest._retry = true

    // If we don't even have a token, just treat it as logged out.
    if (!(await getAccessToken())) {
      logout()
      throw error
    }

    try {
      if (!refreshPromise) {
        refreshPromise = publicHttp
          .post<AuthResponse>(AUTH_API.refreshToken)
          .then((r) => r.data.accessToken)
          .finally(() => {
            refreshPromise = null
          })
      }

      const newAccessToken = await refreshPromise
      await setAccessToken(newAccessToken)

      originalRequest.headers = originalRequest.headers ?? {}
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

      return http(originalRequest)
    } catch (refreshError) {
      logout()
      throw refreshError
    }
  }
)
