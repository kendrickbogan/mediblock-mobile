import React, { FC, ReactNode } from "react"
import { gql, MutationFunction } from "@apollo/client"
import * as yup from "yup"
import { Formik, FormikProps } from "formik"

import {
  GetHealthProfessionsScholarshipsQuery,
  UpdateHealthProfessionsScholarshipMutation,
  MutationUpdateHealthProfessionsScholarshipArgs,
  UpdateHealthProfessionsScholarshipMutationInput,
  DeleteHealthProfessionsScholarshipMutation,
} from "../generated/graphql"

import {
  TextField,
  DatePickerField,
  FormNavigationHandler,
  SwitchField,
  GraphQLFormHandlerWithDelete,
  yupHelpers,
} from "./formHelpers"
import { dateOrToday } from "../dateTimeUtils"

const GET_HEALTH_PROFESSIONS_SCHOLARSHIP = gql`
  query GetHealthProfessionsScholarships {
    personalDetails {
      id
      healthProfessionsScholarship {
        militaryBranchScholarshipSponsor
        startedAt
        endedAt
      }
    }
  }
`

const UPDATE_HEALTH_PROFESSIONS_SCHOLARSHIP = gql`
  mutation UpdateHealthProfessionsScholarship(
    $input: UpdateHealthProfessionsScholarshipMutationInput!
  ) {
    updateHealthProfessionsScholarship(input: $input) {
      healthProfessionsScholarship {
        militaryBranchScholarshipSponsor
      }
    }
  }
`

const DELETE_HEALTH_PROFESSIONS_SCHOLARSHIP = gql`
  mutation DeleteHealthProfessionsScholarship {
    deleteHealthProfessionsScholarship {
      success
    }
  }
`

interface FormValues {
  receivedScholarship: boolean
  militaryBranchScholarshipSponsor: string
  startedAt: Date
  endedAt: Date
}

const buildInitialFormValues = ({
  personalDetails,
}: GetHealthProfessionsScholarshipsQuery): FormValues => {
  return {
    receivedScholarship:
      !!personalDetails?.healthProfessionsScholarship
        ?.militaryBranchScholarshipSponsor || false,
    militaryBranchScholarshipSponsor:
      personalDetails?.healthProfessionsScholarship
        ?.militaryBranchScholarshipSponsor || "",
    startedAt: dateOrToday(
      personalDetails?.healthProfessionsScholarship?.startedAt,
    ),
    endedAt: dateOrToday(
      personalDetails?.healthProfessionsScholarship?.endedAt,
    ),
  }
}

const buildMutationVariables = ({
  militaryBranchScholarshipSponsor,
  startedAt,
  endedAt,
}: FormValues): UpdateHealthProfessionsScholarshipMutationInput => {
  return {
    militaryBranchScholarshipSponsor,
    startedAt,
    endedAt,
  }
}

const validationSchema = yup.object().shape(
  {
    militaryBranchScholarshipSponsor: yup.string().when("receivedScholarship", {
      is: true,
      then: yup.string(),
    }),
    ...yupHelpers.startAndEndValidations,
  },
  [["endedAt", "startedAt"]],
)

interface FormFieldsProps {
  formikProps: FormikProps<FormValues>
}

const FormFields: FC<FormFieldsProps> = ({
  formikProps: { errors, values, handleChange, setFieldValue },
}) => {
  return (
    <>
      <SwitchField
        label="Did you receive a US Military Health Professions Scholarship?"
        value={values.receivedScholarship}
        updateValue={(value: boolean): void => {
          setFieldValue("receivedScholarship", value)
        }}
        errors={errors.receivedScholarship}
      />
      {values.receivedScholarship && (
        <>
          <TextField
            label="Military branch scholarship sponsor"
            value={values.militaryBranchScholarshipSponsor}
            updateValue={handleChange("militaryBranchScholarshipSponsor")}
            errors={errors.militaryBranchScholarshipSponsor}
          />
          <DatePickerField
            label="Start date"
            value={values.startedAt}
            updateValue={(_event: Event, value: Date | undefined): void => {
              setFieldValue("startedAt", value)
            }}
            errors={errors.startedAt}
          />
          <DatePickerField
            label="End date"
            value={values.endedAt}
            updateValue={(_event: Event, value: Date | undefined): void => {
              setFieldValue("endedAt", value)
            }}
            errors={errors.endedAt}
          />
        </>
      )}
    </>
  )
}

interface FormikStateHandlerProps {
  queryData: GetHealthProfessionsScholarshipsQuery
  updateMutationData:
    | UpdateHealthProfessionsScholarshipMutation
    | null
    | undefined
  mutationInFlight: boolean
  updateMutation: MutationFunction<
    UpdateHealthProfessionsScholarshipMutation,
    MutationUpdateHealthProfessionsScholarshipArgs
  >
  deleteMutation: MutationFunction<DeleteHealthProfessionsScholarshipMutation>
  deleteMutationData:
    | DeleteHealthProfessionsScholarshipMutation
    | null
    | undefined
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
    if (formValues.receivedScholarship) {
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
              !!updateMutationData?.updateHealthProfessionsScholarship
                ?.healthProfessionsScholarship
                ?.militaryBranchScholarshipSponsor ||
              !!deleteMutationData?.deleteHealthProfessionsScholarship?.success
            }
          >
            <FormFields formikProps={formikProps} />
          </FormNavigationHandler>
        )
      }}
    </Formik>
  )
}

const HealthProfessionsScholarshipForm: FC = () => {
  return (
    <GraphQLFormHandlerWithDelete<
      GetHealthProfessionsScholarshipsQuery,
      UpdateHealthProfessionsScholarshipMutation,
      MutationUpdateHealthProfessionsScholarshipArgs,
      unknown,
      DeleteHealthProfessionsScholarshipMutation
    >
      queryDocument={GET_HEALTH_PROFESSIONS_SCHOLARSHIP}
      updateMutationDocument={UPDATE_HEALTH_PROFESSIONS_SCHOLARSHIP}
      deleteMutationDocument={DELETE_HEALTH_PROFESSIONS_SCHOLARSHIP}
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

export default HealthProfessionsScholarshipForm
