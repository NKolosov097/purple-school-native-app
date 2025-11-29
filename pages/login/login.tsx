import React, { useState } from "react"
import { Image, StyleSheet, Text, View } from "react-native"

import { Input } from "../../shared/ui/input/input"
import { Button } from "../../shared/ui/button/button"
import { COLORS, FONTS, GAPS } from "../../shared/config/tokens"

import { useNotification } from "../../features/model/useNotification"

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

  const { error } = useNotification()

  const alert = () => {
    // Alert.alert("Ошибка", "Неверный логин или пароль", [
    //   { text: "хорошо", onPress: () => {}, style: "cancel" },
    // ])
    error("drgrths")
  }

  return (
    <View style={styles.content}>
      <Image
        alt="Purple School"
        source={require("../../assets/img/purple-school.png")}
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

      <Button variant="link" onPress={alert}>
        <Text style={styles.recoveryText}>Восстановить пароль</Text>
      </Button>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  content: {
    gap: GAPS.g50,
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
  recoveryText: {
    fontFamily: "FiraSans, FiraSans-Regular",
    fontWeight: 400,
    fontSize: FONTS.f18,
    color: COLORS.link,
  },
})
