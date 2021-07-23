import React, { FC, ReactNode } from "react"
import { View, Button, Text, StyleSheet } from "react-native"
import { gql, MutationFunction } from "@apollo/client"
import {
  Formik,
  FormikProps,
  FieldArray,
  FieldArrayRenderProps,
  FormikErrors,
} from "formik"
import * as yup from "yup"

import {
  GetMalpracticeClaimsQuery,
  UpdateMalpracticeClaimsMutation,
  MutationUpdateMalpracticeClaimsArgs,
  MalpracticeDefendantEnum,
  MalpracticeResolutionEnum,
  MalpracticeClaimInput,
} from "../generated/graphql"
import {
  GraphQLFormHandler,
  FormNavigationHandler,
  TextField,
  Dropdown,
  SwitchField,
  DatePickerField,
} from "./formHelpers"
import { dateOrToday } from "../dateTimeUtils"

import { Colors, Typography, Sizing } from "../styles"

const GET_MALPRACTICE_CLAIMS = gql`
  query GetMalpracticeClaims {
    personalDetails {
      id
      malpracticeClaims {
        allegedIncidentDate
        amountPaid
        claimFiledAt
        claimStatus
        defendantType
        descriptionOfAllegations
        descriptionOfAllegedInjury
        includedInNpdb
        insuranceCarrierInvolved
        involvementDescription
        methodOfResolution
        numberOfCoDefendants
        policyNumberCoveredBy
        resolutionComment
        settlementAmount
      }
    }
  }
`

const UPDATE_MALPRACTICE_CLAIMS = gql`
  mutation UpdateMalpracticeClaims(
    $input: UpdateMalpracticeClaimsMutationInput!
  ) {
    updateMalpracticeClaims(input: $input) {
      malpracticeClaims {
        defendantType
      }
    }
  }
`

interface MalpracticeClaimForm {
  allegedIncidentDate: Date
  amountPaid: string
  claimFiledAt: Date
  claimStatus: string
  defendantType: MalpracticeDefendantEnum
  descriptionOfAllegations: string
  descriptionOfAllegedInjury: string
  includedInNpdb: boolean
  insuranceCarrierInvolved: string
  involvementDescription: string
  methodOfResolution: MalpracticeResolutionEnum
  numberOfCoDefendants: string
  policyNumberCoveredBy: string
  resolutionComment: string
  settlementAmount: string
}

const emptyFormSet: MalpracticeClaimForm = {
  allegedIncidentDate: new Date(),
  amountPaid: "",
  claimFiledAt: new Date(),
  claimStatus: "",
  defendantType: MalpracticeDefendantEnum.Primary,
  descriptionOfAllegations: "",
  descriptionOfAllegedInjury: "",
  includedInNpdb: false,
  insuranceCarrierInvolved: "",
  involvementDescription: "",
  methodOfResolution: MalpracticeResolutionEnum.Dismissed,
  numberOfCoDefendants: "",
  policyNumberCoveredBy: "",
  resolutionComment: "",
  settlementAmount: "",
}

type FormValues = {
  malpracticeClaims: MalpracticeClaimForm[]
}

const buildInitialFormValues = ({
  personalDetails,
}: GetMalpracticeClaimsQuery): FormValues => {
  if (personalDetails?.malpracticeClaims.length === 0 || !personalDetails) {
    return { malpracticeClaims: [emptyFormSet] }
  } else {
    const malpracticeClaimsFormValues = personalDetails?.malpracticeClaims.map(
      malpracticeClaim => {
        return {
          allegedIncidentDate: dateOrToday(
            malpracticeClaim?.allegedIncidentDate,
          ),
          amountPaid: malpracticeClaim.amountPaid?.toString() || "",
          claimFiledAt: dateOrToday(malpracticeClaim?.claimFiledAt),
          claimStatus: malpracticeClaim.claimStatus || "",
          defendantType:
            malpracticeClaim.defendantType || MalpracticeDefendantEnum.Primary,
          descriptionOfAllegations:
            malpracticeClaim.descriptionOfAllegations || "",
          descriptionOfAllegedInjury:
            malpracticeClaim.descriptionOfAllegedInjury || "",
          includedInNpdb: malpracticeClaim.includedInNpdb || false,
          insuranceCarrierInvolved:
            malpracticeClaim.insuranceCarrierInvolved || "",
          involvementDescription: malpracticeClaim.involvementDescription || "",
          methodOfResolution:
            malpracticeClaim.methodOfResolution ||
            MalpracticeResolutionEnum.Dismissed,
          numberOfCoDefendants:
            malpracticeClaim.numberOfCoDefendants?.toString() || "",
          policyNumberCoveredBy: malpracticeClaim.policyNumberCoveredBy || "",
          resolutionComment: malpracticeClaim.resolutionComment || "",
          settlementAmount: malpracticeClaim.settlementAmount?.toString() || "",
        }
      },
    )

    return { malpracticeClaims: malpracticeClaimsFormValues }
  }
}

const toMalpracticeClaimMutationInput = ({
  allegedIncidentDate,
  amountPaid,
  claimFiledAt,
  claimStatus,
  defendantType,
  descriptionOfAllegations,
  descriptionOfAllegedInjury,
  includedInNpdb,
  insuranceCarrierInvolved,
  involvementDescription,
  methodOfResolution,
  numberOfCoDefendants,
  policyNumberCoveredBy,
  resolutionComment,
  settlementAmount,
}: MalpracticeClaimForm): MalpracticeClaimInput => {
  return {
    allegedIncidentDate,
    amountPaid: parseInt(amountPaid) || 0,
    claimFiledAt,
    claimStatus,
    defendantType,
    descriptionOfAllegations,
    descriptionOfAllegedInjury,
    includedInNpdb,
    insuranceCarrierInvolved,
    involvementDescription,
    methodOfResolution,
    numberOfCoDefendants: parseInt(numberOfCoDefendants) || 0,
    policyNumberCoveredBy,
    resolutionComment,
    settlementAmount: parseInt(settlementAmount) || 0,
  }
}

const malpracticeDefendantOptions = [
  { value: MalpracticeDefendantEnum.Primary, label: "Primary" },
  { value: MalpracticeDefendantEnum.Co, label: "Co" },
]

const malpracticeResolutionOptions = [
  { value: MalpracticeResolutionEnum.Dismissed, label: "Dismissed" },
  {
    value: MalpracticeResolutionEnum.SettledWithPrejudice,
    label: "Settled with prejudice",
  },
  {
    value: MalpracticeResolutionEnum.SettledWithoutPrejudice,
    label: "Settled without prejudice",
  },
  {
    value: MalpracticeResolutionEnum.JudgementForPlantiff,
    label: "Judgement for plantiff",
  },
  {
    value: MalpracticeResolutionEnum.JudgementForDefendant,
    label: "Judgement for defendant",
  },
  {
    value: MalpracticeResolutionEnum.MediationOrArbitration,
    label: "Mediation or arbitration",
  },
  { value: MalpracticeResolutionEnum.Other, label: "Other" },
]

const validationSchema = yup.object().shape({
  malpracticeClaims: yup.array().of(
    yup.object({
      allegedIncidentDate: yup.string(),
      amountPaid: yup.number().typeError("Amount paid should be a number"),
      claimFiledAt: yup.date(),
      defendantType: yup.string(),
      includedInNpdb: yup.boolean(),
      methodOfResolution: yup.string(),
      numberOfCoDefendants: yup.number(),
      settlementAmount: yup
        .number()
        .typeError("Settlement amount should be a number"),
    }),
  ),
})

interface MalpracticeClaimFieldsProps {
  formikProps: FormikProps<FormValues>
  fieldArrayProps: FieldArrayRenderProps
}

const MalpracticeClaimFields: FC<MalpracticeClaimFieldsProps> = ({
  formikProps: {
    values: { malpracticeClaims },
    handleChange,
    setFieldValue,
    errors,
  },
  fieldArrayProps: { push, remove },
}) => {
  return (
    <>
      {malpracticeClaims.map((_malpracticeClaim, index) => {
        const errorsForFieldSet: FormikErrors<MalpracticeClaimForm> =
          errors.malpracticeClaims && errors.malpracticeClaims[index]
            ? (errors.malpracticeClaims[
                index
              ] as FormikErrors<MalpracticeClaimForm>)
            : {}

        const toFieldName = (fieldName: string): string => {
          return `malpracticeClaims[${index}].${fieldName}`
        }

        return (
          <View key={index} style={style.claimContainer}>
            <Text style={style.claimTitleText}>
              Malpractice Claim #{index + 1}
            </Text>
            <DatePickerField
              label="Date of alleged incident"
              value={malpracticeClaims[index].allegedIncidentDate}
              updateValue={(_event: Event, value: Date | undefined): void => {
                setFieldValue(toFieldName("allegedIncidentDate"), value)
              }}
              errors={errorsForFieldSet.allegedIncidentDate}
            />
            <DatePickerField
              label="Date the claim was filed"
              value={malpracticeClaims[index].claimFiledAt}
              updateValue={(_event: Event, value: Date | undefined): void => {
                setFieldValue(toFieldName("claimFiledAt"), value)
              }}
              errors={errorsForFieldSet.claimFiledAt}
            />
            <TextField
              label="Claim/case status"
              value={malpracticeClaims[index].claimStatus}
              updateValue={handleChange(toFieldName("claimStatus"))}
              errors={errorsForFieldSet.claimStatus}
            />
            <TextField
              label="Professional Liability Issurance Carrier Involved"
              value={malpracticeClaims[index].insuranceCarrierInvolved}
              updateValue={handleChange(
                toFieldName("insuranceCarrierInvolved"),
              )}
              errors={errorsForFieldSet.insuranceCarrierInvolved}
            />
            <TextField
              label="Your Liability Policy Number which covered you during this period"
              value={malpracticeClaims[index].policyNumberCoveredBy}
              updateValue={handleChange(toFieldName("policyNumberCoveredBy"))}
              errors={errorsForFieldSet.policyNumberCoveredBy}
            />
            <TextField
              label="Dollar Amount of Award or Settlement"
              value={malpracticeClaims[index].settlementAmount}
              updateValue={handleChange(toFieldName("settlementAmount"))}
              errors={errorsForFieldSet.settlementAmount}
              keyboardType="numeric"
            />
            <TextField
              label="Dollar amount paid"
              value={malpracticeClaims[index].amountPaid}
              updateValue={handleChange(toFieldName("amountPaid"))}
              errors={errorsForFieldSet.amountPaid}
              keyboardType="numeric"
            />
            <Dropdown<MalpracticeResolutionEnum>
              options={malpracticeResolutionOptions}
              label="Method of resolution"
              value={malpracticeClaims[index].methodOfResolution}
              onValueChange={(value: MalpracticeResolutionEnum): void =>
                setFieldValue(toFieldName("methodOfResolution"), value)
              }
              errors={errorsForFieldSet.methodOfResolution}
            />
            <TextField
              label="Description of allegations"
              value={malpracticeClaims[index].descriptionOfAllegations}
              updateValue={handleChange(
                toFieldName("descriptionOfAllegations"),
              )}
              errors={errorsForFieldSet.descriptionOfAllegations}
            />
            <Dropdown<MalpracticeDefendantEnum>
              options={malpracticeDefendantOptions}
              label="Claims coverage type"
              value={malpracticeClaims[index].defendantType}
              onValueChange={(value: MalpracticeDefendantEnum): void =>
                setFieldValue(toFieldName("defendantType"), value)
              }
              errors={errorsForFieldSet.defendantType}
            />
            <TextField
              label="Number of co-defendants"
              value={malpracticeClaims[index].numberOfCoDefendants}
              updateValue={handleChange(toFieldName("numberOfCoDefendants"))}
              errors={errorsForFieldSet.numberOfCoDefendants}
              keyboardType="numeric"
            />
            <TextField
              label="Description of your involvement"
              value={malpracticeClaims[index].involvementDescription}
              updateValue={handleChange(toFieldName("involvementDescription"))}
              errors={errorsForFieldSet.involvementDescription}
            />
            <TextField
              label="Description of alleged injury to patient"
              value={malpracticeClaims[index].descriptionOfAllegedInjury}
              updateValue={handleChange(
                toFieldName("descriptionOfAllegedInjury"),
              )}
              errors={errorsForFieldSet.descriptionOfAllegedInjury}
            />
            <SwitchField
              label="To the Best of your knowledge, is this case included in the National Practitioner Data Bank (NPDB)?"
              value={malpracticeClaims[index].includedInNpdb}
              updateValue={(value: boolean): void => {
                setFieldValue(toFieldName("includedInNpdb"), value)
              }}
              errors={errorsForFieldSet.includedInNpdb}
            />
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
}

const Form: FC<FormProps> = ({ formikProps }) => {
  return (
    <FieldArray
      name="malpracticeClaims"
      render={(fieldArrayProps): ReactNode => {
        return (
          <MalpracticeClaimFields
            formikProps={formikProps}
            fieldArrayProps={fieldArrayProps}
          />
        )
      }}
    />
  )
}

interface FormikStateHandlerProps {
  queryData: GetMalpracticeClaimsQuery
  mutationData: UpdateMalpracticeClaimsMutation | null | undefined
  mutationInFlight: boolean
  mutation: MutationFunction<
    UpdateMalpracticeClaimsMutation,
    MutationUpdateMalpracticeClaimsArgs
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
              malpracticeClaimsAttributes: values.malpracticeClaims.map(
                toMalpracticeClaimMutationInput,
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
              !!mutationData?.updateMalpracticeClaims?.malpracticeClaims
            }
          >
            <Form formikProps={formikProps} />
          </FormNavigationHandler>
        )
      }}
    </Formik>
  )
}

const MalpracticeClaimsForm: FC = () => {
  return (
    <GraphQLFormHandler<
      GetMalpracticeClaimsQuery,
      UpdateMalpracticeClaimsMutation,
      MutationUpdateMalpracticeClaimsArgs
    >
      queryDocument={GET_MALPRACTICE_CLAIMS}
      mutationDocument={UPDATE_MALPRACTICE_CLAIMS}
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
  claimContainer: {
    marginBottom: Sizing.x20,
  },
  claimTitleText: {
    ...Typography.subheader.x30,
    marginBottom: Sizing.x20,
  },
})

export default MalpracticeClaimsForm
