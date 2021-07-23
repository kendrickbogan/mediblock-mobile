import React, { FC, ReactNode } from "react"
import { gql, MutationFunction } from "@apollo/client"
import * as yup from "yup"
import { Formik, FormikProps } from "formik"
import { SchemaLike } from "yup/lib/types"

import {
  GetCovidVaccinationDetailsQuery,
  UpdateCovidVaccinationMutation,
  MutationUpdateCovidVaccinationArgs,
  UpdateCovidVaccinationMutationInput,
} from "../generated/graphql"

import { dateOrToday } from "./dateTimeUtils"
import {
  DatePickerField,
  GraphQLFormHandler,
  FormNavigationHandler,
  TextField,
  AutocompleteField,
} from "./formHelpers"

const GET_VACCINATION_DETAILS = gql`
  query GetCovidVaccinationDetails {
    personalDetails {
      id
      covidVaccination {
        vaccinationDate1
        vaccinationDate2
        facilityName
        addressLine1
        addressLine2
        city
        state
        zip
      }
    }
    states
  }
`

const UPDATE_VACCINATION_DETAILS = gql`
  mutation UpdateCovidVaccination(
    $input: UpdateCOVIDVaccinationMutationInput!
  ) {
    updateCovidVaccination(input: $input) {
      covidVaccination {
        vaccinationDate1
      }
    }
  }
`

type FormValues = {
  vaccinationDate1: Date
  vaccinationDate2: Date
  facilityName: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  zip: string
}

const buildInitialFormValues = ({
  personalDetails,
}: GetCovidVaccinationDetailsQuery): FormValues => {
  return {
    vaccinationDate1: dateOrToday(
      personalDetails?.covidVaccination?.vaccinationDate1,
    ),
    vaccinationDate2: dateOrToday(
      personalDetails?.covidVaccination?.vaccinationDate2,
    ),
    facilityName: personalDetails?.covidVaccination?.facilityName || "",
    addressLine1: personalDetails?.covidVaccination?.addressLine1 || "",
    addressLine2: personalDetails?.covidVaccination?.addressLine2 || "",
    city: personalDetails?.covidVaccination?.city || "",
    state: personalDetails?.covidVaccination?.state || "",
    zip: personalDetails?.covidVaccination?.zip || "",
  }
}

const buildMutationVariables = ({
  vaccinationDate1,
  vaccinationDate2,
  facilityName,
  addressLine1,
  addressLine2,
  city,
  state,
  zip,
}: FormValues): UpdateCovidVaccinationMutationInput => {
  return {
    vaccinationDate1,
    vaccinationDate2,
    facilityName,
    addressLine1,
    addressLine2,
    city,
    state,
    zip,
  }
}

const validationSchema = (states: string[]): SchemaLike => {
  return yup.object().shape(
    {
      vaccinationDate1: yup.date().when(
        "vaccinationDate2",
        (vaccinationDate2: Date): SchemaLike => {
          return (
            vaccinationDate2 &&
            yup
              .date()
              .max(
                vaccinationDate2,
                "First vaccination date should be before the second",
              )
          )
        },
      ),
      vaccinationDate2: yup.date().when(
        "vaccinationDate1",
        (vaccinationDate1: Date): SchemaLike => {
          return (
            vaccinationDate1 &&
            yup
              .date()
              .min(
                vaccinationDate1,
                "Second vaccination date should be after the first",
              )
          )
        },
      ),
      facilityName: yup.string(),
      state: yup.string().when("state", {
        is: (state: string) => !!state && state.length > 0,
        then: yup.string().oneOf(states, "Please select a state from the list"),
      }),
    },
    [
      ["vaccinationDate1", "vaccinationDate2"],
      ["state", "state"],
    ],
  )
}

interface FormFieldsProps {
  formikProps: FormikProps<FormValues>
  stateList: string[]
}

const FormFields: FC<FormFieldsProps> = ({
  formikProps: { handleChange, errors, values, setFieldValue },
  stateList,
}) => {
  return (
    <>
      <DatePickerField
        label="First vaccination date"
        value={values.vaccinationDate1}
        updateValue={(_event: Event, value: Date | undefined): void => {
          setFieldValue("vaccinationDate1", value)
        }}
        errors={errors.vaccinationDate1}
      />
      <DatePickerField
        label="Second vaccination date"
        value={values.vaccinationDate2}
        updateValue={(_event: Event, value: Date | undefined): void => {
          setFieldValue("vaccinationDate2", value)
        }}
        errors={errors.vaccinationDate2}
      />
      <TextField
        label="Facility name"
        value={values.facilityName}
        updateValue={handleChange("facilityName")}
        errors={errors.facilityName}
      />
      <TextField
        label="Facility address line 1"
        value={values.addressLine1}
        updateValue={handleChange("addressLine1")}
        errors={errors.addressLine1}
      />
      <TextField
        label="Facility address line 2"
        value={values.addressLine2}
        updateValue={handleChange("addressLine2")}
        errors={errors.addressLine2}
      />
      <TextField
        label="City"
        value={values.city}
        updateValue={handleChange("city")}
        errors={errors.city}
      />
      <AutocompleteField
        suggestionsList={stateList}
        value={values.state}
        updateValue={(value: string): void => {
          setFieldValue("state", value)
        }}
        label="State"
        errors={errors.state}
      />
      <TextField
        label="Zip code"
        value={values.zip}
        updateValue={handleChange("zip")}
        errors={errors.zip}
      />
    </>
  )
}

interface FormikStateHandlerProps {
  queryData: GetCovidVaccinationDetailsQuery
  mutationData: UpdateCovidVaccinationMutation | null | undefined
  mutationInFlight: boolean
  mutation: MutationFunction<
    UpdateCovidVaccinationMutation,
    MutationUpdateCovidVaccinationArgs
  >
}

const FormikStateHandler: FC<FormikStateHandlerProps> = ({
  queryData,
  mutationData,
  mutationInFlight,
  mutation,
}) => {
  const initialFormState = buildInitialFormValues(queryData)

  const handleOnSubmit = (formValues: FormValues): void => {
    mutation({
      variables: { input: buildMutationVariables(formValues) },
    })
  }

  return (
    <Formik
      validateOnBlur={false}
      validateOnMount={false}
      validationSchema={validationSchema(queryData.states)}
      initialValues={initialFormState}
      onSubmit={handleOnSubmit}
    >
      {(formikProps): ReactNode => {
        return (
          <FormNavigationHandler<FormValues>
            formikProps={formikProps}
            submissionInFlight={mutationInFlight}
            initialFormState={initialFormState}
            successfulMutation={
              !!mutationData?.updateCovidVaccination?.covidVaccination
            }
          >
            <FormFields
              formikProps={formikProps}
              stateList={queryData.states}
            />
          </FormNavigationHandler>
        )
      }}
    </Formik>
  )
}

const CovidVaccinationForm: FC = () => {
  return (
    <GraphQLFormHandler<
      GetCovidVaccinationDetailsQuery,
      UpdateCovidVaccinationMutation,
      MutationUpdateCovidVaccinationArgs
    >
      queryDocument={GET_VACCINATION_DETAILS}
      mutationDocument={UPDATE_VACCINATION_DETAILS}
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

export default CovidVaccinationForm
