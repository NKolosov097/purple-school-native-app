import {
  DrawerNavigationOptions,
  DrawerNavigationProp,
} from "@react-navigation/drawer"
import { ParamListBase, RouteProp } from "@react-navigation/native"
import { ComponentType } from "react"
import { Platform, StyleSheet, TouchableOpacity } from "react-native"
import { SvgProps } from "react-native-svg"

import { Redirect } from "expo-router"
import { Drawer } from "expo-router/drawer"

import { useAtomValue } from "jotai"

import { ClubIcon } from "@/assets/icons/drawer/club"
import { CoursesIcon } from "@/assets/icons/drawer/courses"
import { MenuIcon } from "@/assets/icons/drawer/menu"
import { ProfileIcon } from "@/assets/icons/drawer/profile"

import { authAtom, authLoadedAtom } from "@/entities/auth/model/auth.state"

import { COLORS, FONTS } from "@/shared/config/tokens"
import { DrawerContent } from "@/widgets/layout/ui/DrawerContent"

interface IDrawerScreen {
  name: string
  title: string
  label: string
  Icon: ComponentType<SvgProps>
}

const screenOptions:
  | DrawerNavigationOptions
  | ((props: {
      route: RouteProp<ParamListBase, string>
      navigation: DrawerNavigationProp<ParamListBase, string, undefined>
      theme: ReactNavigation.Theme
    }) => DrawerNavigationOptions)
  | undefined = ({ navigation: { getState, toggleDrawer }, route }) => {
  const state = getState()
  const activeRouteName = state.routes[state.index]?.name

  const isFocused = activeRouteName === route.name

  return {
    headerShown: true,
    headerTitleAlign: "center",
    headerStatusBarHeight: Platform.select({ android: 0, ios: undefined }),
    headerTitleStyle: {
      color: COLORS.white,
      fontFamily: "FiraSans",
      fontWeight: 400,
      fontSize: FONTS.f20,
    },
    headerLeft: () => (
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Открыть меню"
        onPress={toggleDrawer}
        hitSlop={{ top: 12, right: 12, bottom: 12, left: 12 }}
        style={{ paddingHorizontal: 12 }}
      >
        <MenuIcon width={24} height={24} style={styles.image} />
      </TouchableOpacity>
    ),
    headerStyle: {
      backgroundColor: COLORS.grayDark,
      shadowColor: COLORS.grayDark,
      shadowOpacity: 0,
      height: 52,
    },
    sceneStyle: {
      borderRadius: 0,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    drawerStyle: {
      backgroundColor: COLORS.black,
      width: "100%",
      borderRadius: 0,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    drawerItemStyle: {
      borderRadius: 0,
      marginHorizontal: 0,
      fontFamily: "FiraSans",
      fontWeight: 400,
      fontSize: FONTS.f16,
      color: COLORS.white,
      ...(isFocused
        ? {
            borderRightColor: COLORS.primary,
            borderRightWidth: 5,
            borderStyle: "solid",
          }
        : { borderRightWidth: 0 }),
    },
    drawerActiveTintColor: COLORS.white,
    drawerInactiveTintColor: COLORS.gray,
    drawerActiveBackgroundColor: COLORS.grayDark,
  }
}

const drawerScreens: IDrawerScreen[] = [
  {
    name: "profile",
    title: "Профиль",
    label: "Профиль",
    Icon: ProfileIcon,
  },
  {
    name: "courses/index",
    title: "Мои курсы",
    label: "Курсы",
    Icon: CoursesIcon,
  },
  {
    name: "club",
    title: "Клуб",
    label: "Клуб",
    Icon: ClubIcon,
  },
]

export default function ProtectedLayout() {
  const { accessToken } = useAtomValue(authAtom)
  const authLoaded = useAtomValue(authLoadedAtom)

  if (!authLoaded) return null

  if (!accessToken) {
    return <Redirect href="/login" />
  }

  return (
    <Drawer
      backBehavior="history"
      screenOptions={screenOptions}
      drawerContent={DrawerContent}
    >
      {drawerScreens.map(({ title, label, name, Icon }) => (
        <Drawer.Screen
          key={name}
          name={name}
          options={{
            title,
            drawerLabel: label,
            drawerIcon: ({ focused }) => (
              <Icon
                color={focused ? COLORS.primary : COLORS.gray}
                width={24}
                height={24}
                style={styles.image}
              />
            ),
          }}
        />
      ))}

      <Drawer.Screen
        name="courses/[alias]"
        options={{
          title: "Курс",
          drawerItemStyle: { display: "none", height: 0 },
        }}
      />
    </Drawer>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 24,
    height: 24,
  },
})
