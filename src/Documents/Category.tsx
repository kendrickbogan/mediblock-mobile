import React, { FC, useLayoutEffect } from "react"
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native"
import { RouteProp, useNavigation } from "@react-navigation/native"
import { useRoute } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { SvgXml } from "react-native-svg"
import { gql } from "@apollo/client"

import { DocumentsStackParams } from "../navigation/DocumentsStack"
import { CategoryType, ProfileSection } from "../category"
import { DocumentsRoutes } from "../navigation/routes"
import { useStatusBarEffect } from "../navigation/useStatusBarEffect"
import FullScreenLoadingIndicator from "../FullScreenLoadingIndicator"

import { Colors, Elements, Buttons, Sizing, Typography } from "../styles"
import { Icons } from "../assets"
import {
  ExpirationProfileSectionCount,
  useGetCategoryMenuDataQuery,
  GetCategoryMenuDataFormCompletions,
  CompletionStatusEnum,
} from "../generated/graphql"

type CategoryRouteProp = RouteProp<DocumentsStackParams, "Category">

type CategoryNavigationProp = StackNavigationProp<
  DocumentsStackParams,
  "Category"
>

export const GET_CATEGORY_MENU_DATA = gql`
  query GetCategoryMenuData($profileSections: [ProfileSectionEnum!]!) {
    personalDetails {
      id
      expirationsByProfileSection {
        id
        count
      }
      formCompletions(profileSections: $profileSections) {
        id
        profileSection
        status
      }
    }
  }
`

const Category: FC = () => {
  useStatusBarEffect("light", Colors.primary.brand)
  const {
    params: { categoryData },
  } = useRoute<CategoryRouteProp>()
  const navigation = useNavigation<CategoryNavigationProp>()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: categoryData.label,
    }),
      []
  })

  if (!categoryData) {
    return null
  }

  return (
    <ScrollView style={style.container} alwaysBounceVertical={false}>
      <ProfileSectionListConnector
        categoryData={categoryData}
        profileSections={categoryData.profileSections}
      />
    </ScrollView>
  )
}

interface ProfileSectionListConnectorProps {
  profileSections: ProfileSection[]
  categoryData: CategoryType
}

const ProfileSectionListConnector: FC<ProfileSectionListConnectorProps> = ({
  categoryData,
  profileSections,
}) => {
  const profileSectionsForQuery = profileSections.map(
    profileSection => profileSection.id,
  )
  const { loading, data } = useGetCategoryMenuDataQuery({
    variables: { profileSections: profileSectionsForQuery },
  })

  if (loading) {
    return <FullScreenLoadingIndicator />
  }

  return (
    <ProfileSectionsContent
      categoryData={categoryData}
      profileSections={profileSections}
      expirationsByProfileSection={
        data?.personalDetails?.expirationsByProfileSection
      }
      formCompletions={data?.personalDetails?.formCompletions}
    />
  )
}

type ProfileSectionWithMenuData = {
  profileSection: ProfileSection
  upcomingExpirationsCount: number
  completionStatus: CompletionStatusEnum
}

interface ProfileSectionsContentProps {
  expirationsByProfileSection: ExpirationProfileSectionCount[] | undefined
  formCompletions: GetCategoryMenuDataFormCompletions[] | undefined
  profileSections: ProfileSection[]
  categoryData: CategoryType
}

const ProfileSectionsContent: FC<ProfileSectionsContentProps> = ({
  formCompletions,
  expirationsByProfileSection,
  profileSections,
  categoryData,
}) => {
  const profileSectionsWithMenuData = profileSections.reduce(
    (
      acc: ProfileSectionWithMenuData[],
      curr: ProfileSection,
    ): ProfileSectionWithMenuData[] => {
      const expirationsForProfileSection = expirationsByProfileSection?.find(
        expirationProfileSectionCount =>
          expirationProfileSectionCount.id === curr.id,
      )

      const formCompletionForProfileSection = formCompletions?.find(
        formCompletion => formCompletion.profileSection === curr.id,
      )

      return [
        ...acc,
        {
          profileSection: curr,
          upcomingExpirationsCount: expirationsForProfileSection?.count || 0,
          completionStatus:
            formCompletionForProfileSection?.status ||
            CompletionStatusEnum.NotStarted,
        },
      ]
    },
    [],
  )

  return (
    <>
      {profileSectionsWithMenuData.map(
        ({ profileSection, upcomingExpirationsCount, completionStatus }) => {
          return (
            <ProfileSectionListItem
              categoryData={categoryData}
              profileSection={profileSection}
              upcomingExpirationsCount={upcomingExpirationsCount}
              key={profileSection.label}
              completionStatus={completionStatus}
            />
          )
        },
      )}
    </>
  )
}

interface ProfileSectionListItemProps {
  profileSection: ProfileSection
  upcomingExpirationsCount: number
  categoryData: CategoryType
  completionStatus: CompletionStatusEnum
}

const completionStatusLabel = (status: CompletionStatusEnum): string => {
  switch (status) {
    case CompletionStatusEnum.NotStarted:
      return "Not started"
    case CompletionStatusEnum.InProgress:
      return "In progress"
    case CompletionStatusEnum.Completed:
      return "Completed"
    default:
      return "NotStarted"
  }
}

const ProfileSectionListItem: FC<ProfileSectionListItemProps> = ({
  profileSection,
  upcomingExpirationsCount,
  categoryData,
  completionStatus,
}) => {
  const navigation = useNavigation()

  const handleOnPressProfileSection = (): void => {
    navigation.navigate(DocumentsRoutes.ProfileInformationForm, {
      categoryData: categoryData,
      profileSectionLabel: profileSection.label,
      profileSection: profileSection.id,
    })
  }

  const statusTextStyle =
    completionStatus === CompletionStatusEnum.InProgress
      ? style.inProgressStatusText
      : style.notStartedStatusText

  const isCompleted = completionStatus === CompletionStatusEnum.Completed

  const upcomingExpirationsText = `${upcomingExpirationsCount} ${
    upcomingExpirationsCount === 1 ? "document" : "documents"
  } expiring soon`

  return (
    <Pressable
      onPress={handleOnPressProfileSection}
      style={Buttons.applyOpacity(style.categoryButton)}
      accessibilityRole="button"
    >
      <View style={style.labelAndExpirations}>
        <Text style={style.categoryButtonText}>{profileSection.label}</Text>
        {isCompleted ? (
          <View style={style.statusTextCompleted}>
            <Text style={style.completeStatusText}>Completed</Text>
            <SvgXml
              xml={Icons.CheckCircle}
              fill={Colors.success.s400}
              width={Sizing.icons.x10}
              height={Sizing.icons.x10}
            />
          </View>
        ) : (
          <Text style={statusTextStyle}>
            {completionStatusLabel(completionStatus)}
          </Text>
        )}
        {upcomingExpirationsCount > 0 && (
          <Text style={style.upcomingExpirationsText} maxFontSizeMultiplier={1}>
            {upcomingExpirationsText}
          </Text>
        )}
      </View>
      <SvgXml
        xml={Icons.CircleChevronRight}
        fill={Colors.secondary.brand}
        width={Sizing.icons.x25}
        height={Sizing.icons.x25}
      />
    </Pressable>
  )
}

const style = StyleSheet.create({
  container: {
    ...Elements.container.base,
  },
  categoryButton: {
    ...Buttons.category.primary,
  },
  categoryButtonText: {
    ...Typography.subheader.x30,
  },
  notStartedStatusText: {
    ...Typography.fontSize.x20,
    marginTop: Sizing.x2,
  },
  upcomingExpirationsText: {
    ...Typography.subheader.x20,
    color: Colors.primary.brand,
  },
  labelAndExpirations: {
    flex: 1,
    marginRight: Sizing.x20,
  },
  inProgressStatusText: {
    ...Typography.subheader.x20,
    color: Colors.warning.s400,
  },
  statusTextCompleted: {
    alignItems: "center",
    flexDirection: "row",
  },
  completeStatusText: {
    ...Typography.subheader.x20,
    color: Colors.success.s400,
    marginRight: Sizing.x5,
  },
})

export default Category
