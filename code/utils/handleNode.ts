// ************************* */
/* Traverse
// ************************* */

export const traverse = (
  arr: readonly SceneNode[],
  callback: Function,
  options?: any,
) => {
  for (const item of arr) callback(item, options,)
}
  

// ************************* */
/* NodeHandling
// ************************* */

export const handleNode = (node: SceneNode, settings: Plugin.SettingsState) => {
  // const { overwriteFills, overwriteStrokes } = settings.color

  console.log(node)

  switch (node.type) {
    case "FRAME":
      traverse(node.children, handleNode, settings)

      // if (overwriteFills) checkFills(node, settings)
      // if (overwriteStrokes) checkStrokes(node, settings)
      break

    case "GROUP":
      traverse(node.children, handleNode, settings)

      // if (overwriteFills) checkFills(node, settings)
      // if (overwriteStrokes) checkStrokes(node, settings)
      break

    case "COMPONENT_SET":
      traverse(node.children, handleNode, settings)
      break

    case "COMPONENT":
      traverse(node.children, handleNode, settings)

      // if (overwriteFills) checkFills(node settings)
      // if (overwriteStrokes) checkStrokes(node settings)
      break

    case "INSTANCE":
      traverse(node.children, handleNode, settings)

      // if (overwriteFills) checkFills(node settings)
      // if (overwriteStrokes) checkStrokes(node, settings)
      break

    case "BOOLEAN_OPERATION":
      // console.log(`this type has children but we shouldn't work with them`)
      // if (overwriteFills) checkFills(node, settings)
      // if (overwriteStrokes) checkStrokes(node, settings)
      break
      
    //* *************************/
    /* items below do not have children
    //* *************************/

    case "VECTOR":
      // console.log('this type has NOT children')
      // if (overwriteFills) checkFills(node, settings)
      // if (overwriteStrokes) checkStrokes(node, settings)
      break

    case "STAR":
      // console.log('this type has NOT children')
      // if (overwriteFills) checkFills(node, settings)
      // if (overwriteStrokes) checkStrokes(node, settings)
      break

    case "LINE":
      // console.log('this type has NOT children')
      // if (overwriteFills) checkFills(node, settings)
      // if (overwriteStrokes) checkStrokes(node, settings)
      break

    case "ELLIPSE":
      // console.log('this type has NOT children')
      // if (overwriteFills) checkFills(node, settings)
      // if (overwriteStrokes) checkStrokes(node, settings)
      break

    case "POLYGON":
      // console.log('this type has NOT children')
      // if (overwriteFills) checkFills(node,  settings)
      // if (overwriteStrokes) checkStrokes(node,  settings)
      break

    case "RECTANGLE":
      // if (overwriteFills) checkFills(node, colorIndex, settings)
      // if (overwriteStrokes) checkStrokes(node, colorIndex, settings)
      // console.log('this type has NOT children')
      break

    case "TEXT":
      // if (overwriteFills) checkFills(node, colorIndex, settings)
      // if (overwriteStrokes) checkStrokes(node, colorIndex, settings)      
      // console.log('this type has NOT children')
      break

    case "SLICE":
      // This node type is not valid for anything
      break
  }
}
