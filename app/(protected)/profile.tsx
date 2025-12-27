import { StyleSheet, Text, View } from "react-native"

import { COLORS } from "@/shared/config/tokens"

const ProfileScreen = () => {
  return (
    <View>
      <Text style={styles.text}>Профиль</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: COLORS.white,
  },
})

export default ProfileScreen
