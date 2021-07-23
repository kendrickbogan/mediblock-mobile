import React, { FC } from "react"
import { createStackNavigator } from "@react-navigation/stack"

import Category from "../Documents/Category"
import Documents from "../Documents"
import ProfileInformationForm from "../Documents/ProfileInformation"
import DocumentUploads from "../Documents/DocumentUploads"
import { DocumentsRoutes } from "./routes"
import { ProfileSectionEnum } from "../generated/graphql"
import { CategoryType } from "../category"

import { Navigation } from "../styles"

export type DocumentsStackParams = {
  Documents: undefined
  Category: {
    categoryData: CategoryType
  }
  ProfileInformationForm: {
    categoryData: CategoryType
    profileSection: ProfileSectionEnum
    profileSectionLabel: string
  }
  DocumentUploads: {
    categoryData: CategoryType
  }
}

const Stack = createStackNavigator<DocumentsStackParams>()

const DocumentsStack: FC = () => {
  return (
    <Stack.Navigator screenOptions={Navigation.header.base}>
      <Stack.Screen
        name={DocumentsRoutes.Documents}
        component={Documents}
        options={Navigation.header.base}
      />
      <Stack.Screen name={DocumentsRoutes.Category} component={Category} />
      <Stack.Screen
        name={DocumentsRoutes.ProfileInformationForm}
        component={ProfileInformationForm}
      />
      <Stack.Screen
        name={DocumentsRoutes.DocumentUploads}
        component={DocumentUploads}
        options={{ title: "Document Uploads" }}
      />
    </Stack.Navigator>
  )
}

export default DocumentsStack
