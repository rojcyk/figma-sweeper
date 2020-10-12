import { ColorIndex } from "../colorIndex"
import { EditableNode } from "../nodeHandler"
import { checkIfStyleParsable } from "../listeners/isPaintStyleParsable"

export const checkFills = (
  node: EditableNode,
  colorIndex: ColorIndex,
  settings: Plugin.Settings
) => {
  // When we are working with a group, return null
  if (node.type === "GROUP") return null

  // If the fill style is already set ignore it, unless specified otherwise by settings
  if (node.fillStyleId !== "" && !settings.color.overwriteStyles) return null

  // Check if the style is single, solid color and we can change it, otherwise, ignore it.
  const [isValid, position, err, paint] = checkIfStyleParsable(node.fills)

  if (isValid !== true) return null

  // If the style is not parsable, return null
  if (paint === undefined || paint.type !== "SOLID") return null

  // We contstruct the color for easier processing
  const color: RGBA = {
    ...paint.color,
    a: paint.opacity ? paint.opacity : 1
  }

  // First, before we even start comparing, we check whether the color already exists
  const foundColor = colorIndex.findImportedColor(color)

  if (foundColor) {
    node.fillStyleId = foundColor.id
    return foundColor.id
  } else {
    if (settings.color.findClosestColor) {
      const comparedColor = colorIndex.findSimilarColor(color)

      if (comparedColor) {
        node.fillStyleId = comparedColor.id
        return comparedColor.id
      }
    }
  }

  return null
}
