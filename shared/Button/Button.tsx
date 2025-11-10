import { useCallback, useMemo, useState } from "react"
import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleSheet,
} from "react-native"

import { COLORS, RADIUSES } from "../tokens"

interface IButtonProps extends PressableProps {
  variant?: "default" | "primary" | "link"
}

export const Button = ({
  variant = "default",
  style,
  onPressIn,
  onPressOut,
  children,
  ...props
}: IButtonProps) => {
  const [isPressing, setIsPressing] = useState(false)

  const customStyles = useMemo(
    () => ({
      ...styles.btn,
      ...styles?.[variant],
      ...(isPressing ? styles.pressing : {}),
      ...Object.values(style ?? {}),
    }),
    [variant, isPressing, style]
  )

  const handlePressIn = useCallback(
    (event: GestureResponderEvent): void => {
      setIsPressing(true)
      onPressIn?.(event)
    },
    [onPressIn]
  )

  const handlePressOut = useCallback(
    (event: GestureResponderEvent): void => {
      setIsPressing(false)
      onPressOut?.(event)
    },
    [onPressOut]
  )

  return (
    <Pressable
      style={customStyles}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...props}
    >
      {typeof children === "function"
        ? children({ pressed: isPressing })
        : children}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  btn: {
    height: 58,
    borderRadius: RADIUSES.r10,
    alignItems: "center",
    justifyContent: "center",
  },
  default: { backgroundColor: COLORS.violetDark },
  primary: { backgroundColor: COLORS.primary },
  link: { backgroundColor: "transparent" },
  pressing: { backgroundColor: COLORS.primaryHover },
})
