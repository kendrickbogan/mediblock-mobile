import React, { FC } from "react"
import { View, Text, StyleSheet } from "react-native"

const Screen: FC = () => {
  return (
    <View style={style.container}>
      <Text>Screen</Text>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default Screen
