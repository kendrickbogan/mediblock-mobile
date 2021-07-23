import { Linking } from "react-native"

const openUrl = async (url: string): Promise<void> => {
  const supported = await Linking.canOpenURL(url)

  if (supported) {
    Linking.openURL(url)
  }
}

const ExternalLinking = {
  openUrl,
}

export default ExternalLinking
