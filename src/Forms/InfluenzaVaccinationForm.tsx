import React, { FC, ReactNode } from "react"
import { gql, MutationFunction } from "@apollo/client"
import { Formik, FormikProps } from "formik"
import * as yup from "yup"

import {
  GetInfluenzaVaccinationQuery,
  UpdateInfluenzaVaccinationMutation,
  MutationUpdateInfluenzaVaccinationArgs,
  UpdateInfluenzaVaccinationMutationInput,
} from "../generated/graphql"
import {
  TextField,
  GraphQLFormHandler,
  FormNavigationHandler,
  SwitchField,
  AutocompleteField,
  DatePickerField,
} from "./formHelpers"
import { dateOrToday } from "../dateTimeUtils"

const GET_INFLUENZA_VACCINATION = gql`
  query GetInfluenzaVaccination {
    personalDetails {
      id
      influenzaVaccination {
        hasBeenVaccinated
        noVaccinationComment
        vaccinatedAt
        fluSeason
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

const UPDATE_INFLUENZA_VACCINATION = gql`
  mutation UpdateInfluenzaVaccination(
    $input: UpdateInfluenzaVaccinationMutationInput!
  ) {
    updateInfluenzaVaccination(input: $input) {
      influenzaVaccination {
        hasBeenVaccinated
      }
    }
  }
`

interface FormValues {
  hasBeenVaccinated: boolean
  noVaccinationComment: string
  vaccinationDate: Date
  fluSeason: string
  facilityName: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  zip: string
}

const buildInitialFormValues = ({
  personalDetails,
}: GetInfluenzaVaccinationQuery): FormValues => {
  return {
    hasBeenVaccinated:
      personalDetails?.influenzaVaccination?.hasBeenVaccinated || false,
    noVaccinationComment:
      personalDetails?.influenzaVaccination?.noVaccinationComment || "",
    vaccinationDate: dateOrToday(
      personalDetails?.influenzaVaccination?.vaccinatedAt,
    ),
    fluSeason: personalDetails?.influenzaVaccination?.fluSeason || "",
    facilityName: personalDetails?.influenzaVaccination?.facilityName || "",
    addressLine1: personalDetails?.influenzaVaccination?.addressLine1 || "",
    addressLine2: personalDetails?.influenzaVaccination?.addressLine2 || "",
    city: personalDetails?.influenzaVaccination?.city || "",
    state: personalDetails?.influenzaVaccination?.state || "",
    zip: personalDetails?.influenzaVaccination?.zip || "",
  }
}

const buildMutationVariables = ({
  hasBeenVaccinated,
  noVaccinationComment,
  vaccinationDate,
  fluSeason,
  facilityName,
  addressLine1,
  addressLine2,
  city,
  state,
  zip,
}: FormValues): UpdateInfluenzaVaccinationMutationInput => {
  const valueIfFlag = <T extends unknown>(
    value: T,
    flag: boolean,
  ): T | null => {
    return flag ? value : null
  }

  return {
    hasBeenVaccinated,
    noVaccinationComment: valueIfFlag(noVaccinationComment, !hasBeenVaccinated),
    vaccinatedAt: valueIfFlag(vaccinationDate, hasBeenVaccinated),
    fluSeason: valueIfFlag(fluSeason, hasBeenVaccinated),
    facilityName: valueIfFlag(facilityName, hasBeenVaccinated),
    addressLine1: valueIfFlag(addressLine1, hasBeenVaccinated),
    addressLine2: valueIfFlag(addressLine2, hasBeenVaccinated),
    city: valueIfFlag(city, hasBeenVaccinated),
    state: valueIfFlag(state, hasBeenVaccinated),
    zip: valueIfFlag(zip, hasBeenVaccinated),
  }
}

const validationSchema = yup.object().shape({
  noVaccinationComment: yup.string().when("hasBeenVaccinated", {
    is: false,
    then: yup.string(),
  }),
  fluSeason: yup.string().when("hasBeenVaccinated", {
    is: true,
    then: yup.string(),
  }),
})

interface FormFieldsProps {
  formikProps: FormikProps<FormValues>
  states: string[]
}

const FormFields: FC<FormFieldsProps> = ({
  formikProps: { errors, values, handleChange, setFieldValue },
  states,
}) => {
  return (
    <>
      <SwitchField
        label="Have you had an influenza vaccination within the last year?"
        value={values.hasBeenVaccinated}
        updateValue={(value: boolean): void => {
          setFieldValue("hasBeenVaccinated", value)
        }}
        errors={errors.hasBeenVaccinated}
      />
      {values.hasBeenVaccinated ? (
        <>
          <DatePickerField
            label="Vaccination date"
            value={values.vaccinationDate}
            updateValue={(_event: Event, value: Date | undefined): void => {
              setFieldValue("vaccinationDate", value)
            }}
            errors={errors.vaccinationDate}
          />
          <TextField
            label="Flu season"
            value={values.fluSeason}
            updateValue={handleChange("fluSeason")}
            errors={errors.fluSeason}
          />
          <TextField
            label="Facility name"
            value={values.facilityName}
            updateValue={handleChange("facilityName")}
            errors={errors.facilityName}
          />
          <TextField
            label="Address line 1"
            value={values.addressLine1}
            updateValue={handleChange("addressLine1")}
            errors={errors.addressLine1}
          />
          <TextField
            label="Address line 2"
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
            label="State"
            errors={errors.state}
            value={values.state}
            updateValue={handleChange("state")}
            suggestionsList={states}
          />
          <TextField
            label="Zip"
            value={values.zip}
            updateValue={handleChange("zip")}
            errors={errors.zip}
          />
        </>
      ) : (
        <TextField
          label="No vaccination comment"
          value={values.noVaccinationComment}
          updateValue={handleChange("noVaccinationComment")}
          errors={errors.noVaccinationComment}
        />
      )}
    </>
  )
}

interface FormikStateHandlerProps {
  queryData: GetInfluenzaVaccinationQuery
  mutationData: UpdateInfluenzaVaccinationMutation | null | undefined
  mutationInFlight: boolean
  mutation: MutationFunction<
    UpdateInfluenzaVaccinationMutation,
    MutationUpdateInfluenzaVaccinationArgs
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
      validationSchema={validationSchema}
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
              !!mutationData?.updateInfluenzaVaccination?.influenzaVaccination
            }
          >
            <FormFields formikProps={formikProps} states={queryData.states} />
          </FormNavigationHandler>
        )
      }}
    </Formik>
  )
}

const InfluenzaVaccinationForm: FC = () => {
  return (
    <GraphQLFormHandler<
      GetInfluenzaVaccinationQuery,
      UpdateInfluenzaVaccinationMutation,
      MutationUpdateInfluenzaVaccinationArgs
    >
      queryDocument={GET_INFLUENZA_VACCINATION}
      mutationDocument={UPDATE_INFLUENZA_VACCINATION}
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

export default InfluenzaVaccinationForm
