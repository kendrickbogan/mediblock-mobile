import React, { FC } from "react"
import { Text, Pressable, StyleSheet } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import { useNavigation } from "@react-navigation/native"

import { ShareRoutes, ShareHistoryRoutes, NavigatorRoutes } from "./routes"
import Share from "../Share"
import AddRecipients from "../Share/AddRecipients"
import { ShareProvider } from "../Share/ShareContext"
import Review from "../Share/Review"
import Confirmation from "../Share/Confirmation"

import { Navigation, Sizing, Typography, Colors, Buttons } from "../styles"

export type ShareStackParams = {
  Share: undefined
  AddRecipients: undefined
  Review: undefined
  Confirmation: undefined
}

const Stack = createStackNavigator<ShareStackParams>()

const ShareStack: FC = () => {
  const navigation = useNavigation()

  const handleOnPressHistory = (): void => {
    navigation.navigate(NavigatorRoutes.ShareHistory, {
      screen: ShareHistoryRoutes.History,
    })
  }

  const ShareHistoryButton = (): JSX.Element => {
    return (
      <Pressable
        onPress={handleOnPressHistory}
        style={Buttons.applyOpacity(style.historyButton)}
        accessibilityRole="button"
      >
        <Text style={style.historyButtonText} allowFontScaling={false}>
          History
        </Text>
      </Pressable>
    )
  }

  return (
    <ShareProvider>
      <Stack.Navigator screenOptions={Navigation.header.base}>
        <Stack.Screen
          name={ShareRoutes.Share}
          component={Share}
          options={{
            ...Navigation.header.base,
            headerLeft: ShareHistoryButton,
          }}
        />
        <Stack.Screen
          name={ShareRoutes.AddRecipients}
          component={AddRecipients}
          options={{ ...Navigation.header.base, title: "Add Recipients" }}
        />
        <Stack.Screen
          name={ShareRoutes.Review}
          component={Review}
          options={{ ...Navigation.header.base, title: "Review" }}
        />
        <Stack.Screen
          name={ShareRoutes.Confirmation}
          component={Confirmation}
          options={{
            ...Navigation.header.base,
            title: "Confirmation",
            headerLeft: (): null => null,
          }}
        />
      </Stack.Navigator>
    </ShareProvider>
  )
}

const style = StyleSheet.create({
  historyButton: {
    paddingHorizontal: Sizing.x20,
  },
  historyButtonText: {
    ...Typography.subheader.x30,
    color: Colors.neutral.white,
  },
})

export default ShareStack
