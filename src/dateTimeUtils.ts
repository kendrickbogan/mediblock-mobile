import dayjs from "dayjs"

type ISO8601Timestamp = string

export const dateOrToday = (apiValue: ISO8601Timestamp | undefined): Date => {
  if (apiValue) {
    return dayjs(apiValue).toDate()
  } else {
    return dayjs().toDate()
  }
}

export const isoStringToDate = (time: string): string => {
  return dayjs(time).format("MMMM D, YYYY")
}

export const isoStringToTime = (time: string): string => {
  return dayjs(time).format("h:mm A")
}
