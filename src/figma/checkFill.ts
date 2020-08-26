import { ColorIndex } from './colorIndex'
import { checkIfStyleParsable } from './exportStyles'

export const checkFills = (node: any, colorIndex: ColorIndex, settings: any) => {
  // When there is no fill, we have nothing to do  
  if (node.fills.length === 0) return null

  // If the fill style is already set ignore it, unless specified otherwise by settings
  if (node.fillStyleId !== "" && !settings.overwriteStyle) return null

  // Check if the style is single, solid color and we can change it, otherwise, ignore it.
  const [
    isValid,
    position
  ] = checkIfStyleParsable(node.fills)

  // If the style is not parsable, return null
  if (isValid !== true) return null

  // We contstruct the color for easier processing
  const color = {
    ...node.fills[position].color,
    opacity: node.fills[position].opacity
  }

  // First, before we even start comparing, we check whether the color already exists
  const foundColor = colorIndex.findImportedColor(color)

  if (foundColor) {
    node.fillStyleId = foundColor.id
    return foundColor.id
  } else {
    if (settings.findClosest) {
      const comparedColor = colorIndex.findSimilarColor(color)
      node.fillStyleId = comparedColor.id
      return comparedColor.id
    }
  }

  return null
}