import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store"
import { atomWithStorage, createJSONStorage } from "jotai/utils"

export type CourseReminder = {
  notificationId: string
  remindedAt: string
  alias: string
  title?: string
}

export type CourseRemindersState = Record<string, CourseReminder>

const storage = createJSONStorage<CourseRemindersState>(() => ({
  getItem: getItemAsync,
  setItem: setItemAsync,
  removeItem: deleteItemAsync,
}))

export const courseRemindersAtom = atomWithStorage<CourseRemindersState>(
  "course_reminders",
  {},
  storage
)


