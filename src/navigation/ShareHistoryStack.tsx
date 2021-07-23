import React, { FC } from "react"
import { createStackNavigator } from "@react-navigation/stack"

import { ShareHistoryRoutes } from "./routes"
import History from "../ShareHistory"

import { Navigation } from "../styles"

export type ShareHistoryStackParams = {
  History: undefined
}

const Stack = createStackNavigator<ShareHistoryStackParams>()

const defaultScreenOptions = {
  ...Navigation.header.base,
  gestureEnabled: false,
}

const ShareHistoryStack: FC = () => {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name={ShareHistoryRoutes.History}
        component={History}
        options={{
          title: "History",
          headerLeft: (): null => null,
        }}
      />
    </Stack.Navigator>
  )
}

export default ShareHistoryStack
