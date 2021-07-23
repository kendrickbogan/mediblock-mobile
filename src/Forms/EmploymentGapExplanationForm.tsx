import React, { FC, ReactNode } from "react"
import { gql, MutationFunction } from "@apollo/client"
import { Formik } from "formik"

import {
  GetEmploymentGapDetailsQuery,
  UpdateEmploymentGapDetailsMutation,
  MutationUpdateEmploymentGapArgs,
} from "../generated/graphql"

import {
  GraphQLFormHandler,
  TextField,
  FormNavigationHandler,
} from "./formHelpers"

const GET_EMPLOYMENT_GAP_DETAILS = gql`
  query GetEmploymentGapDetails {
    personalDetails {
      id
      employmentGap {
        text
      }
    }
  }
`

const UPDATE_EMPLOYMENT_GAP_DETAILS = gql`
  mutation UpdateEmploymentGapDetails(
    $input: UpdateEmploymentGapMutationInput!
  ) {
    updateEmploymentGap(input: $input) {
      employmentGap {
        text
      }
    }
  }
`

type FormValues = {
  text: string
}

const buildInitialFormValues = ({
  personalDetails,
}: GetEmploymentGapDetailsQuery): FormValues => {
  return {
    text: personalDetails?.employmentGap?.text || "",
  }
}

interface FormikStateHandlerProps {
  queryData: GetEmploymentGapDetailsQuery
  mutationData: UpdateEmploymentGapDetailsMutation | null | undefined
  mutationInFlight: boolean
  mutation: MutationFunction<
    UpdateEmploymentGapDetailsMutation,
    MutationUpdateEmploymentGapArgs
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
      variables: { input: formValues },
    })
  }

  return (
    <Formik
      validateOnBlur={false}
      validateOnMount={false}
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
              !!mutationData?.updateEmploymentGap?.employmentGap?.text
            }
          >
            <TextField
              label="Explanation for emplyoment gap"
              value={formikProps.values.text}
              updateValue={formikProps.handleChange("text")}
              errors={formikProps.errors.text}
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
      GetEmploymentGapDetailsQuery,
      UpdateEmploymentGapDetailsMutation,
      MutationUpdateEmploymentGapArgs
    >
      queryDocument={GET_EMPLOYMENT_GAP_DETAILS}
      mutationDocument={UPDATE_EMPLOYMENT_GAP_DETAILS}
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
