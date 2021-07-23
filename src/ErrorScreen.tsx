import React, { FC } from "react"
import {
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native"

import { Buttons, Colors, Typography, Sizing } from "./styles"

interface ErrorScreenProps {
  error: Error
  info: React.ErrorInfo
  clearError: () => void
}

const ErrorScreen: FC<ErrorScreenProps> = ({ clearError }) => {
  const handleOnPressReload = (): void => {
    clearError()
  }

  return (
    <SafeAreaView style={style.container}>
      <ScrollView
        contentContainerStyle={style.contentContainer}
        alwaysBounceVertical={false}
      >
        <Text style={style.errorHeaderText}>Something went wrong</Text>
        <Text style={style.errorBodyText}>
          Try reloading with the button below. If that doesn&apos;t work, close
          and reopen the app and ensure you&apos;re connected to the internet.
        </Text>
        <Pressable
          style={Buttons.applyOpacity(style.pillButton)}
          onPress={handleOnPressReload}
          accessibilityRole="button"
        >
          <Text style={style.pillButtonText}>Reload</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.white,
  },
  contentContainer: {
    justifyContent: "center",
    flexGrow: 1,
    backgroundColor: Colors.neutral.white,
    padding: Sizing.x20,
  },
  errorHeaderText: {
    ...Typography.subheader.x40,
    textAlign: "center",
    marginBottom: Sizing.x10,
  },
  errorBodyText: {
    ...Typography.body.x20,
    textAlign: "center",
    marginBottom: Sizing.x20,
  },
  pillButton: {
    ...Buttons.pill.primary,
    backgroundColor: Colors.primary.brand,
    borderColor: Colors.primary.brand,
    marginVertical: Sizing.x20,
    width: "100%",
  },
  pillButtonText: {
    ...Buttons.pillText.primary,
    textAlign: "center",
  },
})

export default ErrorScreen
