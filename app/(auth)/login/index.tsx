import { useState } from "react"
import { Image, StyleSheet, Text, View } from "react-native"

import { COLORS, FONTS, GAPS } from "@shared/config/tokens"
import { Button } from "@shared/ui/button/button"
import { Input } from "@shared/ui/input/input"

import { Link } from "@/shared/ui/Link/Link"

interface IForm {
  email: string
  password: string
}

const initialForm: IForm = {
  email: "",
  password: "",
}

const Login = () => {
  const [form, setForm] = useState<IForm>(initialForm)

  return (
    <View style={styles.content}>
      <Image
        alt="Purple School"
        source={require("@/assets/images/purple-school.png")}
        resizeMode="contain"
        style={styles.logo}
      />

      <View style={styles.form}>
        <Input
          value={form.email}
          onChangeText={(email) => setForm((prev) => ({ ...prev, email }))}
          placeholder="Email"
        />
        <Input
          value={form.password}
          onChangeText={(password) =>
            setForm((prev) => ({ ...prev, password }))
          }
          placeholder="Пароль"
          type="password"
        />
        <Button variant="primary">
          <Text style={styles.submitText}>Войти</Text>
        </Button>
      </View>

      <Link href="/courses/typescript">Восстановить пароль</Link>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  content: {
    flex: 1,
    gap: GAPS.g50,
    justifyContent: "center",
    paddingInline: 55,
  },
  logo: {
    width: 220,
    alignSelf: "center",
  },
  form: {
    gap: GAPS.g16,
  },
  submitText: {
    textAlign: "center",
    fontFamily: "FiraSans, FiraSans-Regular",
    fontWeight: 400,
    fontSize: FONTS.f18,
    color: COLORS.white,
  },
})
