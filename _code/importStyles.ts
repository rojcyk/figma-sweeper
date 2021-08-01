import { DOCUMENT_PAINT_STYLES, DOCUMENT_TEXT_STYLES } from "../constants/storage"
import asyncForEach from "../helpers/asyncForEach"

export const isImported = (arr: any[], key: string) => {
  return arr.find((el) => {
    if (el.key === key) return el
    else return undefined
  })
}

export const importStyles = async () => {
  try {
    let importedPaintStyles: any[] = []
    let importedTextStyles: any[] = []

    const localPaintStyles = figma.getLocalPaintStyles()
    const localTextStyles = figma.getLocalTextStyles()

    const fillStyles = await figma.clientStorage.getAsync(DOCUMENT_PAINT_STYLES)
    const textStyles = await figma.clientStorage.getAsync(DOCUMENT_TEXT_STYLES)

    await asyncForEach(fillStyles, async (style: any) => {
      if (style.errors === null) {
        let imported = isImported(localPaintStyles, style.key)
        if (imported === undefined) imported = await figma.importStyleByKeyAsync(style.key)
        importedPaintStyles.push(imported)
      }
    })

    await asyncForEach(textStyles, async (style: any) => {
      let imported = isImported(localTextStyles, style.key)
      if (imported === undefined) imported = await figma.importStyleByKeyAsync(style.key)
      importedTextStyles.push(imported)
    })

    return {
      importedPaintStyles,
      importedTextStyles
    }
  } catch (e) {
    return undefined
  }
}
