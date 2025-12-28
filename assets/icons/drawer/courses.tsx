import Svg, { Path, SvgProps } from "react-native-svg"

export const CoursesIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      stroke={props.color || props.stroke || "#AFB2BF"}
      strokeWidth={1.5}
      d="m4.34 10.037 5.373 2.874a4 4 0 0 0 3.773 0l5.373-2.874m-14.52 0L1.636 8.222c-1.293-.87-1.14-2.818.272-3.475l7.6-3.531a5 5 0 0 1 4.19-.011l7.69 3.525c1.433.656 1.579 2.635.258 3.494l-2.786 1.813m-14.52 0v5.713c0 .524.204 1.026.607 1.36 1.1.907 3.595 2.633 6.653 2.633 3.059 0 5.554-1.726 6.654-2.634.403-.333.606-.835.606-1.359v-5.713"
    />
  </Svg>
)
