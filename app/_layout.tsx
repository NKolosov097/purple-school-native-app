import { useMemo } from "react"
import { StatusBar } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import "react-native-reanimated"

import { Providers } from "@/providers"

import { StackProps } from "@/shared/types/global.types"
import { COLORS } from "@shared/config/tokens"

export default function RootLayout() {
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

  const [fontsLoaded] = useFonts({
    FiraSans: require("../assets/fonts/FiraSans-Regular.ttf"),
    "FiraSans-SemiBold": require("../assets/fonts/FiraSans-SemiBold.ttf"),
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <Providers>
      <Stack screenOptions={screenOptions} />
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.black}
        networkActivityIndicatorVisible
        hidden
      />
    </Providers>
  )
}
