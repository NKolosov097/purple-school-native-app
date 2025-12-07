import { useEffect, useMemo } from "react"
import { StatusBar } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import Constants from "expo-constants"
import { useFonts } from "expo-font"
import { SplashScreen, Stack } from "expo-router"
import "react-native-reanimated"

import { Providers } from "@/providers"

import { StackProps } from "@/shared/types/global.types"
import { COLORS } from "@shared/config/tokens"

SplashScreen.preventAutoHideAsync()

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

  const [fontsLoaded, fontsError] = useFonts({
    FiraSans: require("../assets/fonts/FiraSans-Regular.ttf"),
    "FiraSans-SemiBold": require("../assets/fonts/FiraSans-SemiBold.ttf"),
  })

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  useEffect(() => {
    if (fontsError && Constants.debugMode) {
      throw fontsError
    }
  }, [fontsError])

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
