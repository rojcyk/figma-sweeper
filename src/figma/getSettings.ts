import { COLOR_SETTINGS, TEXT_SETTINGS } from "../constants/storage"

export const defaultColorSettings: Plugin.ColorSettings = {
  overwriteStyles: false,
  overwriteFills: true,
  overwriteStrokes: true,
  ignoreOpacity: false,
  findClosestColor: true,
  colorDistance: "deltae"
}

export const defaultTextSettings: Plugin.TextSettings = {
  matchFamilies: true,
  matchStyle: true,
  matchHeight: true,
}

export const getSettings = async (): Promise<Plugin.Settings> => {
  const colorSettings = (await figma.clientStorage.getAsync(COLOR_SETTINGS)) as Plugin.ColorSettings || undefined
  const textSettings = (await figma.clientStorage.getAsync(TEXT_SETTINGS)) as Plugin.TextSettings || undefined

  return {
    color: colorSettings || defaultColorSettings,
    text: textSettings || defaultTextSettings
  }
}
