import React, { FC } from "react"
import { View, Text, StyleSheet, Pressable } from "react-native"

import { useAuthContext } from "../AuthContext"
import {
  OnboardingStatusEnum,
  useUpdateUserMutation,
} from "../generated/graphql"
import FullScreenLoadingIndicator from "../FullScreenLoadingIndicator"
import { gql } from "@apollo/client"

gql`
  mutation UpdateUser($input: UpdateUserMutationInput!) {
    updateUser(input: $input) {
      user {
        ...BaseUserFields
      }
    }
  }
`

const ImportData: FC = () => {
  const { setAndStoreCurrentUser } = useAuthContext()
  const [updateUser, { loading }] = useUpdateUserMutation()

  const handleOnPressImport = async (): Promise<void> => {
    const result = await updateUser({
      variables: {
        input: {
          onboardingStatus: OnboardingStatusEnum.OnboardingComplete,
        },
      },
    })

    if (result.data?.updateUser?.user) {
      const {
        id,
        authorizationToken: token,
        onboardingStatus,
        expirationWarningTime,
        expirationWarningTimeUnits,
      } = result.data.updateUser.user

      setAndStoreCurrentUser({
        id,
        token,
        expirationWarningTimeFrame: {
          units: expirationWarningTimeUnits,
          duration: expirationWarningTime,
        },
        onboardingStatus,
      })
    }
  }

  return (
    <View style={style.container}>
      <Text>ImportData</Text>
      <Pressable onPress={handleOnPressImport} accessibilityRole="button">
        <Text>Import</Text>
      </Pressable>
      {loading && <FullScreenLoadingIndicator />}
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default ImportData
