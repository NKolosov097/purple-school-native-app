import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import "react-native-reanimated"
import { SafeAreaProvider } from "react-native-safe-area-context"

import { Providers } from "@/providers"
import { COLORS } from "@/shared/config/tokens"

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Providers>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: COLORS.black },
          }}
        />
        <StatusBar style="dark" />
      </Providers>
    </SafeAreaProvider>
  )
}
