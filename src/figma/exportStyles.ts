import io from "figmaio/code"

import { DOCUMENT_NAME, DOCUMENT_PAINT_STYLES } from "../constants/storage"

export const exportStyles = async () => {
  io.on('export', async (data) => {
    console.log('Exporting data')

    const localStyles = figma.getLocalPaintStyles()
    const name = figma.root.name

    let paintStyles: object[] = []

    localStyles.forEach((style: any) => {
      const valid = style.paints.length < 2 && style.paints[0].type === 'SOLID'

      paintStyles.push({
        key: style.key,
        name: style.name,
        paints: style.paints,
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