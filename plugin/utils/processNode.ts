import { CanvasErrorManager } from '@utils/canvasErrorManager'

// ************************* */
/* Traverse
// ************************* */

export const traverse = (
  arr: readonly SceneNode[],
  callback: Function,
  errorManager?: CanvasErrorManager,
) => {
  for (const item of arr) callback(item, errorManager)
}

const deleteHidden = (errorManager: CanvasErrorManager, node: SceneNode) => {
  if (node.visible === false) {
    errorManager.log('deleteHidden', node)
  }
}

const ungroupSingleGroup = (errorManager: CanvasErrorManager, node: GroupNode) => {
  if (node.children.length === 1) {
    errorManager.log('ungroupSingleGroup', node)
  }
}

const makePixelPerfect = (errorManager: CanvasErrorManager, node: SceneNode) => {
  if (!Number.isInteger(node.x)) {
    errorManager.log('pixelPerfect', node)
  } else if (!Number.isInteger(node.y)) {
    errorManager.log('pixelPerfect', node)
  }
}

type RequiretyleNode =
  BooleanOperationNode |
  ComponentNode |
  ComponentSetNode |
  EllipseNode |
  FrameNode | 
  InstanceNode |
  LineNode |
  PolygonNode |
  RectangleNode |
  VectorNode |
  StarNode |
  TextNode

type StrokeStyleNode = RequiretyleNode
type EcceftStyleNode = RequiretyleNode

const requireFillStyles = (errorManager: CanvasErrorManager, node: RequiretyleNode) => {
  if (node.fills !== figma.mixed) {
    if (node.fills.length === 0) return 

    if (node.fillStyleId === "") {
      errorManager.log('requireFillStyles', node)
    }
  }
}

const requireTextStyles = (errorManager: CanvasErrorManager, node: TextNode) => {
  if (node.textStyleId === "") {
    errorManager.log('requireTextStyles', node)
  }
}

const requireStrokeStyles = (errorManager: CanvasErrorManager, node: StrokeStyleNode) => {
  if (node.strokes.length !== 0) {
    if (node.strokeStyleId === "") {
      errorManager.log('requireStrokeStyles', node)
    }
  }
}

const requireEffectStyles = (errorManager: CanvasErrorManager, node: EcceftStyleNode) => {
  if (node.effects.length !== 0) {
    if (node.strokeStyleId === "") {
      errorManager.log('requireEffectStyles', node)
    }
  }
}

// ************************* */ 
/* NodeHandling
// ************************* */

export const processNode = (node: SceneNode, errorManager: CanvasErrorManager) => {
  const { settings } = errorManager

  // Should we skip linting this node?
  const shouldProcessNode = !(node.locked && settings.skipLocked)
  if (shouldProcessNode === false) return

  // console.log('Node name:', node.name )
  // console.log('Node type:', node.type)
  // console.log('---------------------------')

  // Linting available for all elements
  if (settings.deleteHidden) deleteHidden(errorManager, node)
  if (settings.pixelPerfect) makePixelPerfect(errorManager, node)

  switch (node.type) {
    case "FRAME":
      traverse(node.children, processNode, errorManager)

      if (settings.requireFillStyles) requireFillStyles(errorManager, node)
      if (settings.requireStrokeStyles) requireStrokeStyles(errorManager, node)
      if (settings.requireEffectStyles) requireEffectStyles(errorManager, node)

      // if (overwriteFills) checkFills(node, settings)
      // if (overwriteStrokes) checkStrokes(node, settings)
      break

    case "GROUP":
      traverse(node.children, processNode, errorManager)

      if (settings.ungroupSingleGroup) ungroupSingleGroup(errorManager, node)

      // if (overwriteFills) checkFills(node, settings)
      // if (overwriteStrokes) checkStrokes(node, settings)
      break

    case "COMPONENT_SET":
      traverse(node.children, processNode, errorManager)

      if (settings.requireFillStyles) requireFillStyles(errorManager, node)
      if (settings.requireStrokeStyles) requireStrokeStyles(errorManager, node)
      if (settings.requireEffectStyles) requireEffectStyles(errorManager, node)
      break

    case "COMPONENT":
      traverse(node.children, processNode, errorManager)

      if (settings.requireFillStyles) requireFillStyles(errorManager, node)
      if (settings.requireStrokeStyles) requireStrokeStyles(errorManager, node)
      if (settings.requireEffectStyles) requireEffectStyles(errorManager, node)

      // if (overwriteFills) checkFills(node settings)
      // if (overwriteStrokes) checkStrokes(node settings)
      break

    case "INSTANCE":
      traverse(node.children, processNode, errorManager)

      if (settings.requireFillStyles) requireFillStyles(errorManager, node)
      if (settings.requireStrokeStyles) requireStrokeStyles(errorManager, node)
      if (settings.requireEffectStyles) requireEffectStyles(errorManager, node)

      // if (overwriteFills) checkFills(node settings)
      // if (overwriteStrokes) checkStrokes(node, settings)
      break

    case "BOOLEAN_OPERATION":
      if (settings.requireFillStyles) requireFillStyles(errorManager, node)
      if (settings.requireStrokeStyles) requireStrokeStyles(errorManager, node)
      if (settings.requireEffectStyles) requireEffectStyles(errorManager, node)
      // console.log(`this type has children but we shouldn't work with them`)
      // if (overwriteFills) checkFills(node, settings)
      // if (overwriteStrokes) checkStrokes(node, settings)
      break
      
    //* *************************/
    /* items below do not have children
    //* *************************/

    case "VECTOR":
      if (settings.requireFillStyles) requireFillStyles(errorManager, node)
      if (settings.requireStrokeStyles) requireStrokeStyles(errorManager, node)
      if (settings.requireEffectStyles) requireEffectStyles(errorManager, node)
      // console.log('this type has NOT children')
      // if (overwriteFills) checkFills(node, settings)
      // if (overwriteStrokes) checkStrokes(node, settings)
      break

    case "STAR":
      if (settings.requireFillStyles) requireFillStyles(errorManager, node)
      if (settings.requireStrokeStyles) requireStrokeStyles(errorManager, node)
      if (settings.requireEffectStyles) requireEffectStyles(errorManager, node)
      // console.log('this type has NOT children')
      // if (overwriteFills) checkFills(node, settings)
      // if (overwriteStrokes) checkStrokes(node, settings)
      break

    case "LINE":
      if (settings.requireFillStyles) requireFillStyles(errorManager, node)
      if (settings.requireStrokeStyles) requireStrokeStyles(errorManager, node)
      if (settings.requireEffectStyles) requireEffectStyles(errorManager, node)
      // console.log('this type has NOT children')
      // if (overwriteFills) checkFills(node, settings)
      // if (overwriteStrokes) checkStrokes(node, settings)
      break

    case "ELLIPSE":
      if (settings.requireFillStyles) requireFillStyles(errorManager, node)
      if (settings.requireStrokeStyles) requireStrokeStyles(errorManager, node)
      if (settings.requireEffectStyles) requireEffectStyles(errorManager, node)
      // console.log('this type has NOT children')
      // if (overwriteFills) checkFills(node, settings)
      // if (overwriteStrokes) checkStrokes(node, settings)
      break

    case "POLYGON":
      if (settings.requireFillStyles) requireFillStyles(errorManager, node)
      if (settings.requireStrokeStyles) requireStrokeStyles(errorManager, node)
      if (settings.requireEffectStyles) requireEffectStyles(errorManager, node)
      // console.log('this type has NOT children')
      // if (overwriteFills) checkFills(node,  settings)
      // if (overwriteStrokes) checkStrokes(node,  settings)
      break

    case "RECTANGLE":
      if (settings.requireFillStyles) requireFillStyles(errorManager, node)
      if (settings.requireStrokeStyles) requireStrokeStyles(errorManager, node)
      if (settings.requireEffectStyles) requireEffectStyles(errorManager, node)
      // if (overwriteFills) checkFills(node, colorIndex, settings)
      // if (overwriteStrokes) checkStrokes(node, colorIndex, settings)
      // console.log('this type has NOT children')
      break

    case "TEXT":
      if (settings.requireTextStyles) requireTextStyles(errorManager, node)
      if (settings.requireFillStyles) requireFillStyles(errorManager, node)
      if (settings.requireEffectStyles) requireEffectStyles(errorManager, node)
      if (settings.requireStrokeStyles) requireStrokeStyles(errorManager, node)
      // if (overwriteFills) checkFills(node, colorIndex, settings)
      // if (overwriteStrokes) checkStrokes(node, colorIndex, settings)      
      // console.log('this type has NOT children')
      break

    case "SLICE":
      // This node type is not valid for anything
      break
  } 
}
