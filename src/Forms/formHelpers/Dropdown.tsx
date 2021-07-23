import React, { useState } from "react"
import { Text, Pressable, View, StyleSheet, ViewStyle } from "react-native"
import { SvgXml } from "react-native-svg"

import FieldErrors from "./FieldErrors"

import {
  Sizing,
  Colors,
  Outlines,
  Buttons,
  Typography,
  Forms,
} from "../../styles"
import { Icons } from "../../assets"

type Option<T> = { value: T; label: string }

interface DropdownProps<T> {
  label: string
  onValueChange: (value: T) => void
  options: Option<T>[]
  value: T | undefined
  errors?: string
}

const Dropdown = <T extends unknown>({
  label,
  onValueChange,
  options,
  value,
  errors,
}: DropdownProps<T>): JSX.Element => {
  const [areOptionsVisible, setAreOptionsVisible] = useState(false)
  const selectedOption = options.find(option => {
    return option.value === value
  })

  const handleOnPressDropdown = (): void => {
    setAreOptionsVisible(!areOptionsVisible)
  }

  const optionButtons = options.map((option, index) => {
    const handleOnPressOption = (): void => {
      onValueChange(option.value)
      setAreOptionsVisible(false)
    }

    const isSelected = option === selectedOption
    const isLastOption = index === options.length - 1
    const optionButtonStyle: ViewStyle = {
      ...style.option,
      ...(isSelected && style.selectedOption),
      ...(isLastOption && style.lastOption),
    }

    const optionTextStyle = isSelected
      ? style.selectedOptionText
      : style.dropdownButtonText

    return (
      <View key={index}>
        <Pressable
          style={Buttons.applyOpacity(optionButtonStyle)}
          onPress={handleOnPressOption}
          accessibilityRole="button"
          accessible
          accessibilityLabel={option.label}
        >
          <Text style={optionTextStyle}>{option.label}</Text>
        </Pressable>
      </View>
    )
  })

  const dropdownButtonStyle = areOptionsVisible
    ? style.dropdownButtonOpen
    : style.dropdownButton

  const dropdownTriangleStyle = areOptionsVisible
    ? Icons.DropdownTriangleUp
    : Icons.DropdownTriangle

  const selectedOptionText = `${
    selectedOption?.label || "Select one"
  } Tap to see options`

  return (
    <View style={style.inputContainer}>
      <Text style={style.inputLabel}>{label}</Text>
      <Pressable
        style={Buttons.applyOpacity(dropdownButtonStyle)}
        onPress={handleOnPressDropdown}
        accessibilityRole="button"
        accessible
        accessibilityLabel={selectedOptionText}
      >
        <Text style={style.dropdownButtonText}>
          {selectedOption?.label || "Select one"}
        </Text>
        <SvgXml
          xml={dropdownTriangleStyle}
          fill={Colors.neutral.black}
          width={Sizing.icons.x7}
          height={Sizing.icons.x7}
        />
      </Pressable>

      {areOptionsVisible && <View>{optionButtons}</View>}
      <FieldErrors errors={errors} />
    </View>
  )
}

const style = StyleSheet.create({
  inputContainer: {
    marginBottom: Sizing.x20,
  },
  inputLabel: {
    ...Forms.inputLabel.primary,
  },
  dropdownButton: {
    alignItems: "center",
    backgroundColor: Colors.neutral.white,
    borderRadius: Outlines.borderRadius.small,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: Sizing.x20,
  },
  dropdownButtonOpen: {
    alignItems: "center",
    backgroundColor: Colors.neutral.white,
    borderTopRightRadius: Outlines.borderRadius.small,
    borderTopLeftRadius: Outlines.borderRadius.small,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: Sizing.x20,
  },
  dropdownButtonText: {
    ...Typography.body.x30,
  },
  option: {
    backgroundColor: Colors.neutral.white,
    padding: Sizing.x20,
  },
  selectedOption: {
    backgroundColor: Colors.primary.brand,
    padding: Sizing.x20,
  },
  lastOption: {
    borderBottomLeftRadius: Outlines.borderRadius.small,
    borderBottomRightRadius: Outlines.borderRadius.small,
  },
  selectedOptionText: {
    ...Typography.body.x30,
    ...Typography.fontWeight.semibold,
    color: Colors.neutral.white,
  },
})

export default Dropdown
