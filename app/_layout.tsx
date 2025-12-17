import { useEffect } from "react"
import "react-native-reanimated"

import { useAtomValue, useSetAtom } from "jotai"

import { Providers } from "@/providers"

import { useFonts } from "@/hooks/useFonts"
import { useScreenOptions } from "@/hooks/useScreenOptions"

import { authLoadedAtom, initAuthAtom } from "@/entities/auth/model/auth.state"

import { StatusBar } from "@/shared/ui/status-bar/status-bar"

export default function RootLayout() {
  const authLoaded = useAtomValue(authLoadedAtom)
  const initAuth = useSetAtom(initAuthAtom)

  useEffect(() => {
    initAuth()
  }, [initAuth])

  useFonts(authLoaded)
  const Stack = useScreenOptions()

  return (
    <Providers>
      {Stack}
      <StatusBar />
    </Providers>
  )
}
