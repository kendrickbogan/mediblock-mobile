import React from "react"
import { View, Text, StyleSheet, Pressable, ViewStyle } from "react-native"
import { SvgXml } from "react-native-svg"

import { Colors, Sizing, Forms, Outlines, Typography } from "../../styles"
import { Icons } from "../../assets"

type Option<T> = { value: T; label: string }

interface MultiSelectProps<T> {
  label: string
  onValueChange: (values: T[]) => void
  options: Option<T>[]
  values: T[]
}

const MultiSelect = <T extends unknown>({
  label,
  onValueChange,
  options,
  values,
}: MultiSelectProps<T>): JSX.Element => {
  return (
    <View style={style.inputContainer}>
      <Text style={style.inputLabel}>{label}</Text>
      {options.map((option, index) => {
        const isSelected = values.includes(option.value)

        const handleOnPress = (): void => {
          if (isSelected) {
            const newValues = values.filter(v => v !== option.value)
            onValueChange(newValues)
          } else {
            onValueChange([...values, option.value])
          }
        }

        const selectOptionStyle: ViewStyle = {
          ...style.selectOption,
          ...(isSelected && style.selectOptionSelected),
        }

        const checkboxContainerStyle: ViewStyle = {
          ...style.checkboxContainer,
          ...(isSelected && style.checkboxContainerSelected),
        }

        const strokeColor = isSelected
          ? Colors.neutral.white
          : Colors.neutral.s400

        const accessibilityHint = isSelected
          ? "Tap to deselect"
          : "Tap to select"

        return (
          <Pressable
            key={index}
            onPress={handleOnPress}
            style={selectOptionStyle}
            accessibilityRole="button"
            accessibilityState={{ checked: isSelected }}
            accessibilityHint={accessibilityHint}
          >
            <View style={checkboxContainerStyle}>
              <SvgXml
                xml={isSelected ? Icons.Checkmark : Icons.X}
                stroke={strokeColor}
                strokeWidth={Sizing.iconStroke.x20}
                width={Sizing.x20}
                height={Sizing.x20}
              />
            </View>
            <Text style={style.selectOptionText}>{option.label}</Text>
          </Pressable>
        )
      })}
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
  selectOption: {
    flexDirection: "row",
    borderWidth: Outlines.borderWidth.hairline,
    borderColor: Colors.neutral.s300,
    marginBottom: Sizing.x10,
    padding: Sizing.x10,
    borderRadius: Outlines.borderRadius.base,
    alignItems: "center",
    backgroundColor: Colors.neutral.white,
  },
  selectOptionSelected: {
    borderColor: Colors.primary.brand,
  },
  selectOptionText: {
    ...Typography.body.x20,
  },
  checkboxContainer: {
    padding: Sizing.x5,
    borderWidth: Outlines.borderWidth.hairline,
    borderColor: Colors.neutral.s300,
    borderRadius: Outlines.borderRadius.small,
    marginRight: Sizing.x10,
  },
  checkboxContainerSelected: {
    borderColor: Colors.primary.brand,
    backgroundColor: Colors.primary.brand,
  },
})

export default MultiSelect
