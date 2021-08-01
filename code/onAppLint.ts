import io from "figmaio/code"

import { APP_LINT } from '@events'
import { asyncForEach } from '@utils/asyncForEach'
import { handleNode } from '@utils/nodeHandler'

io.on(APP_LINT, async () => {
  console.log('===== New Lint =====')

  // Get the currently saved settings.
  // const settings = await getSettings()

  // Get the currently saved settings.
  // const imported = await importStyles()
  // if (imported === undefined) {
  //   figma.notify("🚧 Synced styles are from another file. You need to publish them first.")
  //   return null
  // }

  // // If there is nothing selected, we have nothing to do.
  const selection = figma.currentPage.selection as SceneNode[]

  if (selection.length === 0) {
    figma.notify("You need to select something for the linter to work")
    return null
  }

  // // All prerequisities are met, we can lint!
  // const colorIndex = new ColorIndex(imported.importedPaintStyles, settings)
  // const textIndex = new TextIndex(imported.importedTextStyles, settings)

  await asyncForEach(selection, (frame: SceneNode) => {
    handleNode(frame, { })
  })

  figma.notify("Selection linted 👊")
})