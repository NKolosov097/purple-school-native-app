import { isAxiosError } from "axios"
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store"
import { atom } from "jotai"
import { atomWithStorage, createJSONStorage } from "jotai/utils"

import { publicHttp } from "@/shared/api/http"

import { API } from "../api/api"
import { AuthResponse, LoginRequest } from "./auth.model"

export interface AuthState {
  accessToken: string | null
  isLoading: boolean
  error: string | null
}

const storage = createJSONStorage<AuthState>(() => ({
  getItem: getItemAsync,
  setItem: setItemAsync,
  removeItem: deleteItemAsync,
}))

const initialAuthState: AuthState = {
  accessToken: null,
  isLoading: false,
  error: null,
}

export const authLoadedAtom = atom(false)

export const initAuthAtom = atom(null, async (_, set) => {
  try {
    const stored = await storage.getItem("auth", initialAuthState)
    set(authAtom, {
      ...initialAuthState,
      ...stored,
      isLoading: false,
      error: null,
    })
  } finally {
    set(authLoadedAtom, true)
  }
})

export const authAtom = atomWithStorage<AuthState>(
  "auth",
  initialAuthState,
  storage
)

export const loginAtom = atom(
  (get) => get(authAtom),
  async (get, set, loginRequest: LoginRequest) => {
    set(authAtom, {
      ...get(authAtom),
      isLoading: true,
    })

    try {
      const { data } = await publicHttp.post<AuthResponse>(
        API.login,
        loginRequest
      )
      set(authAtom, {
        ...get(authAtom),
        accessToken: data.accessToken,
        error: null,
      })
      return data
    } catch (error) {
      console.error("Login error: ", error)

      const fallbackMessage = "Произошла неизвестная ошибка"
      const message =
        typeof error === "string"
          ? error
          : isAxiosError<{ message?: string }>(error)
          ? error.response?.data?.message ?? error.message ?? fallbackMessage
          : error instanceof Error
          ? error.message
          : fallbackMessage

      set(authAtom, {
        ...get(authAtom),
        error: message,
      })
    } finally {
      set(authAtom, {
        ...get(authAtom),
        isLoading: false,
      })
    }
  }
)

export const logoutAtom = atom(null, (_, set) =>
  set(authAtom, initialAuthState)
)
