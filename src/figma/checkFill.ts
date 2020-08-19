import { ColorIndex } from './colorIndex'
import { checkIfStyleParsable } from './exportStyles'

export const checkFills = (node: any, colorIndex: ColorIndex, settings: any) => {
  const [isValid] = checkIfStyleParsable(node.fills)

  if (isValid) {
    const color = node.fills[0].color
    const foundColor = colorIndex.findColor(color)

    if (foundColor) {
      node.fillStyleId = foundColor.id
    }
  }
}