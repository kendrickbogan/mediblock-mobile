import React, { createContext, FC, useContext, useState } from "react"

import { DocumentCategoryEnum } from "../generated/graphql"

export type RecipientEmailInput = {
  email: string
  error?: string
}

export type Category = {
  id: DocumentCategoryEnum
  label: string
}

export type Document = {
  id: string
  name: string
}

type ShareContextState = {
  selectedCategories: Category[]
  setSelectedCategories: (selectedCategories: Category[]) => void
  selectedDocuments: Document[]
  setSelectedDocuments: (selectedDocuments: Document[]) => void
  recipientEmailInputs: RecipientEmailInput[]
  setRecipientEmailInputs: (recipientEmailInputs: RecipientEmailInput[]) => void
  sentFromEmail: string
  setSentFromEmail: (sentFromEmail: string) => void
  resetShareContext: () => void
}

const ShareContext = createContext<ShareContextState | undefined>(undefined)

export const ShareProvider: FC = ({ children }) => {
  const initialSelectedCategories: Category[] = []
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    initialSelectedCategories,
  )

  const initialSelectedDocuments: Document[] = []
  const [selectedDocuments, setSelectedDocuments] = useState<Document[]>(
    initialSelectedDocuments,
  )

  const initialRecipientEmailInputs = [{ email: "" }]
  const [recipientEmailInputs, setRecipientEmailInputs] = useState<
    RecipientEmailInput[]
  >(initialRecipientEmailInputs)

  const initialSentFromEmail = ""
  const [sentFromEmail, setSentFromEmail] = useState<string>(
    initialSentFromEmail,
  )

  const resetShareContext = (): void => {
    setSelectedCategories(initialSelectedCategories)
    setSelectedDocuments(initialSelectedDocuments)
    setRecipientEmailInputs(initialRecipientEmailInputs)
    setSentFromEmail(initialSentFromEmail)
  }

  return (
    <ShareContext.Provider
      value={{
        selectedCategories,
        setSelectedCategories,
        selectedDocuments,
        setSelectedDocuments,
        recipientEmailInputs,
        setRecipientEmailInputs,
        sentFromEmail,
        setSentFromEmail,
        resetShareContext,
      }}
    >
      {children}
    </ShareContext.Provider>
  )
}

export const useShareContext = (): ShareContextState => {
  const context = useContext(ShareContext)

  if (context === undefined) {
    throw new Error("ShareContext must be used with a Provider")
  }

  return context
}
