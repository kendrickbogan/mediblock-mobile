import { TextStyle, Platform } from "react-native"
import { systemWeights } from "react-native-typography"

type FontSize = "x5" | "x10" | "x20" | "x30" | "x40" | "x50" | "x60" | "x70"
export const fontSize: Record<FontSize, TextStyle> = {
  x5: {
    fontSize: 12,
  },
  x10: {
    fontSize: 13,
  },
  x20: {
    fontSize: 14,
  },
  x30: {
    fontSize: 16,
  },
  x40: {
    fontSize: 19,
  },
  x50: {
    fontSize: 24,
  },
  x60: {
    fontSize: 32,
  },
  x70: {
    fontSize: 38,
  },
}

type FontWeight = "regular" | "semibold" | "bold"
export const fontWeight: Record<FontWeight, TextStyle> = {
  regular: {
    ...systemWeights.regular,
  },
  semibold: {
    ...systemWeights.semibold,
  },
  bold: {
    ...systemWeights.bold,
  },
}

type LetterSpacing = "x30" | "x40"
export const letterSpacing: Record<LetterSpacing, number> = {
  x30: 2,
  x40: 3,
}

type LineHeight = "none" | "x10" | "x20" | "x30" | "x40" | "x50" | "x60" | "x70"
export const lineHeight: Record<LineHeight, TextStyle> = {
  none: {
    lineHeight: undefined,
  },
  x10: {
    lineHeight: 20,
  },
  x20: {
    lineHeight: 22,
  },
  x30: {
    lineHeight: 24,
  },
  x40: {
    lineHeight: 26,
  },
  x50: {
    lineHeight: 32,
  },
  x60: {
    lineHeight: 38,
  },
  x70: {
    lineHeight: 44,
  },
}

type Header = "x10" | "x20" | "x30" | "x40" | "x50" | "x60" | "x70"
export const header: Record<Header, TextStyle> = {
  x10: {
    ...fontSize.x10,
    ...lineHeight.x10,
    ...fontWeight.bold,
  },
  x20: {
    ...fontSize.x20,
    ...lineHeight.x20,
    ...fontWeight.bold,
  },
  x30: {
    ...fontSize.x30,
    ...lineHeight.x30,
    ...fontWeight.bold,
  },
  x40: {
    ...fontSize.x40,
    ...lineHeight.x40,
    ...fontWeight.bold,
  },
  x50: {
    ...fontSize.x50,
    ...lineHeight.x50,
    ...fontWeight.bold,
  },
  x60: {
    ...fontSize.x60,
    ...lineHeight.x60,
    ...fontWeight.bold,
  },
  x70: {
    ...fontSize.x70,
    ...lineHeight.x70,
    ...fontWeight.bold,
  },
}

type Subheader = "x10" | "x20" | "x30" | "x40" | "x50"
export const subheader: Record<Subheader, TextStyle> = {
  x10: {
    ...fontSize.x10,
    ...lineHeight.x10,
    ...fontWeight.semibold,
  },
  x20: {
    ...fontSize.x20,
    ...lineHeight.x20,
    ...fontWeight.semibold,
  },
  x30: {
    ...fontSize.x30,
    ...lineHeight.x30,
    ...fontWeight.semibold,
  },
  x40: {
    ...fontSize.x40,
    ...lineHeight.x40,
    ...fontWeight.semibold,
  },
  x50: {
    ...fontSize.x50,
    ...lineHeight.x50,
    ...fontWeight.semibold,
  },
}

type Body = "x10" | "x20" | "x30" | "x40" | "x50"
export const body: Record<Body, TextStyle> = {
  x10: {
    ...fontSize.x10,
    ...lineHeight.x10,
    ...fontWeight.regular,
  },
  x20: {
    ...fontSize.x20,
    ...lineHeight.x20,
    ...fontWeight.regular,
  },
  x30: {
    ...fontSize.x30,
    ...lineHeight.x30,
    ...fontWeight.regular,
  },
  x40: {
    ...fontSize.x40,
    ...lineHeight.x40,
    ...fontWeight.regular,
  },
  x50: {
    ...fontSize.x50,
    ...lineHeight.x50,
    ...fontWeight.regular,
  },
}

const monospaceFontFamily = Platform.select({
  ios: "Menlo",
  android: "monospace",
})

type Monospace = "base"
export const monospace: Record<Monospace, TextStyle> = {
  base: {
    fontFamily: monospaceFontFamily,
    letterSpacing: letterSpacing.x30,
  },
}

type AccessibilityMultiplier = "x1" | "x10" | "x20" | "x30" | "x40" | "x50"
export const accessibilityMultiplier: Record<
  AccessibilityMultiplier,
  number
> = {
  x1: 1,
  x10: 1.2,
  x20: 1.6,
  x30: 1.8,
  x40: 2,
  x50: 2.5,
}
