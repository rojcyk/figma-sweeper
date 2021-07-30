import io from "figmaio/code"

import { DOCUMENT_NAME, DOCUMENT_PAINT_STYLES, DOCUMENT_TEXT_STYLES } from "../../constants/storage"
import { STYLES_DELETE, STYLES_UPDATE } from "../../constants/events"

export const deleteStylesListener = async () => {
  io.on(STYLES_DELETE, async () => {
    console.log("[Linter] Deleting data")

    await figma.clientStorage.setAsync(DOCUMENT_NAME, undefined)
    await figma.clientStorage.setAsync(DOCUMENT_PAINT_STYLES, undefined)
    await figma.clientStorage.setAsync(DOCUMENT_TEXT_STYLES, undefined)

    io.send(STYLES_UPDATE, {
      name: "",
      paintStyles: [],
      textStyles: [],
      isSynced: false
    })
  })
}
