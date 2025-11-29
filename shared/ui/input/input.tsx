import { useState } from "react"
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native"

import { COLORS, FONTS, RADIUSES } from "@/shared/config/tokens"
import { EyeClosedIcon } from "@/shared/icons/EyeClosed"
import { EyeOpenedIcon } from "@/shared/icons/EyeOpened"

interface IInputProps extends TextInputProps {
  type?: "password"
}

export const Input = ({
  style,
  placeholderTextColor,
  type,
  ...props
}: IInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <View style={styles.container}>
      <TextInput
        style={{
          ...styles.input,
          ...Object.values(style ?? {}),
        }}
        placeholderTextColor={placeholderTextColor || COLORS.gray}
        secureTextEntry={type === "password" && !isPasswordVisible}
        {...props}
      />

      {type === "password" && (
        <Pressable
          style={styles.eyeIcon}
          onPress={() => setIsPasswordVisible((prev) => !prev)}
        >
          {isPasswordVisible ? <EyeOpenedIcon /> : <EyeClosedIcon />}
        </Pressable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  input: {
    height: 58,

    borderRadius: RADIUSES.r10,
    paddingBlock: 10,
    paddingHorizontal: 26,

    backgroundColor: COLORS.violetDark,

    fontFamily: "FiraSans, FiraSans-Regular",
    fontWeight: 400,
    fontSize: FONTS.f18,
    lineHeight: 1.2,
    color: COLORS.gray,
  },
  eyeIcon: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    paddingRight: 24,
    alignItems: "center",
    justifyContent: "center",
  },
})
