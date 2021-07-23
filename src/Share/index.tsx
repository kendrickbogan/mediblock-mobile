import React, { FC, useState } from "react"
import { Text, View, ScrollView, StyleSheet, Pressable } from "react-native"
import { gql } from "@apollo/client"
import { SvgXml } from "react-native-svg"
import { useNavigation } from "@react-navigation/native"

import { categories as allCategories, CategoryType } from "../category"
import {
  GetAllDocumentsDocuments as Document,
  DocumentCategoryEnum,
  useGetAllDocumentsQuery,
} from "../generated/graphql"
import FullScreenLoadingIndicator from "../FullScreenLoadingIndicator"
import { useShareContext } from "./ShareContext"
import { ShareRoutes } from "../navigation/routes"

import {
  Sizing,
  Colors,
  Elements,
  Typography,
  Buttons,
  Outlines,
} from "../styles"
import { Icons } from "../assets"

export const GET_ALL_DOCUMENTS = gql`
  query GetAllDocuments {
    personalDetails {
      id
      documents {
        id
        name
        category
        attachment {
          id
          previewUrl
        }
      }
    }
  }
`
const { accessibilityMultiplier } = Typography

type GroupedDocuments = {
  category: DocumentCategoryEnum
  documents: Document[]
}

const groupDocumentsByCategory = (
  documents: Document[],
): GroupedDocuments[] => {
  return Object.values(DocumentCategoryEnum).reduce(
    (acc: GroupedDocuments[], category: DocumentCategoryEnum) => {
      const documentsMatchingCategory = documents.filter(document => {
        return document.category === category
      })

      return [
        ...acc,
        {
          category,
          documents: documentsMatchingCategory,
        },
      ]
    },
    [],
  )
}

const Share: FC = () => {
  const navigation = useNavigation()
  const {
    selectedDocuments,
    setSelectedDocuments,
    selectedCategories,
    setSelectedCategories,
  } = useShareContext()
  const { data, error, loading } = useGetAllDocumentsQuery({
    errorPolicy: "all",
  })

  if (error) {
    return <Text>{error.message}</Text>
  }

  if (data || loading) {
    const handleOnPressAddRecipients = (): void => {
      navigation.navigate(ShareRoutes.AddRecipients)
    }

    const handleOnPressClearSelection = (): void => {
      setSelectedDocuments([])
      setSelectedCategories([])
    }

    const documentsGroupedByCategory = data?.personalDetails?.documents
      ? groupDocumentsByCategory(data?.personalDetails.documents)
      : []

    const isFormValid =
      selectedDocuments.length > 0 || selectedCategories.length > 0

    const nextStepButtonStyle = {
      ...style.nextStepButton,
      ...(!isFormValid && style.nextStepButtonDisabled),
    }

    const showClearSelectionButton =
      selectedDocuments.length > 0 || selectedCategories.length > 0

    return (
      <View style={style.outerContainer}>
        {showClearSelectionButton && (
          <Pressable
            onPress={handleOnPressClearSelection}
            style={Buttons.applyOpacity(style.clearSelectionButton)}
            accessibilityRole="button"
          >
            <SvgXml
              xml={Icons.XCircle}
              width={Sizing.icons.x20}
              height={Sizing.icons.x20}
              stroke={Colors.secondary.brand}
              strokeWidth={Sizing.iconStroke.x15}
            />
            <Text style={style.clearSelectionButtonText}>Clear selection</Text>
          </Pressable>
        )}
        <ScrollView
          style={style.container}
          contentContainerStyle={style.contentContainer}
          alwaysBounceVertical={false}
        >
          <>
            {allCategories.map((category, index) => {
              const documentsInCategory = documentsGroupedByCategory.find(
                el => el.category === category.id,
              )?.documents

              return (
                <Category
                  key={category.id + index}
                  category={category}
                  documents={documentsInCategory || []}
                />
              )
            })}
          </>
        </ScrollView>

        {loading && <FullScreenLoadingIndicator />}

        <View style={style.footerContainer}>
          <Pressable
            onPress={handleOnPressAddRecipients}
            style={Buttons.applyOpacity(nextStepButtonStyle)}
            accessibilityRole="button"
            accessibilityState={{ disabled: !isFormValid }}
            disabled={!isFormValid}
          >
            <Text
              style={style.nextStepButtonText}
              maxFontSizeMultiplier={accessibilityMultiplier.x50}
            >
              Add recipients
            </Text>
            <SvgXml
              xml={Icons.ArrowRight}
              width={Sizing.icons.x20}
              height={Sizing.icons.x20}
              stroke={Colors.neutral.white}
              strokeWidth={Sizing.iconStroke.x20}
            />
          </Pressable>
        </View>
      </View>
    )
  }

  return null
}

interface CategoryProps {
  category: CategoryType
  documents: Document[]
}

const Category: FC<CategoryProps> = ({ category, documents }) => {
  const { setSelectedCategories, selectedCategories } = useShareContext()
  const [areFormsVisible, setAreFormsVisible] = useState(false)

  const isCategoryIdInList = selectedCategories
    .map(({ id }) => id)
    .includes(category.id)

  const handleOnPressCategory = (): void => {
    const nextCategories = isCategoryIdInList
      ? selectedCategories.filter(({ id }) => id !== category.id)
      : [...selectedCategories, { id: category.id, label: category.label }]

    setSelectedCategories(nextCategories)
  }

  const handleOnPressToggleForms = (): void => {
    setAreFormsVisible(!areFormsVisible)
  }

  const selectIndicatorFill = isCategoryIdInList
    ? Colors.secondary.brand
    : Colors.neutral.white

  const selectAllFormsButtonStyle = {
    ...style.selectFormsOrDocumentButton,
    backgroundColor: isCategoryIdInList
      ? Colors.primary.s200
      : Colors.neutral.white,
  }

  const formsText = category.profileSections.length === 1 ? "form" : "forms"

  const showOrHideText = areFormsVisible ? "Hide" : "Show"
  const showOrHideButtonText = `${showOrHideText} ${category.profileSections.length} included ${formsText}…`

  return (
    <View style={style.categoryContainer}>
      <Text style={style.categoryLabelText}>{category.label}</Text>
      <View style={style.buttonAndDetailsContainer}>
        <Pressable
          onPress={handleOnPressCategory}
          style={Buttons.applyOpacity({
            ...selectAllFormsButtonStyle,
            ...style.selectFormsOrDocumentButton,
          })}
          accessibilityRole="button"
          accessibilityLabel={`${category.label} forms. Tap to select for sharing`}
        >
          <Text style={style.selectableItemText}>{category.label} Forms</Text>
          <SvgXml
            xml={Icons.Circle}
            width={Sizing.icons.x15}
            height={Sizing.icons.x15}
            fill={selectIndicatorFill}
            stroke={Colors.secondary.brand}
            strokeWidth={Sizing.iconStroke.x20}
          />
        </Pressable>
        <View style={style.formsDetailsContainer}>
          <Pressable
            onPress={handleOnPressToggleForms}
            style={Buttons.applyOpacity()}
            accessibilityRole="button"
          >
            <Text style={style.showFormsButtonText}>
              {showOrHideButtonText}
            </Text>
          </Pressable>
        </View>

        {areFormsVisible && (
          <View style={style.formsList}>
            {category.profileSections.map(profileSection => {
              return (
                <View key={profileSection.id}>
                  <Text style={style.formLabelText}>
                    {profileSection.label}
                  </Text>
                </View>
              )
            })}
          </View>
        )}
      </View>

      {documents.map((document, index) => {
        return (
          <SelectableDocument
            document={document}
            key={document.id}
            index={index}
          />
        )
      })}
    </View>
  )
}

interface SelectableDocumentProps {
  document: Document
  index: number
}

const SelectableDocument: FC<SelectableDocumentProps> = ({ document }) => {
  const { setSelectedDocuments, selectedDocuments } = useShareContext()

  const isDocumentIdInList = selectedDocuments
    .map(({ id }) => id)
    .includes(document.id)

  const handleOnPressDocument = (): void => {
    const nextDocumentIds = isDocumentIdInList
      ? selectedDocuments.filter(({ id }) => id !== document.id)
      : [...selectedDocuments, { id: document.id, name: document.name }]

    setSelectedDocuments(nextDocumentIds)
  }

  const selectIndicatorFill = isDocumentIdInList
    ? Colors.secondary.brand
    : Colors.neutral.white

  const selectDocumentButtonStyle = {
    ...style.selectFormsOrDocumentButton,
    backgroundColor: isDocumentIdInList
      ? Colors.primary.s200
      : Colors.neutral.white,
  }

  return (
    <Pressable
      onPress={handleOnPressDocument}
      style={Buttons.applyOpacity({
        ...style.selectableItem,
        ...selectDocumentButtonStyle,
      })}
      accessibilityRole="button"
      accessibilityLabel={`${document.name} Tap to select for sharing`}
    >
      <SvgXml
        xml={Icons.File}
        width={Sizing.icons.x10}
        height={Sizing.icons.x10}
        stroke={Colors.neutral.s800}
        strokeWidth={Sizing.iconStroke.x25}
        style={style.fileIcon}
      />
      <Text style={style.selectableItemText}>{document.name}</Text>
      <SvgXml
        xml={Icons.Circle}
        width={Sizing.icons.x15}
        height={Sizing.icons.x15}
        fill={selectIndicatorFill}
        stroke={Colors.secondary.brand}
        strokeWidth={Sizing.iconStroke.x20}
      />
    </Pressable>
  )
}

const style = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    ...Elements.container.base,
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: Sizing.x20,
    backgroundColor: Colors.neutral.s100,
  },
  categoryContainer: {
    marginBottom: Sizing.x30,
  },
  categoryLabelText: {
    ...Typography.header.x30,
    marginBottom: Sizing.x10,
    paddingHorizontal: Sizing.x20,
  },
  showFormsButtonText: {
    ...Typography.body.x10,
    color: Colors.secondary.brand,
  },
  formLabelText: {
    ...Typography.body.x20,
    marginBottom: Sizing.x5,
    paddingHorizontal: Sizing.x20,
    color: Colors.neutral.s500,
  },
  buttonAndDetailsContainer: {
    backgroundColor: Colors.neutral.white,
    borderRadius: Outlines.borderRadius.base,
    marginHorizontal: Sizing.x10,
  },
  formsDetailsContainer: {
    alignItems: "baseline",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Sizing.x20,
    paddingBottom: Sizing.x10,
  },
  selectFormsOrDocumentButton: {
    backgroundColor: Colors.neutral.white,
    borderRadius: Outlines.borderRadius.base,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Sizing.x20,
    paddingVertical: Sizing.x15,
  },
  formsList: {
    marginBottom: Sizing.x10,
  },
  fileIcon: {
    marginRight: Sizing.x5,
  },
  selectableItem: {
    backgroundColor: Colors.neutral.white,
    borderRadius: Outlines.borderRadius.base,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Sizing.x20,
    paddingVertical: Sizing.x15,
    marginHorizontal: Sizing.x10,
    marginTop: Sizing.x5,
  },
  selectableItemText: {
    ...Typography.body.x30,
    ...Typography.lineHeight.none,
    color: Colors.neutral.s800,
    paddingRight: Sizing.x30,
    flex: 1,
  },
  footerContainer: {
    backgroundColor: Colors.neutral.white,
    borderTopWidth: Outlines.borderWidth.hairline,
    borderColor: Colors.neutral.s200,
    paddingVertical: Sizing.x15,
    paddingHorizontal: Sizing.x20,
  },
  nextStepButton: {
    ...Buttons.pill.primary,
    flexDirection: "row",
  },
  nextStepButtonDisabled: {
    backgroundColor: Colors.neutral.s300,
    borderColor: Colors.neutral.s300,
  },
  nextStepButtonText: {
    ...Buttons.pillText.primary,
    marginRight: Sizing.x10,
  },
  clearSelectionButton: {
    backgroundColor: Colors.neutral.white,
    borderBottomWidth: Outlines.borderWidth.hairline,
    borderColor: Colors.neutral.s200,
    padding: Sizing.x7,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  clearSelectionButtonText: {
    ...Typography.body.x20,
    marginLeft: Sizing.x7,
    color: Colors.secondary.brand,
  },
})

export default Share
