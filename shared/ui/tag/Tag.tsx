import { StyleSheet, Text, View } from "react-native"

import { COLORS, FONTS, RADIUSES } from "@/shared/config/tokens"

export const Tag = ({ text }: { text: string }) => {
  return (
    <View style={styles.tag}>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  tag: {
    backgroundColor: COLORS.transparent,
    borderWidth: 1,
    borderColor: COLORS.grayStroke,
    borderRadius: RADIUSES.r17,
    paddingBlock: 4,
    paddingHorizontal: 10,
  },
  text: {
    fontFamily: FONTS["FiraSans-Regular"],
    fontWeight: 400,
    fontSize: FONTS.f14,
    color: COLORS.white,
  },
})
