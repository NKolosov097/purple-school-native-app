import { useCallback, useEffect, useMemo } from "react"
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native"

import { useAtom } from "jotai"

import {
  courseRemindersAtom,
  CourseRemindersState,
} from "@/features/notification/model/courseReminders.state"
import {
  cancelCourseReminderAsync,
  ensureNotificationPermissionsAsync,
  scheduleCourseReminderAsync,
} from "@/features/notification/model/notifications"
import { useNotification } from "@/features/notification/model/useNotification"

import { ICourse } from "@/entities/course/model/course.model"
import { loadCoursesAtom } from "@/entities/course/model/course.state"
import { Course } from "@/entities/course/ui/course"

import { COLORS, GAPS } from "@/shared/config/tokens"

const CoursesScreen = () => {
  const [{ courses, isLoading }, loadCourses] = useAtom(loadCoursesAtom)
  const [remindersState, setReminders] = useAtom(courseRemindersAtom)
  const { info: infoToast, error: errorToast } = useNotification()

  const reminders = useMemo<CourseRemindersState>(() => {
    if (!remindersState) return {}
    if (typeof (remindersState as any).then === "function") return {}
    return remindersState as CourseRemindersState
  }, [remindersState])

  useEffect(() => {
    void loadCourses()
  }, [loadCourses])

  const handleNotify = useCallback(
    async (courseId: number, alias: string, title: string) => {
      try {
        const existing = reminders[String(courseId)]
        if (existing) {
          await cancelCourseReminderAsync(existing.notificationId)
          setReminders((prev) => {
            const base =
              prev && typeof (prev as any).then === "function"
                ? {}
                : (prev as CourseRemindersState)
            const next = { ...base }
            delete next[String(courseId)]
            return next
          })
          infoToast("Уведомление сброшено")
          return
        }

        const perm = await ensureNotificationPermissionsAsync()
        if (perm.status === "unavailable" || perm.status === "denied") {
          infoToast(perm.message ?? "Уведомления недоступны")
          return
        }
        if (perm.status !== "ok") {
          errorToast(perm.message ?? "Не удалось запросить разрешение")
          return
        }

        const notificationId = await scheduleCourseReminderAsync({
          alias,
          title,
        })

        const remindedAt = new Date().toISOString()
        setReminders((prev) => {
          const base =
            prev && typeof (prev as any).then === "function"
              ? {}
              : (prev as CourseRemindersState)
          return {
            ...base,
            [String(courseId)]: { notificationId, remindedAt, alias, title },
          }
        })

        infoToast("Уведомление установлено")
      } catch (error) {
        console.error("Error reminding course: ", error)
        errorToast("Не удалось установить/сбросить уведомление")
      }
    },
    [errorToast, infoToast, reminders, setReminders]
  )

  const renderItem: ListRenderItem<ICourse> | null | undefined = useCallback(
    ({ item }: ListRenderItemInfo<ICourse>) => (
      <Course
        key={item.id}
        {...item}
        onNotify={handleNotify}
        remindedAt={
          reminders[String(item.id)]?.remindedAt
            ? new Date(reminders[String(item.id)]!.remindedAt)
            : null
        }
      />
    ),
    [handleNotify, reminders]
  )

  return (
    <>
      {courses.length === 0 && isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.white} />
        </View>
      ) : null}

      {courses.length > 0 ? (
        <FlatList
          data={courses}
          renderItem={renderItem}
          keyExtractor={({ alias }) => alias}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={loadCourses}
              tintColor={COLORS.white}
              titleColor={COLORS.white}
            />
          }
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        />
      ) : null}
    </>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 30,
  },
  contentContainer: {
    gap: GAPS.g18,
  },
})

export default CoursesScreen
