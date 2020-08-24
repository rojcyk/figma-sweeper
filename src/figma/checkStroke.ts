import { ColorIndex } from './colorIndex'
import { checkIfStyleParsable } from './exportStyles'

export const checkStrokes = (node: any, colorIndex: ColorIndex, settings: any) => {
  if (node.strokes.length !== 0) {
    if (node.strokeStyleId !== "" && settings.overwriteStyle || node.strokeStyleId === "") {
      const [
        isValid,
        _paintRequirement,
        _lengthRequirement,
        position
      ] = checkIfStyleParsable(node.strokes)
      
      if (isValid) {
        const color = {
          ...node.strokes[position].color,
          opacity: node.strokes[position].opacity
        }
        const foundColor = colorIndex.findColor(color)

        if (foundColor) {
          node.strokeStyleId = foundColor.id
        }
      }
    }
  }
}