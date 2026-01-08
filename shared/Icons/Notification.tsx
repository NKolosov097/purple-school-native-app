import type { ComponentProps } from "react"
import Svg, { Path } from "react-native-svg"

interface NotificationIconProps extends ComponentProps<typeof Svg> {
  color?: string
  filled?: boolean
}

export const NotificationIcon = ({
  color = "#FAFAFA",
  filled = false,
  ...props
}: NotificationIconProps) => (
  <Svg width={24} height={24} viewBox="0 0 32 32" {...props}>
    <Path
      d="M28.59 22.49c-.28-.5-.62-1-1-1.53a9.25 9.25 0 0 1-1.83-3.87l-.42-5.9C25.09 6.62 22.42 2 17.11 2h-2.22c-5.31 0-8 4.62-8.27 9.18l-.42 5.91A9.38 9.38 0 0 1 4.37 21c-.34.52-.68 1-.91 1.45a2.22 2.22 0 0 0-.2 2.33A2.4 2.4 0 0 0 5.46 26h7.72a3 3 0 1 0 5.64 0h7.72a2.4 2.4 0 0 0 2.2-1.26 2.14 2.14 0 0 0-.15-2.25z"
      fill={filled ? color : "none"}
      stroke={filled ? "none" : color}
      strokeWidth={2}
      strokeLinejoin="round"
    />
    <Path
      d="M17 27a1 1 0 1 1-1-1 1 1 0 0 1 1 1z"
      fill={filled ? color : "none"}
      stroke={filled ? "none" : color}
      strokeWidth={2}
    />
  </Svg>
)
