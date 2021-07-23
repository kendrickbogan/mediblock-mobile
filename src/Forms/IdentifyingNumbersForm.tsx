import React, { FC, ReactNode } from "react"
import { gql, MutationFunction } from "@apollo/client"
import _ from "lodash"
import * as yup from "yup"
import { Formik, FormikProps } from "formik"

import {
  GetIdNumbersQuery,
  UpdateIdNumbersMutation,
  MutationUpdateIdNumbersArgs,
} from "../generated/graphql"
import {
  TextField,
  GraphQLFormHandler,
  FormNavigationHandler,
} from "./formHelpers"

const GET_ID_NUMBERS = gql`
  query GetIdNumbers {
    personalDetails {
      id
      socialSecurityNumber
      npiNumber
      upinNumber
      personalMedicareNumber
      personalMedicaidNumber
      orcidId
      researcherId
      scopusAuthorId
    }
  }
`

const UPDATE_ID_NUMBERS = gql`
  mutation UpdateIdNumbers($input: UpdateIdNumbersMutationInput!) {
    updateIdNumbers(input: $input) {
      personalDetails {
        id
        npiNumber
      }
    }
  }
`

interface FormValues {
  socialSecurityNumber: string
  npiNumber: string
  upinNumber: string
  personalMedicareNumber: string
  personalMedicaidNumber: string
  orcidId: string
  researcherId: string
  scopusAuthorId: string
}

const buildInitialFormValues = (
  data: GetIdNumbersQuery | undefined,
): FormValues => {
  return {
    socialSecurityNumber: data?.personalDetails?.socialSecurityNumber || "",
    npiNumber: data?.personalDetails?.npiNumber || "",
    upinNumber: data?.personalDetails?.upinNumber || "",
    personalMedicaidNumber: data?.personalDetails?.personalMedicaidNumber || "",
    personalMedicareNumber: data?.personalDetails?.personalMedicareNumber || "",
    orcidId: data?.personalDetails?.orcidId || "",
    researcherId: data?.personalDetails?.researcherId || "",
    scopusAuthorId: data?.personalDetails?.scopusAuthorId || "",
  }
}

const validationSchema = yup.object().shape({
  npiNumber: yup.string().length(10, "NPI should be 10 digits long"),
  upinNumber: yup.string().length(6, "UPIN should be 10 digits long"),
  personalMedicareNumber: yup.string(),
  personalMedicaidNumber: yup.string(),
  socialSecurityNumber: yup.string().length(9, "SSN should be 9 digits long"),
  orcidId: yup.string(),
  researcherId: yup.string(),
  scopusAuthorId: yup.string(),
})

interface FormProps {
  formikProps: FormikProps<FormValues>
}

const Form: FC<FormProps> = ({
  formikProps: { errors, values, handleChange },
}) => {
  return (
    <>
      <TextField
        label="Social Security Number"
        value={values.socialSecurityNumber}
        updateValue={handleChange("socialSecurityNumber")}
        errors={errors.socialSecurityNumber}
      />
      <TextField
        label="NPI Number"
        value={values.npiNumber}
        updateValue={handleChange("npiNumber")}
        errors={errors.npiNumber}
      />
      <TextField
        label="UPIN Number"
        value={values.upinNumber}
        updateValue={handleChange("upinNumber")}
        errors={errors.upinNumber}
      />
      <TextField
        label="Personal Medicare Number"
        value={values.personalMedicareNumber}
        updateValue={handleChange("personalMedicareNumber")}
        errors={errors.personalMedicareNumber}
      />
      <TextField
        label="Personal Medicaid Number"
        value={values.personalMedicaidNumber}
        updateValue={handleChange("personalMedicaidNumber")}
        errors={errors.personalMedicaidNumber}
      />
      <TextField
        label="Open Researcher and Contributor ID (ORCID)"
        value={values.orcidId}
        updateValue={handleChange("orcidId")}
        errors={errors.orcidId}
      />
      <TextField
        label="ResearcherID"
        value={values.researcherId}
        updateValue={handleChange("researcherId")}
        errors={errors.researcherId}
      />
      <TextField
        label="Scopus Author Identifier Number"
        value={values.scopusAuthorId}
        updateValue={handleChange("scopusAuthorId")}
        errors={errors.scopusAuthorId}
      />
    </>
  )
}

interface FormikStateHandlerProps {
  queryData: GetIdNumbersQuery
  mutationData: UpdateIdNumbersMutation | null | undefined
  mutationInFlight: boolean
  mutation: MutationFunction<
    UpdateIdNumbersMutation,
    MutationUpdateIdNumbersArgs
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
              !!mutationData?.updateIdNumbers?.personalDetails
            }
          >
            <Form formikProps={formikProps} />
          </FormNavigationHandler>
        )
      }}
    </Formik>
  )
}

const IdentifyingNumbersForm: FC = () => {
  return (
    <GraphQLFormHandler<
      GetIdNumbersQuery,
      UpdateIdNumbersMutation,
      MutationUpdateIdNumbersArgs
    >
      queryDocument={GET_ID_NUMBERS}
      mutationDocument={UPDATE_ID_NUMBERS}
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

export default IdentifyingNumbersForm
