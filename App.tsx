import "react-native-gesture-handler"

import React, { FC, useEffect, useState } from "react"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import RNBootSplash from "react-native-bootsplash"
import Purchases from "react-native-purchases"
import Config from "react-native-config"
import Bugsnag from "@bugsnag/react-native"
import { BugsnagErrorBoundary } from "@bugsnag/plugin-react/types/bugsnag-plugin-react"

import MainNavigator from "./src/navigation/MainNavigator"
import EncryptedStorage from "./src/encryptedStorage"
import ErrorScreen from "./src/ErrorScreen"
import { AuthProvider, User } from "./src/AuthContext"
import { GRAPHQL_ENDPOINT_URL } from "./src/constants"
import { SubscriptionProvider } from "./src/SubscriptionContext"
import { AnalyticsProvider } from "./src/AnalyticsContext"

const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT_URL,
  cache: new InMemoryCache({
    typePolicies: {
      Person: {
        fields: {
          expirations: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            merge(_existing = [], incoming: any[]): any {
              return [...incoming]
            },
          },
          expirationsByCategory: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            merge(_existing = [], incoming: any[]): any {
              return [...incoming]
            },
          },
          expirationsByProfileSection: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            merge(_existing = [], incoming: any[]): any {
              return [...incoming]
            },
          },
        },
      },
    },
  }),
})

const App: FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [storedUser, setStoredUser] = useState<User | null>(null)

  const initStoredUser = async (): Promise<void> => {
    const storedUser = await EncryptedStorage.getStoredUser()
    setStoredUser(storedUser)
  }

  useEffect(() => {
    const initialize = async (): Promise<void> => {
      await initStoredUser()
      RNBootSplash.hide({ fade: true })
      Purchases.setDebugLogsEnabled(true)
      Purchases.setup(Config.REVENUE_CAT_API_KEY)
      setIsLoading(false)
    }
    initialize()
  }, [])

  if (isLoading) {
    return null
  }

  const ErrorBoundary: BugsnagErrorBoundary | undefined = Bugsnag.getPlugin(
    "react",
  )?.createErrorBoundary(React)

  if (!ErrorBoundary) {
    return null
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorScreen}>
      <ApolloProvider client={client}>
        <AnalyticsProvider>
          <AuthProvider storedUser={storedUser}>
            <SubscriptionProvider>
              <MainNavigator />
            </SubscriptionProvider>
          </AuthProvider>
        </AnalyticsProvider>
      </ApolloProvider>
    </ErrorBoundary>
  )
}

export default App
