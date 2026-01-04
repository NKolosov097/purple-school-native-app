import { useEffect } from "react"
import { StyleSheet, Text, View } from "react-native"

import { useAtom } from "jotai"

import { loadUserAtom } from "@/entities/user/model/user.state"

import { COLORS, FONTS, GAPS } from "@/shared/config/tokens"
import { Avatar } from "../../../shared/ui/avatar/avatar"

export const UserMenu = () => {
  const [{ user }, loadUser] = useAtom(loadUserAtom)

  useEffect(() => {
    loadUser()
  }, [loadUser])

  return (
    <View style={styles.avatarContainer}>
      <Avatar image={user?.profile.photo} />

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
})
