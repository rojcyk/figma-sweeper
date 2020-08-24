import { checkFills } from './checkFill'
import { checkStrokes } from './checkStroke'
import { traverse } from './traverse'

// ************************* */
/* NodeHandling
// ************************* */

export const handleNode = (node: any, settings: any, colorIndex: any) => {
  const { fills, strokes } = settings

  switch (node.type) {
    case 'FRAME':
      traverse(node.children, handleNode, settings, colorIndex)

      if (fills) checkFills(node, colorIndex, settings)
      if (strokes) checkStrokes(node, colorIndex, settings)
      break

    case 'GROUP':
      traverse(node.children, handleNode, settings, colorIndex)

      if (fills) checkFills(node, colorIndex, settings)
      if (strokes) checkStrokes(node, colorIndex, settings)
      break

    case 'COMPONENT':
      traverse(node.children, handleNode, settings, colorIndex)

      if (fills) checkFills(node, colorIndex, settings)
      if (strokes) checkStrokes(node, colorIndex, settings)
      break

    case 'INSTANCE':
      traverse(node.children, handleNode, settings, colorIndex)

      if (fills) checkFills(node, colorIndex, settings)
      if (strokes) checkStrokes(node, colorIndex, settings)
      break
    //* *************************/
    /* items below do not have children 
    //* *************************/
    case 'BOOLEAN_OPERATION':
      // console.log(`this type has children but we shouldn't work with them`)
      if (fills) checkFills(node, colorIndex, settings)
      if (strokes) checkStrokes(node, colorIndex, settings)
      break

    case 'VECTOR':
      // console.log('this type has NOT children')
      if (fills) checkFills(node, colorIndex, settings)
      if (strokes) checkStrokes(node, colorIndex, settings)
      break

    case 'STAR':
      // console.log('this type has NOT children')
      if (fills) checkFills(node, colorIndex, settings)
      if (strokes) checkStrokes(node, colorIndex, settings)
      break

    case 'LINE':
      // console.log('this type has NOT children')
      if (fills) checkFills(node, colorIndex, settings)
      if (strokes) checkStrokes(node, colorIndex, settings)
      break

    case 'ELLIPSE':
      // console.log('this type has NOT children')
      if (fills) checkFills(node, colorIndex, settings)
      if (strokes) checkStrokes(node, colorIndex, settings)
      break

    case 'POLYGON':
      // console.log('this type has NOT children')
      if (fills) checkFills(node, colorIndex, settings)
      if (strokes) checkStrokes(node, colorIndex, settings)
      break

    case 'RECTANGLE':
      if (fills) checkFills(node, colorIndex, settings)
      if (strokes) checkStrokes(node, colorIndex, settings)
      // console.log('this type has NOT children')
      break

    case 'TEXT':
      if (fills) checkFills(node, colorIndex, settings)
      if (strokes) checkStrokes(node, colorIndex, settings)
      // console.log('this type has NOT children')
      break

    case 'SLICE':
      // This node type is not valid for anything
      break
  }
}
