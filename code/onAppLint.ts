import io from "figmaio/code"

import { APP_LINT } from '@events'
import { asyncForEach } from '@utils/asyncForEach'
import { handleNode } from '@utils/handleNode'

io.on(APP_LINT, async (settings: Plugin.SettingsState) => {
  console.log('[Plugin] Initiating linting')
  console.log('[Plugin] Settings', settings)

  // // If there is nothing selected, we have nothing to do.
  const selection = figma.currentPage.selection as SceneNode[]

  if (selection.length === 0) {
    figma.notify("You need to select something for the linter to work")
    return null
  }

  // All prerequisities are met, we can lint!
  await asyncForEach(selection, (frame: SceneNode) => handleNode(frame, settings))

  figma.notify("Selection linted 👊")
})