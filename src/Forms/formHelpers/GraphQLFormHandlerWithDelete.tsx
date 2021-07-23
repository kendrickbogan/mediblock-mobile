import React from "react"
import { DocumentNode } from "graphql"
import { useMutation, MutationFunction } from "@apollo/client"
import { useNavigation } from "@react-navigation/native"
import { GraphQLFormHandler } from "."

interface GraphQLFormHandlerWithDeleteProps<
  QueryData,
  MutationData,
  MutationArgs,
  QueryVars,
  DeleteMutationData
> {
  children: (
    queryData: QueryData,
    mutationData: MutationData | null | undefined,
    mutationInFlight: boolean,
    mutation: MutationFunction<MutationData, MutationArgs>,
    deleteMutation: MutationFunction<DeleteMutationData>,
    deleteMutationData: DeleteMutationData | null | undefined,
  ) => JSX.Element
  queryDocument: DocumentNode
  updateMutationDocument: DocumentNode
  deleteMutationDocument: DocumentNode
  queryVariables?: QueryVars
}

const GraphQLFormHandlerWithDelete = <
  QueryData,
  MutationData,
  MutationArgs = unknown,
  QueryVars = unknown,
  DeleteMutationData = unknown
>({
  queryDocument,
  queryVariables,
  updateMutationDocument,
  deleteMutationDocument,
  children,
}: GraphQLFormHandlerWithDeleteProps<
  QueryData,
  MutationData,
  MutationArgs,
  QueryVars,
  DeleteMutationData
>): JSX.Element | null => {
  const navigation = useNavigation()
  const [
    deleteMutation,
    { data: deleteMutationData, loading: deleteMutationInFlight },
  ] = useMutation<DeleteMutationData>(deleteMutationDocument, {
    refetchQueries: [
      { query: queryDocument, variables: queryVariables },
      "GetCategoryMenuData",
      "GetMenuDataByCategory",
    ],
    onCompleted: () => {
      navigation.goBack()
    },
  })

  return (
    <GraphQLFormHandler<QueryData, MutationData, MutationArgs, QueryVars>
      queryDocument={queryDocument}
      mutationDocument={updateMutationDocument}
    >
      {(
        queryData,
        updateMutationData,
        updateMutationInFlight,
        updateMutation,
      ): JSX.Element => {
        const mutationInFlight =
          updateMutationInFlight || deleteMutationInFlight

        return (
          <>
            {children(
              queryData,
              updateMutationData,
              mutationInFlight,
              updateMutation,
              deleteMutation,
              deleteMutationData,
            )}
          </>
        )
      }}
    </GraphQLFormHandler>
  )
}

export default GraphQLFormHandlerWithDelete
