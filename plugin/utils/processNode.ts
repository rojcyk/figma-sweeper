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

const noDefaultNames = (errorManager: CanvasErrorManager, node: SceneNode, reg: RegExp) => {
  switch (errorManager.settings.layerNameCase) {
    case 'noCase':
      const noCaseResult = reg.exec(node.name)
      if (noCaseResult !== null) errorManager.log('layerNameLinting', node)
      break
    case 'camelCase':
      const camelRegex = /^([a-z]+[A-Z][a-z]+|[a-z]+)$/
      const camelResult = camelRegex.exec(node.name)
      if (camelResult === null) errorManager.log('layerNameLinting', node)
      break
    case 'snakeCase':
      const snakeRegex = /^([a-z]+_[a-z]+|[a-z]+)$/
      const snakeResult = snakeRegex.exec(node.name)
      if (snakeResult === null) errorManager.log('layerNameLinting', node)
      break
    case 'kebabCase':
      const kebabRegex = /^([a-z]+-[a-z]+|[a-z]+)$/
      const kebabResult = kebabRegex.exec(node.name)
      if (kebabResult === null) errorManager.log('layerNameLinting', node)
      break
    case 'pascalCase':
      const pascalRegex = /^([A-Z][a-z]+[A-Z][a-z]+|[A-Z][a-z]+)$/
      const pascalResult = pascalRegex.exec(node.name)
      if (pascalResult === null) errorManager.log('layerNameLinting', node)
      break
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

  // Linting available for all elements
  if (settings.deleteHidden) deleteHidden(errorManager, node)

  switch (node.type) {
    case "FRAME":
      traverse(node.children, processNode, errorManager)

      if (settings.requireFillStyles) requireFillStyles(errorManager, node)
      if (settings.requireStrokeStyles) requireStrokeStyles(errorManager, node)
      if (settings.requireEffectStyles) requireEffectStyles(errorManager, node)
      if (settings.layerNameLinting) noDefaultNames(errorManager, node, /^Frame\s[0-9]+$/)
      if (settings.pixelPerfect) makePixelPerfect(errorManager, node)

      // if (overwriteFills) checkFills(node, settings)
      // if (overwriteStrokes) checkStrokes(node, settings)
      break

    case "GROUP":
      traverse(node.children, processNode, errorManager)

      if (settings.ungroupSingleGroup) ungroupSingleGroup(errorManager, node)
      if (settings.layerNameLinting) noDefaultNames(errorManager, node, /^Group\s[0-9]+$/)
      
      // if (overwriteFills) checkFills(node, settings)
      // if (overwriteStrokes) checkStrokes(node, settings)
      break

    case "COMPONENT_SET":
      traverse(node.children, processNode, errorManager)

      if (settings.requireFillStyles) requireFillStyles(errorManager, node)
      if (settings.requireStrokeStyles) requireStrokeStyles(errorManager, node)
      if (settings.requireEffectStyles) requireEffectStyles(errorManager, node)
      if (settings.layerNameLinting) noDefaultNames(errorManager, node, /^Component\s[0-9]+$/)
      if (settings.pixelPerfect) makePixelPerfect(errorManager, node)

      break

    case "COMPONENT":
      traverse(node.children, processNode, errorManager)

      if (settings.requireFillStyles) requireFillStyles(errorManager, node)
      if (settings.requireStrokeStyles) requireStrokeStyles(errorManager, node)
      if (settings.requireEffectStyles) requireEffectStyles(errorManager, node)
      if (settings.layerNameLinting) noDefaultNames(errorManager, node, /^Component\s[0-9]+$/)
      if (settings.pixelPerfect) makePixelPerfect(errorManager, node)

      // if (overwriteFills) checkFills(node settings)
      // if (overwriteStrokes) checkStrokes(node settings)
      break

    case "INSTANCE":
      traverse(node.children, processNode, errorManager)

      if (settings.requireFillStyles) requireFillStyles(errorManager, node)
      if (settings.requireStrokeStyles) requireStrokeStyles(errorManager, node)
      if (settings.requireEffectStyles) requireEffectStyles(errorManager, node)
      if (settings.pixelPerfect) makePixelPerfect(errorManager, node)

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
      if (settings.layerNameLinting) noDefaultNames(errorManager, node, /^Vector\s[0-9]+$/)
      // console.log('this type has NOT children')
      // if (overwriteFills) checkFills(node, settings)
      // if (overwriteStrokes) checkStrokes(node, settings)
      break

    case "STAR":
      if (settings.requireFillStyles) requireFillStyles(errorManager, node)
      if (settings.requireStrokeStyles) requireStrokeStyles(errorManager, node)
      if (settings.requireEffectStyles) requireEffectStyles(errorManager, node)
      if (settings.layerNameLinting) noDefaultNames(errorManager, node, /^Star\s[0-9]+$/)
      // console.log('this type has NOT children')
      // if (overwriteFills) checkFills(node, settings)
      // if (overwriteStrokes) checkStrokes(node, settings)
      break

    case "LINE":
      if (settings.requireFillStyles) requireFillStyles(errorManager, node)
      if (settings.requireStrokeStyles) requireStrokeStyles(errorManager, node)
      if (settings.requireEffectStyles) requireEffectStyles(errorManager, node)
      if (settings.layerNameLinting) noDefaultNames(errorManager, node, /^Line\s[0-9]+$/)
      // console.log('this type has NOT children')
      // if (overwriteFills) checkFills(node, settings)
      // if (overwriteStrokes) checkStrokes(node, settings)
      break

    case "ELLIPSE":
      if (settings.requireFillStyles) requireFillStyles(errorManager, node)
      if (settings.requireStrokeStyles) requireStrokeStyles(errorManager, node)
      if (settings.requireEffectStyles) requireEffectStyles(errorManager, node)
      if (settings.layerNameLinting) noDefaultNames(errorManager, node, /^Ellipse\s[0-9]+$/)
      // console.log('this type has NOT children')
      // if (overwriteFills) checkFills(node, settings)
      // if (overwriteStrokes) checkStrokes(node, settings)
      break

    case "POLYGON":
      if (settings.requireFillStyles) requireFillStyles(errorManager, node)
      if (settings.requireStrokeStyles) requireStrokeStyles(errorManager, node)
      if (settings.requireEffectStyles) requireEffectStyles(errorManager, node)
      if (settings.layerNameLinting) noDefaultNames(errorManager, node, /^Polygon\s[0-9]+$/)
      // console.log('this type has NOT children')
      // if (overwriteFills) checkFills(node,  settings)
      // if (overwriteStrokes) checkStrokes(node,  settings)
      break

    case "RECTANGLE":
      if (settings.requireFillStyles) requireFillStyles(errorManager, node)
      if (settings.requireStrokeStyles) requireStrokeStyles(errorManager, node)
      if (settings.requireEffectStyles) requireEffectStyles(errorManager, node)
      if (settings.layerNameLinting) noDefaultNames(errorManager, node, /^Rectangle\s[0-9]+$/)
      if (settings.pixelPerfect) makePixelPerfect(errorManager, node)
      // if (overwriteFills) checkFills(node, colorIndex, settings)
      // if (overwriteStrokes) checkStrokes(node, colorIndex, settings)
      // console.log('this type has NOT children')
      break
  
    case "STAR":
      if (settings.requireFillStyles) requireFillStyles(errorManager, node)
      if (settings.requireStrokeStyles) requireStrokeStyles(errorManager, node)
      if (settings.requireEffectStyles) requireEffectStyles(errorManager, node)
      if (settings.layerNameLinting) noDefaultNames(errorManager, node, /^Star\s[0-9]+$/)
      // if (overwriteFills) checkFills(node, colorIndex, settings)
      // if (overwriteStrokes) checkStrokes(node, colorIndex, settings)
      // console.log('this type has NOT children')
      break

    case "TEXT":
      if (settings.requireTextStyles) requireTextStyles(errorManager, node)
      if (settings.requireFillStyles) requireFillStyles(errorManager, node)
      if (settings.requireEffectStyles) requireEffectStyles(errorManager, node)
      if (settings.requireStrokeStyles) requireStrokeStyles(errorManager, node)
      if (settings.pixelPerfect) makePixelPerfect(errorManager, node)
      // if (overwriteFills) checkFills(node, colorIndex, settings)
      // if (overwriteStrokes) checkStrokes(node, colorIndex, settings)      
      // console.log('this type has NOT children')
      break

    case "SLICE":
      if (settings.layerNameLinting) noDefaultNames(errorManager, node, /^Slice\s[0-9]+$/)
      if (settings.pixelPerfect) makePixelPerfect(errorManager, node)
      break
  } 
}
