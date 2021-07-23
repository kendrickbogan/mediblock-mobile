import dayjs from "dayjs"

type ISO8601Timestamp = string

export const dateOrToday = (apiValue: ISO8601Timestamp | undefined): Date => {
  if (apiValue) {
    return dayjs(apiValue).toDate()
  } else {
    return dayjs().toDate()
  }
}
