import { gql } from "@apollo/client"
import React, { FC, useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import AnimatedPicker, { AnimatedPickerOption } from "../AnimatedPicker"
import Slider from "../Slider"
import FullScreenLoadingIndicator from "../FullScreenLoadingIndicator"

import {
  ExpirationWarningTimeUnitsEnum,
  useGetUserExpirationWarningTimeQuery,
  useUpdateUserExpirationWarningTimeMutation,
} from "../generated/graphql"
import { useAuthContext } from "../AuthContext"

import { Colors, Elements, Sizing, Typography } from "../styles"

gql`
  query GetUserExpirationWarningTime {
    me {
      id
      expirationWarningTimeUnits
      expirationWarningTime
    }
  }
`

gql`
  mutation UpdateUserExpirationWarningTime($input: UpdateUserMutationInput!) {
    updateUser(input: $input) {
      user {
        ...BaseUserFields
      }
    }
  }
`

const ExpirationWarningTime: FC = () => {
  return (
    <ScrollView
      style={style.container}
      contentContainerStyle={style.contentContainer}
      alwaysBounceVertical={false}
    >
      <ExpirationWarningTimeConnector />
    </ScrollView>
  )
}

type PickerOption = AnimatedPickerOption<ExpirationWarningTimeUnitsEnum>

const PICKER_OPTIONS: PickerOption[] = [
  {
    label: "Weeks",
    value: ExpirationWarningTimeUnitsEnum.Weeks,
    color: Colors.secondary.brand,
  },
  {
    label: "Months",
    value: ExpirationWarningTimeUnitsEnum.Months,
    color: Colors.secondary.brand,
  },
]

const ExpirationWarningTimeConnector: FC = () => {
  const { data, loading, error } = useGetUserExpirationWarningTimeQuery()

  if (loading) {
    return <FullScreenLoadingIndicator />
  }

  if (data?.me?.expirationWarningTimeUnits && data?.me?.expirationWarningTime) {
    return (
      <ExpirationWarningTimeContent
        units={data.me.expirationWarningTimeUnits}
        duration={data.me.expirationWarningTime}
      />
    )
  }

  return <Text>Something went wrong: {error?.message}</Text>
}

interface ExpirationWarningTimeContentProps {
  units: ExpirationWarningTimeUnitsEnum
  duration: number
}

const ExpirationWarningTimeContent: FC<ExpirationWarningTimeContentProps> = ({
  units,
  duration,
}) => {
  const { setAndStoreCurrentUser } = useAuthContext()
  const [
    updateUserExpirationWarningTimeMutation,
  ] = useUpdateUserExpirationWarningTimeMutation()

  const currentOptionForUnits = PICKER_OPTIONS.find(
    option => option.value === units,
  )

  const [currentUnitsOption, setCurrentUnitsOption] = useState<PickerOption>(
    currentOptionForUnits || PICKER_OPTIONS[0],
  )

  const handleOnUpdateCurrentOption = (option: PickerOption) => {
    setCurrentUnitsOption(option)
  }

  const [currentExpirationDuration, setCurrentExpirationDuration] = useState(
    duration,
  )

  useEffect(() => {
    const updateExpirationWarningTime = async (): Promise<void> => {
      const result = await updateUserExpirationWarningTimeMutation({
        variables: {
          input: {
            expirationWarningTimeUnits: currentUnitsOption.value,
            expirationWarningTime: currentExpirationDuration,
          },
        },
        refetchQueries: ["GetMenuDataByCategory", "GetCategoryMenuData"],
      })

      if (result.data?.updateUser?.user) {
        const {
          id,
          onboardingStatus,
          authorizationToken: token,
          expirationWarningTime,
          expirationWarningTimeUnits,
        } = result.data.updateUser.user

        setAndStoreCurrentUser({
          id,
          token,
          onboardingStatus,
          expirationWarningTimeFrame: {
            units: expirationWarningTimeUnits,
            duration: expirationWarningTime,
          },
        })
      }
    }

    updateExpirationWarningTime()
  }, [
    currentUnitsOption.value,
    updateUserExpirationWarningTimeMutation,
    currentExpirationDuration,
    setAndStoreCurrentUser,
  ])

  return (
    <>
      <Text style={style.explanationText}>
        Set the time frame for marking items as expiring soon
      </Text>
      <View style={style.sliderContainer}>
        <Slider
          currentValue={currentExpirationDuration}
          onUpdateCurrentValue={setCurrentExpirationDuration}
          minValue={1}
          maxValue={12}
        />
      </View>
      <AnimatedPicker<ExpirationWarningTimeUnitsEnum>
        options={PICKER_OPTIONS}
        currentOption={currentUnitsOption}
        onUpdateCurrentOption={handleOnUpdateCurrentOption}
      />
    </>
  )
}

const style = StyleSheet.create({
  container: {
    ...Elements.container.base,
  },
  contentContainer: {
    padding: Sizing.x20,
    flexGrow: 1,
    justifyContent: "center",
  },
  sliderContainer: {
    marginBottom: Sizing.x30,
  },
  explanationText: {
    ...Typography.body.x40,
    textAlign: "center",
    marginBottom: Sizing.x60,
    paddingHorizontal: Sizing.x20,
  },
})

export default ExpirationWarningTime
