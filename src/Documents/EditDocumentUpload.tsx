import React, { FC, useState, useLayoutEffect } from "react"
import { Text, StyleSheet, Pressable, Alert } from "react-native"
import { gql, MutationFunction } from "@apollo/client"
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native"
import StaticSafeAreaInsets from "react-native-static-safe-area-insets"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { SvgXml } from "react-native-svg"

import { AddDocumentForUploadStackParams } from "../navigation/AddDocumentForUploadStack"
import {
  GetDocumentQuery,
  GetDocumentQueryVariables,
  MutationUpdateDocumentArgs,
  UpdateDocumentMutation,
  useDeleteDocumentMutation,
  DocumentKindEnum,
  DocumentCategoryEnum,
  Maybe,
  Scalars,
  ProfileSectionEnum,
} from "../generated/graphql"
import {
  GraphQLFormHandler,
  SwitchField,
  DatePickerField,
  TextField,
  Dropdown,
} from "../Forms/formHelpers"
import { applyCloseButton } from "../navigation/applyCloseButton"
import { GET_DOCUMENTS } from "./DocumentUploads"
import { GET_CATEGORY_MENU_DATA } from "./Category"
import { GET_MENU_DATA_BY_CATEGORY } from "."
import { dateOrToday } from "../dateTimeUtils"
import { useStatusBarEffect } from "../navigation/useStatusBarEffect"
import FilePreview from "./FilePreview"
import { documentKindOptions } from "./documentKindOptions"
import HeaderLoadingIndicator from "../HeaderLoadingIndicator"

import { Icons } from "../assets"
import { Elements, Sizing, Forms, Buttons, Colors, Typography } from "../styles"
import { ProfileSection } from "../category"

const GET_DOCUMENT = gql`
  query GetDocument($id: ID!) {
    personalDetails {
      id
      document(id: $id) {
        id
        name
        category
        expiresAt
        kind
        otherKind
        profileSection
        attachment {
          id
          previewUrl
          url
          contentType
        }
      }
    }
  }
`

const UPDATE_DOCUMENT = gql`
  mutation UpdateDocument($input: UpdateDocumentMutationInput!) {
    updateDocument(input: $input) {
      document {
        id
        attachment {
          id
        }
      }
    }
  }
`

gql`
  mutation DeleteDocument($input: DeleteDocumentMutationInput!) {
    deleteDocument(input: $input) {
      id
    }
  }
`

type Document = {
  id: string
  name: string
  category: DocumentCategoryEnum
  expiresAt?: Maybe<Scalars["ISO8601DateTime"]>
  kind: DocumentKindEnum
  otherKind?: string | null
  profileSection: ProfileSectionEnum
  attachment: {
    contentType: string
    previewUrl: string
    url: string
  }
}

type EditDocumentUploadRouteProp = RouteProp<
  AddDocumentForUploadStackParams,
  "EditDocumentUpload"
>

const EditDocumentUpload: FC = () => {
  useStatusBarEffect("light", Colors.primary.brand)
  const navigation = useNavigation()
  const {
    params: {
      documentId,
      categoryData: { profileSections },
    },
  } = useRoute<EditDocumentUploadRouteProp>()

  return (
    <GraphQLFormHandler<
      GetDocumentQuery,
      UpdateDocumentMutation,
      MutationUpdateDocumentArgs,
      GetDocumentQueryVariables
    >
      queryDocument={GET_DOCUMENT}
      mutationDocument={UPDATE_DOCUMENT}
      queryVariables={{ id: documentId }}
    >
      {(queryData, _mutationData, mutationInFlight, mutation): JSX.Element => {
        if (queryData.personalDetails?.document) {
          return (
            <EditDocumentForm
              document={queryData.personalDetails.document}
              mutationInFlight={mutationInFlight}
              mutation={mutation}
              profileSections={profileSections}
            />
          )
        } else {
          navigation.goBack()
          return <></>
        }
      }}
    </GraphQLFormHandler>
  )
}

type EditDocumentFormProps = {
  document: Document
  mutation: MutationFunction<UpdateDocumentMutation, MutationUpdateDocumentArgs>
  mutationInFlight: boolean
  profileSections: ProfileSection[]
}

const EditDocumentForm: FC<EditDocumentFormProps> = ({
  document,
  mutation,
  mutationInFlight,
  profileSections,
}) => {
  const navigation = useNavigation()

  const [name, setName] = useState(document.name || "")
  const [expiresAt, setExpiresAt] = useState(dateOrToday(document.expiresAt))
  const [hasExpiration, setHasExpiration] = useState(!!document.expiresAt)
  const [kind, setKind] = useState<DocumentKindEnum>(
    document.kind || DocumentKindEnum.BoardCertification,
  )
  const [otherKind, setOtherKind] = useState(document.otherKind || "")

  useLayoutEffect(() => {
    const SaveButton: FC = () => {
      const handleOnPressSave = async (): Promise<void> => {
        await mutation({
          variables: {
            input: {
              id: document.id,
              name,
              category: document.category,
              expiresAt: hasExpiration ? expiresAt : null,
              kind,
              profileSection: document.profileSection,
              otherKind:
                kind === DocumentKindEnum.Other ? otherKind : undefined,
            },
          },
          refetchQueries: [
            {
              query: GET_CATEGORY_MENU_DATA,
              variables: {
                profileSections: profileSections.map(
                  profileSection => profileSection.id,
                ),
              },
            },
            { query: GET_MENU_DATA_BY_CATEGORY },
            {
              query: GET_DOCUMENTS,
              variables: {
                category: document.category,
                profileSection: document.profileSection,
              },
            },
          ],
        })
      }

      const saveDisabled =
        mutationInFlight ||
        !name ||
        (kind === DocumentKindEnum.Other && !otherKind)

      const headerButtonTextStyle = {
        ...style.headerButtonText,
        ...(saveDisabled && style.headerButtonTextDisabled),
      }

      if (mutationInFlight) {
        return <HeaderLoadingIndicator />
      } else {
        return (
          <Pressable
            style={Buttons.applyOpacity(style.headerButton)}
            accessibilityRole="button"
            onPress={handleOnPressSave}
            disabled={saveDisabled}
          >
            <Text style={headerButtonTextStyle}>Save</Text>
          </Pressable>
        )
      }
    }

    navigation.setOptions({
      headerLeft: applyCloseButton(navigation.goBack),
      headerRight: SaveButton,
      title: document.name,
    })
  }, [
    document,
    expiresAt,
    hasExpiration,
    kind,
    mutation,
    mutationInFlight,
    name,
    navigation,
    otherKind,
    profileSections,
  ])

  return (
    <KeyboardAwareScrollView
      style={style.container}
      contentContainerStyle={style.contentContainer}
      alwaysBounceVertical={false}
      extraScrollHeight={-StaticSafeAreaInsets.safeAreaInsetsBottom}
      keyboardShouldPersistTaps="handled"
    >
      <Form
        document={document}
        name={name}
        setName={setName}
        hasExpiration={hasExpiration}
        setHasExpiration={setHasExpiration}
        expiresAt={expiresAt}
        setExpiresAt={setExpiresAt}
        kind={kind}
        setKind={setKind}
        otherKind={otherKind}
        setOtherKind={setOtherKind}
        mutationInFlight={mutationInFlight}
        profileSections={profileSections}
      />
    </KeyboardAwareScrollView>
  )
}

interface FormProps {
  document: Document
  name: string
  setName: (name: string) => void
  hasExpiration: boolean
  setHasExpiration: (hasExpiration: boolean) => void
  expiresAt: Date
  setExpiresAt: (expiresAt: Date) => void
  kind: DocumentKindEnum
  setKind: (kind: DocumentKindEnum) => void
  otherKind: string
  setOtherKind: (otherKind: string) => void
  mutationInFlight: boolean
  profileSections: ProfileSection[]
}

const Form: FC<FormProps> = ({
  document,
  name,
  setName,
  hasExpiration,
  setHasExpiration,
  expiresAt,
  setExpiresAt,
  kind,
  setKind,
  otherKind,
  setOtherKind,
  mutationInFlight,
  profileSections,
}) => {
  const navigation = useNavigation()
  const [
    deleteDocumentMutation,
    { loading: deleteMutationInFlight },
  ] = useDeleteDocumentMutation({
    variables: { input: { id: document.id } },
    refetchQueries: [
      { query: GET_CATEGORY_MENU_DATA, variables: { profileSections } },
      "GetMenuDataByCategory",
      "GetDocuments",
    ],
    errorPolicy: "all",
  })

  const handleOnPressDelete = (): void => {
    Alert.alert(
      "Are you sure you want to delete this document?",
      "This action is permanent and can't be reversed",
      [
        {
          text: "Delete",
          style: "destructive",
          onPress: deleteDocument,
        },
        {
          text: "Cancel",
          style: "default",
        },
      ],
    )
  }

  const deleteDocument = async (): Promise<void> => {
    const result = await deleteDocumentMutation()

    if (result.data?.deleteDocument?.id) {
      navigation.goBack()
    }
  }

  const deleteButtonDisabled = mutationInFlight || deleteMutationInFlight

  const nameInputError = !name ? "Document name is required" : undefined
  const otherKindInputError =
    kind === DocumentKindEnum.Other && !otherKind
      ? "Other document kind is required"
      : undefined

  return (
    <>
      <FilePreview attachmentData={document.attachment} />
      <TextField
        label="Document name"
        value={name}
        updateValue={setName}
        style={style.textInput}
        errors={nameInputError}
        returnKeyType="done"
      />
      <Dropdown
        label="Kind"
        onValueChange={setKind}
        options={documentKindOptions}
        value={kind}
      />
      {kind === DocumentKindEnum.Other && (
        <TextField
          label="Other Document Kind"
          value={otherKind}
          updateValue={setOtherKind}
          style={style.textInput}
          errors={otherKindInputError}
          returnKeyType="done"
        />
      )}
      <SwitchField
        label="Does this document expire?"
        value={hasExpiration}
        updateValue={setHasExpiration}
      />
      {hasExpiration && (
        <DatePickerField
          label="Expiration Date"
          value={expiresAt}
          updateValue={(_event: Event, value: Date | undefined): void => {
            setExpiresAt(value || new Date())
          }}
          isExpirationDate
        />
      )}
      <Pressable
        style={Buttons.applyOpacity(style.deleteButton)}
        accessibilityRole="button"
        onPress={handleOnPressDelete}
        disabled={deleteButtonDisabled}
      >
        <SvgXml
          xml={Icons.Trash}
          width={Sizing.icons.x20}
          height={Sizing.icons.x20}
          stroke={Colors.danger.s400}
          strokeWidth={Sizing.iconStroke.x20}
        />
        <Text style={style.deleteButtonText}>Delete</Text>
      </Pressable>
    </>
  )
}

const style = StyleSheet.create({
  container: {
    ...Elements.container.base,
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: Colors.neutral.s100,
    paddingTop: Sizing.x20,
    paddingHorizontal: Sizing.x20,
    paddingBottom: StaticSafeAreaInsets.safeAreaInsetsBottom + Sizing.x20,
  },
  headerButton: {
    paddingHorizontal: Sizing.x20,
  },
  headerButtonText: {
    ...Typography.subheader.x30,
    color: Colors.neutral.white,
  },
  headerButtonTextDisabled: {
    color: Colors.neutral.s200,
  },
  deleteButton: {
    ...Buttons.pill.destructive,
    marginVertical: Sizing.x30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  deleteButtonText: {
    ...Buttons.pillText.destructive,
    marginLeft: Sizing.x10,
  },
  textInput: {
    ...Forms.input.primary,
  },
})

export default EditDocumentUpload
