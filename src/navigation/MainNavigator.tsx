import React, { FC, ReactNode } from "react"
import {
  createStackNavigator,
  HeaderStyleInterpolators,
} from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"

import AuthenticatedStack from "./AuthenticatedStack"
import OnboardingStack from "./OnboardingStack"
import UnauthenticatedStack from "./UnauthenticatedStack"
import { useAuthContext } from "../AuthContext"
import { OnboardingStatusEnum } from "../generated/graphql"
import { SubscriptionProvider } from "../SubscriptionContext"

const Stack = createStackNavigator()

const defaultScreenOptions = {
  headerShown: false,
  headerStyleInterpolator: HeaderStyleInterpolators.forNoAnimation,
  gestureEnabled: false,
}

const MainNavigator: FC = () => {
  const { currentUser } = useAuthContext()

  const unauthenticatedStack = (
    <Stack.Screen
      name="UnauthenticatedStack"
      component={UnauthenticatedStack}
      options={{
        animationTypeForReplace: "pop",
      }}
    />
  )

  const determineScreen = (): ReactNode => {
    if (!currentUser) {
      return unauthenticatedStack
    } else if (
      currentUser.onboardingStatus !== OnboardingStatusEnum.OnboardingComplete
    ) {
      return (
        <Stack.Screen
          name="OnboardingStack"
          component={OnboardingStack}
          options={{
            animationTypeForReplace: "pop",
          }}
        />
      )
    } else if (
      currentUser.onboardingStatus === OnboardingStatusEnum.OnboardingComplete
    ) {
      return (
        <Stack.Screen
          name="AuthenticatedStack"
          component={AuthenticatedStack}
        />
      )
    }

    return unauthenticatedStack
  }

  return (
    <NavigationContainer>
      <SubscriptionProvider>
        <Stack.Navigator screenOptions={defaultScreenOptions} mode="modal">
          {determineScreen()}
        </Stack.Navigator>
      </SubscriptionProvider>
    </NavigationContainer>
  )
}

export default MainNavigator
