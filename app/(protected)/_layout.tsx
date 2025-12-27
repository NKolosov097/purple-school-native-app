import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerNavigationOptions,
  DrawerNavigationProp,
} from "@react-navigation/drawer"
import { ParamListBase, RouteProp } from "@react-navigation/native"
import {
  Image,
  ImageURISource,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

import { Redirect } from "expo-router"
import { Drawer } from "expo-router/drawer"

import { useAtom, useAtomValue } from "jotai"

import {
  authAtom,
  authLoadedAtom,
  AuthState,
} from "@/entities/auth/model/auth.state"

import { COLORS, GAPS } from "@/shared/config/tokens"
import { Link } from "@/shared/ui/link/link"

const AVATAR_SIZE = 100

interface IDrawerScreen {
  name: string
  title: string
  label: string
  imgSource: ImageURISource
}

const screenOptions:
  | DrawerNavigationOptions
  | ((props: {
      route: RouteProp<ParamListBase, string>
      navigation: DrawerNavigationProp<ParamListBase, string, undefined>
      theme: ReactNavigation.Theme
    }) => DrawerNavigationOptions)
  | undefined = ({ navigation }) => ({
  headerShown: true,
  headerTitleAlign: "center",
  headerStatusBarHeight: Platform.select({ android: 0, ios: undefined }),
  headerTitle: ({ children }) => (
    <Text style={styles.headerTitle}>{children}</Text>
  ),
  headerLeft: () => (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel="Открыть меню"
      onPress={() => navigation.toggleDrawer()}
      hitSlop={{ top: 12, right: 12, bottom: 12, left: 12 }}
      style={{ paddingHorizontal: 12 }}
    >
      <Image
        alt="Меню"
        source={require("@/assets/images/drawer/menu.png")}
        resizeMode="contain"
        width={24}
        height={24}
        style={styles.image}
      />
    </TouchableOpacity>
  ),
  headerStyle: {
    backgroundColor: COLORS.grayDark,
    height: 52,
  },
  sceneContainerStyle: {
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
  },
  drawerActiveTintColor: COLORS.white,
  drawerInactiveTintColor: COLORS.gray,
  drawerActiveBackgroundColor: COLORS.grayDark,
})

const drawerContent = (
  props: DrawerContentComponentProps,
  setAuth: (auth: AuthState) => void
) => (
  <DrawerContentScrollView
    {...props}
    contentContainerStyle={styles.drawerContentContainer}
  >
    <Pressable
      onPress={() => props.navigation.closeDrawer()}
      style={styles.closeButton}
    >
      <Image
        alt="Закрыть"
        source={require("@/assets/images/drawer/close.png")}
        resizeMode="contain"
        width={24}
        height={24}
        style={styles.closeImage}
      />
    </Pressable>

    <View style={styles.avatarContainer}>
      <Image
        alt="Аватар"
        source={require("@/assets/images/favicon.png")}
        resizeMode="contain"
        width={AVATAR_SIZE}
        height={AVATAR_SIZE}
        style={styles.avatar}
      />
      <Text style={styles.avatarText}>Имя Фамилия</Text>
    </View>

    <DrawerItemList {...props} />

    <View style={styles.footer}>
      <Link
        href="/login"
        onPress={() =>
          setAuth({ accessToken: null, isLoading: false, error: null })
        }
      >
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

const drawerScreens: IDrawerScreen[] = [
  {
    name: "profile",
    title: "Профиль",
    label: "Профиль",
    imgSource: require("@/assets/images/drawer/profile.png"),
  },
  {
    name: "courses/index",
    title: "Мои курсы",
    label: "Курсы",
    imgSource: require("@/assets/images/drawer/courses.png"),
  },
  {
    name: "club",
    title: "Клуб",
    label: "Клуб",
    imgSource: require("@/assets/images/drawer/club.png"),
  },
]

export default function ProtectedLayout() {
  const [{ accessToken }, setAuth] = useAtom(authAtom)
  const authLoaded = useAtomValue(authLoadedAtom)

  if (!authLoaded) return null

  if (!accessToken) {
    return <Redirect href="/login" />
  }

  return (
    <Drawer
      backBehavior="history"
      screenOptions={screenOptions}
      drawerContent={(props) => drawerContent(props, setAuth)}
    >
      {drawerScreens.map((screen) => (
        <Drawer.Screen
          key={screen.name}
          name={screen.name}
          options={{
            title: screen.title,
            drawerLabel: screen.label,
            drawerIcon: () => (
              <Image
                alt={screen.title}
                source={screen.imgSource}
                resizeMode="contain"
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
  headerTitle: {
    fontFamily: "FiraSans",
    fontWeight: 400,
    fontSize: 16,
    color: COLORS.white,
  },
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
  avatarContainer: {
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
    gap: GAPS.g8,
  },
  avatarText: {
    fontFamily: "FiraSans",
    fontWeight: 400,
    fontSize: 16,
    color: COLORS.white,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    alignSelf: "center",
    borderRadius: AVATAR_SIZE / 2,
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
