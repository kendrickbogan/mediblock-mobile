import React, { FC, ReactNode } from "react"
import { gql, MutationFunction } from "@apollo/client"
import _ from "lodash"
import * as yup from "yup"
import { Formik, FormikProps } from "formik"

import {
  GetDriversLicenseDetailsQuery,
  UpdateDriversLicenseMutation,
  MutationUpdateDriversLicenseArgs,
} from "../generated/graphql"
import { dateOrToday } from "../dateTimeUtils"
import {
  DatePickerField,
  FormNavigationHandler,
  GraphQLFormHandler,
  TextField,
} from "./formHelpers"

const GET_DRIVERS_LICENSE = gql`
  query GetDriversLicenseDetails {
    personalDetails {
      id
      driversLicense {
        expiresAt
        issuingState
        number
      }
    }
  }
`

const UPDATE_DRIVERS_LICENSE = gql`
  mutation UpdateDriversLicense($input: UpdateDriversLicenseMutationInput!) {
    updateDriversLicense(input: $input) {
      driversLicense {
        number
      }
    }
  }
`

interface FormValues {
  expiresAt: Date
  number: string
  issuingState: string
}

const buildInitialValues = ({
  personalDetails,
}: GetDriversLicenseDetailsQuery): FormValues => {
  return {
    expiresAt: dateOrToday(personalDetails?.driversLicense?.expiresAt),
    number: personalDetails?.driversLicense?.number || "",
    issuingState: personalDetails?.driversLicense?.issuingState || "",
  }
}

const validationSchema = yup.object().shape({
  expiresAt: yup.date(),
  issuingState: yup.string(),
  number: yup.string(),
})

interface FormProps {
  formikProps: FormikProps<FormValues>
}

const Form: FC<FormProps> = ({
  formikProps: { errors, values, handleChange, setFieldValue },
}) => {
  return (
    <>
      <DatePickerField
        label="Expiration Date"
        value={values.expiresAt}
        updateValue={(_event: Event, value: Date | undefined): void => {
          setFieldValue("expiresAt", value)
        }}
        errors={errors.expiresAt}
        isExpirationDate
      />
      <TextField
        label="Number"
        value={values.number}
        updateValue={handleChange("number")}
        errors={errors.number}
      />
      <TextField
        label="Issuing State"
        value={values.issuingState}
        updateValue={handleChange("issuingState")}
        errors={errors.issuingState}
      />
    </>
  )
}

interface FormikStateHandlerProps {
  queryData: GetDriversLicenseDetailsQuery
  mutationData: UpdateDriversLicenseMutation | null | undefined
  mutationInFlight: boolean
  mutation: MutationFunction<
    UpdateDriversLicenseMutation,
    MutationUpdateDriversLicenseArgs
  >
}

const FormikStateHandler: FC<FormikStateHandlerProps> = ({
  queryData,
  mutationData,
  mutationInFlight,
  mutation,
}) => {
  const initialFormState = buildInitialValues(queryData)

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={validationSchema}
      initialValues={initialFormState}
      onSubmit={(values): void => {
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
              !!mutationData?.updateDriversLicense?.driversLicense?.number
            }
          >
            <Form formikProps={formikProps} />
          </FormNavigationHandler>
        )
      }}
    </Formik>
  )
}

const DriversLicenseForm: FC = () => {
  return (
    <GraphQLFormHandler<
      GetDriversLicenseDetailsQuery,
      UpdateDriversLicenseMutation,
      MutationUpdateDriversLicenseArgs
    >
      queryDocument={GET_DRIVERS_LICENSE}
      mutationDocument={UPDATE_DRIVERS_LICENSE}
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

export default DriversLicenseForm
