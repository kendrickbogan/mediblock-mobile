import React, { FC, ReactNode } from "react"
import { View, Button, Text, StyleSheet } from "react-native"
import { gql, MutationFunction } from "@apollo/client"
import { SchemaLike } from "yup/lib/types"
import {
  Formik,
  FormikProps,
  FieldArray,
  FieldArrayRenderProps,
  FormikErrors,
} from "formik"
import * as yup from "yup"

import {
  GetInsurancePoliciesQuery,
  UpdateInsurancePoliciesMutation,
  MutationUpdateInsurancePoliciesArgs,
  ClaimsCoverageTypeEnum,
  CoverageTypeEnum,
  InsurancePolicyInput,
} from "../generated/graphql"
import {
  GraphQLFormHandler,
  FormNavigationHandler,
  TextField,
  AutocompleteField,
  Dropdown,
  SwitchField,
  DatePickerField,
} from "./formHelpers"
import { dateOrToday } from "../dateTimeUtils"

import { Colors, Typography, Sizing } from "../styles"

const GET_INSURANCE_POLICIES = gql`
  query GetInsurancePolicies {
    personalDetails {
      id
      insurancePolicies {
        aggregateAmount
        city
        claimsCoverageType
        coverageType
        coveredByFtca
        email
        endedAt
        entityName
        faxNumber
        perClaimAmount
        phoneNumber
        policyNumber
        selfInsured
        startedAt
        state
        streetAddress
        tailCoverage
        url
        zipCode
      }
    }
    states
  }
`

const UPDATE_INSURANCE_POLICIES = gql`
  mutation UpdateInsurancePolicies(
    $input: UpdateInsurancePoliciesMutationInput!
  ) {
    updateInsurancePolicies(input: $input) {
      insurancePolicies {
        entityName
      }
    }
  }
`

interface InsurancePolicyForm {
  activePolicy: boolean
  aggregateAmount: string
  city: string
  claimsCoverageType: ClaimsCoverageTypeEnum
  coverageType: CoverageTypeEnum
  coveredByFtca: boolean
  email: string
  endedAt: Date
  entityName: string
  faxNumber: string
  perClaimAmount: string
  phoneNumber: string
  policyNumber: string
  selfInsured: boolean
  startedAt: Date
  state: string
  streetAddress: string
  tailCoverage: boolean
  url: string
  zipCode: string
}

const emptyFormSet: InsurancePolicyForm = {
  activePolicy: true,
  aggregateAmount: "",
  city: "",
  claimsCoverageType: ClaimsCoverageTypeEnum.Unknown,
  coverageType: CoverageTypeEnum.Unknown,
  coveredByFtca: false,
  email: "",
  endedAt: new Date(),
  entityName: "",
  faxNumber: "",
  perClaimAmount: "",
  phoneNumber: "",
  policyNumber: "",
  selfInsured: false,
  startedAt: new Date(),
  state: "",
  streetAddress: "",
  tailCoverage: false,
  url: "",
  zipCode: "",
}

type FormValues = {
  insurancePolicies: InsurancePolicyForm[]
}

const buildInitialFormValues = ({
  personalDetails,
}: GetInsurancePoliciesQuery): FormValues => {
  if (personalDetails?.insurancePolicies.length === 0 || !personalDetails) {
    return { insurancePolicies: [emptyFormSet] }
  } else {
    const insurancePoliciesFormValues = personalDetails?.insurancePolicies.map(
      insurancePolicy => {
        return {
          activePolicy: insurancePolicy?.endedAt ? false : true,
          aggregateAmount: insurancePolicy.aggregateAmount?.toString() || "",
          city: insurancePolicy.city || "",
          claimsCoverageType:
            insurancePolicy.claimsCoverageType ||
            ClaimsCoverageTypeEnum.Unknown,
          coverageType:
            insurancePolicy.coverageType || CoverageTypeEnum.Unknown,
          coveredByFtca: insurancePolicy.coveredByFtca || false,
          entityName: insurancePolicy.entityName || "",
          endedAt: dateOrToday(insurancePolicy?.endedAt),
          email: insurancePolicy.email || "",
          faxNumber: insurancePolicy.faxNumber || "",
          perClaimAmount: insurancePolicy.perClaimAmount?.toString() || "",
          phoneNumber: insurancePolicy.phoneNumber || "",
          policyNumber: insurancePolicy.policyNumber?.toString() || "",
          selfInsured: insurancePolicy.coveredByFtca || false,
          state: insurancePolicy.state || "",
          startedAt: dateOrToday(insurancePolicy?.startedAt),
          streetAddress: insurancePolicy.streetAddress || "",
          tailCoverage: insurancePolicy.tailCoverage || false,
          url: insurancePolicy.url || "",
          zipCode: insurancePolicy.zipCode || "",
        }
      },
    )

    return { insurancePolicies: insurancePoliciesFormValues }
  }
}

const toInsurancePolicyMutationInput = ({
  activePolicy,
  aggregateAmount,
  city,
  claimsCoverageType,
  coverageType,
  coveredByFtca,
  email,
  endedAt,
  entityName,
  faxNumber,
  perClaimAmount,
  phoneNumber,
  policyNumber,
  selfInsured,
  startedAt,
  state,
  streetAddress,
  tailCoverage,
  url,
  zipCode,
}: InsurancePolicyForm): InsurancePolicyInput => {
  return {
    aggregateAmount: parseInt(aggregateAmount) || 0,
    city,
    claimsCoverageType,
    coverageType,
    coveredByFtca,
    email,
    entityName,
    faxNumber,
    perClaimAmount: parseInt(perClaimAmount) || 0,
    phoneNumber,
    policyNumber,
    selfInsured,
    state,
    streetAddress,
    tailCoverage,
    url,
    zipCode,
    startedAt: startedAt,
    endedAt: !activePolicy ? endedAt : null,
  }
}

const claimsCoverageTypeOptions = [
  { value: ClaimsCoverageTypeEnum.Unknown, label: "Unknown" },
  { value: ClaimsCoverageTypeEnum.ClaimsMade, label: "Claims Made" },
  { value: ClaimsCoverageTypeEnum.Occurrence, label: "Occurrence" },
]

const coverageTypeOptions = [
  { value: CoverageTypeEnum.Unknown, label: "Unknown" },
  { value: CoverageTypeEnum.Individual, label: "Individual" },
  { value: CoverageTypeEnum.Shared, label: "Shared" },
]

const validationSchema = yup.object().shape({
  insurancePolicies: yup.array().of(
    yup.object({
      aggregateAmount: yup
        .number()
        .typeError("Aggregate amount should be a number"),
      perClaimAmount: yup
        .number()
        .typeError("Per claim amount should be a number"),
      coveredByFtca: yup.boolean(),
      selfInsured: yup.boolean(),
      tailCoverage: yup.boolean(),
      startedAt: yup.date().when("activePolicy", {
        is: false,
        then: yup.date().when(
          "endedAt",
          (endedAt: Date): SchemaLike => {
            return (
              endedAt &&
              yup
                .date()
                .max(endedAt, "Start date should be before the end date")
            )
          },
        ),
      }),
      endedAt: yup.date().when("activePolicy", {
        is: false,
        then: yup.date().when(
          "startedAt",
          (startedAt: Date): SchemaLike => {
            return (
              startedAt &&
              yup
                .date()
                .min(startedAt, "End date should be after the start date")
            )
          },
        ),
      }),
    }),
  ),
})

interface InsurancePolicyFieldsProps {
  formikProps: FormikProps<FormValues>
  fieldArrayProps: FieldArrayRenderProps
  states: string[]
}

const InsurancePolicyFields: FC<InsurancePolicyFieldsProps> = ({
  formikProps: {
    values: { insurancePolicies },
    handleChange,
    setFieldValue,
    errors,
  },
  states,
  fieldArrayProps: { push, remove },
}) => {
  return (
    <>
      {insurancePolicies.map((_, index) => {
        const errorsForFieldSet: FormikErrors<InsurancePolicyForm> =
          errors.insurancePolicies && errors.insurancePolicies[index]
            ? (errors.insurancePolicies[
                index
              ] as FormikErrors<InsurancePolicyForm>)
            : {}

        const toFieldName = (fieldName: string): string => {
          return `insurancePolicies[${index}].${fieldName}`
        }

        return (
          <View key={index} style={style.affiliationContainer}>
            <Text style={style.affiliationTitleText}>
              Insurance Carrier or Entity Policy #{index + 1}
            </Text>
            <TextField
              label="Carrier or self-insured entity name"
              value={insurancePolicies[index].entityName}
              updateValue={handleChange(toFieldName("entityName"))}
              errors={errorsForFieldSet.entityName}
            />
            <SwitchField
              label="Is this policy self-insured?"
              value={insurancePolicies[index].selfInsured}
              updateValue={(value: boolean): void => {
                setFieldValue(toFieldName("selfInsured"), value)
              }}
              errors={errorsForFieldSet.selfInsured}
            />
            <SwitchField
              label="Is this entity covered by the Federal Tort Claims Act (FTCA)?"
              value={insurancePolicies[index].coveredByFtca}
              updateValue={(value: boolean): void => {
                setFieldValue(toFieldName("coveredByFtca"), value)
              }}
              errors={errorsForFieldSet.coveredByFtca}
            />
            {!insurancePolicies[index].selfInsured && (
              <TextField
                label="Policy number"
                value={insurancePolicies[index].policyNumber}
                updateValue={handleChange(toFieldName("policyNumber"))}
                errors={errorsForFieldSet.policyNumber}
                keyboardType="numeric"
              />
            )}
            <TextField
              label="Street address"
              value={insurancePolicies[index].streetAddress}
              updateValue={handleChange(toFieldName("streetAddress"))}
              errors={errorsForFieldSet.streetAddress}
            />
            <TextField
              label="City"
              value={insurancePolicies[index].city}
              updateValue={handleChange(toFieldName("city"))}
              errors={errorsForFieldSet.city}
            />
            <AutocompleteField
              label="State"
              errors={errorsForFieldSet.state}
              value={insurancePolicies[index].state}
              updateValue={handleChange(toFieldName("state"))}
              suggestionsList={states}
            />
            <TextField
              label="Zip code"
              value={insurancePolicies[index].zipCode}
              updateValue={handleChange(toFieldName("zipCode"))}
              errors={errorsForFieldSet.zipCode}
              keyboardType="numeric"
            />
            <TextField
              label="Phone number"
              value={insurancePolicies[index].phoneNumber}
              updateValue={handleChange(toFieldName("phoneNumber"))}
              errors={errorsForFieldSet.phoneNumber}
              keyboardType="numeric"
            />
            <TextField
              label="Fax number"
              value={insurancePolicies[index].faxNumber}
              updateValue={handleChange(toFieldName("faxNumber"))}
              errors={errorsForFieldSet.faxNumber}
              keyboardType="numeric"
            />
            <TextField
              label="Website URL"
              value={insurancePolicies[index].url}
              updateValue={handleChange(toFieldName("url"))}
              errors={errorsForFieldSet.url}
            />
            <TextField
              label="Email address"
              value={insurancePolicies[index].email}
              updateValue={handleChange(toFieldName("email"))}
              errors={errorsForFieldSet.email}
            />
            <SwitchField
              label="Tail coverage?"
              value={insurancePolicies[index].tailCoverage}
              updateValue={(value: boolean): void => {
                setFieldValue(toFieldName("tailCoverage"), value)
              }}
              errors={errorsForFieldSet.tailCoverage}
            />
            <Dropdown<ClaimsCoverageTypeEnum>
              options={claimsCoverageTypeOptions}
              label="Claims coverage type"
              value={insurancePolicies[index].claimsCoverageType}
              onValueChange={(value: ClaimsCoverageTypeEnum): void =>
                setFieldValue(toFieldName("claimsCoverageType"), value)
              }
              errors={errorsForFieldSet.claimsCoverageType}
            />
            <Dropdown<CoverageTypeEnum>
              options={coverageTypeOptions}
              label="Coverage type"
              value={insurancePolicies[index].coverageType}
              onValueChange={(value: CoverageTypeEnum): void =>
                setFieldValue(toFieldName("coverageType"), value)
              }
              errors={errorsForFieldSet.coverageType}
            />
            <TextField
              label="Per claim amount"
              value={insurancePolicies[index].perClaimAmount}
              updateValue={handleChange(toFieldName("perClaimAmount"))}
              errors={errorsForFieldSet.perClaimAmount}
              keyboardType="numeric"
            />
            <TextField
              label="Aggregate amount"
              value={insurancePolicies[index].aggregateAmount}
              updateValue={handleChange(toFieldName("aggregateAmount"))}
              errors={errorsForFieldSet.aggregateAmount}
              keyboardType="numeric"
            />
            <DatePickerField
              label="Start date"
              value={insurancePolicies[index].startedAt}
              updateValue={(_event: Event, value: Date | undefined): void => {
                setFieldValue(toFieldName("startedAt"), value)
              }}
              errors={errorsForFieldSet.startedAt}
            />
            <SwitchField
              label="Is this an active policy?"
              value={insurancePolicies[index].activePolicy}
              updateValue={(value: boolean): void => {
                setFieldValue(toFieldName("activePolicy"), value)
              }}
              errors={errorsForFieldSet.activePolicy}
            />
            {!insurancePolicies[index].activePolicy && (
              <DatePickerField
                label="End date"
                value={insurancePolicies[index].endedAt}
                updateValue={(_event: Event, value: Date | undefined): void => {
                  setFieldValue(toFieldName("endedAt"), value)
                }}
                errors={errorsForFieldSet.endedAt}
              />
            )}
            <Button
              title="Remove"
              color={Colors.danger.s400}
              onPress={(): void => {
                remove(index)
              }}
            />
          </View>
        )
      })}
      <Button
        title="Add another"
        onPress={(): void => {
          push(emptyFormSet)
        }}
      />
    </>
  )
}

interface FormProps {
  formikProps: FormikProps<FormValues>
  states: string[]
}

const Form: FC<FormProps> = ({ formikProps, states }) => {
  return (
    <FieldArray
      name="insurancePolicies"
      render={(fieldArrayProps): ReactNode => {
        return (
          <InsurancePolicyFields
            formikProps={formikProps}
            fieldArrayProps={fieldArrayProps}
            states={states}
          />
        )
      }}
    />
  )
}

interface FormikStateHandlerProps {
  queryData: GetInsurancePoliciesQuery
  mutationData: UpdateInsurancePoliciesMutation | null | undefined
  mutationInFlight: boolean
  mutation: MutationFunction<
    UpdateInsurancePoliciesMutation,
    MutationUpdateInsurancePoliciesArgs
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
      onSubmit={(values: FormValues): void => {
        mutation({
          variables: {
            input: {
              insurancePoliciesAttributes: values.insurancePolicies.map(
                toInsurancePolicyMutationInput,
              ),
            },
          },
        })
      }}
    >
      {(formikProps): ReactNode => {
        return (
          <FormNavigationHandler<FormValues>
            formikProps={formikProps}
            submissionInFlight={mutationInFlight}
            initialFormState={initialFormState}
            successfulMutation={
              !!mutationData?.updateInsurancePolicies?.insurancePolicies
            }
          >
            <Form formikProps={formikProps} states={queryData.states} />
          </FormNavigationHandler>
        )
      }}
    </Formik>
  )
}

const InsurancePoliciesForm: FC = () => {
  return (
    <GraphQLFormHandler<
      GetInsurancePoliciesQuery,
      UpdateInsurancePoliciesMutation,
      MutationUpdateInsurancePoliciesArgs
    >
      queryDocument={GET_INSURANCE_POLICIES}
      mutationDocument={UPDATE_INSURANCE_POLICIES}
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

const style = StyleSheet.create({
  affiliationContainer: {
    marginBottom: Sizing.x20,
  },
  affiliationTitleText: {
    ...Typography.subheader.x30,
    marginBottom: Sizing.x20,
  },
})

export default InsurancePoliciesForm
