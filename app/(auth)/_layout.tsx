import { Redirect, Slot } from "expo-router"
import { useAtomValue } from "jotai"

import { authAtom, authLoadedAtom } from "@/entities/auth/model/auth.state"

export default function AuthLayout() {
  const { accessToken } = useAtomValue(authAtom)
  const authLoaded = useAtomValue(authLoadedAtom)

  if (!authLoaded) return null

  if (accessToken) {
    return <Redirect href="/courses" />
  }

  return <Slot />
}
