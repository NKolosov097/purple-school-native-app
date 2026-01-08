import "react-native-gesture-handler"
import "react-native-reanimated"

import { useEffect } from "react"

import { useAtom, useAtomValue, useSetAtom } from "jotai"

import { Providers } from "@/providers"

import {
  courseRemindersAtom,
  CourseRemindersState,
} from "@/features/notification/model/courseReminders.state"
import {
  cleanupCourseRemindersAsync,
  initNotificationsAsync,
} from "@/features/notification/model/notifications"
import { useNotificationPress } from "@/features/notification/model/useNotificationPress"

import { authLoadedAtom, initAuthAtom } from "@/entities/auth/model/auth.state"

import { useFonts } from "@/shared/hooks/useFonts"
import { useScreenOptions } from "@/shared/hooks/useScreenOptions"
import { StatusBar } from "@/shared/ui/status-bar/status-bar"

export default function RootLayout() {
  const authLoaded = useAtomValue(authLoadedAtom)
  const initAuth = useSetAtom(initAuthAtom)
  const [remindersState, setReminders] = useAtom(courseRemindersAtom)

  useNotificationPress({ enabled: authLoaded })

  useEffect(() => {
    initAuth()
  }, [initAuth])

  useEffect(() => {
    void initNotificationsAsync()
  }, [])

  useEffect(() => {
    if (!remindersState) return
    if (typeof (remindersState as any).then === "function") return

    const reminders = remindersState as CourseRemindersState
    if (Object.keys(reminders).length === 0) return

    void cleanupCourseRemindersAsync(reminders).then((cleaned) => {
      if (cleaned === reminders) return
      setReminders(cleaned)
    })
  }, [remindersState, setReminders])

  useFonts(authLoaded)
  const Stack = useScreenOptions()

  return (
    <Providers>
      {Stack}
      <StatusBar />
    </Providers>
  )
}
