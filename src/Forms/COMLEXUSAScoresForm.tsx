import React, { FC, ReactNode } from "react"
import { gql, MutationFunction } from "@apollo/client"
import * as yup from "yup"
import { Formik, FormikProps } from "formik"

import { dateOrToday } from "../dateTimeUtils"
import {
  GetComlexScoresDetailsQuery,
  UpdateComlexScoresMutationInput,
  MutationUpdateComlexScoresArgs,
  UpdateComlexScoresMutation,
} from "../generated/graphql"
import {
  SwitchField,
  DatePickerField,
  GraphQLFormHandler,
  FormNavigationHandler,
  TextField,
} from "./formHelpers"

const GET_COMLEX_SCORES = gql`
  query GetCOMLEXScoresDetails {
    personalDetails {
      id
      comlexUsaScores {
        nbomeIdNumber
        level1Passed
        level1Score
        level1ExamDate
        level2CePassed
        level2CeScore
        level2CeExamDate
        level2PePassed
        level2PeScore
        level2PeExamDate
        level3Passed
        level3Score
        level3ExamDate
      }
    }
  }
`

const UPDATE_COMLEX_SCORES = gql`
  mutation UpdateComlexScores($input: UpdateCOMLEXScoresMutationInput!) {
    updateComlexScores(input: $input) {
      comlexScores {
        nbomeIdNumber
      }
    }
  }
`

type FormValues = {
  nbomeIdNumber: string
  level1Passed: boolean
  level1Score: string
  level1ExamDate: Date
  level2CePassed: boolean
  level2CeScore: string
  level2CeExamDate: Date
  level2PePassed: boolean
  level2PeScore: string
  level2PeExamDate: Date
  level3Passed: boolean
  level3Score: string
  level3ExamDate: Date
}

const buildInitialFormValues = ({
  personalDetails,
}: GetComlexScoresDetailsQuery): FormValues => {
  return {
    nbomeIdNumber: personalDetails?.comlexUsaScores?.nbomeIdNumber || "",
    level1Passed: personalDetails?.comlexUsaScores?.level1Passed || false,
    level1Score:
      personalDetails?.comlexUsaScores?.level1Score?.toString() || "",
    level1ExamDate: dateOrToday(
      personalDetails?.comlexUsaScores?.level1ExamDate,
    ),
    level2CePassed: personalDetails?.comlexUsaScores?.level2CePassed || false,
    level2CeScore:
      personalDetails?.comlexUsaScores?.level2CeScore?.toString() || "",
    level2CeExamDate: dateOrToday(
      personalDetails?.comlexUsaScores?.level2CeExamDate,
    ),
    level2PePassed: personalDetails?.comlexUsaScores?.level2PePassed || false,
    level2PeScore:
      personalDetails?.comlexUsaScores?.level2PeScore?.toString() || "",
    level2PeExamDate: dateOrToday(
      personalDetails?.comlexUsaScores?.level2PeExamDate,
    ),
    level3Passed: personalDetails?.comlexUsaScores?.level3Passed || false,
    level3Score:
      personalDetails?.comlexUsaScores?.level3Score?.toString() || "",
    level3ExamDate: dateOrToday(
      personalDetails?.comlexUsaScores?.level3ExamDate,
    ),
  }
}

const buildMutationVariables = ({
  nbomeIdNumber,
  level1Passed,
  level1Score,
  level1ExamDate,
  level2CePassed,
  level2CeScore,
  level2CeExamDate,
  level2PePassed,
  level2PeScore,
  level2PeExamDate,
  level3Passed,
  level3Score,
  level3ExamDate,
}: FormValues): UpdateComlexScoresMutationInput => {
  return {
    nbomeIdNumber,
    level1Passed,
    level1Score: parseInt(level1Score) || 0,
    level1ExamDate,
    level2CePassed,
    level2CeScore: parseInt(level2CeScore) || 0,
    level2CeExamDate,
    level2PePassed,
    level2PeScore: parseInt(level2PeScore) || 0,
    level2PeExamDate,
    level3Passed,
    level3Score: parseInt(level3Score) || 0,
    level3ExamDate,
  }
}

const validationSchema = yup.object().shape({
  nbomeIdNumber: yup.number().typeError("COMLEX ID number must be a number"),
  level1Score: yup.number().typeError("Level 1 exam score must be a number"),
  level2CeScore: yup.number().typeError("Level 2 exam score must be a number"),
  level2PeScore: yup.number().typeError("Level 2 exam score must be a number"),
  level3Score: yup.number().typeError("Level 3 exam score must be a number"),
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
        label="NBOME ID Number"
        value={values.nbomeIdNumber}
        updateValue={handleChange("nbomeIdNumber")}
        errors={errors.nbomeIdNumber}
        keyboardType="numeric"
      />
      <SwitchField
        label="Level 1 exam passed?"
        value={values.level1Passed}
        updateValue={(value: boolean): void => {
          setFieldValue("level1Passed", value)
        }}
        errors={errors.level1Passed}
      />
      <TextField
        label="Level 1 exam score"
        value={values.level1Score}
        updateValue={handleChange("level1Score")}
        errors={errors.level1Score}
        keyboardType="numeric"
      />
      <DatePickerField
        label="Level 1 exam date"
        value={values.level1ExamDate}
        updateValue={(_event: Event, value: Date | undefined): void => {
          setFieldValue("level1ExamDate", value)
        }}
        errors={errors.level1ExamDate}
      />
      <SwitchField
        label="Level 2 CE exam passed?"
        value={values.level2CePassed}
        updateValue={(value: boolean): void => {
          setFieldValue("level2CePassed", value)
        }}
        errors={errors.level2CePassed}
      />
      <TextField
        label="Level 2 CE exam score"
        value={values.level2CeScore}
        updateValue={handleChange("level2CeScore")}
        errors={errors.level2CeScore}
        keyboardType="numeric"
      />
      <DatePickerField
        label="Level 2 CE exam date"
        value={values.level2CeExamDate}
        updateValue={(_event: Event, value: Date | undefined): void => {
          setFieldValue("level2CeExamDate", value)
        }}
        errors={errors.level2CeExamDate}
      />
      <SwitchField
        label="Level 2 PE exam passed?"
        value={values.level2PePassed}
        updateValue={(value: boolean): void => {
          setFieldValue("level2PePassed", value)
        }}
        errors={errors.level2PePassed}
      />
      <TextField
        label="Level 2 PE exam score"
        value={values.level2PeScore}
        updateValue={handleChange("level2PeScore")}
        errors={errors.level2PeScore}
        keyboardType="numeric"
      />
      <DatePickerField
        label="Level 2 PE exam date"
        value={values.level2PeExamDate}
        updateValue={(_event: Event, value: Date | undefined): void => {
          setFieldValue("level2PeExamDate", value)
        }}
        errors={errors.level2PeExamDate}
      />
      <SwitchField
        label="Level 3 exam passed?"
        value={values.level3Passed}
        updateValue={(value: boolean): void => {
          setFieldValue("level3Passed", value)
        }}
        errors={errors.level3Passed}
      />
      <TextField
        label="Level 3 exam score"
        value={values.level3Score}
        updateValue={handleChange("level3Score")}
        errors={errors.level3Score}
        keyboardType="numeric"
      />
      <DatePickerField
        label="Level 3 exam date"
        value={values.level3ExamDate}
        updateValue={(_event: Event, value: Date | undefined): void => {
          setFieldValue("level3ExamDate", value)
        }}
        errors={errors.level3ExamDate}
      />
    </>
  )
}

interface FormikStateHandlerProps {
  queryData: GetComlexScoresDetailsQuery
  mutationData: UpdateComlexScoresMutation | null | undefined
  mutationInFlight: boolean
  mutation: MutationFunction<
    UpdateComlexScoresMutation,
    MutationUpdateComlexScoresArgs
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
              !!mutationData?.updateComlexScores?.comlexScores?.nbomeIdNumber
            }
          >
            <FormFields formikProps={formikProps} />
          </FormNavigationHandler>
        )
      }}
    </Formik>
  )
}

const COMLEXScoresForm: FC = () => {
  return (
    <GraphQLFormHandler<
      GetComlexScoresDetailsQuery,
      UpdateComlexScoresMutation,
      MutationUpdateComlexScoresArgs
    >
      queryDocument={GET_COMLEX_SCORES}
      mutationDocument={UPDATE_COMLEX_SCORES}
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

export default COMLEXScoresForm
