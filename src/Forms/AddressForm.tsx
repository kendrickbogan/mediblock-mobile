import React, { ReactNode, FC } from "react"
import { FormikProps, Formik } from "formik"
import { View } from "react-native"
import { gql, MutationFunction } from "@apollo/client"
import * as yup from "yup"
import {
  GetAddressesQuery,
  UpdateAddressesMutation,
  MutationUpdateAddressesArgs,
} from "../generated/graphql"

import {
  TextField,
  SwitchField,
  GraphQLFormHandler,
  FormNavigationHandler,
} from "./formHelpers"

const GET_ADDRESSES = gql`
  query GetAddresses {
    personalDetails {
      id
      homeAddressLine1
      homeAddressLine2
      homeAddressLine3
      homeAddressCity
      homeAddressState
      homeAddressZip
      homeAddressCountry
      mailingAddressSameAsHome
      mailingAddressLine1
      mailingAddressLine2
      mailingAddressLine3
      mailingAddressCity
      mailingAddressState
      mailingAddressZip
      mailingAddressCountry
    }
  }
`
const UPDATE_ADDRESSES = gql`
  mutation UpdateAddresses($input: UpdateAddressesMutationInput!) {
    updateAddresses(input: $input) {
      personalDetails {
        id
        homeAddressLine1
      }
    }
  }
`

interface FormValues {
  homeAddressLine1: string
  homeAddressLine2: string
  homeAddressLine3: string
  homeAddressCity: string
  homeAddressState: string
  homeAddressCountry: string
  homeAddressZip: string
  mailingAddressSameAsHome: boolean
  mailingAddressLine1: string
  mailingAddressLine2: string
  mailingAddressLine3: string
  mailingAddressCity: string
  mailingAddressState: string
  mailingAddressCountry: string
  mailingAddressZip: string
}

const buildInitialValues = (data: GetAddressesQuery): FormValues => {
  return {
    homeAddressLine1: data.personalDetails?.homeAddressLine1 || "",
    homeAddressLine2: data.personalDetails?.homeAddressLine2 || "",
    homeAddressLine3: data.personalDetails?.homeAddressLine3 || "",
    homeAddressCity: data.personalDetails?.homeAddressCity || "",
    homeAddressState: data.personalDetails?.homeAddressState || "",
    homeAddressCountry: data.personalDetails?.homeAddressCountry || "",
    homeAddressZip: data.personalDetails?.homeAddressZip || "",
    mailingAddressSameAsHome:
      data.personalDetails?.mailingAddressSameAsHome || false,
    mailingAddressLine1: data.personalDetails?.mailingAddressLine1 || "",
    mailingAddressLine2: data.personalDetails?.mailingAddressLine2 || "",
    mailingAddressLine3: data.personalDetails?.mailingAddressLine3 || "",
    mailingAddressCity: data.personalDetails?.mailingAddressCity || "",
    mailingAddressState: data.personalDetails?.mailingAddressState || "",
    mailingAddressCountry: data.personalDetails?.mailingAddressCountry || "",
    mailingAddressZip: data.personalDetails?.mailingAddressZip || "",
  }
}

const validationSchema = yup.object().shape({
  homeAddressLine1: yup.string(),
  homeAddressLine2: yup.string(),
  homeAddressLine3: yup.string(),
  homeAddressCity: yup.string(),
  homeAddressState: yup.string(),
  homeAddressCountry: yup.string(),
  homeAddressZip: yup.string(),
  mailingAddressSameAsHome: yup.boolean(),
  mailingAddressLine1: yup.string().when("mailingAddressSameAsHome", {
    is: false,
    then: yup.string(),
  }),
  mailingAddressLine2: yup.string(),
  mailingAddressLine3: yup.string(),
  mailingAddressCity: yup.string().when("mailingAddressSameAsHome", {
    is: false,
    then: yup.string(),
  }),
  mailingAddressState: yup.string().when("mailingAddressSameAsHome", {
    is: false,
    then: yup.string(),
  }),
  mailingAddressCountry: yup.string().when("mailingAddressSameAsHome", {
    is: false,
    then: yup.string(),
  }),
  mailingAddressZip: yup.string().when("mailingAddressSameAsHome", {
    is: false,
    then: yup.string(),
  }),
})

interface FormProps {
  formikProps: FormikProps<FormValues>
}

const Form: FC<FormProps> = ({
  formikProps: { errors, values, handleChange, setFieldValue },
}) => {
  return (
    <View>
      <TextField
        label="Home Address Line 1"
        errors={errors.homeAddressLine1}
        value={values.homeAddressLine1}
        updateValue={handleChange("homeAddressLine1")}
      />
      <TextField
        label="Home Address Line 2"
        errors={errors.homeAddressLine2}
        value={values.homeAddressLine2}
        updateValue={handleChange("homeAddressLine2")}
      />
      <TextField
        label="Home Address Line 3"
        errors={errors.homeAddressLine3}
        value={values.homeAddressLine3}
        updateValue={handleChange("homeAddressLine3")}
      />
      <TextField
        label="Home Address City"
        errors={errors.homeAddressCity}
        value={values.homeAddressCity}
        updateValue={handleChange("homeAddressCity")}
      />
      <TextField
        label="Home Address State"
        errors={errors.homeAddressState}
        value={values.homeAddressState}
        updateValue={handleChange("homeAddressState")}
      />
      <TextField
        label="Home Address Zip"
        errors={errors.homeAddressZip}
        value={values.homeAddressZip}
        updateValue={handleChange("homeAddressZip")}
      />
      <TextField
        label="Home Address Country"
        errors={errors.homeAddressCountry}
        value={values.homeAddressCountry}
        updateValue={handleChange("homeAddressCountry")}
      />
      <SwitchField
        label="Mailing address same as home address?"
        errors={errors.mailingAddressSameAsHome}
        value={values.mailingAddressSameAsHome}
        updateValue={(value: boolean): void =>
          setFieldValue("mailingAddressSameAsHome", value)
        }
      />
      {!values.mailingAddressSameAsHome && (
        <>
          <TextField
            label="Mailing Address Line 1"
            errors={errors.mailingAddressLine1}
            value={values.mailingAddressLine1}
            updateValue={handleChange("mailingAddressLine1")}
          />
          <TextField
            label="Mailing Address Line 2"
            errors={errors.mailingAddressLine2}
            value={values.mailingAddressLine2}
            updateValue={handleChange("mailingAddressLine2")}
          />
          <TextField
            label="Mailing Address Line 3"
            errors={errors.mailingAddressLine3}
            value={values.mailingAddressLine3}
            updateValue={handleChange("mailingAddressLine3")}
          />
          <TextField
            label="Mailing Address City"
            errors={errors.mailingAddressCity}
            value={values.mailingAddressCity}
            updateValue={handleChange("mailingAddressCity")}
          />
          <TextField
            label="Mailing Address State"
            errors={errors.mailingAddressState}
            value={values.mailingAddressState}
            updateValue={handleChange("mailingAddressState")}
          />
          <TextField
            label="Mailing Address Zip"
            errors={errors.mailingAddressZip}
            value={values.mailingAddressZip}
            updateValue={handleChange("mailingAddressZip")}
          />
          <TextField
            label="Mailing Address Country"
            errors={errors.mailingAddressCountry}
            value={values.mailingAddressCountry}
            updateValue={handleChange("mailingAddressCountry")}
          />
        </>
      )}
    </View>
  )
}

interface FormikStateHandlerProps {
  queryData: GetAddressesQuery
  mutationData: UpdateAddressesMutation | null | undefined
  mutationInFlight: boolean
  mutation: MutationFunction<
    UpdateAddressesMutation,
    MutationUpdateAddressesArgs
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
            successfulMutation={!!mutationData?.updateAddresses}
          >
            <Form formikProps={formikProps} />
          </FormNavigationHandler>
        )
      }}
    </Formik>
  )
}

const AddressForm: FC = () => {
  return (
    <GraphQLFormHandler<
      GetAddressesQuery,
      UpdateAddressesMutation,
      MutationUpdateAddressesArgs
    >
      queryDocument={GET_ADDRESSES}
      mutationDocument={UPDATE_ADDRESSES}
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

export default AddressForm
