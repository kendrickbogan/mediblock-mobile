import React, { FC } from "react"
import { StyleSheet, View, Text, Switch } from "react-native"

import FieldErrors from "./FieldErrors"

import { Forms, Sizing } from "../../styles"

interface SwitchFieldProps {
  label: string
  errors?: string | undefined
  value: boolean
  updateValue: (value: boolean) => void
}

const SwitchField: FC<SwitchFieldProps> = ({
  label,
  errors,
  value,
  updateValue,
}) => {
  return (
    <View style={style.inputContainer}>
      <Text style={style.inputLabel}>{label}</Text>
      <Switch value={value} onValueChange={updateValue} />
      <FieldErrors errors={errors} />
    </View>
  )
}

const style = StyleSheet.create({
  inputContainer: { marginBottom: Sizing.x20 },
  inputLabel: { ...Forms.inputLabel.primary },
})

export default SwitchField
