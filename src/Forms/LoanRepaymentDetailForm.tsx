import React, { FC, ReactNode } from "react"
import { gql, MutationFunction } from "@apollo/client"
import * as yup from "yup"
import { Formik, FormikProps } from "formik"
import { SchemaLike } from "yup/lib/types"

import { dateOrToday } from "../dateTimeUtils"
import {
  GetLoanRepaymentDetailDetailsQuery,
  UpdateLoanRepaymentDetailMutation,
  UpdateLoanRepaymentDetailMutationInput,
  MutationUpdateLoanRepaymentDetailArgs,
  DeleteLoanRepaymentDetailMutation,
} from "../generated/graphql"
import {
  DatePickerField,
  GraphQLFormHandlerWithDelete,
  FormNavigationHandler,
  TextField,
  AutocompleteField,
  SwitchField,
} from "./formHelpers"

const GET_LOAN_REPAYMENT_DETAIL = gql`
  query GetLoanRepaymentDetailDetails {
    personalDetails {
      id
      loanRepaymentDetail {
        repaymentProgramName
        nameOfInstitution
        addressLine1
        addressLine2
        city
        state
        zip
        yearsWorkedForRepayment
        startedAt
        endedAt
      }
    }
    states
  }
`

const UPDATE_LOAN_REPAYMENT_DETAIL = gql`
  mutation UpdateLoanRepaymentDetail(
    $input: UpdateLoanRepaymentDetailMutationInput!
  ) {
    updateLoanRepaymentDetail(input: $input) {
      loanRepaymentDetail {
        repaymentProgramName
      }
    }
  }
`

const DELETE_LOAN_REPAYMENT_DETAIL = gql`
  mutation DeleteLoanRepaymentDetail {
    deleteLoanRepaymentDetail {
      success
    }
  }
`

type FormValues = {
  receivedLoanForgiveness: boolean
  repaymentProgramName: string
  nameOfInstitution: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  zip: string
  yearsWorkedForRepayment: string
  startedAt: Date
  stillRepaying: boolean
  endedAt: Date
}

const buildInitialFormValues = ({
  personalDetails,
}: GetLoanRepaymentDetailDetailsQuery): FormValues => {
  return {
    receivedLoanForgiveness: !!personalDetails?.loanRepaymentDetail,
    repaymentProgramName:
      personalDetails?.loanRepaymentDetail?.repaymentProgramName || "",
    nameOfInstitution:
      personalDetails?.loanRepaymentDetail?.nameOfInstitution || "",
    addressLine1: personalDetails?.loanRepaymentDetail?.addressLine1 || "",
    addressLine2: personalDetails?.loanRepaymentDetail?.addressLine2 || "",
    city: personalDetails?.loanRepaymentDetail?.city || "",
    state: personalDetails?.loanRepaymentDetail?.state || "",
    zip: personalDetails?.loanRepaymentDetail?.zip || "",
    yearsWorkedForRepayment:
      personalDetails?.loanRepaymentDetail?.yearsWorkedForRepayment?.toString() ||
      "",
    startedAt: dateOrToday(personalDetails?.loanRepaymentDetail?.startedAt),
    stillRepaying: personalDetails?.loanRepaymentDetail?.endedAt ? false : true,
    endedAt: dateOrToday(personalDetails?.loanRepaymentDetail?.endedAt),
  }
}

const buildMutationVariables = ({
  repaymentProgramName,
  nameOfInstitution,
  addressLine1,
  addressLine2,
  city,
  state,
  zip,
  yearsWorkedForRepayment,
  startedAt,
  stillRepaying,
  endedAt,
}: FormValues): UpdateLoanRepaymentDetailMutationInput => {
  return {
    repaymentProgramName,
    nameOfInstitution,
    addressLine1,
    addressLine2,
    city,
    state,
    zip,
    yearsWorkedForRepayment: parseInt(yearsWorkedForRepayment) || 0,
    startedAt,
    endedAt: !stillRepaying ? endedAt : null,
  }
}

const validationSchema = yup.object().shape(
  {
    receivedLoanForgiveness: yup.boolean(),
    startDate: yup.date().when("receivedLoanForgiveness", {
      is: true,
      then: yup.date().when(
        "endDate",
        (endDate: Date): SchemaLike => {
          return (
            endDate &&
            yup.date().max(endDate, "Start date should be before the end date")
          )
        },
      ),
    }),
    stillRepaying: yup.boolean(),
    endDate: yup.date().when("receivedLoanForgiveness", {
      is: true,
      then: yup.date().when(
        "startDate",
        (startDate: Date): SchemaLike => {
          return (
            startDate &&
            yup.date().min(startDate, "End date should be after the start date")
          )
        },
      ),
    }),
  },
  [["startDate", "endDate"]],
)

interface FormFieldsProps {
  formikProps: FormikProps<FormValues>
  states: string[]
}

const FormFields: FC<FormFieldsProps> = ({
  formikProps: { values, errors, setFieldValue, handleChange },
  states,
}) => {
  return (
    <>
      <SwitchField
        label="Have you ever received student loan repayment or forgiveness in exchange for practicing in an underserved area?"
        value={values.receivedLoanForgiveness}
        updateValue={(value: boolean): void => {
          setFieldValue("receivedLoanForgiveness", value)
        }}
        errors={errors.receivedLoanForgiveness}
      />
      {values.receivedLoanForgiveness && (
        <>
          <TextField
            label="Name of repayment program"
            value={values.repaymentProgramName}
            updateValue={handleChange("repaymentProgramName")}
            errors={errors.repaymentProgramName}
          />
          <TextField
            label="Name of institution"
            value={values.nameOfInstitution}
            updateValue={handleChange("nameOfInstitution")}
            errors={errors.nameOfInstitution}
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
            label="City"
            value={values.city}
            updateValue={handleChange("city")}
            errors={errors.city}
          />
          <AutocompleteField
            label="State"
            errors={errors.state}
            value={values.state}
            updateValue={handleChange("state")}
            suggestionsList={states}
          />
          <TextField
            label="How many years have you worked for repayment?"
            value={values.yearsWorkedForRepayment}
            updateValue={handleChange("yearsWorkedForRepayment")}
            errors={errors.yearsWorkedForRepayment}
          />
          <DatePickerField
            label="Start date"
            value={values.startedAt}
            updateValue={(_event: Event, value: Date | undefined): void => {
              setFieldValue("startedAt", value)
            }}
            errors={errors.startedAt}
          />
          {!values.stillRepaying && (
            <DatePickerField
              label="End date"
              value={values.endedAt}
              updateValue={(_event: Event, value: Date | undefined): void => {
                setFieldValue("endedAt", value)
              }}
              errors={errors.endedAt}
            />
          )}
        </>
      )}
    </>
  )
}

interface FormikStateHandlerProps {
  queryData: GetLoanRepaymentDetailDetailsQuery
  updateMutationData: UpdateLoanRepaymentDetailMutation | null | undefined
  mutationInFlight: boolean
  updateMutation: MutationFunction<
    UpdateLoanRepaymentDetailMutation,
    MutationUpdateLoanRepaymentDetailArgs
  >
  deleteMutation: MutationFunction<DeleteLoanRepaymentDetailMutation>
  deleteMutationData: DeleteLoanRepaymentDetailMutation | null | undefined
}

const FormikStateHandler: FC<FormikStateHandlerProps> = ({
  queryData,
  updateMutationData,
  mutationInFlight,
  updateMutation,
  deleteMutation,
  deleteMutationData,
}) => {
  const initialFormState = buildInitialFormValues(queryData)

  const handleOnSubmit = (formValues: FormValues): void => {
    if (formValues.receivedLoanForgiveness) {
      updateMutation({
        variables: { input: buildMutationVariables(formValues) },
      })
    } else {
      deleteMutation()
    }
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
              !!updateMutationData?.updateLoanRepaymentDetail
                ?.loanRepaymentDetail ||
              !!deleteMutationData?.deleteLoanRepaymentDetail?.success
            }
          >
            <FormFields formikProps={formikProps} states={queryData.states} />
          </FormNavigationHandler>
        )
      }}
    </Formik>
  )
}

const LoanRepaymentDetailForm: FC = () => {
  return (
    <GraphQLFormHandlerWithDelete<
      GetLoanRepaymentDetailDetailsQuery,
      UpdateLoanRepaymentDetailMutation,
      MutationUpdateLoanRepaymentDetailArgs,
      unknown,
      DeleteLoanRepaymentDetailMutation
    >
      queryDocument={GET_LOAN_REPAYMENT_DETAIL}
      updateMutationDocument={UPDATE_LOAN_REPAYMENT_DETAIL}
      deleteMutationDocument={DELETE_LOAN_REPAYMENT_DETAIL}
    >
      {(
        queryData,
        updateMutationData,
        mutationInFlight,
        updateMutation,
        deleteMutation,
        deleteMutationData,
      ): JSX.Element => {
        return (
          <FormikStateHandler
            queryData={queryData}
            updateMutationData={updateMutationData}
            mutationInFlight={mutationInFlight}
            updateMutation={updateMutation}
            deleteMutation={deleteMutation}
            deleteMutationData={deleteMutationData}
          />
        )
      }}
    </GraphQLFormHandlerWithDelete>
  )
}

export default LoanRepaymentDetailForm
