import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as ReactNativeThemeProvider,
} from "@react-navigation/native"
import { PropsWithChildren } from "react"
import { useColorScheme } from "react-native"

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const colorScheme = useColorScheme()

  return (
    <ReactNativeThemeProvider
      value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      {children}
    </ReactNativeThemeProvider>
  )
}
