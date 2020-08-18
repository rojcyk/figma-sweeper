import { ColorIndex } from './colorIndex'

export const isSettable = (node: any) => {
  let visibleLayers = 0
  let valid = true

  node.fills.forEach((paintStyle: any) => {
    if (paintStyle.visible) {
      visibleLayers++

      if (paintStyle.type !== 'SOLID') {
        valid = false
      }
    } 
  })

  if (visibleLayers > 1) valid = false
  
  return valid
}

export const checkFills = (node: any, colorIndex: ColorIndex, settings: any) => {
  const isValid = isSettable(node)

  if (isValid) {
    const color = node.fills[0].color
    const foundColor = colorIndex.findColor(color)

    if (foundColor) {
      node.fillStyleId = foundColor.id
    }
  }
}