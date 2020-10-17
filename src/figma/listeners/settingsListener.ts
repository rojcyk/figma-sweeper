import io from "figmaio/code"
import { COLOR_SETTINGS_CHANGE, TEXT_SETTINGS_CHANGE, COLOR_SETTINGS_STATUS_UPDATE, TEXT_SETTINGS_STATUS_UPDATE } from "../../constants/events"
import { COLOR_SETTINGS, TEXT_SETTINGS } from "../../constants/storage"

export const settingsListener = async () => {
  io.on(COLOR_SETTINGS_CHANGE, async (settings) => {
    figma.clientStorage.setAsync(COLOR_SETTINGS, settings)
    io.send(COLOR_SETTINGS_STATUS_UPDATE, settings)
  })

  io.on(TEXT_SETTINGS_CHANGE, async (settings) => {
    figma.clientStorage.setAsync(TEXT_SETTINGS, settings)
    io.send(TEXT_SETTINGS_STATUS_UPDATE, settings)
  })
}
