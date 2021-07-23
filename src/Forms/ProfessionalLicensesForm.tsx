import React, { FC, ReactNode } from "react"
import { View, Button, Text, StyleSheet } from "react-native"
import { gql } from "@apollo/client"
import {
  Formik,
  FormikProps,
  FieldArray,
  FieldArrayRenderProps,
  FormikErrors,
} from "formik"
import * as yup from "yup"

import { dateOrToday } from "../dateTimeUtils"

import {
  GetProfessionalLicensesQuery,
  UpdateProfessionalLicensesMutation,
  MutationUpdateProfessionalLicensesArgs,
  ProfessionalLicenseKind,
  ProfessionalLicenseInput,
} from "../generated/graphql"

import {
  DatePickerField,
  GraphQLFormHandler,
  FormNavigationHandler,
  TextField,
  AutocompleteField,
  SwitchField,
} from "./formHelpers"

import { Colors, Layout, Typography, Sizing } from "../styles"
import { SchemaLike } from "yup/lib/types"

const GET_PROFESSIONAL_LICENSES = gql`
  query GetProfessionalLicenses($kind: ProfessionalLicenseKind!) {
    personalDetails {
      id
      professionalLicenses(kind: $kind) {
        issuingState
        issuingAuthority
        number
        licenseVerificationUrl
        dateOfIssue
        expiresAt
        status
        unrestrictedLicense
        nonMedicalLicenseKind
      }
    }
    states
  }
`

const UPDATE_PROFESSIONAL_LICENSES = gql`
  mutation UpdateProfessionalLicenses(
    $input: UpdateProfessionalLicensesMutationInput!
  ) {
    updateProfessionalLicenses(input: $input) {
      professionalLicenses {
        status
      }
    }
  }
`

interface ProfessionalLicenseDetails {
  issuingState: string
  issuingAuthority: string
  number: string
  licenseVerificationUrl: string
  dateOfIssue: Date
  expiresAt: Date
  status: string
  unrestrictedLicense: boolean
  nonMedicalLicenseKind: string
  kind: ProfessionalLicenseKind
}

const emptyFormSet = (
  kind: ProfessionalLicenseKind,
): ProfessionalLicenseDetails => {
  return {
    issuingState: "",
    issuingAuthority: "",
    number: "",
    licenseVerificationUrl: "",
    dateOfIssue: new Date(),
    expiresAt: new Date(),
    status: "",
    unrestrictedLicense: false,
    nonMedicalLicenseKind: "",
    kind,
  }
}

type FormValues = {
  professionalLicenses: ProfessionalLicenseDetails[]
}

const buildInitialFormValues = (
  { personalDetails }: GetProfessionalLicensesQuery,
  kind: ProfessionalLicenseKind,
): FormValues => {
  if (personalDetails?.professionalLicenses.length == 0) {
    return { professionalLicenses: [emptyFormSet(kind)] }
  } else {
    const professionalLicensesFormValues =
      personalDetails?.professionalLicenses.map(
        ({
          issuingState,
          issuingAuthority,
          number,
          licenseVerificationUrl,
          dateOfIssue,
          expiresAt,
          status,
          unrestrictedLicense,
          nonMedicalLicenseKind,
        }) => {
          return {
            issuingState,
            issuingAuthority,
            number,
            licenseVerificationUrl,
            dateOfIssue: dateOrToday(dateOfIssue),
            expiresAt: dateOrToday(expiresAt),
            status,
            unrestrictedLicense,
            nonMedicalLicenseKind: nonMedicalLicenseKind || "",
            kind,
          }
        },
      ) || []

    return { professionalLicenses: professionalLicensesFormValues }
  }
}

const validationSchema = yup.object().shape({
  professionalLicenses: yup.array().of(
    yup.object().shape(
      {
        nonMedicalLicenseKind: yup.string().when("kind", {
          is: (value: ProfessionalLicenseKind) => {
            return (
              value === ProfessionalLicenseKind.Other ||
              value === ProfessionalLicenseKind.XrayFluoroscopy
            )
          },
          then: yup.string(),
        }),
        issuingState: yup.string(),
        issuingAuthority: yup.string(),
        number: yup.string(),
        dateOfIssue: yup.date().when(
          "expiresAt",
          (expiresAt: Date): SchemaLike => {
            return (
              expiresAt &&
              yup
                .date()
                .max(expiresAt, "Issuing date should be before the end date")
            )
          },
        ),
        expiresAt: yup.date().when(
          "dateOfIssue",
          (dateOfIssue: Date): SchemaLike => {
            return (
              dateOfIssue &&
              yup
                .date()
                .min(
                  dateOfIssue,
                  "Expiration date should be after the issuing date",
                )
            )
          },
        ),
        status: yup.string(),
        unrestrictedLicense: yup.boolean(),
      },
      [["dateOfIssue", "expiresAt"]],
    ),
  ),
})

const buildMutationVariables = ({
  issuingState,
  issuingAuthority,
  number,
  licenseVerificationUrl,
  dateOfIssue,
  expiresAt,
  status,
  unrestrictedLicense,
  nonMedicalLicenseKind,
  kind,
}: ProfessionalLicenseDetails): ProfessionalLicenseInput => {
  return {
    issuingState,
    issuingAuthority,
    number,
    licenseVerificationUrl,
    dateOfIssue,
    expiresAt,
    status,
    unrestrictedLicense,
    nonMedicalLicenseKind:
      kind !== ProfessionalLicenseKind.Medical ? nonMedicalLicenseKind : null,
  }
}

interface ProfessionalLicenseFieldsProps {
  formikProps: FormikProps<FormValues>
  fieldArrayProps: FieldArrayRenderProps
  statesList: string[]
  professionalLicenseKind: ProfessionalLicenseKind
}

const ProfessionalLicenseFields: FC<ProfessionalLicenseFieldsProps> = ({
  formikProps: {
    values: { professionalLicenses },
    handleChange,
    setFieldValue,
    errors,
  },
  statesList,
  fieldArrayProps: { push, remove },
  professionalLicenseKind,
}) => {
  return (
    <>
      {professionalLicenses.map((_, index) => {
        const errorsForFieldSet: FormikErrors<ProfessionalLicenseDetails> =
          errors.professionalLicenses && errors.professionalLicenses[index]
            ? (errors.professionalLicenses[
                index
              ] as FormikErrors<ProfessionalLicenseDetails>)
            : {}

        const toFieldName = (fieldName: string): string => {
          return `professionalLicenses[${index}].${fieldName}`
        }

        return (
          <View key={index} style={style.licenseContainer}>
            <Text style={style.licenseTitle}>License #{index + 1}</Text>
            {professionalLicenseKind !== ProfessionalLicenseKind.Medical && (
              <TextField
                label="License type"
                value={professionalLicenses[index].nonMedicalLicenseKind}
                updateValue={handleChange(toFieldName("nonMedicalLicenseKind"))}
                errors={errorsForFieldSet.nonMedicalLicenseKind}
              />
            )}
            <AutocompleteField
              label="Issuing state"
              errors={errorsForFieldSet.issuingState}
              value={professionalLicenses[index].issuingState}
              updateValue={handleChange(toFieldName("issuingState"))}
              suggestionsList={statesList}
              zIndex={Layout.zIndex.max + 1}
            />
            <TextField
              label="Issuing authority"
              value={professionalLicenses[index].issuingAuthority}
              updateValue={handleChange(toFieldName("issuingAuthority"))}
              errors={errorsForFieldSet.issuingAuthority}
            />
            <TextField
              label="License number"
              value={professionalLicenses[index].number}
              updateValue={handleChange(toFieldName("number"))}
              errors={errorsForFieldSet.number}
            />
            <TextField
              label="License verification website address"
              value={professionalLicenses[index].licenseVerificationUrl}
              updateValue={handleChange(toFieldName("licenseVerificationUrl"))}
              errors={errorsForFieldSet.licenseVerificationUrl}
            />
            <DatePickerField
              label="Date of issue"
              value={professionalLicenses[index].dateOfIssue}
              updateValue={(_event: Event, value: Date | undefined): void => {
                setFieldValue(toFieldName("dateOfIssue"), value)
              }}
              errors={errorsForFieldSet.dateOfIssue}
            />
            <DatePickerField
              label="Expiration date"
              value={professionalLicenses[index].expiresAt}
              updateValue={(_event: Event, value: Date | undefined): void => {
                setFieldValue(toFieldName("expiresAt"), value)
              }}
              errors={errorsForFieldSet.expiresAt}
              isExpirationDate
            />
            <TextField
              label="Status"
              value={professionalLicenses[index].status}
              updateValue={handleChange(toFieldName("status"))}
              errors={errorsForFieldSet.status}
            />
            <SwitchField
              label="Is your license unrestricted?"
              value={professionalLicenses[index].unrestrictedLicense}
              updateValue={(value: boolean): void => {
                setFieldValue(
                  `professionalLicenses[${index}].unrestrictedLicense`,
                  value,
                )
              }}
              errors={errorsForFieldSet.unrestrictedLicense}
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
          push(emptyFormSet(professionalLicenseKind))
        }}
      />
    </>
  )
}

interface FormProps {
  formikProps: FormikProps<FormValues>
  statesList: string[]
  professionalLicenseKind: ProfessionalLicenseKind
}

const Form: FC<FormProps> = ({
  formikProps,
  statesList,
  professionalLicenseKind,
}) => {
  return (
    <FieldArray
      name="professionalLicenses"
      render={(fieldArrayProps): ReactNode => {
        return (
          <ProfessionalLicenseFields
            professionalLicenseKind={professionalLicenseKind}
            formikProps={formikProps}
            fieldArrayProps={fieldArrayProps}
            statesList={statesList}
          />
        )
      }}
    />
  )
}

interface ProfessionalLicenseFormProps {
  professionalLicenseKind: ProfessionalLicenseKind
}

const ProfessionalLicensesForm: FC<ProfessionalLicenseFormProps> = ({
  professionalLicenseKind,
}) => {
  return (
    <GraphQLFormHandler<
      GetProfessionalLicensesQuery,
      UpdateProfessionalLicensesMutation,
      MutationUpdateProfessionalLicensesArgs
    >
      queryDocument={GET_PROFESSIONAL_LICENSES}
      mutationDocument={UPDATE_PROFESSIONAL_LICENSES}
      queryVariables={{ kind: professionalLicenseKind }}
    >
      {(queryData, mutationData, mutationInFlight, mutation): JSX.Element => {
        const initialFormState = buildInitialFormValues(
          queryData,
          professionalLicenseKind,
        )

        return (
          <Formik
            validateOnBlur={false}
            validateOnMount={false}
            initialValues={initialFormState}
            validationSchema={validationSchema}
            onSubmit={(values: FormValues): void => {
              mutation({
                variables: {
                  input: {
                    professionalLicensesAttributes: values.professionalLicenses.map(
                      buildMutationVariables,
                    ),
                    kind: professionalLicenseKind,
                  },
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
                    !!mutationData?.updateProfessionalLicenses
                      ?.professionalLicenses
                  }
                >
                  <Form
                    professionalLicenseKind={professionalLicenseKind}
                    formikProps={formikProps}
                    statesList={queryData.states}
                  />
                </FormNavigationHandler>
              )
            }}
          </Formik>
        )
      }}
    </GraphQLFormHandler>
  )
}

const style = StyleSheet.create({
  licenseContainer: {
    marginBottom: Sizing.x20,
  },
  licenseTitle: {
    ...Typography.subheader.x30,
    marginBottom: Sizing.x20,
  },
})

export default ProfessionalLicensesForm
