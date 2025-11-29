import { PropsWithChildren } from "react"

import { SafeAreaProvider } from "./safe-area-provider/safe-area.provider"
import { NotificationProvider } from "./notification-provider/notification.provider"

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <SafeAreaProvider>
      <NotificationProvider>{children}</NotificationProvider>
    </SafeAreaProvider>
  )
}
