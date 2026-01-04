import { useEffect, useState } from "react"
import { Image, StyleSheet, Text } from "react-native"

import {
  launchImageLibraryAsync,
  PermissionStatus,
  useMediaLibraryPermissions,
} from "expo-image-picker"

import { useAtom } from "jotai"

import { useNotification } from "@/features/notification/model/useNotification"
import { IImageUploaderProps } from "@/features/upload/model/upload.model"
import { uploadImageAtom } from "@/features/upload/model/upload.state"

import { COLORS, FONTS, GAPS } from "@/shared/config/tokens"
import { Button } from "@/shared/ui/button/button"

export const Upload = ({ onUpload }: IImageUploaderProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [libraryPermissions, requestLibraryPermissions] =
    useMediaLibraryPermissions()
  const [{ error }, uploadImage] = useAtom(uploadImageAtom)

  const { error: errorToast, info: infoToast } = useNotification()

  const verifyLibraryPermissions = async () => {
    try {
      if (libraryPermissions?.status === PermissionStatus.UNDETERMINED) {
        const permissionResponse = await requestLibraryPermissions()
        return permissionResponse.granted
      }

      if (libraryPermissions?.status === PermissionStatus.DENIED) {
        infoToast("Для выбора фото необходимо разрешить использование камеры")
        return false
      }

      return true
    } catch (error) {
      errorToast(
        error instanceof Error
          ? error.message
          : "Произошла ошибка при запросе разрешения на использование камеры"
      )
    }
  }

  const uploadToServer = async (uri: string, name: string) => {
    setIsLoading(true)
    try {
      const data = await uploadImage({ uri, name })

      if (data?.urls?.original) {
        onUpload(data?.urls?.original)
      }

      return data
    } catch (error) {
      console.log("Error with upload", error)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const pickImageFromLibrary = async () => {
    try {
      const hasPermission = await verifyLibraryPermissions()

      if (!hasPermission) {
        errorToast("Недостаточно прав для выбора фотографии из галерии")
        return
      }

      const result = await launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      })

      const uploadedImg = result?.assets?.at(0)

      if (uploadedImg?.uri) {
        uploadToServer(uploadedImg?.uri, uploadedImg?.fileName ?? "")
      }
    } catch (error) {
      console.log("error: ", error)
      errorToast(
        error instanceof Error
          ? error.message
          : "Произошла ошибка при выборе фото"
      )
    }
  }

  useEffect(() => {
    if (error) {
      errorToast(error)
    }
  }, [error, errorToast])

  return (
    <Button
      style={styles.uploadButton}
      containerStyle={styles.uploadButtonContainer}
      onPress={pickImageFromLibrary}
      isLoading={isLoading}
      disabled={isLoading}
    >
      <Image
        alt="Загрузить изображение"
        source={require("@/assets/images/cloud-upload.png")}
        resizeMode="contain"
        width={24}
        height={24}
        style={styles.uploadIcon}
      />
      <Text style={styles.uploadText} numberOfLines={1} ellipsizeMode="tail">
        Загрузить изображение
      </Text>
    </Button>
  )
}

const styles = StyleSheet.create({
  uploadButtonContainer: {
    flex: 1,
    flexDirection: "row",
  },
  uploadButton: {
    flex: 1,
    flexDirection: "row",
    gap: GAPS.g16,
  },
  uploadIcon: {
    width: 24,
    height: 24,
    alignSelf: "center",
  },
  uploadText: {
    color: COLORS.white,
    fontFamily: FONTS["FiraSans-Regular"],
    fontSize: FONTS.f14,
    fontWeight: 400,
  },
})
