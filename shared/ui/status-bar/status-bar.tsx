import { StatusBar as ReactNativeStatusBar } from "react-native"

import { COLORS } from "@/shared/config/tokens"

export const StatusBar = () => {
  return (
    <ReactNativeStatusBar
      barStyle="light-content"
      backgroundColor={COLORS.black}
      networkActivityIndicatorVisible
      hidden
    />
  )
}
