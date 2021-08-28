import { SYNCED_TEXT_STYLES } from "@constants/storage"
import { asyncForEach } from "@utils/asyncForEach"

export const get_text_styles = async (): Promise<Plugin.ImportedText[]> => {
  const importedStyles = await figma.clientStorage.getAsync(SYNCED_TEXT_STYLES)
  return importedStyles ? importedStyles : []
}

export const set_text_styles = async (newPaintStyles: Plugin.ImportedText[]): Promise<void> => {
  await figma.clientStorage.setAsync(SYNCED_TEXT_STYLES, newPaintStyles)
}

export default {
  get: get_text_styles,
  set: set_text_styles
}