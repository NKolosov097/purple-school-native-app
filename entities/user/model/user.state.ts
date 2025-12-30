import { isAxiosError } from "axios"
import { atom } from "jotai"

import { USER_API } from "@/entities/user/api/api"

import { http } from "@/shared/api/http"

import { User } from "./user.model"

export interface UserState {
  user: User | null
  isLoading: boolean
  error: string | null
}

export const userAtom = atom<UserState>({
  user: null,
  isLoading: false,
  error: null,
})

export const loadUserAtom = atom(
  (get) => get(userAtom),
  async (get, set) => {
    set(userAtom, {
      ...get(userAtom),
      isLoading: true,
    })

    try {
      const { data } = await http.get<User>(USER_API.profile)

      set(userAtom, {
        ...get(userAtom),
        user: data,
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

      set(userAtom, {
        ...get(userAtom),
        error: message,
      })
    } finally {
      set(userAtom, {
        ...get(userAtom),
        isLoading: false,
      })
    }
  }
)
