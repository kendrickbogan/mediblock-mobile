import React, { FC, ReactNode } from "react"
import { gql, MutationFunction } from "@apollo/client"
import { Formik, FormikProps } from "formik"

import {
  GetPeerReferenceDetailsQuery,
  UpdatePeerReferenceMutation,
  MutationUpdatePeerReferenceArgs,
  UpdatePeerReferenceMutationInput,
} from "../generated/graphql"

import {
  GraphQLFormHandler,
  FormNavigationHandler,
  TextField,
  AutocompleteField,
  SwitchField,
} from "./formHelpers"

const GET_PEER_REFERENCE = gql`
  query GetPeerReferenceDetails($position: Int!) {
    personalDetails {
      id
      peerReference(position: $position) {
        firstName
        lastName
        title
        degree
        specialty
        relationship
        phoneNumber
        emailAddress
        addressLine1
        addressLine2
        city
        state
        country
        zip
        hasWorkedWithInThePastTwoYears
        yearsKnown
        position
      }
    }
    countries
    states
  }
`

const UPDATE_PEER_REFERENCE = gql`
  mutation UpdatePeerReference($input: UpdatePeerReferenceMutationInput!) {
    updatePeerReference(input: $input) {
      peerReference {
        firstName
      }
    }
  }
`

type FormValues = {
  firstName: string
  lastName: string
  title: string
  degree: string
  specialty: string
  relationship: string
  phoneNumber: string
  emailAddress: string
  addressLine1: string
  addressLine2: string
  addressCity: string
  addressState: string
  addressCountry: string
  addressZip: string
  hasWorkedWithInThePastTwoYears: boolean
  yearsKnown: string
  position: PeerReferenceNumber
}

const buildInitialFormValues = (
  { personalDetails }: GetPeerReferenceDetailsQuery,
  position: PeerReferenceNumber,
): FormValues => {
  return {
    firstName: personalDetails?.peerReference?.firstName || "",
    lastName: personalDetails?.peerReference?.lastName || "",
    title: personalDetails?.peerReference?.title || "",
    degree: personalDetails?.peerReference?.degree || "",
    specialty: personalDetails?.peerReference?.specialty || "",
    relationship: personalDetails?.peerReference?.relationship || "",
    phoneNumber: personalDetails?.peerReference?.phoneNumber || "",
    emailAddress: personalDetails?.peerReference?.emailAddress || "",
    addressLine1: personalDetails?.peerReference?.addressLine1 || "",
    addressLine2: personalDetails?.peerReference?.addressLine2 || "",
    addressCity: personalDetails?.peerReference?.city || "",
    addressState: personalDetails?.peerReference?.state || "",
    addressCountry: personalDetails?.peerReference?.country || "",
    addressZip: personalDetails?.peerReference?.zip || "",
    hasWorkedWithInThePastTwoYears:
      personalDetails?.peerReference?.hasWorkedWithInThePastTwoYears || false,
    yearsKnown: personalDetails?.peerReference?.yearsKnown?.toString() || "",
    position,
  }
}

const buildMutationVariables = ({
  firstName,
  lastName,
  title,
  degree,
  specialty,
  relationship,
  phoneNumber,
  emailAddress,
  addressLine1,
  addressLine2,
  addressCity,
  addressState,
  addressCountry,
  addressZip,
  hasWorkedWithInThePastTwoYears,
  yearsKnown,
  position,
}: FormValues): UpdatePeerReferenceMutationInput => {
  return {
    firstName,
    lastName,
    title,
    degree,
    specialty,
    relationship,
    phoneNumber,
    emailAddress,
    addressLine1,
    addressLine2,
    city: addressCity,
    state: addressState,
    country: addressCountry,
    zip: addressZip,
    hasWorkedWithInThePastTwoYears,
    yearsKnown: parseInt(yearsKnown) || 0,
    position,
  }
}

interface FormFieldsProps {
  formikProps: FormikProps<FormValues>
  countries: string[]
  states: string[]
}

const FormFields: FC<FormFieldsProps> = ({
  formikProps: { errors, values, handleChange, setFieldValue },
  countries,
  states,
}) => {
  return (
    <>
      <TextField
        label="First name"
        value={values.firstName}
        updateValue={handleChange("firstName")}
        errors={errors.firstName}
      />
      <TextField
        label="Last name"
        value={values.lastName}
        updateValue={handleChange("lastName")}
        errors={errors.lastName}
      />
      <TextField
        label="Title"
        value={values.title}
        updateValue={handleChange("title")}
        errors={errors.title}
      />
      <TextField
        label="Degree"
        value={values.degree}
        updateValue={handleChange("degree")}
        errors={errors.degree}
      />
      <TextField
        label="Specialty"
        value={values.specialty}
        updateValue={handleChange("specialty")}
        errors={errors.specialty}
      />
      <TextField
        label="Relationship"
        value={values.relationship}
        updateValue={handleChange("relationship")}
        errors={errors.relationship}
      />
      <TextField
        label="Phone number"
        value={values.phoneNumber}
        updateValue={handleChange("phoneNumber")}
        errors={errors.phoneNumber}
      />
      <TextField
        label="Email address"
        value={values.emailAddress}
        updateValue={handleChange("emailAddress")}
        errors={errors.emailAddress}
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
        label="Address city"
        value={values.addressCity}
        updateValue={handleChange("addressCity")}
        errors={errors.addressCity}
      />
      <AutocompleteField
        label="Address state"
        errors={errors.addressState}
        value={values.addressState}
        updateValue={handleChange("addressState")}
        suggestionsList={states}
      />
      <AutocompleteField
        label="Address country"
        errors={errors.addressCountry}
        value={values.addressCountry}
        updateValue={handleChange("addressCountry")}
        suggestionsList={countries}
      />
      <SwitchField
        label="Have you worked with this person in the last two years?"
        value={values.hasWorkedWithInThePastTwoYears}
        updateValue={(value: boolean): void => {
          setFieldValue("hasWorkedWithInThePastTwoYears", value)
        }}
        errors={errors.hasWorkedWithInThePastTwoYears}
      />
      <TextField
        label="Years known"
        value={values.yearsKnown}
        updateValue={handleChange("yearsKnown")}
        errors={errors.yearsKnown}
      />
    </>
  )
}

interface FormikStateHandlerProps {
  queryData: GetPeerReferenceDetailsQuery
  mutationData: UpdatePeerReferenceMutation | null | undefined
  mutationInFlight: boolean
  mutation: MutationFunction<
    UpdatePeerReferenceMutation,
    MutationUpdatePeerReferenceArgs
  >
  peerReferencePosition: PeerReferenceNumber
}

const FormikStateHandler: FC<FormikStateHandlerProps> = ({
  queryData,
  mutationData,
  mutationInFlight,
  mutation,
  peerReferencePosition,
}) => {
  const initialFormState = buildInitialFormValues(
    queryData,
    peerReferencePosition,
  )

  const handleOnSubmit = (formValues: FormValues): void => {
    mutation({
      variables: { input: buildMutationVariables(formValues) },
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
              !!mutationData?.updatePeerReference?.peerReference
            }
          >
            <FormFields
              formikProps={formikProps}
              countries={queryData.countries}
              states={queryData.states}
            />
          </FormNavigationHandler>
        )
      }}
    </Formik>
  )
}

type PeerReferenceNumber = 1 | 2 | 3

interface PeerReferenceFormProps {
  peerReferencePosition: PeerReferenceNumber
}

const PeerReferenceForm: FC<PeerReferenceFormProps> = ({
  peerReferencePosition,
}) => {
  return (
    <GraphQLFormHandler<
      GetPeerReferenceDetailsQuery,
      UpdatePeerReferenceMutation,
      MutationUpdatePeerReferenceArgs
    >
      queryDocument={GET_PEER_REFERENCE}
      mutationDocument={UPDATE_PEER_REFERENCE}
      queryVariables={{ position: peerReferencePosition }}
    >
      {(queryData, mutationData, mutationInFlight, mutation): JSX.Element => {
        return (
          <FormikStateHandler
            queryData={queryData}
            mutationData={mutationData}
            mutationInFlight={mutationInFlight}
            mutation={mutation}
            peerReferencePosition={peerReferencePosition}
          />
        )
      }}
    </GraphQLFormHandler>
  )
}

export default PeerReferenceForm
