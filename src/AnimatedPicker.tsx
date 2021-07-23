import React, { FC, ReactText, useEffect, useState } from "react"
import {
  StyleSheet,
  View,
  LayoutChangeEvent,
  Pressable,
  ViewStyle,
  TextStyle,
  ColorValue,
} from "react-native"
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { mixColor } from "react-native-redash"

import { Colors, Outlines, Sizing, Typography } from "./styles"

type PickerSize = {
  width: number
  height: number
}

export type AnimatedPickerOption<OptionValue> = {
  label: string
  value: OptionValue
  color: ColorValue
}

interface AnimatedPickerProps<OptionValue> {
  options: AnimatedPickerOption<OptionValue>[]
  currentOption: AnimatedPickerOption<OptionValue>
  onUpdateCurrentOption: (option: AnimatedPickerOption<OptionValue>) => void
}

const ACCEPTED_OPTIONS_LENGTHS = [2, 3]

const AnimatedPicker = <OptionValue extends unknown>({
  options,
  currentOption,
  onUpdateCurrentOption,
}: AnimatedPickerProps<OptionValue>): JSX.Element => {
  if (!ACCEPTED_OPTIONS_LENGTHS.includes(options.length)) {
    throw Error(
      "AnimatedPicker is designed to have 2 or 3 options, but you gave it " +
        options.length,
    )
  }

  const currentIndex = options.findIndex(el => el === currentOption)
  const currentIndexSharedValue = useSharedValue(currentIndex)

  useEffect(() => {
    currentIndexSharedValue.value = currentIndex
  }, [currentIndexSharedValue, currentIndex])

  const [pickerSize, setPickerSize] = useState<PickerSize | null>(null)

  const handleOnLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    setPickerSize({ width, height })
  }

  return (
    <View style={style.picker} onLayout={handleOnLayout}>
      {pickerSize && (
        <>
          <Indicator
            pickerSize={pickerSize}
            currentIndex={currentIndexSharedValue}
            options={options}
          />
          <PickerOptions
            pickerSize={pickerSize}
            currentIndex={currentIndexSharedValue}
            options={options}
            onUpdateCurrentOption={onUpdateCurrentOption}
          />
        </>
      )}
    </View>
  )
}

interface PickerOptionsProps<OptionValue> {
  pickerSize: PickerSize
  currentIndex: Animated.SharedValue<number>
  options: AnimatedPickerOption<OptionValue>[]
  onUpdateCurrentOption: (option: AnimatedPickerOption<OptionValue>) => void
}

const PickerOptions = <OptionValue extends unknown>({
  pickerSize,
  currentIndex,
  options,
  onUpdateCurrentOption,
}: PickerOptionsProps<OptionValue>): JSX.Element => {
  const handleOnPressOption = (option: AnimatedPickerOption<OptionValue>) => {
    onUpdateCurrentOption(option)
  }

  const buttonStyle: ViewStyle = {
    width: pickerSize.width / options.length,
  }

  return (
    <>
      {options.map((option, index) => {
        const isSelected = currentIndex.value === index
        const accessibilityHint = !isSelected
          ? `Tap to change status to ${option.label}`
          : undefined

        return (
          <Pressable
            onPress={() => handleOnPressOption(option)}
            style={buttonStyle}
            key={option.label}
            disabled={isSelected}
            accessibilityRole="button"
            accessibilityState={{
              selected: isSelected,
              disabled: isSelected,
            }}
            accessibilityHint={accessibilityHint}
          >
            <IndicatorText
              optionLabel={option.label}
              index={index}
              currentIndex={currentIndex}
            />
          </Pressable>
        )
      })}
    </>
  )
}

interface IndicatorTextProps {
  optionLabel: string
  index: number
  currentIndex: Animated.SharedValue<number>
}

const IndicatorText: FC<IndicatorTextProps> = ({
  optionLabel,
  index,
  currentIndex,
}) => {
  const progress = useDerivedValue(() => {
    return withTiming(currentIndex.value === index ? 1 : 0)
  })

  const indicatorTextStyle: TextStyle = {
    ...Typography.body.x20,
    paddingVertical: Sizing.x5,
    textAlign: "center",
  }

  const indicatorAnimatedTextStyle = useAnimatedStyle(() => {
    const color = mixColor(
      progress.value,
      Colors.neutral.black,
      Colors.neutral.white,
    )

    return {
      color,
    }
  })

  return (
    <Animated.Text
      style={[indicatorTextStyle, indicatorAnimatedTextStyle]}
      maxFontSizeMultiplier={Typography.accessibilityMultiplier.x10}
    >
      {optionLabel}
    </Animated.Text>
  )
}

interface IndicatorProps<OptionValue> {
  pickerSize: PickerSize
  currentIndex: Animated.SharedValue<number>
  options: AnimatedPickerOption<OptionValue>[]
}

const Indicator = <OptionValue extends unknown>({
  pickerSize,
  currentIndex,
  options,
}: IndicatorProps<OptionValue>): JSX.Element => {
  const indicatorWidth = pickerSize.width / options.length

  const indicatorLeftPosition = useDerivedValue(() => {
    switch (currentIndex.value) {
      case 0:
        return PICKER_PADDING
      case 1:
        return indicatorWidth
      case 2:
        return indicatorWidth * 2 - PICKER_PADDING
      default:
        return PICKER_PADDING
    }
  })

  const progress = useDerivedValue(() => withTiming(currentIndex.value))

  const indicatorStyle = {
    borderRadius: Outlines.borderRadius.max,
    position: "absolute" as const,
    width: indicatorWidth,
    height: pickerSize.height - PICKER_PADDING * 2,
    top: PICKER_PADDING,
    left: 0,
  }

  const indicatorAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      options.map((_, index) => index),
      options.map(option => option.color as ReactText),
    ),
    transform: [{ translateX: withTiming(indicatorLeftPosition.value) }],
  }))

  return <Animated.View style={[indicatorStyle, indicatorAnimatedStyle]} />
}

const PICKER_PADDING = Sizing.x3

const style = StyleSheet.create({
  picker: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: PICKER_PADDING,
    paddingHorizontal: PICKER_PADDING,
    backgroundColor: Colors.neutral.white,
    borderRadius: Outlines.borderRadius.max,
  },
})

export default AnimatedPicker
