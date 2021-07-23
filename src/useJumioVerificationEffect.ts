import { useEffect, useCallback } from "react"
import { NativeEventEmitter, NativeModules } from "react-native"
import { MutationFunction } from "@apollo/client"
import { useNavigation } from "@react-navigation/native"

import {
  CreateJumioIdentityVerificationMutation,
  CreateJumioIdentityVerificationMutationVariables,
} from "./generated/graphql"
import { useAuthContext } from "./AuthContext"

const { JumioMobileSDKNetverify } = NativeModules

export const useJumioVerificationEffect = (
  createJumioVerificationMutation: MutationFunction<
    CreateJumioIdentityVerificationMutation,
    CreateJumioIdentityVerificationMutationVariables
  >,
): void => {
  const navigation = useNavigation()
  const { setAndStoreCurrentUser } = useAuthContext()

  const executeJumioVerificationMutation = useCallback(
    (jumioScanReference: string): void => {
      createJumioVerificationMutation({
        variables: {
          input: {
            jumioScanReference,
          },
        },
      }).then(result => {
        if (result.data?.createJumioIdentityVerification?.user) {
          const {
            id,
            authorizationToken: token,
            expirationWarningTimeUnits,
            expirationWarningTime,
            onboardingStatus,
          } = result.data.createJumioIdentityVerification.user

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
      })
    },
    [setAndStoreCurrentUser, createJumioVerificationMutation],
  )

  useEffect(() => {
    const emitterNetverify = new NativeEventEmitter(JumioMobileSDKNetverify)

    emitterNetverify.addListener("EventDocumentData", EventDocumentData => {
      executeJumioVerificationMutation(EventDocumentData["scanReference"])
    })

    emitterNetverify.addListener("EventErrorNetverify", EventErrorNetverify =>
      console.log(
        "EventErrorNetverify: " + JSON.stringify(EventErrorNetverify),
      ),
    )

    return (): void => {
      emitterNetverify.removeAllListeners("EventDocumentData")
      emitterNetverify.removeAllListeners("EventErrorNetverify")
    }
  }, [setAndStoreCurrentUser, navigation, executeJumioVerificationMutation])
}
