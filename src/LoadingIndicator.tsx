import React, { FC } from "react"
import { ActivityIndicator, StyleSheet } from "react-native"

import { Colors } from "./styles"

const LoadingIndicator: FC = () => {
  return (
    <ActivityIndicator
      size="large"
      color={Colors.neutral.s700}
      style={style.activityIndicator}
    />
  )
}

const style = StyleSheet.create({
  activityIndicator: {
    alignSelf: "center",
  },
})

export default LoadingIndicator
