import io from "figmaio/code"

import { DOCUMENT_NAME, DOCUMENT_PAINT_STYLES } from "../constants/storage"
import { STYLES_EXPORT } from "../constants/events"

type ParsableStyle = [
  boolean,
  boolean,
  boolean,
  number
]

export const checkIfStyleParsable = (paints: readonly Paint[] | PaintStyle[]): ParsableStyle => {
  let visibleLayers = 0
  let paintRequirement = true
  let position = -1
  let validPosition = 0

  console.log(paints)

  paints.forEach((paintStyle: any) => {
    position++
    if (paintStyle.visible) {
      visibleLayers++

      if (paintStyle.type !== 'SOLID') {
        paintRequirement = false
      } else {
        validPosition = position
      }
    } 
  })

  console.log(position)

  const lengthRequirement = visibleLayers < 2
  const valid = paintRequirement && lengthRequirement

  return [valid, paintRequirement, lengthRequirement, validPosition]
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