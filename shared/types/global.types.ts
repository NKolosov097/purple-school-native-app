import type { ParamListBase, RouteProp } from "@react-navigation/native"
import type { NativeStackNavigationOptions } from "@react-navigation/native-stack"

export interface StackProps {
  screenOptions?:
    | NativeStackNavigationOptions
    | ((props: {
        route: RouteProp<ParamListBase, string>
        navigation: import("@react-navigation/native-stack").NativeStackNavigationProp<
          ParamListBase,
          string,
          undefined
        >
        theme: ReactNavigation.Theme
      }) => NativeStackNavigationOptions)
    | undefined
}
