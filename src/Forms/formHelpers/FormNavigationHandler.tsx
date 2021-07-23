import React from "react"
import { FormikProps } from "formik"

import useHeaderSaveButton from "../../navigation/useHeaderSaveButton"
import useUnsavedChanges from "../../navigation/useUnsavedChangesEffect"

interface FormNavigationHandlerProps<FormValues> {
  formikProps: FormikProps<FormValues>
  submissionInFlight: boolean
  initialFormState: FormValues
  successfulMutation: boolean
  children: JSX.Element
}

const FormNavigationHandler = <FormValues extends unknown>({
  formikProps,
  submissionInFlight,
  initialFormState,
  successfulMutation,
  children,
}: FormNavigationHandlerProps<FormValues>): JSX.Element => {
  const { handleSubmit, values, errors } = formikProps

  useHeaderSaveButton<FormValues>(handleSubmit, submissionInFlight, errors)
  useUnsavedChanges<FormValues>(
    values,
    initialFormState,
    successfulMutation,
    handleSubmit,
  )

  return <>{children}</>
}

export default FormNavigationHandler
