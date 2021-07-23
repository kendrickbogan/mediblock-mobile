import React, { useLayoutEffect, FC, useCallback } from "react"
import {
  Alert,
  NativeSyntheticEvent,
  NativeTouchEvent,
  StyleSheet,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { HeaderBackButton } from "@react-navigation/stack"
import HeaderLoadingIndicator from "../HeaderLoadingIndicator"

import { Colors, Sizing } from "../styles"
import { FormikErrors } from "formik"

const useHeaderSaveButton = <T extends unknown>(
  handleSubmit: (
    e?: NativeSyntheticEvent<NativeTouchEvent> | undefined,
  ) => void,
  submissionInFlight: boolean,
  errors: FormikErrors<T>,
): void => {
  const navigation = useNavigation()

  const handleOnSubmit = useCallback(() => {
    const errorValues = Object.values(errors)

    const hasErrors = errorValues.length
    if (hasErrors) {
      const errorString = errorValues.join("\n")
      Alert.alert("Error Submitting Form", errorString)
    }

    handleSubmit()
  }, [errors, handleSubmit])

  useLayoutEffect(() => {
    const HeaderRight: FC = () => {
      if (submissionInFlight) {
        return <HeaderLoadingIndicator />
      } else {
        return (
          <HeaderBackButton
            label="Save"
            onPress={handleOnSubmit}
            disabled={submissionInFlight}
            tintColor={Colors.neutral.white}
            backImage={(): null => null}
            style={style.button}
          />
        )
      }
    }

    navigation.dangerouslyGetParent()?.setOptions({
      headerRight: HeaderRight,
    })
  }, [handleSubmit, submissionInFlight, navigation, handleOnSubmit])
}

const style = StyleSheet.create({
  button: {
    paddingHorizontal: Sizing.x20,
  },
})

export default useHeaderSaveButton
