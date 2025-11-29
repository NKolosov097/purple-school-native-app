import {
  createContext,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react"
import { Animated, StyleSheet, Text, View } from "react-native"

import { COLORS, RADIUSES } from "@/shared/config/tokens"

import {
  ToastConfig,
  ToastContainerProps,
  ToastContextType,
  ToastItemProps,
  TVariant,
} from "./notification.types"

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
)

const ToastItem = ({ toast, onRemove }: ToastItemProps) => {
  const animatedValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start()

    const timer = setTimeout(() => {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        onRemove(toast.id)
      })
    }, 2700)

    return () => clearTimeout(timer)
  }, [animatedValue, onRemove, toast.id])

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0],
  })

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  })

  return (
    <Animated.View
      style={[
        styles.container,
        styles[toast.variant],
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <Text style={styles.title}>{toast.title}</Text>
    </Animated.View>
  )
}

const ToastContainer = ({ toasts, onRemoveToast }: ToastContainerProps) => {
  return (
    <View style={styles.overlay} pointerEvents="none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemoveToast} />
      ))}
    </View>
  )
}

export const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<ToastConfig[]>(() => [])
  const nextId = useRef(0)

  const showToast = (variant: TVariant, title: string) => {
    const toastId = nextId.current++
    setToasts((prev) => [...prev, { id: toastId, variant, title }])

    setTimeout(() => {
      setToasts((prev) => prev.filter(({ id }) => id !== toastId))
    }, 3000)
  }

  const removeToast = (toastId: number) => {
    setToasts((prev) => prev.filter(({ id }) => id !== toastId))
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </ToastContext.Provider>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    alignItems: "center",
    paddingTop: 50,
  },
  container: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: RADIUSES.r10,
    marginBottom: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  default: {
    backgroundColor: COLORS.primary,
  },
  info: {
    backgroundColor: COLORS.primary,
  },
  success: {
    backgroundColor: COLORS.success,
  },
  error: {
    backgroundColor: COLORS.error,
  },
  title: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
})
