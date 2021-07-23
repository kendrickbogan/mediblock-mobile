import {
  getTrackingStatus,
  requestTrackingPermission,
} from "react-native-tracking-transparency"

export const determineCanTrackUser = async (): Promise<boolean> => {
  const trackingStatus = await getTrackingStatus()
  const trackingPermission =
    trackingStatus !== "not-determined"
      ? trackingStatus
      : await requestTrackingPermission()

  const canTrackUser =
    trackingPermission === "authorized" || trackingPermission === "unavailable"

  return canTrackUser
}
