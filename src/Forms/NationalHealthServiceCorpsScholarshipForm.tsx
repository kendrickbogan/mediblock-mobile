import React, { FC, ReactNode } from "react"
import { gql, MutationFunction } from "@apollo/client"
import * as yup from "yup"
import { Formik, FormikProps } from "formik"

import {
  GetNationalHealthServiceCorpsScholarshipsQuery,
  UpdateNationalHealthServiceCorpsScholarshipMutation,
  MutationUpdateNationalHealthServiceCorpsScholarshipArgs,
  UpdateNationalHealthServiceCorpsScholarshipMutationInput,
  DeleteNationalHealthServiceCorpScholarshipMutation,
} from "../generated/graphql"

import {
  DatePickerField,
  FormNavigationHandler,
  SwitchField,
  GraphQLFormHandlerWithDelete,
  yupHelpers,
} from "./formHelpers"
import { dateOrToday } from "../dateTimeUtils"

const GET_NATIONAL_HEALTH_SERVICE_CORPS_SCHOLARSHIP = gql`
  query GetNationalHealthServiceCorpsScholarships {
    personalDetails {
      id
      nationalHealthServiceCorpsScholarship {
        startedAt
        endedAt
      }
    }
  }
`

const UPDATE_NATIONAL_HEALTH_SERVICE_CORPS_SCHOLARSHIP = gql`
  mutation UpdateNationalHealthServiceCorpsScholarship(
    $input: UpdateNationalHealthServiceCorpsScholarshipMutationInput!
  ) {
    updateNationalHealthServiceCorpsScholarship(input: $input) {
      scholarship {
        startedAt
      }
    }
  }
`

const DELETE_NATIONAL_HEALTH_SERVICE_CORPS_SCHOLARSHIP = gql`
  mutation DeleteNationalHealthServiceCorpScholarship {
    deleteNationHealthServiceCorpsScholarship {
      success
    }
  }
`

interface FormValues {
  receivedScholarship: boolean
  startedAt: Date
  endedAt: Date
}

const buildInitialFormValues = ({
  personalDetails,
}: GetNationalHealthServiceCorpsScholarshipsQuery): FormValues => {
  return {
    receivedScholarship:
      !!personalDetails?.nationalHealthServiceCorpsScholarship?.startedAt ||
      false,
    startedAt: dateOrToday(
      personalDetails?.nationalHealthServiceCorpsScholarship?.startedAt,
    ),
    endedAt: dateOrToday(
      personalDetails?.nationalHealthServiceCorpsScholarship?.endedAt,
    ),
  }
}

const buildMutationVariables = ({
  startedAt,
  endedAt,
}: FormValues): UpdateNationalHealthServiceCorpsScholarshipMutationInput => {
  return {
    startedAt,
    endedAt,
  }
}

const validationSchema = yup.object().shape(
  {
    ...yupHelpers.startAndEndValidations,
  },
  [["endedAt", "startedAt"]],
)

interface FormFieldsProps {
  formikProps: FormikProps<FormValues>
}

const FormFields: FC<FormFieldsProps> = ({
  formikProps: { errors, values, setFieldValue },
}) => {
  return (
    <>
      <SwitchField
        label="Did you receive a National Health Service Corps Scholarship?"
        value={values.receivedScholarship}
        updateValue={(value: boolean): void => {
          setFieldValue("receivedScholarship", value)
        }}
        errors={errors.receivedScholarship}
      />
      {values.receivedScholarship && (
        <>
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
  queryData: GetNationalHealthServiceCorpsScholarshipsQuery
  updateMutationData:
    | UpdateNationalHealthServiceCorpsScholarshipMutation
    | null
    | undefined
  mutationInFlight: boolean
  updateMutation: MutationFunction<
    UpdateNationalHealthServiceCorpsScholarshipMutation,
    MutationUpdateNationalHealthServiceCorpsScholarshipArgs
  >
  deleteMutation: MutationFunction<DeleteNationalHealthServiceCorpScholarshipMutation>
  deleteMutationData:
    | DeleteNationalHealthServiceCorpScholarshipMutation
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
              !!updateMutationData?.updateNationalHealthServiceCorpsScholarship
                ?.scholarship?.startedAt ||
              !!deleteMutationData?.deleteNationHealthServiceCorpsScholarship
                ?.success
            }
          >
            <FormFields formikProps={formikProps} />
          </FormNavigationHandler>
        )
      }}
    </Formik>
  )
}

const NationalHealthServiceCorpsScholarshipForm: FC = () => {
  return (
    <GraphQLFormHandlerWithDelete<
      GetNationalHealthServiceCorpsScholarshipsQuery,
      UpdateNationalHealthServiceCorpsScholarshipMutation,
      MutationUpdateNationalHealthServiceCorpsScholarshipArgs,
      unknown,
      DeleteNationalHealthServiceCorpScholarshipMutation
    >
      queryDocument={GET_NATIONAL_HEALTH_SERVICE_CORPS_SCHOLARSHIP}
      updateMutationDocument={UPDATE_NATIONAL_HEALTH_SERVICE_CORPS_SCHOLARSHIP}
      deleteMutationDocument={DELETE_NATIONAL_HEALTH_SERVICE_CORPS_SCHOLARSHIP}
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

export default NationalHealthServiceCorpsScholarshipForm
