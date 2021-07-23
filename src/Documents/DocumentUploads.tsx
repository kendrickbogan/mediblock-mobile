import React, { FC, useCallback } from "react"
import {
  Text,
  StyleSheet,
  Pressable,
  Image,
  View,
  ScrollView,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { gql, QueryResult } from "@apollo/client"
import { SvgXml } from "react-native-svg"
import dayjs from "dayjs"

import {
  NavigatorRoutes,
  AddDocumentForUploadRoutes,
} from "../navigation/routes"
import {
  GetDocumentsDocuments,
  useGetDocumentsQuery,
  GetDocumentsQuery,
  GetDocumentsQueryVariables,
  ProfileSectionEnum,
} from "../generated/graphql"
import { useStatusBarEffect } from "../navigation/useStatusBarEffect"
import { useUserContext } from "../UserContext"
import { toExpirationWarningTimeFrameUnitsString } from "../stringHelpers"
import { CategoryType } from "../category"
import FullScreenLoadingIndicator from "../FullScreenLoadingIndicator"

import {
  Elements,
  Colors,
  Sizing,
  Typography,
  Buttons,
  Outlines,
} from "../styles"
import { Icons } from "../assets"

export const GET_DOCUMENTS = gql`
  query GetDocuments(
    $category: DocumentCategoryEnum!
    $profileSection: ProfileSectionEnum!
  ) {
    personalDetails {
      id
      documents(category: $category, profileSection: $profileSection) {
        id
        name
        expiresAt
        attachment {
          id
          previewUrl
        }
      }
    }
  }
`

interface DocumentUploadProps {
  profileSection: ProfileSectionEnum
  categoryData: CategoryType
}

const DocumentUploads: FC<DocumentUploadProps> = ({
  categoryData,
  profileSection,
}) => {
  useStatusBarEffect("light", Colors.primary.brand)
  const getDocumentsQueryResult = useGetDocumentsQuery({
    variables: { category: categoryData.id, profileSection },
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
  })

  const { loading } = getDocumentsQueryResult

  return (
    <View style={style.container}>
      <ScrollView
        contentContainerStyle={style.contentContainer}
        alwaysBounceVertical={false}
      >
        <DocumentUploadsConnector
          categoryData={categoryData}
          getDocumentsQueryResult={getDocumentsQueryResult}
          profileSection={profileSection}
        />
      </ScrollView>
      {loading && <FullScreenLoadingIndicator />}
    </View>
  )
}

interface DocumentUploadsConnectorProps {
  categoryData: CategoryType
  getDocumentsQueryResult: QueryResult<
    GetDocumentsQuery,
    GetDocumentsQueryVariables
  >
  profileSection: ProfileSectionEnum
}

const DocumentUploadsConnector: FC<DocumentUploadsConnectorProps> = ({
  categoryData,
  getDocumentsQueryResult,
  profileSection,
}) => {
  const navigation = useNavigation()

  const handleOnPressAdd = useCallback((): void => {
    navigation.navigate(NavigatorRoutes.AddDocumentForUpload, {
      screen: AddDocumentForUploadRoutes.AddDocumentUpload,
      params: { categoryData, profileSection },
    })
  }, [categoryData, navigation, profileSection])

  const { data } = getDocumentsQueryResult

  if (data) {
    const documents = data.personalDetails?.documents

    if (!documents) {
      return null
    }

    if (documents.length === 0) {
      return <EmptyDocumentsList handleOnPressAdd={handleOnPressAdd} />
    } else {
      return (
        <DocumentsList
          categoryData={categoryData}
          documents={documents}
          handleOnPressAdd={handleOnPressAdd}
        />
      )
    }
  }

  return null
}

interface EmptyDocumentsListProps {
  handleOnPressAdd: () => void
}

const EmptyDocumentsList: FC<EmptyDocumentsListProps> = ({
  handleOnPressAdd,
}) => {
  return (
    <View style={style.emptyStateContainer}>
      <SvgXml
        xml={Icons.FileText}
        width={Sizing.icons.x40}
        height={Sizing.icons.x40}
        stroke={Colors.primary.brand}
        strokeWidth={Sizing.iconStroke.x20}
        style={style.emptyStateIcon}
      />
      <Text style={style.noDocumentsText}>
        No documents have been added yet.
      </Text>
      <Pressable
        style={Buttons.applyOpacity(style.emptyListAddDocumentsButton)}
        accessibilityRole="button"
        onPress={handleOnPressAdd}
      >
        <Text style={style.addDocumentsButtonText}>Scan or add a document</Text>
      </Pressable>
    </View>
  )
}

interface DocumentsListProps {
  documents: GetDocumentsDocuments[]
  handleOnPressAdd: () => void
  categoryData: CategoryType
}

const DocumentsList: FC<DocumentsListProps> = ({
  categoryData,
  documents,
  handleOnPressAdd,
}) => {
  const navigation = useNavigation()
  const {
    currentUser: { expirationWarningTimeFrame },
  } = useUserContext()

  const toDocument = (
    document: GetDocumentsDocuments,
    index: number,
  ): JSX.Element => {
    const handleOnPressDocument = (): void => {
      navigation.navigate(NavigatorRoutes.AddDocumentForUpload, {
        screen: AddDocumentForUploadRoutes.EditDocumentUpload,
        params: { documentId: document.id, categoryData },
      })
    }

    const isExpiringWithinTimeFrame = dayjs(document.expiresAt).isBefore(
      dayjs().add(
        expirationWarningTimeFrame.duration,
        toExpirationWarningTimeFrameUnitsString(
          expirationWarningTimeFrame.units,
        ),
      ),
    )

    return (
      <Pressable
        onPress={handleOnPressDocument}
        style={style.documentContainer}
        key={`${document.name}-${index}`}
        accessible
        accessibilityRole="button"
        accessibilityLabel={`Image preview of ${document.name}. Tap to view and edit.`}
      >
        <Image
          style={style.image}
          source={{ uri: document.attachment.previewUrl }}
        />
        <Text style={style.nameText} ellipsizeMode="tail" numberOfLines={1}>
          {document.name}
        </Text>
        {isExpiringWithinTimeFrame && (
          <View style={style.expiringSoon}>
            <SvgXml
              xml={Icons.AlertCircle}
              stroke={Colors.primary.brand}
              strokeWidth={Sizing.iconStroke.x20}
              width={Sizing.icons.x15}
              height={Sizing.icons.x15}
            />
            <Text style={style.expiringSoonText}>Expiring soon</Text>
          </View>
        )}
      </Pressable>
    )
  }

  return (
    <View>
      <View style={style.documents}>{documents.map(toDocument)}</View>
      <Pressable
        style={Buttons.applyOpacity(style.addDocumentsButton)}
        accessibilityRole="button"
        onPress={handleOnPressAdd}
      >
        <Text style={style.addDocumentsButtonText}>Scan or add a document</Text>
      </Pressable>
    </View>
  )
}

const outerPaddingOneSide = Sizing.x20
const totalOuterPadding = 2 * outerPaddingOneSide
const imagesPerRow = 2
const imageSize =
  (Sizing.screen.width - totalOuterPadding - outerPaddingOneSide) / imagesPerRow

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: Sizing.x40,
    backgroundColor: Colors.neutral.s100,
  },
  contentContainer: {
    padding: Sizing.x20,
    flexGrow: 1,
    backgroundColor: Colors.neutral.s100,
  },
  emptyStateContainer: {
    ...Elements.container.base,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyStateIcon: {
    marginBottom: Sizing.x20,
  },
  noDocumentsText: {
    ...Typography.body.x30,
    marginBottom: Sizing.x20,
  },
  addDocumentsButton: {
    ...Buttons.pill.primary,
  },
  emptyListAddDocumentsButton: {
    ...Buttons.pill.primary,
    width: "100%",
  },
  addDocumentsButtonText: {
    ...Buttons.pillText.primary,
  },
  documents: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  documentContainer: {
    marginBottom: Sizing.x20,
    width: imageSize,
  },
  image: {
    backgroundColor: Colors.neutral.white,
    width: imageSize,
    height: imageSize,
    marginBottom: Sizing.x10,
    resizeMode: "contain",
    borderRadius: Outlines.borderRadius.small,
  },
  nameText: {
    ...Typography.body.x20,
    marginBottom: Sizing.x10,
  },
  expiringSoon: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  expiringSoonText: {
    ...Typography.body.x20,
    color: Colors.primary.brand,
    marginLeft: Sizing.x5,
  },
})

export default DocumentUploads
