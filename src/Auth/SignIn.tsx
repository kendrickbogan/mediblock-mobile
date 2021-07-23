import React, { FC, useRef, ReactNode, useState } from "react"
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native"
import * as yup from "yup"
import { Formik } from "formik"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import StaticSafeAreaInsets from "react-native-static-safe-area-insets"
import { useNavigation } from "@react-navigation/native"
import { gql } from "@apollo/client"
import { SvgXml } from "react-native-svg"

import { useAuthContext } from "../AuthContext"
import { FieldErrors } from "../Forms/formHelpers"
import { useStatusBarEffect } from "../navigation/useStatusBarEffect"
import { UnauthenticatedRoutes } from "../navigation/routes"
import FullScreenLoadingIndicator from "../FullScreenLoadingIndicator"
import { useSignInMutation } from "../generated/graphql"

import { Colors, Forms, Sizing, Elements, Buttons } from "../styles"
import { Images } from "../assets"

gql`
  mutation SignIn($input: SignInMutationInput!) {
    signIn(input: $input) {
      user {
        ...BaseUserFields
      }
    }
  }
`

type FormValues = {
  email: string
  password: string
}

const initialValues: FormValues = {
  email: "",
  password: "",
}

const validationSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
})

const SignIn: FC = () => {
  useStatusBarEffect("dark", Colors.neutral.white)
  const navigation = useNavigation()
  const [authenticateUser, { loading }] = useSignInMutation()
  const { setAndStoreCurrentUser } = useAuthContext()

  const initialError = ""
  const [error, setError] = useState("")

  const passwordInputRef = useRef<TextInput>(null)

  const handleOnSignIn = async ({
    email,
    password,
  }: FormValues): Promise<void> => {
    const result = await authenticateUser({
      variables: { input: { email, password } },
    })

    if (result.data?.signIn?.user) {
      const {
        id,
        authorizationToken: token,
        expirationWarningTimeUnits,
        expirationWarningTime,
        onboardingStatus,
      } = result.data.signIn.user

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
      setError(
        "We couldn't find an account with that username and password. Try again.",
      )
    }
  }

  const handleOnSubmitEmail = (): void => {
    passwordInputRef.current?.focus()
  }

  const handleOnPressSignUp = (): void => {
    navigation.navigate(UnauthenticatedRoutes.SignUp)
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
          onSubmit={handleOnSignIn}
          validationSchema={validationSchema}
        >
          {({ handleSubmit, setFieldValue, values, errors }): ReactNode => {
            const handleOnChangeText = (field: string) => (
              value: string,
            ): void => {
              setError(initialError)
              setFieldValue(field, value)
            }
            return (
              <>
                <View style={style.inputsContainer}>
                  <View style={style.inputContainer}>
                    <View style={style.logoContainer}>
                      <SvgXml xml={Images.MediBlockLogo} width="250" />
                    </View>
                    <Text style={style.inputLabel}>Email</Text>
                    <TextInput
                      value={values.email}
                      onChangeText={handleOnChangeText("email")}
                      autoCapitalize="none"
                      accessibilityLabel="Enter email"
                      textContentType="emailAddress"
                      autoCompleteType="email"
                      autoCorrect={false}
                      returnKeyType="next"
                      keyboardType="email-address"
                      onSubmitEditing={handleOnSubmitEmail}
                      style={style.input}
                    />
                    <FieldErrors errors={errors.email} />
                  </View>
                  <View style={style.inputContainer}>
                    <Text style={style.inputLabel}>Password</Text>
                    <TextInput
                      value={values.password}
                      onChangeText={handleOnChangeText("password")}
                      secureTextEntry
                      textContentType="password"
                      autoCompleteType="password"
                      accessibilityLabel="Enter password"
                      returnKeyType="done"
                      ref={passwordInputRef}
                      onSubmitEditing={handleSubmit}
                      style={style.input}
                    />
                    <FieldErrors errors={errors.password} />
                  </View>
                </View>
                <Text style={style.errorText}>{error}</Text>
                <Pressable
                  style={Buttons.applyOpacity(style.button)}
                  onPress={handleSubmit}
                  accessibilityRole="button"
                >
                  <Text style={style.buttonText}>Sign In</Text>
                </Pressable>
              </>
            )
          }}
        </Formik>
        <Pressable
          style={Buttons.applyOpacity(style.secondaryButton)}
          onPress={handleOnPressSignUp}
          accessibilityRole="button"
        >
          <Text style={style.secondaryButtonText}>Sign Up</Text>
        </Pressable>
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
  inputContainer: {
    marginBottom: Sizing.x15,
  },
  input: {
    ...Forms.input.primary,
  },
  inputLabel: {
    ...Forms.inputLabel.primary,
  },
  button: {
    ...Buttons.pill.primary,
    marginBottom: Sizing.x10,
  },
  buttonText: {
    ...Buttons.pillText.primary,
  },
  secondaryButton: {
    ...Buttons.pill.secondary,
  },
  secondaryButtonText: {
    ...Buttons.pillText.secondary,
  },
  errorText: {
    color: Colors.danger.s400,
    marginBottom: Sizing.x20,
    minHeight: Sizing.x50,
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: Sizing.x20,
  },
})

export default SignIn
