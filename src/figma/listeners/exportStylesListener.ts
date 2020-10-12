import io from "figmaio/code"

import { DOCUMENT_NAME, DOCUMENT_PAINT_STYLES } from "../../constants/storage"
import { STYLES_EXPORT, STYLES_UPDATE } from "../../constants/events"
import processPaintStyles from './processPaintStyles'

export const exportStylesListener = async () => {
  io.on(STYLES_EXPORT, async () => {
    console.log("[Linter] Exporting data")

    const localPaintStyles = figma.getLocalPaintStyles()
    const name = figma.root.name
    const paintStyles = processPaintStyles(localPaintStyles)

    // const localTextStyles = figma.getLocalTextStyles()

    await figma.clientStorage.setAsync(DOCUMENT_NAME, name)
    await figma.clientStorage.setAsync(DOCUMENT_PAINT_STYLES, paintStyles)

    if (paintStyles.length !== 0) {
      io.send(STYLES_UPDATE, {
        name,
        paintStyles,
        isSynced: true
      })
    } else {
      figma.notify("There are no paint styles in this document.")
    }
  })
}
