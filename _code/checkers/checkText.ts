import { TextIndex } from "../textIndex"

export const checkText = (
  node: TextNode,
  textIndex: TextIndex,
  settings: Plugin.Settings
) => {
  if (node.fontName != figma.mixed && node.fontSize != figma.mixed) {
    let styles: TextStyle[] = textIndex.textStyles

    if (settings.text.ignoreFamilies && settings.text.ignoreStyle && settings.text.ignoreHeight)
      return null

    if (settings.text.ignoreFamilies !== true)
      styles = textIndex.filterByFamily(styles, node.fontName.family)

    if (settings.text.ignoreStyle !== true)
      styles = textIndex.filterByStyle(styles, node.fontName.style)

    if (settings.text.ignoreHeight !== true)
      styles = textIndex.filterByHeight(styles, node.fontSize)

    if (styles.length > 0) {
      node.textStyleId = styles[0].id
    }
  }

  return null
}
