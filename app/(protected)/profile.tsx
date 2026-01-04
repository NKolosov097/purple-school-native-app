import { useEffect, useMemo, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { StyleSheet, Text, View } from "react-native"

import {
  launchCameraAsync,
  PermissionStatus,
  useCameraPermissions,
} from "expo-image-picker"
import { isAvailableAsync, shareAsync } from "expo-sharing"

import { useAtom, useAtomValue } from "jotai"
import { parse, ValiError } from "valibot"

import { useNotification } from "@/features/notification/model/useNotification"
import { uploadImageAtom } from "@/features/upload/model/upload.state"
import { Upload } from "@/features/upload/ui/Upload"

import {
  ProfileFormData,
  profileSchema,
} from "@/entities/user/model/user.model"
import {
  loadUserAtom,
  updateProfileAtom,
} from "@/entities/user/model/user.state"

import { AVATAR_SIZE, COLORS, FONTS, GAPS } from "@/shared/config/tokens"
import { SHARE_PROFILE_URL } from "@/shared/constants/api"
import { Avatar } from "@/shared/ui/avatar/avatar"
import { Button } from "@/shared/ui/button/button"
import { Input } from "@/shared/ui/input/input"

const ProfileScreen = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const { user } = useAtomValue(loadUserAtom)
  const [{ isLoading }, saveProfile] = useAtom(updateProfileAtom)
  const [{ isLoading: uploadLoading }, uploadImage] = useAtom(uploadImageAtom)
  const [cameraPermissions, requestCameraPermissions] = useCameraPermissions()

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.profile?.name ?? "",
    },
    mode: "onBlur",
  })

  const {
    error: errorToast,
    info: infoToast,
    success: successToast,
  } = useNotification()

  const verifyCameraPermissions = async () => {
    try {
      if (cameraPermissions?.status === PermissionStatus.UNDETERMINED) {
        const permissionResponse = await requestCameraPermissions()
        return permissionResponse.granted
      }

      if (cameraPermissions?.status === PermissionStatus.DENIED) {
        infoToast("Для фото необходимо разрешить использование камеры")
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

  const takeNewPhotoForAvatar = async () => {
    try {
      const hasPermission = await verifyCameraPermissions()
      if (!hasPermission) return

      const result = await launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      })

      const asset = result?.assets?.[0]
      if (!asset?.uri) return

      const uploaded = await uploadImage({
        uri: asset.uri,
        name: asset.fileName ?? "avatar.jpg",
      })

      const url = uploaded?.urls?.original
      if (!url) return

      setProfileImage(url)
      await saveProfile({ photo: url })
    } catch (error) {
      console.log("error: ", error)
      errorToast(
        error instanceof Error
          ? error.message
          : "Произошла ошибка при открытии камеры"
      )
    }
  }

  const avatarImage = useMemo((): string | undefined => {
    if (profileImage) {
      return profileImage
    }

    if (user?.profile.photo) {
      return user?.profile.photo
    }
  }, [profileImage, user?.profile.photo])

  const onSubmit = async ({ name }: ProfileFormData) => {
    try {
      await saveProfile({
        ...(name && { name }),
        ...(avatarImage && { photo: avatarImage }),
      })
      successToast("Профиль успешно обновлен")
    } catch (error) {
      console.log("error: ", error)
    }
  }

  useEffect(() => {
    if (user?.profile?.name) {
      setValue("name", user?.profile?.name)
    }
  }, [user?.profile?.name, setValue])

  const shareProfile = async () => {
    try {
      const isSharingAvailable = await isAvailableAsync()
      if (!isSharingAvailable) {
        errorToast("Невозможно поделиться профилем")
        return
      }

      await shareAsync(SHARE_PROFILE_URL, {
        dialogTitle: "Поделиться профилем",
      })
    } catch (error) {
      console.log("error: ", error)

      errorToast(
        error instanceof Error
          ? error.message
          : "Произошла ошибка при отправке профиля"
      )
    }
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Button
            variant="link"
            containerStyle={styles.avatarButtonContainer}
            style={styles.avatarButton}
            onPress={takeNewPhotoForAvatar}
            isLoading={uploadLoading}
            disabled={uploadLoading}
          >
            <Avatar image={avatarImage} />
          </Button>

          <Upload onUpload={(uri) => setProfileImage(uri)} />
        </View>

        <View>
          <Controller
            name="name"
            control={control}
            rules={{
              validate: (value) => {
                try {
                  parse(profileSchema?.entries?.name, value)
                  return true
                } catch (validationError) {
                  if (validationError instanceof ValiError) {
                    return validationError.issues[0].message
                  }
                  return "Неизвестная ошибка валидации"
                }
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Имя"
                autoCapitalize="words"
              />
            )}
          />
          {errors?.name?.message && (
            <Text style={styles.errorText}>{errors?.name?.message}</Text>
          )}
        </View>

        <Button
          variant="primary"
          onPress={handleSubmit(onSubmit)}
          isLoading={isLoading}
          disabled={isLoading}
        >
          <Text style={styles.submitText}>Сохранить</Text>
        </Button>
      </View>

      <Button variant="link" onPress={shareProfile}>
        <Text style={styles.shareButtonText}>Поделиться</Text>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
    gap: GAPS.g24,
  },
  container: {
    alignItems: "stretch",
    justifyContent: "flex-start",
    marginTop: GAPS.g32,
    gap: GAPS.g24,
    paddingInline: 30,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "nowrap",
    gap: GAPS.g24,
  },
  avatarButtonContainer: {
    flex: 0,
  },
  avatarButton: {
    alignItems: "center",
    justifyContent: "center",
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
  },
  submitText: {
    color: COLORS.white,
    fontFamily: FONTS["FiraSans-Regular"],
    fontSize: FONTS.f18,
    fontWeight: 400,
  },
  errorText: {
    fontFamily: FONTS["FiraSans-Regular"],
    fontWeight: 400,
    fontSize: FONTS.f16,
    color: COLORS.error,
  },
  shareButtonText: {
    color: COLORS.link,
    fontFamily: FONTS["FiraSans-Regular"],
    fontWeight: 400,
    fontSize: FONTS.f18,
  },
})

export default ProfileScreen
