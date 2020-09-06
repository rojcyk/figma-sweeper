import { COLOR_SETTINGS } from "../constants/storage"

export const defaultColorSettings: Plugin.ColorSettings = {
  overwriteStyles: false,
  overwriteFills: true,
  overwriteStrokes: true,
  ignoreOpacity: false,
  findClosestColor: false,
  colorDistance: "deltae"
}

export const getSettings = async (): Promise<Plugin.Settings> => {
  const colorSettings = (await figma.clientStorage.getAsync(COLOR_SETTINGS)) as Plugin.ColorSettings

  return {
    color: colorSettings || defaultColorSettings
  }
}
