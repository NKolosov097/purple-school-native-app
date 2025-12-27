import { StyleSheet, Text, View } from "react-native"

import { COLORS } from "@/shared/config/tokens"

const ClubScreen = () => {
  return (
    <View>
      <Text style={styles.text}>Настройки</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: COLORS.white,
  },
})

export default ClubScreen
