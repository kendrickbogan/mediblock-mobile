import React, { FC } from "react"
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { SvgXml } from "react-native-svg"

import { useShareContext } from "./ShareContext"
import { ShareRoutes } from "../navigation/routes"
import { useStatusBarEffect } from "../navigation/useStatusBarEffect"

import {
  Elements,
  Colors,
  Sizing,
  Buttons,
  Typography,
  Outlines,
} from "../styles"
import { Icons } from "../assets"

const Confirmation: FC = () => {
  useStatusBarEffect("light", Colors.primary.brand)
  const navigation = useNavigation()
  const {
    selectedCategories,
    selectedDocuments,
    recipientEmailInputs,
    sentFromEmail,
  } = useShareContext()

  const handleOnPressDone = (): void => {
    navigation.navigate(ShareRoutes.Share)
  }

  return (
    <View style={style.outerContainer}>
      <ScrollView
        style={style.container}
        contentContainerStyle={style.contentContainer}
        alwaysBounceVertical={false}
      >
        <>
          <View style={style.successMessage}>
            <SvgXml
              xml={Icons.CheckCircle}
              width={Sizing.icons.x40}
              height={Sizing.icons.x40}
              fill={Colors.neutral.white}
            />
            <Text style={style.successMessageText}>
              Your documents were successfully shared.
            </Text>
          </View>

          {selectedCategories.length > 0 && (
            <View style={style.sectionContainer}>
              <Text style={style.sectionTitleText}>Forms included</Text>
              {selectedCategories.map(({ label }) => {
                return (
                  <View key={label} style={style.listItem}>
                    <Text style={style.listItemText}>{label}</Text>
                  </View>
                )
              })}
            </View>
          )}

          {selectedDocuments.length > 0 && (
            <View style={style.sectionContainer}>
              <Text style={style.sectionTitleText}>Documents included</Text>
              {selectedDocuments.map(({ name }, index) => {
                return (
                  <View key={name + index} style={style.listItem}>
                    <Text style={style.listItemText}>{name}</Text>
                  </View>
                )
              })}
            </View>
          )}

          <View style={style.sectionContainer}>
            <Text style={style.sectionTitleText}>Recipient emails</Text>
            {recipientEmailInputs.map(({ email }, index) => {
              return (
                <View key={email + index} style={style.listItem}>
                  <Text style={style.listItemText}>{email}</Text>
                </View>
              )
            })}
          </View>

          <View style={style.sectionContainer}>
            <Text style={style.sectionTitleText}>Sent from</Text>
            <View style={style.listItem}>
              <Text style={style.listItemText}>{sentFromEmail}</Text>
            </View>
          </View>
        </>
      </ScrollView>

      <View style={style.footerContainer}>
        <Pressable
          style={Buttons.applyOpacity(style.nextStepButton)}
          onPress={handleOnPressDone}
          accessibilityRole="button"
        >
          <Text style={style.nextStepButtonText}>Done</Text>
        </Pressable>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    ...Elements.container.base,
  },
  contentContainer: {
    backgroundColor: Colors.neutral.s100,
    flexGrow: 1,
  },
  footerContainer: {
    backgroundColor: Colors.neutral.white,
    paddingVertical: Sizing.x15,
    paddingHorizontal: Sizing.x20,
    borderTopWidth: Outlines.borderWidth.hairline,
    borderColor: Colors.neutral.s200,
  },
  nextStepButton: {
    ...Buttons.pill.primary,
    flexDirection: "row",
  },
  nextStepButtonText: {
    ...Buttons.pillText.primary,
    marginLeft: Sizing.x10,
  },
  successMessage: {
    alignItems: "center",
    borderRadius: Outlines.borderRadius.small,
    backgroundColor: Colors.success.s400,
    marginHorizontal: Sizing.x20,
    marginBottom: Sizing.x40,
    marginTop: Sizing.x20,
    padding: Sizing.x30,
  },
  successMessageText: {
    ...Typography.header.x30,
    color: Colors.neutral.white,
    marginTop: Sizing.x10,
    marginHorizontal: Sizing.x20,
    textAlign: "center",
  },
  sectionContainer: {
    marginBottom: Sizing.x40,
  },
  sectionTitleText: {
    ...Typography.header.x30,
    paddingBottom: Sizing.x10,
    paddingHorizontal: Sizing.x20,
  },
  listItem: {
    backgroundColor: Colors.neutral.white,
    borderRadius: Outlines.borderRadius.base,
    marginHorizontal: Sizing.x10,
    marginTop: Sizing.x5,
    paddingHorizontal: Sizing.x20,
    paddingVertical: Sizing.x15,
  },
  listItemText: {
    ...Typography.body.x30,
    color: Colors.neutral.s800,
  },
})

export default Confirmation
