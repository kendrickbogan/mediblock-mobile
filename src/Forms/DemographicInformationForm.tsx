import React, { FC, ReactNode } from "react"
import { gql, MutationFunction } from "@apollo/client"
import { Formik, FormikProps } from "formik"

import {
  GetDemographicDetailQuery,
  UpdateDemographicDetailMutation,
  MutationUpdateDemographicDetailArgs,
  UpdateDemographicDetailMutationInput,
  EthnicityEnum,
  RaceEnum,
} from "../generated/graphql"

import {
  GraphQLFormHandler,
  FormNavigationHandler,
  Dropdown,
  MultiSelect,
} from "./formHelpers"

const GET_DEMOGRAPHIC_INFORMATION = gql`
  query GetDemographicDetail {
    personalDetails {
      id
      demographicDetail {
        race
        ethnicity
      }
    }
  }
`

const UPDATE_DEMOGRAPHIC_INFORMATION = gql`
  mutation UpdateDemographicDetail(
    $input: UpdateDemographicDetailMutationInput!
  ) {
    updateDemographicDetail(input: $input) {
      demographicDetail {
        race
      }
    }
  }
`

interface FormValues {
  race: RaceEnum[]
  ethnicity: EthnicityEnum
}

const buildInitialFormValues = ({
  personalDetails,
}: GetDemographicDetailQuery): FormValues => {
  return {
    race: personalDetails?.demographicDetail?.race || [],
    ethnicity:
      personalDetails?.demographicDetail?.ethnicity ||
      EthnicityEnum.NotHispanicOrLatino,
  }
}

const buildMutationVariables = ({
  race,
  ethnicity,
}: FormValues): UpdateDemographicDetailMutationInput => {
  return {
    race,
    ethnicity,
  }
}

interface FormFieldsProps {
  formikProps: FormikProps<FormValues>
}

const FormFields: FC<FormFieldsProps> = ({
  formikProps: { errors, values, setFieldValue },
}) => {
  const ethnicityOptions = [
    {
      value: EthnicityEnum.NotHispanicOrLatino,
      label: "Not Hispanic or Latino",
    },
    {
      value: EthnicityEnum.HispanicOrLatino,
      label: "Hispanic or Latino",
    },
  ]

  const raceOptions = [
    {
      value: RaceEnum.White,
      label: "White",
    },
    {
      value: RaceEnum.BlackOrAfricanAmerican,
      label: "Black or African American",
    },
    {
      value: RaceEnum.AmericanIndianOrAlaskaNative,
      label: "American Indian or Alaska Native",
    },
    {
      value: RaceEnum.Asian,
      label: "Asian",
    },
    {
      value: RaceEnum.NativeHawaiianOrOther,
      label: "Native Hawaiian or Other Pacific Islander",
    },
  ]

  return (
    <>
      <MultiSelect<RaceEnum>
        options={raceOptions}
        label="Race"
        values={values.race}
        onValueChange={(values: RaceEnum[]): void => {
          setFieldValue("race", values)
        }}
      />
      <Dropdown<EthnicityEnum>
        options={ethnicityOptions}
        label="Ethnicity"
        value={values.ethnicity}
        onValueChange={(value: EthnicityEnum): void =>
          setFieldValue("ethnicity", value)
        }
        errors={errors.ethnicity}
      />
    </>
  )
}

interface FormikStateHandlerProps {
  queryData: GetDemographicDetailQuery
  mutationData: UpdateDemographicDetailMutation | null | undefined
  mutationInFlight: boolean
  mutation: MutationFunction<
    UpdateDemographicDetailMutation,
    MutationUpdateDemographicDetailArgs
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
              !!mutationData?.updateDemographicDetail?.demographicDetail?.race
            }
          >
            <FormFields formikProps={formikProps} />
          </FormNavigationHandler>
        )
      }}
    </Formik>
  )
}

const DemographicInformationForm: FC = () => {
  return (
    <GraphQLFormHandler<
      GetDemographicDetailQuery,
      UpdateDemographicDetailMutation,
      MutationUpdateDemographicDetailArgs
    >
      queryDocument={GET_DEMOGRAPHIC_INFORMATION}
      mutationDocument={UPDATE_DEMOGRAPHIC_INFORMATION}
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

export default DemographicInformationForm
