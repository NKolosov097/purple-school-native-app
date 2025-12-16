import { useLocalSearchParams } from "expo-router"
import { StyleSheet, Text, View } from "react-native"

import { COLORS } from "@/shared/config/tokens"
import { Link } from "@/shared/ui/link/link"

const CourseScreen = () => {
  const { alias } = useLocalSearchParams()

  return (
    <View>
      <Text style={styles.text}>Страница одного курса: {alias}</Text>
      <Link href="/login">Логин</Link>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: COLORS.white,
  },
})

export default CourseScreen
