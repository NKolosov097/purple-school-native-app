import { useMemo } from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Stack } from "expo-router"

import { COLORS } from "@/shared/config/tokens"
import { StackProps } from "@/shared/types/global.types"

export const useScreenOptions = () => {
  const {
    top: paddingTop,
    right: paddingRight,
    bottom: paddingBottom,
    left: paddingLeft,
  } = useSafeAreaInsets()

  const screenOptions = useMemo(
    (): StackProps["screenOptions"] => ({
      headerShown: false,
      contentStyle: {
        backgroundColor: COLORS.black,
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
      },
    }),
    [paddingTop, paddingBottom, paddingLeft, paddingRight]
  )

  return <Stack screenOptions={screenOptions} />
}
