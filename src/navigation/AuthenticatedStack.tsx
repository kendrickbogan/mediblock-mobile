import React, { FC, useEffect } from "react"
import { Text } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"

import TabNavigator from "./TabNavigator"
import { NavigatorRoutes } from "./routes"
import AddDocumentForUploadStack from "./AddDocumentForUploadStack"
import ShareHistoryStack from "./ShareHistoryStack"
import { useAnalyticsContext } from "../AnalyticsContext"
import * as Analytics from "../analytics"
import { useAuthContext } from "../AuthContext"
import FullScreenLoadingIndicator from "../FullScreenLoadingIndicator"
import { UserProvider } from "../UserContext"

const Stack = createStackNavigator()

const defaultScreenOptions = {
  headerShown: false,
  gestureEnabled: false,
}

const AuthenticatedStack: FC = () => {
  const { setCanTrackUser } = useAnalyticsContext()
  const { isApolloLinkInitialized, currentUser, signOut } = useAuthContext()

  useEffect(() => {
    const determineCanTrackUser = async (): Promise<void> => {
      const canTrackUserResult = await Analytics.determineCanTrackUser()
      setCanTrackUser(canTrackUserResult)
    }

    determineCanTrackUser()
  }, [setCanTrackUser])

  if (!isApolloLinkInitialized) {
    return <FullScreenLoadingIndicator />
  }

  if (!currentUser) {
    signOut()
  } else {
    return (
      <UserProvider currentUser={currentUser}>
        <Stack.Navigator screenOptions={defaultScreenOptions} mode="modal">
          <Stack.Screen
            name={NavigatorRoutes.TabNavigator}
            component={TabNavigator}
          />
          <Stack.Screen
            name={NavigatorRoutes.AddDocumentForUpload}
            component={AddDocumentForUploadStack}
          />
          <Stack.Screen
            name={NavigatorRoutes.ShareHistory}
            component={ShareHistoryStack}
          />
        </Stack.Navigator>
      </UserProvider>
    )
  }

  return <Text>Something went wrong</Text>
}

export default AuthenticatedStack
