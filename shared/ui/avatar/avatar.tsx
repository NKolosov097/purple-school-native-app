import { Image, StyleSheet } from "react-native"

import { AVATAR_SIZE, COLORS } from "@/shared/config/tokens"

interface IAvatarProps {
  image?: string | null
}

export const Avatar = ({ image }: IAvatarProps) => {
  return (
    <Image
      alt="Аватар"
      source={
        image ? { uri: image } : require("@/assets/images/user/empty-user.png")
      }
      resizeMode="contain"
      width={AVATAR_SIZE}
      height={AVATAR_SIZE}
      style={styles.avatar}
    />
  )
}

const styles = StyleSheet.create({
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    alignSelf: "center",
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: COLORS.gray,
  },
})
