import { useCallback, useEffect, useRef } from "react"

import * as Notifications from "expo-notifications"
import { useRouter } from "expo-router"

type NotificationData = Record<string, unknown>

const getUrlFromNotificationData = (data: NotificationData): string | null => {
  const url = data?.url
  if (typeof url === "string" && url.length > 0) return url

  const alias = data?.alias
  if (typeof alias === "string" && alias.length > 0) {
    return `/courses/${encodeURIComponent(alias)}`
  }

  return null
}

type UseNotificationPressOptions = {
  enabled?: boolean
}

export const useNotificationPress = (
  options: UseNotificationPressOptions = {}
) => {
  const { enabled = true } = options
  const router = useRouter()

  const handledIdsRef = useRef<Set<string>>(new Set())
  const pendingResponseRef = useRef<Notifications.NotificationResponse | null>(
    null
  )

  const handleResponse = useCallback(
    (response: Notifications.NotificationResponse) => {
      const notificationId = response.notification.request.identifier
      if (handledIdsRef.current.has(notificationId)) return

      const data = response.notification.request.content
        .data as NotificationData
      const url = getUrlFromNotificationData(data)
      if (!url) return

      handledIdsRef.current.add(notificationId)
      router.push(url as never)
    },
    [router]
  )

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        if (!enabled) {
          pendingResponseRef.current = response
          return
        }
        handleResponse(response)
      }
    )

    void Notifications.getLastNotificationResponseAsync().then((response) => {
      if (!response) return
      if (!enabled) {
        pendingResponseRef.current = response
        return
      }
      handleResponse(response)
    })

    return () => subscription.remove()
  }, [enabled, handleResponse])

  useEffect(() => {
    if (!enabled) return
    const pending = pendingResponseRef.current
    if (!pending) return
    pendingResponseRef.current = null
    handleResponse(pending)
  }, [enabled, handleResponse])
}
