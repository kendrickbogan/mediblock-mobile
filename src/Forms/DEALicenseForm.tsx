import React, { FC, ReactNode } from "react"
import { gql, MutationFunction } from "@apollo/client"
import * as yup from "yup"
import { Formik, FormikProps } from "formik"

import {
  GetDeaLicenseDetailsQuery,
  UpdateDeaLicenseMutation,
  MutationUpdateDeaLicenseArgs,
  UpdateDeaLicenseMutationInput,
} from "../generated/graphql"

import {
  TextField,
  DatePickerField,
  GraphQLFormHandler,
  FormNavigationHandler,
  SwitchField,
} from "./formHelpers"
import { dateOrToday } from "../dateTimeUtils"

const GET_DEA_LICENSE = gql`
  query GetDeaLicenseDetails {
    personalDetails {
      id
      deaLicense {
        registrationNumber
        expiresAt
        status
        unrestricted
      }
    }
  }
`

const UPDATE_DEA_LICENSE = gql`
  mutation UpdateDeaLicense($input: UpdateDEALicenseMutationInput!) {
    updateDeaLicense(input: $input) {
      deaLicense {
        registrationNumber
      }
    }
  }
`

interface FormValues {
  registrationNumber: string
  expiresAt: Date
  status: string
  unrestricted: boolean
}

const buildInitialFormValues = ({
  personalDetails,
}: GetDeaLicenseDetailsQuery): FormValues => {
  return {
    registrationNumber: personalDetails?.deaLicense?.registrationNumber || "",
    expiresAt: dateOrToday(personalDetails?.deaLicense?.expiresAt),
    status: personalDetails?.deaLicense?.status || "",
    unrestricted: personalDetails?.deaLicense?.unrestricted || false,
  }
}

const buildMutationVariables = ({
  registrationNumber,
  expiresAt,
  status,
  unrestricted,
}: FormValues): UpdateDeaLicenseMutationInput => {
  return {
    registrationNumber,
    expiresAt,
    status,
    unrestricted,
  }
}

const validationSchema = yup.object().shape({
  registrationNumber: yup.string(),
  status: yup.string(),
})

interface FormFieldsProps {
  formikProps: FormikProps<FormValues>
}

const FormFields: FC<FormFieldsProps> = ({
  formikProps: { errors, values, handleChange, setFieldValue },
}) => {
  return (
    <>
      <TextField
        label="DEA registration number"
        value={values.registrationNumber}
        updateValue={handleChange("registrationNumber")}
        errors={errors.registrationNumber}
      />
      <DatePickerField
        label="Expiration date"
        value={values.expiresAt}
        updateValue={(_event: Event, value: Date | undefined): void => {
          setFieldValue("expiresAt", value)
        }}
        errors={errors.expiresAt}
        isExpirationDate
      />
      <TextField
        label="Status"
        value={values.status}
        updateValue={handleChange("status")}
        errors={errors.status}
      />
      <SwitchField
        label="Unrestricted license?"
        value={values.unrestricted}
        updateValue={(value: boolean): void => {
          setFieldValue("unrestricted", value)
        }}
        errors={errors.unrestricted}
      />
    </>
  )
}

interface FormikStateHandlerProps {
  queryData: GetDeaLicenseDetailsQuery
  mutationData: UpdateDeaLicenseMutation | null | undefined
  mutationInFlight: boolean
  mutation: MutationFunction<
    UpdateDeaLicenseMutation,
    MutationUpdateDeaLicenseArgs
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
              !!mutationData?.updateDeaLicense?.deaLicense?.registrationNumber
            }
          >
            <FormFields formikProps={formikProps} />
          </FormNavigationHandler>
        )
      }}
    </Formik>
  )
}

const DEALicenseForm: FC = () => {
  return (
    <GraphQLFormHandler<
      GetDeaLicenseDetailsQuery,
      UpdateDeaLicenseMutation,
      MutationUpdateDeaLicenseArgs
    >
      queryDocument={GET_DEA_LICENSE}
      mutationDocument={UPDATE_DEA_LICENSE}
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

export default DEALicenseForm
