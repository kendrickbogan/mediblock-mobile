import React, { FC, ReactNode } from "react"
import { gql, MutationFunction } from "@apollo/client"
import * as yup from "yup"
import { Formik, FormikProps } from "formik"
import dayjs from "dayjs"

import {
  GetPassportDetailsQuery,
  UpdatePassportMutation,
  MutationUpdatePassportArgs,
} from "../generated/graphql"
import {
  TextField,
  DatePickerField,
  GraphQLFormHandler,
  FormNavigationHandler,
} from "./formHelpers"

const GET_DRIVERS_LICENSE = gql`
  query GetPassportDetails {
    personalDetails {
      id
      passport {
        expiresAt
        countryOfIssue
        number
      }
    }
  }
`

const UPDATE_DRIVERS_LICENSE = gql`
  mutation UpdatePassport($input: UpdatePassportMutationInput!) {
    updatePassport(input: $input) {
      passport {
        number
      }
    }
  }
`

interface FormValues {
  expiresAt: Date
  countryOfIssue: string
  number: string
}

type ISO8601Timestamp = string

const dateOrToday = (apiValue: ISO8601Timestamp | undefined): Date => {
  if (apiValue) {
    return dayjs(apiValue).toDate()
  } else {
    return dayjs().toDate()
  }
}

const buildInitialValues = ({
  personalDetails,
}: GetPassportDetailsQuery): FormValues => {
  return {
    expiresAt: dateOrToday(personalDetails?.passport?.expiresAt),
    number: personalDetails?.passport?.number || "",
    countryOfIssue: personalDetails?.passport?.countryOfIssue || "",
  }
}

const validationSchema = yup.object().shape({
  expiresAt: yup.date(),
  countryOfIssue: yup.string(),
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
        label="Country of issue"
        value={values.countryOfIssue}
        updateValue={handleChange("countryOfIssue")}
        errors={errors.countryOfIssue}
      />
    </>
  )
}

interface FormikStateHandlerProps {
  queryData: GetPassportDetailsQuery
  mutationData: UpdatePassportMutation | null | undefined
  mutationInFlight: boolean
  mutation: MutationFunction<UpdatePassportMutation, MutationUpdatePassportArgs>
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
      validateOnMount={false}
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
            successfulMutation={!!mutationData?.updatePassport?.passport}
          >
            <Form formikProps={formikProps} />
          </FormNavigationHandler>
        )
      }}
    </Formik>
  )
}

const PassportForm: FC = () => {
  return (
    <GraphQLFormHandler<
      GetPassportDetailsQuery,
      UpdatePassportMutation,
      MutationUpdatePassportArgs
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

export default PassportForm
