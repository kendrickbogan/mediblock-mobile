import React, { FC, useLayoutEffect, useCallback, useState } from "react"
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  ColorValue,
  ViewStyle,
  TextStyle,
  RefreshControl,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { gql, QueryResult } from "@apollo/client"
import { SvgXml } from "react-native-svg"

import {
  useGetSharingEventsQuery,
  GetSharingEventsQuery,
  GetSharingEventsSharingEvents as SharingEventType,
} from "../generated/graphql"
import FullScreenLoadingIndicator from "../FullScreenLoadingIndicator"
import { isoStringToDate, isoStringToTime } from "../dateTimeUtils"
import { categories } from "../category"
import { useStatusBarEffect } from "../navigation/useStatusBarEffect"
import { applyCloseButton } from "../navigation/applyCloseButton"

import { Colors, Sizing, Elements, Typography, Outlines } from "../styles"
import { Icons } from "../assets"

export const GET_SHARING_EVENTS = gql`
  query GetSharingEvents {
    personalDetails {
      id
      sharingEvents {
        id
        sentFromEmail
        recipientEmails
        categoriesIncluded
        createdAt
        documentSent
        documents {
          name
        }
      }
    }
  }
`

const wait = (timeout: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

const History: FC = () => {
  useStatusBarEffect("light", Colors.primary.brand)
  const navigation = useNavigation()

  const ONE_MINUTE = 60000
  const queryResult = useGetSharingEventsQuery({
    errorPolicy: "all",
    pollInterval: ONE_MINUTE,
  })

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await queryResult.refetch()
    await wait(2000)
    setRefreshing(false)
  }, [queryResult])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: applyCloseButton(navigation.goBack),
    })
  }, [navigation])

  return (
    <ScrollView
      style={style.container}
      contentContainerStyle={style.contentContainer}
      alwaysBounceVertical={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <HistoryConnector queryResult={queryResult} />
    </ScrollView>
  )
}

interface HistoryConnectorProps {
  queryResult: QueryResult<GetSharingEventsQuery>
}

const HistoryConnector: FC<HistoryConnectorProps> = ({ queryResult }) => {
  const { error, loading, data } = queryResult

  if (error) {
    return <Text style={style.errorText}>{error.message}</Text>
  }

  if (loading) {
    return <FullScreenLoadingIndicator />
  }

  if (data) {
    return <HistoryContent data={data} />
  }

  return null
}

interface HistoryContentProps {
  data: GetSharingEventsQuery
}

const HistoryContent: FC<HistoryContentProps> = ({ data }) => {
  return (
    <View>
      {data.personalDetails?.sharingEvents.map(sharingEvent => {
        return (
          <SharingEvent sharingEvent={sharingEvent} key={sharingEvent.id} />
        )
      })}
    </View>
  )
}

interface SharingEventProps {
  sharingEvent: SharingEventType
}

const SharingEvent: FC<SharingEventProps> = ({ sharingEvent }) => {
  const dateAndTime = `${isoStringToDate(
    sharingEvent.createdAt,
  )} at ${isoStringToTime(sharingEvent.createdAt)} `

  const shareIsInProgress = !sharingEvent.documentSent
  const statusText = shareIsInProgress ? "In Progress" : "Sent"

  const determineStatusBackgroundColor = (): ColorValue => {
    switch (statusText) {
      case "In Progress":
        return Colors.warning.s400
      case "Sent":
        return Colors.success.s400
    }
  }

  const statusStyle: ViewStyle = {
    ...style.status,
    borderColor: determineStatusBackgroundColor(),
  }

  const statusTextStyle: TextStyle = {
    ...style.statusText,
    color: determineStatusBackgroundColor(),
  }

  return (
    <View style={style.sectionContainer} key={sharingEvent.id}>
      <View style={style.sectionHeader}>
        <Text style={style.sectionTitleText}>{dateAndTime}</Text>
        <View style={statusStyle}>
          <Text style={statusTextStyle}>{statusText}</Text>
        </View>
      </View>

      {sharingEvent.categoriesIncluded.map(id => {
        const category = categories.find(category => category.id === id)

        return (
          <View key={id} style={style.listItem}>
            <Text style={style.listItemText}>{category?.label} forms</Text>
          </View>
        )
      })}

      {sharingEvent.documents.map(({ name }, index) => {
        return (
          <View key={name + index} style={style.listItem}>
            <SvgXml
              xml={Icons.File}
              width={Sizing.icons.x10}
              height={Sizing.icons.x10}
              stroke={Colors.neutral.s800}
              strokeWidth={Sizing.iconStroke.x25}
              style={style.fileIcon}
            />
            <Text style={style.listItemText}>{name}</Text>
          </View>
        )
      })}

      {sharingEvent.recipientEmails.map((email, index) => {
        return (
          <View key={email + index} style={style.listItem}>
            <Text style={style.listItemText}>Recipient: {email}</Text>
          </View>
        )
      })}

      <View style={style.listItem}>
        <Text style={style.listItemText}>
          Sent from: {sharingEvent.sentFromEmail}
        </Text>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    ...Elements.container.base,
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: Colors.neutral.s100,
    paddingTop: Sizing.x20,
  },
  sectionContainer: {
    marginBottom: Sizing.x40,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Sizing.x20,
    paddingBottom: Sizing.x10,
  },
  sectionTitleText: {
    ...Typography.header.x30,
    paddingRight: Sizing.x20,
    flex: 1,
  },
  status: {
    borderRadius: Outlines.borderRadius.small,
    borderWidth: Outlines.borderWidth.thin,
    paddingVertical: Sizing.x5,
    paddingHorizontal: Sizing.x10,
  },
  statusText: {
    ...Typography.subheader.x20,
    color: Colors.neutral.white,
  },
  listItem: {
    backgroundColor: Colors.neutral.white,
    borderRadius: Outlines.borderRadius.base,
    marginHorizontal: Sizing.x10,
    marginTop: Sizing.x5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Sizing.x20,
    paddingVertical: Sizing.x15,
  },
  listItemText: {
    ...Typography.body.x20,
    color: Colors.neutral.s800,
  },
  fileIcon: {
    marginRight: Sizing.x5,
  },
  errorText: {
    color: Colors.danger.s400,
    marginTop: Sizing.x5,
  },
})

export default History
