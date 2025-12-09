import { Link } from "expo-router"
import { Image, StyleSheet, Text, View } from "react-native"

import { COLORS, FONTS } from "@/shared/config/tokens"

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

      <Link href="/login" style={styles.button}>
        На главный экран
      </Link>
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
    fontFamily: "FiraSans, FiraSans-Regular",
    fontWeight: 400,
    fontSize: FONTS.f18,
    textAlign: "center",
    color: COLORS.white,
  },
  button: {
    fontFamily: "FiraSans, FiraSans-Regular",
    fontWeight: 400,
    fontSize: FONTS.f18,
    textAlign: "center",
    color: COLORS.link,
  },
})

export default NotFoundScreen
