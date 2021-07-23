import React, { FC } from "react"
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native"
import { SvgXml } from "react-native-svg"
import * as yup from "yup"
import { useNavigation } from "@react-navigation/native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import { useShareContext, RecipientEmailInput } from "./ShareContext"
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

const { accessibilityMultiplier } = Typography

const emailValidationSchema = yup.string().email().required()

const AddRecipients: FC = () => {
  useStatusBarEffect("light", Colors.primary.brand)
  const navigation = useNavigation()
  const { recipientEmailInputs, setRecipientEmailInputs } = useShareContext()

  const handleOnPressAddMore = (): void => {
    const nextRecipientEmailInputs = [...recipientEmailInputs, { email: "" }]
    setRecipientEmailInputs(nextRecipientEmailInputs)
  }

  const handleOnPressReviewBeforeSending = (): void => {
    const nextRecipientEmailInputs = recipientEmailInputs.map(({ email }) => {
      const isInputValid = emailValidationSchema.isValidSync(email)

      return isInputValid
        ? {
            email,
          }
        : {
            email,
            error: "Must be a valid email",
          }
    })

    setRecipientEmailInputs(nextRecipientEmailInputs)

    const isFormValid =
      nextRecipientEmailInputs.every(({ error }) => !error) &&
      nextRecipientEmailInputs.length > 0

    if (isFormValid) {
      navigation.navigate(ShareRoutes.Review)
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
          {recipientEmailInputs.map((recipientEmailInput, index) => {
            return (
              <EmailRecipientInput
                key={index}
                recipientEmailInput={recipientEmailInput}
                index={index}
              />
            )
          })}
          <Pressable
            onPress={handleOnPressAddMore}
            style={Buttons.applyOpacity(style.addMoreButton)}
            accessibilityRole="button"
          >
            <Text style={style.addMoreButtonText}>Add more</Text>
          </Pressable>
        </>
      </KeyboardAwareScrollView>

      <View style={style.footerContainer}>
        <Pressable
          style={Buttons.applyOpacity(style.nextStepButton)}
          onPress={handleOnPressReviewBeforeSending}
          accessibilityRole="button"
        >
          <Text
            style={style.nextStepButtonText}
            maxFontSizeMultiplier={accessibilityMultiplier.x40}
          >
            Review before sending
          </Text>
          <SvgXml
            xml={Icons.ArrowRight}
            width={Sizing.icons.x20}
            height={Sizing.icons.x20}
            stroke={Colors.neutral.white}
            strokeWidth={Sizing.iconStroke.x20}
          />
        </Pressable>
      </View>
    </View>
  )
}

interface EmailRecipientInputProps {
  recipientEmailInput: RecipientEmailInput
  index: number
}

const EmailRecipientInput: FC<EmailRecipientInputProps> = ({
  recipientEmailInput: { email, error },
  index,
}) => {
  const { recipientEmailInputs, setRecipientEmailInputs } = useShareContext()

  const handleOnChangeText = (text: string): void => {
    const nextRecipientEmailInputs = [...recipientEmailInputs]
    nextRecipientEmailInputs[index].email = text
    setRecipientEmailInputs(nextRecipientEmailInputs)
  }

  const handleOnPressRemove = (): void => {
    const nextRecipientEmails = recipientEmailInputs.filter(
      (_, i) => index !== i,
    )
    setRecipientEmailInputs(nextRecipientEmails)
  }

  return (
    <View style={style.inputContainerOuter}>
      <Text style={style.inputLabel}>{`Email for recipient ${index + 1}`}</Text>
      <View style={style.inputContainer}>
        <TextInput
          value={email}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={handleOnChangeText}
          style={style.input}
          returnKeyType="done"
        />
        <Pressable
          onPress={handleOnPressRemove}
          style={Buttons.applyOpacity(style.removeButton)}
          accessibilityRole="button"
          accessible
          accessibilityLabel="Remove this recipient"
        >
          <SvgXml
            xml={Icons.MinusCircle}
            width={Sizing.icons.x20}
            height={Sizing.icons.x20}
            stroke={Colors.neutral.s400}
            strokeWidth={Sizing.iconStroke.x20}
          />
        </Pressable>
      </View>
      {error && <Text style={style.errorText}>{error}</Text>}
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
    padding: Sizing.x20,
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
    marginRight: Sizing.x10,
  },
  inputContainerOuter: {
    marginBottom: Sizing.x20,
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
  addMoreButton: {
    ...Buttons.pill.secondary,
  },
  addMoreButtonText: {
    ...Buttons.pillText.secondary,
  },
  removeButton: {
    paddingLeft: Sizing.x20,
  },
  errorText: {
    color: Colors.danger.s400,
    marginTop: Sizing.x5,
  },
})

export default AddRecipients
