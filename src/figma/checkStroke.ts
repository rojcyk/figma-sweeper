import { ColorIndex } from './colorIndex'
import { checkIfStyleParsable } from './exportStyles'

export const checkStrokes = (node: any, colorIndex: ColorIndex, settings: any) => {
  if (node.strokes.length !== 0) {
    if (node.strokeStyleID !== "" && settings.overwriteStyle || node.strokeStyleID === "") {
      const [isValid] = checkIfStyleParsable(node.strokes)
      
      if (isValid) {
        const color = {
          ...node.strokes[0].color,
          opacity: node.strokes[0].opacity
        }
        const foundColor = colorIndex.findColor(color)

        if (foundColor) {
          node.strokeStyleId = foundColor.id
        }
      }
    }
  }
}