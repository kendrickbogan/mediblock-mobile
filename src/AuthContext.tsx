import React, {
  createContext,
  FC,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react"
import { useApolloClient, createHttpLink, from } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { onError } from "@apollo/client/link/error"

import { GRAPHQL_ENDPOINT_URL } from "./constants"
import EncryptedStorage from "./encryptedStorage"
import {
  ExpirationWarningTimeUnitsEnum,
  OnboardingStatusEnum,
} from "./generated/graphql"

type ExpirationWarningTimeFrame = {
  units: ExpirationWarningTimeUnitsEnum
  duration: number
}

export type User = {
  token: string
  onboardingStatus: OnboardingStatusEnum
  expirationWarningTimeFrame: ExpirationWarningTimeFrame
  id: string
}

type AuthContextState = {
  currentUser: User | null
  setAndStoreCurrentUser: (user: User) => Promise<void>
  signOut: () => Promise<void>
  isApolloLinkInitialized: boolean
}

const AuthContext = createContext<AuthContextState | undefined>(undefined)

interface AuthProviderProps {
  storedUser: User | null
}

export const AuthProvider: FC<AuthProviderProps> = ({
  storedUser,
  children,
}) => {
  const apolloClient = useApolloClient()

  const [currentUser, setCurrentUser] = useState<User | null>(storedUser)
  const [isApolloLinkInitialized, setIsApolloLinkInitialized] = useState(false)

  const signOut = useCallback(async (): Promise<void> => {
    setCurrentUser(null)
    EncryptedStorage.clearStorage()
    apolloClient.clearStore()
  }, [apolloClient])

  const setAndStoreCurrentUser = useCallback(
    async (user: User): Promise<void> => {
      if (!currentUser?.token) {
        setIsApolloLinkInitialized(false)
      }
      setCurrentUser(user)
      await EncryptedStorage.setStoredUser(user)
    },
    [currentUser?.token],
  )

  useEffect(() => {
    const errorLink = onError(({ graphQLErrors }) => {
      const hasAuthenticationError = graphQLErrors?.some(graphQLError => {
        return graphQLError.extensions?.code === "AUTHENTICATION_ERROR"
      })

      if (hasAuthenticationError) {
        signOut()
      }
    })

    const httpLink = createHttpLink({
      uri: GRAPHQL_ENDPOINT_URL,
    })

    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: currentUser ? `Bearer ${currentUser.token}` : "",
        },
      }
    })

    apolloClient.setLink(from([errorLink, authLink.concat(httpLink)]))

    setIsApolloLinkInitialized(true)
  }, [currentUser, apolloClient, signOut])

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setAndStoreCurrentUser,
        signOut,
        isApolloLinkInitialized,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = (): AuthContextState => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("AuthContext must be used with a Provider")
  }

  return context
}
