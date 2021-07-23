import React, { ReactNode, FC } from "react"
import { FormikProps, Formik } from "formik"
import { StyleSheet, Text, View } from "react-native"
import { gql, MutationFunction } from "@apollo/client"
import * as yup from "yup"
import {
  MutationUpdatePostGraduateTrainingArgs,
  PostGraduateTrainingKind,
  UpdatePostGraduateTrainingMutation,
  GetPostGraduateTrainingQuery,
  PersonPostGraduateTrainingArgs,
} from "../generated/graphql"

import GraphQLFormHandler from "./formHelpers/GraphQLFormHandler"
import FormNavigationHandler from "./formHelpers/FormNavigationHandler"
import { TextField, DatePickerField, SwitchField } from "./formHelpers"
import { dateOrToday } from "../dateTimeUtils"

import { Sizing, Typography } from "../styles"

const GET_POST_GRADUATE_TRAINING = gql`
  query GetPostGraduateTraining($kind: PostGraduateTrainingKind!) {
    personalDetails {
      id
      postGraduateTraining(kind: $kind) {
        acgmeAccredited
        attendanceEndDate
        attendanceStartDate
        currentProgramDirectorFirstName
        currentProgramDirectorLastName
        directorContactEmail
        directorContactNumber
        directorDuringFirstName
        directorDuringLastName
        fellowshipKind
        gmeOfficeEmail
        gmeOfficePhone
        gmeOfficeUrl
        institutionName
        internshipKind
        programDirectorAddressCity
        programDirectorAddressCountry
        programDirectorAddressLine1
        programDirectorAddressLine2
        programDirectorAddressLine3
        programDirectorAddressState
        programDirectorAddressZip
        programAdminEmail
        programAdminName
        programAdminPhone
        residencyKind
        successfullyCompletedProgram
      }
    }
  }
`
const UPDATE_POST_GRADUATE_TRAINING = gql`
  mutation UpdatePostGraduateTraining(
    $input: UpdatePostGraduateTrainingMutationInput!
  ) {
    updatePostGraduateTraining(input: $input) {
      postGraduateTraining {
        institutionName
      }
    }
  }
`

interface FormValues {
  acgmeAccredited: boolean
  attendanceEndDate: Date
  attendanceStartDate: Date
  currentProgramDirectorFirstName: string
  currentProgramDirectorLastName: string
  directorContactEmail: string
  directorContactNumber: string
  directorDuringFirstName: string
  directorDuringLastName: string
  fellowshipKind: string
  gmeOfficeEmail: string
  gmeOfficePhone: string
  gmeOfficeUrl: string
  institutionName: string
  internshipKind: string
  kind: PostGraduateTrainingKind
  programDirectorAddressCity: string
  programDirectorAddressCountry: string
  programDirectorAddressLine1: string
  programDirectorAddressLine2: string
  programDirectorAddressLine3: string
  programDirectorAddressState: string
  programDirectorAddressZip: string
  programAdminEmail: string
  programAdminName: string
  programAdminPhone: string
  residencyKind: string
  successfullyCompletedProgram: boolean
}

const buildInitialFormValues = (
  { personalDetails }: GetPostGraduateTrainingQuery,
  postGraduateTrainingKind: PostGraduateTrainingKind,
): FormValues => {
  return {
    acgmeAccredited:
      personalDetails?.postGraduateTraining?.acgmeAccredited || true,
    attendanceEndDate: dateOrToday(
      personalDetails?.postGraduateTraining?.attendanceEndDate,
    ),
    attendanceStartDate: dateOrToday(
      personalDetails?.postGraduateTraining?.attendanceStartDate,
    ),
    currentProgramDirectorFirstName:
      personalDetails?.postGraduateTraining?.currentProgramDirectorFirstName ||
      "",
    currentProgramDirectorLastName:
      personalDetails?.postGraduateTraining?.currentProgramDirectorLastName ||
      "",
    directorContactEmail:
      personalDetails?.postGraduateTraining?.directorContactEmail || "",
    directorContactNumber:
      personalDetails?.postGraduateTraining?.directorContactNumber || "",
    directorDuringFirstName:
      personalDetails?.postGraduateTraining?.directorDuringFirstName || "",
    directorDuringLastName:
      personalDetails?.postGraduateTraining?.directorDuringLastName || "",
    fellowshipKind: personalDetails?.postGraduateTraining?.fellowshipKind || "",
    gmeOfficeEmail: personalDetails?.postGraduateTraining?.gmeOfficeEmail || "",
    gmeOfficePhone: personalDetails?.postGraduateTraining?.gmeOfficePhone || "",
    gmeOfficeUrl: personalDetails?.postGraduateTraining?.gmeOfficeUrl || "",
    institutionName:
      personalDetails?.postGraduateTraining?.institutionName || "",
    internshipKind: personalDetails?.postGraduateTraining?.internshipKind || "",
    kind: postGraduateTrainingKind,
    programDirectorAddressCity:
      personalDetails?.postGraduateTraining?.programDirectorAddressCity || "",
    programDirectorAddressCountry:
      personalDetails?.postGraduateTraining?.programDirectorAddressState || "",
    programDirectorAddressLine1:
      personalDetails?.postGraduateTraining?.programDirectorAddressLine1 || "",
    programDirectorAddressLine2:
      personalDetails?.postGraduateTraining?.programDirectorAddressLine2 || "",
    programDirectorAddressLine3:
      personalDetails?.postGraduateTraining?.programDirectorAddressLine3 || "",
    programDirectorAddressState:
      personalDetails?.postGraduateTraining?.programDirectorAddressState || "",
    programDirectorAddressZip:
      personalDetails?.postGraduateTraining?.programDirectorAddressZip || "",
    programAdminEmail:
      personalDetails?.postGraduateTraining?.programAdminEmail || "",
    programAdminName:
      personalDetails?.postGraduateTraining?.programAdminName || "",
    programAdminPhone:
      personalDetails?.postGraduateTraining?.programAdminPhone || "",
    residencyKind: personalDetails?.postGraduateTraining?.residencyKind || "",
    successfullyCompletedProgram:
      personalDetails?.postGraduateTraining?.successfullyCompletedProgram ||
      true,
  }
}

const validationSchema = yup.object().shape({
  acgmeAccredited: yup.boolean(),
  attendanceEndDate: yup.date(),
  attendanceStartDate: yup.date(),
  currentProgramDirectorFirstName: yup.string(),
  currentProgramDirectorLastName: yup.string(),
  directorContactEmail: yup.string(),
  directorContactNumber: yup.string(),
  directorDuringFirstName: yup.string(),
  directorDuringLastName: yup.string(),
  fellowshipKind: yup.string().when("kind", {
    is: PostGraduateTrainingKind.Fellowship,
    then: yup.string(),
  }),
  gmeOfficeEmail: yup.string(),
  gmeOfficePhone: yup.string(),
  gmeOfficeUrl: yup.string(),
  institutionName: yup.string(),
  internshipKind: yup.string().when("kind", {
    is: PostGraduateTrainingKind.Internship,
    then: yup.string(),
  }),
  programDirectorAddressCity: yup.string(),
  programDirectorAddressCountry: yup.string(),
  programDirectorAddressLine1: yup.string(),
  programDirectorAddressLine2: yup.string(),
  programDirectorAddressLine3: yup.string(),
  programDirectorAddressState: yup.string(),
  programDirectorAddressZip: yup.string(),
  programAdminEmail: yup.string(),
  programAdminName: yup.string(),
  programAdminPhone: yup.string(),
  residencyKind: yup.string().when("kind", {
    is: PostGraduateTrainingKind.Residency,
    then: yup.string(),
  }),
  successfullyCompletedProgram: yup.boolean(),
})

interface FormProps {
  formikProps: FormikProps<FormValues>
}

const FormFields: FC<FormProps> = ({
  formikProps: { setFieldValue, errors, values, handleChange },
}) => {
  return (
    <View>
      <TextField
        label="Institution Name"
        errors={errors.institutionName}
        value={values.institutionName}
        updateValue={handleChange("institutionName")}
      />
      {values.kind == PostGraduateTrainingKind.Internship && (
        <TextField
          label="Internship type"
          errors={errors.internshipKind}
          value={values.internshipKind}
          updateValue={handleChange("internshipKind")}
        />
      )}
      {values.kind == PostGraduateTrainingKind.Fellowship && (
        <TextField
          label="Fellowship type"
          errors={errors.fellowshipKind}
          value={values.fellowshipKind}
          updateValue={handleChange("fellowshipKind")}
        />
      )}
      {values.kind == PostGraduateTrainingKind.Residency && (
        <TextField
          label="Residency type"
          errors={errors.residencyKind}
          value={values.residencyKind}
          updateValue={handleChange("residencyKind")}
        />
      )}
      <DatePickerField
        label="Attendance start date"
        errors={errors.attendanceStartDate}
        value={values.attendanceStartDate}
        updateValue={(_event: Event, value: Date | undefined): void => {
          setFieldValue("attendanceStartDate", value)
        }}
      />
      <DatePickerField
        label="Attendance end date"
        errors={errors.attendanceEndDate}
        value={values.attendanceEndDate}
        updateValue={(_event: Event, value: Date | undefined): void => {
          setFieldValue("attendanceEndDate", value)
        }}
      />
      <SwitchField
        label="Did you successfully complete the program?"
        errors={errors.successfullyCompletedProgram}
        value={values.successfullyCompletedProgram}
        updateValue={(value: boolean): void => {
          setFieldValue("successfullyCompletedProgram", value)
        }}
      />
      <SwitchField
        label="Is this an ACGME accredited program?"
        errors={errors.acgmeAccredited}
        value={values.acgmeAccredited}
        updateValue={(value: boolean): void => {
          setFieldValue("acgmeAccredited", value)
        }}
      />
      <Text style={style.formSubHeaderText}>Current program director</Text>
      <TextField
        label="First name (if known)"
        errors={errors.currentProgramDirectorFirstName}
        value={values.currentProgramDirectorFirstName}
        updateValue={handleChange("currentProgramDirectorFirstName")}
      />
      <TextField
        label="Last name (if known)"
        errors={errors.currentProgramDirectorLastName}
        value={values.currentProgramDirectorLastName}
        updateValue={handleChange("currentProgramDirectorLastName")}
      />
      <TextField
        label="Address line 1"
        errors={errors.programDirectorAddressLine1}
        value={values.programDirectorAddressLine1}
        updateValue={handleChange("programDirectorAddressLine1")}
      />
      <TextField
        label="Address line 2"
        errors={errors.programDirectorAddressLine2}
        value={values.programDirectorAddressLine2}
        updateValue={handleChange("programDirectorAddressLine2")}
      />
      <TextField
        label="Address line 3"
        errors={errors.programDirectorAddressLine3}
        value={values.programDirectorAddressLine3}
        updateValue={handleChange("programDirectorAddressLine3")}
      />
      <TextField
        label="Contact email"
        errors={errors.directorContactEmail}
        value={values.directorContactEmail}
        updateValue={handleChange("directorContactEmail")}
      />
      <TextField
        label="Contact phone number"
        errors={errors.directorContactNumber}
        value={values.directorContactNumber}
        updateValue={handleChange("directorContactNumber")}
      />
      <Text style={style.formSubHeaderText}>
        Director during {values.kind.toLowerCase()}
      </Text>
      <TextField
        label="First name"
        errors={errors.directorDuringFirstName}
        value={values.directorDuringFirstName}
        updateValue={handleChange("directorDuringFirstName")}
      />
      <TextField
        label="Last name"
        errors={errors.directorDuringLastName}
        value={values.directorDuringLastName}
        updateValue={handleChange("directorDuringLastName")}
      />
      <TextField
        label="Program admin name"
        errors={errors.programAdminName}
        value={values.programAdminName}
        updateValue={handleChange("programAdminName")}
      />
      <TextField
        label="Program admin email"
        errors={errors.programAdminEmail}
        value={values.programAdminEmail}
        updateValue={handleChange("programAdminEmail")}
      />
      <TextField
        label="Program admin phone number"
        errors={errors.programAdminPhone}
        value={values.programAdminPhone}
        updateValue={handleChange("programAdminPhone")}
      />
      <TextField
        label="GME Office phone number"
        errors={errors.gmeOfficePhone}
        value={values.gmeOfficePhone}
        updateValue={handleChange("gmeOfficePhone")}
      />
      <TextField
        label="GME Office email address"
        errors={errors.gmeOfficeEmail}
        value={values.gmeOfficeEmail}
        updateValue={handleChange("gmeOfficeEmail")}
      />
      <TextField
        label="GME Office website address"
        errors={errors.gmeOfficeUrl}
        value={values.gmeOfficeUrl}
        updateValue={handleChange("gmeOfficeUrl")}
      />
    </View>
  )
}

interface FormikStateHandlerProps {
  queryData: GetPostGraduateTrainingQuery
  mutationData: UpdatePostGraduateTrainingMutation | null | undefined
  mutationInFlight: boolean
  mutation: MutationFunction<
    UpdatePostGraduateTrainingMutation,
    MutationUpdatePostGraduateTrainingArgs
  >
  postGraduateTrainingKind: PostGraduateTrainingKind
}

const FormikStateHandler: FC<FormikStateHandlerProps> = ({
  queryData,
  mutationData,
  mutationInFlight,
  mutation,
  postGraduateTrainingKind,
}) => {
  const initialFormState = buildInitialFormValues(
    queryData,
    postGraduateTrainingKind,
  )

  const handleOnSubmit = (formValues: FormValues): void => {
    mutation({
      variables: { input: formValues },
    })
  }

  const successfulMutation = !!mutationData?.updatePostGraduateTraining
    ?.postGraduateTraining

  return (
    <Formik
      validateOnBlur={false}
      validateOnMount={false}
      initialValues={initialFormState}
      onSubmit={handleOnSubmit}
      validationSchema={validationSchema}
    >
      {(formikProps): ReactNode => {
        return (
          <FormNavigationHandler<FormValues>
            formikProps={formikProps}
            submissionInFlight={mutationInFlight}
            initialFormState={initialFormState}
            successfulMutation={successfulMutation}
          >
            <FormFields formikProps={formikProps} />
          </FormNavigationHandler>
        )
      }}
    </Formik>
  )
}

interface PostGraduateTrainingFormProps {
  postGraduateTrainingKind: PostGraduateTrainingKind
}

const PostGraduateTrainingForm: FC<PostGraduateTrainingFormProps> = ({
  postGraduateTrainingKind,
}) => {
  return (
    <GraphQLFormHandler<
      GetPostGraduateTrainingQuery,
      UpdatePostGraduateTrainingMutation,
      MutationUpdatePostGraduateTrainingArgs,
      PersonPostGraduateTrainingArgs
    >
      queryDocument={GET_POST_GRADUATE_TRAINING}
      mutationDocument={UPDATE_POST_GRADUATE_TRAINING}
      queryVariables={{ kind: postGraduateTrainingKind }}
    >
      {(queryData, mutationData, mutationInFlight, mutation): JSX.Element => {
        return (
          <FormikStateHandler
            queryData={queryData}
            mutationData={mutationData}
            mutationInFlight={mutationInFlight}
            mutation={mutation}
            postGraduateTrainingKind={postGraduateTrainingKind}
          />
        )
      }}
    </GraphQLFormHandler>
  )
}

const style = StyleSheet.create({
  formSubHeaderText: {
    ...Typography.subheader.x40,
    marginBottom: Sizing.x20,
  },
})

export default PostGraduateTrainingForm
