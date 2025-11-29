import { PropsWithChildren } from "react"

import { NotificationProvider } from "./notification-provider/notification.provider"

export const Providers = ({ children }: PropsWithChildren) => {
  return <NotificationProvider>{children}</NotificationProvider>
}
