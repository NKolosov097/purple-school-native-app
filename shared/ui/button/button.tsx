import { useCallback, useMemo, useState } from "react"
import {
  ActivityIndicator,
  Animated,
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleSheet,
} from "react-native"

import { COLORS, FONTS, RADIUSES } from "@shared/config/tokens"

interface IButtonProps extends PressableProps {
  variant?: "default" | "primary" | "link"
  isLoading?: boolean
}

export const Button = ({
  variant = "default",
  style,
  onPressIn,
  onPressOut,
  children,
  isLoading,
  ...props
}: IButtonProps) => {
  const [isPressing, setIsPressing] = useState(false)

  const animatedValue = useMemo(() => new Animated.Value(100), [])
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
        {isLoading ? (
          <ActivityIndicator size="small" color={COLORS.white} />
        ) : typeof children === "function" ? (
          children({ pressed: isPressing, hovered: isPressing })
        ) : (
          children
        )}
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
    fontFamily: FONTS["FiraSans-Regular"],
  },
  default: { backgroundColor: COLORS.violetDark },
  primary: { backgroundColor: COLORS.primary },
  link: { backgroundColor: "transparent" },
})
