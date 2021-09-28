import { SYNCED_PAINT_STYLES } from "@constants/storage"

export const get_paint_styles = async (): Promise<Plugin.ImportedColor[]> => {
  const importedStyles = await figma.clientStorage.getAsync(SYNCED_PAINT_STYLES)
  return importedStyles ? importedStyles : []
}

export const set_paint_styles = async (newPaintStyles: Plugin.ImportedColor[]): Promise<void> => {
  await figma.clientStorage.setAsync(SYNCED_PAINT_STYLES, newPaintStyles)
}

export default {
  get: get_paint_styles,
  set: set_paint_styles
}