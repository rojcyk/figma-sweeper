import { TextIndex } from "../textIndex"

export const checkText = (
  node: TextNode,
  textIndex: TextIndex,
  settings: Plugin.Settings
) => {
  if (node.fontName != figma.mixed && node.fontSize != figma.mixed) {
    let styles: TextStyle[] = []

    if (settings.text.matchFamilies || settings.text.matchStyle || settings.text.matchHeight)
      styles = textIndex.textStyles

    if (settings.text.matchFamilies)
      styles = textIndex.filterByFamily(styles, node.fontName.family)

    if (settings.text.matchStyle)
      styles = textIndex.filterByStyle(styles, node.fontName.style)

    if (settings.text.matchHeight)
      styles = textIndex.filterByHeight(styles, node.fontSize)

    if (styles.length > 0) {
      node.textStyleId = styles[0].id
    }
  }

  return null
}
