import React, { FC, useLayoutEffect } from "react"
import { ScrollView, StyleSheet } from "react-native"
import { RouteProp, useNavigation } from "@react-navigation/native"
import { useRoute } from "@react-navigation/native"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import StaticSafeAreaInsets from "react-native-static-safe-area-insets"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import { DocumentsStackParams } from "../navigation/DocumentsStack"
import { formComponents } from "./formComponents"
import { useStatusBarEffect } from "../navigation/useStatusBarEffect"
import DocumentUploads from "./DocumentUploads"
import StatusPicker from "./StatusPicker"
import {
  ProfileInformationLabels,
  ProfileInformationRoutes,
} from "../navigation/routes"

import { Sizing, Elements, Colors, Typography, Outlines } from "../styles"

const Tab = createMaterialTopTabNavigator()

type ProfileInformationFormRouteProp = RouteProp<
  DocumentsStackParams,
  "ProfileInformationForm"
>

const ProfileInformationForm: FC = () => {
  useStatusBarEffect("light", Colors.primary.brand)
  const navigation = useNavigation()
  const {
    params: { profileSectionLabel, profileSection, categoryData },
  } = useRoute<ProfileInformationFormRouteProp>()

  const formComponent = formComponents.find(
    component => component.profileSectionId === profileSection,
  )

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: profileSectionLabel,
    }),
      []
  })

  const FormFields: FC = () => {
    return (
      <KeyboardAwareScrollView
        style={style.container}
        contentContainerStyle={style.contentContainer}
        alwaysBounceVertical={false}
        extraScrollHeight={-StaticSafeAreaInsets.safeAreaInsetsBottom}
        keyboardShouldPersistTaps="handled"
      >
        {formComponent ? formComponent.component : null}
      </KeyboardAwareScrollView>
    )
  }

  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: Colors.neutral.white,
          borderBottomWidth: Outlines.borderWidth.hairline,
          borderBottomColor: Colors.neutral.s200,
        },
        labelStyle: {
          ...Typography.subheader.x20,
          textTransform: "capitalize",
        },
        activeTintColor: Colors.primary.brand,
        inactiveTintColor: Colors.neutral.s500,
        indicatorStyle: {
          backgroundColor: Colors.primary.brand,
        },
        tabStyle: {
          padding: Sizing.x5,
        },
        pressOpacity: 0.6,
        allowFontScaling: false,
      }}
    >
      <Tab.Screen
        name={ProfileInformationRoutes.Form}
        component={FormFields}
        options={{
          tabBarAccessibilityLabel: ProfileInformationLabels.Form,
          title: ProfileInformationLabels.Form,
        }}
      />
      <Tab.Screen
        name={ProfileInformationRoutes.ScansAndDocuments}
        options={{
          tabBarAccessibilityLabel: ProfileInformationLabels.ScansAndDocuments,
          title: ProfileInformationLabels.ScansAndDocuments,
        }}
      >
        {props => (
          <DocumentUploads
            profileSection={profileSection}
            categoryData={categoryData}
            {...props}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name={ProfileInformationRoutes.Status}
        options={{
          tabBarAccessibilityLabel: ProfileInformationLabels.Status,
          title: ProfileInformationLabels.Status,
        }}
      >
        {props => (
          <ScrollView
            contentContainerStyle={style.contentContainer}
            alwaysBounceVertical={false}
          >
            <StatusPicker
              profileSection={profileSection}
              category={categoryData.id}
              {...props}
            />
          </ScrollView>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  )
}

const style = StyleSheet.create({
  container: {
    ...Elements.container.base,
    backgroundColor: Colors.neutral.s100,
  },
  contentContainer: {
    padding: Sizing.x20,
    backgroundColor: Colors.neutral.s100,
    flexGrow: 1,
  },
})

export default ProfileInformationForm
