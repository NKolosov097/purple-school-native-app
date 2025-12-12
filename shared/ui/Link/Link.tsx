import { Link as ExpoLink, LinkProps } from "expo-router"
import { StyleSheet } from "react-native"

import { COLORS, FONTS } from "@/shared/config/tokens"

export const Link = ({ children, style, ...props }: LinkProps) => {
  return (
    <ExpoLink
      style={{ ...Object.values(style ?? {}), ...styles.link }}
      {...props}
    >
      {children}
    </ExpoLink>
  )
}

const styles = StyleSheet.create({
  link: {
    fontFamily: "FiraSans, FiraSans-Regular",
    fontWeight: 400,
    fontSize: FONTS.f18,
    textAlign: "center",
    color: COLORS.link,
  },
})
