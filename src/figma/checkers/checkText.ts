import { TextIndex } from "../textIndex"
import { EditableNode } from "../nodeHandler"
import { checkIfStyleParsable } from "../listeners/isPaintStyleParsable"

export const checkText = (
  node: TextNode,
  textIndex: TextIndex,
  settings: Plugin.Settings
) => {
  if (node.fontName != figma.mixed && node.fontSize != figma.mixed) {
    const byFamily = textIndex.filterByFamily(textIndex.textStyles, node.fontName.family)
    const byFamilyAndStyle = textIndex.filterByStyle(byFamily, node.fontName.style)
    const byFamilyStyleAndSize = textIndex.filterByHeight(byFamilyAndStyle, node.fontSize)

    if (byFamilyStyleAndSize.length > 0) {
      node.textStyleId = byFamilyStyleAndSize[0].id
    }
  }


  return null
}
