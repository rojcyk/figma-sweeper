import io from "figmaio/code"
import { DOCUMENT_PAINT_STYLES } from "../constants/storage"
import asyncForEach from "../helpers/asyncForEach"

export const isImported = (arr: any[], key : string) => {
    if (arr.find((el) => { return el.key === key })) return true
    else return false
  }
  
export const importStyles = async () => {
  io.on('import', async (data) => {
    console.log('Importing data')
    const localStyles = figma.getLocalPaintStyles()
    const keys = await figma.clientStorage.getAsync(DOCUMENT_PAINT_STYLES)

    await asyncForEach(keys, async (key: any) => {
    const imported = isImported(localStyles, key.key)
    if (!imported) await figma.importStyleByKeyAsync(key.key)
    })
  })
}