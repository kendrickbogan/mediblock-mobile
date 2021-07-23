import React, { createContext, FC, useContext } from "react"

import { User } from "./AuthContext"

type UserContextState = {
  currentUser: User
}

const UserContext = createContext<UserContextState | undefined>(undefined)

interface UserProviderProps {
  currentUser: User
}

export const UserProvider: FC<UserProviderProps> = ({
  currentUser,
  children,
}) => {
  return (
    <UserContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = (): UserContextState => {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error("UserContext must be used with a Provider")
  }

  return context
}
