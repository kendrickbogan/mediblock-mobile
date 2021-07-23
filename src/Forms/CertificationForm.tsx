import React, { FC, ReactNode } from "react"
import { gql, MutationFunction } from "@apollo/client"
import * as yup from "yup"
import { Formik, FormikProps } from "formik"
import { SchemaLike } from "yup/lib/types"

import {
  GetCertificationDetailsQuery,
  UpdateCertificationMutation,
  MutationUpdateCertificationArgs,
  UpdateCertificationMutationInput,
  CertificationKindEnum,
} from "../generated/graphql"

import { dateOrToday } from "./dateTimeUtils"
import {
  DatePickerField,
  GraphQLFormHandler,
  FormNavigationHandler,
  SwitchField,
} from "./formHelpers"

const GET_CERTIFICATION = gql`
  query GetCertificationDetails($kind: CertificationKindEnum!) {
    personalDetails {
      id
      certification(kind: $kind) {
        issuedAt
        expiresAt
      }
    }
  }
`

const UPDATE_CERTIFICATION = gql`
  mutation UpdateCertification($input: UpdateCertificationMutationInput!) {
    updateCertification(input: $input) {
      certification {
        kind
      }
    }
  }
`

type FormValues = {
  kind: CertificationKindEnum
  issuedAt: Date
  hasExpiration: boolean
  expiresAt: Date
}

const buildInitialFormValues = (
  { personalDetails }: GetCertificationDetailsQuery,
  kind: CertificationKindEnum,
): FormValues => {
  const hasExpiration = !!personalDetails?.certification?.expiresAt

  return {
    kind,
    issuedAt: dateOrToday(personalDetails?.certification?.issuedAt),
    hasExpiration,
    expiresAt: dateOrToday(personalDetails?.certification?.expiresAt),
  }
}

const buildMutationVariables = ({
  kind,
  issuedAt,
  expiresAt,
  hasExpiration,
}: FormValues): UpdateCertificationMutationInput => {
  return {
    kind,
    issuedAt,
    expiresAt: hasExpiration ? expiresAt : null,
  }
}

const validationSchema = yup.object().shape(
  {
    issuedAt: yup.date(),
    expiresAt: yup.date().when("hasExpiration", {
      is: true,
      then: yup.date().when(
        "issuedAt",
        (issuedAt: Date): SchemaLike => {
          return (
            issuedAt &&
            yup
              .date()
              .min(issuedAt, "Expiration should be after the issue date")
          )
        },
      ),
    }),
  },
  [],
)

interface FormFieldsProps {
  formikProps: FormikProps<FormValues>
}

const FormFields: FC<FormFieldsProps> = ({
  formikProps: { errors, values, setFieldValue },
}) => {
  return (
    <>
      <DatePickerField
        label="Issued At"
        value={values.issuedAt}
        updateValue={(_event: Event, value: Date | undefined): void => {
          setFieldValue("issuedAt", value)
        }}
        errors={errors.issuedAt}
      />
      <SwitchField
        errors={errors.hasExpiration}
        label={"Does this certification expire?"}
        value={values.hasExpiration}
        updateValue={(value: boolean): void => {
          setFieldValue("hasExpiration", value)
        }}
      />
      {values.hasExpiration && (
        <DatePickerField
          label="Expiration Date"
          value={values.expiresAt}
          updateValue={(_event: Event, value: Date | undefined): void => {
            setFieldValue("expiresAt", value)
          }}
          errors={errors.expiresAt}
          isExpirationDate
        />
      )}
    </>
  )
}

interface FormikStateHandlerProps {
  queryData: GetCertificationDetailsQuery
  mutationData: UpdateCertificationMutation | null | undefined
  mutationInFlight: boolean
  mutation: MutationFunction<
    UpdateCertificationMutation,
    MutationUpdateCertificationArgs
  >
  certificationKind: CertificationKindEnum
}

const FormikStateHandler: FC<FormikStateHandlerProps> = ({
  queryData,
  mutationData,
  mutationInFlight,
  mutation,
  certificationKind,
}) => {
  const initialFormState = buildInitialFormValues(queryData, certificationKind)

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
              !!mutationData?.updateCertification?.certification
            }
          >
            <FormFields formikProps={formikProps} />
          </FormNavigationHandler>
        )
      }}
    </Formik>
  )
}

interface CertificationFormProps {
  certificationKind: CertificationKindEnum
}

const CertificationForm: FC<CertificationFormProps> = ({
  certificationKind,
}) => {
  return (
    <GraphQLFormHandler<
      GetCertificationDetailsQuery,
      UpdateCertificationMutation,
      MutationUpdateCertificationArgs
    >
      queryDocument={GET_CERTIFICATION}
      mutationDocument={UPDATE_CERTIFICATION}
      queryVariables={{ kind: certificationKind }}
    >
      {(queryData, mutationData, mutationInFlight, mutation): JSX.Element => {
        return (
          <FormikStateHandler
            queryData={queryData}
            mutationData={mutationData}
            mutationInFlight={mutationInFlight}
            mutation={mutation}
            certificationKind={certificationKind}
          />
        )
      }}
    </GraphQLFormHandler>
  )
}

export default CertificationForm
