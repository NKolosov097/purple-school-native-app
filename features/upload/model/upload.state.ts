import { isAxiosError } from "axios"
import FormData from "form-data"
import { atom } from "jotai"

import { IUploadResponse, IUploadState } from "./upload.model"

import { FILE_API } from "@/features/upload/api/api"

import { http } from "@/shared/api/http"

export const uploadAtom = atom<IUploadState>({
  image: null,
  isLoading: false,
  error: null,
})

export const uploadImageAtom = atom(
  (get) => get(uploadAtom),
  async (get, set, { uri, name }: { uri: string; name: string }) => {
    set(uploadAtom, {
      ...get(uploadAtom),
      isLoading: true,
    })

    try {
      const formData = new FormData()
      formData.append("files", { uri, name, type: "image/jpeg" })

      const { data } = await http.post<IUploadResponse>(
        FILE_API.uploadImage,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      set(uploadAtom, {
        ...get(uploadAtom),
        image: data?.urls?.original,
        error: null,
      })
      return data
    } catch (error) {
      const fallbackMessage = "Произошла неизвестная ошибка"
      const message =
        typeof error === "string"
          ? error
          : isAxiosError<{ message?: string }>(error)
          ? error.response?.data?.message ?? error.message ?? fallbackMessage
          : error instanceof Error
          ? error.message
          : fallbackMessage

      set(uploadAtom, {
        ...get(uploadAtom),
        error: message,
      })
    } finally {
      set(uploadAtom, {
        ...get(uploadAtom),
        isLoading: false,
      })
    }
  }
)
