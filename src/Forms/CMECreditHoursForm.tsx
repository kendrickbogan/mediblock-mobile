import React, { FC, ReactNode } from "react"
import { Text, View, Button, StyleSheet } from "react-native"
import { gql, MutationFunction } from "@apollo/client"
import {
  Formik,
  FormikProps,
  FormikErrors,
  FieldArrayRenderProps,
  FieldArray,
} from "formik"
import * as yup from "yup"

import {
  GetCmeCreditHoursDetailsQuery,
  UpdateCmeCreditHoursMutation,
  MutationUpdateCmeCreditHoursArgs,
  CmeCreditHourInput,
} from "../generated/graphql"
import {
  TextField,
  DatePickerField,
  GraphQLFormHandler,
  FormNavigationHandler,
} from "./formHelpers"
import { dateOrToday } from "../dateTimeUtils"

import { Colors, Sizing, Typography } from "../styles"

const GET_CME_CREDIT_HOURS = gql`
  query GetCmeCreditHoursDetails {
    personalDetails {
      id
      cmeCreditHours {
        activityDate
        activityName
        sponsorName
        hoursEarned
        methodOfEducation
      }
    }
  }
`

const UPDATE_CME_CREDIT_HOURS = gql`
  mutation UpdateCmeCreditHours($input: UpdateCMECreditHoursMutationInput!) {
    updateCmeCreditHours(input: $input) {
      cmeCreditHours {
        activityName
      }
    }
  }
`

interface CMECreditHoursForm {
  activityDate: Date
  activityName: string
  sponsorName: string
  hoursEarned: string
  methodOfEducation: string
}

const emptyFormSet: CMECreditHoursForm = {
  activityDate: new Date(),
  activityName: "",
  sponsorName: "",
  hoursEarned: "",
  methodOfEducation: "",
}

type FormValues = {
  cmeCreditHours: CMECreditHoursForm[]
}

const buildInitialFormValues = ({
  personalDetails,
}: GetCmeCreditHoursDetailsQuery): FormValues => {
  if (personalDetails?.cmeCreditHours.length === 0 || !personalDetails) {
    return { cmeCreditHours: [emptyFormSet] }
  } else {
    const cmeCreditHoursFormValues = personalDetails?.cmeCreditHours.map(
      cmeCreditHour => {
        return {
          activityDate: dateOrToday(cmeCreditHour?.activityDate),
          activityName: cmeCreditHour.activityName || "",
          sponsorName: cmeCreditHour.sponsorName || "",
          hoursEarned: cmeCreditHour.hoursEarned.toString() || "",
          methodOfEducation: cmeCreditHour.methodOfEducation || "",
        }
      },
    )

    return { cmeCreditHours: cmeCreditHoursFormValues }
  }
}

const toCMECreditHoursMutationInput = ({
  activityDate,
  activityName,
  sponsorName,
  hoursEarned,
  methodOfEducation,
}: CMECreditHoursForm): CmeCreditHourInput => {
  return {
    activityDate,
    activityName,
    sponsorName,
    hoursEarned: parseFloat(hoursEarned) || 0,
    methodOfEducation,
  }
}

const validationSchema = yup.object().shape({
  cmeCreditHours: yup.array().of(
    yup.object({
      activityName: yup.string(),
      hoursEarned: yup.number().typeError("Hours earned must be a number"),
      methodOfEducation: yup.string(),
    }),
  ),
})

interface FormFieldsProps {
  formikProps: FormikProps<FormValues>
  fieldArrayProps: FieldArrayRenderProps
}

const FormFields: FC<FormFieldsProps> = ({
  formikProps: {
    values: { cmeCreditHours },
    errors,
    handleChange,
    setFieldValue,
  },
  fieldArrayProps: { push, remove },
}) => {
  return (
    <>
      {cmeCreditHours.map((_cmeCreditHour, index) => {
        const errorsForFieldSet: FormikErrors<CMECreditHoursForm> =
          errors.cmeCreditHours && errors.cmeCreditHours[index]
            ? (errors.cmeCreditHours[index] as FormikErrors<CMECreditHoursForm>)
            : {}

        const toFieldName = (fieldName: string): string => {
          return `cmeCreditHours[${index}].${fieldName}`
        }

        return (
          <View key={index} style={style.cmeCreditHoursContainer}>
            <Text style={style.cmeCreditHoursTitleText}>
              CME Credit Hours #{index + 1}
            </Text>
            <DatePickerField
              label="Course or activity date"
              value={cmeCreditHours[index].activityDate}
              updateValue={(_event: Event, value: Date | undefined): void => {
                setFieldValue(toFieldName("activityDate"), value)
              }}
              errors={errorsForFieldSet.activityDate}
            />
            <TextField
              label="Course or activity name"
              value={cmeCreditHours[index].activityName}
              updateValue={handleChange(toFieldName("activityName"))}
              errors={errorsForFieldSet.activityName}
            />
            <TextField
              label="Course or activity CME sponsor name"
              value={cmeCreditHours[index].sponsorName}
              updateValue={handleChange(toFieldName("sponsorName"))}
              errors={errorsForFieldSet.sponsorName}
            />
            <TextField
              label="Number of AMA PRA category 1 credits hours earned"
              value={cmeCreditHours[index].hoursEarned}
              updateValue={handleChange(toFieldName("hoursEarned"))}
              errors={errorsForFieldSet.hoursEarned}
            />
            <TextField
              label="Method of education (in-person, dvd, etc.)"
              value={cmeCreditHours[index].methodOfEducation}
              updateValue={handleChange(toFieldName("methodOfEducation"))}
              errors={errorsForFieldSet.methodOfEducation}
            />
            <Button
              title="Remove"
              color={Colors.danger.s400}
              onPress={(): void => {
                remove(index)
              }}
            />
          </View>
        )
      })}
      <Button
        title="Add another"
        onPress={(): void => {
          push(emptyFormSet)
        }}
      />
    </>
  )
}

interface FormProps {
  formikProps: FormikProps<FormValues>
}

const Form: FC<FormProps> = ({ formikProps }) => {
  return (
    <FieldArray
      name="cmeCreditHours"
      render={(fieldArrayProps): ReactNode => {
        return (
          <FormFields
            formikProps={formikProps}
            fieldArrayProps={fieldArrayProps}
          />
        )
      }}
    />
  )
}

interface FormikStateHandlerProps {
  queryData: GetCmeCreditHoursDetailsQuery
  mutationData: UpdateCmeCreditHoursMutation | null | undefined
  mutationInFlight: boolean
  mutation: MutationFunction<
    UpdateCmeCreditHoursMutation,
    MutationUpdateCmeCreditHoursArgs
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
      variables: {
        input: {
          cmeCreditHoursAttributes: formValues.cmeCreditHours.map(
            toCMECreditHoursMutationInput,
          ),
        },
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
            successfulMutation={
              !!mutationData?.updateCmeCreditHours?.cmeCreditHours
            }
          >
            <Form formikProps={formikProps} />
          </FormNavigationHandler>
        )
      }}
    </Formik>
  )
}

const CMECreditHoursForm: FC = () => {
  return (
    <GraphQLFormHandler<
      GetCmeCreditHoursDetailsQuery,
      UpdateCmeCreditHoursMutation,
      MutationUpdateCmeCreditHoursArgs
    >
      queryDocument={GET_CME_CREDIT_HOURS}
      mutationDocument={UPDATE_CME_CREDIT_HOURS}
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

const style = StyleSheet.create({
  cmeCreditHoursContainer: {
    marginBottom: Sizing.x20,
  },
  cmeCreditHoursTitleText: {
    ...Typography.subheader.x30,
    marginBottom: Sizing.x20,
  },
})

export default CMECreditHoursForm
