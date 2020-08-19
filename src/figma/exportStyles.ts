import io from "figmaio/code"

import { DOCUMENT_NAME, DOCUMENT_PAINT_STYLES } from "../constants/storage"
import { STYLES_EXPORT } from "../constants/events"

export const checkIfStyleParsable = (paints: readonly Paint[] | PaintStyle[]) => {
  let visibleLayers = 0
  let paintRequirement = true

  paints.forEach((paintStyle: any) => {
    if (paintStyle.visible) {
      visibleLayers++

      if (paintStyle.type !== 'SOLID') {
        paintRequirement = false
      }
    } 
  })

  const lengthRequirement = visibleLayers < 2
  const valid = paintRequirement && lengthRequirement

  return [valid, paintRequirement, lengthRequirement]
}

export const exportStyles = async () => {
  io.on(STYLES_EXPORT, async () => {
    console.log('Exporting data')

    const localStyles = figma.getLocalPaintStyles()
    const name = figma.root.name

    let paintStyles: object[] = []

    localStyles.forEach((style) => {
      const [valid, paintRequirement, lengthRequirement] = checkIfStyleParsable(style.paints)
      const errors = []

      if (!lengthRequirement) errors.push('The paint style has too many fills.')
      if (!paintRequirement) errors.push(`The paint style is not a solid fill but a "${style.paints[0].type}"`)

      paintStyles.push({
        key: style.key,
        name: style.name,
        paint: valid ? style.paints[0] : null,
        errors: valid ? null : errors,
        // valid: valid
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