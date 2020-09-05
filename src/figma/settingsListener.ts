import io from "figmaio/code"
import { COLOR_SETTINGS_CHANGE } from "../constants/events"
import { COLOR_SETTINGS } from "../constants/storage"

export const settingsListener = async () => {
  io.on(COLOR_SETTINGS_CHANGE, async (settings) => {
    figma.clientStorage.setAsync(COLOR_SETTINGS, settings)
  })
}
