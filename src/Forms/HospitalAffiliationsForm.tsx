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
  GetHospitalAffiliationsQuery,
  UpdateHospitalAffiliationsMutation,
  MutationUpdateHospitalAffiliationsArgs,
  HospitalMembershipStatus,
  HospitalAffiliationInput,
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

const GET_HOSPITAL_AFFILIATIONS = gql`
  query GetHospitalAffiliations {
    personalDetails {
      id
      hospitalAffiliations {
        hospitalName
        hospitalLegalBusinessName
        departmentName
        addressLine1
        addressLine2
        city
        state
        country
        zipCode
        membershipStatus
        staffOfficePhoneNumber
        staffOfficeFaxNumber
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

const UPDATE_HOSPITAL_AFFILIATIONS = gql`
  mutation UpdateHospitalAffiliations(
    $input: UpdateHospitalAffiliationsMutationInput!
  ) {
    updateHospitalAffiliations(input: $input) {
      hospitalAffiliations {
        hospitalName
      }
    }
  }
`

interface HospitalAffiliationForm {
  hospitalName: string
  hospitalLegalBusinessName: string
  departmentName: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  country: string
  zipCode: string
  membershipStatus: HospitalMembershipStatus
  staffOfficePhoneNumber: string
  staffOfficeFaxNumber: string
  privilegeLimitations: boolean
  comments: string
  startedAt: Date
  stillWithHospital: boolean
  endedAt: Date
}

const emptyFormSet: HospitalAffiliationForm = {
  hospitalName: "",
  hospitalLegalBusinessName: "",
  departmentName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  country: "",
  zipCode: "",
  membershipStatus: HospitalMembershipStatus.Inactive,
  staffOfficePhoneNumber: "",
  staffOfficeFaxNumber: "",
  privilegeLimitations: false,
  comments: "",
  startedAt: new Date(),
  stillWithHospital: true,
  endedAt: new Date(),
}

type FormValues = {
  hospitalAffiliations: HospitalAffiliationForm[]
}

const buildInitialFormValues = ({
  personalDetails,
}: GetHospitalAffiliationsQuery): FormValues => {
  if (personalDetails?.hospitalAffiliations.length === 0 || !personalDetails) {
    return { hospitalAffiliations: [emptyFormSet] }
  } else {
    const hospitalAffiliationsFormValues = personalDetails?.hospitalAffiliations.map(
      hospitalAffiliation => {
        return {
          hospitalName: hospitalAffiliation.hospitalName || "",
          hospitalLegalBusinessName:
            hospitalAffiliation.hospitalLegalBusinessName || "",
          departmentName: hospitalAffiliation.departmentName || "",
          addressLine1: hospitalAffiliation.addressLine1 || "",
          addressLine2: hospitalAffiliation.addressLine2 || "",
          city: hospitalAffiliation.city || "",
          state: hospitalAffiliation.state || "",
          country: hospitalAffiliation.country || "",
          zipCode: hospitalAffiliation.zipCode || "",
          membershipStatus:
            hospitalAffiliation.membershipStatus ||
            HospitalMembershipStatus.Inactive,
          staffOfficePhoneNumber:
            hospitalAffiliation.staffOfficePhoneNumber || "",
          staffOfficeFaxNumber: hospitalAffiliation.staffOfficeFaxNumber || "",
          privilegeLimitations:
            hospitalAffiliation.privilegeLimitations || false,
          comments: hospitalAffiliation?.comments || "",
          startedAt: dateOrToday(hospitalAffiliation?.startedAt),
          stillWithHospital: hospitalAffiliation?.endedAt ? false : true,
          endedAt: dateOrToday(hospitalAffiliation?.endedAt),
        }
      },
    )

    return { hospitalAffiliations: hospitalAffiliationsFormValues }
  }
}

const toHospitalAffiliationMutationInput = ({
  hospitalName,
  hospitalLegalBusinessName,
  departmentName,
  addressLine1,
  addressLine2,
  city,
  state,
  country,
  zipCode,
  membershipStatus,
  staffOfficePhoneNumber,
  staffOfficeFaxNumber,
  privilegeLimitations,
  comments,
  startedAt,
  stillWithHospital,
  endedAt,
}: HospitalAffiliationForm): HospitalAffiliationInput => {
  return {
    hospitalName,
    hospitalLegalBusinessName,
    departmentName,
    addressLine1,
    addressLine2,
    city,
    state,
    country,
    zipCode,
    membershipStatus,
    staffOfficePhoneNumber,
    staffOfficeFaxNumber,
    privilegeLimitations,
    comments,
    startedAt: startedAt,
    endedAt: !stillWithHospital ? endedAt : null,
  }
}

const membershipStatusOptions = [
  { value: HospitalMembershipStatus.Inactive, label: "Inactive" },
  { value: HospitalMembershipStatus.Active, label: "Active" },
  {
    value: HospitalMembershipStatus.Courtesy,
    label: "Courtesy",
  },
  {
    value: HospitalMembershipStatus.Temporary,
    label: "Temporary",
  },
  {
    value: HospitalMembershipStatus.Provisional,
    label: "Provisional",
  },
]

const validationSchema = yup.object().shape({
  hospitalAffiliations: yup.array().of(
    yup.object({
      startedAt: yup.date().when("stillWithHospital", {
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
      endedAt: yup.date().when("stillWithHospital", {
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

interface HospitalAffiliationFieldsProps {
  formikProps: FormikProps<FormValues>
  fieldArrayProps: FieldArrayRenderProps
  states: string[]
  countries: string[]
}

const HospitalAffiliationFields: FC<HospitalAffiliationFieldsProps> = ({
  formikProps: {
    values: { hospitalAffiliations },
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
      {hospitalAffiliations.map((_hospitalAffiliation, index) => {
        const errorsForFieldSet: FormikErrors<HospitalAffiliationForm> =
          errors.hospitalAffiliations && errors.hospitalAffiliations[index]
            ? (errors.hospitalAffiliations[
                index
              ] as FormikErrors<HospitalAffiliationForm>)
            : {}

        const toFieldName = (fieldName: string): string => {
          return `hospitalAffiliations[${index}].${fieldName}`
        }

        return (
          <View key={index} style={style.affiliationContainer}>
            <Text style={style.affiliationTitleText}>
              Hospital Affiliation #{index + 1}
            </Text>
            <TextField
              label="Hospital name"
              value={hospitalAffiliations[index].hospitalName}
              updateValue={handleChange(toFieldName("hospitalName"))}
              errors={errorsForFieldSet.hospitalName}
            />
            <TextField
              label="Hospital legal bussiness name"
              value={hospitalAffiliations[index].hospitalLegalBusinessName}
              updateValue={handleChange(
                toFieldName("hospitalLegalBusinessName"),
              )}
              errors={errorsForFieldSet.hospitalLegalBusinessName}
            />
            <TextField
              label="Department name"
              value={hospitalAffiliations[index].departmentName}
              updateValue={handleChange(toFieldName("departmentName"))}
              errors={errorsForFieldSet.departmentName}
            />
            <TextField
              label="Address line 1"
              value={hospitalAffiliations[index].addressLine1}
              updateValue={handleChange(toFieldName("addressLine1"))}
              errors={errorsForFieldSet.addressLine1}
            />
            <TextField
              label="Address line 2"
              value={hospitalAffiliations[index].addressLine2}
              updateValue={handleChange(toFieldName("addressLine2"))}
              errors={errorsForFieldSet.addressLine2}
            />
            <TextField
              label="City"
              value={hospitalAffiliations[index].city}
              updateValue={handleChange(toFieldName("city"))}
              errors={errorsForFieldSet.city}
            />
            <AutocompleteField
              label="State"
              errors={errorsForFieldSet.state}
              value={hospitalAffiliations[index].state}
              updateValue={handleChange(toFieldName("state"))}
              suggestionsList={states}
            />
            <TextField
              label="Zip code"
              value={hospitalAffiliations[index].zipCode}
              updateValue={handleChange(toFieldName("zipCode"))}
              errors={errorsForFieldSet.zipCode}
            />
            <AutocompleteField
              label="Country"
              errors={errorsForFieldSet.country}
              value={hospitalAffiliations[index].country}
              updateValue={handleChange(toFieldName("country"))}
              suggestionsList={countries}
            />
            <Dropdown<HospitalMembershipStatus>
              options={membershipStatusOptions}
              label="Hospital membership status"
              value={hospitalAffiliations[index].membershipStatus}
              onValueChange={(value: HospitalMembershipStatus): void =>
                setFieldValue(toFieldName("membershipStatus"), value)
              }
              errors={errorsForFieldSet.membershipStatus}
            />
            <TextField
              label="Staff office phone number"
              value={hospitalAffiliations[index].staffOfficePhoneNumber}
              updateValue={handleChange(toFieldName("staffOfficePhoneNumber"))}
              errors={errorsForFieldSet.staffOfficePhoneNumber}
            />
            <TextField
              label="Staff office fax number"
              value={hospitalAffiliations[index].staffOfficeFaxNumber}
              updateValue={handleChange(toFieldName("staffOfficeFaxNumber"))}
              errors={errorsForFieldSet.staffOfficeFaxNumber}
            />
            <SwitchField
              label="Are there limitations on your privileges at this hospital?"
              value={hospitalAffiliations[index].privilegeLimitations}
              updateValue={(value: boolean): void => {
                setFieldValue(toFieldName("privilegeLimitations"), value)
              }}
              errors={errorsForFieldSet.privilegeLimitations}
            />
            <DatePickerField
              label="Start date"
              value={hospitalAffiliations[index].startedAt}
              updateValue={(_event: Event, value: Date | undefined): void => {
                setFieldValue(toFieldName("startedAt"), value)
              }}
              errors={errorsForFieldSet.startedAt}
            />
            <SwitchField
              label="Are you still with this hospital?"
              value={hospitalAffiliations[index].stillWithHospital}
              updateValue={(value: boolean): void => {
                setFieldValue(toFieldName("stillWithHospital"), value)
              }}
              errors={errorsForFieldSet.stillWithHospital}
            />
            {!hospitalAffiliations[index].stillWithHospital && (
              <DatePickerField
                label="End date"
                value={hospitalAffiliations[index].endedAt}
                updateValue={(_event: Event, value: Date | undefined): void => {
                  setFieldValue(toFieldName("endedAt"), value)
                }}
                errors={errorsForFieldSet.endedAt}
              />
            )}
            <TextField
              label="Comments"
              value={hospitalAffiliations[index].comments}
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
      name="hospitalAffiliations"
      render={(fieldArrayProps): ReactNode => {
        return (
          <HospitalAffiliationFields
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
  queryData: GetHospitalAffiliationsQuery
  mutationData: UpdateHospitalAffiliationsMutation | null | undefined
  mutationInFlight: boolean
  mutation: MutationFunction<
    UpdateHospitalAffiliationsMutation,
    MutationUpdateHospitalAffiliationsArgs
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
              hospitalAffiliationsAttributes: values.hospitalAffiliations.map(
                toHospitalAffiliationMutationInput,
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
              !!mutationData?.updateHospitalAffiliations?.hospitalAffiliations
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

const HospitalAffiliationsForm: FC = () => {
  return (
    <GraphQLFormHandler<
      GetHospitalAffiliationsQuery,
      UpdateHospitalAffiliationsMutation,
      MutationUpdateHospitalAffiliationsArgs
    >
      queryDocument={GET_HOSPITAL_AFFILIATIONS}
      mutationDocument={UPDATE_HOSPITAL_AFFILIATIONS}
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

export default HospitalAffiliationsForm
