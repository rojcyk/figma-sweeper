import { SETTINGS } from "@constants/storage"
import { SETTINGS_DEFAULT } from "@constants/settings"

export const get_settings = async (): Promise<Plugin.SettingsState> => {
  const settings = await figma.clientStorage.getAsync(SETTINGS) as Plugin.SettingsState | undefined

  if (settings === undefined) {
    await figma.clientStorage.setAsync(SETTINGS, SETTINGS_DEFAULT)
    return SETTINGS_DEFAULT
  }

  return settings
}

export const set_settings = async (newSettings: Plugin.SettingsProps): Promise<Plugin.SettingsState> => {
  const settings = await figma.clientStorage.getAsync(SETTINGS)
  const updatedSettings = Object.assign(settings, newSettings)
  await figma.clientStorage.setAsync(SETTINGS, updatedSettings)

  return updatedSettings
}

export default {
  get: get_settings,
  set: set_settings
}