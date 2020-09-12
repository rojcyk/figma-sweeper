import io from "figmaio/code"

import { DOCUMENT_NAME, DOCUMENT_PAINT_STYLES, OPENED_STATE } from "../constants/storage"
import { STYLES_DELETE, STYLES_UPDATE } from "../constants/events"

export const deleteStyles = async () => {
  io.on(STYLES_DELETE, async () => {
    console.log("Deleting data")

    await figma.clientStorage.setAsync(DOCUMENT_NAME, "")
    await figma.clientStorage.setAsync(DOCUMENT_PAINT_STYLES, [])

    io.send(STYLES_UPDATE, {
      name: "",
      paintStyles: []
    })
  })
}
