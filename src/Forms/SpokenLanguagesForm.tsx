import React, { FC, ReactNode } from "react"
import { View, Button } from "react-native"
import { gql } from "@apollo/client"
import {
  Formik,
  FormikProps,
  FieldArray,
  FieldArrayRenderProps,
  FormikErrors,
} from "formik"
import * as yup from "yup"

import {
  GetSpokenLanguagesQuery,
  UpdateSpokenLanguagesMutation,
  MutationUpdateSpokenLanguagesArgs,
  LanguageProficiencyEnum,
} from "../generated/graphql"
import {
  TextField,
  GraphQLFormHandler,
  Dropdown,
  FormNavigationHandler,
} from "./formHelpers"

import { Colors } from "../styles"

const GET_SPOKEN_LANGUAGES = gql`
  query GetSpokenLanguages {
    personalDetails {
      id
      spokenLanguages {
        language
        readingProficiency
        writingProficiency
        speakingProficiency
      }
    }
  }
`

const UPDATE_SPOKEN_LANGUAGES = gql`
  mutation UpdateSpokenLanguages($input: UpdateSpokenLanguagesMutationInput!) {
    updateSpokenLanguages(input: $input) {
      spokenLanguages {
        language
      }
    }
  }
`

const proficiencyOptions = [
  { value: LanguageProficiencyEnum.None, label: "0 - None" },
  { value: LanguageProficiencyEnum.Elementary, label: " 1 - Elementary" },
  {
    value: LanguageProficiencyEnum.Limited,
    label: "2 - Limited Working Proficiency",
  },
  {
    value: LanguageProficiencyEnum.Working,
    label: "3 - Professional Proficiency",
  },
  {
    value: LanguageProficiencyEnum.Professional,
    label: "4 - Full Professional Fluency",
  },
  { value: LanguageProficiencyEnum.Native, label: "5 - Native Fluency" },
]

interface LanguageDetails {
  language: string
  readingProficiency: LanguageProficiencyEnum
  speakingProficiency: LanguageProficiencyEnum
  writingProficiency: LanguageProficiencyEnum
}

const emptyFormSet: LanguageDetails = {
  language: "",
  readingProficiency: LanguageProficiencyEnum.None,
  writingProficiency: LanguageProficiencyEnum.None,
  speakingProficiency: LanguageProficiencyEnum.None,
}

interface FormValues {
  spokenLanguages: LanguageDetails[]
}

const buildInitialFormValues = ({
  personalDetails,
}: GetSpokenLanguagesQuery): FormValues => {
  if (personalDetails?.spokenLanguages.length == 0) {
    return { spokenLanguages: [emptyFormSet] }
  } else {
    const spokenLanguageFormValues =
      personalDetails?.spokenLanguages.map(
        ({
          language,
          readingProficiency,
          writingProficiency,
          speakingProficiency,
        }) => {
          return {
            language,
            readingProficiency,
            writingProficiency,
            speakingProficiency,
          }
        },
      ) || []

    return { spokenLanguages: spokenLanguageFormValues }
  }
}

const validationSchema = yup.object().shape({
  spokenLanguages: yup.array().of(
    yup.object().shape({
      language: yup.string().required("Please provide a language"),
      readingProficiency: yup
        .mixed()
        .oneOf(Object.values(LanguageProficiencyEnum)),
      writingProficiency: yup
        .mixed()
        .oneOf(Object.values(LanguageProficiencyEnum)),
      speakingProficiency: yup
        .mixed()
        .oneOf(Object.values(LanguageProficiencyEnum)),
    }),
  ),
})

interface SpokenLanguageFieldProps {
  formikProps: FormikProps<FormValues>
  fieldArrayProps: FieldArrayRenderProps
}

const SpokenLanguageFields: FC<SpokenLanguageFieldProps> = ({
  formikProps: {
    values: { spokenLanguages },
    handleChange,
    setFieldValue,
    errors,
  },
  fieldArrayProps: { push, remove },
}) => {
  return (
    <>
      {spokenLanguages.map((_spokenLanguage, index) => {
        const errorsForFieldSet: FormikErrors<LanguageDetails> =
          errors.spokenLanguages && errors.spokenLanguages[index]
            ? (errors.spokenLanguages[index] as FormikErrors<LanguageDetails>)
            : {}

        return (
          <View key={index}>
            <TextField
              label="Language"
              value={spokenLanguages[index].language}
              updateValue={handleChange(`spokenLanguages[${index}].language`)}
              errors={errorsForFieldSet.language}
            />
            <Dropdown<LanguageProficiencyEnum>
              options={proficiencyOptions}
              label="Speaking Proficiency"
              value={spokenLanguages[index].speakingProficiency}
              onValueChange={(value: LanguageProficiencyEnum): void => {
                setFieldValue(
                  `spokenLanguages[${index}].speakingProficiency`,
                  value,
                )
              }}
              errors={errorsForFieldSet.speakingProficiency}
            />
            <Dropdown<LanguageProficiencyEnum>
              options={proficiencyOptions}
              label="Reading Proficiency"
              value={spokenLanguages[index].readingProficiency}
              onValueChange={(value: LanguageProficiencyEnum): void => {
                setFieldValue(
                  `spokenLanguages[${index}].readingProficiency`,
                  value,
                )
              }}
              errors={errorsForFieldSet.readingProficiency}
            />
            <Dropdown<LanguageProficiencyEnum>
              options={proficiencyOptions}
              label="Writing Proficiency"
              value={spokenLanguages[index].writingProficiency}
              onValueChange={(value: LanguageProficiencyEnum): void => {
                setFieldValue(
                  `spokenLanguages[${index}].writingProficiency`,
                  value,
                )
              }}
              errors={errorsForFieldSet.writingProficiency}
            />
            <Button
              title="Remove"
              color={Colors.danger.s400}
              onPress={(): void => {
                remove(index)
              }}
            />
          </View>
        )
      })}
      <Button
        title="Add another"
        onPress={(): void => {
          push(emptyFormSet)
        }}
      />
    </>
  )
}

interface FormProps {
  formikProps: FormikProps<FormValues>
}

const Form: FC<FormProps> = ({ formikProps }) => {
  return (
    <FieldArray
      name="spokenLanguages"
      render={(fieldArrayProps): ReactNode => {
        return (
          <SpokenLanguageFields
            formikProps={formikProps}
            fieldArrayProps={fieldArrayProps}
          />
        )
      }}
    />
  )
}

const SpokenLanguagesForm: FC = () => {
  return (
    <GraphQLFormHandler<
      GetSpokenLanguagesQuery,
      UpdateSpokenLanguagesMutation,
      MutationUpdateSpokenLanguagesArgs
    >
      queryDocument={GET_SPOKEN_LANGUAGES}
      mutationDocument={UPDATE_SPOKEN_LANGUAGES}
    >
      {(queryData, mutationData, mutationInFlight, mutation): JSX.Element => {
        const initialFormState = buildInitialFormValues(queryData)

        return (
          <Formik
            validateOnBlur={false}
            validateOnMount={false}
            initialValues={initialFormState}
            validationSchema={validationSchema}
            onSubmit={(values: FormValues): void => {
              mutation({
                variables: {
                  input: { spokenLanguagesAttributes: values.spokenLanguages },
                },
              })
            }}
          >
            {(formikProps): ReactNode => {
              return (
                <FormNavigationHandler<FormValues>
                  formikProps={formikProps}
                  submissionInFlight={mutationInFlight}
                  initialFormState={initialFormState}
                  successfulMutation={
                    !!mutationData?.updateSpokenLanguages?.spokenLanguages
                  }
                >
                  <Form formikProps={formikProps} />
                </FormNavigationHandler>
              )
            }}
          </Formik>
        )
      }}
    </GraphQLFormHandler>
  )
}

export default SpokenLanguagesForm
