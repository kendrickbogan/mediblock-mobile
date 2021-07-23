import React, { FC, ReactNode } from "react"
import { View, Button, Text, StyleSheet } from "react-native"
import { gql, MutationFunction } from "@apollo/client"
import {
  Formik,
  FormikProps,
  FieldArray,
  FieldArrayRenderProps,
  FormikErrors,
} from "formik"
import * as yup from "yup"
import { SchemaLike } from "yup/lib/types"

import {
  GetOtherCertificationsQuery,
  OtherCertificationInput,
  UpdateOtherCertificationsMutation,
  MutationUpdateOtherCertificationsArgs,
} from "../generated/graphql"
import {
  GraphQLFormHandler,
  FormNavigationHandler,
  TextField,
  SwitchField,
  DatePickerField,
} from "./formHelpers"
import { dateOrToday } from "../dateTimeUtils"

import { Colors, Typography, Sizing } from "../styles"

const GET_OTHER_CERTIFICATIONS = gql`
  query GetOtherCertifications {
    personalDetails {
      id
      otherCertifications {
        name
        issuedAt
        expiresAt
      }
    }
  }
`

const UPDATE_OTHER_CERTIFICATIONS = gql`
  mutation UpdateOtherCertifications(
    $input: UpdateOtherCertificationsMutationInput!
  ) {
    updateOtherCertifications(input: $input) {
      otherCertifications {
        name
      }
    }
  }
`

interface CustomCertificationForm {
  name: string
  issuedAt: Date
  expiresAt: Date
  hasExpiration: boolean
}

const emptyFormSet: CustomCertificationForm = {
  name: "",
  issuedAt: new Date(),
  expiresAt: new Date(),
  hasExpiration: false,
}

type FormValues = {
  otherCertifications: CustomCertificationForm[]
}

const buildInitialFormValues = ({
  personalDetails,
}: GetOtherCertificationsQuery): FormValues => {
  if (personalDetails?.otherCertifications.length === 0 || !personalDetails) {
    return { otherCertifications: [emptyFormSet] }
  } else {
    const otherCertificationsFormValues = personalDetails?.otherCertifications.map(
      otherCertification => {
        return {
          name: otherCertification.name,
          issuedAt: dateOrToday(otherCertification.issuedAt),
          hasExpiration: !!otherCertification.expiresAt,
          expiresAt: dateOrToday(otherCertification.expiresAt),
        }
      },
    )

    return { otherCertifications: otherCertificationsFormValues }
  }
}

const toOtherCertificationsMutationInput = ({
  issuedAt,
  expiresAt,
  name,
  hasExpiration,
}: CustomCertificationForm): OtherCertificationInput => {
  return {
    otherName: name,
    issuedAt,
    expiresAt: hasExpiration ? expiresAt : null,
  }
}

const validationSchema = yup.object().shape({
  otherCertifications: yup.array().of(
    yup.object({
      issuedAt: yup.date(),
      expiresAt: yup.date().when("hasExpiration", {
        is: true,
        then: yup.date().when(
          "issuedAt",
          (issuedAt: Date): SchemaLike => {
            return (
              issuedAt &&
              yup
                .date()
                .min(issuedAt, "Expiration should be after the issue date")
            )
          },
        ),
      }),
    }),
  ),
})

interface OtherCertificationFieldsProps {
  formikProps: FormikProps<FormValues>
  fieldArrayProps: FieldArrayRenderProps
}

const OtherCertificationFields: FC<OtherCertificationFieldsProps> = ({
  formikProps: {
    values: { otherCertifications },
    handleChange,
    setFieldValue,
    errors,
  },
  fieldArrayProps: { push, remove },
}) => {
  return (
    <>
      {otherCertifications.map((_certification, index) => {
        const errorsForFieldSet: FormikErrors<CustomCertificationForm> =
          errors.otherCertifications && errors.otherCertifications[index]
            ? (errors.otherCertifications[
                index
              ] as FormikErrors<CustomCertificationForm>)
            : {}

        const toFieldName = (fieldName: string): string => {
          return `otherCertifications[${index}].${fieldName}`
        }

        return (
          <View key={index} style={style.certificationContainer}>
            <Text style={style.certificationTitle}>
              Other Certification #{index + 1}
            </Text>
            <TextField
              label="Certifcation Type"
              value={otherCertifications[index].name}
              updateValue={handleChange(toFieldName("name"))}
              errors={errorsForFieldSet.name}
            />
            <DatePickerField
              label="Issued At"
              value={otherCertifications[index].issuedAt}
              updateValue={(_event: Event, value: Date | undefined): void => {
                setFieldValue(toFieldName("issuedAt"), value)
              }}
              errors={errorsForFieldSet.issuedAt}
            />
            <SwitchField
              label="Does this certification expire?"
              value={otherCertifications[index].hasExpiration}
              updateValue={(value: boolean): void => {
                setFieldValue(toFieldName("hasExpiration"), value)
              }}
              errors={errorsForFieldSet.hasExpiration}
            />
            {otherCertifications[index].hasExpiration && (
              <DatePickerField
                label="Expiration date"
                value={otherCertifications[index].expiresAt}
                updateValue={(_event: Event, value: Date | undefined): void => {
                  setFieldValue(toFieldName("expiresAt"), value)
                }}
                errors={errorsForFieldSet.expiresAt}
                isExpirationDate
              />
            )}
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
      name="otherCertifications"
      render={(fieldArrayProps): ReactNode => {
        return (
          <OtherCertificationFields
            formikProps={formikProps}
            fieldArrayProps={fieldArrayProps}
          />
        )
      }}
    />
  )
}

interface FormikStateHandlerProps {
  queryData: GetOtherCertificationsQuery
  mutationData: UpdateOtherCertificationsMutation | null | undefined
  mutationInFlight: boolean
  mutation: MutationFunction<
    UpdateOtherCertificationsMutation,
    MutationUpdateOtherCertificationsArgs
  >
}

const FormikStateHandler: FC<FormikStateHandlerProps> = ({
  queryData,
  mutationData,
  mutationInFlight,
  mutation,
}) => {
  const initialFormState = buildInitialFormValues(queryData)

  return (
    <Formik
      validateOnBlur={false}
      validateOnMount={false}
      validationSchema={validationSchema}
      initialValues={initialFormState}
      onSubmit={(values: FormValues): void => {
        mutation({
          variables: {
            input: {
              certificationsAttributes: values.otherCertifications.map(
                toOtherCertificationsMutationInput,
              ),
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
              !!mutationData?.updateOtherCertifications?.otherCertifications
            }
          >
            <Form formikProps={formikProps} />
          </FormNavigationHandler>
        )
      }}
    </Formik>
  )
}

const CustomCertificationsForm: FC = () => {
  return (
    <GraphQLFormHandler<
      GetOtherCertificationsQuery,
      UpdateOtherCertificationsMutation,
      MutationUpdateOtherCertificationsArgs
    >
      queryDocument={GET_OTHER_CERTIFICATIONS}
      mutationDocument={UPDATE_OTHER_CERTIFICATIONS}
    >
      {(queryData, mutationData, mutationInFlight, mutation): JSX.Element => {
        return (
          <FormikStateHandler
            queryData={queryData}
            mutationData={mutationData}
            mutationInFlight={mutationInFlight}
            mutation={mutation}
          />
        )
      }}
    </GraphQLFormHandler>
  )
}

const style = StyleSheet.create({
  certificationContainer: {
    marginBottom: Sizing.x20,
  },
  certificationTitle: {
    ...Typography.subheader.x30,
    marginBottom: Sizing.x20,
  },
})

export default CustomCertificationsForm
