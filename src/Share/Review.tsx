import React, { FC, useState } from "react"
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native"
import { SvgXml } from "react-native-svg"
import * as yup from "yup"
import { useNavigation } from "@react-navigation/native"
import { gql } from "@apollo/client"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import { useShareContext } from "./ShareContext"
import { useShareDocumentsMutation } from "../generated/graphql"
import FullScreenLoadingIndicator from "../FullScreenLoadingIndicator"
import { ShareRoutes } from "../navigation/routes"
import { useStatusBarEffect } from "../navigation/useStatusBarEffect"

import {
  Elements,
  Colors,
  Sizing,
  Buttons,
  Forms,
  Typography,
  Outlines,
} from "../styles"
import { Icons } from "../assets"
import { GET_SHARING_EVENTS } from "../ShareHistory"

gql`
  mutation ShareDocuments($input: ShareDocumentsMutationInput!) {
    shareDocuments(input: $input) {
      sharingEvent {
        id
      }
    }
  }
`

const emailValidationSchema = yup.string().email().required()

const Review: FC = () => {
  useStatusBarEffect("light", Colors.primary.brand)
  const navigation = useNavigation()
  const {
    selectedCategories,
    selectedDocuments,
    recipientEmailInputs,
    sentFromEmail,
    setSentFromEmail,
  } = useShareContext()
  const [
    shareDocumentsMutation,
    { loading: mutationSubmitting },
  ] = useShareDocumentsMutation()

  const [error, setError] = useState("")

  const handleOnPressSend = async (): Promise<void> => {
    const isInputValid = emailValidationSchema.isValidSync(sentFromEmail)
    if (isInputValid) {
      setError("")

      const result = await shareDocumentsMutation({
        variables: {
          input: {
            sentFromEmail,
            recipientEmails: recipientEmailInputs.map(({ email }) => email),
            categoriesIncluded: selectedCategories.map(({ id }) => id),
            documentIds: selectedDocuments.map(({ id }) => id),
          },
        },
        refetchQueries: [{ query: GET_SHARING_EVENTS }],
      })

      if (result.data?.shareDocuments?.sharingEvent?.id) {
        navigation.navigate(ShareRoutes.Confirmation)
      }
    } else {
      setError("Must be a valid email")
    }
  }

  return (
    <View style={style.outerContainer}>
      <KeyboardAwareScrollView
        style={style.container}
        contentContainerStyle={style.contentContainer}
        keyboardShouldPersistTaps="handled"
        alwaysBounceVertical={false}
      >
        <>
          <View style={style.inputContainerOuter}>
            <Text style={style.inputLabel}>Send from email</Text>
            <View style={style.inputContainer}>
              <TextInput
                value={sentFromEmail}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={setSentFromEmail}
                style={style.input}
              />
            </View>
            {!!error && <Text style={style.errorText}>{error}</Text>}
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
                    <SvgXml
                      xml={Icons.File}
                      width={Sizing.icons.x10}
                      height={Sizing.icons.x10}
                      stroke={Colors.neutral.s800}
                      strokeWidth={Sizing.iconStroke.x25}
                      style={style.fileIcon}
                    />
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
        </>
      </KeyboardAwareScrollView>

      {mutationSubmitting && <FullScreenLoadingIndicator />}

      <View style={style.footerContainer}>
        <Pressable
          style={Buttons.applyOpacity(style.nextStepButton)}
          onPress={handleOnPressSend}
          accessibilityRole="button"
          disabled={mutationSubmitting}
        >
          <SvgXml
            xml={Icons.Send}
            width={Sizing.icons.x20}
            height={Sizing.icons.x20}
            stroke={Colors.neutral.white}
            strokeWidth={Sizing.iconStroke.x20}
          />
          <Text style={style.nextStepButtonText}>Send</Text>
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
    flexGrow: 1,
    backgroundColor: Colors.neutral.s100,
    paddingTop: Sizing.x20,
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
  sectionContainer: {
    marginBottom: Sizing.x40,
  },
  sectionTitleText: {
    ...Typography.header.x30,
    paddingBottom: Sizing.x10,
    paddingHorizontal: Sizing.x20,
  },
  inputContainerOuter: {
    marginBottom: Sizing.x40,
    paddingHorizontal: Sizing.x20,
  },
  inputContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  input: {
    ...Forms.input.primary,
    flex: 1,
  },
  inputLabel: {
    ...Forms.inputLabel.primary,
    ...Typography.header.x30,
  },
  listItem: {
    alignItems: "center",
    backgroundColor: Colors.neutral.white,
    borderRadius: Outlines.borderRadius.base,
    flexDirection: "row",
    marginHorizontal: Sizing.x10,
    marginTop: Sizing.x5,
    paddingHorizontal: Sizing.x20,
    paddingVertical: Sizing.x15,
  },
  listItemText: {
    ...Typography.body.x30,
    color: Colors.neutral.s800,
  },
  fileIcon: {
    marginRight: Sizing.x5,
  },
  errorText: {
    color: Colors.danger.s400,
    marginTop: Sizing.x5,
  },
})

export default Review
