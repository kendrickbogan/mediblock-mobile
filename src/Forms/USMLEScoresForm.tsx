import React, { FC, ReactNode } from "react"
import { gql, MutationFunction } from "@apollo/client"
import * as yup from "yup"
import { Formik, FormikProps } from "formik"

import { dateOrToday } from "../dateTimeUtils"
import {
  GetUsmleScoresDetailsQuery,
  UpdateUsmleScoresMutationInput,
  MutationUpdateUsmleScoresArgs,
  UpdateUsmleScoresMutation,
} from "../generated/graphql"
import {
  SwitchField,
  DatePickerField,
  GraphQLFormHandler,
  FormNavigationHandler,
  TextField,
} from "./formHelpers"

const GET_USMLE = gql`
  query GetUSMLEScoresDetails {
    personalDetails {
      id
      usmleScores {
        usmleIdNumber
        step1ExamPassed
        step1ExamScore
        step1ExamDate
        step2ExamPassed
        step2ExamScore
        step2ExamDate
        step3ExamPassed
        step3ExamScore
        step3ExamDate
      }
    }
  }
`

const UPDATE_USMLE = gql`
  mutation UpdateUSMLEScores($input: UpdateUSMLEScoresMutationInput!) {
    updateUsmleScores(input: $input) {
      usmleScores {
        usmleIdNumber
      }
    }
  }
`

type FormValues = {
  usmleIdNumber: string
  step1ExamPassed: boolean
  step1ExamScore: string
  step1ExamDate: Date
  step2ExamPassed: boolean
  step2ExamScore: string
  step2ExamDate: Date
  step3ExamPassed: boolean
  step3ExamScore: string
  step3ExamDate: Date
}

const buildInitialFormValues = ({
  personalDetails,
}: GetUsmleScoresDetailsQuery): FormValues => {
  return {
    usmleIdNumber: personalDetails?.usmleScores?.usmleIdNumber || "",
    step1ExamPassed: personalDetails?.usmleScores?.step1ExamPassed || false,
    step1ExamScore: personalDetails?.usmleScores?.step1ExamScore || "",
    step1ExamDate: dateOrToday(personalDetails?.usmleScores?.step1ExamDate),
    step2ExamPassed: personalDetails?.usmleScores?.step2ExamPassed || false,
    step2ExamScore: personalDetails?.usmleScores?.step2ExamScore || "",
    step2ExamDate: dateOrToday(personalDetails?.usmleScores?.step2ExamDate),
    step3ExamPassed: personalDetails?.usmleScores?.step3ExamPassed || false,
    step3ExamScore: personalDetails?.usmleScores?.step3ExamScore || "",
    step3ExamDate: dateOrToday(personalDetails?.usmleScores?.step3ExamDate),
  }
}

const buildMutationVariables = ({
  usmleIdNumber,
  step1ExamPassed,
  step1ExamScore,
  step1ExamDate,
  step2ExamPassed,
  step2ExamScore,
  step2ExamDate,
  step3ExamPassed,
  step3ExamScore,
  step3ExamDate,
}: FormValues): UpdateUsmleScoresMutationInput => {
  return {
    usmleIdNumber,
    step1ExamPassed,
    step1ExamScore,
    step1ExamDate,
    step2ExamPassed,
    step2ExamScore,
    step2ExamDate,
    step3ExamPassed,
    step3ExamScore,
    step3ExamDate,
  }
}

const validationSchema = yup.object().shape({
  usmleIdNumber: yup.number().typeError("USMLE ID number must be a number"),
  step1ExamScore: yup.number().typeError("Step 1 exam score must be a number"),
  step2ExamScore: yup.number().typeError("Step 2 exam score must be a number"),
  step3ExamScore: yup.number().typeError("Step 3 exam score must be a number"),
})

interface FormFieldsProps {
  formikProps: FormikProps<FormValues>
}

const FormFields: FC<FormFieldsProps> = ({
  formikProps: { values, errors, setFieldValue, handleChange },
}) => {
  return (
    <>
      <TextField
        label="USMLE ID Number"
        value={values.usmleIdNumber}
        updateValue={handleChange("usmleIdNumber")}
        errors={errors.usmleIdNumber}
        keyboardType="numeric"
      />
      <SwitchField
        label="Step 1 exam passed?"
        value={values.step1ExamPassed}
        updateValue={(value: boolean): void => {
          setFieldValue("step1ExamPassed", value)
        }}
        errors={errors.step1ExamPassed}
      />
      <TextField
        label="Step 1 exam score"
        value={values.step1ExamScore}
        updateValue={handleChange("step1ExamScore")}
        errors={errors.step1ExamScore}
        keyboardType="numeric"
      />
      <DatePickerField
        label="Step 1 exam date"
        value={values.step1ExamDate}
        updateValue={(_event: Event, value: Date | undefined): void => {
          setFieldValue("step1ExamDate", value)
        }}
        errors={errors.step1ExamDate}
      />
      <SwitchField
        label="Step 2 exam passed?"
        value={values.step2ExamPassed}
        updateValue={(value: boolean): void => {
          setFieldValue("step2ExamPassed", value)
        }}
        errors={errors.step2ExamPassed}
      />
      <TextField
        label="Step 2 exam score"
        value={values.step2ExamScore}
        updateValue={handleChange("step2ExamScore")}
        errors={errors.step2ExamScore}
        keyboardType="numeric"
      />
      <DatePickerField
        label="Step 2 exam date"
        value={values.step2ExamDate}
        updateValue={(_event: Event, value: Date | undefined): void => {
          setFieldValue("step2ExamDate", value)
        }}
        errors={errors.step2ExamDate}
      />
      <SwitchField
        label="Step 3 exam passed?"
        value={values.step3ExamPassed}
        updateValue={(value: boolean): void => {
          setFieldValue("step3ExamPassed", value)
        }}
        errors={errors.step3ExamPassed}
      />
      <TextField
        label="Step 3 exam score"
        value={values.step3ExamScore}
        updateValue={handleChange("step3ExamScore")}
        errors={errors.step3ExamScore}
        keyboardType="numeric"
      />
      <DatePickerField
        label="Step 3 exam date"
        value={values.step3ExamDate}
        updateValue={(_event: Event, value: Date | undefined): void => {
          setFieldValue("step3ExamDate", value)
        }}
        errors={errors.step3ExamDate}
      />
    </>
  )
}

interface FormikStateHandlerProps {
  queryData: GetUsmleScoresDetailsQuery
  mutationData: UpdateUsmleScoresMutation | null | undefined
  mutationInFlight: boolean
  mutation: MutationFunction<
    UpdateUsmleScoresMutation,
    MutationUpdateUsmleScoresArgs
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
              !!mutationData?.updateUsmleScores?.usmleScores?.usmleIdNumber
            }
          >
            <FormFields formikProps={formikProps} />
          </FormNavigationHandler>
        )
      }}
    </Formik>
  )
}

const USMLEScoresForm: FC = () => {
  return (
    <GraphQLFormHandler<
      GetUsmleScoresDetailsQuery,
      UpdateUsmleScoresMutation,
      MutationUpdateUsmleScoresArgs
    >
      queryDocument={GET_USMLE}
      mutationDocument={UPDATE_USMLE}
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

export default USMLEScoresForm
