import io from "figmaio/code"
import { APP_LINT } from "../../constants/events"
import { ColorIndex } from "../colorIndex"
import { importStyles } from "../importStyles"
import asyncForEach from "../../helpers/asyncForEach"
import { handleNode } from "../nodeHandler"
import { getSettings } from "../getSettings"

export const linterListener = async () => {
  io.on(APP_LINT, async () => {
    const settings = await getSettings()
    const imported = await importStyles()
    const selection = figma.currentPage.selection
    const colorIndex = new ColorIndex(imported, settings)

    if (selection?.length === 0) {
      figma.notify("You need to select something for the linter to work")
    } else {
      await asyncForEach(selection as any[], (frame: any) => {
        handleNode(frame, settings, colorIndex)
        figma.notify("Selection linted 👊")
      })
    }
  })
}
