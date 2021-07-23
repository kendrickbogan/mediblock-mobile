import React, { FC } from "react"
import { StyleSheet, View, Text } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { FormikErrors } from "formik"
import dayjs from "dayjs"
import { SvgXml } from "react-native-svg"

import FieldErrors from "./FieldErrors"
import { useUserContext } from "../../UserContext"
import { toExpirationWarningTimeFrameUnitsString } from "../../stringHelpers"

import { Forms, Sizing, Typography, Colors, Outlines } from "../../styles"
import { Icons } from "../../assets"

interface DatePickerFieldProps {
  label: string
  value: Date
  errors?: FormikErrors<Date> | undefined
  updateValue: (event: Event, value: Date | undefined) => void
  isExpirationDate?: boolean
}

const DatePickerField: FC<DatePickerFieldProps> = ({
  label,
  value,
  errors,
  updateValue,
  isExpirationDate,
}) => {
  const {
    currentUser: { expirationWarningTimeFrame },
  } = useUserContext()

  const isExpiringWithinTimeFrame = dayjs(value).isBefore(
    dayjs().add(
      expirationWarningTimeFrame.duration,
      toExpirationWarningTimeFrameUnitsString(expirationWarningTimeFrame.units),
    ),
  )

  const showExpirationWarning = isExpirationDate && isExpiringWithinTimeFrame

  const expiresWithinText = `Expires within ${
    expirationWarningTimeFrame.duration
  } ${toExpirationWarningTimeFrameUnitsString(
    expirationWarningTimeFrame.units,
  )}`

  return (
    <View style={style.inputContainer}>
      <Text style={style.inputLabel}>{label}</Text>
      <DateTimePicker value={value} mode="date" onChange={updateValue} />
      {showExpirationWarning && (
        <View style={style.expiringSoon}>
          <SvgXml
            xml={Icons.AlertCircle}
            stroke={Colors.primary.brand}
            strokeWidth={Sizing.iconStroke.x20}
            width={Sizing.icons.x20}
            height={Sizing.icons.x20}
          />
          <Text style={style.expiringSoonText}>{expiresWithinText}</Text>
        </View>
      )}
      <FieldErrors errors={errors} />
    </View>
  )
}

const style = StyleSheet.create({
  inputContainer: {
    marginBottom: Sizing.x20,
  },
  inputLabel: {
    ...Forms.inputLabel.primary,
  },
  expiringSoon: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: Sizing.x20,
    paddingVertical: Sizing.x7,
    paddingHorizontal: Sizing.x10,
    borderRadius: Outlines.borderRadius.small,
    borderColor: Colors.primary.brand,
    borderWidth: Outlines.borderWidth.base,
  },
  expiringSoonText: {
    ...Typography.subheader.x20,
    color: Colors.primary.brand,
    marginLeft: Sizing.x7,
  },
})

export default DatePickerField
