import { checkFills } from './checkFill'
import { traverse } from './traverse'

// ************************* */
/* NodeHandling
// ************************* */

export const handleNode = (node: any, settings: any, colorIndex: any) => {
  const { fills } = settings

  switch (node.type) {
    case 'FRAME':
      traverse(node.children, handleNode, settings, colorIndex)
      if (fills) checkFills(node, colorIndex, settings)
      break

    case 'GROUP':
      // checkFills(node, colorIndex, settings)
      traverse(node.children, handleNode, settings, colorIndex)
      if (fills) checkFills(node, colorIndex, settings)
      break

    case 'COMPONENT':
      // checkFills(node, colorIndex, settings)
      traverse(node.children, handleNode, settings, colorIndex)
      if (fills) checkFills(node, colorIndex, settings)
      break

    case 'INSTANCE':
      // checkFills(node, colorIndex, settings)
      traverse(node.children, handleNode, settings, colorIndex)
      if (fills) checkFills(node, colorIndex, settings)
      break
    //* *************************/
    /* items below do not have children 
    //* *************************/
    case 'BOOLEAN_OPERATION':
      // console.log(`this type has children but we shouldn't work with them`)
      if (fills) checkFills(node, colorIndex, settings)
      break

    case 'VECTOR':
      // console.log('this type has NOT children')
      if (fills) checkFills(node, colorIndex, settings)
      break

    case 'STAR':
      // console.log('this type has NOT children')
      if (fills) checkFills(node, colorIndex, settings)
      break

    case 'LINE':
      // console.log('this type has NOT children')
      if (fills) checkFills(node, colorIndex, settings)
      break

    case 'ELLIPSE':
      // console.log('this type has NOT children')
      if (fills) checkFills(node, colorIndex, settings)
      break

    case 'POLYGON':
      // console.log('this type has NOT children')
      if (fills) checkFills(node, colorIndex, settings)
      break

    case 'RECTANGLE':
      if (fills) checkFills(node, colorIndex, settings)
      // console.log('this type has NOT children')
      break

    case 'TEXT':
      if (fills) checkFills(node, colorIndex, settings)
      // console.log('this type has NOT children')
      break

    case 'SLICE':
      // console.log('this type has NOT children')
      break
  }
}
