import io from "figmaio/code"
import { APP_LINT } from "../../constants/events"
import { ColorIndex } from "../colorIndex"
import { TextIndex } from "../textIndex"
import { importStyles } from "../importStyles"
import asyncForEach from "../../helpers/asyncForEach"
import { handleNode } from "../nodeHandler"
import { getSettings } from "../getSettings"

export const linterListener = async () => {
  io.on(APP_LINT, async () => {
    // Get the currently saved settings.
    const settings = await getSettings()

    // Get the currently saved settings.
    const imported = await importStyles()
    if (imported === undefined) {
      figma.notify("🚧 Synced styles are from another file. You need to publish them first.")
      return null
    }

    // If there is nothing selected, we have nothing to do.
    const selection = figma.currentPage.selection
    if (selection?.length === 0) {
      figma.notify("You need to select something for the linter to work")
      return null
    }

    // All prerequisities are met, we can lint!
    const colorIndex = new ColorIndex(imported.importedPaintStyles, settings)
    const textIndex = new TextIndex(imported.importedTextStyles, settings)

    await asyncForEach(selection as [], (frame: SceneNode) => {
      handleNode(frame, settings, colorIndex, textIndex)
    })

    figma.notify("Selection linted 👊")
  })
}
