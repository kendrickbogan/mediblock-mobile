import React, { FC, useEffect } from "react"
import {
  NativeModules,
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from "react-native"
import { gql, MutationTuple } from "@apollo/client"
import Config from "react-native-config"

import {
  CreateJumioIdentityVerificationMutation,
  CreateJumioIdentityVerificationMutationVariables,
  OnboardingStatusEnum,
  useCreateJumioIdentityVerificationMutation,
  useGetCurrentUserQuery,
  useUpdateUserMutation,
  VerificationStatusEnum,
} from "../generated/graphql"
import { useAuthContext, User } from "../AuthContext"
import { useJumioVerificationEffect } from "../useJumioVerificationEffect"
import FullScreenLoadingIndicator from "../FullScreenLoadingIndicator"

import {
  Buttons,
  Colors,
  Elements,
  Outlines,
  Sizing,
  Typography,
} from "../styles"
import { SvgXml } from "react-native-svg"
import { Icons } from "../assets"
import ExternalLinking from "../externalLinking"

const { JumioMobileSDKNetverify } = NativeModules

gql`
  mutation CreateJumioIdentityVerification(
    $input: CreateJumioIdentityVerificationMutationInput!
  ) {
    createJumioIdentityVerification(input: $input) {
      user {
        ...BaseUserFields
      }
    }
  }
`

gql`
  query GetCurrentUser {
    me {
      ...BaseUserFields
      lastVerification {
        verificationStatus
      }
    }
  }
`

interface VerifyIdentityProps {
  currentUser: User
}

const VerifyIdentity: FC<VerifyIdentityProps> = ({ currentUser }) => {
  const { onboardingStatus } = currentUser
  const { setAndStoreCurrentUser } = useAuthContext()
  const { signOut } = useAuthContext()
  const { data } = useGetCurrentUserQuery({
    pollInterval: 10000,
    fetchPolicy: "network-only",
  })

  const identityVerificationMutationTuple = useCreateJumioIdentityVerificationMutation()

  const [, { loading }] = identityVerificationMutationTuple

  useEffect(() => {
    if (data?.me && data.me.onboardingStatus !== onboardingStatus) {
      setAndStoreCurrentUser({
        id: data.me.id,
        onboardingStatus: data.me.onboardingStatus,
        expirationWarningTimeFrame: {
          units: data.me.expirationWarningTimeUnits,
          duration: data.me.expirationWarningTime,
        },
        token: data.me.authorizationToken,
      })
    }
  }, [data, setAndStoreCurrentUser, onboardingStatus, currentUser])

  const handleOnPressSignOut = (): void => {
    signOut()
  }

  const handleOnPressLearnMore = async (): Promise<void> => {
    ExternalLinking.openUrl(Config.LEARN_MORE_URL)
  }

  const SignOutButton: FC = () => {
    return (
      <View style={style.navigationContainer}>
        <Pressable
          style={Buttons.applyOpacity(style.navigationButton)}
          onPress={handleOnPressSignOut}
          accessibilityRole="button"
        >
          <Text style={style.navigationButtonText}>Sign Out</Text>
        </Pressable>
        <Pressable
          style={Buttons.applyOpacity(style.navigationButton)}
          onPress={handleOnPressLearnMore}
          accessibilityRole="button"
        >
          <Text style={style.navigationButtonText}>Learn More</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <SafeAreaView style={style.container}>
      <SignOutButton />
      <ScrollView
        style={style.container}
        contentContainerStyle={style.contentContainer}
        alwaysBounceVertical={false}
      >
        <VerifyIdentityConnector
          currentUser={currentUser}
          verificationStatus={data?.me?.lastVerification?.verificationStatus}
          identityVerificationMutationTuple={identityVerificationMutationTuple}
        />
      </ScrollView>
      {loading && <FullScreenLoadingIndicator />}
    </SafeAreaView>
  )
}

interface VerifyIdentityConnectorProps {
  currentUser: User
  verificationStatus?: VerificationStatusEnum
  identityVerificationMutationTuple: MutationTuple<
    CreateJumioIdentityVerificationMutation,
    CreateJumioIdentityVerificationMutationVariables
  >
}

const VerifyIdentityConnector: FC<VerifyIdentityConnectorProps> = ({
  currentUser,
  verificationStatus,
  identityVerificationMutationTuple,
}) => {
  const { onboardingStatus } = currentUser

  if (onboardingStatus === OnboardingStatusEnum.AccountCreated) {
    return (
      <JumioVerification
        currentUser={currentUser}
        identityVerificationMutationTuple={identityVerificationMutationTuple}
      />
    )
  }

  if (onboardingStatus === OnboardingStatusEnum.AwaitingVerification) {
    return <AwaitingVerification />
  }

  if (
    (onboardingStatus === OnboardingStatusEnum.IdentityVerificationFailed ||
      onboardingStatus === OnboardingStatusEnum.VerificationAttemptsExceeded) &&
    verificationStatus
  ) {
    return (
      <VerificationFailed
        currentUser={currentUser}
        verificationStatus={verificationStatus}
        identityVerificationMutationTuple={identityVerificationMutationTuple}
      />
    )
  }

  return (
    <>
      <Text style={style.body}>Something went wrong</Text>
    </>
  )
}

interface JumioVerificationProps {
  currentUser: User
  identityVerificationMutationTuple: MutationTuple<
    CreateJumioIdentityVerificationMutation,
    CreateJumioIdentityVerificationMutationVariables
  >
}

const JumioVerification: FC<JumioVerificationProps> = ({
  currentUser,
  identityVerificationMutationTuple,
}) => {
  const { setAndStoreCurrentUser } = useAuthContext()
  const [completeOnboarding] = useUpdateUserMutation({
    variables: {
      input: { onboardingStatus: OnboardingStatusEnum.OnboardingComplete },
    },
  })

  const [createJumioVerification] = identityVerificationMutationTuple

  useJumioVerificationEffect(createJumioVerification)

  const handleOnPressVerify = async (): Promise<void> => {
    if (!__DEV__) {
      startNetverify(currentUser)
    } else {
      await completeOnboarding()
      setAndStoreCurrentUser({
        id: currentUser.id,
        onboardingStatus: OnboardingStatusEnum.OnboardingComplete,
        expirationWarningTimeFrame: currentUser.expirationWarningTimeFrame,
        token: currentUser.token,
      })
    }
  }

  return (
    <>
      <SvgXml
        xml={Icons.Security}
        width={Sizing.x80}
        height={Sizing.x80}
        fill={Colors.secondary.brand}
      />
      <Text style={style.header}>We take security seriously</Text>
      <Text style={style.body}>
        Before we go any further we need to verify your identity.
      </Text>
      <Pressable
        onPress={handleOnPressVerify}
        style={Buttons.applyOpacity(style.pillButton)}
        accessibilityRole="button"
      >
        <SvgXml
          xml={Icons.Lock}
          width={Sizing.x20}
          height={Sizing.x20}
          strokeWidth={Sizing.iconStroke.x20}
          stroke={Colors.neutral.white}
        />
        <Text style={style.pillButtonText}>Verify my identity</Text>
      </Pressable>
      <Text style={style.verifyIdentityButtonDescription}>
        You&apos;ll need a drivers license or passport to complete this process.
      </Text>
    </>
  )
}

const startNetverify = (user: User): void => {
  const jumioConfiguration = {
    enableVerification: true,
    enableIdentityVerification: true,
    preselectedCountry: "USA",
    userReference: user.id,
    cameraPosition: "FRONT",
    documentTypes: ["DRIVER_LICENSE", "PASSPORT"],
  }

  JumioMobileSDKNetverify.initNetverify(
    Config.JUMIO_API_TOKEN,
    Config.JUMIO_API_SECRET,
    "US",
    {
      configuration: jumioConfiguration,
    },
  )
  JumioMobileSDKNetverify.startNetverify()
}

const verificationStatusToText = (
  verificationStatus: VerificationStatusEnum,
): string => {
  switch (verificationStatus) {
    case VerificationStatusEnum.DeniedFraud: {
      return "Jumio detected your verification submission as fradulent."
    }
    case VerificationStatusEnum.NoIdUploaded: {
      return "Your submission was incomplete and missing a photo of your ID."
    }
    case VerificationStatusEnum.ErrorNotReadableId: {
      return "The ID you submitted was not readable because the data was obscured or the photo was too blurry."
    }
    case VerificationStatusEnum.DeniedUnsupportedIdType: {
      return "The ID you submitted is not a supported ID type (State issued IDs or passports only)."
    }
    case VerificationStatusEnum.DeniedUnsupportedIdCountry: {
      return "The ID you submitted comes from a country we don't currently support."
    }
    default: {
      return "Something unexpected happened with your verification submission."
    }
  }
}

const AwaitingVerification: FC = () => {
  return (
    <>
      <ActivityIndicator
        size="large"
        color={Colors.primary.brand}
        style={style.activityIndicator}
      />
      <Text style={style.header}>We are waiting to hear back from Jumio.</Text>
      <Text style={style.body}>
        This should only take a few minutes. Once we&apos;ve verified your
        identity, you can finish setting things up.
      </Text>
    </>
  )
}

interface VerificationFailedProps {
  currentUser: User
  verificationStatus: VerificationStatusEnum
  identityVerificationMutationTuple: MutationTuple<
    CreateJumioIdentityVerificationMutation,
    CreateJumioIdentityVerificationMutationVariables
  >
}

const VerificationFailed: FC<VerificationFailedProps> = ({
  currentUser,
  verificationStatus,
  identityVerificationMutationTuple,
}) => {
  const { onboardingStatus } = currentUser
  const { setAndStoreCurrentUser } = useAuthContext()
  const [completeOnboarding] = useUpdateUserMutation({
    variables: {
      input: { onboardingStatus: OnboardingStatusEnum.OnboardingComplete },
    },
  })

  const [createVerificationMutation] = identityVerificationMutationTuple

  useJumioVerificationEffect(createVerificationMutation)

  const handleOnPressRetryVerify = async (): Promise<void> => {
    if (!__DEV__) {
      startNetverify(currentUser)
    } else {
      await completeOnboarding()
      setAndStoreCurrentUser({
        id: currentUser.id,
        onboardingStatus: OnboardingStatusEnum.OnboardingComplete,
        expirationWarningTimeFrame: currentUser.expirationWarningTimeFrame,
        token: currentUser.token,
      })
    }
  }

  return (
    <>
      <SvgXml
        xml={Icons.AlertCircle}
        width={Sizing.x50}
        height={Sizing.x50}
        stroke={Colors.primary.brand}
        strokeWidth={Sizing.iconStroke.x15}
        style={style.failedIcon}
      />
      <Text style={style.header}>
        We were unable to verify your identity through Jumio
      </Text>
      <Text style={style.body}>
        Reason: {verificationStatusToText(verificationStatus)}
      </Text>
      {onboardingStatus !==
        OnboardingStatusEnum.VerificationAttemptsExceeded && (
        <Pressable
          onPress={handleOnPressRetryVerify}
          style={Buttons.applyOpacity(style.pillButtonSecondary)}
          accessibilityRole="button"
        >
          <SvgXml
            xml={Icons.ReplaceArrows}
            width={Sizing.x20}
            height={Sizing.x20}
            strokeWidth={Sizing.iconStroke.x20}
            stroke={Colors.secondary.brand}
          />
          <Text style={style.pillButtonSecondaryText}>Retry</Text>
        </Pressable>
      )}

      {onboardingStatus ===
        OnboardingStatusEnum.VerificationAttemptsExceeded && (
        <Text style={style.body}>
          We’re sorry. We cannot validate your identity at this time. This can
          be due to problems with recognizing your ID, or changes in your
          appearance in comparison with your ID.
          {"\n\n"}
          Please call MediBlock at 415-272-4375 during daytime hours (Pacific
          Time 8:00 AM to 8:00 PM) or email us at hello-mediblock@mediblock.io
          with your callback number and we can assist you in signing up.
        </Text>
      )}
    </>
  )
}

const style = StyleSheet.create({
  container: {
    ...Elements.container.base,
  },
  contentContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: Sizing.x30,
    paddingHorizontal: Sizing.x20,
  },
  header: {
    ...Typography.subheader.x40,
    marginVertical: Sizing.x20,
    paddingHorizontal: Sizing.x40,
    textAlign: "center",
  },
  body: {
    ...Typography.body.x30,
    marginBottom: Sizing.x50,
    paddingHorizontal: Sizing.x40,
    textAlign: "center",
  },
  verifyIdentityButtonDescription: {
    ...Typography.body.x20,
    color: Colors.neutral.s400,
    marginTop: Sizing.x20,
    paddingHorizontal: Sizing.x40,
    textAlign: "center",
  },
  pillButton: {
    ...Buttons.pill.primary,
    backgroundColor: Colors.primary.brand,
    borderColor: Colors.primary.brand,
    flexDirection: "row",
    marginTop: Sizing.x10,
    width: "100%",
  },
  pillButtonText: {
    ...Buttons.pillText.primary,
    marginLeft: Sizing.x10,
    textAlign: "center",
  },
  pillButtonSecondary: {
    ...Buttons.pill.secondary,
    flexDirection: "row",
    marginTop: Sizing.x20,
    width: "100%",
  },
  pillButtonSecondaryText: {
    ...Buttons.pillText.secondary,
    marginLeft: Sizing.x10,
    textAlign: "center",
  },
  navigationContainer: {
    borderBottomWidth: Outlines.borderWidth.hairline,
    borderColor: Colors.neutral.s200,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  navigationButton: {
    alignSelf: "flex-start",
    marginTop: Sizing.x10,
    paddingHorizontal: Sizing.x20,
    paddingVertical: Sizing.x10,
  },
  navigationButtonText: {
    ...Typography.body.x20,
    color: Colors.neutral.s500,
    textAlign: "center",
  },
  activityIndicator: {
    borderRadius: Outlines.borderRadius.base,
    height: 50,
    width: 50,
  },
  failedIcon: {
    marginBottom: Sizing.x20,
  },
})

export default VerifyIdentity
