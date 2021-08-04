import io from "figmaio/code"

import { SETTINGS_UPDATE } from '@events'
import { set_settings } from '@storage/settings'
// import { asyncForEach } from '@utils/asyncForEach'
// import { handleNode } from '@utils/nodeHandler'

io.on(SETTINGS_UPDATE, async (data: Plugin.SettingsState) => {
  console.log('[Plugin] Settings update')
  await set_settings(data)
  console.log('[Plugin] SUCCESS - Settings updated')

  // Get the currently saved settings.
  // const settings = await getSettings()

  // Get the currently saved settings.
  // const imported = await importStyles()
  // if (imported === undefined) {
  //   figma.notify("🚧 Synced styles are from another file. You need to publish them first.")
  //   return null
  // }

  // // If there is nothing selected, we have nothing to do.
  // const selection = figma.currentPage.selection as SceneNode[]

  // if (selection.length === 0) {
  //   figma.notify("You need to select something for the linter to work")
  //   return null
  // }

  // // All prerequisities are met, we can lint!
  // await asyncForEach(selection, (frame: SceneNode) => {
  //   handleNode(frame, { })
  // })

  // figma.notify("Selection linted 👊")
})