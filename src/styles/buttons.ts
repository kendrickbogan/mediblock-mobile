import { TextStyle, ViewStyle, PressableStateCallbackType } from "react-native"

import * as Colors from "./colors"
import * as Outlines from "./outlines"
import * as Sizing from "./sizing"
import * as Typography from "./typography"

type Pill = "primary" | "primarySmall" | "secondary" | "destructive"
export const pill: Record<Pill, ViewStyle> = {
  primary: {
    alignItems: "center",
    justifyContent: "center",
    padding: Sizing.layout.x30,
    borderColor: Colors.secondary.brand,
    borderWidth: Outlines.borderWidth.base,
    borderRadius: Outlines.borderRadius.max,
    backgroundColor: Colors.secondary.brand,
    paddingHorizontal: Sizing.layout.x30,
    paddingVertical: Sizing.layout.x20,
  },
  primarySmall: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Sizing.layout.x15,
    paddingHorizontal: Sizing.layout.x30,
    borderColor: Colors.secondary.brand,
    borderWidth: Outlines.borderWidth.base,
    borderRadius: Outlines.borderRadius.max,
    backgroundColor: Colors.secondary.brand,
  },
  secondary: {
    alignItems: "center",
    borderColor: Colors.secondary.brand,
    borderRadius: Outlines.borderRadius.max,
    borderWidth: Outlines.borderWidth.thin,
    justifyContent: "center",
    paddingHorizontal: Sizing.layout.x30,
    paddingVertical: Sizing.layout.x20,
  },
  destructive: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    padding: Sizing.layout.x15,
    borderColor: Colors.danger.s400,
    borderRadius: Outlines.borderRadius.max,
    borderWidth: Outlines.borderWidth.thin,
  },
}

type PillText = "primary" | "secondary" | "destructive"
export const pillText: Record<PillText, TextStyle> = {
  primary: {
    ...Typography.fontSize.x30,
    ...Typography.fontWeight.semibold,
    color: Colors.neutral.white,
  },
  secondary: {
    ...Typography.fontSize.x30,
    ...Typography.fontWeight.regular,
    color: Colors.secondary.brand,
  },
  destructive: {
    ...Typography.fontSize.x30,
    ...Typography.fontWeight.regular,
    color: Colors.danger.s400,
  },
}

type Circular = "primary"
export const circular: Record<Circular, ViewStyle> = {
  primary: {
    height: Sizing.layout.x30,
    width: Sizing.layout.x30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.secondary.brand,
    borderRadius: Outlines.borderRadius.max,
  },
}

type Category = "primary"
export const category: Record<Category, ViewStyle> = {
  primary: {
    alignItems: "center",
    backgroundColor: Colors.neutral.white,
    borderRadius: Outlines.borderRadius.base,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: Sizing.x10,
    marginTop: Sizing.x10,
    minHeight: Sizing.x60,
    paddingVertical: Sizing.x20,
    paddingHorizontal: Sizing.x20,
  },
}

type CategoryText = "primary"
export const categoryText: Record<CategoryText, TextStyle> = {
  primary: {
    ...Typography.fontSize.x30,
  },
}

const opacity = (state: PressableStateCallbackType): ViewStyle => {
  const opacity = state.pressed ? 0.65 : 1
  return { opacity }
}

export const applyOpacity = (style: ViewStyle = {}) => {
  return (state: PressableStateCallbackType): ViewStyle => {
    return {
      ...style,
      ...opacity(state),
    }
  }
}
