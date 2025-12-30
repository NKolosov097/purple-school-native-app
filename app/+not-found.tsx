import { Image, StyleSheet, Text, View } from "react-native"

import { COLORS, FONTS } from "@/shared/config/tokens"
import { Link } from "@/shared/ui/link/link"

const NotFoundScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        alt="Not found"
        source={require("@/assets/images/not-found.png")}
        resizeMode="contain"
        style={styles.image}
        width={205}
        height={282}
      />

      <View>
        <Text style={styles.text}>Ооо... что-то пошло не так.</Text>
        <Text style={styles.text}>
          Попробуйте вернуться на главный экран приложения
        </Text>
      </View>

      <Link href="/login">На главный экран</Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingInline: 35,
  },
  image: {
    width: 205,
    height: 282,
  },
  text: {
    fontFamily: FONTS["FiraSans-Regular"],
    fontWeight: 400,
    fontSize: FONTS.f18,
    textAlign: "center",
    color: COLORS.white,
  },
})

export default NotFoundScreen
