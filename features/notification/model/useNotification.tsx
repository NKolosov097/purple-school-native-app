import { useContext } from "react"

import { ToastContext } from "@providers/notification-provider/notification.provider"

export const useNotification = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }

  return {
    default: (title: string) => context.showToast("default", title),
    info: (title: string) => context.showToast("info", title),
    success: (title: string) => context.showToast("success", title),
    error: (title: string) => context.showToast("error", title),
  }
}
