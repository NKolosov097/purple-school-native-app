import {
  email,
  InferOutput,
  minLength,
  nonEmpty,
  object,
  pipe,
  string,
} from "valibot"

import { getDefaultStore } from "jotai/vanilla"

import { authAtom, logoutAtom } from "./auth.state"

export interface AuthResponse {
  accessToken: string
}

export interface LoginRequest {
  email: string
  password: string
}

export const loginSchema = object({
  email: pipe(
    string("Email должен быть строкой"),
    nonEmpty("Email обязателен для заполнения"),
    email("Введите корректный Email")
  ),
  password: pipe(
    string("Пароль должен быть строкой"),
    nonEmpty("Пароль обязателен для заполнения"),
    minLength(5, "Пароль должен содержать минимум 5 символов")
  ),
})

export type LoginFormData = InferOutput<typeof loginSchema>

const store = getDefaultStore()

export async function getAccessToken(): Promise<string | null> {
  const auth = await store.get(authAtom)
  return auth?.accessToken ?? null
}

export async function setAccessToken(accessToken: string | null) {
  try {
    const prev = await store.get(authAtom)
    store.set(authAtom, {
      ...prev,
      accessToken,
      error: null,
    })
  } catch (error) {
    console.error("Error setting access token: ", error)
  }
}

export function logout() {
  store.set(logoutAtom)
}
