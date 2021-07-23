import React, { FC, ReactNode } from "react"
import { gql, MutationFunction } from "@apollo/client"
import * as yup from "yup"
import { Formik, FormikProps } from "formik"

import { dateOrToday } from "../dateTimeUtils"
import {
  GetBoardCertificationDetailsQuery,
  UpdateBoardCertificationMutation,
  UpdateBoardCertificationMutationInput,
  MutationUpdateBoardCertificationArgs,
  SpecialtyRankEnum,
} from "../generated/graphql"
import {
  SwitchField,
  DatePickerField,
  GraphQLFormHandler,
  FormNavigationHandler,
  TextField,
} from "./formHelpers"

const GET_BOARD_CERTIFICATION = gql`
  query GetBoardCertificationDetails($specialtyRank: SpecialtyRankEnum!) {
    personalDetails {
      id
      boardCertification(specialtyRank: $specialtyRank) {
        boardCertificationQuestionnaire {
          comments
          expectedExamDate
          hasTakenCertificationExam
          hasTakenCertificationExamBoardName
          planningToTakeExam
          takenPartOnePartTwoEligible
          takenPartOnePartTwoEligibleBoardName
        }
        boardCertified
        certifyingBoardName
        expiresAt
        initialCertificationDate
        recertificationDate
        specialty
        specialtyRank
      }
    }
  }
`

const UPDATE_BOARD_CERTIFICATION = gql`
  mutation UpdateBoardCertification(
    $input: UpdateBoardCertificationMutationInput!
  ) {
    updateBoardCertification(input: $input) {
      boardCertification {
        specialty
      }
    }
  }
`

type FormValues = {
  boardCertified: boolean
  certifyingBoardName: string
  expiresAt: Date
  initialCertificationDate: Date
  recertificationDate: Date
  specialty: string
  specialtyRank: SpecialtyRankEnum
  boardCertificationQuestionnaire: {
    comments: string
    expectedExamDate: Date
    hasTakenCertificationExam: boolean
    hasTakenCertificationExamBoardName: string
    planningToTakeExam: boolean
    takenPartOnePartTwoEligible: boolean
    takenPartOnePartTwoEligibleBoardName: string
  }
}

const buildInitialFormValues = (
  { personalDetails }: GetBoardCertificationDetailsQuery,
  specialtyRank: SpecialtyRankEnum,
): FormValues => {
  return {
    boardCertified: personalDetails?.boardCertification?.boardCertified ?? true,
    certifyingBoardName:
      personalDetails?.boardCertification?.certifyingBoardName || "",
    expiresAt: dateOrToday(personalDetails?.boardCertification?.expiresAt),
    initialCertificationDate: dateOrToday(
      personalDetails?.boardCertification?.initialCertificationDate,
    ),
    recertificationDate: dateOrToday(
      personalDetails?.boardCertification?.recertificationDate,
    ),
    specialty: personalDetails?.boardCertification?.specialty || "",
    specialtyRank,
    boardCertificationQuestionnaire: {
      comments:
        personalDetails?.boardCertification?.boardCertificationQuestionnaire
          ?.comments || "",
      expectedExamDate: dateOrToday(
        personalDetails?.boardCertification?.boardCertificationQuestionnaire
          ?.expectedExamDate,
      ),
      hasTakenCertificationExam:
        personalDetails?.boardCertification?.boardCertificationQuestionnaire
          ?.hasTakenCertificationExam || false,
      hasTakenCertificationExamBoardName:
        personalDetails?.boardCertification?.boardCertificationQuestionnaire
          ?.hasTakenCertificationExamBoardName || "",
      planningToTakeExam:
        personalDetails?.boardCertification?.boardCertificationQuestionnaire
          ?.planningToTakeExam || false,
      takenPartOnePartTwoEligible:
        personalDetails?.boardCertification?.boardCertificationQuestionnaire
          ?.takenPartOnePartTwoEligible || false,
      takenPartOnePartTwoEligibleBoardName:
        personalDetails?.boardCertification?.boardCertificationQuestionnaire
          ?.takenPartOnePartTwoEligibleBoardName || "",
    },
  }
}

const buildMutationVariables = ({
  boardCertified,
  certifyingBoardName,
  expiresAt,
  initialCertificationDate,
  recertificationDate,
  specialty,
  specialtyRank,
  boardCertificationQuestionnaire,
}: FormValues): UpdateBoardCertificationMutationInput => {
  return {
    boardCertified,
    certifyingBoardName,
    expiresAt,
    initialCertificationDate,
    recertificationDate,
    specialty,
    specialtyRank,
    boardCertificationQuestionnaireAttributes: boardCertificationQuestionnaire,
  }
}

const validationSchema = yup.object().shape({
  specialty: yup.string(),
  certifyingBoardName: yup.string().when("boardCertified", {
    is: true,
    then: yup.string(),
  }),
  boardCertificationQuestionnaire: yup.object().when("boardCertified", {
    is: false,
    then: yup.object({
      hasTakenCertificationExamBoardName: yup
        .string()
        .when("hasTakenCertificationExam", {
          is: true,
          then: yup.string(),
        }),
      takenPartOnePartTwoEligibleBoardName: yup
        .string()
        .when("takenPartOnePartTwoEligible", {
          is: true,
          then: yup.string(),
        }),
    }),
  }),
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
        label="Specialty"
        value={values.specialty}
        updateValue={handleChange("specialty")}
        errors={errors.specialty}
      />
      <SwitchField
        label="Are you board certified?"
        value={values.boardCertified}
        updateValue={(value: boolean): void => {
          setFieldValue("boardCertified", value)
        }}
        errors={errors.boardCertified}
      />
      {values.boardCertified ? (
        <>
          <TextField
            label="Certifying board name"
            value={values.certifyingBoardName}
            updateValue={handleChange("certifyingBoardName")}
            errors={errors.certifyingBoardName}
          />
          <DatePickerField
            label="Expiration date"
            value={values.expiresAt}
            updateValue={(_event: Event, value: Date | undefined): void => {
              setFieldValue("expiresAt", value)
            }}
            errors={errors.expiresAt}
            isExpirationDate
          />
          <DatePickerField
            label="Initial certification date"
            value={values.initialCertificationDate}
            updateValue={(_event: Event, value: Date | undefined): void => {
              setFieldValue("initialCertificationDate", value)
            }}
            errors={errors.initialCertificationDate}
          />
          <DatePickerField
            label="Recertification date"
            value={values.recertificationDate}
            updateValue={(_event: Event, value: Date | undefined): void => {
              setFieldValue("recertificationDate", value)
            }}
            errors={errors.recertificationDate}
          />
        </>
      ) : (
        <>
          {!values.boardCertificationQuestionnaire.planningToTakeExam && (
            <SwitchField
              label="Have you taken the certification exam?"
              value={
                values.boardCertificationQuestionnaire.hasTakenCertificationExam
              }
              updateValue={(value: boolean): void => {
                setFieldValue(
                  "boardCertificationQuestionnaire.hasTakenCertificationExam",
                  value,
                )
              }}
              errors={
                errors.boardCertificationQuestionnaire
                  ?.hasTakenCertificationExam
              }
            />
          )}
          {values.boardCertificationQuestionnaire.hasTakenCertificationExam && (
            <TextField
              label="Certifying board name"
              value={
                values.boardCertificationQuestionnaire
                  .hasTakenCertificationExamBoardName
              }
              updateValue={handleChange(
                "boardCertificationQuestionnaire.hasTakenCertificationExamBoardName",
              )}
              errors={
                errors.boardCertificationQuestionnaire
                  ?.hasTakenCertificationExamBoardName
              }
            />
          )}
          {!values.boardCertificationQuestionnaire
            .hasTakenCertificationExam && (
            <>
              <SwitchField
                label="Are you planning to take the exam?"
                value={
                  values.boardCertificationQuestionnaire.planningToTakeExam
                }
                updateValue={(value: boolean): void => {
                  setFieldValue(
                    "boardCertificationQuestionnaire.planningToTakeExam",
                    value,
                  )
                }}
                errors={
                  errors.boardCertificationQuestionnaire?.planningToTakeExam
                }
              />
              {values.boardCertificationQuestionnaire.planningToTakeExam && (
                <DatePickerField
                  label="Expected exam date"
                  value={
                    values.boardCertificationQuestionnaire?.expectedExamDate
                  }
                  updateValue={(
                    _event: Event,
                    value: Date | undefined,
                  ): void => {
                    setFieldValue(
                      "boardCertificationQuestionnaire.expectedExamDate",
                      value,
                    )
                  }}
                  errors={
                    errors.boardCertificationQuestionnaire?.expectedExamDate
                  }
                />
              )}
            </>
          )}
          <SwitchField
            label="I have taken and passed the Part I exam and am eligible to take Part II of the exam"
            value={
              values.boardCertificationQuestionnaire.takenPartOnePartTwoEligible
            }
            updateValue={(value: boolean): void => {
              setFieldValue(
                "boardCertificationQuestionnaire.takenPartOnePartTwoEligible",
                value,
              )
            }}
            errors={
              errors.boardCertificationQuestionnaire
                ?.takenPartOnePartTwoEligible
            }
          />
          {values.boardCertificationQuestionnaire
            .takenPartOnePartTwoEligible && (
            <TextField
              label="Certifying board name"
              value={
                values.boardCertificationQuestionnaire
                  .takenPartOnePartTwoEligibleBoardName
              }
              updateValue={handleChange(
                "boardCertificationQuestionnaire.takenPartOnePartTwoEligibleBoardName",
              )}
              errors={
                errors.boardCertificationQuestionnaire
                  ?.takenPartOnePartTwoEligibleBoardName
              }
            />
          )}
          <TextField
            label="Comments"
            value={values.boardCertificationQuestionnaire.comments}
            updateValue={handleChange(
              "boardCertificationQuestionnaire.comments",
            )}
            errors={errors.boardCertificationQuestionnaire?.comments}
          />
        </>
      )}
    </>
  )
}

interface FormikStateHandlerProps {
  queryData: GetBoardCertificationDetailsQuery
  mutationData: UpdateBoardCertificationMutation | null | undefined
  mutationInFlight: boolean
  mutation: MutationFunction<
    UpdateBoardCertificationMutation,
    MutationUpdateBoardCertificationArgs
  >
  specialtyRank: SpecialtyRankEnum
}

const FormikStateHandler: FC<FormikStateHandlerProps> = ({
  queryData,
  mutationData,
  mutationInFlight,
  mutation,
  specialtyRank,
}) => {
  const initialFormState = buildInitialFormValues(queryData, specialtyRank)

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
              !!mutationData?.updateBoardCertification?.boardCertification
            }
          >
            <FormFields formikProps={formikProps} />
          </FormNavigationHandler>
        )
      }}
    </Formik>
  )
}

interface BoardCertificationFormProps {
  specialtyRank: SpecialtyRankEnum
}

const BoardCertificationForm: FC<BoardCertificationFormProps> = ({
  specialtyRank,
}) => {
  return (
    <GraphQLFormHandler<
      GetBoardCertificationDetailsQuery,
      UpdateBoardCertificationMutation,
      MutationUpdateBoardCertificationArgs
    >
      queryDocument={GET_BOARD_CERTIFICATION}
      mutationDocument={UPDATE_BOARD_CERTIFICATION}
      queryVariables={{ specialtyRank }}
    >
      {(queryData, mutationData, mutationInFlight, mutation): JSX.Element => {
        return (
          <FormikStateHandler
            queryData={queryData}
            mutationData={mutationData}
            mutationInFlight={mutationInFlight}
            mutation={mutation}
            specialtyRank={specialtyRank}
          />
        )
      }}
    </GraphQLFormHandler>
  )
}

export default BoardCertificationForm
