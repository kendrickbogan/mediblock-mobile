import React, { FC, useState, useLayoutEffect } from "react"
import { Text, StyleSheet, Pressable, View } from "react-native"
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native"
import { SvgXml } from "react-native-svg"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import StaticSafeAreaInsets from "react-native-static-safe-area-insets"
import { gql } from "@apollo/client"
import { MimeType } from "react-native-document-picker"

import { applyCloseButton } from "../navigation/applyCloseButton"
import {
  useCreateDocumentMutation,
  DocumentKindEnum,
} from "../generated/graphql"
import {
  DatePickerField,
  SwitchField,
  TextField,
  Dropdown,
} from "../Forms/formHelpers"
import FileHelpers from "./fileHelpers"
import { GET_DOCUMENTS } from "./DocumentUploads"
import { AddDocumentForUploadStackParams } from "../navigation/AddDocumentForUploadStack"
import { GET_ALL_DOCUMENTS } from "../Share"
import { useStatusBarEffect } from "../navigation/useStatusBarEffect"
import FilePreview from "./FilePreview"
import { GET_MENU_DATA_BY_CATEGORY } from "./index"
import { documentKindOptions } from "./documentKindOptions"
import HeaderLoadingIndicator from "../HeaderLoadingIndicator"
import FullScreenLoadingIndicator from "../FullScreenLoadingIndicator"

import {
  Elements,
  Colors,
  Sizing,
  Buttons,
  Forms,
  Outlines,
  Typography,
} from "../styles"
import { Icons } from "../assets"
import { GET_CATEGORY_MENU_DATA } from "./Category"

export type File = Set | NotSet
export type FileData = {
  base64Data: string
  mimeType: MimeType
  name: string
  uri?: string
}
type NotSet = {
  kind: "NotSet"
}
type Set = {
  kind: "Set"
  data: FileData
}

type AddDocumentUploadRouteProp = RouteProp<
  AddDocumentForUploadStackParams,
  "AddDocumentUpload"
>

gql`
  mutation CreateDocument($input: CreateDocumentMutationInput!) {
    createDocument(input: $input) {
      document {
        id
      }
    }
  }
`

const AddDocumentUpload: FC = () => {
  useStatusBarEffect("light", Colors.primary.brand)
  const navigation = useNavigation()
  const {
    params: {
      categoryData: { id: category, profileSections },
      profileSection,
    },
  } = useRoute<AddDocumentUploadRouteProp>()

  const [file, setFile] = useState<File>({ kind: "NotSet" as const })
  const [hasExpiration, setHasExpiration] = useState(false)
  const [expiresAt, setExpiresAt] = useState(new Date())
  const [name, setName] = useState("")
  const [kind, setKind] = useState<DocumentKindEnum | undefined>(undefined)
  const [otherKind, setOtherKind] = useState("")

  const isLoadingFileStateTuple = useState(false)

  const [
    createDocumentMutation,
    { loading: mutationSubmitting },
  ] = useCreateDocumentMutation({ errorPolicy: "all" })

  useLayoutEffect(() => {
    const SaveButton: FC = () => {
      if (file.kind !== "Set") {
        return null
      }

      const handleOnPressSave = async (): Promise<void> => {
        if (kind) {
          const result = await createDocumentMutation({
            variables: {
              input: {
                name,
                category,
                attachment: { data: file.data.base64Data },
                expiresAt: hasExpiration ? expiresAt : null,
                kind,
                otherKind:
                  kind === DocumentKindEnum.Other ? otherKind : undefined,
                profileSection,
              },
            },
            refetchQueries: [
              { query: GET_DOCUMENTS, variables: { category, profileSection } },
              { query: GET_ALL_DOCUMENTS },
              {
                query: GET_CATEGORY_MENU_DATA,
                variables: {
                  profileSections: profileSections.map(
                    profileSection => profileSection.id,
                  ),
                },
              },
              { query: GET_MENU_DATA_BY_CATEGORY },
            ],
          })

          if (result.data?.createDocument?.document?.id) {
            navigation.goBack()
          }
        }
      }

      const saveDisabled =
        mutationSubmitting ||
        !name ||
        !kind ||
        (kind === DocumentKindEnum.Other && !otherKind)

      const headerButtonTextStyle = {
        ...style.headerButtonText,
        ...(saveDisabled && style.headerButtonTextDisabled),
      }

      if (mutationSubmitting) {
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
    })
  }, [
    category,
    createDocumentMutation,
    expiresAt,
    file,
    hasExpiration,
    kind,
    mutationSubmitting,
    name,
    navigation,
    otherKind,
    profileSection,
    profileSections,
  ])

  const [isLoadingFile] = isLoadingFileStateTuple

  return (
    <View style={style.container}>
      <KeyboardAwareScrollView
        style={style.container}
        contentContainerStyle={style.contentContainer}
        alwaysBounceVertical={false}
        extraScrollHeight={-StaticSafeAreaInsets.safeAreaInsetsBottom}
        keyboardShouldPersistTaps="handled"
      >
        <FormOrDocumentSelector
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
          file={file}
          setFile={setFile}
          mutationSubmitting={mutationSubmitting}
          isLoadingFileStateTuple={isLoadingFileStateTuple}
        />
      </KeyboardAwareScrollView>
      {isLoadingFile && <FullScreenLoadingIndicator />}
    </View>
  )
}

type FormOrDocumentSelectorProps = {
  name: string
  setName: (name: string) => void
  hasExpiration: boolean
  setHasExpiration: (hasExpiration: boolean) => void
  expiresAt: Date
  setExpiresAt: (expiresAt: Date) => void
  kind: DocumentKindEnum | undefined
  setKind: (kind: DocumentKindEnum) => void
  otherKind: string
  setOtherKind: (otherKind: string) => void
  file: File
  setFile: (file: File) => void
  mutationSubmitting: boolean
  isLoadingFileStateTuple: [boolean, (isLoadingFile: boolean) => void]
}

const FormOrDocumentSelector: FC<FormOrDocumentSelectorProps> = ({
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
  file,
  setFile,
  mutationSubmitting,
  isLoadingFileStateTuple,
}) => {
  if (file.kind === "Set") {
    return (
      <Form
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
        fileData={file.data}
        setFile={setFile}
        mutationSubmitting={mutationSubmitting}
      />
    )
  } else {
    return (
      <DocumentSelector
        setName={setName}
        setFile={setFile}
        isLoadingFileStateTuple={isLoadingFileStateTuple}
      />
    )
  }
}

interface FormProps {
  name: string
  setName: (name: string) => void
  hasExpiration: boolean
  setHasExpiration: (hasExpiration: boolean) => void
  expiresAt: Date
  setExpiresAt: (expiresAt: Date) => void
  kind: DocumentKindEnum | undefined
  setKind: (kind: DocumentKindEnum) => void
  otherKind: string
  setOtherKind: (otherKind: string) => void
  fileData: FileData
  setFile: (file: File) => void
  mutationSubmitting: boolean
}

const Form: FC<FormProps> = ({
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
  fileData,
  setFile,
  mutationSubmitting,
}) => {
  const handleOnPressReplace = (): void => {
    setFile({ kind: "NotSet" })
  }

  const nameInputError = !name ? "Document name is required" : undefined
  const otherKindInputError =
    kind === DocumentKindEnum.Other && !otherKind
      ? "Other document kind is required"
      : undefined
  const kindInputError = !kind ? "Choose a document kind" : undefined

  return (
    <View>
      <FilePreview
        attachmentData={{
          url: fileData.base64Data,
          previewUrl: fileData.base64Data,
          contentType: fileData.mimeType,
        }}
      />
      <Pressable
        style={Buttons.applyOpacity(style.replaceButton)}
        accessibilityRole="button"
        onPress={handleOnPressReplace}
        disabled={mutationSubmitting}
      >
        <SvgXml
          xml={Icons.ReplaceArrows}
          width={Sizing.icons.x20}
          height={Sizing.icons.x20}
          stroke={Colors.danger.s400}
          strokeWidth={Sizing.iconStroke.x20}
        />
        <Text style={style.replaceButtonText}>Replace</Text>
      </Pressable>
      <TextField
        label="Document name"
        value={name}
        updateValue={setName}
        style={style.textInput}
        errors={nameInputError}
        returnKeyType="done"
      />
      <Dropdown<DocumentKindEnum>
        label="Kind"
        onValueChange={setKind}
        options={documentKindOptions}
        value={kind}
        errors={kindInputError}
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
        />
      )}
    </View>
  )
}

interface DocumentSelectorProps {
  setName: (data: string) => void
  setFile: (file: File) => void
  isLoadingFileStateTuple: [boolean, (isLoadingFile: boolean) => void]
}

const DocumentSelector: FC<DocumentSelectorProps> = ({
  setName,
  setFile,
  isLoadingFileStateTuple,
}) => {
  const [, setIsLoadingFile] = isLoadingFileStateTuple

  const handleOnPressSelectFromFiles = async (): Promise<void> => {
    setIsLoadingFile(true)
    const fileData = await FileHelpers.getFileFromDevice()

    if (fileData) {
      const { base64Data, mimeType, uri, name } = fileData

      setFile({
        kind: "Set",
        data: { base64Data, mimeType, uri, name },
      })

      setName(fileData.name)
    }
    setIsLoadingFile(false)
  }

  const handleOnPressScan = async (): Promise<void> => {
    setIsLoadingFile(true)
    const scanResult = await FileHelpers.scanDocumentWithCamera()

    if (scanResult) {
      setFile({ kind: "Set", data: scanResult })
    }
    setIsLoadingFile(false)
  }

  return (
    <>
      <Pressable
        style={Buttons.applyOpacity({
          ...style.button,
          ...style.topButton,
        })}
        accessibilityRole="button"
        onPress={handleOnPressSelectFromFiles}
      >
        <SvgXml
          xml={Icons.FolderPlus}
          width={Sizing.icons.x50}
          height={Sizing.icons.x50}
          stroke={Colors.secondary.brand}
          strokeWidth={Sizing.iconStroke.x15}
          style={style.buttonIcon}
        />
        <Text style={style.buttonText}>Select from files</Text>
      </Pressable>
      <Pressable
        style={Buttons.applyOpacity(style.button)}
        accessibilityRole="button"
        onPress={handleOnPressScan}
      >
        <SvgXml
          xml={Icons.Camera}
          width={Sizing.icons.x50}
          height={Sizing.icons.x50}
          stroke={Colors.secondary.brand}
          strokeWidth={Sizing.iconStroke.x15}
          style={style.buttonIcon}
        />
        <Text style={style.buttonText}>Scan with camera</Text>
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
  button: {
    alignItems: "center",
    backgroundColor: Colors.neutral.white,
    borderRadius: Outlines.borderRadius.base,
    flex: 1,
    justifyContent: "center",
    padding: Sizing.x20,
  },
  topButton: {
    marginBottom: Sizing.x20,
  },
  buttonText: {
    ...Typography.subheader.x40,
    color: Colors.secondary.brand,
  },
  buttonIcon: {
    marginBottom: Sizing.x20,
  },
  replaceButton: {
    ...Buttons.pill.destructive,
    marginBottom: Sizing.x30,
    flexDirection: "row",
    width: "100%",
  },
  replaceButtonText: {
    ...Buttons.pillText.destructive,
    marginLeft: Sizing.x10,
  },
  textInput: {
    ...Forms.input.primary,
  },
})

export default AddDocumentUpload
