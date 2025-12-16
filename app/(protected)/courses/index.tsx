import { StyleSheet, Text, View } from "react-native"

import { COLORS } from "@/shared/config/tokens"
import { Link } from "@/shared/ui/link/link"

const CoursesScreen = () => {
  return (
    <View>
      <Text style={styles.text}>Страница всех курсов</Text>
      <Link href="/login">Логин</Link>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: COLORS.white,
  },
})

export default CoursesScreen
