import React, { FC, ReactNode } from "react"
import { gql, MutationFunction } from "@apollo/client"
import { Formik, FormikProps } from "formik"

import {
  GetProfessionalLiabilityJudgmentsQuestionnaireDetailsQuery,
  UpdateProfessionalLiabilityJudgmentsQuestionnaireMutation,
  MutationUpdateProfessionalLiabilityJudgmentsQuestionnaireArgs,
  UpdateProfessionalLiabilityJudgmentsQuestionnaireMutationInput,
} from "../generated/graphql"

import {
  GraphQLFormHandler,
  FormNavigationHandler,
  SwitchField,
} from "./formHelpers"

const GET_PROFESSIONAL_LIABILITY_JUDGMENTS_QUESTIONNAIRE = gql`
  query GetProfessionalLiabilityJudgmentsQuestionnaireDetails {
    personalDetails {
      id
      professionalLiabilityJudgmentsQuestionnaire {
        judgmentsEntered
        liabilityClaimSettlementsPaid
        pendingLiabilityActions
        anyLegalActionDueToClinicalActions
      }
    }
  }
`

const UPDATE_PROFESSIONAL_LIABILITY_JUDGMENTS_QUESTIONNAIRE = gql`
  mutation UpdateProfessionalLiabilityJudgmentsQuestionnaire(
    $input: UpdateProfessionalLiabilityJudgmentsQuestionnaireMutationInput!
  ) {
    updateProfessionalLiabilityJudgmentsQuestionnaire(input: $input) {
      professionalLiabilityJudgmentsQuestionnaire {
        judgmentsEntered
      }
    }
  }
`

interface FormValues {
  judgmentsEntered: boolean
  liabilityClaimSettlementsPaid: boolean
  pendingLiabilityActions: boolean
  anyLegalActionDueToClinicalActions: boolean
}

const buildInitialFormValues = ({
  personalDetails,
}: GetProfessionalLiabilityJudgmentsQuestionnaireDetailsQuery): FormValues => {
  return {
    judgmentsEntered:
      personalDetails?.professionalLiabilityJudgmentsQuestionnaire
        ?.judgmentsEntered || false,
    liabilityClaimSettlementsPaid:
      personalDetails?.professionalLiabilityJudgmentsQuestionnaire
        ?.liabilityClaimSettlementsPaid || false,
    pendingLiabilityActions:
      personalDetails?.professionalLiabilityJudgmentsQuestionnaire
        ?.pendingLiabilityActions || false,
    anyLegalActionDueToClinicalActions:
      personalDetails?.professionalLiabilityJudgmentsQuestionnaire
        ?.anyLegalActionDueToClinicalActions || false,
  }
}

const buildMutationVariables = ({
  judgmentsEntered,
  liabilityClaimSettlementsPaid,
  pendingLiabilityActions,
  anyLegalActionDueToClinicalActions,
}: FormValues): UpdateProfessionalLiabilityJudgmentsQuestionnaireMutationInput => {
  return {
    judgmentsEntered,
    liabilityClaimSettlementsPaid,
    pendingLiabilityActions,
    anyLegalActionDueToClinicalActions,
  }
}

interface FormFieldsProps {
  formikProps: FormikProps<FormValues>
}

const FormFields: FC<FormFieldsProps> = ({
  formikProps: { errors, values, setFieldValue },
}) => {
  return (
    <>
      <SwitchField
        label="Have any professional liability judgments ever been entered against you?"
        value={values.judgmentsEntered}
        updateValue={(value: boolean): void => {
          setFieldValue("judgmentsEntered", value)
        }}
        errors={errors.judgmentsEntered}
      />
      <SwitchField
        label="Have any professional liability claim settlements ever been paid by you and/or paid on your behalf?"
        value={values.liabilityClaimSettlementsPaid}
        updateValue={(value: boolean): void => {
          setFieldValue("liabilityClaimSettlementsPaid", value)
        }}
        errors={errors.liabilityClaimSettlementsPaid}
      />
      <SwitchField
        label="Are there any currently pending professional liability suits, actions and/or claims filed against you?"
        value={values.pendingLiabilityActions}
        updateValue={(value: boolean): void => {
          setFieldValue("pendingLiabilityActions", value)
        }}
        errors={errors.pendingLiabilityActions}
      />
      <SwitchField
        label="Has any person or entity ever been sued for your clinical actions?"
        value={values.anyLegalActionDueToClinicalActions}
        updateValue={(value: boolean): void => {
          setFieldValue("anyLegalActionDueToClinicalActions", value)
        }}
        errors={errors.anyLegalActionDueToClinicalActions}
      />
    </>
  )
}

interface FormikStateHandlerProps {
  queryData: GetProfessionalLiabilityJudgmentsQuestionnaireDetailsQuery
  mutationData:
    | UpdateProfessionalLiabilityJudgmentsQuestionnaireMutation
    | null
    | undefined
  mutationInFlight: boolean
  mutation: MutationFunction<
    UpdateProfessionalLiabilityJudgmentsQuestionnaireMutation,
    MutationUpdateProfessionalLiabilityJudgmentsQuestionnaireArgs
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
              !!mutationData?.updateProfessionalLiabilityJudgmentsQuestionnaire
                ?.professionalLiabilityJudgmentsQuestionnaire
            }
          >
            <FormFields formikProps={formikProps} />
          </FormNavigationHandler>
        )
      }}
    </Formik>
  )
}

const ProfessionalLiabilityJudgmentsQuestionnaireForm: FC = () => {
  return (
    <GraphQLFormHandler<
      GetProfessionalLiabilityJudgmentsQuestionnaireDetailsQuery,
      UpdateProfessionalLiabilityJudgmentsQuestionnaireMutation,
      MutationUpdateProfessionalLiabilityJudgmentsQuestionnaireArgs
    >
      queryDocument={GET_PROFESSIONAL_LIABILITY_JUDGMENTS_QUESTIONNAIRE}
      mutationDocument={UPDATE_PROFESSIONAL_LIABILITY_JUDGMENTS_QUESTIONNAIRE}
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

export default ProfessionalLiabilityJudgmentsQuestionnaireForm
