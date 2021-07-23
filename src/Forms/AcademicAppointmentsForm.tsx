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
  GetAcademicAppointmentsQuery,
  UpdateAcademicAppointmentsMutation,
  MutationUpdateAcademicAppointmentsArgs,
  AcademicAppointmentInput,
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

const GET_ACADEMIC_APPOINTMENTS = gql`
  query GetAcademicAppointments {
    personalDetails {
      id
      academicAppointments {
        position
        institutionName
        institutionUrl
        addressLine1
        addressLine2
        city
        state
        zip
        country
        phoneNumber
        faxNumber
        departmentHeadFirstName
        departmentHeadLastName
        startedAt
        endedAt
      }
    }
    states
    countries
  }
`

const UPDATE_ACADEMIC_APPOINTMENTS = gql`
  mutation UpdateAcademicAppointments(
    $input: UpdateAcademicAppointmentsMutationInput!
  ) {
    updateAcademicAppointments(input: $input) {
      academicAppointments {
        institutionName
      }
    }
  }
`

interface AcademicAppointmentsForm {
  position: string
  institutionName: string
  institutionUrl: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  zip: string
  country: string
  phoneNumber: string
  faxNumber: string
  departmentHeadFirstName: string
  departmentHeadLastName: string
  startedAt: Date
  currentAppointment: boolean
  endedAt: Date
}

const emptyFormSet: AcademicAppointmentsForm = {
  position: "",
  institutionName: "",
  institutionUrl: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  phoneNumber: "",
  faxNumber: "",
  departmentHeadFirstName: "",
  departmentHeadLastName: "",
  startedAt: new Date(),
  currentAppointment: true,
  endedAt: new Date(),
}

type FormValues = {
  academicAppointments: AcademicAppointmentsForm[]
}

const buildInitialFormValues = ({
  personalDetails,
}: GetAcademicAppointmentsQuery): FormValues => {
  if (personalDetails?.academicAppointments.length === 0 || !personalDetails) {
    return { academicAppointments: [emptyFormSet] }
  } else {
    const academicAppointmentsFormValues = personalDetails?.academicAppointments.map(
      academicAppointment => {
        return {
          position: academicAppointment.position || "",
          institutionName: academicAppointment.institutionName || "",
          institutionUrl: academicAppointment.institutionUrl || "",
          addressLine1: academicAppointment.addressLine1 || "",
          addressLine2: academicAppointment.addressLine2 || "",
          city: academicAppointment.city || "",
          state: academicAppointment.state || "",
          country: academicAppointment.country || "",
          zip: academicAppointment.zip || "",
          phoneNumber: academicAppointment.phoneNumber || "",
          faxNumber: academicAppointment.faxNumber || "",
          departmentHeadFirstName:
            academicAppointment.departmentHeadFirstName || "",
          departmentHeadLastName:
            academicAppointment.departmentHeadLastName || "",
          startedAt: dateOrToday(academicAppointment?.startedAt),
          currentAppointment: academicAppointment?.endedAt ? false : true,
          endedAt: dateOrToday(academicAppointment?.endedAt),
        }
      },
    )

    return { academicAppointments: academicAppointmentsFormValues }
  }
}

const toAcademicAppointmentMutationInput = ({
  position,
  institutionName,
  institutionUrl,
  addressLine1,
  addressLine2,
  city,
  state,
  zip,
  country,
  phoneNumber,
  faxNumber,
  departmentHeadFirstName,
  departmentHeadLastName,
  startedAt,
  currentAppointment,
  endedAt,
}: AcademicAppointmentsForm): AcademicAppointmentInput => {
  return {
    position,
    institutionName,
    institutionUrl,
    addressLine1,
    addressLine2,
    city,
    state,
    zip,
    country,
    phoneNumber,
    faxNumber,
    departmentHeadFirstName,
    departmentHeadLastName,
    startedAt: startedAt,
    endedAt: !currentAppointment ? endedAt : null,
  }
}

const validationSchema = yup.object().shape({
  academicAppointments: yup.array().of(
    yup.object({
      startedAt: yup.date().when("currentAppointment", {
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
      endedAt: yup.date().when("currentAppointment", {
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

interface AcademicAppointmentFieldsProps {
  formikProps: FormikProps<FormValues>
  fieldArrayProps: FieldArrayRenderProps
  states: string[]
  countries: string[]
}

const AcademicAppointmentFields: FC<AcademicAppointmentFieldsProps> = ({
  formikProps: {
    values: { academicAppointments },
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
      {academicAppointments.map((_academicAppointment, index) => {
        const errorsForFieldSet: FormikErrors<AcademicAppointmentsForm> =
          errors.academicAppointments && errors.academicAppointments[index]
            ? (errors.academicAppointments[
                index
              ] as FormikErrors<AcademicAppointmentsForm>)
            : {}

        const toFieldName = (fieldName: string): string => {
          return `academicAppointments[${index}].${fieldName}`
        }

        return (
          <View key={index} style={style.appointmentContainer}>
            <Text style={style.appointmentTitleText}>
              Academic Appointment #{index + 1}
            </Text>
            <TextField
              label="Position"
              value={academicAppointments[index].position}
              updateValue={handleChange(toFieldName("position"))}
              errors={errorsForFieldSet.position}
            />
            <TextField
              label="Institution name"
              value={academicAppointments[index].institutionName}
              updateValue={handleChange(toFieldName("institutionName"))}
              errors={errorsForFieldSet.institutionName}
            />
            <TextField
              label="Institution URL"
              value={academicAppointments[index].institutionUrl}
              updateValue={handleChange(toFieldName("institutionUrl"))}
              errors={errorsForFieldSet.institutionUrl}
            />
            <TextField
              label="Address line 1"
              value={academicAppointments[index].addressLine1}
              updateValue={handleChange(toFieldName("addressLine1"))}
              errors={errorsForFieldSet.addressLine1}
            />
            <TextField
              label="Address line 2"
              value={academicAppointments[index].addressLine2}
              updateValue={handleChange(toFieldName("addressLine2"))}
              errors={errorsForFieldSet.addressLine2}
            />
            <TextField
              label="City"
              value={academicAppointments[index].city}
              updateValue={handleChange(toFieldName("city"))}
              errors={errorsForFieldSet.city}
            />
            <AutocompleteField
              label="State"
              errors={errorsForFieldSet.state}
              value={academicAppointments[index].state}
              updateValue={handleChange(toFieldName("state"))}
              suggestionsList={states}
            />
            <TextField
              label="Zip code"
              value={academicAppointments[index].zip}
              updateValue={handleChange(toFieldName("zip"))}
              errors={errorsForFieldSet.zip}
            />
            <AutocompleteField
              label="Country"
              errors={errorsForFieldSet.country}
              value={academicAppointments[index].country}
              updateValue={handleChange(toFieldName("country"))}
              suggestionsList={countries}
            />
            <TextField
              label="Institution phone number"
              value={academicAppointments[index].phoneNumber}
              updateValue={handleChange(toFieldName("phoneNumber"))}
              errors={errorsForFieldSet.phoneNumber}
            />
            <TextField
              label="Institution fax number"
              value={academicAppointments[index].faxNumber}
              updateValue={handleChange(toFieldName("faxNumber"))}
              errors={errorsForFieldSet.faxNumber}
            />
            <TextField
              label="Department head first name"
              value={academicAppointments[index].departmentHeadFirstName}
              updateValue={handleChange(toFieldName("departmentHeadFirstName"))}
              errors={errorsForFieldSet.departmentHeadFirstName}
            />
            <TextField
              label="Department head last name"
              value={academicAppointments[index].departmentHeadLastName}
              updateValue={handleChange(toFieldName("departmentHeadLastName"))}
              errors={errorsForFieldSet.departmentHeadLastName}
            />
            <DatePickerField
              label="Start date"
              value={academicAppointments[index].startedAt}
              updateValue={(_event: Event, value: Date | undefined): void => {
                setFieldValue(toFieldName("startedAt"), value)
              }}
              errors={errorsForFieldSet.startedAt}
            />
            <SwitchField
              label="Is this a current appointment?"
              value={academicAppointments[index].currentAppointment}
              updateValue={(value: boolean): void => {
                setFieldValue(toFieldName("currentAppointment"), value)
              }}
              errors={errorsForFieldSet.currentAppointment}
            />
            {!academicAppointments[index].currentAppointment && (
              <DatePickerField
                label="End date"
                value={academicAppointments[index].endedAt}
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
      name="academicAppointments"
      render={(fieldArrayProps): ReactNode => {
        return (
          <AcademicAppointmentFields
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
  queryData: GetAcademicAppointmentsQuery
  mutationData: UpdateAcademicAppointmentsMutation | null | undefined
  mutationInFlight: boolean
  mutation: MutationFunction<
    UpdateAcademicAppointmentsMutation,
    MutationUpdateAcademicAppointmentsArgs
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
              academicAppointmentsAttributes: values.academicAppointments.map(
                toAcademicAppointmentMutationInput,
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
              !!mutationData?.updateAcademicAppointments?.academicAppointments
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

const AcademicAppointmentsForm: FC = () => {
  return (
    <GraphQLFormHandler<
      GetAcademicAppointmentsQuery,
      UpdateAcademicAppointmentsMutation,
      MutationUpdateAcademicAppointmentsArgs
    >
      queryDocument={GET_ACADEMIC_APPOINTMENTS}
      mutationDocument={UPDATE_ACADEMIC_APPOINTMENTS}
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
  appointmentContainer: {
    marginBottom: Sizing.x20,
  },
  appointmentTitleText: {
    ...Typography.subheader.x30,
    marginBottom: Sizing.x20,
  },
})

export default AcademicAppointmentsForm
