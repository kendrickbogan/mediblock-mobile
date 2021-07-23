import React, { FC, ReactNode } from "react"
import { OnboardingRoutes } from "./routes"
import { createStackNavigator } from "@react-navigation/stack"

import { useAuthContext } from "../AuthContext"
import { OnboardingStatusEnum } from "../generated/graphql"
import VerifyIdentity from "../Onboarding/VerifyIdentity"
import ImportData from "../Onboarding/ImportData"
import HowThisWorks from "../Onboarding/HowThisWorks"
import { useSubscriptionContext } from "../SubscriptionContext"
import FullScreenLoadingIndicator from "../FullScreenLoadingIndicator"

import { Navigation } from "../styles"

const Stack = createStackNavigator()

const VERIFY_IDENTITY_STATUSES = [
  OnboardingStatusEnum.AccountCreated,
  OnboardingStatusEnum.AwaitingVerification,
  OnboardingStatusEnum.VerificationAttemptsExceeded,
  OnboardingStatusEnum.IdentityVerificationFailed,
]

const OnboardingStack: FC = () => {
  const { currentUser } = useAuthContext()
  const { subscription } = useSubscriptionContext()
  const { isApolloLinkInitialized } = useAuthContext()

  if (!currentUser) {
    return null
  }

  const { onboardingStatus } = currentUser

  const showHowThisWorks = subscription !== "Access"

  const showVerifyIdentity =
    subscription === "Access" &&
    VERIFY_IDENTITY_STATUSES.includes(onboardingStatus)

  const showImportData =
    onboardingStatus === OnboardingStatusEnum.IdentityVerified

  if (!isApolloLinkInitialized) {
    return <FullScreenLoadingIndicator />
  }

  const determineScreen = (): ReactNode => {
    if (showHowThisWorks) {
      return (
        <Stack.Screen
          name={OnboardingRoutes.HowThisWorks}
          component={HowThisWorks}
          options={{
            headerShown: false,
          }}
        />
      )
    }

    if (showVerifyIdentity && currentUser) {
      return (
        <Stack.Screen
          name={OnboardingRoutes.VerifyIdentity}
          options={{
            headerShown: false,
          }}
        >
          {(props): JSX.Element => {
            return <VerifyIdentity currentUser={currentUser} {...props} />
          }}
        </Stack.Screen>
      )
    }

    if (showImportData) {
      return (
        <Stack.Screen
          name={OnboardingRoutes.ImportData}
          component={ImportData}
          options={{
            title: "Import Data",
          }}
        />
      )
    }

    return null
  }

  if (!determineScreen()) {
    return null
  }

  return (
    <Stack.Navigator screenOptions={Navigation.header.base}>
      {determineScreen()}
    </Stack.Navigator>
  )
}

export default OnboardingStack
