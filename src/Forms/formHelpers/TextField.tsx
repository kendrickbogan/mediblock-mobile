import React, { FC } from "react"
import { StyleSheet, View, Text, TextInput, TextInputProps } from "react-native"

import FieldErrors from "./FieldErrors"

import { Forms, Sizing } from "../../styles"

interface TextFieldProps extends TextInputProps {
  label: string
  errors: string | undefined
  value: string
  updateValue: (value: string) => void
  noMarginBottom?: boolean
}

const TextField: FC<TextFieldProps> = ({
  label,
  errors,
  value,
  updateValue,
  noMarginBottom,
  ...props
}) => {
  const inputContainerStyle = {
    ...style.inputContainer,
    ...(noMarginBottom && { marginBottom: 0 }),
  }

  return (
    <View style={inputContainerStyle}>
      <Text style={style.inputLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={updateValue}
        style={style.input}
        returnKeyType="done"
        {...props}
      />
      <FieldErrors errors={errors} />
    </View>
  )
}

const style = StyleSheet.create({
  inputContainer: {
    marginBottom: Sizing.x20,
  },
  input: {
    ...Forms.input.primary,
  },
  inputLabel: {
    ...Forms.inputLabel.primary,
  },
})

export default TextField
