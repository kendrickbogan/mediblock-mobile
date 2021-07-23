import React, { FC, useState } from "react"
import { StyleSheet, Image, Text, View } from "react-native"
import Pdf from "react-native-pdf"

import { Sizing, Colors, Typography, Outlines } from "../styles"

interface AttachmentData {
  url: string
  previewUrl: string
  contentType: string
}

interface FilePreviewProps {
  attachmentData: AttachmentData
}

const FilePreview: FC<FilePreviewProps> = ({
  attachmentData: { url, previewUrl, contentType },
}) => {
  const [numberOfPages, setNumberOfPages] = useState<number | null>(null)

  if (contentType === "application/pdf") {
    return (
      <>
        <Pdf
          source={{ uri: url }}
          onLoadComplete={(numberOfPages): void => {
            setNumberOfPages(numberOfPages)
          }}
          style={style.previewImage}
          horizontal
          maxScale={1}
          fitPolicy={2}
        />
        {!!numberOfPages && numberOfPages > 1 && (
          <View style={style.numberOfPages}>
            <Text style={style.numberOfPagesText} maxFontSizeMultiplier={1}>
              {numberOfPages}
            </Text>
          </View>
        )}
      </>
    )
  } else {
    return (
      <Image
        style={style.previewImage}
        source={{ uri: previewUrl }}
        resizeMode="contain"
        accessibilityRole="image"
        accessibilityLabel="Image preview of your document."
      />
    )
  }
}

const style = StyleSheet.create({
  previewImage: {
    height: Sizing.x140,
    width: "100%",
    marginBottom: Sizing.x10,
    backgroundColor: Colors.neutral.white,
  },
  numberOfPages: {
    position: "absolute",
    top: Sizing.x5,
    left: Sizing.x5,
    backgroundColor: Colors.secondary.brand,
    width: Sizing.x40,
    height: Sizing.x40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Outlines.borderRadius.max,
  },
  numberOfPagesText: {
    ...Typography.subheader.x20,
    color: Colors.neutral.white,
  },
})

export default FilePreview
