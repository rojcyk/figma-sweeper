import io from "figmaio/code"

import { DOCUMENT_NAME, DOCUMENT_PAINT_STYLES } from "../constants/storage"
import { STYLES_EXPORT } from "../constants/events"

export const exportStyles = async () => {
  io.on(STYLES_EXPORT, async (data) => {
    console.log('Exporting data')

    const localStyles = figma.getLocalPaintStyles()
    const name = figma.root.name

    let paintStyles: object[] = []

    localStyles.forEach((style: any) => {
      const valid = style.paints.length < 2 && style.paints[0].type === 'SOLID'

      paintStyles.push({
        key: style.key,
        name: style.name,
        paint: style.paints[0],
        valid: valid
      })
    })

    await figma.clientStorage.setAsync(DOCUMENT_NAME, name)
    await figma.clientStorage.setAsync(DOCUMENT_PAINT_STYLES, paintStyles)

    io.send('exported', {
      name,
      paintStyles,
    })
  })
}