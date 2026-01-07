import { useAtom } from "jotai"
import { Controller, useForm } from "react-hook-form"
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native"

import { useRouter } from "expo-router"

import { parse, ValiError } from "valibot"

import { useNotification } from "@/features/notification/model/useNotification"

import { LoginFormData, loginSchema } from "@/entities/auth/model/auth.model"
import { loginAtom } from "@/entities/auth/model/auth.state"

import { FALLBACK_ERROR_MESSAGE } from "@/shared/constants/api"
import { Link } from "@/shared/ui/link/link"
import { COLORS, FONTS, GAPS } from "@shared/config/tokens"
import { Button } from "@shared/ui/button/button"
import { Input } from "@shared/ui/input/input"

const Login = () => {
  const { replace } = useRouter()
  const [{ isLoading, error }, login] = useAtom(loginAtom)
  const { error: errorToast } = useNotification()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  })

  const onSubmit = async ({ email, password }: LoginFormData) => {
    try {
      const authData = await login({
        email,
        password,
      })

      if (error) {
        errorToast("Неверный логин или пароль")
      }

      if (authData) {
        replace("/courses")
      }
    } catch (e) {
      if (e instanceof Error) {
        errorToast(e?.message ?? error ?? FALLBACK_ERROR_MESSAGE)
      } else if (typeof e === "string") {
        errorToast(e ?? error ?? FALLBACK_ERROR_MESSAGE)
      } else {
        errorToast(error ?? FALLBACK_ERROR_MESSAGE)
      }
    }
  }

  return (
    <View style={styles.content}>
      <Image
        alt="Purple School"
        source={require("@/assets/images/purple-school.png")}
        resizeMode="contain"
        style={styles.logo}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.form}
      >
        <View>
          <Controller
            name="email"
            control={control}
            rules={{
              validate: (value) => {
                try {
                  parse(loginSchema.entries.email, value)
                  return true
                } catch (validationError) {
                  if (validationError instanceof ValiError) {
                    return validationError.issues[0].message
                  }
                  return "Неизвестная ошибка валидации"
                }
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />
          {errors.email && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}
        </View>

        <View>
          <Controller
            name="password"
            control={control}
            rules={{
              validate: (value) => {
                try {
                  parse(loginSchema.entries.password, value)
                  return true
                } catch (validationError) {
                  if (validationError instanceof ValiError) {
                    return validationError.issues[0].message
                  }
                  return "Неизвестная ошибка валидации"
                }
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Пароль"
                type="password"
              />
            )}
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}
        </View>

        <Button
          variant="primary"
          onPress={handleSubmit(onSubmit)}
          isLoading={isLoading}
        >
          <Text style={styles.submitText}>Войти</Text>
        </Button>
      </KeyboardAvoidingView>

      <Link href="/(auth)/recovery-password">Восстановить пароль</Link>
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
  errorText: {
    fontFamily: FONTS["FiraSans-Regular"],
    fontWeight: 400,
    fontSize: FONTS.f16,
    color: COLORS.error,
  },
  submitText: {
    textAlign: "center",
    fontFamily: FONTS["FiraSans-Regular"],
    fontWeight: 400,
    fontSize: FONTS.f18,
    color: COLORS.white,
  },
})
