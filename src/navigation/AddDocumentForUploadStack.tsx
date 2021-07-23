import React, { FC } from "react"
import { createStackNavigator } from "@react-navigation/stack"

import { ProfileSectionEnum } from "../generated/graphql"
import { AddDocumentForUploadRoutes } from "./routes"
import AddDocumentUpload from "../Documents/AddDocumentUpload"
import EditDocumentUpload from "../Documents/EditDocumentUpload"
import { CategoryType } from "../category"

import { Navigation } from "../styles"

export type AddDocumentForUploadStackParams = {
  AddDocumentUpload: {
    categoryData: CategoryType
    profileSection: ProfileSectionEnum
  }
  EditDocumentUpload: {
    categoryData: CategoryType
    documentId: string
  }
}

const Stack = createStackNavigator<AddDocumentForUploadStackParams>()

const defaultScreenOptions = {
  ...Navigation.header.base,
  gestureEnabled: false,
}

const AddDocumentForUploadStack: FC = () => {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions} mode="modal">
      <Stack.Screen
        name={AddDocumentForUploadRoutes.AddDocumentUpload}
        component={AddDocumentUpload}
        options={{
          title: "Select Document",
        }}
      />
      <Stack.Screen
        name={AddDocumentForUploadRoutes.EditDocumentUpload}
        component={EditDocumentUpload}
        options={{ title: "Update Document" }}
      />
    </Stack.Navigator>
  )
}

export default AddDocumentForUploadStack
