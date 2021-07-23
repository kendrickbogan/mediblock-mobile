import React from "react"
import { Text, StyleSheet } from "react-native"
import { DocumentNode } from "graphql"
import { useQuery, useMutation, MutationFunction } from "@apollo/client"
import { useNavigation } from "@react-navigation/native"

import FullScreenLoadingIndicator from "../../FullScreenLoadingIndicator"

import { Typography } from "../../styles"

interface GraphQLFormHandlerProps<
  QueryData,
  MutationData,
  MutationArgs,
  QueryVars
> {
  children: (
    queryData: QueryData,
    mutationData: MutationData | null | undefined,
    mutationInFlight: boolean,
    mutation: MutationFunction<MutationData, MutationArgs>,
  ) => JSX.Element
  queryDocument: DocumentNode
  mutationDocument: DocumentNode
  queryVariables?: QueryVars
}
const GraphQLFormHandler = <
  QueryData,
  MutationData,
  MutationArgs = unknown,
  QueryVars = unknown
>({
  queryDocument,
  queryVariables,
  mutationDocument,
  children,
}: GraphQLFormHandlerProps<
  QueryData,
  MutationData,
  MutationArgs,
  QueryVars
>): JSX.Element | null => {
  const navigation = useNavigation()

  const { data: queryData, loading, error } = useQuery<QueryData, QueryVars>(
    queryDocument,
    {
      variables: queryVariables,
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
    },
  )

  const [
    mutation,
    { data: mutationData, loading: mutationInFlight },
  ] = useMutation<MutationData, MutationArgs>(mutationDocument, {
    refetchQueries: [
      { query: queryDocument, variables: queryVariables },
      "GetCategoryMenuData",
      "GetMenuDataByCategory",
    ],
    onCompleted: () => {
      navigation.dangerouslyGetParent()?.goBack()
    },
    errorPolicy: "all",
  })

  if (loading) {
    return <FullScreenLoadingIndicator />
  }

  if (error) {
    return (
      <>
        <Text style={style.errorText}>
          Something went wrong. Try reloading this screen.
        </Text>
        <Text style={style.errorText}>More info: {error.message}</Text>
      </>
    )
  }

  if (queryData) {
    return <>{children(queryData, mutationData, mutationInFlight, mutation)}</>
  }

  return null
}

const style = StyleSheet.create({
  errorText: {
    ...Typography.body.x20,
  },
})

export default GraphQLFormHandler
