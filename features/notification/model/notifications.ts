import { isDevice } from "expo-device"
import {
  AndroidImportance,
  cancelScheduledNotificationAsync,
  getAllScheduledNotificationsAsync,
  getPermissionsAsync,
  IosAuthorizationStatus,
  requestPermissionsAsync,
  SchedulableTriggerInputTypes,
  scheduleNotificationAsync,
  setNotificationChannelAsync,
  setNotificationHandler,
} from "expo-notifications"
import { Platform } from "react-native"

import { CourseRemindersState } from "./courseReminders.state"

let didInit = false

export const initNotificationsAsync = async () => {
  if (didInit) return
  didInit = true

  setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  })

  if (Platform.OS === "android") {
    await setNotificationChannelAsync("default", {
      name: "default",
      importance: AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    })
  }
}

type NotificationPermissionStatus = "ok" | "unavailable" | "denied" | "error"

export type NotificationPermissionResult = {
  status: NotificationPermissionStatus
  message?: string
}

export const ensureNotificationPermissionsAsync =
  async (): Promise<NotificationPermissionResult> => {
    try {
      await initNotificationsAsync()

      if (!isDevice) {
        return {
          status: "unavailable",
          message: "Уведомления доступны только на физическом устройстве.",
        }
      }

      const permissions = await getPermissionsAsync()
      const granted =
        permissions.granted ||
        permissions.ios?.status === IosAuthorizationStatus.PROVISIONAL

      if (granted) return { status: "ok" }

      const requested = await requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
        },
      })

      const requestedGranted =
        requested.granted ||
        requested.ios?.status === IosAuthorizationStatus.PROVISIONAL

      return requestedGranted
        ? { status: "ok" }
        : { status: "denied", message: "Разрешение на уведомления не выдано." }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Не удалось запросить разрешение на уведомления"
      return { status: "error", message }
    }
  }

export type ScheduleCourseReminderInput = {
  alias: string
  title?: string
  seconds?: number
}

export const scheduleCourseReminderAsync = async ({
  alias,
  title,
  seconds = 60 * 60 * 24,
}: ScheduleCourseReminderInput): Promise<string> => {
  await initNotificationsAsync()

  return await scheduleNotificationAsync({
    content: {
      title: "Напоминание о курсе",
      body: title ? `Вернитесь к курсу «${title}»` : "Вернитесь к курсу",
      ...(Platform.OS === "android" ? { channelId: "default" } : {}),
      data: {
        alias,
        url: `/courses/${alias}`,
      },
    },
    trigger: {
      type: SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds,
      repeats: true,
    },
  })
}

export const cancelCourseReminderAsync = async (notificationId: string) => {
  await cancelScheduledNotificationAsync(notificationId)
}

export const cleanupCourseRemindersAsync = async <
  T extends CourseRemindersState
>(
  reminders: T
): Promise<T> => {
  if (!reminders || Object.keys(reminders).length === 0) return reminders

  const scheduled = await getAllScheduledNotificationsAsync()
  const scheduledIds = new Set(scheduled.map((n) => n.identifier))

  let changed = false
  const next: CourseRemindersState = { ...reminders }

  for (const courseId of Object.keys(next)) {
    const notificationId = next[courseId]?.notificationId
    if (!notificationId || !scheduledIds.has(notificationId)) {
      delete next[courseId]
      changed = true
    }
  }

  return (changed ? next : reminders) as T
}
