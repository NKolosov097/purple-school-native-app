import Svg, { Path, SvgProps } from "react-native-svg"

export const ClubIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      stroke={props.color || props.stroke || "#AFB2BF"}
      strokeWidth={1.5}
      d="M2.236 16.3.764 6.854c-.144-.92.937-1.52 1.641-.91l2.444 2.11a1 1 0 0 0 1.558-.329L9.44 1.322a1 1 0 0 1 1.808 0l3.033 6.404a1 1 0 0 0 1.558.329l2.444-2.11c.704-.61 1.785-.01 1.641.91L18.452 16.3a2.5 2.5 0 0 1-2.47 2.115H4.706a2.5 2.5 0 0 1-2.47-2.115Z"
    />
  </Svg>
)
