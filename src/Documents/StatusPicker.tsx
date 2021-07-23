import React, { FC, useEffect, useState } from "react"
import { Text, View } from "react-native"
import { gql } from "@apollo/client"

import AnimatedPicker, { AnimatedPickerOption } from "../AnimatedPicker"
import {
  CompletionStatusEnum,
  DocumentCategoryEnum,
  ProfileSectionEnum,
  useGetFormCompletionStatusQuery,
  useUpdateFormCompletionStatusMutation,
} from "../generated/graphql"
import FullScreenLoadingIndicator from "../FullScreenLoadingIndicator"

import { Colors } from "../styles"

gql`
  mutation UpdateFormCompletionStatus(
    $input: UpdateFormCompletionStatusMutationInput!
  ) {
    updateFormCompletionStatus(input: $input) {
      formCompletion {
        id
      }
    }
  }
`

const GET_FORM_COMPLETION_STATUS = gql`
  query GetFormCompletionStatus($profileSection: ProfileSectionEnum!) {
    personalDetails {
      id
      formCompletion(profileSection: $profileSection) {
        id
        status
      }
    }
  }
`

type PickerOption = AnimatedPickerOption<CompletionStatusEnum>

const PICKER_OPTIONS: PickerOption[] = [
  {
    label: "Not Started",
    value: CompletionStatusEnum.NotStarted,
    color: Colors.secondary.brand,
  },
  {
    label: "In Progress",
    value: CompletionStatusEnum.InProgress,
    color: Colors.warning.s400,
  },
  {
    label: "Completed",
    value: CompletionStatusEnum.Completed,
    color: Colors.success.s400,
  },
]

interface StatusPickerProps {
  profileSection: ProfileSectionEnum
  category: DocumentCategoryEnum
}

const StatusPicker: FC<StatusPickerProps> = ({ profileSection, category }) => {
  const { data, loading, error } = useGetFormCompletionStatusQuery({
    variables: { profileSection },
  })

  if (loading) {
    return <FullScreenLoadingIndicator />
  }

  if (data) {
    return (
      <StatusPickerContent
        status={data?.personalDetails?.formCompletion?.status}
        profileSection={profileSection}
        category={category}
      />
    )
  }

  return <Text>Something went wrong: {error?.message}</Text>
}

interface StatusPickerContentProps {
  profileSection: ProfileSectionEnum
  category: DocumentCategoryEnum
  status: CompletionStatusEnum | undefined
}

const StatusPickerContent: FC<StatusPickerContentProps> = ({
  status,
  category,
  profileSection,
}) => {
  const [
    updateFormCompletionStatusMutation,
  ] = useUpdateFormCompletionStatusMutation()

  const currentOptionForStatus = PICKER_OPTIONS.find(
    option => option.value === status,
  )

  const [currentOption, setCurrentOption] = useState<PickerOption>(
    currentOptionForStatus || PICKER_OPTIONS[0],
  )

  const handleOnUpdateCurrentOption = (option: PickerOption) => {
    setCurrentOption(option)
  }

  useEffect(() => {
    updateFormCompletionStatusMutation({
      variables: {
        input: {
          category,
          profileSection,
          status: currentOption.value,
        },
      },
      refetchQueries: [
        { query: GET_FORM_COMPLETION_STATUS, variables: { profileSection } },
      ],
    })
  }, [
    currentOption,
    profileSection,
    category,
    updateFormCompletionStatusMutation,
  ])

  return (
    <View>
      <AnimatedPicker<CompletionStatusEnum>
        options={PICKER_OPTIONS}
        currentOption={currentOption}
        onUpdateCurrentOption={handleOnUpdateCurrentOption}
      />
    </View>
  )
}

export default StatusPicker
