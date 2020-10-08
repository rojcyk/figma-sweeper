import io from "figmaio/code"
import { DOCUMENT_PAINT_STYLES } from "../constants/storage"
import asyncForEach from "../helpers/asyncForEach"

export const isImported = (arr: any[], key: string) => {
  return arr.find((el) => {
    if (el.key === key) return el
    else return undefined
  })
}

export const importStyles = async () => {
  try {
    let importedStyles: any[] = []

    const localStyles = figma.getLocalPaintStyles()
    const styles = await figma.clientStorage.getAsync(DOCUMENT_PAINT_STYLES)

    await asyncForEach(styles, async (style: any) => {
      if (style.errors === null) {
        let imported = isImported(localStyles, style.key)
        if (imported === undefined) imported = await figma.importStyleByKeyAsync(style.key)
        importedStyles.push(imported)
      }
    })

    return importedStyles
  } catch (e) {
    return undefined
  }
}
