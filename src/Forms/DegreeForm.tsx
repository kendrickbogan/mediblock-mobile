import React, { FC, ReactNode } from "react"
import { gql, MutationFunction } from "@apollo/client"
import _ from "lodash"
import * as yup from "yup"
import { Formik, FormikProps } from "formik"

import {
  GetDegreeDetailsQuery,
  UpdateDegreeMutation,
  MutationUpdateDegreeArgs,
  UpdateDegreeMutationInput,
  DegreeKind,
} from "../generated/graphql"

import { dateOrToday } from "./dateTimeUtils"
import {
  DatePickerField,
  GraphQLFormHandler,
  FormNavigationHandler,
  TextField,
  AutocompleteField,
} from "./formHelpers"
import { Layout } from "../styles"
import { SchemaLike } from "yup/lib/types"

const GET_DEGREE = gql`
  query GetDegreeDetails($kind: DegreeKind!) {
    personalDetails {
      id
      degree(kind: $kind) {
        institutionName
        degree
        major
        minor
        dateOfGraduation
        startedAt
        endedAt
        registrarPhoneNumber
        registrarUrl
        institutionAddressLine1
        institutionAddressLine2
        institutionAddressLine3
        institutionAddressCity
        institutionAddressState
        institutionAddressZip
        institutionAddressCountry
      }
    }
    states
    countries
  }
`

const UPDATE_DEGREE = gql`
  mutation UpdateDegree($input: UpdateDegreeMutationInput!) {
    updateDegree(input: $input) {
      degree {
        institutionName
      }
    }
  }
`

type FormValues = {
  kind: DegreeKind
  institutionName: string
  degree: string
  major: string
  minor: string
  dateOfGraduation: Date
  startedAt: Date
  endedAt: Date
  registrarPhoneNumber: string
  registrarUrl: string
  institutionAddressLine1: string
  institutionAddressLine2: string
  institutionAddressLine3: string
  institutionAddressCity: string
  institutionAddressState: string
  institutionAddressZip: string
  institutionAddressCountry: string
}

const buildInitialFormValues = (
  { personalDetails }: GetDegreeDetailsQuery,
  kind: DegreeKind,
): FormValues => {
  return {
    kind,
    institutionName: personalDetails?.degree?.institutionName || "",
    degree: personalDetails?.degree?.degree || "",
    major: personalDetails?.degree?.major || "",
    minor: personalDetails?.degree?.minor || "",
    dateOfGraduation: dateOrToday(personalDetails?.degree?.dateOfGraduation),
    startedAt: dateOrToday(personalDetails?.degree?.startedAt),
    endedAt: dateOrToday(personalDetails?.degree?.endedAt),
    registrarPhoneNumber: personalDetails?.degree?.registrarPhoneNumber || "",
    registrarUrl: personalDetails?.degree?.registrarUrl || "",
    institutionAddressLine1:
      personalDetails?.degree?.institutionAddressLine1 || "",
    institutionAddressLine2:
      personalDetails?.degree?.institutionAddressLine2 || "",
    institutionAddressLine3:
      personalDetails?.degree?.institutionAddressLine3 || "",
    institutionAddressCity:
      personalDetails?.degree?.institutionAddressCity || "",
    institutionAddressState:
      personalDetails?.degree?.institutionAddressState || "",
    institutionAddressZip: personalDetails?.degree?.institutionAddressZip || "",
    institutionAddressCountry:
      personalDetails?.degree?.institutionAddressCountry || "",
  }
}

const buildMutationVariables = ({
  kind,
  institutionName,
  degree,
  major,
  minor,
  dateOfGraduation,
  startedAt,
  endedAt,
  registrarPhoneNumber,
  registrarUrl,
  institutionAddressLine1,
  institutionAddressLine2,
  institutionAddressLine3,
  institutionAddressCity,
  institutionAddressState,
  institutionAddressZip,
  institutionAddressCountry,
}: FormValues): UpdateDegreeMutationInput => {
  return {
    kind,
    institutionName,
    degree,
    major,
    minor,
    dateOfGraduation,
    startedAt,
    endedAt,
    registrarPhoneNumber,
    registrarUrl,
    institutionAddressLine1,
    institutionAddressLine2,
    institutionAddressLine3,
    institutionAddressCity,
    institutionAddressState,
    institutionAddressZip,
    institutionAddressCountry,
  }
}

const validationSchema = yup.object().shape(
  {
    institutionName: yup.string(),
    degree: yup.string(),
    dateOfGraduation: yup.date(),
    startedAt: yup.date().when(
      "endedAt",
      (endedAt: Date): SchemaLike => {
        return (
          endedAt &&
          yup.date().max(endedAt, "Start date should be before the end date")
        )
      },
    ),
    endedAt: yup.date().when(
      "startedAt",
      (startedAt: Date): SchemaLike => {
        return (
          startedAt &&
          yup.date().min(startedAt, "End date should be after the start date")
        )
      },
    ),
    registrarPhoneNumber: yup.string(),
    registrarUrl: yup.string(),
    institutionAddressLine1: yup.string(),
    institutionAddressCity: yup.string(),
    institutionAddressState: yup.string(),
    institutionAddressZip: yup
      .string()
      .length(5, "Zip code must be 5 characters"),
    institutionAddressCountry: yup.string(),
  },
  [["startedAt", "endedAt"]],
)

interface FormFieldsProps {
  formikProps: FormikProps<FormValues>
  statesList: string[]
  countriesList: string[]
  degreeKind: DegreeKind
}

const FormFields: FC<FormFieldsProps> = ({
  formikProps: { errors, values, handleChange, setFieldValue },
  statesList,
  countriesList,
  degreeKind,
}) => {
  return (
    <>
      <TextField
        label="Institution Name"
        value={values.institutionName}
        updateValue={handleChange("institutionName")}
        errors={errors.institutionName}
      />
      <TextField
        label="Degree"
        value={values.degree}
        updateValue={handleChange("degree")}
        errors={errors.degree}
      />
      {degreeKind == DegreeKind.Undergraduate && (
        <>
          <TextField
            label="Major"
            value={values.major}
            updateValue={handleChange("major")}
            errors={errors.major}
          />
          <TextField
            label="Minor"
            value={values.minor}
            updateValue={handleChange("minor")}
            errors={errors.minor}
          />
        </>
      )}
      <DatePickerField
        label="Date of Graduation"
        value={values.dateOfGraduation}
        updateValue={(_event: Event, value: Date | undefined): void => {
          setFieldValue("dateOfGraduation", value)
        }}
        errors={errors.dateOfGraduation}
      />
      <DatePickerField
        label="Attendance start date"
        value={values.startedAt}
        updateValue={(_event: Event, value: Date | undefined): void => {
          setFieldValue("startedAt", value)
        }}
        errors={errors.startedAt}
      />
      <DatePickerField
        label="Attendance end date"
        value={values.endedAt}
        updateValue={(_event: Event, value: Date | undefined): void => {
          setFieldValue("endedAt", value)
        }}
        errors={errors.endedAt}
      />
      <TextField
        label="Registrar phone number"
        value={values.registrarPhoneNumber}
        updateValue={handleChange("registrarPhoneNumber")}
        errors={errors.registrarPhoneNumber}
      />
      <TextField
        label="Registrar website URL"
        value={values.registrarUrl}
        updateValue={handleChange("registrarUrl")}
        errors={errors.registrarUrl}
      />
      <TextField
        label="Institution address line 1"
        value={values.institutionAddressLine1}
        updateValue={handleChange("institutionAddressLine1")}
        errors={errors.institutionAddressLine1}
      />
      <TextField
        label="Institution address line 2"
        value={values.institutionAddressLine2}
        updateValue={handleChange("institutionAddressLine2")}
        errors={errors.institutionAddressLine2}
      />
      <TextField
        label="Institution address line 3"
        value={values.institutionAddressLine3}
        updateValue={handleChange("institutionAddressLine3")}
        errors={errors.institutionAddressLine3}
      />
      <TextField
        label="Institution address city"
        value={values.institutionAddressCity}
        updateValue={handleChange("institutionAddressCity")}
        errors={errors.institutionAddressCity}
      />
      <AutocompleteField
        label="Institution address state"
        errors={errors.institutionAddressState}
        value={values.institutionAddressState}
        updateValue={handleChange("institutionAddressState")}
        suggestionsList={statesList}
      />
      <TextField
        label="Institution address zip"
        value={values.institutionAddressZip}
        updateValue={handleChange("institutionAddressZip")}
        errors={errors.institutionAddressZip}
        maxLength={5}
      />
      <AutocompleteField
        label="Institution address country"
        errors={errors.institutionAddressCountry}
        value={values.institutionAddressCountry}
        updateValue={handleChange("institutionAddressCountry")}
        suggestionsList={countriesList}
        zIndex={Layout.zIndex.max + 1}
      />
    </>
  )
}

interface FormikStateHandlerProps {
  queryData: GetDegreeDetailsQuery
  mutationData: UpdateDegreeMutation | null | undefined
  mutationInFlight: boolean
  mutation: MutationFunction<UpdateDegreeMutation, MutationUpdateDegreeArgs>
  degreeKind: DegreeKind
}

const FormikStateHandler: FC<FormikStateHandlerProps> = ({
  queryData,
  mutationData,
  mutationInFlight,
  mutation,
  degreeKind,
}) => {
  const initialFormState = buildInitialFormValues(queryData, degreeKind)

  const handleOnSubmit = (formValues: FormValues): void => {
    mutation({
      variables: {
        input: buildMutationVariables(formValues),
      },
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
            successfulMutation={!!mutationData?.updateDegree?.degree}
          >
            <FormFields
              formikProps={formikProps}
              statesList={queryData.states}
              countriesList={queryData.countries}
              degreeKind={degreeKind}
            />
          </FormNavigationHandler>
        )
      }}
    </Formik>
  )
}

interface DegreeFormProps {
  degreeKind: DegreeKind
}

const DegreeForm: FC<DegreeFormProps> = ({ degreeKind }) => {
  return (
    <GraphQLFormHandler<
      GetDegreeDetailsQuery,
      UpdateDegreeMutation,
      MutationUpdateDegreeArgs
    >
      queryDocument={GET_DEGREE}
      mutationDocument={UPDATE_DEGREE}
      queryVariables={{ kind: degreeKind }}
    >
      {(queryData, mutationData, mutationInFlight, mutation): JSX.Element => {
        return (
          <FormikStateHandler
            queryData={queryData}
            mutationData={mutationData}
            mutationInFlight={mutationInFlight}
            mutation={mutation}
            degreeKind={degreeKind}
          />
        )
      }}
    </GraphQLFormHandler>
  )
}

export default DegreeForm
