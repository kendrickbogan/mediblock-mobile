import React, { FC, ReactNode } from "react"
import { gql, MutationFunction } from "@apollo/client"
import * as yup from "yup"
import { Formik, FormikProps } from "formik"

import {
  GetPpdTuberculosisTestingQuery,
  UpdatePpdTuberculosisTestingMutation,
  MutationUpdatePpdTuberculosisTestingArgs,
  UpdatePpdTuberculosisTestingMutationInput,
  PpdInterpretationEnum,
} from "../generated/graphql"
import {
  TextField,
  GraphQLFormHandler,
  FormNavigationHandler,
  SwitchField,
  Dropdown,
  AutocompleteField,
  DatePickerField,
} from "./formHelpers"
import { dateOrToday } from "../dateTimeUtils"

const GET_PPD_TUBERCULOSIS_TESTING = gql`
  query GetPpdTuberculosisTesting {
    personalDetails {
      id
      ppdTuberculosisTesting {
        receivedBcgVaccine
        hadPositiveTbSkinTest
        testedMoreThan5YearsAgo
        testedPositiveAt
        yearTestedPositive
        testReactionSize
        hadTbDiseaseDiagnosis
        hasTakenInhOrRifampin
        treatmentCompletedMoreThan5YearsAgo
        treatmentCompletedAt
        yearTreatmentCompleted
        lastChestXrayAt
        testingSiteName
        addressLine1
        addressLine2
        city
        state
        zip
        ppdInduration
        ppdInterpretation
        testDate
        testedInTheLastYear
      }
    }
    states
  }
`

const UPDATE_PPD_TUBERCULOSIS_TESTING = gql`
  mutation UpdatePpdTuberculosisTesting(
    $input: UpdatePPDTuberculosisTestingMutationInput!
  ) {
    updatePpdTuberculosisTesting(input: $input) {
      ppdTuberculosisTesting {
        receivedBcgVaccine
      }
    }
  }
`

interface FormValues {
  receivedBcgVaccine: boolean
  hadPositiveTbSkinTest: boolean
  testedMoreThan5YearsAgo: boolean
  testedPositiveAt: Date
  yearTestedPositive: string
  testReactionSize: string
  hadTbDiseaseDiagnosis: boolean
  hasTakenInhOrRifampin: boolean
  treatmentCompletedMoreThan5YearsAgo: boolean
  treatmentCompletedAt: Date
  yearTreatmentCompleted: string
  lastChestXrayAt: Date
  testedInTheLastYear: boolean
  testingSiteName: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  zip: string
  ppdInduration: string
  ppdInterpretation: PpdInterpretationEnum
  testDate: Date
}

const buildInitialFormValues = ({
  personalDetails,
}: GetPpdTuberculosisTestingQuery): FormValues => {
  return {
    receivedBcgVaccine:
      personalDetails?.ppdTuberculosisTesting?.receivedBcgVaccine || false,
    hadPositiveTbSkinTest:
      personalDetails?.ppdTuberculosisTesting?.hadPositiveTbSkinTest || false,
    testedMoreThan5YearsAgo:
      personalDetails?.ppdTuberculosisTesting?.testedMoreThan5YearsAgo || false,
    testedPositiveAt: dateOrToday(
      personalDetails?.ppdTuberculosisTesting?.testedPositiveAt,
    ),
    yearTestedPositive:
      personalDetails?.ppdTuberculosisTesting?.yearTestedPositive || "",
    testReactionSize:
      personalDetails?.ppdTuberculosisTesting?.testReactionSize?.toString() ||
      "0",
    hadTbDiseaseDiagnosis:
      personalDetails?.ppdTuberculosisTesting?.hadTbDiseaseDiagnosis || false,
    hasTakenInhOrRifampin:
      personalDetails?.ppdTuberculosisTesting?.hasTakenInhOrRifampin || false,
    treatmentCompletedMoreThan5YearsAgo:
      personalDetails?.ppdTuberculosisTesting
        ?.treatmentCompletedMoreThan5YearsAgo || false,
    treatmentCompletedAt: dateOrToday(
      personalDetails?.ppdTuberculosisTesting?.treatmentCompletedAt,
    ),
    yearTreatmentCompleted:
      personalDetails?.ppdTuberculosisTesting?.yearTreatmentCompleted || "",
    lastChestXrayAt: dateOrToday(
      personalDetails?.ppdTuberculosisTesting?.lastChestXrayAt,
    ),
    testedInTheLastYear:
      personalDetails?.ppdTuberculosisTesting?.testedInTheLastYear || false,
    testingSiteName:
      personalDetails?.ppdTuberculosisTesting?.testingSiteName || "",
    addressLine1: personalDetails?.ppdTuberculosisTesting?.addressLine1 || "",
    addressLine2: personalDetails?.ppdTuberculosisTesting?.addressLine2 || "",
    city: personalDetails?.ppdTuberculosisTesting?.city || "",
    state: personalDetails?.ppdTuberculosisTesting?.state || "",
    zip: personalDetails?.ppdTuberculosisTesting?.zip || "",
    ppdInduration:
      personalDetails?.ppdTuberculosisTesting?.ppdInduration?.toString() || "0",
    ppdInterpretation:
      personalDetails?.ppdTuberculosisTesting?.ppdInterpretation ||
      PpdInterpretationEnum.Negative,
    testDate: dateOrToday(personalDetails?.ppdTuberculosisTesting?.testDate),
  }
}

const buildMutationVariables = ({
  receivedBcgVaccine,
  hadPositiveTbSkinTest,
  testedMoreThan5YearsAgo,
  testedPositiveAt,
  yearTestedPositive,
  testReactionSize,
  hadTbDiseaseDiagnosis,
  hasTakenInhOrRifampin,
  treatmentCompletedMoreThan5YearsAgo,
  treatmentCompletedAt,
  yearTreatmentCompleted,
  lastChestXrayAt,
  testingSiteName,
  addressLine1,
  addressLine2,
  city,
  state,
  zip,
  ppdInduration,
  ppdInterpretation,
  testDate,
  testedInTheLastYear,
}: FormValues): UpdatePpdTuberculosisTestingMutationInput => {
  const valueIfFlag = <T extends unknown>(
    value: T,
    flag: boolean,
  ): T | null => {
    return flag ? value : null
  }

  const tbDiagnosisValues = ():
    | Partial<UpdatePpdTuberculosisTestingMutationInput>
    | undefined => {
    if (hadTbDiseaseDiagnosis) {
      return {
        hasTakenInhOrRifampin,
        yearTreatmentCompleted: valueIfFlag(
          yearTreatmentCompleted,
          treatmentCompletedMoreThan5YearsAgo,
        ),
        treatmentCompletedAt: valueIfFlag(
          treatmentCompletedAt,
          !treatmentCompletedMoreThan5YearsAgo,
        ),
      }
    }

    return undefined
  }

  const testedPostiveValues = ():
    | Partial<UpdatePpdTuberculosisTestingMutationInput>
    | undefined => {
    if (hadPositiveTbSkinTest) {
      return {
        testReactionSize: parseInt(testReactionSize),
        testedMoreThan5YearsAgo,
        yearTestedPositive: valueIfFlag(
          yearTestedPositive,
          testedMoreThan5YearsAgo,
        ),
        testedPositiveAt: valueIfFlag(
          testedPositiveAt,
          !testedMoreThan5YearsAgo,
        ),
        lastChestXrayAt,
        hadTbDiseaseDiagnosis,
        ...tbDiagnosisValues(),
      }
    }
    return undefined
  }

  const testedNegativeValues = ():
    | Partial<UpdatePpdTuberculosisTestingMutationInput>
    | undefined => {
    if (!hadPositiveTbSkinTest && testedInTheLastYear) {
      return {
        testingSiteName,
        addressLine1,
        addressLine2,
        city,
        state,
        zip,
        ppdInduration: parseInt(ppdInduration),
        ppdInterpretation,
        testDate,
      }
    } else {
      return {
        testingSiteName: null,
        addressLine1: null,
        addressLine2: null,
        city: null,
        state: null,
        zip: null,
        ppdInduration: null,
        ppdInterpretation: null,
        testDate: null,
      }
    }
  }

  const defaultBooleanValues = {
    testedMoreThan5YearsAgo: false,
    hadTbDiseaseDiagnosis: false,
    hasTakenInhOrRifampin: false,
    treatmentCompletedMoreThan5YearsAgo: false,
  }

  return {
    receivedBcgVaccine,
    hadPositiveTbSkinTest,
    testedInTheLastYear,
    ...defaultBooleanValues,
    ...testedPostiveValues(),
    ...testedNegativeValues(),
  }
}

const validationSchema = yup.object().shape({
  testingSiteName: yup.string().when("testedInTheLastYear", {
    is: true,
    then: yup.string(),
  }),
  testReactionSize: yup.number().when("hadPositiveTbSkinTest", {
    is: true,
    then: yup.number().typeError("This should be induration size in mm"),
  }),
  yearTestedPositive: yup
    .number()
    .when(["hadPositiveTbSkinTest", "testedMoreThan5YearsAgo"], {
      is: (hadPositiveTbSkinTest: boolean, testedMoreThan5YearsAgo: boolean) =>
        hadPositiveTbSkinTest && testedMoreThan5YearsAgo,
      then: yup.number().typeError("Please provide the year in YYYY format"),
    }),
  yearTreatmentCompleted: yup
    .number()
    .when(
      [
        "hadPositiveTbSkinTest",
        "hadTbDiseaseDiagnosis",
        "hasTakenInhOrRifampin",
        "treatmentCompletedMoreThan5YearsAgo",
      ],
      {
        is: (
          hadPositiveTbSkinTest: boolean,
          hadTbDiseaseDiagnosis: boolean,
          hasTakenInhOrRifampin: boolean,
          treatmentCompletedMoreThan5YearsAgo: boolean,
        ) =>
          hadPositiveTbSkinTest &&
          hadTbDiseaseDiagnosis &&
          hasTakenInhOrRifampin &&
          treatmentCompletedMoreThan5YearsAgo,
        then: yup.number().typeError("Please provide the year in YYYY format"),
      },
    ),
})

interface FormFieldsProps {
  formikProps: FormikProps<FormValues>
  states: string[]
}

const FormFields: FC<FormFieldsProps> = ({
  formikProps: { errors, values, handleChange, setFieldValue },
  states,
}) => {
  return (
    <>
      <SwitchField
        label="Have you ever received the Bacillus Calmette–Guérin (BCG) vaccine?"
        value={values.receivedBcgVaccine}
        updateValue={(value: boolean): void => {
          setFieldValue("receivedBcgVaccine", value)
        }}
        errors={errors.receivedBcgVaccine}
      />
      <SwitchField
        label="Have you ever had a positive reaction to the TB skin test? "
        value={values.hadPositiveTbSkinTest}
        updateValue={(value: boolean): void => {
          setFieldValue("hadPositiveTbSkinTest", value)
        }}
        errors={errors.hadPositiveTbSkinTest}
      />
      {values.hadPositiveTbSkinTest ? (
        <>
          <TextField
            label="Size of reaction/induration (in mm)"
            value={values.testReactionSize}
            updateValue={handleChange("testReactionSize")}
            errors={errors.testReactionSize}
            keyboardType="numeric"
          />
          <SwitchField
            label="Was your positive reaction more than 5 years ago?"
            value={values.testedMoreThan5YearsAgo}
            updateValue={(value: boolean): void => {
              setFieldValue("testedMoreThan5YearsAgo", value)
            }}
            errors={errors.testedMoreThan5YearsAgo}
          />
          {values.testedMoreThan5YearsAgo ? (
            <TextField
              label="Year tested positive"
              value={values.yearTestedPositive}
              updateValue={handleChange("yearTestedPositive")}
              errors={errors.yearTestedPositive}
            />
          ) : (
            <DatePickerField
              label="Date tested positive"
              value={values.testedPositiveAt}
              updateValue={(_event: Event, value: Date | undefined): void => {
                setFieldValue("testedPositiveAt", value)
              }}
              errors={errors.testedPositiveAt}
            />
          )}
          <DatePickerField
            label="Date of last chest X-ray"
            value={values.lastChestXrayAt}
            updateValue={(_event: Event, value: Date | undefined): void => {
              setFieldValue("lastChestXrayAt", value)
            }}
            errors={errors.lastChestXrayAt}
          />
          <SwitchField
            label="Have you ever had a TB disease diagnosis?"
            value={values.hadTbDiseaseDiagnosis}
            updateValue={(value: boolean): void => {
              setFieldValue("hadTbDiseaseDiagnosis", value)
            }}
            errors={errors.hadTbDiseaseDiagnosis}
          />
          {values.hadTbDiseaseDiagnosis && (
            <>
              <SwitchField
                label="Have you taken INH or Rifampin for TB treatment?"
                value={values.hasTakenInhOrRifampin}
                updateValue={(value: boolean): void => {
                  setFieldValue("hasTakenInhOrRifampin", value)
                }}
                errors={errors.hasTakenInhOrRifampin}
              />
              {values.hasTakenInhOrRifampin && (
                <>
                  <SwitchField
                    label="Was your treatment completed more than 5 years ago?"
                    value={values.treatmentCompletedMoreThan5YearsAgo}
                    updateValue={(value: boolean): void => {
                      setFieldValue(
                        "treatmentCompletedMoreThan5YearsAgo",
                        value,
                      )
                    }}
                    errors={errors.treatmentCompletedMoreThan5YearsAgo}
                  />
                  {values.treatmentCompletedMoreThan5YearsAgo ? (
                    <TextField
                      label="Year treatment completed"
                      value={values.yearTreatmentCompleted}
                      updateValue={handleChange("yearTreatmentCompleted")}
                      errors={errors.yearTreatmentCompleted}
                    />
                  ) : (
                    <DatePickerField
                      label="Date treatment completed"
                      value={values.treatmentCompletedAt}
                      updateValue={(
                        _event: Event,
                        value: Date | undefined,
                      ): void => {
                        setFieldValue("treatmentCompletedAt", value)
                      }}
                      errors={errors.treatmentCompletedAt}
                    />
                  )}
                </>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <SwitchField
            label="Have you received a PPD test in the last year?"
            value={values.testedInTheLastYear}
            updateValue={(value: boolean): void => {
              setFieldValue("testedInTheLastYear", value)
            }}
            errors={errors.testedInTheLastYear}
          />
          {values.testedInTheLastYear && (
            <>
              <TextField
                label="Testing site name"
                value={values.testingSiteName}
                updateValue={handleChange("testingSiteName")}
                errors={errors.testingSiteName}
              />
              <DatePickerField
                label="Test date"
                value={values.testDate}
                updateValue={(_event: Event, value: Date | undefined): void => {
                  setFieldValue("testDate", value)
                }}
                errors={errors.testDate}
              />
              <TextField
                label="Address line 1"
                value={values.addressLine1}
                updateValue={handleChange("addressLine1")}
                errors={errors.addressLine1}
              />
              <TextField
                label="Address line 2"
                value={values.addressLine2}
                updateValue={handleChange("addressLine2")}
                errors={errors.addressLine2}
              />
              <TextField
                label="City"
                value={values.city}
                updateValue={handleChange("city")}
                errors={errors.city}
              />
              <AutocompleteField
                label="State"
                errors={errors.state}
                value={values.state}
                updateValue={handleChange("state")}
                suggestionsList={states}
              />
              <TextField
                label="Zip"
                value={values.zip}
                updateValue={handleChange("zip")}
                errors={errors.zip}
              />
              <TextField
                label="PPD Induration"
                value={values.ppdInduration}
                updateValue={handleChange("ppdInduration")}
                errors={errors.ppdInduration}
              />
              <Dropdown<PpdInterpretationEnum>
                options={[
                  { value: PpdInterpretationEnum.Negative, label: "Negative" },
                  { value: PpdInterpretationEnum.Positive, label: "Positive" },
                ]}
                label="PPD Interpretation"
                value={values.ppdInterpretation}
                onValueChange={(value: PpdInterpretationEnum): void =>
                  setFieldValue("ppdInterpretation", value)
                }
                errors={errors.ppdInterpretation}
              />
            </>
          )}
        </>
      )}
    </>
  )
}

interface FormikStateHandlerProps {
  queryData: GetPpdTuberculosisTestingQuery
  mutationData: UpdatePpdTuberculosisTestingMutation | null | undefined
  mutationInFlight: boolean
  mutation: MutationFunction<
    UpdatePpdTuberculosisTestingMutation,
    MutationUpdatePpdTuberculosisTestingArgs
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
              !!mutationData?.updatePpdTuberculosisTesting
                ?.ppdTuberculosisTesting
            }
          >
            <FormFields formikProps={formikProps} states={queryData.states} />
          </FormNavigationHandler>
        )
      }}
    </Formik>
  )
}

const PPDTuberculosisTestingForm: FC = () => {
  return (
    <GraphQLFormHandler<
      GetPpdTuberculosisTestingQuery,
      UpdatePpdTuberculosisTestingMutation,
      MutationUpdatePpdTuberculosisTestingArgs
    >
      queryDocument={GET_PPD_TUBERCULOSIS_TESTING}
      mutationDocument={UPDATE_PPD_TUBERCULOSIS_TESTING}
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

export default PPDTuberculosisTestingForm
