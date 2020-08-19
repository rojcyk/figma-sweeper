import { ColorIndex } from './colorIndex'
import { checkIfStyleParsable } from './exportStyles'

export const checkStrokes = (node: any, colorIndex: ColorIndex, settings: any) => {
  const [isValid] = checkIfStyleParsable(node.strokes)
  
  if (isValid) {
    const color = node.strokes[0].color
    const foundColor = colorIndex.findColor(color)

    if (foundColor) {
      node.strokeStyleId = foundColor.id
    }
  }
}