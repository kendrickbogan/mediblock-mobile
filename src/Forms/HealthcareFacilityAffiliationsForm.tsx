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
  GetHealthcareFacilityAffiliationsQuery,
  UpdateHealthcareFacilityAffiliationsMutation,
  MutationUpdateHealthcareFacilityAffiliationsArgs,
  HealthcareFacilityMembershipStatus,
  HealthcareFacilityAffiliationInput,
} from "../generated/graphql"
import {
  GraphQLFormHandler,
  FormNavigationHandler,
  TextField,
  AutocompleteField,
  Dropdown,
  SwitchField,
  DatePickerField,
} from "./formHelpers"
import { dateOrToday } from "../dateTimeUtils"

import { Colors, Typography, Sizing } from "../styles"
import { SchemaLike } from "yup/lib/types"

const GET_HEALTH_CARE_AFFILIATIONS = gql`
  query GetHealthcareFacilityAffiliations {
    personalDetails {
      id
      healthcareFacilityAffiliations {
        facilityName
        facilityLegalBusinessName
        facilityType
        departmentOrDivisionName
        addressLine1
        addressLine2
        city
        state
        zipCode
        country
        membershipStatus
        medicalStaffOfficePhoneNumber
        medicalStaffOfficeFaxNumber
        privilegeLimitations
        comments
        startedAt
        endedAt
      }
    }
    states
    countries
  }
`

const UPDATE_HEALTH_CARE_AFFILIATIONS = gql`
  mutation UpdateHealthcareFacilityAffiliations(
    $input: UpdateHealthcareFacilityAffiliationsMutationInput!
  ) {
    updateHealthcareFacilityAffiliations(input: $input) {
      healthcareFacilityAffiliations {
        facilityName
      }
    }
  }
`

interface HealthcareFacilityAffiliationsForm {
  facilityName: string
  facilityLegalBusinessName: string
  facilityType: string
  departmentOrDivisionName: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  zipCode: string
  country: string
  membershipStatus: HealthcareFacilityMembershipStatus
  medicalStaffOfficePhoneNumber: string
  medicalStaffOfficeFaxNumber: string
  privilegeLimitations: boolean
  comments: string
  startedAt: Date
  stillWithHealthcareFacility: boolean
  endedAt: Date
}

const emptyFormSet: HealthcareFacilityAffiliationsForm = {
  facilityName: "",
  facilityLegalBusinessName: "",
  facilityType: "",
  departmentOrDivisionName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
  membershipStatus: HealthcareFacilityMembershipStatus.Inactive,
  medicalStaffOfficePhoneNumber: "",
  medicalStaffOfficeFaxNumber: "",
  privilegeLimitations: false,
  comments: "",
  startedAt: new Date(),
  stillWithHealthcareFacility: true,
  endedAt: new Date(),
}

type FormValues = {
  healthcareFacilityAffiliations: HealthcareFacilityAffiliationsForm[]
}

const buildInitialFormValues = ({
  personalDetails,
}: GetHealthcareFacilityAffiliationsQuery): FormValues => {
  if (
    personalDetails?.healthcareFacilityAffiliations.length === 0 ||
    !personalDetails
  ) {
    return { healthcareFacilityAffiliations: [emptyFormSet] }
  } else {
    const healthcareFacilityAffiliationsFormValues = personalDetails?.healthcareFacilityAffiliations.map(
      healthcareFacilityAffiliation => {
        return {
          facilityName: healthcareFacilityAffiliation.facilityName || "",
          facilityLegalBusinessName:
            healthcareFacilityAffiliation.facilityLegalBusinessName || "",
          facilityType: healthcareFacilityAffiliation.facilityType || "",
          departmentOrDivisionName:
            healthcareFacilityAffiliation.departmentOrDivisionName || "",
          addressLine1: healthcareFacilityAffiliation.addressLine1 || "",
          addressLine2: healthcareFacilityAffiliation.addressLine2 || "",
          city: healthcareFacilityAffiliation.city || "",
          state: healthcareFacilityAffiliation.state || "",
          country: healthcareFacilityAffiliation.country || "",
          zipCode: healthcareFacilityAffiliation.zipCode || "",
          membershipStatus:
            healthcareFacilityAffiliation.membershipStatus ||
            HealthcareFacilityMembershipStatus.Inactive,
          medicalStaffOfficePhoneNumber:
            healthcareFacilityAffiliation.medicalStaffOfficePhoneNumber || "",
          medicalStaffOfficeFaxNumber:
            healthcareFacilityAffiliation.medicalStaffOfficeFaxNumber || "",
          privilegeLimitations:
            healthcareFacilityAffiliation.privilegeLimitations || false,
          comments: healthcareFacilityAffiliation?.comments || "",
          startedAt: dateOrToday(healthcareFacilityAffiliation?.startedAt),
          stillWithHealthcareFacility: healthcareFacilityAffiliation?.endedAt
            ? false
            : true,
          endedAt: dateOrToday(healthcareFacilityAffiliation?.endedAt),
        }
      },
    )

    return {
      healthcareFacilityAffiliations: healthcareFacilityAffiliationsFormValues,
    }
  }
}

const toHealthcareFacilityAffiliationsMutationInput = ({
  facilityName,
  facilityLegalBusinessName,
  facilityType,
  departmentOrDivisionName,
  addressLine1,
  addressLine2,
  city,
  state,
  zipCode,
  country,
  membershipStatus,
  medicalStaffOfficePhoneNumber,
  medicalStaffOfficeFaxNumber,
  privilegeLimitations,
  comments,
  startedAt,
  stillWithHealthcareFacility,
  endedAt,
}: HealthcareFacilityAffiliationsForm): HealthcareFacilityAffiliationInput => {
  return {
    facilityName,
    facilityLegalBusinessName,
    facilityType,
    departmentOrDivisionName,
    addressLine1,
    addressLine2,
    city,
    state,
    zipCode,
    country,
    membershipStatus,
    medicalStaffOfficePhoneNumber,
    medicalStaffOfficeFaxNumber,
    privilegeLimitations,
    comments,
    startedAt: startedAt,
    endedAt: stillWithHealthcareFacility ? null : endedAt,
  }
}

const membershipStatusOptions = [
  { value: HealthcareFacilityMembershipStatus.Inactive, label: "Inactive" },
  { value: HealthcareFacilityMembershipStatus.Active, label: "Active" },
  {
    value: HealthcareFacilityMembershipStatus.Courtesy,
    label: "Courtesy",
  },
  {
    value: HealthcareFacilityMembershipStatus.Temporary,
    label: "Temporary",
  },
  {
    value: HealthcareFacilityMembershipStatus.Provisional,
    label: "Provisional",
  },
]

const validationSchema = yup.object().shape({
  healthcareFacilityAffiliations: yup.array().of(
    yup.object({
      startedAt: yup.date().when("stillWithHealthcareFacility", {
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
      endedAt: yup.date().when("stillWithHealthcareFacility", {
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

interface HealthcareFacilityAffiliationsFieldsProps {
  formikProps: FormikProps<FormValues>
  fieldArrayProps: FieldArrayRenderProps
  states: string[]
  countries: string[]
}

const HealthcareFacilityAffiliationsFields: FC<HealthcareFacilityAffiliationsFieldsProps> = ({
  formikProps: {
    values: { healthcareFacilityAffiliations },
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
      {healthcareFacilityAffiliations.map(
        (_healthcareFacilityAffiliation, index) => {
          const errorsForFieldSet: FormikErrors<HealthcareFacilityAffiliationsForm> =
            errors.healthcareFacilityAffiliations &&
            errors.healthcareFacilityAffiliations[index]
              ? (errors.healthcareFacilityAffiliations[
                  index
                ] as FormikErrors<HealthcareFacilityAffiliationsForm>)
              : {}

          const toFieldName = (fieldName: string): string => {
            return `healthcareFacilityAffiliations[${index}].${fieldName}`
          }

          return (
            <View key={index} style={style.affiliationContainer}>
              <Text style={style.affiliationTitleText}>
                Healthcare Facility Affiliation #{index + 1}
              </Text>
              <TextField
                label="Facility name"
                value={healthcareFacilityAffiliations[index].facilityName}
                updateValue={handleChange(toFieldName("facilityName"))}
                errors={errorsForFieldSet.facilityName}
              />
              <TextField
                label="Facility legal business name"
                value={
                  healthcareFacilityAffiliations[index]
                    .facilityLegalBusinessName
                }
                updateValue={handleChange(
                  toFieldName("facilityLegalBusinessName"),
                )}
                errors={errorsForFieldSet.facilityLegalBusinessName}
              />
              <TextField
                label="Facility type"
                value={healthcareFacilityAffiliations[index].facilityType}
                updateValue={handleChange(toFieldName("facilityType"))}
                errors={errorsForFieldSet.facilityType}
              />
              <TextField
                label="Department or division name"
                value={
                  healthcareFacilityAffiliations[index].departmentOrDivisionName
                }
                updateValue={handleChange(
                  toFieldName("departmentOrDivisionName"),
                )}
                errors={errorsForFieldSet.departmentOrDivisionName}
              />
              <TextField
                label="Address line 1"
                value={healthcareFacilityAffiliations[index].addressLine1}
                updateValue={handleChange(toFieldName("addressLine1"))}
                errors={errorsForFieldSet.addressLine1}
              />
              <TextField
                label="Address line 2"
                value={healthcareFacilityAffiliations[index].addressLine2}
                updateValue={handleChange(toFieldName("addressLine2"))}
                errors={errorsForFieldSet.addressLine2}
              />
              <TextField
                label="City"
                value={healthcareFacilityAffiliations[index].city}
                updateValue={handleChange(toFieldName("city"))}
                errors={errorsForFieldSet.city}
              />
              <AutocompleteField
                label="State"
                errors={errorsForFieldSet.state}
                value={healthcareFacilityAffiliations[index].state}
                updateValue={handleChange(toFieldName("state"))}
                suggestionsList={states}
              />
              <TextField
                label="Zip code"
                value={healthcareFacilityAffiliations[index].zipCode}
                updateValue={handleChange(toFieldName("zipCode"))}
                errors={errorsForFieldSet.zipCode}
              />
              <AutocompleteField
                label="Country"
                errors={errorsForFieldSet.country}
                value={healthcareFacilityAffiliations[index].country}
                updateValue={handleChange(toFieldName("country"))}
                suggestionsList={countries}
              />
              <Dropdown<HealthcareFacilityMembershipStatus>
                options={membershipStatusOptions}
                label="Healthcare facility membership status"
                value={healthcareFacilityAffiliations[index].membershipStatus}
                onValueChange={(
                  value: HealthcareFacilityMembershipStatus,
                ): void =>
                  setFieldValue(toFieldName("membershipStatus"), value)
                }
                errors={errorsForFieldSet.membershipStatus}
              />
              <TextField
                label="Medical staff office phone number"
                value={
                  healthcareFacilityAffiliations[index]
                    .medicalStaffOfficePhoneNumber
                }
                updateValue={handleChange(
                  toFieldName("medicalStaffOfficePhoneNumber"),
                )}
                errors={errorsForFieldSet.medicalStaffOfficePhoneNumber}
              />
              <TextField
                label="Medical staff office fax number"
                value={
                  healthcareFacilityAffiliations[index]
                    .medicalStaffOfficeFaxNumber
                }
                updateValue={handleChange(
                  toFieldName("medicalStaffOfficeFaxNumber"),
                )}
                errors={errorsForFieldSet.medicalStaffOfficeFaxNumber}
              />
              <SwitchField
                label="Are there limitations on your privileges at this facility?"
                value={
                  healthcareFacilityAffiliations[index].privilegeLimitations
                }
                updateValue={(value: boolean): void => {
                  setFieldValue(toFieldName("privilegeLimitations"), value)
                }}
                errors={errorsForFieldSet.privilegeLimitations}
              />
              <DatePickerField
                label="Start date"
                value={healthcareFacilityAffiliations[index].startedAt}
                updateValue={(_event: Event, value: Date | undefined): void => {
                  setFieldValue(toFieldName("startedAt"), value)
                }}
                errors={errorsForFieldSet.startedAt}
              />
              <SwitchField
                label="Are you still with this healthcare facility?"
                value={
                  healthcareFacilityAffiliations[index]
                    .stillWithHealthcareFacility
                }
                updateValue={(value: boolean): void => {
                  setFieldValue(
                    toFieldName("stillWithHealthcareFacility"),
                    value,
                  )
                }}
                errors={errorsForFieldSet.stillWithHealthcareFacility}
              />
              {!healthcareFacilityAffiliations[index]
                .stillWithHealthcareFacility && (
                <DatePickerField
                  label="End date"
                  value={healthcareFacilityAffiliations[index].endedAt}
                  updateValue={(
                    _event: Event,
                    value: Date | undefined,
                  ): void => {
                    setFieldValue(toFieldName("endedAt"), value)
                  }}
                  errors={errorsForFieldSet.endedAt}
                />
              )}
              <TextField
                label="Comments"
                value={healthcareFacilityAffiliations[index].comments}
                updateValue={handleChange(toFieldName("comments"))}
                errors={errorsForFieldSet.comments}
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
        },
      )}
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
      name="healthcareFacilityAffiliations"
      render={(fieldArrayProps): ReactNode => {
        return (
          <HealthcareFacilityAffiliationsFields
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
  queryData: GetHealthcareFacilityAffiliationsQuery
  mutationData: UpdateHealthcareFacilityAffiliationsMutation | null | undefined
  mutationInFlight: boolean
  mutation: MutationFunction<
    UpdateHealthcareFacilityAffiliationsMutation,
    MutationUpdateHealthcareFacilityAffiliationsArgs
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
              healthcareFacilityAffiliationsAttributes: values.healthcareFacilityAffiliations.map(
                toHealthcareFacilityAffiliationsMutationInput,
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
              !!mutationData?.updateHealthcareFacilityAffiliations
                ?.healthcareFacilityAffiliations
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

const HealthcareFacilityAffiliationsForm: FC = () => {
  return (
    <GraphQLFormHandler<
      GetHealthcareFacilityAffiliationsQuery,
      UpdateHealthcareFacilityAffiliationsMutation,
      MutationUpdateHealthcareFacilityAffiliationsArgs
    >
      queryDocument={GET_HEALTH_CARE_AFFILIATIONS}
      mutationDocument={UPDATE_HEALTH_CARE_AFFILIATIONS}
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

export default HealthcareFacilityAffiliationsForm
