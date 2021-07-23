import React, { FC, ReactNode } from "react"
import { gql, MutationFunction } from "@apollo/client"
import * as yup from "yup"
import { Formik, FormikProps } from "formik"

import {
  GetUsPublicHealthServiceDetailsQuery,
  UpdateUsPublicHealthServiceDetailsMutation,
  MutationUpdateUnitedStatesPublicHealthServiceArgs,
  UpdateUnitedStatesPublicHealthServiceMutationInput,
  DeleteUsPublicHealthServiceDetailsMutation,
} from "../generated/graphql"

import { dateOrToday } from "./dateTimeUtils"
import {
  DatePickerField,
  FormNavigationHandler,
  SwitchField,
  GraphQLFormHandlerWithDelete,
  yupHelpers,
} from "./formHelpers"

const GET_US_PUBLIC_SERVICE_DETAILS = gql`
  query GetUSPublicHealthServiceDetails {
    personalDetails {
      id
      unitedStatesPublicHealthService {
        startedAt
        endedAt
      }
    }
  }
`

const UPDATE_US_PUBLIC_SERVICE_DETAILS = gql`
  mutation UpdateUSPublicHealthServiceDetails(
    $input: UpdateUnitedStatesPublicHealthServiceMutationInput!
  ) {
    updateUnitedStatesPublicHealthService(input: $input) {
      service {
        startedAt
      }
    }
  }
`

const DELETE_US_PUBLIC_SERVICE_DETAILS = gql`
  mutation DeleteUSPublicHealthServiceDetails {
    deleteUnitedStatesPublicHealthService {
      success
    }
  }
`
type FormValues = {
  hasServed: boolean
  stillServing: boolean
  startedAt: Date
  endedAt: Date
}

const buildInitialFormValues = ({
  personalDetails,
}: GetUsPublicHealthServiceDetailsQuery): FormValues => {
  return {
    hasServed: !!personalDetails?.unitedStatesPublicHealthService?.startedAt,
    stillServing: !personalDetails?.unitedStatesPublicHealthService?.endedAt,
    startedAt: dateOrToday(
      personalDetails?.unitedStatesPublicHealthService?.startedAt,
    ),
    endedAt: dateOrToday(
      personalDetails?.unitedStatesPublicHealthService?.endedAt,
    ),
  }
}

const buildMutationVariables = ({
  startedAt,
  endedAt,
  stillServing,
}: FormValues): UpdateUnitedStatesPublicHealthServiceMutationInput => {
  return {
    startedAt,
    endedAt: stillServing ? null : endedAt,
  }
}

const validationSchema = yup.object().shape(
  {
    ...yupHelpers.startAndEndValidations,
  },
  [["startedAt", "endedAt"]],
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
        label="Have you ever served as a Commissioned Officer in the United States Public Health Corps?"
        value={values.hasServed}
        errors={errors.hasServed}
        updateValue={(value: boolean): void => {
          setFieldValue("hasServed", value)
        }}
      />
      {values.hasServed && (
        <>
          <DatePickerField
            label="Service start date"
            value={values.startedAt}
            updateValue={(_event: Event, value: Date | undefined): void => {
              setFieldValue("startedAt", value)
            }}
            errors={errors.startedAt}
          />
          <SwitchField
            label="Are you still currently serving?"
            value={values.stillServing}
            errors={errors.stillServing}
            updateValue={(value: boolean): void => {
              setFieldValue("stillServing", value)
            }}
          />
          {!values.stillServing && (
            <DatePickerField
              label="Service end date"
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
  queryData: GetUsPublicHealthServiceDetailsQuery
  updateMutationData:
    | UpdateUsPublicHealthServiceDetailsMutation
    | null
    | undefined
  mutationInFlight: boolean
  updateMutation: MutationFunction<
    UpdateUsPublicHealthServiceDetailsMutation,
    MutationUpdateUnitedStatesPublicHealthServiceArgs
  >
  deleteMutation: MutationFunction<DeleteUsPublicHealthServiceDetailsMutation>
  deleteMutationData:
    | DeleteUsPublicHealthServiceDetailsMutation
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
    if (formValues.hasServed) {
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
              !!updateMutationData?.updateUnitedStatesPublicHealthService
                ?.service?.startedAt ||
              !!deleteMutationData?.deleteUnitedStatesPublicHealthService
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

const CovidVaccinationForm: FC = () => {
  return (
    <GraphQLFormHandlerWithDelete<
      GetUsPublicHealthServiceDetailsQuery,
      UpdateUsPublicHealthServiceDetailsMutation,
      MutationUpdateUnitedStatesPublicHealthServiceArgs,
      unknown,
      DeleteUsPublicHealthServiceDetailsMutation
    >
      queryDocument={GET_US_PUBLIC_SERVICE_DETAILS}
      updateMutationDocument={UPDATE_US_PUBLIC_SERVICE_DETAILS}
      deleteMutationDocument={DELETE_US_PUBLIC_SERVICE_DETAILS}
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

export default CovidVaccinationForm
