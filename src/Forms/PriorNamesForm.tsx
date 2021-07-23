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

import {
  GetPriorNamesQuery,
  UpdatePriorNamesMutation,
  MutationUpdatePriorNamesArgs,
  PriorNameInput,
} from "../generated/graphql"
import {
  GraphQLFormHandler,
  FormNavigationHandler,
  TextField,
  DatePickerField,
} from "./formHelpers"
import { dateOrToday } from "../dateTimeUtils"

import { Colors, Typography, Sizing } from "../styles"

const GET_PRIOR_NAMES = gql`
  query GetPriorNames {
    personalDetails {
      id
      priorNames {
        name
        startedAt
        endedAt
        comment
      }
    }
  }
`

const UPDATE_PRIOR_NAMES = gql`
  mutation UpdatePriorNames($input: UpdatePriorNamesMutationInput!) {
    updatePriorNames(input: $input) {
      priorNames {
        name
      }
    }
  }
`

interface PriorNamesForm {
  name: string
  startedAt: Date
  endedAt: Date
  comment: string
}

const emptyFormSet: PriorNamesForm = {
  name: "",
  startedAt: new Date(),
  endedAt: new Date(),
  comment: "",
}

type FormValues = {
  priorNames: PriorNamesForm[]
}

const buildInitialFormValues = ({
  personalDetails,
}: GetPriorNamesQuery): FormValues => {
  if (personalDetails?.priorNames.length === 0 || !personalDetails) {
    return { priorNames: [emptyFormSet] }
  } else {
    const priorNamesFormValues = personalDetails?.priorNames.map(priorName => {
      return {
        name: priorName.name || "",
        comment: priorName.comment || "",
        startedAt: dateOrToday(priorName?.startedAt),
        endedAt: dateOrToday(priorName?.endedAt),
      }
    })

    return { priorNames: priorNamesFormValues }
  }
}

const toPriorNameMutationInput = ({
  name,
  comment,
  startedAt,
  endedAt,
}: PriorNamesForm): PriorNameInput => {
  return {
    name,
    comment,
    startedAt,
    endedAt,
  }
}

const validationSchema = yup.object().shape({
  priorNames: yup.array().of(
    yup.object({
      name: yup.string(),
      startedAt: yup.date(),
      endedAt: yup.date(),
    }),
  ),
})

interface PriorNameFieldsProps {
  formikProps: FormikProps<FormValues>
  fieldArrayProps: FieldArrayRenderProps
}

const PriorNameFields: FC<PriorNameFieldsProps> = ({
  formikProps: {
    values: { priorNames },
    handleChange,
    setFieldValue,
    errors,
  },
  fieldArrayProps: { push, remove },
}) => {
  return (
    <>
      {priorNames.map((_priorName, index) => {
        const errorsForFieldSet: FormikErrors<PriorNamesForm> =
          errors.priorNames && errors.priorNames[index]
            ? (errors.priorNames[index] as FormikErrors<PriorNamesForm>)
            : {}

        const toFieldName = (fieldName: string): string => {
          return `priorNames[${index}].${fieldName}`
        }

        return (
          <View key={index} style={style.namesContainer}>
            <Text style={style.namesTitleText}>Prior Name #{index + 1}</Text>
            <TextField
              label="Full name"
              value={priorNames[index].name}
              updateValue={handleChange(toFieldName("name"))}
              errors={errorsForFieldSet.name}
            />
            <DatePickerField
              label="Start date"
              value={priorNames[index].startedAt}
              updateValue={(_event: Event, value: Date | undefined): void => {
                setFieldValue(toFieldName("startedAt"), value)
              }}
              errors={errorsForFieldSet.startedAt}
            />
            <DatePickerField
              label="End date"
              value={priorNames[index].endedAt}
              updateValue={(_event: Event, value: Date | undefined): void => {
                setFieldValue(toFieldName("endedAt"), value)
              }}
              errors={errorsForFieldSet.endedAt}
            />
            <TextField
              label="Comment about name change"
              value={priorNames[index].comment}
              updateValue={handleChange(toFieldName("comment"))}
              errors={errorsForFieldSet.comment}
            />
            <Button
              title="Remove"
              color={Colors.danger.s400}
              onPress={(): void => {
                remove(index)
              }}
            />
            <Button
              title="Add another"
              onPress={(): void => {
                push(emptyFormSet)
              }}
            />
          </View>
        )
      })}
    </>
  )
}

interface FormProps {
  formikProps: FormikProps<FormValues>
}

const Form: FC<FormProps> = ({ formikProps }) => {
  return (
    <FieldArray
      name="priorNames"
      render={(fieldArrayProps): ReactNode => {
        return (
          <PriorNameFields
            formikProps={formikProps}
            fieldArrayProps={fieldArrayProps}
          />
        )
      }}
    />
  )
}

interface FormikStateHandlerProps {
  queryData: GetPriorNamesQuery
  mutationData: UpdatePriorNamesMutation | null | undefined
  mutationInFlight: boolean
  mutation: MutationFunction<
    UpdatePriorNamesMutation,
    MutationUpdatePriorNamesArgs
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
              priorNamesAttributes: values.priorNames.map(
                toPriorNameMutationInput,
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
            successfulMutation={!!mutationData?.updatePriorNames?.priorNames}
          >
            <Form formikProps={formikProps} />
          </FormNavigationHandler>
        )
      }}
    </Formik>
  )
}

const PriorNamesForm: FC = () => {
  return (
    <GraphQLFormHandler<
      GetPriorNamesQuery,
      UpdatePriorNamesMutation,
      MutationUpdatePriorNamesArgs
    >
      queryDocument={GET_PRIOR_NAMES}
      mutationDocument={UPDATE_PRIOR_NAMES}
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
  namesContainer: {
    marginBottom: Sizing.x20,
  },
  namesTitleText: {
    ...Typography.subheader.x30,
    marginBottom: Sizing.x20,
  },
})

export default PriorNamesForm
