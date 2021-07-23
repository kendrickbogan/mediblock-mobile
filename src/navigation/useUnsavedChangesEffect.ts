import { useEffect } from "react"
import { useNavigation } from "@react-navigation/core"
import { Alert, NativeSyntheticEvent, NativeTouchEvent } from "react-native"
import _ from "lodash"

const useUnsavedChanges = <T>(
  currentFormState: T,
  initialFormState: T,
  successfulMutation: boolean,
  handleSubmit: (
    e?: NativeSyntheticEvent<NativeTouchEvent> | undefined,
  ) => void,
): void => {
  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      "beforeRemove",
      navigationEvent => {
        const hasUnsavedChanges = !_.isEqual(currentFormState, initialFormState)

        if (!successfulMutation && hasUnsavedChanges) {
          navigationEvent.preventDefault()

          Alert.alert(
            "Save changes?",
            "You have unsaved changes. Would you like to save them?",
            [
              {
                text: "Discard",
                style: "destructive",
                onPress: (): void =>
                  navigation.dispatch(navigationEvent.data.action),
              },
              {
                text: "Save",
                style: "default",
                onPress: (): void => handleSubmit(),
              },
            ],
          )
        }
      },
    )

    return unsubscribe
  }, [
    navigation,
    initialFormState,
    currentFormState,
    successfulMutation,
    handleSubmit,
  ])
}

export default useUnsavedChanges
