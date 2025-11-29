import { PropsWithChildren } from "react"
import { StyleSheet } from "react-native"
import {
  SafeAreaView,
  SafeAreaProvider as SafeArea,
} from "react-native-safe-area-context"

import { COLORS, GAPS } from "../../../shared/config/tokens"

export const SafeAreaProvider = ({ children }: PropsWithChildren) => {
  return (
    <SafeArea>
      <SafeAreaView style={styles.container}>{children}</SafeAreaView>
    </SafeArea>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    gap: GAPS.g50,
    paddingHorizontal: 55,
    backgroundColor: COLORS.black,
  },
})
