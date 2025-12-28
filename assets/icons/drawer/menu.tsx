import Svg, { Rect, SvgProps } from "react-native-svg"

export const MenuIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Rect
      width={10}
      height={1.65}
      fill={props.color || props.stroke || "#AFB2BF"}
      rx={0.825}
    />
    <Rect
      width={16}
      height={1.65}
      y={4.65}
      fill={props.color || props.stroke || "#AFB2BF"}
      rx={0.825}
    />
    <Rect
      width={12}
      height={1.65}
      y={9.3}
      fill={props.color || props.stroke || "#AFB2BF"}
      rx={0.825}
    />
    <Rect
      width={16}
      height={1.65}
      y={13.95}
      fill={props.color || props.stroke || "#AFB2BF"}
      rx={0.825}
    />
  </Svg>
)
