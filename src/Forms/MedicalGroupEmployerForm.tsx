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

import {
  GetMedicalGroupEmployersQuery,
  UpdateMedicalGroupEmployersMutation,
  MutationUpdateMedicalGroupEmployersArgs,
  MedicalGroupEmployerInput,
} from "../generated/graphql"
import {
  GraphQLFormHandler,
  FormNavigationHandler,
  TextField,
  AutocompleteField,
  SwitchField,
  DatePickerField,
} from "./formHelpers"
import { dateOrToday } from "../dateTimeUtils"

import { Colors, Typography, Sizing } from "../styles"
import { SchemaLike } from "yup/lib/types"

const GET_MEDICAL_GROUP_EMPLOYERS = gql`
  query GetMedicalGroupEmployers {
    personalDetails {
      id
      medicalGroupEmployers {
        name
        legalBusinessName
        addressLine1
        addressLine2
        city
        state
        country
        zip
        phoneNumber
        startedAt
        endedAt
      }
    }
    states
    countries
  }
`

const UPDATE_MEDICAL_GROUP_EMPLOYERS = gql`
  mutation UpdateMedicalGroupEmployers(
    $input: UpdateMedicalGroupEmployersMutationInput!
  ) {
    updateMedicalGroupEmployers(input: $input) {
      medicalGroupEmployers {
        name
      }
    }
  }
`

interface MedicalGroupEmployerForm {
  name: string
  legalBusinessName: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  country: string
  zip: string
  phoneNumber: string
  startedAt: Date
  stillWithMedicalGroupEmployer: boolean
  endedAt: Date
}

const emptyFormSet: MedicalGroupEmployerForm = {
  name: "",
  legalBusinessName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  country: "",
  zip: "",
  phoneNumber: "",
  startedAt: new Date(),
  stillWithMedicalGroupEmployer: true,
  endedAt: new Date(),
}

type FormValues = {
  medicalGroupEmployers: MedicalGroupEmployerForm[]
}

const buildInitialFormValues = ({
  personalDetails,
}: GetMedicalGroupEmployersQuery): FormValues => {
  if (personalDetails?.medicalGroupEmployers.length === 0 || !personalDetails) {
    return { medicalGroupEmployers: [emptyFormSet] }
  } else {
    const medicalGroupEmployersFormValues = personalDetails?.medicalGroupEmployers.map(
      medicalGroupEmployer => {
        return {
          name: medicalGroupEmployer.name || "",
          legalBusinessName: medicalGroupEmployer.legalBusinessName || "",
          addressLine1: medicalGroupEmployer.addressLine1 || "",
          addressLine2: medicalGroupEmployer.addressLine2 || "",
          city: medicalGroupEmployer.city || "",
          state: medicalGroupEmployer.state || "",
          country: medicalGroupEmployer.country || "",
          zip: medicalGroupEmployer.zip || "",
          phoneNumber: medicalGroupEmployer.phoneNumber || "",
          startedAt: dateOrToday(medicalGroupEmployer?.startedAt),
          stillWithMedicalGroupEmployer: medicalGroupEmployer?.endedAt
            ? false
            : true,
          endedAt: dateOrToday(medicalGroupEmployer?.endedAt),
        }
      },
    )

    return { medicalGroupEmployers: medicalGroupEmployersFormValues }
  }
}

const toMedicalGroupEmployerMutationInput = ({
  name,
  legalBusinessName,
  addressLine1,
  addressLine2,
  city,
  state,
  country,
  zip,
  phoneNumber,
  startedAt,
  stillWithMedicalGroupEmployer,
  endedAt,
}: MedicalGroupEmployerForm): MedicalGroupEmployerInput => {
  return {
    name,
    legalBusinessName,
    addressLine1,
    addressLine2,
    city,
    state,
    country,
    zip,
    phoneNumber,
    startedAt: startedAt,
    endedAt: stillWithMedicalGroupEmployer ? null : endedAt,
  }
}

const validationSchema = yup.object().shape({
  medicalGroupEmployers: yup.array().of(
    yup.object({
      name: yup.string(),
      startedAt: yup.date().when("stillWithMedicalGroupEmployer", {
        is: false,
        then: yup.date().when(
          "endedAt",
          (endedAt: Date): SchemaLike => {
            return (
              endedAt &&
              yup
                .date()
                .max(endedAt, "Start date should be before the end date")
            )
          },
        ),
      }),
      endedAt: yup.date().when("stillWithMedicalGroupEmployer", {
        is: false,
        then: yup.date().when(
          "startedAt",
          (startedAt: Date): SchemaLike => {
            return (
              startedAt &&
              yup
                .date()
                .min(startedAt, "End date should be after the start date")
            )
          },
        ),
      }),
    }),
  ),
})

interface MedicalGroupEmployerFieldsProps {
  formikProps: FormikProps<FormValues>
  fieldArrayProps: FieldArrayRenderProps
  states: string[]
  countries: string[]
}

const MedicalGroupEmployerFields: FC<MedicalGroupEmployerFieldsProps> = ({
  formikProps: {
    values: { medicalGroupEmployers },
    handleChange,
    setFieldValue,
    errors,
  },
  states,
  countries,
  fieldArrayProps: { push, remove },
}) => {
  return (
    <>
      {medicalGroupEmployers.map((_medicalGroupEmployer, index) => {
        const errorsForFieldSet: FormikErrors<MedicalGroupEmployerForm> =
          errors.medicalGroupEmployers && errors.medicalGroupEmployers[index]
            ? (errors.medicalGroupEmployers[
                index
              ] as FormikErrors<MedicalGroupEmployerForm>)
            : {}

        const toFieldName = (fieldName: string): string => {
          return `medicalGroupEmployers[${index}].${fieldName}`
        }

        return (
          <View key={index} style={style.affiliationContainer}>
            <Text style={style.affiliationTitleText}>
              Medical Group/Employer #{index + 1}
            </Text>
            <TextField
              label="Medical group/employer name"
              value={medicalGroupEmployers[index].name}
              updateValue={handleChange(toFieldName("name"))}
              errors={errorsForFieldSet.name}
            />
            <TextField
              label="Medical group/employer legal business name"
              value={medicalGroupEmployers[index].legalBusinessName}
              updateValue={handleChange(toFieldName("legalBusinessName"))}
              errors={errorsForFieldSet.legalBusinessName}
            />
            <TextField
              label="Address line 1"
              value={medicalGroupEmployers[index].addressLine1}
              updateValue={handleChange(toFieldName("addressLine1"))}
              errors={errorsForFieldSet.addressLine1}
            />
            <TextField
              label="Address line 2"
              value={medicalGroupEmployers[index].addressLine2}
              updateValue={handleChange(toFieldName("addressLine2"))}
              errors={errorsForFieldSet.addressLine2}
            />
            <TextField
              label="City"
              value={medicalGroupEmployers[index].city}
              updateValue={handleChange(toFieldName("city"))}
              errors={errorsForFieldSet.city}
            />
            <AutocompleteField
              label="State"
              errors={errorsForFieldSet.state}
              value={medicalGroupEmployers[index].state}
              updateValue={handleChange(toFieldName("state"))}
              suggestionsList={states}
            />
            <TextField
              label="Zip code"
              value={medicalGroupEmployers[index].zip}
              updateValue={handleChange(toFieldName("zip"))}
              errors={errorsForFieldSet.zip}
            />
            <AutocompleteField
              label="Country"
              errors={errorsForFieldSet.country}
              value={medicalGroupEmployers[index].country}
              updateValue={handleChange(toFieldName("country"))}
              suggestionsList={countries}
            />
            <TextField
              label="Phone number"
              value={medicalGroupEmployers[index].phoneNumber}
              updateValue={handleChange(toFieldName("phoneNumber"))}
              errors={errorsForFieldSet.phoneNumber}
            />
            <DatePickerField
              label="Start date"
              value={medicalGroupEmployers[index].startedAt}
              updateValue={(_event: Event, value: Date | undefined): void => {
                setFieldValue(toFieldName("startedAt"), value)
              }}
              errors={errorsForFieldSet.startedAt}
            />
            <SwitchField
              label="Are you currently with this medical group/employer?"
              value={medicalGroupEmployers[index].stillWithMedicalGroupEmployer}
              updateValue={(value: boolean): void => {
                setFieldValue(
                  toFieldName("stillWithMedicalGroupEmployer"),
                  value,
                )
              }}
              errors={errorsForFieldSet.stillWithMedicalGroupEmployer}
            />
            {!medicalGroupEmployers[index].stillWithMedicalGroupEmployer && (
              <DatePickerField
                label="End date"
                value={medicalGroupEmployers[index].endedAt}
                updateValue={(_event: Event, value: Date | undefined): void => {
                  setFieldValue(toFieldName("endedAt"), value)
                }}
                errors={errorsForFieldSet.endedAt}
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
  states: string[]
  countries: string[]
}

const Form: FC<FormProps> = ({ formikProps, states, countries }) => {
  return (
    <FieldArray
      name="medicalGroupEmployers"
      render={(fieldArrayProps): ReactNode => {
        return (
          <MedicalGroupEmployerFields
            formikProps={formikProps}
            fieldArrayProps={fieldArrayProps}
            states={states}
            countries={countries}
          />
        )
      }}
    />
  )
}

interface FormikStateHandlerProps {
  queryData: GetMedicalGroupEmployersQuery
  mutationData: UpdateMedicalGroupEmployersMutation | null | undefined
  mutationInFlight: boolean
  mutation: MutationFunction<
    UpdateMedicalGroupEmployersMutation,
    MutationUpdateMedicalGroupEmployersArgs
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
              medicalGroupEmployersAttributes: values.medicalGroupEmployers.map(
                toMedicalGroupEmployerMutationInput,
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
              !!mutationData?.updateMedicalGroupEmployers?.medicalGroupEmployers
            }
          >
            <Form
              formikProps={formikProps}
              states={queryData.states}
              countries={queryData.countries}
            />
          </FormNavigationHandler>
        )
      }}
    </Formik>
  )
}

const MedicalGroupEmployersForm: FC = () => {
  return (
    <GraphQLFormHandler<
      GetMedicalGroupEmployersQuery,
      UpdateMedicalGroupEmployersMutation,
      MutationUpdateMedicalGroupEmployersArgs
    >
      queryDocument={GET_MEDICAL_GROUP_EMPLOYERS}
      mutationDocument={UPDATE_MEDICAL_GROUP_EMPLOYERS}
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
  affiliationContainer: {
    marginBottom: Sizing.x20,
  },
  affiliationTitleText: {
    ...Typography.subheader.x30,
    marginBottom: Sizing.x20,
  },
})

export default MedicalGroupEmployersForm
