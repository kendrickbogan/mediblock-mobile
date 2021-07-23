import React, { FC, ReactNode } from "react"
import { View, Button, Text, StyleSheet } from "react-native"
import { gql, MutationFunction } from "@apollo/client"
import {
  Formik,
  FormikProps,
  FieldArray,
  FieldArrayRenderProps,
  FormikErrors,
} from "formik"
import * as yup from "yup"
import { SchemaLike } from "yup/lib/types"

import {
  GetAdministrativeLeadershipPositionsQuery,
  UpdateAdministrativeLeadershipPositionsMutation,
  MutationUpdateAdministrativeLeadershipPositionsArgs,
  AdministrativeLeadershipPositionsInput,
} from "../generated/graphql"
import {
  GraphQLFormHandler,
  FormNavigationHandler,
  TextField,
  SwitchField,
  DatePickerField,
} from "./formHelpers"
import { dateOrToday } from "../dateTimeUtils"

import { Colors, Typography, Sizing } from "../styles"

const GET_ACADEMIC_APPOINTMENTS = gql`
  query GetAdministrativeLeadershipPositions {
    personalDetails {
      id
      administrativeLeadershipPositions {
        title
        startedAt
        endedAt
      }
    }
  }
`

const UPDATE_ACADEMIC_APPOINTMENTS = gql`
  mutation UpdateAdministrativeLeadershipPositions(
    $input: UpdateAdministrativeLeadershipPositionsMutationInput!
  ) {
    updateAdministrativeLeadershipPositions(input: $input) {
      administrativeLeadershipPositions {
        title
      }
    }
  }
`

interface AdministrativeLeadershipPositionsForm {
  title: string
  startedAt: Date
  currentPosition: boolean
  endedAt: Date
}

const emptyFormSet: AdministrativeLeadershipPositionsForm = {
  title: "",
  startedAt: new Date(),
  currentPosition: true,
  endedAt: new Date(),
}

type FormValues = {
  administrativeLeadershipPositions: AdministrativeLeadershipPositionsForm[]
}

const buildInitialFormValues = ({
  personalDetails,
}: GetAdministrativeLeadershipPositionsQuery): FormValues => {
  if (
    personalDetails?.administrativeLeadershipPositions.length === 0 ||
    !personalDetails
  ) {
    return { administrativeLeadershipPositions: [emptyFormSet] }
  } else {
    const administrativeLeadershipPositionsFormValues = personalDetails?.administrativeLeadershipPositions.map(
      administrativeLeadershipPosition => {
        return {
          title: administrativeLeadershipPosition.title || "",
          startedAt: dateOrToday(administrativeLeadershipPosition?.startedAt),
          currentPosition: administrativeLeadershipPosition?.endedAt
            ? false
            : true,
          endedAt: dateOrToday(administrativeLeadershipPosition?.endedAt),
        }
      },
    )

    return {
      administrativeLeadershipPositions: administrativeLeadershipPositionsFormValues,
    }
  }
}

const toAdministrativeLeadershipPositionMutationInput = ({
  title,
  startedAt,
  currentPosition,
  endedAt,
}: AdministrativeLeadershipPositionsForm): AdministrativeLeadershipPositionsInput => {
  return {
    title,
    startedAt: startedAt,
    endedAt: !currentPosition ? endedAt : null,
  }
}

const validationSchema = yup.object().shape({
  administrativeLeadershipPositions: yup.array().of(
    yup.object({
      title: yup.string(),
      startedAt: yup.date().when("currentPosition", {
        is: false,
        then: yup.date().when(
          "endedAt",
          (endedAt: Date): SchemaLike => {
            return (
              endedAt &&
              yup
                .date()
                .max(endedAt, "Start date should be before the end date")
            )
          },
        ),
      }),
      endedAt: yup.date().when("currentPosition", {
        is: false,
        then: yup.date().when(
          "startedAt",
          (startedAt: Date): SchemaLike => {
            return (
              startedAt &&
              yup
                .date()
                .min(startedAt, "End date should be after the start date")
            )
          },
        ),
      }),
    }),
  ),
})

interface AdministrativeLeadershipPositionFieldsProps {
  formikProps: FormikProps<FormValues>
  fieldArrayProps: FieldArrayRenderProps
}

const AdministrativeLeadershipPositionFields: FC<AdministrativeLeadershipPositionFieldsProps> = ({
  formikProps: {
    values: { administrativeLeadershipPositions },
    handleChange,
    setFieldValue,
    errors,
  },
  fieldArrayProps: { push, remove },
}) => {
  return (
    <>
      {administrativeLeadershipPositions.map(
        (_administrativeLeadershipPosition, index) => {
          const errorsForFieldSet: FormikErrors<AdministrativeLeadershipPositionsForm> =
            errors.administrativeLeadershipPositions &&
            errors.administrativeLeadershipPositions[index]
              ? (errors.administrativeLeadershipPositions[
                  index
                ] as FormikErrors<AdministrativeLeadershipPositionsForm>)
              : {}

          const toFieldName = (fieldName: string): string => {
            return `administrativeLeadershipPositions[${index}].${fieldName}`
          }

          return (
            <View key={index} style={style.appointmentContainer}>
              <Text style={style.appointmentTitleText}>
                Administrative Leadership Position #{index + 1}
              </Text>
              <TextField
                label="Position title"
                value={administrativeLeadershipPositions[index].title}
                updateValue={handleChange(toFieldName("title"))}
                errors={errorsForFieldSet.title}
              />
              <DatePickerField
                label="Start date"
                value={administrativeLeadershipPositions[index].startedAt}
                updateValue={(_event: Event, value: Date | undefined): void => {
                  setFieldValue(toFieldName("startedAt"), value)
                }}
                errors={errorsForFieldSet.startedAt}
              />
              <SwitchField
                label="Are you currently holding this position?"
                value={administrativeLeadershipPositions[index].currentPosition}
                updateValue={(value: boolean): void => {
                  setFieldValue(toFieldName("currentPosition"), value)
                }}
                errors={errorsForFieldSet.currentPosition}
              />
              {!administrativeLeadershipPositions[index].currentPosition && (
                <DatePickerField
                  label="End date"
                  value={administrativeLeadershipPositions[index].endedAt}
                  updateValue={(
                    _event: Event,
                    value: Date | undefined,
                  ): void => {
                    setFieldValue(toFieldName("endedAt"), value)
                  }}
                  errors={errorsForFieldSet.endedAt}
                />
              )}
              <Button
                title="Remove"
                color={Colors.danger.s400}
                onPress={(): void => {
                  remove(index)
                }}
              />
            </View>
          )
        },
      )}
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
      name="administrativeLeadershipPositions"
      render={(fieldArrayProps): ReactNode => {
        return (
          <AdministrativeLeadershipPositionFields
            formikProps={formikProps}
            fieldArrayProps={fieldArrayProps}
          />
        )
      }}
    />
  )
}

interface FormikStateHandlerProps {
  queryData: GetAdministrativeLeadershipPositionsQuery
  mutationData:
    | UpdateAdministrativeLeadershipPositionsMutation
    | null
    | undefined
  mutationInFlight: boolean
  mutation: MutationFunction<
    UpdateAdministrativeLeadershipPositionsMutation,
    MutationUpdateAdministrativeLeadershipPositionsArgs
  >
}

const FormikStateHandler: FC<FormikStateHandlerProps> = ({
  queryData,
  mutationData,
  mutationInFlight,
  mutation,
}) => {
  const initialFormState = buildInitialFormValues(queryData)

  return (
    <Formik
      validateOnBlur={false}
      validateOnMount={false}
      validationSchema={validationSchema}
      initialValues={initialFormState}
      onSubmit={(values: FormValues): void => {
        mutation({
          variables: {
            input: {
              administrativeLeadershipPositionsAttributes: values.administrativeLeadershipPositions.map(
                toAdministrativeLeadershipPositionMutationInput,
              ),
            },
          },
        })
      }}
    >
      {(formikProps): ReactNode => {
        return (
          <FormNavigationHandler<FormValues>
            formikProps={formikProps}
            submissionInFlight={mutationInFlight}
            initialFormState={initialFormState}
            successfulMutation={
              !!mutationData?.updateAdministrativeLeadershipPositions
                ?.administrativeLeadershipPositions
            }
          >
            <Form formikProps={formikProps} />
          </FormNavigationHandler>
        )
      }}
    </Formik>
  )
}

const AdministrativeLeadershipPositionsForm: FC = () => {
  return (
    <GraphQLFormHandler<
      GetAdministrativeLeadershipPositionsQuery,
      UpdateAdministrativeLeadershipPositionsMutation,
      MutationUpdateAdministrativeLeadershipPositionsArgs
    >
      queryDocument={GET_ACADEMIC_APPOINTMENTS}
      mutationDocument={UPDATE_ACADEMIC_APPOINTMENTS}
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
  appointmentContainer: {
    marginBottom: Sizing.x20,
  },
  appointmentTitleText: {
    ...Typography.subheader.x30,
    marginBottom: Sizing.x20,
  },
})

export default AdministrativeLeadershipPositionsForm
