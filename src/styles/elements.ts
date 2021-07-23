import { ViewStyle } from "react-native"

import * as Colors from "./colors"

type Container = "base"
export const container: Record<Container, ViewStyle> = {
  base: {
    backgroundColor: Colors.neutral.s100,
    flex: 1,
  },
}
