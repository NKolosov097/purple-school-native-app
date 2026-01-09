import { useEffect } from "react"

import Constants from "expo-constants"
import { useFonts as useFontsExpo } from "expo-font"
import { SplashScreen } from "expo-router"

void SplashScreen.preventAutoHideAsync()

export const useFonts = (appReady: boolean = true) => {
  const [fontsLoaded, fontsError] = useFontsExpo({
    "FiraSans-Regular": require("../../assets/fonts/FiraSans-Regular.ttf"),
    "FiraSans-SemiBold": require("../../assets/fonts/FiraSans-SemiBold.ttf"),
  })

  useEffect(() => {
    if (fontsLoaded && appReady) {
      void SplashScreen.hideAsync()
    }
  }, [fontsLoaded, appReady])

  useEffect(() => {
    if (fontsError && Constants.debugMode) {
      throw fontsError
    }

    if (fontsError && !Constants.debugMode) {
      void SplashScreen.hideAsync()
    }
  }, [fontsError])
}
