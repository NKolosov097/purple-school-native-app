import { isAxiosError } from "axios"
import { atom } from "jotai"

import { COURSE_API } from "@/entities/course/api/api"

import { http } from "@/shared/api/http"
import { FALLBACK_ERROR_MESSAGE } from "@/shared/constants/api"

import { ICoursesResponse, ICourseState } from "./course.model"

export const courseAtom = atom<ICourseState>({
  courses: [],
  remindedCourses: new Map(),
  isLoading: false,
  error: null,
})

export const loadCoursesAtom = atom(
  (get) => get(courseAtom),
  async (get, set) => {
    set(courseAtom, {
      ...get(courseAtom),
      isLoading: true,
    })

    try {
      const { data } = await http.get<ICoursesResponse>(COURSE_API.course)

      set(courseAtom, {
        ...get(courseAtom),
        courses: [...data.my, ...data.other],
        error: null,
      })
      return data
    } catch (error) {
      console.error("Load courses error: ", error)

      const fallbackMessage = FALLBACK_ERROR_MESSAGE
      const message =
        typeof error === "string"
          ? error
          : isAxiosError<{ message?: string }>(error)
          ? error.response?.data?.message ?? error.message ?? fallbackMessage
          : error instanceof Error
          ? error.message
          : fallbackMessage

      set(courseAtom, {
        ...get(courseAtom),
        error: message,
      })
    } finally {
      set(courseAtom, {
        ...get(courseAtom),
        isLoading: false,
      })
    }
  }
)

export const remindCourseAtom = atom(
  (get) => get(courseAtom),
  async (get, set, courseId: number) => {
    const remindedCourses = new Map(get(courseAtom).remindedCourses)

    if (remindedCourses.has(courseId)) {
      remindedCourses.delete(courseId)
    } else {
      remindedCourses.set(courseId, new Date())
    }

    set(courseAtom, {
      ...get(courseAtom),
      remindedCourses,
    })

    return get(courseAtom).remindedCourses.get(courseId)
  }
)
