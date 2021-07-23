import React, { FC, ReactNode } from "react"
import { gql, MutationFunction } from "@apollo/client"
import * as yup from "yup"
import { Formik, FormikProps } from "formik"

import {
  GetProfessionalLiabilityInsuranceCarrierDetailsQuery,
  UpdateProfessionalLiabilityInsuranceCarrierMutation,
  MutationUpdateProfessionalLiabilityInsuranceCarrierArgs,
  UpdateProfessionalLiabilityInsuranceCarrierMutationInput,
} from "../generated/graphql"

import {
  TextField,
  GraphQLFormHandler,
  FormNavigationHandler,
  AutocompleteField,
} from "./formHelpers"

const GET_PROFESSIONAL_LIABILITY_INSURANCE_CARRIER = gql`
  query GetProfessionalLiabilityInsuranceCarrierDetails {
    personalDetails {
      id
      professionalLiabilityInsuranceCarrier {
        malpracticeType
        organizationName
        organizationAddressLine1
        organizationAddressLine2
        organizationCity
        organizationState
        organizationZip
        organizationPhoneNumber
        organizationEmailAddress
        organizationFaxNumber
        contactPersonFirstName
        contactPersonLastName
        contactPersonRole
        contactPersonPhoneNumber
        contactPersonEmailAddress
        contactPersonFaxNumber
      }
    }
    countries
    states
  }
`

const UPDATE_PROFESSIONAL_LIABILITY_INSURANCE_CARRIER = gql`
  mutation UpdateProfessionalLiabilityInsuranceCarrier(
    $input: UpdateProfessionalLiabilityInsuranceCarrierMutationInput!
  ) {
    updateProfessionalLiabilityInsuranceCarrier(input: $input) {
      professionalLiabilityInsuranceCarrier {
        malpracticeType
      }
    }
  }
`

interface FormValues {
  malpracticeType: string
  organizationName: string
  organizationAddressLine1: string
  organizationAddressLine2: string
  organizationCity: string
  organizationState: string
  organizationZip: string
  organizationPhoneNumber: string
  organizationEmailAddress: string
  organizationFaxNumber: string
  contactPersonFirstName: string
  contactPersonLastName: string
  contactPersonRole: string
  contactPersonPhoneNumber: string
  contactPersonEmailAddress: string
  contactPersonFaxNumber: string
}

const buildInitialFormValues = ({
  personalDetails,
}: GetProfessionalLiabilityInsuranceCarrierDetailsQuery): FormValues => {
  return {
    malpracticeType:
      personalDetails?.professionalLiabilityInsuranceCarrier?.malpracticeType ||
      "",
    organizationName:
      personalDetails?.professionalLiabilityInsuranceCarrier
        ?.organizationName || "",
    organizationAddressLine1:
      personalDetails?.professionalLiabilityInsuranceCarrier
        ?.organizationAddressLine1 || "",
    organizationAddressLine2:
      personalDetails?.professionalLiabilityInsuranceCarrier
        ?.organizationAddressLine2 || "",
    organizationCity:
      personalDetails?.professionalLiabilityInsuranceCarrier
        ?.organizationCity || "",
    organizationState:
      personalDetails?.professionalLiabilityInsuranceCarrier
        ?.organizationState || "",
    organizationZip:
      personalDetails?.professionalLiabilityInsuranceCarrier?.organizationZip ||
      "",
    organizationPhoneNumber:
      personalDetails?.professionalLiabilityInsuranceCarrier
        ?.organizationPhoneNumber || "",
    organizationEmailAddress:
      personalDetails?.professionalLiabilityInsuranceCarrier
        ?.organizationEmailAddress || "",
    organizationFaxNumber:
      personalDetails?.professionalLiabilityInsuranceCarrier
        ?.organizationFaxNumber || "",
    contactPersonFirstName:
      personalDetails?.professionalLiabilityInsuranceCarrier
        ?.contactPersonFirstName || "",
    contactPersonLastName:
      personalDetails?.professionalLiabilityInsuranceCarrier
        ?.contactPersonLastName || "",
    contactPersonRole:
      personalDetails?.professionalLiabilityInsuranceCarrier
        ?.contactPersonRole || "",
    contactPersonPhoneNumber:
      personalDetails?.professionalLiabilityInsuranceCarrier
        ?.contactPersonPhoneNumber || "",
    contactPersonEmailAddress:
      personalDetails?.professionalLiabilityInsuranceCarrier
        ?.contactPersonEmailAddress || "",
    contactPersonFaxNumber:
      personalDetails?.professionalLiabilityInsuranceCarrier
        ?.contactPersonFaxNumber || "",
  }
}

const buildMutationVariables = ({
  malpracticeType,
  organizationName,
  organizationAddressLine1,
  organizationAddressLine2,
  organizationCity,
  organizationState,
  organizationZip,
  organizationPhoneNumber,
  organizationEmailAddress,
  organizationFaxNumber,
  contactPersonFirstName,
  contactPersonLastName,
  contactPersonRole,
  contactPersonPhoneNumber,
  contactPersonEmailAddress,
  contactPersonFaxNumber,
}: FormValues): UpdateProfessionalLiabilityInsuranceCarrierMutationInput => {
  return {
    malpracticeType,
    organizationName,
    organizationAddressLine1,
    organizationAddressLine2,
    organizationCity,
    organizationState,
    organizationZip,
    organizationPhoneNumber,
    organizationEmailAddress,
    organizationFaxNumber,
    contactPersonFirstName,
    contactPersonLastName,
    contactPersonRole,
    contactPersonPhoneNumber,
    contactPersonEmailAddress,
    contactPersonFaxNumber,
  }
}

const validationSchema = yup.object().shape({
  organizationName: yup.string(),
})

interface FormFieldsProps {
  formikProps: FormikProps<FormValues>
  states: string[]
}

const FormFields: FC<FormFieldsProps> = ({
  formikProps: { errors, values, handleChange },
  states,
}) => {
  return (
    <>
      <TextField
        label="Malpractice type"
        value={values.malpracticeType}
        updateValue={handleChange("malpracticeType")}
        errors={errors.malpracticeType}
      />
      <TextField
        label="Organization name"
        value={values.organizationName}
        updateValue={handleChange("organizationName")}
        errors={errors.organizationName}
      />
      <TextField
        label="Organization address line 1"
        value={values.organizationAddressLine1}
        updateValue={handleChange("organizationAddressLine1")}
        errors={errors.organizationAddressLine1}
      />
      <TextField
        label="Organization address line 2"
        value={values.organizationAddressLine2}
        updateValue={handleChange("organizationAddressLine2")}
        errors={errors.organizationAddressLine2}
      />
      <TextField
        label="Organization city"
        value={values.organizationCity}
        updateValue={handleChange("organizationCity")}
        errors={errors.organizationCity}
      />
      <AutocompleteField
        label="Organization state"
        value={values.organizationState}
        updateValue={handleChange("organizationState")}
        errors={errors.organizationState}
        suggestionsList={states}
      />
      <TextField
        label="Organization zip"
        value={values.organizationZip}
        updateValue={handleChange("organizationZip")}
        errors={errors.organizationZip}
      />
      <TextField
        label="Organization phone number"
        value={values.organizationPhoneNumber}
        updateValue={handleChange("organizationPhoneNumber")}
        errors={errors.organizationPhoneNumber}
      />
      <TextField
        label="Organization email address"
        value={values.organizationEmailAddress}
        updateValue={handleChange("organizationEmailAddress")}
        errors={errors.organizationEmailAddress}
      />
      <TextField
        label="Organization fax number"
        value={values.organizationFaxNumber}
        updateValue={handleChange("organizationFaxNumber")}
        errors={errors.organizationFaxNumber}
      />
      <TextField
        label="Contact person first name"
        value={values.contactPersonFirstName}
        updateValue={handleChange("contactPersonFirstName")}
        errors={errors.contactPersonFirstName}
      />
      <TextField
        label="Contact person last name"
        value={values.contactPersonLastName}
        updateValue={handleChange("contactPersonLastName")}
        errors={errors.contactPersonLastName}
      />
      <TextField
        label="Contact person role"
        value={values.contactPersonRole}
        updateValue={handleChange("contactPersonRole")}
        errors={errors.contactPersonRole}
      />
      <TextField
        label="Contact person phone number"
        value={values.contactPersonPhoneNumber}
        updateValue={handleChange("contactPersonPhoneNumber")}
        errors={errors.contactPersonPhoneNumber}
      />
      <TextField
        label="Contact person email address"
        value={values.contactPersonEmailAddress}
        updateValue={handleChange("contactPersonEmailAddress")}
        errors={errors.contactPersonEmailAddress}
      />
      <TextField
        label="Contact person fax number"
        value={values.contactPersonFaxNumber}
        updateValue={handleChange("contactPersonFaxNumber")}
        errors={errors.contactPersonFaxNumber}
      />
    </>
  )
}

interface FormikStateHandlerProps {
  queryData: GetProfessionalLiabilityInsuranceCarrierDetailsQuery
  mutationData:
    | UpdateProfessionalLiabilityInsuranceCarrierMutation
    | null
    | undefined
  mutationInFlight: boolean
  mutation: MutationFunction<
    UpdateProfessionalLiabilityInsuranceCarrierMutation,
    MutationUpdateProfessionalLiabilityInsuranceCarrierArgs
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
              !!mutationData?.updateProfessionalLiabilityInsuranceCarrier
                ?.professionalLiabilityInsuranceCarrier?.malpracticeType
            }
          >
            <FormFields formikProps={formikProps} states={queryData.states} />
          </FormNavigationHandler>
        )
      }}
    </Formik>
  )
}

const ProfessionalLiabilityInsuranceCarrierForm: FC = () => {
  return (
    <GraphQLFormHandler<
      GetProfessionalLiabilityInsuranceCarrierDetailsQuery,
      UpdateProfessionalLiabilityInsuranceCarrierMutation,
      MutationUpdateProfessionalLiabilityInsuranceCarrierArgs
    >
      queryDocument={GET_PROFESSIONAL_LIABILITY_INSURANCE_CARRIER}
      mutationDocument={UPDATE_PROFESSIONAL_LIABILITY_INSURANCE_CARRIER}
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

export default ProfessionalLiabilityInsuranceCarrierForm
