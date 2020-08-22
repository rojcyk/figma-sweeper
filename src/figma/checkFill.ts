import { ColorIndex } from './colorIndex'
import { checkIfStyleParsable } from './exportStyles'

export const checkFills = (node: any, colorIndex: ColorIndex, settings: any) => {  
  if (node.fills.length !== 0) {
    if (node.fillStyleID !== "" && settings.overwriteStyle || node.fillStyleID === "") {
      const [isValid] = checkIfStyleParsable(node.fills)

      if (isValid) {
        const color = {
          ...node.fills[0].color,
          opacity: node.fills[0].opacity
        }
        const foundColor = colorIndex.findColor(color)
  
        if (foundColor) {
          node.fillStyleId = foundColor.id
        }
      }
    }
  }
}