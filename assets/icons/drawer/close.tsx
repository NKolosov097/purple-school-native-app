import Svg, { Path, SvgProps } from "react-native-svg"

export const CloseIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      stroke={props.color || props.stroke || "#AFB2BF"}
      strokeLinecap="round"
      strokeWidth={props.strokeWidth || 1.5}
      d="m14.75.75-14 14m0-14 14 14"
    />
  </Svg>
)
