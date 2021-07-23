import { ExpirationWarningTimeUnitsEnum } from "./generated/graphql"

export const withBase64Header = (data: string, contentType: string): string => {
  return [`data:${contentType};base64,`, data].join("")
}

export const toExpirationWarningTimeFrameUnitsString = (
  expirationWarningTimeFrameUnits: ExpirationWarningTimeUnitsEnum,
): "months" | "weeks" => {
  switch (expirationWarningTimeFrameUnits) {
    case ExpirationWarningTimeUnitsEnum.Months:
      return "months"
    case ExpirationWarningTimeUnitsEnum.Weeks:
      return "weeks"
  }
}
