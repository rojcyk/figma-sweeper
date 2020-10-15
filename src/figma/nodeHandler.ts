import { checkFills } from "./checkers/checkFill"
import { checkStrokes } from "./checkers/checkStroke"
import { checkText } from "./checkers/checkText"
import { traverse } from "./traverse"
import { ColorIndex } from "./colorIndex"
import { TextIndex } from "./textIndex"

export type EditableNode =
  | FrameNode
  | GroupNode
  | ComponentNode
  | InstanceNode
  | BooleanOperationNode
  | VectorNode
  | StarNode
  | LineNode
  | EllipseNode
  | PolygonNode
  | RectangleNode
  | TextNode

// ************************* */
/* NodeHandling
// ************************* */

export const handleNode = (node: SceneNode, settings: Plugin.Settings, colorIndex: ColorIndex, textIndex: TextIndex) => {
  const { overwriteFills, overwriteStrokes } = settings.color

  switch (node.type) {
    case "FRAME":
      traverse(node.children, handleNode, settings, colorIndex, textIndex)

      if (overwriteFills) checkFills(node, colorIndex, settings)
      if (overwriteStrokes) checkStrokes(node, colorIndex, settings)
      break

    case "GROUP":
      traverse(node.children, handleNode, settings, colorIndex, textIndex)

      if (overwriteFills) checkFills(node, colorIndex, settings)
      if (overwriteStrokes) checkStrokes(node, colorIndex, settings)
      break

    case "COMPONENT":
      traverse(node.children, handleNode, settings, colorIndex, textIndex)

      if (overwriteFills) checkFills(node, colorIndex, settings)
      if (overwriteStrokes) checkStrokes(node, colorIndex, settings)
      break

    case "INSTANCE":
      traverse(node.children, handleNode, settings, colorIndex, textIndex)

      if (overwriteFills) checkFills(node, colorIndex, settings)
      if (overwriteStrokes) checkStrokes(node, colorIndex, settings)
      break
    //* *************************/
    /* items below do not have children
    //* *************************/
    case "BOOLEAN_OPERATION":
      // console.log(`this type has children but we shouldn't work with them`)
      if (overwriteFills) checkFills(node, colorIndex, settings)
      if (overwriteStrokes) checkStrokes(node, colorIndex, settings)
      break

    case "VECTOR":
      // console.log('this type has NOT children')
      if (overwriteFills) checkFills(node, colorIndex, settings)
      if (overwriteStrokes) checkStrokes(node, colorIndex, settings)
      break

    case "STAR":
      // console.log('this type has NOT children')
      if (overwriteFills) checkFills(node, colorIndex, settings)
      if (overwriteStrokes) checkStrokes(node, colorIndex, settings)
      break

    case "LINE":
      // console.log('this type has NOT children')
      if (overwriteFills) checkFills(node, colorIndex, settings)
      if (overwriteStrokes) checkStrokes(node, colorIndex, settings)
      break

    case "ELLIPSE":
      // console.log('this type has NOT children')
      if (overwriteFills) checkFills(node, colorIndex, settings)
      if (overwriteStrokes) checkStrokes(node, colorIndex, settings)
      break

    case "POLYGON":
      // console.log('this type has NOT children')
      if (overwriteFills) checkFills(node, colorIndex, settings)
      if (overwriteStrokes) checkStrokes(node, colorIndex, settings)
      break

    case "RECTANGLE":
      if (overwriteFills) checkFills(node, colorIndex, settings)
      if (overwriteStrokes) checkStrokes(node, colorIndex, settings)
      // console.log('this type has NOT children')
      break

    case "TEXT":
      if (overwriteFills) checkFills(node, colorIndex, settings)
      if (overwriteStrokes) checkStrokes(node, colorIndex, settings)

      checkText(node, textIndex, settings)
      
      // console.log('this type has NOT children')
      break

    // case "SLICE":
    //   // This node type is not valid for anything
    //   break
  }
}
