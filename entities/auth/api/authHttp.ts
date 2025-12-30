import { AxiosError } from "axios"

import { http, publicHttp } from "@shared/api/http"

import { AuthResponse } from "../model/auth.model"
import { getAccessToken, logout, setAccessToken } from "../model/auth.session"
import { AUTH_API } from "./api"

let installed = false
let refreshPromise: Promise<string> | null = null

/**
 * Подключает интерсепторы к `http` (access token + refresh token).
 * Важно: функция идемпотентная — можно вызывать хоть из `app/_layout.tsx`.
 */
export function setupAuthHttp() {
  if (installed) return
  installed = true

  http.interceptors.request.use(async (config) => {
    const accessToken = await getAccessToken()
    if (accessToken) {
      config.headers = config.headers ?? {}
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  })

  http.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const status = error.response?.status
      const originalRequest = error.config as any
      const originalUrl = String(originalRequest?.url ?? "")

      if (!originalRequest || status !== 401) {
        throw error
      }

      // Никогда не пытаемся рефрешить, если упал сам refresh.
      if (
        originalUrl === AUTH_API.refreshToken ||
        originalUrl.endsWith("/auth/refresh-token") ||
        originalUrl.includes("/auth/refresh-token")
      ) {
        logout()
        throw error
      }

      // Защита от бесконечного цикла.
      if (originalRequest._retry) {
        throw error
      }
      originalRequest._retry = true

      // Если токена нет — считаем, что пользователь разлогинен.
      if (!(await getAccessToken())) {
        logout()
        throw error
      }

      try {
        if (!refreshPromise) {
          refreshPromise = publicHttp
            .post<AuthResponse>(AUTH_API.refreshToken)
            .then((r) => {
              const token = r.data?.accessToken
              if (!token) {
                throw new Error("Не удалось обновить токен авторизации")
              }
              return token
            })
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
}
