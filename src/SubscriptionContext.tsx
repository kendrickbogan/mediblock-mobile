import React, {
  createContext,
  FC,
  useContext,
  useState,
  useEffect,
} from "react"

import { Subscription, getSubscriptions } from "./subscriptions"

type SubscriptionContextState = {
  subscription: Subscription
  setSubscription: (subscription: Subscription) => void
}

const SubscriptionContext = createContext<SubscriptionContextState | undefined>(
  undefined,
)

export const SubscriptionProvider: FC = ({ children }) => {
  const [subscription, setSubscription] = useState<Subscription>("None")

  useEffect(() => {
    const initSubscription = async (): Promise<void> => {
      const currentSubscription = await getSubscriptions()
      setSubscription(currentSubscription)
    }

    initSubscription()
  }, [])

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        setSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  )
}

export const useSubscriptionContext = (): SubscriptionContextState => {
  const context = useContext(SubscriptionContext)

  if (context === undefined) {
    throw new Error("SubscriptionContext must be used with a Provider")
  }

  return context
}
