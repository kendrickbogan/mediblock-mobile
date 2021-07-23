import React, { createContext, FC, useContext, useState } from "react"

type AnalyticsContextState = {
  canTrackUser: boolean | null
  setCanTrackUser: (canTrackUser: boolean) => void
}

const AnalyticsContext = createContext<AnalyticsContextState | undefined>(
  undefined,
)

export const AnalyticsProvider: FC = ({ children }) => {
  const [canTrackUser, setCanTrackUser] = useState<boolean | null>(null)

  return (
    <AnalyticsContext.Provider
      value={{
        canTrackUser,
        setCanTrackUser,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  )
}

export const useAnalyticsContext = (): AnalyticsContextState => {
  const context = useContext(AnalyticsContext)

  if (context === undefined) {
    throw new Error("AnalyticsContext must be used with a Provider")
  }

  return context
}
