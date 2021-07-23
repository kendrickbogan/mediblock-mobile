import React, { ReactNode, FC } from "react"
import { FormikProps, Formik } from "formik"
import { View } from "react-native"
import { gql } from "@apollo/client"
import { isEmpty } from "lodash"
import {
  GetBirthAndCitizenshipDetailsQuery,
  UpdateBirthAndCitizenshipMutation,
  MutationUpdateBirthAndCitizenshipArgs,
} from "../generated/graphql"

import { dateOrToday } from "../dateTimeUtils"
import {
  AutocompleteField,
  TextField,
  SwitchField,
  GraphQLFormHandler,
  DatePickerField,
  FormNavigationHandler,
} from "./formHelpers"

import { Layout } from "../styles"

const GET_BIRTH_AND_CITIZENSHIP = gql`
  query GetBirthAndCitizenshipDetails {
    personalDetails {
      id
      countryOfCitizenship
      dateOfBirth
      placeOfBirthCity
      placeOfBirthState
      placeOfBirthCountry
      visaType
      visaNumber
      visaStatus
      visaExpiresAt
      usPermanentResident
    }
    countries
  }
`
const UPDATE_BIRTH_AND_CITIZENSHIP = gql`
  mutation UpdateBirthAndCitizenship(
    $input: UpdateBirthAndCitizenshipMutationInput!
  ) {
    updateBirthAndCitizenship(input: $input) {
      personalDetails {
        id
        dateOfBirth
      }
    }
  }
`

interface FormValues {
  countryOfCitizenship: string
  dateOfBirth: Date
  placeOfBirthCity: string
  placeOfBirthState: string
  placeOfBirthCountry: string
  visaType: string
  visaNumber: string
  visaStatus: string
  visaExpiresAt: Date
  usPermanentResident: boolean
}

const initialValues = (
  data: GetBirthAndCitizenshipDetailsQuery,
): FormValues => {
  return {
    dateOfBirth: dateOrToday(data.personalDetails?.dateOfBirth),
    placeOfBirthCity: data.personalDetails?.placeOfBirthCity || "",
    placeOfBirthState: data.personalDetails?.placeOfBirthState || "",
    placeOfBirthCountry: data.personalDetails?.placeOfBirthCountry || "",
    countryOfCitizenship: data.personalDetails?.countryOfCitizenship || "",
    visaType: data.personalDetails?.visaType || "",
    visaNumber: data.personalDetails?.visaNumber || "",
    visaStatus: data.personalDetails?.visaStatus || "",
    visaExpiresAt: dateOrToday(data.personalDetails?.visaExpiresAt),
    usPermanentResident: data.personalDetails?.usPermanentResident || false,
  }
}

const hideVisaFields = (countryOfCitizenship: string): boolean => {
  return (
    isEmpty(countryOfCitizenship) || countryOfCitizenship == "United States"
  )
}

interface FormProps {
  formikProps: FormikProps<FormValues>
  countriesList: string[]
}

const Form: FC<FormProps> = ({
  formikProps: { errors, values, handleChange, setFieldValue },
  countriesList,
}) => {
  return (
    <View>
      <DatePickerField
        label="Date of birth"
        errors={errors.dateOfBirth}
        value={values.dateOfBirth}
        updateValue={(_event: Event, value: Date | undefined): void => {
          setFieldValue("dateOfBirth", value)
        }}
      />
      <TextField
        label="Place of birth city"
        errors={errors.placeOfBirthCity}
        value={values.placeOfBirthCity}
        updateValue={handleChange("placeOfBirthCity")}
      />
      <TextField
        label="Place of birth state"
        errors={errors.placeOfBirthState}
        value={values.placeOfBirthState}
        updateValue={handleChange("placeOfBirthState")}
      />
      <AutocompleteField
        label="Place of birth country"
        errors={errors.placeOfBirthCountry}
        value={values.placeOfBirthCountry}
        updateValue={handleChange("placeOfBirthCountry")}
        suggestionsList={countriesList}
        zIndex={Layout.zIndex.max + 1}
      />
      <AutocompleteField
        label="Country of citizenship"
        errors={errors.countryOfCitizenship}
        value={values.countryOfCitizenship}
        updateValue={handleChange("countryOfCitizenship")}
        suggestionsList={countriesList}
      />
      {!hideVisaFields(values.countryOfCitizenship) && (
        <>
          <TextField
            label="Visa Type"
            errors={errors.visaType}
            value={values.visaType}
            updateValue={handleChange("visaType")}
          />
          <TextField
            label="Visa number"
            errors={errors.visaNumber}
            value={values.visaNumber}
            updateValue={handleChange("visaNumber")}
          />
          <TextField
            label="Visa status"
            errors={errors.visaStatus}
            value={values.visaStatus}
            updateValue={handleChange("visaStatus")}
          />
          <DatePickerField
            label="Visa expiration date"
            errors={errors.visaExpiresAt}
            value={values.visaExpiresAt}
            updateValue={(_event: Event, value: Date | undefined): void => {
              setFieldValue("visaExpiresAt", value)
            }}
            isExpirationDate
          />
          <SwitchField
            label="Do you have a legal right to reside permanently and work in the US?"
            errors={errors.usPermanentResident}
            value={values.usPermanentResident}
            updateValue={(value: boolean): void =>
              setFieldValue("usPermanentResident", value)
            }
          />
        </>
      )}
    </View>
  )
}

const BirthAndCitizenshipForm: FC = () => {
  return (
    <GraphQLFormHandler<
      GetBirthAndCitizenshipDetailsQuery,
      UpdateBirthAndCitizenshipMutation,
      MutationUpdateBirthAndCitizenshipArgs
    >
      queryDocument={GET_BIRTH_AND_CITIZENSHIP}
      mutationDocument={UPDATE_BIRTH_AND_CITIZENSHIP}
    >
      {(queryData, mutationData, mutationInFlight, mutation): JSX.Element => {
        const initialFormState = initialValues(queryData)

        return (
          <Formik
            validateOnBlur={false}
            validateOnMount={false}
            initialValues={initialFormState}
            onSubmit={(values: FormValues): void => {
              mutation({ variables: { input: values } })
            }}
          >
            {(formikProps): ReactNode => {
              return (
                <FormNavigationHandler<FormValues>
                  formikProps={formikProps}
                  submissionInFlight={mutationInFlight}
                  initialFormState={initialFormState}
                  successfulMutation={
                    !!mutationData?.updateBirthAndCitizenship?.personalDetails
                  }
                >
                  <Form
                    formikProps={formikProps}
                    countriesList={queryData.countries}
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

export default BirthAndCitizenshipForm
