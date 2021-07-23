import { StatusBar } from "react-native"
import DocumentPicker, { MimeType } from "react-native-document-picker"
import RNFS from "react-native-fs"
import RNGeniusScan from "@thegrizzlylabs/react-native-genius-scan"
import Config from "react-native-config"

import { withBase64Header } from "../stringHelpers"
import { FileData } from "./AddDocumentUpload"

const getRawBase64Data = async (uri: string): Promise<string> => {
  return await RNFS.readFile(decodeURI(uri).replace("file://", ""), "base64")
}

type PDFScannerResult = {
  pdfUrl: string
  scans: { originalUrl: string; enhancedUrl: string }[]
}

const scanDocumentWithCamera = async (): Promise<FileData | void> => {
  StatusBar.setHidden(true, "fade")
  const result = await RNGeniusScan.setLicenceKey(
    Config.GENIUS_SCAN_LICENSE_KEY,
  )
    .then(() => {
      return RNGeniusScan.scanWithConfiguration({ source: "camera" })
    })
    .then(async (result: PDFScannerResult) => {
      const rawBase64Data = await getRawBase64Data(result.pdfUrl)
      const base64Data = withBase64Header(rawBase64Data, "application/pdf")

      const data = {
        base64Data,
        mimeType: "application/pdf",
        uri: result.pdfUrl,
        name: "",
      }

      return data
    })
    .catch((_error: Error) => {
      // Handle error
    })

  StatusBar.setHidden(false, "fade")
  return result
}

const getFileFromDevice = async (): Promise<FileData | null> => {
  try {
    const result = await DocumentPicker.pick({
      type: ["public.jpeg", "public.png", "com.adobe.pdf"],
    })
    const { name, uri, type: mimeType } = result

    const rawBase64Data = await getRawBase64Data(uri)
    const base64DataWithHeader = withBase64Header(rawBase64Data, mimeType)

    return {
      base64Data: base64DataWithHeader,
      name: name,
      mimeType: mimeType as MimeType,
      uri: uri,
    }
  } catch (e) {
    if (!DocumentPicker.isCancel(e)) {
      console.log("Something went wrong", e)
    }
  }

  return null
}

const determineFileExtension = (filename: string): string => {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2)
}

export default {
  getFileExtension: determineFileExtension,
  getFileFromDevice,
  scanDocumentWithCamera,
}
