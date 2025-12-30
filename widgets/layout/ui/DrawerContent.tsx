import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer"
import { Image, Pressable, StyleSheet, View } from "react-native"

import { useSetAtom } from "jotai"

import { CloseIcon } from "@/assets/icons/drawer/close"

import { UserMenu } from "@/widgets/user/ui/UserMenu"

import { logoutAtom } from "@/entities/auth/model/auth.state"

import { GAPS } from "@/shared/config/tokens"
import { Link } from "@/shared/ui/link/link"

export const DrawerContent = (props: DrawerContentComponentProps) => {
  const logout = useSetAtom(logoutAtom)

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContentContainer}
    >
      <Pressable
        onPress={() => props.navigation.closeDrawer()}
        style={styles.closeButton}
      >
        <CloseIcon width={24} height={24} style={styles.closeImage} />
      </Pressable>

      <UserMenu />

      <DrawerItemList {...props} />
      <View style={styles.footer}>
        <Link href="/login" onPress={logout}>
          Выйти
        </Link>

        <Image
          alt="Purple School"
          source={require("@/assets/images/purple-school.png")}
          resizeMode="contain"
          width={162}
          height={28}
          style={styles.footerLogo}
        />
      </View>
    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({
  drawerContentContainer: {
    position: "relative",
    flexGrow: 1,
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: 0,
    paddingStart: 0,
    paddingEnd: 0,
  },
  closeButton: {
    position: "absolute",
    top: 24,
    right: 24,
  },
  closeImage: {
    width: 14,
    height: 14,
  },
  footer: {
    marginTop: "auto",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: GAPS.g16,
    marginBottom: 40,
  },
  footerLogo: {
    width: 162,
    height: 28,
  },
})
