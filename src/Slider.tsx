import React, { FC } from "react"
import { StyleSheet, View } from "react-native"
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
  useDerivedValue,
  interpolate,
} from "react-native-reanimated"
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler"
import { clamp, ReText } from "react-native-redash"
import { Colors, Outlines, Sizing, Typography } from "./styles"

const CURSOR_SIZE = Sizing.x40
const CONTAINER_WIDTH = Sizing.screen.width - Sizing.x40

export const SLIDER_WIDTH = CONTAINER_WIDTH - CURSOR_SIZE

interface SliderProps {
  currentValue: number
  onUpdateCurrentValue: (value: number) => void
  minValue: number
  maxValue: number
}
type Offset = {
  x: number
  y: number
}

const Slider: FC<SliderProps> = ({
  currentValue,
  onUpdateCurrentValue,
  minValue,
  maxValue,
}) => {
  const initialValue = Math.round(
    interpolate(currentValue, [minValue, maxValue], [0, SLIDER_WIDTH]),
  )
  const translateX = useSharedValue(initialValue)

  const toInterpolatedValue = useDerivedValue(() => {
    return Math.round(
      interpolate(translateX.value, [0, SLIDER_WIDTH], [minValue, maxValue]),
    )
  })

  const labelText = useDerivedValue(() => {
    return toInterpolatedValue.value.toString()
  })

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    Offset
  >({
    onStart: (_, ctx) => {
      ctx.x = translateX.value
    },
    onActive: ({ translationX }, ctx) => {
      translateX.value = clamp(ctx.x + translationX, 0, SLIDER_WIDTH)
    },
    onEnd: () => {
      runOnJS(onUpdateCurrentValue)(toInterpolatedValue.value)
    },
  })

  const cursorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }))

  return (
    <>
      <ReText style={style.labelText} text={labelText} />
      <View style={style.container}>
        <View style={style.dividerContainer}>
          <View style={style.divider} />
        </View>
        <PanGestureHandler minDist={0} onGestureEvent={onGestureEvent}>
          <Animated.View style={[style.cursor, cursorStyle]}>
            <View style={style.cursorPoint} />
          </Animated.View>
        </PanGestureHandler>
      </View>
    </>
  )
}

const style = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: CONTAINER_WIDTH,
  },
  labelText: {
    ...Typography.header.x60,
    textAlign: "center",
    marginBottom: Sizing.x20,
  },
  dividerContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    backgroundColor: Colors.neutral.white,
    width: SLIDER_WIDTH,
    height: Sizing.x10,
    borderRadius: Outlines.borderRadius.max,
  },
  cursor: {
    width: CURSOR_SIZE,
    height: CURSOR_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
  cursorPoint: {
    borderRadius: Outlines.borderRadius.max,
    width: Sizing.x30,
    height: Sizing.x30,
    backgroundColor: Colors.primary.brand,
  },
})
export default Slider
