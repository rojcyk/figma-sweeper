import io from "figmaio/code"

import { SETTINGS_UPDATE } from '@events'
import { set_settings } from '@storage/settings'

io.on(SETTINGS_UPDATE, async (data: Plugin.SettingsState) => {
  console.log('[Plugin] EVENT - Settings update')
  await set_settings(data)
  console.log('[Plugin] SUCCESS - Settings updated')
})