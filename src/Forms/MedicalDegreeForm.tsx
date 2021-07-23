import React, { FC, ReactNode } from "react"
import { gql, MutationFunction } from "@apollo/client"
import _ from "lodash"
import * as yup from "yup"
import { Formik, FormikProps } from "formik"

import {
  GetMedicalDegreeDetailsQuery,
  UpdateMedicalDegreeMutation,
  MutationUpdateMedicalDegreeArgs,
  MedicalDegreeKind,
  UpdateMedicalDegreeMutationInput,
} from "../generated/graphql"

import { dateOrToday } from "./dateTimeUtils"
import {
  SwitchField,
  DatePickerField,
  GraphQLFormHandler,
  FormNavigationHandler,
  TextField,
  Dropdown,
  AutocompleteField,
} from "./formHelpers"

const GET_MEDICAL_DEGREE = gql`
  query GetMedicalDegreeDetails {
    personalDetails {
      id
      medicalDegree {
        institutionName
        kind
        dateOfGraduation
        startedAt
        endedAt
        registrarPhoneNumber
        registrarUrl
        foreignMedicalSchool
        ecfmgCertified
        ecfmgCertifiedAt
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

const UPDATE_MEDICAL_DEGREE = gql`
  mutation UpdateMedicalDegree($input: UpdateMedicalDegreeMutationInput!) {
    updateMedicalDegree(input: $input) {
      medicalDegree {
        kind
      }
    }
  }
`

type FormValues = {
  institutionName: string
  kind: MedicalDegreeKind
  dateOfGraduation: Date
  startedAt: Date
  endedAt: Date
  registrarPhoneNumber: string
  registrarUrl: string
  foreignMedicalSchool: boolean
  ecfmgCertified: boolean
  ecfmgCertifiedAt: Date
  institutionAddressLine1: string
  institutionAddressLine2: string
  institutionAddressLine3: string
  institutionAddressCity: string
  institutionAddressState: string
  institutionAddressZip: string
  institutionAddressCountry: string
}

const buildInitialFormValues = ({
  personalDetails,
}: GetMedicalDegreeDetailsQuery): FormValues => {
  return {
    institutionName: personalDetails?.medicalDegree?.institutionName || "",
    kind: personalDetails?.medicalDegree?.kind || MedicalDegreeKind.Medical,
    dateOfGraduation: dateOrToday(
      personalDetails?.medicalDegree?.dateOfGraduation,
    ),
    startedAt: dateOrToday(personalDetails?.medicalDegree?.startedAt),
    endedAt: dateOrToday(personalDetails?.medicalDegree?.endedAt),
    registrarPhoneNumber:
      personalDetails?.medicalDegree?.registrarPhoneNumber || "",
    registrarUrl: personalDetails?.medicalDegree?.registrarUrl || "",
    foreignMedicalSchool:
      personalDetails?.medicalDegree?.foreignMedicalSchool || false,
    ecfmgCertified: personalDetails?.medicalDegree?.ecfmgCertified || false,
    ecfmgCertifiedAt: dateOrToday(
      personalDetails?.medicalDegree?.ecfmgCertifiedAt,
    ),
    institutionAddressLine1:
      personalDetails?.medicalDegree?.institutionAddressLine1 || "",
    institutionAddressLine2:
      personalDetails?.medicalDegree?.institutionAddressLine2 || "",
    institutionAddressLine3:
      personalDetails?.medicalDegree?.institutionAddressLine3 || "",
    institutionAddressCity:
      personalDetails?.medicalDegree?.institutionAddressCity || "",
    institutionAddressState:
      personalDetails?.medicalDegree?.institutionAddressState || "",
    institutionAddressZip:
      personalDetails?.medicalDegree?.institutionAddressZip || "",
    institutionAddressCountry:
      personalDetails?.medicalDegree?.institutionAddressCountry || "",
  }
}

const buildMutationVariables = ({
  institutionName,
  kind,
  dateOfGraduation,
  startedAt,
  endedAt,
  registrarPhoneNumber,
  registrarUrl,
  foreignMedicalSchool,
  ecfmgCertified,
  ecfmgCertifiedAt,
  institutionAddressLine1,
  institutionAddressLine2,
  institutionAddressLine3,
  institutionAddressCity,
  institutionAddressState,
  institutionAddressZip,
  institutionAddressCountry,
}: FormValues): UpdateMedicalDegreeMutationInput => {
  return {
    institutionName,
    kind,
    dateOfGraduation,
    startedAt,
    endedAt,
    registrarPhoneNumber,
    registrarUrl,
    foreignMedicalSchool,
    ecfmgCertified,
    ecfmgCertifiedAt,
    institutionAddressLine1,
    institutionAddressLine2,
    institutionAddressLine3,
    institutionAddressCity,
    institutionAddressState,
    institutionAddressZip,
    institutionAddressCountry,
  }
}

const validationSchema = yup.object().shape({
  institutionName: yup.string(),
  kind: yup
    .mixed()
    .oneOf(Object.values(MedicalDegreeKind), "Please select a kind of degree"),
  dateOfGraduation: yup.date(),
  startedAt: yup.date(),
  endedAt: yup.date(),
  registrarPhoneNumber: yup.number(),
  registrarUrl: yup.string(),
  foreignMedicalSchool: yup.boolean(),
  ecfmgCertified: yup.boolean(),
  institutionAddressLine1: yup.string(),
  institutionAddressCity: yup.string(),
  institutionAddressState: yup.string(),
  institutionAddressZip: yup.number(),
  institutionAddressCountry: yup.string(),
})

interface FormFieldsProps {
  formikProps: FormikProps<FormValues>
  states: string[]
  countries: string[]
}

const FormFields: FC<FormFieldsProps> = ({
  formikProps: { errors, values, handleChange, setFieldValue },
  states,
  countries,
}) => {
  return (
    <>
      <TextField
        label="Institution Name"
        value={values.institutionName}
        updateValue={handleChange("institutionName")}
        errors={errors.institutionName}
      />
      <Dropdown<MedicalDegreeKind>
        label="Degree"
        value={values.kind}
        onValueChange={(value: MedicalDegreeKind): void => {
          setFieldValue("kind", value)
        }}
        options={[
          { label: "Medical", value: MedicalDegreeKind.Medical },
          { label: "Osteopathic", value: MedicalDegreeKind.Osteopathic },
        ]}
        errors={errors.kind}
      />
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
      <SwitchField
        label="Did you attend a medical school outside of the US?"
        errors={errors.foreignMedicalSchool}
        value={values.foreignMedicalSchool}
        updateValue={(value: boolean): void =>
          setFieldValue("foreignMedicalSchool", value)
        }
      />
      {values.foreignMedicalSchool && (
        <>
          <SwitchField
            label="Are you certified by the Educational Commission for Foreign medical Graduates (ECFMG)? "
            errors={errors.ecfmgCertified}
            value={values.ecfmgCertified}
            updateValue={(value: boolean): void =>
              setFieldValue("ecfmgCertified", value)
            }
          />
          {values.ecfmgCertified && (
            <>
              <DatePickerField
                label="Date ECFMG Certification was issued"
                value={values.ecfmgCertifiedAt}
                updateValue={(_event: Event, value: Date | undefined): void => {
                  setFieldValue("ecfmgCertifiedAt", value)
                }}
                errors={errors.ecfmgCertifiedAt}
              />
            </>
          )}
        </>
      )}
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
        suggestionsList={states}
      />
      <TextField
        label="Institution address zip"
        value={values.institutionAddressZip}
        updateValue={handleChange("institutionAddressZip")}
        errors={errors.institutionAddressZip}
      />
      <AutocompleteField
        label="Institution address country"
        errors={errors.institutionAddressCountry}
        value={values.institutionAddressCountry}
        updateValue={handleChange("institutionAddressCountry")}
        suggestionsList={countries}
      />
    </>
  )
}

interface FormikStateHandlerProps {
  queryData: GetMedicalDegreeDetailsQuery
  mutationData: UpdateMedicalDegreeMutation | null | undefined
  mutationInFlight: boolean
  mutation: MutationFunction<
    UpdateMedicalDegreeMutation,
    MutationUpdateMedicalDegreeArgs
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
              !!mutationData?.updateMedicalDegree?.medicalDegree
            }
          >
            <FormFields
              formikProps={formikProps}
              states={queryData.states}
              countries={queryData.countries}
            />
          </FormNavigationHandler>
        )
      }}
    </Formik>
  )
}

const MedicalDegreeForm: FC = () => {
  return (
    <GraphQLFormHandler<
      GetMedicalDegreeDetailsQuery,
      UpdateMedicalDegreeMutation,
      MutationUpdateMedicalDegreeArgs
    >
      queryDocument={GET_MEDICAL_DEGREE}
      mutationDocument={UPDATE_MEDICAL_DEGREE}
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

export default MedicalDegreeForm
