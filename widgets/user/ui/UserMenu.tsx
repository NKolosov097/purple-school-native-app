import { useEffect } from "react"
import { Image, StyleSheet, Text, View } from "react-native"

import { useAtom } from "jotai"

import { loadUserAtom } from "@/entities/user/model/user.state"

import { COLORS, FONTS, GAPS } from "@/shared/config/tokens"

const AVATAR_SIZE = 70

export const UserMenu = () => {
  const [{ user }, loadUser] = useAtom(loadUserAtom)

  useEffect(() => {
    loadUser()
  }, [loadUser])

  return (
    <View style={styles.avatarContainer}>
      <Image
        alt="Аватар"
        source={
          user?.profile.photo
            ? { uri: user.profile.photo }
            : require("@/assets/images/user/empty-user.png")
        }
        resizeMode="contain"
        width={AVATAR_SIZE}
        height={AVATAR_SIZE}
        style={styles.avatar}
      />
      <Text style={styles.avatarText}>
        {user?.profile.name} {user?.profile.surname}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  avatarContainer: {
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
    gap: GAPS.g8,
  },
  avatarText: {
    fontFamily: FONTS["FiraSans-Regular"],
    fontWeight: 400,
    fontSize: FONTS.f16,
    color: COLORS.white,
  },
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
