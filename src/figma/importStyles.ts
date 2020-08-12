import io from "figmaio/code"
import { DOCUMENT_PAINT_STYLES } from "../constants/storage"
import asyncForEach from "../helpers/asyncForEach"

export const isImported = (arr: any[], key : string) => {
    return arr.find((el) => { 
      if (el.key === key) return el
      else return undefined
    })

    // if (arr.find((el) => { return el.key === key })) return true
    // else return false
  }
  
export const importStyles = async () => {
  let importedStyles: any[] = []

  const localStyles = figma.getLocalPaintStyles()
  const keys = await figma.clientStorage.getAsync(DOCUMENT_PAINT_STYLES)

  await asyncForEach(keys, async (key: any) => {
    let imported = isImported(localStyles, key.key)
    if (imported === undefined) imported = await figma.importStyleByKeyAsync(key.key)

    // console.log(imported)

    importedStyles.push(imported)
  })

  return importedStyles
}