import { PropsWithChildren } from "react"

import { NotificationProvider } from "./notification-provider/notification.provider"
import { ThemeProvider } from "./theme-provider/theme-provider"

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider>
      <NotificationProvider>{children}</NotificationProvider>
    </ThemeProvider>
  )
}
