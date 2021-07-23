import React, { FC, ReactNode, useState } from "react"
import { View, Text, StyleSheet, Pressable } from "react-native"
import * as yup from "yup"
import { Formik } from "formik"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import StaticSafeAreaInsets from "react-native-static-safe-area-insets"
import { gql } from "@apollo/client"
import { SvgXml } from "react-native-svg"
import Config from "react-native-config"

import { useAuthContext } from "../AuthContext"
import { TextField } from "../Forms/formHelpers"
import { useStatusBarEffect } from "../navigation/useStatusBarEffect"
import { useSignUpMutation } from "../generated/graphql"
import FullScreenLoadingIndicator from "../FullScreenLoadingIndicator"
import ExternalLinking from "../externalLinking"

import {
  Colors,
  Sizing,
  Elements,
  Buttons,
  Outlines,
  Typography,
} from "../styles"
import { Images, Icons } from "../assets"

gql`
  mutation SignUp($input: SignUpMutationInput!) {
    signUp(input: $input) {
      user {
        ...BaseUserFields
      }
    }
  }
`

type FormValues = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
}

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
})

const SignUp: FC = () => {
  useStatusBarEffect("light", Colors.primary.brand)
  const { setAndStoreCurrentUser } = useAuthContext()
  const [mutation, { loading }] = useSignUpMutation()

  const initialError = ""
  const [error, setError] = useState("")

  const [isToUAccepted, setIsToUAccepted] = useState(false)

  const handleOnSignUp = async ({
    firstName,
    lastName,
    email,
    password,
  }: FormValues): Promise<void> => {
    const result = await mutation({
      variables: {
        input: { firstName, lastName, email, password },
      },
    })

    if (result?.data?.signUp?.user) {
      const {
        id,
        authorizationToken: token,
        expirationWarningTimeUnits,
        expirationWarningTime,
        onboardingStatus,
      } = result.data.signUp.user

      setAndStoreCurrentUser({
        id,
        token,
        expirationWarningTimeFrame: {
          units: expirationWarningTimeUnits,
          duration: expirationWarningTime,
        },
        onboardingStatus,
      })
    } else {
      setError("Your registration information is invalid. Please try again.")
    }
  }

  return (
    <View style={style.container}>
      <KeyboardAwareScrollView
        style={style.container}
        contentContainerStyle={style.contentContainer}
        alwaysBounceVertical={false}
        extraScrollHeight={-StaticSafeAreaInsets.safeAreaInsetsBottom}
        keyboardShouldPersistTaps="handled"
      >
        <Formik
          validateOnBlur={false}
          validateOnMount={false}
          initialValues={initialValues}
          onSubmit={handleOnSignUp}
          validationSchema={validationSchema}
        >
          {({
            handleSubmit,
            setFieldValue,
            values,
            errors,
            isValid,
          }): ReactNode => {
            const handleOnChangeText = (field: string) => (
              value: string,
            ): void => {
              setError(initialError)
              setFieldValue(field, value)
            }

            const isSubmitDisabled = !isValid || !isToUAccepted

            const buttonStyle = {
              ...style.button,
              ...(isSubmitDisabled && {
                backgroundColor: Colors.neutral.s300,
                borderColor: Colors.neutral.s300,
              }),
            }

            const handleOnPressToggleToU = (): void => {
              setIsToUAccepted(previousValue => {
                return !previousValue
              })
            }

            const handleOnPressTermsOfUse = (): void => {
              ExternalLinking.openUrl(Config.TERMS_OF_USE_URL)
            }

            const handleOnPressPrivacyPolicy = (): void => {
              ExternalLinking.openUrl(Config.PRIVACY_POLICY_URL)
            }

            const handleOnSubmitEditing = (): void => {
              !isSubmitDisabled && handleSubmit()
            }

            const acceptToUButtonStyle = {
              ...style.acceptToUButton,
              ...(isToUAccepted && {
                backgroundColor: Colors.secondary.brand,
                borderColor: Colors.secondary.brand,
              }),
            }

            const checkmarkColor = isToUAccepted
              ? Colors.neutral.white
              : Colors.neutral.s100

            return (
              <>
                <View style={style.inputsContainer}>
                  <View style={style.logoContainer}>
                    <SvgXml xml={Images.MediBlockLogo} width="250" />
                  </View>
                  <TextField
                    label="First name"
                    value={values.firstName}
                    updateValue={handleOnChangeText("firstName")}
                    accessibilityLabel="Enter first name"
                    autoCorrect={false}
                    textContentType="givenName"
                    returnKeyType="done"
                    errors={errors.firstName}
                  />
                  <TextField
                    label="Last name"
                    value={values.lastName}
                    updateValue={handleOnChangeText("lastName")}
                    accessibilityLabel="Enter last name"
                    autoCorrect={false}
                    textContentType="familyName"
                    returnKeyType="done"
                    errors={errors.lastName}
                  />
                  <TextField
                    label="Email"
                    value={values.email}
                    updateValue={handleOnChangeText("email")}
                    autoCapitalize="none"
                    accessibilityLabel="Enter email"
                    textContentType="emailAddress"
                    autoCompleteType="email"
                    autoCorrect={false}
                    returnKeyType="done"
                    keyboardType="email-address"
                    errors={errors.email}
                  />
                  <TextField
                    label="Password"
                    value={values.password}
                    updateValue={handleOnChangeText("password")}
                    secureTextEntry
                    textContentType="password"
                    autoCompleteType="password"
                    accessibilityLabel="Enter password"
                    returnKeyType="done"
                    errors={errors.password}
                  />
                  <TextField
                    label="Confirm Password"
                    value={values.confirmPassword}
                    updateValue={handleOnChangeText("confirmPassword")}
                    secureTextEntry
                    textContentType="password"
                    autoCompleteType="password"
                    accessibilityLabel="Enter confirm password"
                    returnKeyType="done"
                    onSubmitEditing={handleOnSubmitEditing}
                    errors={errors.confirmPassword}
                    noMarginBottom
                  />
                </View>
                <Text style={style.errorText}>{error}</Text>
                <View style={style.acceptToUContainer}>
                  <Pressable
                    style={Buttons.applyOpacity(acceptToUButtonStyle)}
                    onPress={handleOnPressToggleToU}
                    accessibilityRole="button"
                    accessibilityLabel="Accept terms of use checkbox"
                    accessibilityState={{ checked: isToUAccepted }}
                    accessible
                  >
                    <SvgXml
                      xml={Icons.Checkmark}
                      width={Sizing.icons.x25}
                      height={Sizing.icons.x25}
                      strokeWidth={Sizing.iconStroke.x30}
                      stroke={checkmarkColor}
                    />
                  </Pressable>
                  <View style={style.acceptToUTextContainer}>
                    <Text style={style.acceptToUText}>I accept the </Text>
                    <Pressable
                      style={Buttons.applyOpacity()}
                      onPress={handleOnPressTermsOfUse}
                      accessibilityRole="link"
                    >
                      <Text style={style.termsOfUseLinkText}>Terms of Use</Text>
                    </Pressable>
                  </View>
                </View>
                <View style={style.legalTextContainer}>
                  {/* eslint-disable-next-line react-native/no-raw-text */}
                  <Text style={style.legalText}>
                    By checking the box, you consent to receiving promotional
                    and marketing text messages from MediBlock. You may opt out
                    of such messages at any time by following the instructions
                    in those messages. Please note that we may also send you
                    text messages for informational, transactional, and
                    operational purposes related to our Services. Wireless fees
                    from your carrier may apply to any text messages you receive
                    from us. To learn more about how we use and protect your
                    information, please review our
                    <Text
                      onPress={handleOnPressPrivacyPolicy}
                      style={style.legalLinkText}
                      accessibilityRole="link"
                    >
                      {" "}
                      privacy policy.
                    </Text>
                  </Text>
                </View>
                <Pressable
                  style={Buttons.applyOpacity(buttonStyle)}
                  onPress={handleSubmit}
                  disabled={isSubmitDisabled}
                  accessibilityState={{ disabled: isSubmitDisabled }}
                  accessibilityRole="button"
                >
                  <Text style={style.buttonText}>Sign Up</Text>
                </Pressable>
              </>
            )
          }}
        </Formik>
      </KeyboardAwareScrollView>
      {loading && <FullScreenLoadingIndicator />}
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    ...Elements.container.base,
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: Colors.neutral.s100,
    justifyContent: "space-between",
    paddingTop: Sizing.x20,
    paddingHorizontal: Sizing.x20,
    paddingBottom: Sizing.x70,
  },
  inputsContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  button: {
    ...Buttons.pill.primary,
  },
  buttonText: {
    ...Buttons.pillText.primary,
  },
  errorText: {
    color: Colors.danger.s400,
    marginBottom: Sizing.x20,
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: Sizing.x20,
  },
  acceptToUContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Sizing.x30,
  },
  acceptToUButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Outlines.borderRadius.small,
    borderColor: Colors.neutral.s500,
    borderWidth: Outlines.borderWidth.base,
  },
  acceptToUTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: Sizing.x20,
  },
  acceptToUText: {
    ...Typography.body.x30,
  },
  termsOfUseLinkText: {
    ...Typography.body.x30,
    color: Colors.primary.brand,
  },
  legalTextContainer: {
    marginBottom: Sizing.x30,
  },
  legalText: {
    ...Typography.fontSize.x5,
    lineHeight: 14,
    color: Colors.neutral.s600,
  },
  legalLinkText: {
    ...Typography.fontSize.x5,
    lineHeight: 14,
    color: Colors.primary.brand,
  },
})

export default SignUp
