import React, { FC } from "react"
import { Pressable, StyleSheet } from "react-native"
import { Sizing, Colors, Buttons } from "../styles"
import { SvgXml } from "react-native-svg"
import { Icons } from "../assets"

export const applyCloseButton = (onPress: () => void) => {
  return function closeButton(): Element {
    return <CloseButton onPress={onPress} />
  }
}

interface CloseButtonProps {
  onPress: () => void
}

const CloseButton: FC<CloseButtonProps> = ({ onPress }) => {
  const handleOnPressClose = (): void => {
    onPress()
  }

  return (
    <Pressable
      style={Buttons.applyOpacity(style.closeButton)}
      accessibilityRole="button"
      accessibilityLabel="Close screen"
      onPress={handleOnPressClose}
      hitSlop={Sizing.x10}
    >
      <SvgXml
        xml={Icons.X}
        width={Sizing.icons.x30}
        height={Sizing.icons.x30}
        stroke={Colors.neutral.white}
        strokeWidth={Sizing.iconStroke.x20}
      />
    </Pressable>
  )
}

const style = StyleSheet.create({
  closeButton: {
    paddingHorizontal: Sizing.x20,
  },
})
