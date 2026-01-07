import { useEffect, useState } from "react"

import {
  addOrientationChangeListener,
  getOrientationAsync,
  Orientation,
  removeOrientationChangeListener,
} from "expo-screen-orientation"

export const useScreenOrientation = () => {
  const [orientation, setOrientation] = useState<Orientation>(
    Orientation.UNKNOWN
  )

  useEffect(() => {
    getOrientationAsync().then((o) => setOrientation(o))
    const listener = addOrientationChangeListener(
      ({ orientationInfo: { orientation: o } }) => {
        setOrientation(o)
      }
    )

    return () => {
      removeOrientationChangeListener(listener)
    }
  }, [])

  return orientation
}
