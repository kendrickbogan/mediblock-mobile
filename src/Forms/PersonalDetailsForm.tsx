import React, { FC, ReactNode } from "react"
import { gql, MutationFunction } from "@apollo/client"
import _ from "lodash"
import * as yup from "yup"
import { Formik, FormikProps } from "formik"

import {
  UpdatePersonalDetailsMutation,
  GetPersonalDetailsQuery,
  MutationUpdatePersonalDetailsArgs,
  LegalGender,
} from "../generated/graphql"

import {
  TextField,
  Dropdown,
  GraphQLFormHandler,
  FormNavigationHandler,
} from "./formHelpers"

const GET_PERSONAL_DETAILS = gql`
  query GetPersonalDetails {
    personalDetails {
      id
      firstName
      lastName
      middleName
      maidenName
      suffix
      providerProfessionType
      legalGender
      cellPhoneNumber
      emergencyContactNumber
    }
  }
`

const UPDATE_PERSONAL_DETAILS = gql`
  mutation UpdatePersonalDetails($input: UpdatePersonalDetailsMutationInput!) {
    updatePersonalDetails(input: $input) {
      personalDetails {
        id
        firstName
      }
    }
  }
`

interface FormValues {
  firstName: string
  lastName: string
  middleName: string
  maidenName: string
  suffix: string
  providerProfessionType: string
  legalGender: LegalGender
}

const buildInitialFormValues = (
  data: GetPersonalDetailsQuery | undefined,
): FormValues => {
  return {
    firstName: data?.personalDetails?.firstName || "",
    lastName: data?.personalDetails?.lastName || "",
    middleName: data?.personalDetails?.middleName || "",
    maidenName: data?.personalDetails?.maidenName || "",
    suffix: data?.personalDetails?.suffix || "",
    providerProfessionType: data?.personalDetails?.providerProfessionType || "",
    legalGender: data?.personalDetails?.legalGender || LegalGender.NotKnown,
  }
}

const validationSchema = yup.object().shape({
  firstName: yup.string().required("Please provide a first name"),
  lastName: yup.string().required("Please provide a last name"),
  middleName: yup.string(),
  maidenName: yup.string(),
  suffix: yup.string(),
  providerProfessionType: yup.string(),
  legalGender: yup.mixed().oneOf(Object.values(LegalGender)),
})

interface FormProps {
  formikProps: FormikProps<FormValues>
}

const Form: FC<FormProps> = ({
  formikProps: { errors, values, handleChange, setFieldValue },
}) => {
  return (
    <>
      <TextField
        label="First Name"
        value={values.firstName}
        updateValue={handleChange("firstName")}
        errors={errors.firstName}
      />
      <TextField
        label="Last Name"
        value={values.lastName}
        updateValue={handleChange("lastName")}
        errors={errors.lastName}
      />
      <TextField
        label="Middle Name"
        value={values.middleName}
        updateValue={handleChange("middleName")}
        errors={errors.middleName}
      />
      <TextField
        label="Maiden Name"
        value={values.maidenName}
        updateValue={handleChange("maidenName")}
        errors={errors.maidenName}
      />
      <TextField
        label="Suffix"
        value={values.suffix}
        updateValue={handleChange("suffix")}
        errors={errors.suffix}
      />
      <TextField
        label="Provider/profession type"
        value={values.providerProfessionType}
        updateValue={handleChange("providerProfessionType")}
        errors={errors.providerProfessionType}
      />
      <Dropdown<LegalGender>
        label="Legal gender"
        value={values.legalGender}
        onValueChange={(value: LegalGender): void => {
          setFieldValue("legalGender", value)
        }}
        options={[
          { label: "Male", value: LegalGender.Male },
          { label: "Female", value: LegalGender.Female },
        ]}
        errors={errors.legalGender}
      />
    </>
  )
}

interface FormikStateHandlerProps {
  queryData: GetPersonalDetailsQuery
  mutationData: UpdatePersonalDetailsMutation | null | undefined
  mutationInFlight: boolean
  mutation: MutationFunction<
    UpdatePersonalDetailsMutation,
    MutationUpdatePersonalDetailsArgs
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
              !!mutationData?.updatePersonalDetails?.personalDetails
            }
          >
            <Form formikProps={formikProps} />
          </FormNavigationHandler>
        )
      }}
    </Formik>
  )
}

const PersonalDetailsForm: FC = () => {
  return (
    <GraphQLFormHandler<
      GetPersonalDetailsQuery,
      UpdatePersonalDetailsMutation,
      MutationUpdatePersonalDetailsArgs
    >
      queryDocument={GET_PERSONAL_DETAILS}
      mutationDocument={UPDATE_PERSONAL_DETAILS}
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

export default PersonalDetailsForm
