import { useCallback, useMemo, useState } from "react"
import {
  Animated,
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleSheet,
} from "react-native"

import { COLORS, RADIUSES } from "../../config/tokens"

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

  const animatedValue = new Animated.Value(100)
  const color = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [COLORS.primaryHover, COLORS.primary],
  })

  const customStyles = useMemo(
    () => ({
      ...styles.btn,
      ...styles?.[variant],
      ...Object.values(style ?? {}),
      ...(variant === "primary" && { backgroundColor: color }),
    }),
    [variant, style, color]
  )

  const handlePressIn = useCallback(
    (event: GestureResponderEvent): void => {
      setIsPressing(true)
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }).start()
      onPressIn?.(event)
    },
    [onPressIn, animatedValue]
  )

  const handlePressOut = useCallback(
    (event: GestureResponderEvent): void => {
      setIsPressing(false)
      Animated.timing(animatedValue, {
        toValue: 100,
        duration: 100,
        useNativeDriver: false,
      }).start()
      onPressOut?.(event)
    },
    [onPressOut, animatedValue]
  )

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} {...props}>
      <Animated.View style={customStyles}>
        {typeof children === "function"
          ? children({ pressed: isPressing })
          : children}
      </Animated.View>
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
})
