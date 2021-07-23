import React, { FC } from "react"
import { createStackNavigator } from "@react-navigation/stack"

import { SettingsRoutes } from "./routes"
import SettingsMenu from "../Settings/SettingsMenu"
import ExpirationWarningTime from "../Settings/ExpirationWarningTime"

import { Navigation } from "../styles"

const Stack = createStackNavigator()

const SettingsStack: FC = () => {
  return (
    <Stack.Navigator screenOptions={Navigation.header.base}>
      <Stack.Screen
        name={SettingsRoutes.SettingsMenu}
        component={SettingsMenu}
        options={{
          title: "Settings",
        }}
      />
      <Stack.Screen
        name={SettingsRoutes.ExpirationWarningTime}
        component={ExpirationWarningTime}
        options={{
          title: "Expiration Warning Time Frame",
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  )
}

export default SettingsStack
