import React, { FC, useState, Fragment } from "react"
import { StyleSheet, View, Text, TextInput, Pressable } from "react-native"
import { isEmpty } from "lodash"

import FieldErrors from "./FieldErrors"

import {
  Colors,
  Forms,
  Sizing,
  Layout,
  Typography,
  Outlines,
  Buttons,
} from "../../styles"

interface AutocompleteFieldProps {
  label: string
  errors: string | undefined
  value: string
  updateValue: (value: string) => void
  suggestionsList: string[]
  zIndex?: number
}

const filterSuggestions = (
  suggestionsList: string[],
  query: string,
): string[] => {
  const regex = new RegExp(query.trim())
  return suggestionsList.filter(suggestion => {
    return suggestion.search(regex) >= 0
  })
}

const AutocompleteField: FC<AutocompleteFieldProps> = ({
  label,
  errors,
  value,
  updateValue,
  suggestionsList,
  zIndex = Layout.zIndex.max,
  ...props
}) => {
  const [matchingSuggestions, setMatchingSuggestions] = useState<string[]>([])

  const handleOnChangeText = (value: string): void => {
    if (!isEmpty(value)) {
      const matches = filterSuggestions(suggestionsList, value)
        .sort()
        .slice(0, 5)
      setMatchingSuggestions(matches)
    } else {
      setMatchingSuggestions([])
    }

    updateValue(value)
  }

  const textInputStyle =
    matchingSuggestions.length === 0
      ? style.input
      : {
          ...style.input,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }

  const SuggestionsList: FC = () => {
    if (matchingSuggestions.length === 0) {
      return null
    }

    return (
      <View style={style.suggestionsListContainer}>
        {matchingSuggestions.map((suggestion, index) => {
          const handleOnPressSuggestion = (): void => {
            updateValue(suggestion)
            setMatchingSuggestions([])
          }

          const isLastSuggestion = index === matchingSuggestions.length - 1
          return (
            <Fragment key={suggestion}>
              <Pressable
                style={Buttons.applyOpacity(style.suggestionListItem)}
                onPress={handleOnPressSuggestion}
                accessibilityRole="button"
              >
                <Text style={style.suggestionsListText}>{suggestion}</Text>
              </Pressable>
              {!isLastSuggestion && <View style={style.divider} />}
            </Fragment>
          )
        })}
      </View>
    )
  }

  return (
    <View style={{ ...style.inputContainer, zIndex }}>
      <Text style={style.inputLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={handleOnChangeText}
        style={textInputStyle}
        {...props}
      />
      <SuggestionsList />
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
  suggestionsListContainer: {
    backgroundColor: Colors.neutral.white,
    borderLeftWidth: Outlines.borderWidth.hairline,
    borderRightWidth: Outlines.borderWidth.hairline,
    borderBottomWidth: Outlines.borderWidth.hairline,
    borderBottomLeftRadius: Outlines.borderRadius.small,
    borderBottomRightRadius: Outlines.borderRadius.small,
    borderColor: Colors.neutral.s300,
    width: "100%",
  },
  suggestionListItem: {
    padding: Sizing.x20,
  },
  suggestionsListText: {
    ...Typography.body.x30,
    color: Colors.primary.brand,
  },
  divider: {
    height: Outlines.borderWidth.hairline,
    backgroundColor: Colors.neutral.s300,
  },
})

export default AutocompleteField
