import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useColorScheme } from "react-native"
import "react-native-reanimated"
import { SafeAreaProvider } from "react-native-safe-area-context"

import { Providers } from "@/providers"
import { COLORS } from "@/shared/config/tokens"

export default function RootLayout() {
  const colorScheme = useColorScheme()

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Providers>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: COLORS.black },
            }}
          />
          <StatusBar style="dark" />
        </Providers>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
