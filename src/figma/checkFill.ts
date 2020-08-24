import { ColorIndex } from './colorIndex'
import { checkIfStyleParsable } from './exportStyles'

export const checkFills = (node: any, colorIndex: ColorIndex, settings: any) => {
  // When there is no fill, we have nothing to do  
  if (node.fills.length !== 0) {
    // If the fill style is already set ignore it, unless specified otherwise by settings
    if (node.fillStyleId !== "" && settings.overwriteStyle || node.fillStyleId === "") {
      // Check if the style is single, solid color and we can change it, otherwise, ignore it.
      const [
        isValid,
        _paintRequirement,
        _lengthRequirement,
        position
      ] = checkIfStyleParsable(node.fills)

      if (isValid) {
        const color = {
          ...node.fills[position].color,
          opacity: node.fills[position].opacity
        }
        const foundColor = colorIndex.findColor(color)
  
        if (foundColor) {
          node.fillStyleId = foundColor.id
        }
      }
    }
  }
}