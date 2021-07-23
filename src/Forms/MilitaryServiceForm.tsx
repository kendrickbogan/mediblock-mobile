import React, { FC, ReactNode } from "react"
import { gql, MutationFunction } from "@apollo/client"
import * as yup from "yup"
import { Formik, FormikProps } from "formik"
import { SchemaLike } from "yup/lib/types"

import { dateOrToday } from "../dateTimeUtils"
import {
  GetMilitaryServiceDetailsQuery,
  UpdateMilitaryServiceMutation,
  UpdateMilitaryServiceMutationInput,
  MutationUpdateMilitaryServiceArgs,
  DeleteMilitaryServiceMutation,
} from "../generated/graphql"
import {
  SwitchField,
  DatePickerField,
  GraphQLFormHandlerWithDelete,
  FormNavigationHandler,
  TextField,
} from "./formHelpers"

const GET_MILITARY_SERVICE = gql`
  query GetMilitaryServiceDetails {
    personalDetails {
      id
      militaryService {
        startedAt
        endedAt
        branchOfService
        activeDuty
        hasDd214
      }
    }
  }
`

const UPDATE_MILITARY_SERVICE = gql`
  mutation UpdateMilitaryService($input: UpdateMilitaryServiceMutationInput!) {
    updateMilitaryService(input: $input) {
      militaryService {
        startedAt
      }
    }
  }
`
const DELETE_MILITARY_SERVICE = gql`
  mutation DeleteMilitaryService {
    deleteMilitaryService {
      success
    }
  }
`

type FormValues = {
  priorOrPresentMilitaryService: boolean
  startedAt: Date
  endedAt: Date
  branchOfService: string
  activeDuty: boolean
  hasDd214: boolean
}

const buildInitialFormValues = ({
  personalDetails,
}: GetMilitaryServiceDetailsQuery): FormValues => {
  return {
    priorOrPresentMilitaryService: !!personalDetails?.militaryService,
    startedAt: dateOrToday(personalDetails?.militaryService?.startedAt),
    endedAt: dateOrToday(personalDetails?.militaryService?.endedAt),
    branchOfService: personalDetails?.militaryService?.branchOfService || "",
    activeDuty: personalDetails?.militaryService?.activeDuty || false,
    hasDd214: personalDetails?.militaryService?.hasDd214 || false,
  }
}

const buildMutationVariables = ({
  startedAt,
  endedAt,
  branchOfService,
  hasDd214,
  activeDuty,
}: FormValues): UpdateMilitaryServiceMutationInput => {
  return {
    startedAt,
    endedAt,
    branchOfService,
    hasDd214,
    activeDuty,
  }
}

const validationSchema = yup.object().shape(
  {
    priorOrPresentMilitaryService: yup.boolean(),
    startDate: yup.date().when("priorOrPresentMilitaryService", {
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
    endDate: yup.date().when("priorOrPresentMilitaryService", {
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
    branchOfService: yup.string(),
    isActiveDuty: yup.boolean(),
    hasDd214: yup.boolean(),
  },
  [["startDate", "endDate"]],
)

interface FormFieldsProps {
  formikProps: FormikProps<FormValues>
}

const FormFields: FC<FormFieldsProps> = ({
  formikProps: { values, errors, setFieldValue, handleChange },
}) => {
  return (
    <>
      <SwitchField
        label="Have you served or are you currently serving in the military?"
        value={values.priorOrPresentMilitaryService}
        updateValue={(value: boolean): void => {
          setFieldValue("priorOrPresentMilitaryService", value)
        }}
        errors={errors.priorOrPresentMilitaryService}
      />
      {values.priorOrPresentMilitaryService && (
        <>
          <SwitchField
            label="Are you currently serving in an Active Duty Status?"
            value={values.activeDuty}
            updateValue={(value: boolean): void => {
              setFieldValue("activeDuty", value)
            }}
            errors={errors.activeDuty}
          />
          <DatePickerField
            label="Start date"
            value={values.startedAt}
            updateValue={(_event: Event, value: Date | undefined): void => {
              setFieldValue("startedAt", value)
            }}
            errors={errors.startedAt}
          />
          {!values.activeDuty && (
            <DatePickerField
              label="End date"
              value={values.endedAt}
              updateValue={(_event: Event, value: Date | undefined): void => {
                setFieldValue("endedAt", value)
              }}
              errors={errors.endedAt}
            />
          )}
          <TextField
            label="Branch of service"
            value={values.branchOfService}
            updateValue={handleChange("branchOfService")}
            errors={errors.branchOfService}
          />
          <SwitchField
            label="Do you have a copy of your DD-214?"
            value={values.hasDd214}
            updateValue={(value: boolean): void => {
              setFieldValue("hasDd214", value)
            }}
            errors={errors.hasDd214}
          />
        </>
      )}
    </>
  )
}

interface FormikStateHandlerProps {
  queryData: GetMilitaryServiceDetailsQuery
  updateMutationData: UpdateMilitaryServiceMutation | null | undefined
  mutationInFlight: boolean
  updateMutation: MutationFunction<
    UpdateMilitaryServiceMutation,
    MutationUpdateMilitaryServiceArgs
  >
  deleteMutation: MutationFunction<DeleteMilitaryServiceMutation>
  deleteMutationData: DeleteMilitaryServiceMutation | null | undefined
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
    if (formValues.priorOrPresentMilitaryService) {
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
              !!updateMutationData?.updateMilitaryService?.militaryService ||
              !!deleteMutationData?.deleteMilitaryService?.success
            }
          >
            <FormFields formikProps={formikProps} />
          </FormNavigationHandler>
        )
      }}
    </Formik>
  )
}

const MilitaryServiceForm: FC = () => {
  return (
    <GraphQLFormHandlerWithDelete<
      GetMilitaryServiceDetailsQuery,
      UpdateMilitaryServiceMutation,
      MutationUpdateMilitaryServiceArgs,
      unknown,
      DeleteMilitaryServiceMutation
    >
      queryDocument={GET_MILITARY_SERVICE}
      updateMutationDocument={UPDATE_MILITARY_SERVICE}
      deleteMutationDocument={DELETE_MILITARY_SERVICE}
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

export default MilitaryServiceForm
