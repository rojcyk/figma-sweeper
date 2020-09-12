import { ColorIndex } from "./colorIndex"
import { checkIfStyleParsable } from "./exportStyles"

export const checkStrokes = (node: any, colorIndex: ColorIndex, settings: Plugin.Settings) => {
  // When there is no fill, we have nothing to do
  if (node.strokes.length === 0) return null

  // If the fill style is already set ignore it, unless specified otherwise by settings
  if (node.strokeStyleId !== "" && !settings.color.overwriteStyles) return null

  // Check if the style is single, solid color and we can change it, otherwise, ignore it.
  const [isValid, position] = checkIfStyleParsable(node.strokes)

  // If the style is not parsable, return null
  if (isValid !== true) return null

  // We contstruct the color for easier processing
  const color: RGBA = {
    ...node.strokes[position].color,
    a: node.strokes[position].opacity
  }

  const foundColor = colorIndex.findImportedColor(color)

  if (foundColor) {
    node.strokeStyleId = foundColor.id
    return foundColor.id
  } else {
    if (settings.color.findClosestColor) {
      const comparedColor = colorIndex.findSimilarColor(color)
      node.strokeStyleId = comparedColor.id
      return comparedColor.id
    }
  }

  return null
}
