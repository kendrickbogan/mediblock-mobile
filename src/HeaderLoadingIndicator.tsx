import React, { FC } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"

import { Colors, Sizing } from "./styles"

const HeaderLoadingIndicator: FC = () => {
  return (
    <View style={style.activityIndicator}>
      <ActivityIndicator
        size="small"
        color={Colors.neutral.white}
        style={style.activityIndicator}
      />
    </View>
  )
}

const style = StyleSheet.create({
  activityIndicator: {
    marginRight: Sizing.x10,
  },
})

export default HeaderLoadingIndicator
